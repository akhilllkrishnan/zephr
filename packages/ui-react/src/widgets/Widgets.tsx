"use client";
import { CSSProperties, useMemo, useState } from "react";
import { Alert } from "../molecules/Alert";
import { Avatar, type AvatarStatus } from "../atoms/Avatar";
import { Badge, type BadgeColor, type BadgeVariant } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { ButtonGroup } from "../molecules/ButtonGroup";
import { Card } from "../atoms/Card";
import { Checkbox } from "../atoms/Checkbox";
import { Divider } from "../atoms/Divider";
import { Input } from "../atoms/Input";
import { Progress, type ProgressTone } from "../atoms/Progress";
import { FormField } from "../molecules/FormField";
import { Switch } from "../atoms/Switch";
import { TagInput } from "../molecules/TagInput";
import { Textarea } from "../atoms/Textarea";

export type WidgetSurface = "elevated" | "outlined";

interface WidgetAction {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export interface RevenueSnapshotWidgetProps {
  title?: string;
  subtitle?: string;
  statusLabel?: string;
  metrics?: Array<{ label: string; value: string }>;
  targetLabel?: string;
  targetValue?: number;
  primaryAction?: WidgetAction;
  secondaryAction?: WidgetAction;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ReleaseChecklistTask {
  label: string;
  checked: boolean;
}

export interface ReleaseChecklistWidgetProps {
  title?: string;
  subtitle?: string;
  notice?: string;
  tasks?: ReleaseChecklistTask[];
  onTasksChange?: (tasks: ReleaseChecklistTask[]) => void;
  primaryAction?: WidgetAction;
  secondaryAction?: WidgetAction;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface TeamPulseMember {
  name: string;
  role: string;
  note: string;
  status: AvatarStatus;
}

export interface TeamPulseWidgetProps {
  title?: string;
  subtitle?: string;
  members?: TeamPulseMember[];
  action?: WidgetAction;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface BillingUsageMetric {
  label: string;
  value: string;
}

export interface BillingUsageWidgetProps {
  title?: string;
  subtitle?: string;
  planLabel?: string;
  currentSpend?: string;
  budget?: string;
  usagePercent?: number;
  metrics?: BillingUsageMetric[];
  warningTitle?: string;
  warningDescription?: string;
  primaryAction?: WidgetAction;
  secondaryAction?: WidgetAction;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface CustomerHealthAccount {
  name: string;
  owner: string;
  tier: string;
  health: number;
}

export interface CustomerHealthWidgetProps {
  title?: string;
  subtitle?: string;
  tagLabel?: string;
  accounts?: CustomerHealthAccount[];
  action?: WidgetAction;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface IncidentDigestItem {
  timestamp: string;
  note: string;
}

export interface IncidentDigestWidgetProps {
  title?: string;
  subtitle?: string;
  severityLabel?: string;
  incidents?: Array<{ title: string; status: "error" | "warning"; variant?: "filled" | "lighter" | "stroke" }>;
  updates?: IncidentDigestItem[];
  primaryAction?: WidgetAction;
  secondaryAction?: WidgetAction;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ReviewInboxItem {
  name: string;
  owner: string;
  priority: "High" | "Medium" | "Low";
}

export interface ReviewInboxWidgetProps {
  title?: string;
  subtitle?: string;
  items?: ReviewInboxItem[];
  action?: WidgetAction;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface QuickActionsWidgetProps {
  title?: string;
  subtitle?: string;
  tabs?: string[];
  placeholder?: string;
  primaryAction?: WidgetAction;
  secondaryActions?: WidgetAction[];
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ApprovalModalWidgetProps {
  title?: string;
  subtitle?: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ProjectBriefFormWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface UploadQueueWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ChatPanelWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface InviteMembersWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface TeamDirectoryWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface SettingsPanelWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface LaunchProgressWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface NotificationFeedWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface SecurityAccessWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface PaymentMethodsWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ActivityTimelineWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface CommandPaletteWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface KanbanBoardWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface EventSchedulerWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface CommentThreadWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface PlanComparisonWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface AssetReviewWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ApiKeysWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface SupportQueueWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface GoalTrackerWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface IntegrationStatusWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface AccessRequestsWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface LicenseActivationsWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ExperimentResultsWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ReleaseNotesWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface AnalyticsOverviewWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface DealsPipelineWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface BillingRecoveryWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface AutomationRunsWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface AuditTrailWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ContentCalendarWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface IncidentResponseWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface FeedbackInboxWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

const defaultRevenueMetrics = [
  { label: "Booked", value: "$182k" },
  { label: "Open", value: "$41k" },
  { label: "Win rate", value: "32%" }
];

const defaultReleaseTasks: ReleaseChecklistTask[] = [
  { label: "QA sign-off", checked: true },
  { label: "Migration dry run", checked: false },
  { label: "Status page copy", checked: false }
];

const defaultTeamMembers: TeamPulseMember[] = [
  { name: "Maya Carter", role: "Frontend", note: "Reviewing 4 PRs", status: "online" },
  { name: "Noah Kim", role: "Design Systems", note: "Token pass in progress", status: "busy" },
  { name: "Liam Torres", role: "PM", note: "Running launch checklist", status: "online" }
];

const defaultBillingMetrics = [
  { label: "API requests", value: "4.1M / 6M" },
  { label: "Seats", value: "8 / 12" },
  { label: "Asset sync", value: "92 GB / 120 GB" }
];

const defaultCustomerAccounts: CustomerHealthAccount[] = [
  { name: "Northstar", owner: "Maya", tier: "Enterprise", health: 92 },
  { name: "Patchwork", owner: "Noah", tier: "Startup", health: 71 },
  { name: "Vector Labs", owner: "Liam", tier: "Growth", health: 54 }
];

const defaultIncidentUpdates: IncidentDigestItem[] = [
  { timestamp: "14:24 UTC", note: "Mitigation shipped to the ingest worker" },
  { timestamp: "14:42 UTC", note: "Canary healthy in 2 regions" },
  { timestamp: "15:05 UTC", note: "Monitoring stable, customer comms drafted" }
];

const defaultReviewItems: ReviewInboxItem[] = [
  { name: "Design review", owner: "Maya Carter", priority: "High" },
  { name: "Billing copy", owner: "Liam Torres", priority: "Medium" },
  { name: "Launch email", owner: "Noah Kim", priority: "High" }
];

function surfaceProps(surface: WidgetSurface) {
  return surface === "outlined"
    ? { variant: "outlined" as const, shadow: "none" as const }
    : { variant: "elevated" as const, shadow: "md" as const };
}

function cardStyle(style?: CSSProperties): CSSProperties {
  return {
    gap: "1rem",
    ...style
  };
}

function stackStyle(gap = "0.75rem"): CSSProperties {
  return {
    display: "flex",
    flexDirection: "column",
    gap
  };
}

function inlineRowStyle(): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem"
  };
}

function personMetaStyle(): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    minWidth: 0
  };
}

function personCopyStyle(): CSSProperties {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    minWidth: 0
  };
}

function kickerStyle(): CSSProperties {
  return {
    fontSize: "0.73rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--z-color-muted, #667085)"
  };
}

function titleStyle(): CSSProperties {
  return {
    margin: "0.35rem 0 0",
    fontSize: "1.1rem",
    lineHeight: 1.25,
    color: "var(--z-color-text, #171717)"
  };
}

function mutedTextStyle(): CSSProperties {
  return {
    color: "var(--z-color-muted, #667085)"
  };
}

function actionRow(actions: Array<WidgetAction | undefined>) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
      {actions.filter(Boolean).map((action, index) => (
        <Button
          key={`${action!.label}-${index}`}
          size="sm"
          variant={action?.variant === "secondary" ? "secondary" : "primary"}
          onClick={action?.onClick}
        >
          {action?.label}
        </Button>
      ))}
    </div>
  );
}

function healthColor(health: number): { badgeColor: BadgeColor; tone: ProgressTone } {
  if (health > 80) {
    return { badgeColor: "green", tone: "success" };
  }
  if (health > 60) {
    return { badgeColor: "yellow", tone: "warning" };
  }
  return { badgeColor: "red", tone: "danger" };
}

function priorityColor(priority: ReviewInboxItem["priority"]): BadgeColor {
  if (priority === "High") return "red";
  if (priority === "Medium") return "yellow";
  return "gray";
}

function statusTone(status: "error" | "warning"): "error" | "warning" {
  return status;
}

export function RevenueSnapshotWidget({
  title = "Q2 pipeline",
  subtitle = "Revenue snapshot",
  statusLabel = "Live",
  metrics = defaultRevenueMetrics,
  targetLabel = "Quarter target",
  targetValue = 76,
  primaryAction = { label: "Open dashboard" },
  secondaryAction = { label: "Export CSV", variant: "secondary" },
  surface = "elevated",
  className,
  style
}: RevenueSnapshotWidgetProps) {
  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>{subtitle}</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge tone="success">{statusLabel}</Badge>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.75rem" }}>
        {metrics.map((metric) => (
          <div
            key={metric.label}
            style={{
              ...stackStyle("0.3rem"),
              padding: "0.8rem 0.9rem",
              borderRadius: 10,
              border: "1px solid var(--z-color-border, #ebebeb)",
              background: "var(--z-color-surface, #ffffff)"
            }}
          >
            <span style={mutedTextStyle()}>{metric.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)" }}>{metric.value}</strong>
          </div>
        ))}
      </div>
      <div style={stackStyle()}>
        <div style={{ ...inlineRowStyle(), fontSize: "0.9rem" }}>
          <span style={mutedTextStyle()}>{targetLabel}</span>
          <span style={{ color: "var(--z-color-text, #171717)" }}>{targetValue}%</span>
        </div>
        <Progress value={targetValue} tone="primary" />
      </div>
      <Divider />
      {actionRow([primaryAction, secondaryAction])}
    </Card>
  );
}

export function ReleaseChecklistWidget({
  title = "Release checklist",
  subtitle = "Launch operations",
  notice = "Release branch freezes at 17:00.",
  tasks = defaultReleaseTasks,
  onTasksChange,
  primaryAction = { label: "Ship release" },
  secondaryAction = { label: "View runbook", variant: "secondary" },
  surface = "elevated",
  className,
  style
}: ReleaseChecklistWidgetProps) {
  const [internalTasks, setInternalTasks] = useState(tasks);
  const activeTasks = onTasksChange ? tasks : internalTasks;
  const completeCount = useMemo(() => activeTasks.filter((task) => task.checked).length, [activeTasks]);
  const percent = Math.round((completeCount / activeTasks.length) * 100);

  function updateTasks(nextTasks: ReleaseChecklistTask[]) {
    if (!onTasksChange) {
      setInternalTasks(nextTasks);
    }
    onTasksChange?.(nextTasks);
  }

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>{subtitle}</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="orange" variant="lighter">Today</Badge>
      </div>
      <Alert size="xs" variant="lighter" status="info" title={notice} />
      <div style={stackStyle()}>
        {activeTasks.map((task, index) => (
          <div
            key={task.label}
            style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center" }}
          >
            <Checkbox
              checked={task.checked}
              onChange={(event) =>
                updateTasks(
                  activeTasks.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, checked: event.target.checked } : item
                  )
                )
              }
            />
            <span style={mutedTextStyle()}>{task.label}</span>
            <Badge variant={task.checked ? "lighter" : "stroke"} color={task.checked ? "green" : "gray"}>
              {task.checked ? "Done" : "Pending"}
            </Badge>
          </div>
        ))}
      </div>
      <div style={stackStyle()}>
        <div style={{ ...inlineRowStyle(), fontSize: "0.9rem" }}>
          <span style={mutedTextStyle()}>Launch readiness</span>
          <span style={{ color: "var(--z-color-text, #171717)" }}>
            {completeCount}/{activeTasks.length} complete
          </span>
        </div>
        <Progress value={percent} tone="success" />
      </div>
      <Divider />
      {actionRow([primaryAction, secondaryAction])}
    </Card>
  );
}

