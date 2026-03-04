"use client";
import { CSSProperties, FormEvent, ReactNode, useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { FormField } from "../molecules/FormField";
import { Stack } from "../layout/Stack";
import { Box } from "../layout/Box";

/* ---------- Default social auth SVG icons ---------- */

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-2.12 4.53-3.74 4.25z" />
  </svg>
);

export interface AuthProvider {
  id: string;
  label: string;
  icon?: ReactNode;
  onSignIn: () => void;
}

export interface AuthPageProps {
  /** Brand name or logo node shown above the form */
  brand?: ReactNode;
  title?: string;
  subtitle?: string;
  providers?: AuthProvider[];
  onSubmit?: (email: string, password: string) => void | Promise<void>;
  /** Switch to sign-up mode */
  mode?: "sign-in" | "sign-up";
  onModeSwitch?: () => void;
  onForgotPassword?: () => void;
  footerNote?: ReactNode;
  /** Decorative testimonial shown on the left panel */
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  className?: string;
  style?: CSSProperties;
}

const defaultProviders: AuthProvider[] = [
  { id: "github", label: "Continue with GitHub", icon: <GitHubIcon />, onSignIn: () => { } },
  { id: "google", label: "Continue with Google", icon: <GoogleIcon />, onSignIn: () => { } },
  { id: "apple", label: "Continue with Apple", icon: <AppleIcon />, onSignIn: () => { } }
];

