// In-memory rate limiter (used in unit tests and as local-dev fallback).
// SqliteRateLimiter is the persistence-backed implementation used in production.

export interface RateLimitState {
  remaining: number;
  resetAt: string;
}

interface Entry {
  count: number;
  resetAtMs: number;
}

export class InMemoryRateLimiter {
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly table = new Map<string, Entry>();

  constructor(maxRequests = 120, windowMs = 60_000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  consume(key: string): RateLimitState {
    const now = Date.now();
    const current = this.table.get(key);

    if (!current || current.resetAtMs <= now) {
      const resetAtMs = now + this.windowMs;
      this.table.set(key, { count: 1, resetAtMs });
      return {
        remaining: this.maxRequests - 1,
        resetAt: new Date(resetAtMs).toISOString()
      };
    }

    if (current.count >= this.maxRequests) {
      return {
        remaining: 0,
        resetAt: new Date(current.resetAtMs).toISOString()
      };
    }

    current.count += 1;
    this.table.set(key, current);

    return {
      remaining: this.maxRequests - current.count,
      resetAt: new Date(current.resetAtMs).toISOString()
    };
  }

  isLimited(key: string): boolean {
    const current = this.table.get(key);
    if (!current) {
      return false;
    }
    if (current.resetAtMs <= Date.now()) {
      return false;
    }
    return current.count >= this.maxRequests;
  }
}

// ---------------------------------------------------------------------------
// SQLite-backed rate limiter (persistent across process restarts)
// ---------------------------------------------------------------------------
// Uses the built-in `node:sqlite` module (Node 22.5+, no native build needed).
// Activated when ZEPHYR_RATE_LIMIT_DB env var is set (e.g. ./data/ratelimit.db).
// Falls back gracefully to InMemoryRateLimiter if the module is unavailable.

type SqliteDatabase = {
  exec(sql: string): void;
  prepare(sql: string): {
    run(...params: unknown[]): void;
    get(...params: unknown[]): unknown;
  };
};

function tryOpenSqlite(dbPath: string): SqliteDatabase | null {
  try {
    // node:sqlite is available from Node 22.5 (experimental, stable in 22.x)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { DatabaseSync } = require("node:sqlite") as {
      DatabaseSync: new (path: string) => SqliteDatabase;
    };
    const db = new DatabaseSync(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS rate_limit (
        key       TEXT    NOT NULL,
        count     INTEGER NOT NULL DEFAULT 1,
        reset_at  INTEGER NOT NULL,
        PRIMARY KEY (key)
      );
    `);
    return db;
  } catch {
    return null;
  }
}

export class SqliteRateLimiter {
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly db: SqliteDatabase | null;
  private readonly fallback: InMemoryRateLimiter;

  constructor(dbPath: string, maxRequests = 120, windowMs = 60_000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.db = tryOpenSqlite(dbPath);
    this.fallback = new InMemoryRateLimiter(maxRequests, windowMs);

    if (!this.db) {
      console.warn(
        `[rateLimit] node:sqlite unavailable — falling back to InMemoryRateLimiter for ${dbPath}`
      );
    }
  }

  consume(key: string): RateLimitState {
    if (!this.db) {
      return this.fallback.consume(key);
    }

    const now = Date.now();
    const resetAtMs = now + this.windowMs;

    const existing = this.db
      .prepare("SELECT count, reset_at FROM rate_limit WHERE key = ?")
      .get(key) as { count: number; reset_at: number } | undefined;

    if (!existing || existing.reset_at <= now) {
      // New window — upsert with count=1
      this.db
        .prepare(
          "INSERT INTO rate_limit (key, count, reset_at) VALUES (?, 1, ?)" +
          " ON CONFLICT(key) DO UPDATE SET count = 1, reset_at = excluded.reset_at"
        )
        .run(key, resetAtMs);
      return {
        remaining: this.maxRequests - 1,
        resetAt: new Date(resetAtMs).toISOString()
      };
    }

    const newCount = Math.min(existing.count + 1, this.maxRequests);
    this.db
      .prepare("UPDATE rate_limit SET count = ? WHERE key = ?")
      .run(newCount, key);

    return {
      remaining: Math.max(this.maxRequests - newCount, 0),
      resetAt: new Date(existing.reset_at).toISOString()
    };
  }

  isLimited(key: string): boolean {
    if (!this.db) {
      return this.fallback.isLimited(key);
    }

    const now = Date.now();
    const row = this.db
      .prepare("SELECT count, reset_at FROM rate_limit WHERE key = ?")
      .get(key) as { count: number; reset_at: number } | undefined;

    if (!row || row.reset_at <= now) {
      return false;
    }
    return row.count >= this.maxRequests;
  }
}

// ---------------------------------------------------------------------------
// Factory — returns the right limiter based on env
// ---------------------------------------------------------------------------

export function createRateLimiter(
  maxRequests: number,
  windowMs: number
): InMemoryRateLimiter | SqliteRateLimiter {
  const dbPath = process.env.ZEPHYR_RATE_LIMIT_DB;
  if (dbPath) {
    return new SqliteRateLimiter(dbPath, maxRequests, windowMs);
  }
  return new InMemoryRateLimiter(maxRequests, windowMs);
}