export function TeamPulseWidget({
  title = "Team pulse",
  subtitle = "Team operations",
  members = defaultTeamMembers,
  action = { label: "Open staffing board", variant: "secondary" },
  surface = "elevated",
  className,
  style
}: TeamPulseWidgetProps) {
  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>{subtitle}</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="sky" variant="lighter">{members.length} active</Badge>
      </div>
      <div style={stackStyle()}>
        {members.map((member) => (
          <div key={member.name} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center" }}>
            <div style={personMetaStyle()}>
              <Avatar name={member.name} size={36} status={member.status} />
              <div style={personCopyStyle()}>
                <strong style={{ color: "var(--z-color-text, #171717)" }}>{member.name}</strong>
                <span style={{ ...mutedTextStyle(), whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {member.role} · {member.note}
                </span>
              </div>
            </div>
            <Badge tone={member.status === "busy" ? "danger" : "success"}>
              {member.status === "busy" ? "Busy" : "Online"}
            </Badge>
          </div>
        ))}
      </div>
      <Divider />
      {actionRow([action])}
    </Card>
  );
}

export function BillingUsageWidget({
  title = "Billing usage",
  subtitle = "Commercials",
  planLabel = "Startup",
  currentSpend = "$428",
  budget = "$600 monthly budget",
  usagePercent = 71,
  metrics = defaultBillingMetrics,
  warningTitle = "API burst limit approaching.",
  warningDescription = "Scale before launch week.",
  primaryAction = { label: "Upgrade plan" },
  secondaryAction = { label: "Download invoice", variant: "secondary" },
  surface = "elevated",
  className,
  style
}: BillingUsageWidgetProps) {
  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>{subtitle}</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge tone="neutral">{planLabel}</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.45rem" }}>
        <strong style={{ fontSize: "1.85rem", lineHeight: 1, color: "var(--z-color-text, #171717)" }}>{currentSpend}</strong>
        <span style={mutedTextStyle()}>/ {budget}</span>
      </div>
      <div style={stackStyle()}>
        <div style={{ ...inlineRowStyle(), fontSize: "0.9rem" }}>
          <span style={mutedTextStyle()}>Current month</span>
          <span style={{ color: "var(--z-color-text, #171717)" }}>{usagePercent}%</span>
        </div>
        <Progress value={usagePercent} tone="warning" />
      </div>
      <div style={stackStyle()}>
        {metrics.map((metric) => (
          <div key={metric.label} style={{ ...inlineRowStyle(), fontSize: "0.9rem", padding: "0.2rem 0" }}>
            <span style={mutedTextStyle()}>{metric.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)" }}>{metric.value}</strong>
          </div>
        ))}
      </div>
      <Alert size="xs" variant="stroke" status="warning" title={warningTitle} description={warningDescription} />
      <Divider />
      {actionRow([primaryAction, secondaryAction])}
    </Card>
  );
}

