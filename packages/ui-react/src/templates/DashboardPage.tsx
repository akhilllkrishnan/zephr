"use client";
import { CSSProperties, ReactNode, useState } from "react";
import { Avatar } from "../atoms/Avatar";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { Header } from "../organisms/Header";
import { DataTable, DataTableColumn } from "../organisms/DataTable";
import { Stack } from "../layout/Stack";
import { Grid } from "../layout/Grid";
import { Box } from "../layout/Box";

/* ---------- Inline SVG icons ---------- */

const ArrowUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle" }}>
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle" }}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ---------- Mini sparkline SVG ---------- */
function Sparkline({ positive }: { positive: boolean }) {
  const points = positive
    ? "0,14 6,12 12,13 18,9 24,10 30,6 36,3 40,2"
    : "0,3 6,5 12,4 18,8 24,7 30,11 36,13 40,14";
  return (
    <svg width="40" height="16" viewBox="0 0 40 16" fill="none" style={{ display: "block" }}>
      <polyline
        points={points}
        stroke={positive ? "var(--z-color-success, #059669)" : "var(--z-color-danger, #ef4444)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
}

export interface DashboardActivity {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
}

export interface DashboardRow {
  id: string;
  name: string;
  status: "active" | "inactive" | "pending";
  updated: string;
  avatar?: string;
}

export interface DashboardPageProps {
  title?: string;
  subtitle?: string;
  stats?: DashboardStat[];
  tableData?: DashboardRow[];
  activity?: DashboardActivity[];
  loading?: boolean;
  onNewItem?: () => void;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_STATS: DashboardStat[] = [
  { id: "1", label: "Total Members", value: "1,248", delta: "+12%", deltaPositive: true },
  { id: "2", label: "Active Projects", value: "34", delta: "+3", deltaPositive: true },
  { id: "3", label: "Open Issues", value: "17", delta: "-5", deltaPositive: false },
  { id: "4", label: "Deploy Rate", value: "98.2%", delta: "+0.4%", deltaPositive: true }
];

const DEFAULT_ROWS: DashboardRow[] = [
  { id: "1", name: "Atlas Platform", status: "active", updated: "Today, 09:14" },
  { id: "2", name: "Nebula API", status: "active", updated: "Today, 08:52" },
  { id: "3", name: "Orbit Dashboard", status: "pending", updated: "Yesterday" },
  { id: "4", name: "Pulse Reporter", status: "inactive", updated: "Mar 1" }
];

const DEFAULT_ACTIVITY: DashboardActivity[] = [
  { id: "1", actor: "Akhil", action: "deployed Atlas v2.4.1", timestamp: "5 min ago" },
  { id: "2", actor: "Maya", action: "opened issue #183", timestamp: "22 min ago" },
  { id: "3", actor: "Noah", action: "merged PR #91", timestamp: "1 hr ago" },
  { id: "4", actor: "Liam", action: "updated roadmap", timestamp: "3 hr ago" }
];

const STATUS_TONE: Record<DashboardRow["status"], "success" | "neutral" | "info"> = {
  active: "success",
  inactive: "neutral",
  pending: "info"
};

const COLUMNS: Array<DataTableColumn<DashboardRow>> = [
  {
    id: "name",
    header: "Project",
    render: (row) => (
      <Stack direction="horizontal" gap={2} align="center">
        <Avatar name={row.name} size={24} />
        <span style={{ fontWeight: 500, color: "var(--z-color-text, #171717)" }}>{row.name}</span>
      </Stack>
    )
  },
  {
    id: "status",
    header: "Status",
    render: (row) => (
      <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>
    )
  },
  { id: "updated", header: "Last Updated", accessor: "updated" }
];

function StatCard({ stat }: { stat: DashboardStat }) {
  const isPositive = stat.deltaPositive !== false;
  return (
    <Box
      padding={5}
      radius="lg"
      border
      style={{
        background: "var(--z-color-surface, #ffffff)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
      } as CSSProperties}
    >
      <Stack direction="vertical" gap={3}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--z-color-muted, #5c5c5c)",
            textTransform: "uppercase",
            letterSpacing: "0.06em"
          }}
        >
          {stat.label}
        </span>
        <Stack direction="horizontal" gap={3} align="center" style={{ justifyContent: "space-between" } as CSSProperties}>
          <Stack direction="horizontal" gap={3} align="baseline">
            <span
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--z-color-text, #171717)",
                lineHeight: 1.1
              }}
            >
              {stat.value}
            </span>
            {stat.delta ? (
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: isPositive ? "var(--z-color-success, #16a34a)" : "var(--z-color-danger, #fb3748)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "2px"
                }}
              >
                {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                {stat.delta}
              </span>
            ) : null}
          </Stack>
          <Sparkline positive={isPositive} />
        </Stack>
      </Stack>
    </Box>
  );
}