export function AuthPage({
  brand,
  title,
  subtitle,
  providers = defaultProviders,
  onSubmit,
  mode = "sign-in",
  onModeSwitch,
  onForgotPassword,
  footerNote,
  testimonialQuote = "Zephyr changed how our entire team builds UI. We went from spending days on design systems to shipping polished products in hours.",
  testimonialAuthor = "Sarah Chen",
  testimonialRole = "Staff Engineer, Vercel",
  className,
  style
}: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const heading = title ?? (mode === "sign-in" ? "Welcome back" : "Create your account");
  const sub = subtitle ?? (mode === "sign-in" ? "Sign in to continue" : "Get started for free");
  const submitLabel = mode === "sign-in" ? "Sign in" : "Create account";
  const switchLabel = mode === "sign-in" ? "Don\u2019t have an account?" : "Already have an account?";
  const switchAction = mode === "sign-in" ? "Sign up" : "Sign in";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await onSubmit?.(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={className}
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "var(--z-color-background, #f7f7f7)",
        ...style
      }}
    >
      {/* ---- Left decorative panel ---- */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(2rem, 4vw, 3rem)",
          background: "linear-gradient(160deg, color-mix(in srgb, var(--z-color-primary, #121212) 10%, var(--z-color-background, #f7f7f7)) 0%, color-mix(in srgb, var(--z-color-accent, #fa7319) 5%, var(--z-color-background, #f7f7f7)) 100%)",
          overflow: "hidden"
        }}
      >
        {/* Decorative dot pattern */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.25, pointerEvents: "none" }}
        >
          <defs>
            <pattern id="auth-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="var(--z-color-border, #e5e5e5)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#auth-dots)" />
        </svg>

        {/* Brand logo */}
        {brand ? (
          <div style={{ position: "relative", marginBottom: "auto", paddingTop: "var(--z-space-4, 1rem)" }}>
            {brand}
          </div>
        ) : null}

        {/* Testimonial */}
        <div style={{ position: "relative", maxWidth: "420px" }}>
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none" style={{ marginBottom: "var(--z-space-4, 1rem)", opacity: 0.3 }}>
            <path d="M0 24V14.4C0 11.73 .5 9.33 1.5 7.2 2.53 5.07 3.93 3.33 5.7 2 7.5.67 9.5 0 11.7 0l1.5 4.2c-2.13.67-3.83 1.87-5.1 3.6C6.83 9.47 6.2 11.4 6.2 13.6h5.5V24H0zm18.3 0V14.4c0-2.67.5-5.07 1.5-7.2 1.03-2.13 2.43-3.87 4.2-5.2C25.8.67 27.8 0 30 0l1.5 4.2c-2.13.67-3.83 1.87-5.1 3.6-1.27 1.67-1.9 3.6-1.9 5.8h5.5V24h-11.7z" fill="var(--z-color-text, #171717)" />
          </svg>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.65,
              color: "var(--z-color-text, #171717)",
              margin: "0 0 var(--z-space-6, 1.5rem)",
              fontStyle: "italic"
            }}
          >
            {testimonialQuote}
          </p>
          <div>
            <div style={{ fontWeight: "var(--z-type-weight-semibold, 600)", fontSize: "var(--z-type-size-sm, 0.875rem)", color: "var(--z-color-text, #171717)" }}>
              {testimonialAuthor}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--z-color-muted, #5c5c5c)" }}>
              {testimonialRole}
            </div>
          </div>
        </div>
      </div>

      {/* ---- Right form panel ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--z-space-6, 1.5rem)"
        }}
      >
        <Box
          padding={8}
          radius="lg"
          style={{
            background: "var(--z-color-surface, #ffffff)",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            border: "1px solid var(--z-color-border, #ebebeb)"
          } as CSSProperties}
        >
          <Stack direction="vertical" gap={6}>
            {/* Heading */}
            <Stack direction="vertical" gap={1} style={{ textAlign: "center" } as CSSProperties}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--z-color-text, #171717)"
                }}
              >
                {heading}
              </h1>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--z-color-muted, #5c5c5c)" }}>
                {sub}
              </p>
            </Stack>

            {/* Social providers */}
            {providers.length > 0 ? (
              <Stack direction="vertical" gap={2}>
                {providers.map((p) => (
                  <Button key={p.id} variant="secondary" fullWidth startIcon={p.icon} onClick={p.onSignIn}>
                    {p.label}
                  </Button>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "var(--z-color-muted, #5c5c5c)",
                    fontSize: "0.75rem",
                    margin: "var(--z-space-1, 0.25rem) 0"
                  }}
                >
                  <span style={{ flex: 1, height: "1px", background: "var(--z-color-border, #ebebeb)" }} />
                  or continue with email
                  <span style={{ flex: 1, height: "1px", background: "var(--z-color-border, #ebebeb)" }} />
                </div>
              </Stack>
            ) : null}

            {/* Email / Password form */}
            <form onSubmit={handleSubmit}>
              <Stack direction="vertical" gap={4}>
                <FormField label="Email" htmlFor="auth-email" error={error && !password ? error : undefined}>
                  <Input
                    id="auth-email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    aria-invalid={Boolean(error) || undefined}
                  />
                </FormField>

                <div>
                  <FormField label="Password" htmlFor="auth-password" error={error && password ? error : undefined}>
                    <Input
                      id="auth-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                      aria-invalid={Boolean(error) || undefined}
                    />
                  </FormField>
                  {mode === "sign-in" && onForgotPassword ? (
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--z-color-primary, #335cff)",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                        padding: 0,
                        marginTop: "var(--z-space-1, 0.25rem)",
                        fontWeight: 500
                      }}
                    >
                      Forgot password?
                    </button>
                  ) : null}
                </div>

                <Button type="submit" fullWidth loading={loading}>
                  {submitLabel}
                </Button>
              </Stack>
            </form>

            {/* Switch mode */}
            {onModeSwitch ? (
              <p style={{ margin: 0, textAlign: "center", fontSize: "0.84rem", color: "var(--z-color-muted, #5c5c5c)" }}>
                {switchLabel}{" "}
                <button
                  type="button"
                  onClick={onModeSwitch}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--z-color-primary, #335cff)",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "inherit",
                    padding: 0
                  }}
                >
                  {switchAction}
                </button>
              </p>
            ) : null}

            {/* Terms */}
            <div style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--z-color-muted, #5c5c5c)", lineHeight: 1.5 }}>
              {footerNote ?? (
                <>
                  By continuing, you agree to our{" "}
                  <span style={{ textDecoration: "underline", cursor: "pointer" }}>Terms of Service</span>
                  {" "}and{" "}
                  <span style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>.
                </>
              )}
            </div>
          </Stack>
        </Box>
      </div>
    </div>
  );
}