export function CustomerHealthWidget({
  title = "Customer health",
  subtitle = "Customer success",
  tagLabel = "CS",
  accounts = defaultCustomerAccounts,
  action = { label: "Open customer health", variant: "secondary" },
  surface = "elevated",
  className,
  style
}: CustomerHealthWidgetProps) {
  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>{subtitle}</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="teal" variant="lighter">{tagLabel}</Badge>
      </div>
      <div style={stackStyle()}>
        {accounts.map((account) => {
          const palette = healthColor(account.health);
          return (
            <div
              key={account.name}
              style={{
                ...stackStyle("0.65rem"),
                padding: "0.85rem 0.95rem",
                borderRadius: 10,
                border: "1px solid var(--z-color-border, #ebebeb)",
                background: "var(--z-color-surface, #ffffff)"
              }}
            >
              <div style={inlineRowStyle()}>
                <div style={personMetaStyle()}>
                  <Avatar name={account.name} size={32} />
                  <div style={personCopyStyle()}>
                    <strong style={{ color: "var(--z-color-text, #171717)" }}>{account.name}</strong>
                    <span style={mutedTextStyle()}>{account.owner} · {account.tier}</span>
                  </div>
                </div>
                <Badge variant="lighter" color={palette.badgeColor}>{account.health}%</Badge>
              </div>
              <Progress value={account.health} tone={palette.tone} />
            </div>
          );
        })}
      </div>
      <Divider />
      {actionRow([action])}
    </Card>
  );
}

export function IncidentDigestWidget({
  title = "Incident digest",
  subtitle = "Reliability",
  severityLabel = "P1",
  incidents = [
    { title: "Search indexing degraded in eu-west.", status: "error", variant: "filled" as const },
    { title: "Queue latency elevated for image transforms.", status: "warning", variant: "lighter" as const }
  ],
  updates = defaultIncidentUpdates,
  primaryAction = { label: "Open status page" },
  secondaryAction = { label: "Escalate", variant: "secondary" },
  surface = "elevated",
  className,
  style
}: IncidentDigestWidgetProps) {
  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>{subtitle}</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="red" variant="lighter">{severityLabel}</Badge>
      </div>
      <div style={stackStyle()}>
        {incidents.map((incident) => (
          <Alert
            key={incident.title}
            size="xs"
            variant={incident.variant ?? "lighter"}
            status={statusTone(incident.status)}
            title={incident.title}
          />
        ))}
      </div>
      <div style={stackStyle()}>
        {updates.map((update) => (
          <div key={update.timestamp} style={{ display: "grid", gridTemplateColumns: "84px minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }}>
            <span style={{ ...mutedTextStyle(), fontSize: "0.82rem", lineHeight: 1.5 }}>{update.timestamp}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.9rem", lineHeight: 1.5, fontWeight: 500 }}>
              {update.note}
            </strong>
          </div>
        ))}
      </div>
      <Divider />
      {actionRow([primaryAction, secondaryAction])}
    </Card>
  );
}

export function ReviewInboxWidget({
  title = "Review inbox",
  subtitle = "Collaboration",
  items = defaultReviewItems,
  action = { label: "Open review queue" },
  surface = "elevated",
  className,
  style
}: ReviewInboxWidgetProps) {
  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>{subtitle}</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="purple" variant="lighter">{items.length} pending</Badge>
      </div>
      <div style={stackStyle()}>
        {items.map((item) => (
          <div key={item.name} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center" }}>
            <div style={personMetaStyle()}>
              <Avatar name={item.owner} size={32} />
              <div style={personCopyStyle()}>
                <strong style={{ color: "var(--z-color-text, #171717)" }}>{item.name}</strong>
                <span style={mutedTextStyle()}>{item.owner}</span>
              </div>
            </div>
            <Badge color={priorityColor(item.priority)} variant="lighter">{item.priority}</Badge>
          </div>
        ))}
      </div>
      <Divider />
      {actionRow([action])}
    </Card>
  );
}

export function QuickActionsWidget({
  title = "Quick actions",
  subtitle = "Operator tools",
  tabs = ["Users", "Projects", "Invoices"],
  placeholder = "Search commands or paste an account ID…",
  primaryAction = { label: "Open account" },
  secondaryActions = [
    { label: "Reset quota", variant: "secondary" as const },
    { label: "Generate report", variant: "secondary" as const }
  ],
  surface = "elevated",
  className,
  style
}: QuickActionsWidgetProps) {
  const [selectedAction, setSelectedAction] = useState(0);

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>{subtitle}</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="purple" variant="lighter">Internal</Badge>
      </div>
      <Input placeholder={placeholder} />
      <ButtonGroup quantity={tabs.length as 2 | 3 | 4 | 5 | 6} labels={tabs} value={selectedAction} onValueChange={setSelectedAction} />
      <div style={{ ...inlineRowStyle(), fontSize: "0.9rem", padding: "0.2rem 0" }}>
        <span style={mutedTextStyle()}>Focused area</span>
        <strong style={{ color: "var(--z-color-text, #171717)" }}>{tabs[selectedAction]}</strong>
      </div>
      <Divider />
      {actionRow([primaryAction, ...secondaryActions])}
    </Card>
  );
}

export function ApprovalModalWidget({
  title = "Approval modal",
  subtitle = "Review contract changes",
  body = "You are about to publish a pricing update that affects 14 active customers. Confirm the rollout after legal review is attached.",
  confirmLabel = "Publish changes",
  cancelLabel = "Keep draft",
  surface = "elevated",
  className,
  style
}: ApprovalModalWidgetProps) {
  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={{ ...stackStyle("0.85rem"), padding: "1rem", borderRadius: 14, border: "1px solid var(--z-color-border, #ebebeb)", background: "linear-gradient(180deg, rgba(15, 23, 42, 0.02) 0%, rgba(15, 23, 42, 0.05) 100%)" }}>
        <div style={{ ...inlineRowStyle(), alignItems: "center" }}>
          <div style={kickerStyle()}>Workflow</div>
          <Badge color="orange" variant="lighter">Needs review</Badge>
        </div>
        <div style={{ padding: "1rem", borderRadius: 14, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)", boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)" }}>
          <div style={stackStyle("0.55rem")}>
            <h3 style={titleStyle()}>{title}</h3>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }}>{subtitle}</strong>
            <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{body}</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1rem" }}>
            <Button size="sm" variant="secondary">{cancelLabel}</Button>
            <Button size="sm">{confirmLabel}</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ProjectBriefFormWidget({
  title = "Project brief",
  subtitle = "Collect the inputs before your AI generates the first screen.",
  surface = "elevated",
  className,
  style
}: ProjectBriefFormWidgetProps) {
  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={stackStyle("0.4rem")}>
        <div style={kickerStyle()}>Forms</div>
        <h3 style={titleStyle()}>{title}</h3>
        <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      </div>
      <div style={stackStyle("0.9rem")}>
        <FormField label="Project name" required htmlFor="widget-project-name">
          <Input id="widget-project-name" defaultValue="Billing command center" />
        </FormField>
        <FormField label="Primary goal" htmlFor="widget-project-goal">
          <Input id="widget-project-goal" defaultValue="Reduce failed invoice recovery time" />
        </FormField>
        <FormField label="Context for the AI" hint="Be explicit about constraints, data sources, and team needs." htmlFor="widget-project-context">
          <Textarea id="widget-project-context" rows={4} defaultValue="Build an internal dashboard for finance and support. Prioritize failed payments, retry outcomes, and customer intervention paths." />
        </FormField>
      </div>
      {actionRow([{ label: "Generate UI" }, { label: "Save brief", variant: "secondary" }])}
    </Card>
  );
}