function ActivityItem({ item, isLast }: { item: DashboardActivity; isLast: boolean }) {
  return (
    <div style={{ display: "flex", gap: "var(--z-space-3, 0.75rem)" }}>
      {/* Timeline connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "28px", flexShrink: 0 }}>
        <Avatar name={item.actor} size={28} />
        {!isLast ? (
          <div
            style={{
              flex: 1,
              width: "1px",
              background: "var(--z-color-border, #e5e5e5)",
              marginTop: "4px"
            }}
          />
        ) : null}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : "var(--z-space-4, 1rem)" }}>
        <span style={{ fontSize: "0.875rem", color: "var(--z-color-text, #171717)" }}>
          <strong>{item.actor}</strong> {item.action}
        </span>
        <div style={{ fontSize: "0.72rem", color: "var(--z-color-muted, #5c5c5c)", marginTop: "2px" }}>
          {item.timestamp}
        </div>
      </div>
    </div>
  );
}

export function DashboardPage({
  title = "Dashboard",
  subtitle = "Overview of your workspace",
  stats = DEFAULT_STATS,
  tableData = DEFAULT_ROWS,
  activity = DEFAULT_ACTIVITY,
  loading = false,
  onNewItem,
  className,
  style
}: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "reports">("overview");

  const tabStyle = (tab: typeof activeTab): CSSProperties => ({
    background: "none",
    border: "none",
    padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)",
    fontSize: "var(--z-type-size-sm, 0.875rem)",
    fontWeight: activeTab === tab ? 600 : 400,
    color: activeTab === tab ? "var(--z-color-text, #171717)" : "var(--z-color-muted, #5c5c5c)",
    cursor: "pointer",
    borderBottom: activeTab === tab ? "2px solid var(--z-color-primary, #121212)" : "2px solid transparent",
    transition: "color 0.15s, border-color 0.15s"
  });

  return (
    <div
      className={className}
      style={{
        padding: "var(--z-space-6, 1.5rem)",
        display: "grid",
        gap: "var(--z-space-6, 1.5rem)",
        background: "var(--z-color-background, #fafafa)",
        ...style
      }}
    >
      <Header
        title={title}
        subtitle={subtitle}
        actions={
          <Button onClick={onNewItem} loading={loading} startIcon={<PlusIcon />}>
            New Project
          </Button>
        }
      />

      {/* Quick actions row */}
      <Stack direction="horizontal" gap={2}>
        <Button variant="secondary" size="sm" startIcon={<FilterIcon />}>Filters</Button>
        <Button variant="secondary" size="sm" startIcon={<DownloadIcon />}>Export</Button>
      </Stack>

      {/* Sub-navigation tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--z-color-border, #e5e5e5)" }}>
        {(["overview", "analytics", "reports"] as const).map((tab) => (
          <button key={tab} type="button" style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <Grid columns={4} gap={4}>
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </Grid>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "var(--z-space-5, 1.25rem)" } as CSSProperties}>
        <Stack direction="vertical" gap={3}>
          <Stack direction="horizontal" gap={0} align="center" style={{ justifyContent: "space-between" } as CSSProperties}>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--z-color-text, #171717)"
              }}
            >
              Projects
            </span>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "var(--z-color-primary, #121212)",
                cursor: "pointer",
                padding: 0
              }}
            >
              View all &rarr;
            </button>
          </Stack>
          <DataTable
            data={tableData}
            columns={COLUMNS}
            rowKey={(row) => row.id}
            loading={loading}
          />
        </Stack>

        <Stack direction="vertical" gap={3}>
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--z-color-text, #171717)"
            }}
          >
            Recent Activity
          </span>
          <Box padding={4} radius="lg" border style={{ background: "var(--z-color-surface, #ffffff)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" } as CSSProperties}>
            {activity.map((item, i) => (
              <ActivityItem key={item.id} item={item} isLast={i === activity.length - 1} />
            ))}
          </Box>
        </Stack>
      </div>
    </div>
  );
}