export function UploadQueueWidget({
  title = "File upload",
  subtitle = "Monitor files, progress, and publish state from a single queue.",
  surface = "elevated",
  className,
  style
}: UploadQueueWidgetProps) {
  const files = [
    { name: "brand-assets.zip", size: "24 MB", progress: 100, status: "Ready", color: "green" as BadgeColor },
    { name: "pricing-sheet.csv", size: "1.2 MB", progress: 68, status: "Uploading", color: "blue" as BadgeColor },
    { name: "homepage-video.mp4", size: "84 MB", progress: 14, status: "Queued", color: "gray" as BadgeColor }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Upload queue</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Button size="sm">Add files</Button>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ padding: "0.95rem 1rem", borderRadius: 12, border: "1px dashed var(--z-color-border, #ebebeb)", background: "var(--z-color-weak, var(--z-color-background, #f7f7f7))" }}>
        <strong style={{ color: "var(--z-color-text, #171717)" }}>Drop files here or browse from your device</strong>
        <p style={{ ...mutedTextStyle(), margin: "0.35rem 0 0" }}>Supports media, CSV, and zipped design asset bundles.</p>
      </div>
      <div style={stackStyle("0.8rem")}>
        {files.map((file) => (
          <div key={file.name} style={{ ...stackStyle("0.45rem"), padding: "0.85rem 0.95rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <div style={stackStyle("0.1rem")}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{file.name}</strong>
                <span style={mutedTextStyle()}>{file.size}</span>
              </div>
              <Badge color={file.color} variant="lighter">{file.status}</Badge>
            </div>
            <Progress value={file.progress} tone={file.progress === 100 ? "success" : "primary"} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ChatPanelWidget({
  title = "Support chat",
  subtitle = "Compact assistant thread with recent context and a fast reply field.",
  surface = "elevated",
  className,
  style
}: ChatPanelWidgetProps) {
  const messages = [
    { author: "Ava", role: "Customer", text: "The invoice sync looks delayed for our EU accounts.", status: "offline" as AvatarStatus },
    { author: "Zephr AI", role: "Assistant", text: "I found a retry backlog in the webhook worker. Want me to open the incident digest widget?", status: "online" as AvatarStatus },
    { author: "Maya", role: "Support", text: "Yes, and draft the customer update before I send it.", status: "busy" as AvatarStatus }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Chat</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="sky" variant="lighter">Live</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ ...stackStyle("0.75rem"), padding: "0.95rem", borderRadius: 14, border: "1px solid var(--z-color-border, #ebebeb)", background: "linear-gradient(180deg, var(--z-color-surface, #ffffff) 0%, var(--z-color-weak, #f7f7f7) 100%)" }}>
        {messages.map((message) => (
          <div key={`${message.author}-${message.text}`} style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }}>
            <Avatar name={message.author} size={34} status={message.status} />
            <div style={{ ...stackStyle("0.2rem"), padding: "0.8rem 0.9rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.92rem" }}>{message.author} · {message.role}</strong>
              <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "0.65rem", alignItems: "center" }}>
        <Input defaultValue="Draft a reply with next steps…" />
        <Button size="sm">Send</Button>
      </div>
    </Card>
  );
}

export function InviteMembersWidget({
  title = "Invite team members",
  subtitle = "Add collaborators, assign a role, and send access in one step.",
  surface = "elevated",
  className,
  style
}: InviteMembersWidgetProps) {
  const [emails, setEmails] = useState<string[]>(["maya@zephr.work", "noah@zephr.work"]);

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Team access</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="purple" variant="lighter">Admin</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <FormField label="Email addresses" hint="Press enter after each email to add multiple people.">
        <TagInput value={emails} onChange={setEmails} placeholder="name@company.com" />
      </FormField>
      <div style={{ ...inlineRowStyle(), padding: "0.85rem 0.95rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
        <div style={stackStyle("0.1rem")}>
          <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>Role</strong>
          <span style={mutedTextStyle()}>Editors can ship screens, reviewers can comment only.</span>
        </div>
        <Badge color="sky" variant="lighter">Editor</Badge>
      </div>
      {actionRow([{ label: "Send invites" }, { label: "Copy invite link", variant: "secondary" }])}
    </Card>
  );
}

export function TeamDirectoryWidget({
  title = "Team list",
  subtitle = "Who is on the project, what they own, and whether they are available right now.",
  surface = "elevated",
  className,
  style
}: TeamDirectoryWidgetProps) {
  const members = [
    { name: "Maya Carter", role: "Frontend lead", note: "Owns billing flows", status: "online" as AvatarStatus },
    { name: "Noah Kim", role: "Design systems", note: "Maintains component contracts", status: "busy" as AvatarStatus },
    { name: "Liam Torres", role: "Product", note: "Launch planning and QA", status: "online" as AvatarStatus }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Directory</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="green" variant="lighter">{members.length} members</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.8rem")}>
        {members.map((member) => (
          <div key={member.name} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center", padding: "0.8rem 0.9rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={personMetaStyle()}>
              <Avatar name={member.name} size={34} status={member.status} />
              <div style={personCopyStyle()}>
                <strong style={{ color: "var(--z-color-text, #171717)" }}>{member.name}</strong>
                <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>{member.role} · {member.note}</span>
              </div>
            </div>
            <Badge tone={member.status === "busy" ? "danger" : "success"}>
              {member.status === "busy" ? "Busy" : "Available"}
            </Badge>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Manage access", variant: "secondary" }])}
    </Card>
  );
}

export function SettingsPanelWidget({
  title = "Workspace settings",
  subtitle = "Common account controls that combine switches, status, and action buttons.",
  surface = "elevated",
  className,
  style
}: SettingsPanelWidgetProps) {
  const [auditEnabled, setAuditEnabled] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const rows = [
    {
      title: "Audit logging",
      description: "Track publish, billing, and access changes for the workspace.",
      value: auditEnabled,
      onChange: setAuditEnabled,
    },
    {
      title: "Weekly digest",
      description: "Send a Friday summary with usage, shipping progress, and incidents.",
      value: weeklySummary,
      onChange: setWeeklySummary,
    },
    {
      title: "Maintenance mode",
      description: "Show a maintenance notice before publishing risky migrations.",
      value: maintenanceMode,
      onChange: setMaintenanceMode,
    }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Settings</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge tone="neutral">3 controls</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.8rem")}>
        {rows.map((row) => (
          <div key={row.title} style={{ ...inlineRowStyle(), alignItems: "center", padding: "0.85rem 0.95rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={stackStyle("0.15rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{row.title}</strong>
              <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>{row.description}</span>
            </div>
            <Switch checked={row.value} onChange={row.onChange} />
          </div>
        ))}
      </div>
      {actionRow([{ label: "Save settings" }, { label: "Reset defaults", variant: "secondary" }])}
    </Card>
  );
}

export function LaunchProgressWidget({
  title = "Launch progress",
  subtitle = "Track remaining work across design, QA, and customer-facing comms.",
  surface = "elevated",
  className,
  style
}: LaunchProgressWidgetProps) {
  const steps = [
    { label: "Finalize component tokens", progress: 100, tone: "success" as ProgressTone },
    { label: "QA the billing flows", progress: 72, tone: "warning" as ProgressTone },
    { label: "Draft customer announcement", progress: 45, tone: "primary" as ProgressTone }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Progress</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="green" variant="lighter">76% overall</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.85rem")}>
        {steps.map((step) => (
          <div key={step.label} style={{ ...stackStyle("0.4rem"), padding: "0.85rem 0.95rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{step.label}</strong>
              <span style={mutedTextStyle()}>{step.progress}%</span>
            </div>
            <Progress value={step.progress} tone={step.tone} />
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open launch board" }, { label: "Export checklist", variant: "secondary" }])}
    </Card>
  );
}

export function NotificationFeedWidget({
  title = "Notifications feed",
  subtitle = "A mixed feed for approvals, releases, mentions, and customer-facing alerts.",
  surface = "elevated",
  className,
  style
}: NotificationFeedWidgetProps) {
  const items = [
    { label: "Pricing update approved", detail: "Maya approved the Q2 enterprise pricing change.", badge: { label: "Approved", color: "green" as BadgeColor } },
    { label: "2 new support mentions", detail: "Customer ops mentioned billing retries in #launch-war-room.", badge: { label: "Unread", color: "blue" as BadgeColor } },
    { label: "Scheduled publish in 30 min", detail: "Homepage hero and changelog copy are queued for publish.", badge: { label: "Scheduled", color: "orange" as BadgeColor } }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Inbox</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="blue" variant="lighter">Live feed</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {items.map((item) => (
          <div key={item.label} style={{ ...stackStyle("0.35rem"), padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item.label}</strong>
              <Badge color={item.badge.color} variant="lighter">{item.badge.label}</Badge>
            </div>
            <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{item.detail}</p>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open inbox" }, { label: "Mark all read", variant: "secondary" }])}
    </Card>
  );
}

export function SecurityAccessWidget({
  title = "Security & access",
  subtitle = "A compact admin surface for SSO, audit logging, and role-sensitive controls.",
  surface = "elevated",
  className,
  style
}: SecurityAccessWidgetProps) {
  const [ssoEnabled, setSsoEnabled] = useState(true);
  const [scimEnabled, setScimEnabled] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);
  const rows = [
    { title: "Enforce SSO", detail: "Require Google or SAML for every workspace login.", value: ssoEnabled, setter: setSsoEnabled },
    { title: "SCIM provisioning", detail: "Automatically add and remove users from your directory.", value: scimEnabled, setter: setScimEnabled },
    { title: "Session alerts", detail: "Notify admins when sign-ins happen from new devices.", value: sessionAlerts, setter: setSessionAlerts }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Security</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="purple" variant="lighter">Admin</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <Alert size="xs" variant="stroke" status="info" title="2FA is active for all owners." description="Review guest access before inviting external collaborators." />
      <div style={stackStyle("0.8rem")}>
        {rows.map((row) => (
          <div key={row.title} style={{ ...inlineRowStyle(), alignItems: "center", padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={stackStyle("0.15rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{row.title}</strong>
              <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>{row.detail}</span>
            </div>
            <Switch checked={row.value} onChange={row.setter} />
          </div>
        ))}
      </div>
      {actionRow([{ label: "Review access logs" }, { label: "Export audit trail", variant: "secondary" }])}
    </Card>
  );
}

export function PaymentMethodsWidget({
  title = "Payment methods",
  subtitle = "A reusable billing block for cards, invoices, and plan-level payment preferences.",
  surface = "elevated",
  className,
  style
}: PaymentMethodsWidgetProps) {
  const methods = [
    { label: "Visa ending 4242", meta: "Expires 08/27 · Default for subscriptions", tone: "neutral" as const },
    { label: "Mastercard ending 1188", meta: "Used for failed retry fallback", tone: "neutral" as const },
    { label: "Net 30 invoice", meta: "Enterprise invoice route for annual renewal", tone: "info" as const }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Billing</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge tone="neutral">3 methods</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.8rem")}>
        {methods.map((method, index) => (
          <div key={method.label} style={{ ...inlineRowStyle(), alignItems: "center", padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={stackStyle("0.15rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{method.label}</strong>
              <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>{method.meta}</span>
            </div>
            <Badge tone={method.tone} variant="lighter">{index === 0 ? "Default" : method.label.includes("invoice") ? "Invoice" : "Card"}</Badge>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Add payment method" }, { label: "Download invoices", variant: "secondary" }])}
    </Card>
  );
}

export function ActivityTimelineWidget({
  title = "Recent activity",
  subtitle = "A compact timeline for launches, merges, comments, and operational updates.",
  surface = "elevated",
  className,
  style
}: ActivityTimelineWidgetProps) {
  const activity = [
    { actor: "Maya", note: "merged the button loading state polish", time: "12m ago", badge: "Merged" },
    { actor: "Noah", note: "updated the invite flow copy for enterprise workspaces", time: "31m ago", badge: "Edited" },
    { actor: "Akhil", note: "published widget gallery changes to staging", time: "1h ago", badge: "Deploy" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Timeline</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="blue" variant="lighter">Today</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.9rem")}>
        {activity.map((item, index) => (
          <div key={`${item.actor}-${item.time}`} style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
              <Avatar name={item.actor} size={32} />
              {index !== activity.length - 1 ? <div style={{ width: 1, flex: 1, minHeight: 28, background: "var(--z-color-border, #ebebeb)" }} /> : null}
            </div>
            <div style={{ ...stackStyle("0.25rem"), padding: "0.15rem 0 0.65rem" }}>
              <div style={inlineRowStyle()}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item.actor}</strong>
                <span style={{ ...mutedTextStyle(), fontSize: "0.84rem" }}>{item.time}</span>
              </div>
              <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{item.note}</p>
              <div><Badge color="gray" variant="stroke">{item.badge}</Badge></div>
            </div>
          </div>
        ))}
      </div>
      {actionRow([{ label: "View activity log", variant: "secondary" }])}
    </Card>
  );
}

export function CommandPaletteWidget({
  title = "Command palette",
  subtitle = "A fast command surface for global navigation, actions, and recent entities.",
  surface = "elevated",
  className,
  style
}: CommandPaletteWidgetProps) {
  const commands = [
    { label: "Create release", meta: "Workflow · cmd+k", badge: "Action" },
    { label: "Open billing usage", meta: "Settings · b", badge: "Page" },
    { label: "Invite team member", meta: "Team · i", badge: "Shortcut" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={stackStyle("0.4rem")}>
        <div style={kickerStyle()}>Command</div>
        <h3 style={titleStyle()}>{title}</h3>
        <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      </div>
      <Input defaultValue="Search actions, pages, or team members…" />
      <div style={stackStyle("0.7rem")}>
        {commands.map((command) => (
          <div key={command.label} style={{ ...inlineRowStyle(), padding: "0.85rem 0.95rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={stackStyle("0.12rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{command.label}</strong>
              <span style={mutedTextStyle()}>{command.meta}</span>
            </div>
            <Badge color="gray" variant="stroke">{command.badge}</Badge>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open palette" }, { label: "Edit shortcuts", variant: "secondary" }])}
    </Card>
  );
}

export function KanbanBoardWidget({
  title = "Kanban board",
  subtitle = "A compact task board for design, review, and shipping workflows.",
  surface = "elevated",
  className,
  style
}: KanbanBoardWidgetProps) {
  const lanes = [
    { title: "Backlog", color: "gray" as BadgeColor, cards: ["Audit widgets page", "Review upload edge cases"] },
    { title: "In review", color: "orange" as BadgeColor, cards: ["Invite flow polish", "Changelog copy update"] },
    { title: "Done", color: "green" as BadgeColor, cards: ["Button loading state", "Alert sizing pass"] }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={stackStyle("0.4rem")}>
        <div style={kickerStyle()}>Board</div>
        <h3 style={titleStyle()}>{title}</h3>
        <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.75rem" }}>
        {lanes.map((lane) => (
          <div key={lane.title} style={{ ...stackStyle("0.65rem"), padding: "0.8rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.9rem" }}>{lane.title}</strong>
              <Badge color={lane.color} variant="lighter">{lane.cards.length}</Badge>
            </div>
            <div style={stackStyle("0.55rem")}>
              {lane.cards.map((card) => (
                <div key={card} style={{ padding: "0.75rem 0.8rem", borderRadius: 10, background: "var(--z-color-weak, var(--z-color-background, #f7f7f7))", border: "1px solid var(--z-color-border, #ebebeb)" }}>
                  <span style={{ color: "var(--z-color-text, #171717)", fontSize: "0.88rem", lineHeight: 1.5 }}>{card}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function EventSchedulerWidget({
  title = "Event scheduler",
  subtitle = "A small scheduling block for launches, demos, or stakeholder reviews.",
  surface = "elevated",
  className,
  style
}: EventSchedulerWidgetProps) {
  const [guests, setGuests] = useState<string[]>(["maya@zephr.work", "noah@zephr.work"]);

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={stackStyle("0.4rem")}>
        <div style={kickerStyle()}>Scheduler</div>
        <h3 style={titleStyle()}>{title}</h3>
        <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.8rem" }}>
        <FormField label="Event title" htmlFor="scheduler-title">
          <Input id="scheduler-title" defaultValue="Launch review sync" />
        </FormField>
        <FormField label="Time" htmlFor="scheduler-time">
          <Input id="scheduler-time" defaultValue="Thu, 4:30 PM" />
        </FormField>
      </div>
      <FormField label="Guests" hint="Add people from your team or customer accounts.">
        <TagInput value={guests} onChange={setGuests} placeholder="name@company.com" />
      </FormField>
      {actionRow([{ label: "Schedule meeting" }, { label: "Save draft", variant: "secondary" }])}
    </Card>
  );
}

export function CommentThreadWidget({
  title = "Comment thread",
  subtitle = "A review thread for design QA, docs editing, or launch feedback.",
  surface = "elevated",
  className,
  style
}: CommentThreadWidgetProps) {
  const comments = [
    { name: "Maya Carter", role: "Design systems", status: "online" as AvatarStatus, note: "The file upload card should stay compact on tablet widths." },
    { name: "Akhil Krishnan", role: "Product", status: "busy" as AvatarStatus, note: "Agreed. Keep the action row on one line and reduce header density." }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={stackStyle("0.4rem")}>
        <div style={kickerStyle()}>Comments</div>
        <h3 style={titleStyle()}>{title}</h3>
        <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      </div>
      <div style={stackStyle("0.8rem")}>
        {comments.map((comment) => (
          <div key={comment.name} style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: "0.75rem", alignItems: "start", padding: "0.85rem 0.95rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <Avatar name={comment.name} size={34} status={comment.status} />
            <div style={stackStyle("0.25rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{comment.name} · {comment.role}</strong>
              <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{comment.note}</p>
            </div>
          </div>
        ))}
      </div>
      <FormField label="Reply" htmlFor="comment-reply">
        <Textarea id="comment-reply" rows={3} defaultValue="Looks good. I’ll tighten the spacing and update the responsive layout." />
      </FormField>
      {actionRow([{ label: "Post reply" }, { label: "Resolve thread", variant: "secondary" }])}
    </Card>
  );
}

export function PlanComparisonWidget({
  title = "Plan comparison",
  subtitle = "A compact pricing widget for upgrades, workspace seats, and feature access.",
  surface = "elevated",
  className,
  style
}: PlanComparisonWidgetProps) {
  const plans = [
    { name: "Individual", price: "$79", seats: "1 seat", featured: false },
    { name: "Startup", price: "$249", seats: "10 seats", featured: true },
    { name: "Enterprise", price: "Custom", seats: "Unlimited", featured: false }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={stackStyle("0.4rem")}>
        <div style={kickerStyle()}>Pricing</div>
        <h3 style={titleStyle()}>{title}</h3>
        <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.75rem" }}>
        {plans.map((plan) => (
          <div key={plan.name} style={{ ...stackStyle("0.45rem"), padding: "0.9rem 1rem", borderRadius: 12, border: `1px solid ${plan.featured ? "var(--z-color-primary, #121212)" : "var(--z-color-border, #ebebeb)"}`, background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{plan.name}</strong>
              {plan.featured ? <Badge color="blue" variant="lighter">Popular</Badge> : null}
            </div>
            <div style={{ color: "var(--z-color-text, #171717)", fontSize: "1.15rem", fontWeight: 700 }}>{plan.price}</div>
            <span style={mutedTextStyle()}>{plan.seats}</span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Upgrade plan" }, { label: "Compare features", variant: "secondary" }])}
    </Card>
  );
}

export function AssetReviewWidget({
  title = "Asset review",
  subtitle = "A media approval widget for content, homepage assets, and campaign files.",
  surface = "elevated",
  className,
  style
}: AssetReviewWidgetProps) {
  const [approved, setApproved] = useState<string[]>(["hero-shot.png"]);
  const assets = ["hero-shot.png", "pricing-card.png", "launch-thumbnail.mp4"];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={stackStyle("0.4rem")}>
        <div style={kickerStyle()}>Review</div>
        <h3 style={titleStyle()}>{title}</h3>
        <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      </div>
      <div style={stackStyle("0.75rem")}>
        {assets.map((asset) => {
          const isApproved = approved.includes(asset);
          return (
            <div key={asset} style={{ display: "grid", gridTemplateColumns: "84px minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center", padding: "0.85rem 0.95rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
              <div style={{ height: 56, borderRadius: 10, background: "linear-gradient(135deg, rgba(51,92,255,0.14), rgba(17,24,39,0.06))", border: "1px solid var(--z-color-border, #ebebeb)" }} />
              <div style={stackStyle("0.15rem")}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{asset}</strong>
                <span style={mutedTextStyle()}>{isApproved ? "Approved for publish" : "Needs final review"}</span>
              </div>
              <Button
                size="sm"
                variant={isApproved ? "secondary" : "primary"}
                onClick={() =>
                  setApproved((current) =>
                    current.includes(asset) ? current.filter((item) => item !== asset) : [...current, asset]
                  )
                }
              >
                {isApproved ? "Approved" : "Approve"}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function ApiKeysWidget({
  title = "API keys",
  subtitle = "Manage internal tokens, scopes, and rotation without leaving the billing or settings surface.",
  surface = "elevated",
  className,
  style
}: ApiKeysWidgetProps) {
  const keys = [
    { label: "Production webhooks", scope: "Write · Billing · Webhooks", status: "Active", lastRotated: "Rotated 12 days ago" },
    { label: "Internal automation", scope: "Read · Components · Themes", status: "Staging", lastRotated: "Rotated yesterday" },
    { label: "Audit exports", scope: "Read · Audit · Licenses", status: "Limited", lastRotated: "Rotate this week" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Developer access</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge tone="neutral">3 keys</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {keys.map((key) => (
          <div key={key.label} style={{ ...stackStyle("0.28rem"), padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{key.label}</strong>
              <Badge variant="lighter" color={key.status === "Active" ? "green" : key.status === "Staging" ? "blue" : "yellow"}>{key.status}</Badge>
            </div>
            <span style={mutedTextStyle()}>{key.scope}</span>
            <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{key.lastRotated}</span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Create key" }, { label: "Rotate selected", variant: "secondary" }])}
    </Card>
  );
}

export function SupportQueueWidget({
  title = "Support queue",
  subtitle = "A triage block for customer conversations, severity, ownership, and response SLA.",
  surface = "elevated",
  className,
  style
}: SupportQueueWidgetProps) {
  const tickets = [
    { customer: "Northstar", issue: "Invoice retries failing after card update", owner: "Maya", priority: "Urgent" },
    { customer: "Patchwork", issue: "CSV export missing transaction notes", owner: "Noah", priority: "High" },
    { customer: "Vector Labs", issue: "Need onboarding help for new finance users", owner: "Liam", priority: "Normal" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Support</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="orange" variant="lighter">7 open</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {tickets.map((ticket) => (
          <div key={ticket.customer + ticket.issue} style={{ ...stackStyle("0.35rem"), padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{ticket.customer}</strong>
              <Badge color={ticket.priority === "Urgent" ? "red" : ticket.priority === "High" ? "yellow" : "gray"} variant="lighter">{ticket.priority}</Badge>
            </div>
            <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{ticket.issue}</p>
            <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>Owner: {ticket.owner}</span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open queue" }, { label: "Assign owner", variant: "secondary" }])}
    </Card>
  );
}

export function GoalTrackerWidget({
  title = "Goal tracker",
  subtitle = "Track quarter goals, delivery confidence, and the initiatives most likely to move the metric.",
  surface = "elevated",
  className,
  style
}: GoalTrackerWidgetProps) {
  const goals = [
    { label: "Increase trial activation", progress: 68, tone: "primary" as ProgressTone, note: "New onboarding template shipping next week" },
    { label: "Reduce support first response", progress: 81, tone: "success" as ProgressTone, note: "Support queue widget now live for ops" },
    { label: "Improve upgrade conversion", progress: 47, tone: "warning" as ProgressTone, note: "Pricing page still needs A/B copy pass" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Goals</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="teal" variant="lighter">Quarterly</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.85rem")}>
        {goals.map((goal) => (
          <div key={goal.label} style={{ ...stackStyle("0.38rem"), padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{goal.label}</strong>
              <span style={mutedTextStyle()}>{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} tone={goal.tone} />
            <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{goal.note}</span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open goals" }, { label: "Update targets", variant: "secondary" }])}
    </Card>
  );
}

export function IntegrationStatusWidget({
  title = "Integration status",
  subtitle = "Monitor third-party dependencies, sync health, and degraded connections before customers notice.",
  surface = "elevated",
  className,
  style
}: IntegrationStatusWidgetProps) {
  const integrations = [
    { name: "Lemon Squeezy", detail: "Checkout webhooks healthy", tone: "success" as const },
    { name: "Supabase", detail: "Replication lag below 120ms", tone: "success" as const },
    { name: "Vercel", detail: "One staging deploy failed 24m ago", tone: "warning" as const },
    { name: "Figma sync", detail: "Token export paused awaiting review", tone: "info" as const }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Integrations</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="blue" variant="lighter">4 connected</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {integrations.map((integration) => (
          <div key={integration.name} style={{ ...inlineRowStyle(), alignItems: "center", padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={stackStyle("0.15rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{integration.name}</strong>
              <span style={mutedTextStyle()}>{integration.detail}</span>
            </div>
            <Badge
              color={integration.tone === "success" ? "green" : integration.tone === "warning" ? "yellow" : "blue"}
              variant="lighter"
            >
              {integration.tone === "success" ? "Healthy" : integration.tone === "warning" ? "Attention" : "Review"}
            </Badge>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open status page" }, { label: "Retry sync", variant: "secondary" }])}
    </Card>
  );
}

export function AccessRequestsWidget({
  title = "Access requests",
  subtitle = "Review pending access changes, elevated roles, and guest requests before they reach production.",
  surface = "elevated",
  className,
  style
}: AccessRequestsWidgetProps) {
  const requests = [
    { name: "Ari Patel", request: "Admin access for billing workspace", reason: "Owns month-end reconciliations", badge: "Admin" },
    { name: "Sara Wong", request: "Guest access to launch room", reason: "External copy review for homepage update", badge: "Guest" },
    { name: "Nina Park", request: "Security log export", reason: "Quarterly audit prep", badge: "Audit" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Access</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="purple" variant="lighter">3 pending</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {requests.map((request) => (
          <div key={request.name + request.request} style={{ ...stackStyle("0.28rem"), padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{request.name}</strong>
              <Badge color={request.badge === "Admin" ? "red" : request.badge === "Guest" ? "yellow" : "gray"} variant="lighter">{request.badge}</Badge>
            </div>
            <span style={{ color: "var(--z-color-text, #171717)", fontSize: "0.88rem" }}>{request.request}</span>
            <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{request.reason}</span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Review requests" }, { label: "Bulk approve", variant: "secondary" }])}
    </Card>
  );
}

export function LicenseActivationsWidget({
  title = "License activations",
  subtitle = "Track active seats, recent activations, and reset requests across customer workspaces.",
  surface = "elevated",
  className,
  style
}: LicenseActivationsWidgetProps) {
  const workspaces = [
    { name: "Northstar", usage: "8 / 10 seats", status: "Healthy", detail: "Last activation 3h ago" },
    { name: "Patchwork", usage: "3 / 3 seats", status: "At limit", detail: "1 reset request pending" },
    { name: "Vector Labs", usage: "14 / 20 seats", status: "Healthy", detail: "2 devices added today" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Licensing</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge tone="neutral">3 accounts</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {workspaces.map((workspace) => (
          <div key={workspace.name} style={{ ...stackStyle("0.3rem"), padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{workspace.name}</strong>
              <Badge color={workspace.status === "At limit" ? "yellow" : "green"} variant="lighter">{workspace.status}</Badge>
            </div>
            <span style={mutedTextStyle()}>{workspace.usage}</span>
            <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{workspace.detail}</span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open license admin" }, { label: "Reset activation", variant: "secondary" }])}
    </Card>
  );
}

export function ExperimentResultsWidget({
  title = "Experiment results",
  subtitle = "Review conversion deltas, confidence, and rollout recommendations before shipping a winner.",
  surface = "elevated",
  className,
  style
}: ExperimentResultsWidgetProps) {
  const variants = [
    { name: "Control", uplift: "0%", confidence: "Baseline", tone: "subtle" as const },
    { name: "Variant B", uplift: "+11.4%", confidence: "95% confidence", tone: "success" as const },
    { name: "Variant C", uplift: "+3.2%", confidence: "Needs more traffic", tone: "info" as const }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Experiments</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="green" variant="lighter">Winner found</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {variants.map((variant) => (
          <div key={variant.name} style={{ ...inlineRowStyle(), alignItems: "center", padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={stackStyle("0.15rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{variant.name}</strong>
              <span style={mutedTextStyle()}>{variant.confidence}</span>
            </div>
            <Badge tone={variant.tone} variant="lighter">{variant.uplift}</Badge>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Roll out winner" }, { label: "View full report", variant: "secondary" }])}
    </Card>
  );
}

export function ReleaseNotesWidget({
  title = "Release notes",
  subtitle = "Draft launch communication, checklist the announcement, and keep the final publish path in one block.",
  surface = "elevated",
  className,
  style
}: ReleaseNotesWidgetProps) {
  const [channels, setChannels] = useState<string[]>(["In-app changelog", "Email digest"]);

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Comms</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="blue" variant="lighter">Draft</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <FormField label="Headline" htmlFor="release-notes-headline">
        <Input id="release-notes-headline" defaultValue="New widgets gallery and page templates are now live" />
      </FormField>
      <FormField label="Summary" htmlFor="release-notes-body">
        <Textarea id="release-notes-body" rows={4} defaultValue="This release adds reusable workflow widgets, filterable page templates, and a faster docs experience through route-level chunking." />
      </FormField>
      <FormField label="Channels">
        <TagInput value={channels} onChange={setChannels} placeholder="Add a publish channel" />
      </FormField>
      {actionRow([{ label: "Publish notes" }, { label: "Save draft", variant: "secondary" }])}
    </Card>
  );
}

export function AnalyticsOverviewWidget({
  title = "Analytics overview",
  subtitle = "Track the top-line signals that drive product and growth decisions from one compact view.",
  surface = "elevated",
  className,
  style
}: AnalyticsOverviewWidgetProps) {
  const stats = [
    { label: "Active workspaces", value: "1,284", delta: "+8.2%" },
    { label: "Weekly retention", value: "72.4%", delta: "+2.1%" },
    { label: "Avg. session", value: "18m", delta: "-1.3%" },
    { label: "Net expansion", value: "14.8%", delta: "+4.7%" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Analytics</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="blue" variant="lighter">Realtime</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.75rem" }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ ...stackStyle("0.25rem"), padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <span style={mutedTextStyle()}>{stat.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "1.05rem" }}>{stat.value}</strong>
            <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{stat.delta} vs last week</span>
          </div>
        ))}
      </div>
      <Alert size="xs" variant="stroke" status="info" title="Acquisition is trending up." description="Conversion from the new onboarding path is materially outperforming control." />
      {actionRow([{ label: "Open dashboard" }, { label: "Export snapshot", variant: "secondary" }])}
    </Card>
  );
}

export function DealsPipelineWidget({
  title = "Deals pipeline",
  subtitle = "Review commercial opportunities, deal stages, and owner context without leaving the main workspace.",
  surface = "elevated",
  className,
  style
}: DealsPipelineWidgetProps) {
  const deals = [
    { name: "Northstar expansion", owner: "Maya Carter", stage: "Proposal", value: "$18k ARR", color: "blue" as BadgeColor },
    { name: "Patchwork renewal", owner: "Liam Torres", stage: "Negotiation", value: "$32k ARR", color: "orange" as BadgeColor },
    { name: "Vector Labs pilot", owner: "Noah Kim", stage: "Qualified", value: "$9k ARR", color: "green" as BadgeColor }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>CRM</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="teal" variant="lighter">3 active</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {deals.map((deal) => (
          <div key={deal.name} style={{ ...inlineRowStyle(), alignItems: "center", padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={stackStyle("0.15rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{deal.name}</strong>
              <span style={mutedTextStyle()}>{deal.owner} · {deal.value}</span>
            </div>
            <Badge color={deal.color} variant="lighter">{deal.stage}</Badge>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open pipeline" }, { label: "Add opportunity", variant: "secondary" }])}
    </Card>
  );
}

export function BillingRecoveryWidget({
  title = "Billing recovery",
  subtitle = "Prioritize failed charges, retry health, and intervention paths before revenue slips further.",
  surface = "elevated",
  className,
  style
}: BillingRecoveryWidgetProps) {
  const invoices = [
    { account: "Pine Labs", amount: "$1,240", state: "Retry tonight", color: "orange" as BadgeColor },
    { account: "Atlas Studio", amount: "$420", state: "Card updated", color: "green" as BadgeColor },
    { account: "Northstar", amount: "$890", state: "Needs outreach", color: "red" as BadgeColor }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Recovery</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="orange" variant="lighter">3 at risk</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <Progress value={64} tone="warning" />
      <div style={stackStyle("0.75rem")}>
        {invoices.map((invoice) => (
          <div key={invoice.account} style={{ ...inlineRowStyle(), alignItems: "center", padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={stackStyle("0.15rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{invoice.account}</strong>
              <span style={mutedTextStyle()}>{invoice.amount}</span>
            </div>
            <Badge color={invoice.color} variant="lighter">{invoice.state}</Badge>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open dunning queue" }, { label: "Send reminders", variant: "secondary" }])}
    </Card>
  );
}

export function AutomationRunsWidget({
  title = "Automation runs",
  subtitle = "Monitor scheduled jobs, agent runs, and webhook-triggered automations before they block your team.",
  surface = "elevated",
  className,
  style
}: AutomationRunsWidgetProps) {
  const runs = [
    { name: "Weekly release digest", meta: "Completed 12m ago", status: "Healthy", color: "green" as BadgeColor },
    { name: "Invoice retry sync", meta: "Delayed by 4m", status: "Delayed", color: "orange" as BadgeColor },
    { name: "Workspace usage backfill", meta: "Queued", status: "Queued", color: "gray" as BadgeColor }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Automations</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="purple" variant="lighter">3 jobs</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {runs.map((run) => (
          <div key={run.name} style={{ ...inlineRowStyle(), alignItems: "center", padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={stackStyle("0.15rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{run.name}</strong>
              <span style={mutedTextStyle()}>{run.meta}</span>
            </div>
            <Badge color={run.color} variant="lighter">{run.status}</Badge>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open run history" }, { label: "Retry failed", variant: "secondary" }])}
    </Card>
  );
}

export function AuditTrailWidget({
  title = "Audit trail",
  subtitle = "Track role changes, billing actions, and sensitive workspace events from one compact review surface.",
  surface = "elevated",
  className,
  style
}: AuditTrailWidgetProps) {
  const events = [
    { actor: "Maya Carter", action: "Changed owner role for Northstar", time: "9m ago", status: "Role change" },
    { actor: "Zephr Cloud", action: "Processed annual invoice for Patchwork", time: "24m ago", status: "Billing" },
    { actor: "Noah Kim", action: "Reset an enterprise license activation", time: "48m ago", status: "License" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Audit</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge tone="neutral">Tracked</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {events.map((event) => (
          <div key={`${event.actor}-${event.time}`} style={{ ...stackStyle("0.2rem"), padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{event.actor}</strong>
              <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{event.time}</span>
            </div>
            <span style={mutedTextStyle()}>{event.action}</span>
            <div><Badge color="gray" variant="stroke">{event.status}</Badge></div>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open audit log" }, { label: "Export CSV", variant: "secondary" }])}
    </Card>
  );
}

export function ContentCalendarWidget({
  title = "Content calendar",
  subtitle = "Coordinate launches, changelog updates, and campaign assets on one schedule-aware publishing board.",
  surface = "elevated",
  className,
  style
}: ContentCalendarWidgetProps) {
  const items = [
    { day: "Mon", label: "Release notes draft", owner: "Akhil" },
    { day: "Wed", label: "Homepage asset review", owner: "Noah" },
    { day: "Fri", label: "Product update email", owner: "Maya" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Content ops</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="blue" variant="lighter">This week</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.75rem" }}>
        {items.map((item) => (
          <div key={item.label} style={{ ...stackStyle("0.25rem"), padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{item.day}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item.label}</strong>
            <span style={mutedTextStyle()}>{item.owner}</span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open calendar" }, { label: "Add publish item", variant: "secondary" }])}
    </Card>
  );
}

export function IncidentResponseWidget({
  title = "Incident response",
  subtitle = "Keep incident state, owner handoff, and active mitigation steps visible while the team is in flight.",
  surface = "elevated",
  className,
  style
}: IncidentResponseWidgetProps) {
  const tasks = [
    { label: "Identify failing service", done: true },
    { label: "Draft customer notice", done: true },
    { label: "Validate webhook retries", done: false },
    { label: "Prepare follow-up postmortem", done: false }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Reliability</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="red" variant="lighter">P1 active</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <Alert size="xs" variant="stroke" status="error" title="Webhook retries are degraded in eu-west." description="Customer-facing comms are live. Mitigation is in progress." />
      <div style={stackStyle("0.7rem")}>
        {tasks.map((task) => (
          <div key={task.label} style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center" }}>
            <Checkbox checked={task.done} readOnly />
            <span style={mutedTextStyle()}>{task.label}</span>
            <Badge color={task.done ? "green" : "orange"} variant="lighter">{task.done ? "Done" : "Active"}</Badge>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Open incident room" }, { label: "Post update", variant: "secondary" }])}
    </Card>
  );
}

export function FeedbackInboxWidget({
  title = "Feedback inbox",
  subtitle = "Collect qualitative product feedback, group themes, and route follow-up without losing the thread.",
  surface = "elevated",
  className,
  style
}: FeedbackInboxWidgetProps) {
  const feedback = [
    { source: "Enterprise call", note: "Need exportable audit logs for compliance review.", theme: "Compliance" },
    { source: "Support chat", note: "Invite flow should clarify role differences.", theme: "Onboarding" },
    { source: "Beta customer", note: "Billing recovery data should expose retry reason.", theme: "Billing" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Feedback</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="teal" variant="lighter">3 themes</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={stackStyle("0.75rem")}>
        {feedback.map((item) => (
          <div key={item.note} style={{ ...stackStyle("0.2rem"), padding: "0.9rem 1rem", borderRadius: 12, border: "1px solid var(--z-color-border, #ebebeb)", background: "var(--z-color-surface, #ffffff)" }}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item.source}</strong>
              <Badge color="blue" variant="lighter">{item.theme}</Badge>
            </div>
            <span style={mutedTextStyle()}>{item.note}</span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Review feedback" }, { label: "Create insight", variant: "secondary" }])}
    </Card>
  );
}
