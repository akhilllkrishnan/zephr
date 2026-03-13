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

export interface WelcomeProfileWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ReferralRewardWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface SetupJourneyWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface DeliveryTimelineWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface TravelItineraryWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface PromptComposerWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface ConversionScoreWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export interface MarketingInsightsWidgetProps {
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
    border: "1px solid color-mix(in srgb, var(--z-color-border, #ebebeb) 88%, #ffffff 12%)",
    background: "var(--z-color-surface, #ffffff)",
    boxShadow: "none",
    ...style
  };
}

function panelStyle(style?: CSSProperties): CSSProperties {
  return {
    padding: "1rem",
    borderRadius: 18,
    border: "1px solid color-mix(in srgb, var(--z-color-border, #ebebeb) 92%, #ffffff 8%)",
    background: "var(--z-color-background100, #f4f6fa)",
    ...style
  };
}

function summaryBandStyle(style?: CSSProperties): CSSProperties {
  return {
    padding: "1rem 1.1rem",
    borderRadius: 18,
    border: "1px solid color-mix(in srgb, var(--z-color-border, #ebebeb) 92%, #ffffff 8%)",
    background: "var(--z-color-background100, #f4f6fa)",
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

function dividedListStyle(style?: CSSProperties): CSSProperties {
  return {
    display: "grid",
    gap: 0,
    ...style
  };
}

function dividedRowStyle(style?: CSSProperties): CSSProperties {
  return {
    padding: "0.95rem 0",
    borderTop: "1px solid var(--z-color-border, #ebebeb)",
    ...style
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
    fontSize: "1.12rem",
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
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
      <div
        style={{
          ...summaryBandStyle(),
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem"
        }}
      >
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            style={{
              ...stackStyle("0.15rem"),
              paddingLeft: index === 0 ? 0 : "1rem",
              borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
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
      <div style={dividedListStyle()}>
        {accounts.map((account, index) => {
          const palette = healthColor(account.health);
          return (
            <div
              key={account.name}
              style={{
                ...stackStyle("0.5rem"),
                ...dividedRowStyle({
                  borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
                })
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

export function WelcomeProfileWidget({
  title = "Welcome to Zephr",
  subtitle = "Set up your profile, add a photo, and pick the name your team will see across every workspace.",
  surface = "elevated",
  className,
  style
}: WelcomeProfileWidgetProps) {
  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div
        style={{
          padding: "1rem",
          borderRadius: 24,
          border: "1px solid color-mix(in srgb, var(--z-color-border, #ebebeb) 86%, #ffffff 14%)",
          background:
            "radial-gradient(circle at 18% 12%, rgba(255, 189, 82, 0.32) 0%, rgba(255, 189, 82, 0) 28%), radial-gradient(circle at 88% 20%, rgba(245, 115, 71, 0.22) 0%, rgba(245, 115, 71, 0) 26%), linear-gradient(180deg, rgba(83, 153, 255, 0.96) 0%, rgba(218, 236, 255, 0.94) 62%, rgba(255, 255, 255, 1) 100%)",
          minHeight: 236,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 120px",
          alignItems: "end",
          gap: "1rem",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "1.2rem 1.2rem 0.55rem",
            borderRadius: 20,
            background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.78) 42%, rgba(255,255,255,0.98) 100%)"
          }}
        >
          <Badge color="sky" variant="lighter">Workspace setup</Badge>
          <h3 style={{ ...titleStyle(), fontSize: "1.72rem" }}>{title}</h3>
          <p style={{ ...mutedTextStyle(), margin: "0.45rem 0 0", lineHeight: 1.58, maxWidth: 420 }}>{subtitle}</p>
        </div>
        <div
          style={{
            justifySelf: "end",
            alignSelf: "stretch",
            width: "100%",
            maxWidth: 112,
            borderRadius: 18,
            background:
              "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 32%), radial-gradient(circle at 58% 82%, rgba(255, 162, 95, 0.5) 0%, rgba(255, 162, 95, 0) 34%), linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 100%)",
            border: "1px solid rgba(255,255,255,0.38)",
            position: "relative"
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: "18px 22px auto auto",
              width: 34,
              height: 34,
              borderRadius: 999,
              background: "rgba(255,255,255,0.42)",
              backdropFilter: "blur(10px)"
            }}
          />
        </div>
      </div>
      <div
        style={{
          ...dividedRowStyle({
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: "0.85rem",
            alignItems: "center",
            paddingTop: "1rem"
          })
        }}
      >
        <div style={personMetaStyle()}>
          <Avatar name="Ava" size={44} />
          <div style={personCopyStyle()}>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.95rem" }}>Your photo</strong>
            <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>PNG or JPG up to 5 MB · 500×500 recommended</span>
          </div>
        </div>
        <Button size="sm" variant="secondary">Upload</Button>
      </div>
      <div style={{ ...stackStyle("0.9rem"), paddingTop: "0.15rem" }}>
        <FormField label="Display name" htmlFor="widget-profile-name">
          <Input id="widget-profile-name" defaultValue="@username" />
        </FormField>
        <Button>Continue</Button>
      </div>
    </Card>
  );
}

export function ReferralRewardWidget({
  title = "Refer & earn",
  subtitle = "Share your invite link. Your friend gets credits and you earn the same reward after their first paid action.",
  surface = "elevated",
  className,
  style
}: ReferralRewardWidgetProps) {
  const steps = [
    "Share your invite link",
    "Your friend gets 10 credits when they subscribe",
    "You receive 10 credits for each referral"
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div
        style={{
          padding: "1.15rem",
          borderRadius: 24,
          background: "color-mix(in srgb, var(--z-color-background100, #f4f6fa) 74%, #ffffff 26%)",
          border: "1px solid color-mix(in srgb, var(--z-color-border, #ebebeb) 82%, #ffffff 18%)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 116px",
          gap: "1rem"
        }}
      >
        <div style={stackStyle("0.55rem")}>
          <Badge color="yellow" variant="lighter">Earn 10 credits</Badge>
          <h3 style={{ ...titleStyle(), fontSize: "1.6rem" }}>{title}</h3>
          <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55, maxWidth: 420 }}>{subtitle}</p>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            borderRadius: 18,
            background: "radial-gradient(circle at 32% 26%, rgba(255, 170, 66, 0.82) 0%, rgba(255, 170, 66, 0) 38%), radial-gradient(circle at 68% 62%, rgba(110, 120, 255, 0.72) 0%, rgba(110, 120, 255, 0.08) 48%), linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(248, 235, 255, 0.94) 100%)",
            border: "1px solid rgba(255,255,255,0.6)",
            position: "relative"
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: "16px 16px auto auto",
              padding: "0.25rem 0.55rem",
              borderRadius: 999,
              background: "rgba(255,255,255,0.72)",
              color: "var(--z-color-text, #171717)",
              fontSize: "0.72rem",
              fontWeight: 600
            }}
          >
            Invite
          </span>
        </div>
      </div>
      <div style={{ ...stackStyle("0"), borderTop: "1px solid var(--z-color-border, #ebebeb)" }}>
        {steps.map((step, index) => (
          <div
            key={step}
            style={{
              ...dividedRowStyle({
                display: "grid",
                gridTemplateColumns: "20px minmax(0, 1fr)",
                gap: "0.75rem",
                alignItems: "start"
              })
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "color-mix(in srgb, var(--accent, #121212) 8%, white)",
                color: "var(--accent, #121212)",
                fontSize: "0.72rem",
                fontWeight: 700
              }}
            >
              {index + 1}
            </div>
            <div style={stackStyle("0.14rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", lineHeight: 1.45, fontSize: "0.95rem" }}>{step}</strong>
              <span style={mutedTextStyle()}>{index === 0 ? "Post the link in your welcome flow or customer email." : index === 1 ? "Credits land instantly on the first paid action." : "Track rewarded conversions from the same referral surface."}</span>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          ...dividedRowStyle({
            paddingTop: "1rem"
          }),
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: "0.75rem",
          alignItems: "center"
        }}
      >
        <Input readOnly value="https://zephr.work/invite/ava-product" aria-label="Invite link" />
        <Button size="sm">Copy link</Button>
      </div>
    </Card>
  );
}

export function SetupJourneyWidget({
  title = "Let's get you live",
  subtitle = "Guide new accounts through a short setup path with visible progress and clear next actions.",
  surface = "elevated",
  className,
  style
}: SetupJourneyWidgetProps) {
  const steps = [
    { label: "Set up company", done: true },
    { label: "Create resource", active: true },
    { label: "Create service" },
    { label: "Link service with resource" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div style={stackStyle("0.3rem")}>
          <Badge color="green" variant="lighter">Onboarding</Badge>
          <h3 style={{ ...titleStyle(), fontSize: "1.5rem", margin: 0 }}>{title}</h3>
          <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{subtitle}</p>
        </div>
        <Button size="sm" variant="secondary">Dismiss</Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "56px minmax(0, 1fr) auto",
          gap: "0.9rem",
          alignItems: "center",
          padding: "1rem 0 0.95rem",
          borderTop: "1px solid var(--z-color-border, #ebebeb)"
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0.05) 100%)",
            color: "var(--z-color-success, #0a7d53)",
            fontSize: "1.4rem"
          }}
        >
          🚀
        </div>
        <div style={stackStyle("0.35rem")}>
          <Progress value={25} tone="success" />
          <span style={mutedTextStyle()}>Step 2 of 4 · 3 actions remaining before first publish</span>
        </div>
        <strong style={{ color: "var(--z-color-text, #171717)" }}>25%</strong>
      </div>
      <div style={dividedListStyle()}>
        {steps.map((step, index) => {
          const isDone = Boolean(step.done);
          const isActive = Boolean(step.active);
          return (
            <div
              key={step.label}
              style={{
                ...dividedRowStyle({
                  padding: "1rem 0"
                }),
                display: "grid",
                gridTemplateColumns: "42px minmax(0, 1fr) auto",
                gap: "0.9rem",
                alignItems: "center",
                background: "transparent"
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1.5px solid ${isDone || isActive ? "color-mix(in srgb, var(--accent, #121212) 55%, white)" : "var(--z-color-border, #ebebeb)"}`,
                  background: isDone ? "color-mix(in srgb, var(--accent, #121212) 16%, white)" : "var(--z-color-surface, #ffffff)",
                  color: isDone || isActive ? "var(--accent, #121212)" : "var(--z-color-muted, #667085)",
                  fontWeight: 700
                }}
              >
                {isDone ? "✓" : index + 1}
              </div>
              <div style={stackStyle("0.18rem")}>
                <strong style={{ color: isDone ? "var(--z-color-text, #171717)" : isActive ? "var(--z-color-text, #171717)" : "var(--z-color-muted, #667085)", fontSize: "0.98rem" }}>
                  {step.label}
                </strong>
                <span style={mutedTextStyle()}>
                  {isDone ? "Completed" : isActive ? "Recommended next step" : "Queued until the previous step is finished"}
                </span>
              </div>
              <Badge tone={isDone ? "success" : isActive ? "info" : "neutral"}>
                {isDone ? "Done" : isActive ? "Next" : "Locked"}
              </Badge>
            </div>
          );
        })}
      </div>
      <Button>Continue setup</Button>
    </Card>
  );
}

export function DeliveryTimelineWidget({
  title = "Delivery timeline",
  subtitle = "A customer-safe shipment tracker with status, timestamps, and an end-of-journey rating action.",
  surface = "elevated",
  className,
  style
}: DeliveryTimelineWidgetProps) {
  const stages = [
    { label: "Order confirmed", note: "Order placed and confirmed", time: "17 Nov, 13:45", icon: "□" },
    { label: "Shipping", note: "Handed to logistics provider", time: "17 Nov, 18:10", icon: "▣" },
    { label: "Transit", note: "Moving through the network", time: "18 Nov, 09:20", icon: "→" },
    { label: "Sent to customer", note: "Out for delivery", time: "18 Nov, 14:55", icon: "◎" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div style={stackStyle("0.25rem")}>
          <Badge color="sky" variant="lighter">Timeline</Badge>
          <h3 style={{ ...titleStyle(), margin: 0, fontSize: "1.35rem" }}>{title}</h3>
        </div>
        <Badge color="sky" variant="lighter">In progress</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{subtitle}</p>
      <div style={stackStyle("0.8rem")}>
        {stages.map((stage, index) => (
          <div key={stage.label} style={{ display: "grid", gridTemplateColumns: "44px minmax(0, 1fr) auto", gap: "0.9rem", alignItems: "start" }}>
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  border: "1px dashed var(--z-color-border, #ebebeb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--z-color-text, #171717)",
                  background: "var(--z-color-surface, #ffffff)"
                }}
              >
                {stage.icon}
              </div>
              {index < stages.length - 1 ? (
                <span
                  style={{
                    position: "absolute",
                    top: 48,
                    width: 1,
                    height: 40,
                    background: "var(--z-color-border, #ebebeb)"
                  }}
                />
              ) : null}
            </div>
            <div style={stackStyle("0.2rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }}>{stage.label}</strong>
              <span style={{ ...mutedTextStyle(), lineHeight: 1.5 }}>{stage.note}</span>
            </div>
            <span style={{ ...mutedTextStyle(), whiteSpace: "nowrap", fontSize: "0.86rem" }}>{stage.time}</span>
          </div>
        ))}
      </div>
      <Button variant="secondary">Rate this delivery</Button>
    </Card>
  );
}

export function TravelItineraryWidget({
  title = "Travel itinerary",
  subtitle = "A compact itinerary card for route-heavy products, mobility workflows, and travel planning.",
  surface = "elevated",
  className,
  style
}: TravelItineraryWidgetProps) {
  const legs = [
    {
      day: "Sat, 1 Feb 2025",
      time: "3:00",
      passengers: "5 passengers",
      from: "Prague",
      fromMeta: "Vaclav Havel Airport",
      to: "Berlin",
      toMeta: "Berlin Brandenburg"
    },
    {
      day: "Sun, 2 Feb 2025",
      time: "20:40",
      passengers: "8 passengers",
      from: "Dubai",
      fromMeta: "Dubai International",
      to: "Amsterdam",
      toMeta: "Amsterdam Schiphol"
    }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div style={stackStyle("0.2rem")}>
          <div style={kickerStyle()}>One way</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Button size="sm" variant="secondary">Edit search</Button>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{subtitle}</p>
      <div style={stackStyle("0.9rem")}>
        {legs.map((leg, index) => (
          <div
            key={leg.day}
            style={{
              ...stackStyle("0.7rem"),
              ...dividedRowStyle({
                padding: index === 0 ? "0.2rem 0 1rem" : "1rem 0 0.1rem"
              })
            }}
          >
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }}>{leg.day}</strong>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              <Badge tone="neutral">{leg.time}</Badge>
              <Badge tone="neutral">{leg.passengers}</Badge>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "20px minmax(0, 1fr)", gap: "0.75rem" }}>
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, border: "2px solid var(--z-color-text, #171717)", background: "var(--z-color-surface, #ffffff)", marginTop: 4 }} />
                <span style={{ position: "absolute", top: 16, width: 2, height: 32, background: "var(--z-color-text, #171717)" }} />
                <span style={{ position: "absolute", top: 54, width: 10, height: 10, borderRadius: 999, border: "2px solid var(--z-color-text, #171717)", background: "var(--z-color-surface, #ffffff)" }} />
              </div>
              <div style={stackStyle("1rem")}>
                <div style={stackStyle("0.15rem")}>
                  <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }}>{leg.from}</strong>
                  <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>{leg.fromMeta}</span>
                </div>
                <div style={stackStyle("0.15rem")}>
                  <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }}>{leg.to}</strong>
                  <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>{leg.toMeta}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PromptComposerWidget({
  title = "Prompt composer",
  subtitle = "A cleaner AI input surface for asset prompts, attachments, model selection, and send controls.",
  surface = "elevated",
  className,
  style
}: PromptComposerWidgetProps) {
  const [mode, setMode] = useState(0);
  const modes = ["Inspiration", "Production", "Storyboard"];
  const attachments = ["Add photos or videos", "Add 3D objects", "Add files (docs, PDF…)"];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={stackStyle("0.65rem")}>
        <div style={inlineRowStyle()}>
          <div>
            <Badge color="purple" variant="lighter">AI workspace</Badge>
            <h3 style={titleStyle()}>{title}</h3>
          </div>
          <Badge color="purple" variant="lighter">Brainwave 2.5</Badge>
        </div>
        <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{subtitle}</p>
      </div>
      <div style={{ ...stackStyle("0.9rem"), borderTop: "1px solid var(--z-color-border, #ebebeb)", paddingTop: "1rem" }}>
        <div
          style={{
            ...panelStyle({
              width: "min(280px, 100%)",
              gap: "0",
              alignSelf: "flex-start",
              padding: "0.4rem 1rem"
            }),
            display: "grid"
          }}
        >
          {attachments.map((item, index) => (
            <div
              key={item}
              style={{
                ...dividedRowStyle({
                  borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)",
                  padding: "0.78rem 0"
                }),
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}
            >
              <span style={{ color: "var(--z-color-muted, #667085)" }}>+</span>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item}</strong>
            </div>
          ))}
        </div>
        <div style={panelStyle({ padding: "1rem" })}>
          <div style={stackStyle("0.9rem")}>
            <Textarea rows={3} defaultValue="Describe your 3D object or scene…" />
            <div style={{ display: "grid", gridTemplateColumns: "auto auto minmax(0, 1fr) auto auto", gap: "0.6rem", alignItems: "center" }}>
              <Button size="sm" variant="secondary">+</Button>
              <ButtonGroup quantity={3} labels={modes} value={mode} onValueChange={setMode} />
              <div />
              <Button size="sm" variant="secondary">Mic</Button>
              <Button size="sm">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ConversionScoreWidget({
  title = "Experience score",
  subtitle = "Summarize the biggest UX gaps into one visible score and a ranked list of fixes.",
  surface = "elevated",
  className,
  style
}: ConversionScoreWidgetProps) {
  const findings = [
    { label: "Reviews", note: "No visible reviews or testimonial found", score: 55, tone: "High impact" },
    { label: "Social proof", note: "Missing trust badges near buy box", score: 80, tone: "High impact" },
    { label: "Buy box", note: "Add payment icons and USPs for trust", score: 72, tone: "Moderate impact" },
    { label: "Copywriting", note: "Engaging copy detected", score: 59, tone: "Low impact" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={{ ...stackStyle("1rem"), alignItems: "center" }}>
        <div
          style={{
            width: 172,
            height: 172,
            borderRadius: "50%",
            background: "conic-gradient(#f59e0b 0deg, #fb923c 124deg, #ef4444 214deg, rgba(239,68,68,0.08) 214deg 360deg)",
            display: "grid",
            placeItems: "center",
            position: "relative"
          }}
        >
          <div
            style={{
              width: 136,
              height: 136,
              borderRadius: "50%",
              background: "var(--z-color-surface, #ffffff)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 0 1px var(--z-color-border, #ebebeb)"
            }}
          >
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "2.2rem", lineHeight: 1 }}>79</strong>
            <span style={mutedTextStyle()}>Zephr score</span>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 style={titleStyle()}>{title}</h3>
          <p style={{ ...mutedTextStyle(), margin: "0.35rem 0 0", lineHeight: 1.55 }}>{subtitle}</p>
        </div>
      </div>
      <div style={{ ...summaryBandStyle({ display: "grid", gap: "0.2rem", padding: "0.9rem 1rem" }) }}>
        <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>Prioritize high-impact fixes first</strong>
        <span style={mutedTextStyle()}>Tackle trust and proof gaps before refining lower-severity copy changes.</span>
      </div>
      <div style={dividedListStyle()}>
        {findings.map((finding) => (
          <div
            key={finding.label}
            style={{
              ...dividedRowStyle({
                padding: "0.95rem 0"
              }),
              display: "grid",
              gridTemplateColumns: "44px minmax(0, 1fr) auto",
              gap: "0.85rem",
              alignItems: "center"
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "2px solid color-mix(in srgb, var(--accent, #121212) 28%, white)", color: "var(--accent, #121212)", fontWeight: 700 }}>
              {finding.score}
            </div>
            <div style={stackStyle("0.15rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.95rem" }}>{finding.label}</strong>
              <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>{finding.note}</span>
            </div>
            <Badge tone={finding.tone === "High impact" ? "danger" : finding.tone === "Moderate impact" ? "info" : "success"}>
              {finding.tone}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function MarketingInsightsWidget({
  title = "Marketing insights",
  subtitle = "Live channel performance and device split in one surface for faster planning decisions.",
  surface = "elevated",
  className,
  style
}: MarketingInsightsWidgetProps) {
  const channels = [
    { label: "Organic search", share: 38, color: "#f59e0b" },
    { label: "Social media", share: 34, color: "#eab308" },
    { label: "Direct", share: 28, color: "#2dd4bf" }
  ];
  const devices = [
    { label: "Desktop", share: "27%", delta: "-3.2%" },
    { label: "Tablet", share: "12%", delta: "-6.4%" },
    { label: "Mobile", share: "61%", delta: "+0.8%" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div style={stackStyle("0.2rem")}>
          <Badge color="purple" variant="lighter">Marketing</Badge>
          <h3 style={{ ...titleStyle(), fontSize: "1.45rem" }}>{title}</h3>
        </div>
        <Button size="sm" variant="secondary">Report</Button>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{subtitle}</p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", paddingTop: "0.2rem" }}>
        <Badge tone="neutral">Channel performance</Badge>
        <Badge tone="neutral">Engagement trends</Badge>
        <Badge tone="neutral">Conversion health</Badge>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1.1rem",
          borderTop: "1px solid var(--z-color-border, #ebebeb)",
          paddingTop: "1rem"
        }}
      >
        <div style={{ ...stackStyle("0.8rem"), paddingRight: "1.1rem", borderRight: "1px solid var(--z-color-border, #ebebeb)" }}>
          <div style={inlineRowStyle()}>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "1rem" }}>Marketing channels</strong>
            <span style={{ color: "var(--z-color-success, #0a7d53)", fontWeight: 600, fontSize: "0.88rem" }}>+2.1% vs last week</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: channels.map((item) => `${item.share}fr`).join(" "), gap: "0.35rem" }}>
            {channels.map((item) => (
              <span key={item.label} style={{ height: 12, borderRadius: 999, background: item.color }} />
            ))}
          </div>
          <div style={stackStyle("0.45rem")}>
            {channels.map((item) => (
              <div key={item.label} style={{ ...inlineRowStyle(), fontSize: "0.9rem" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--z-color-text, #171717)" }}>
                  <span style={{ width: 9, height: 9, borderRadius: 999, background: item.color }} />
                  {item.label}
                </span>
                <strong style={{ color: "var(--z-color-text, #171717)" }}>{item.share}%</strong>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...stackStyle("0.8rem"), paddingLeft: "0.1rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "2rem", lineHeight: 1 }}>237,456</strong>
            <Badge tone="danger">-1.4%</Badge>
          </div>
          <span style={mutedTextStyle()}>Total visitors</span>
          <Divider />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.7rem" }}>
            {devices.map((device) => (
              <div key={device.label} style={stackStyle("0.35rem")}>
                <span style={mutedTextStyle()}>{device.label}</span>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "1.15rem" }}>{device.share}</strong>
                <span style={{ color: device.delta.startsWith("+") ? "var(--z-color-success, #0a7d53)" : "var(--z-color-danger, #c43b2f)", fontSize: "0.9rem", fontWeight: 600 }}>{device.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
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
      <div style={{ ...inlineRowStyle(), alignItems: "center" }}>
        <Badge color="orange" variant="lighter">Pricing update</Badge>
        <Badge color="orange" variant="lighter">Needs review</Badge>
      </div>
      <div style={stackStyle("0.65rem")}>
        <h3 style={titleStyle()}>{title}</h3>
        <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.98rem" }}>{subtitle}</strong>
        <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{body}</p>
      </div>
      <div style={{ ...summaryBandStyle(), display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
        <div style={stackStyle("0.15rem")}>
          <span style={mutedTextStyle()}>Affected accounts</span>
          <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.96rem" }}>14 active customers</strong>
        </div>
        <div style={stackStyle("0.15rem")}>
          <span style={mutedTextStyle()}>Approval state</span>
          <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.96rem" }}>Legal attached · finance pending</strong>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", paddingTop: "1rem" }}>
        <Button size="sm" variant="secondary">{cancelLabel}</Button>
        <Button size="sm">{confirmLabel}</Button>
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
      <div style={inlineRowStyle()}>
        <div style={stackStyle("0.25rem")}>
          <div style={kickerStyle()}>Forms</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="sky" variant="lighter">Structured</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
          padding: "0.95rem 0",
          borderTop: "1px solid var(--z-color-border, #ebebeb)",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)"
        }}
      >
        {[
          { label: "Goal", value: "Reduce failed invoice recovery time" },
          { label: "Audience", value: "Finance and support teams" },
          { label: "Surface", value: "Internal command center" }
        ].map((item, index) => (
          <div key={item.label} style={{ ...stackStyle("0.15rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }}>
            <span style={mutedTextStyle()}>{item.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.95rem", lineHeight: 1.45 }}>{item.value}</strong>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gap: "0.95rem", paddingTop: "0.2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.95rem" }}>
          <FormField label="Project name" required htmlFor="widget-project-name">
            <Input id="widget-project-name" defaultValue="Billing command center" />
          </FormField>
          <FormField label="Primary goal" htmlFor="widget-project-goal">
            <Input id="widget-project-goal" defaultValue="Reduce failed invoice recovery time" />
          </FormField>
        </div>
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
        <div style={stackStyle("0.25rem")}>
          <div style={kickerStyle()}>Upload queue</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Button size="sm">Add files</Button>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "1rem", alignItems: "center", padding: "0.95rem 0", borderTop: "1px solid var(--z-color-border, #ebebeb)", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }}>
        <div style={stackStyle("0.2rem")}>
          <strong style={{ color: "var(--z-color-text, #171717)" }}>3 files in motion</strong>
          <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>Supports media, CSV, and zipped design asset bundles.</p>
        </div>
        <Badge tone="neutral">106.2 MB</Badge>
      </div>
      <div style={dividedListStyle()}>
        {files.map((file, index) => (
          <div key={file.name} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={{ ...stackStyle("0.45rem") }}>
              <div style={inlineRowStyle()}>
                <div style={stackStyle("0.1rem")}>
                  <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{file.name}</strong>
                  <span style={mutedTextStyle()}>{file.size}</span>
                </div>
                <Badge color={file.color} variant="lighter">{file.status}</Badge>
              </div>
              <Progress value={file.progress} tone={file.progress === 100 ? "success" : "primary"} />
            </div>
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
        <div style={stackStyle("0.25rem")}>
          <div style={kickerStyle()}>Chat</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="sky" variant="lighter">Live</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem", padding: "0.95rem 0", borderTop: "1px solid var(--z-color-border, #ebebeb)", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }}>
        {[
          { label: "Participants", value: "3 active" },
          { label: "SLA", value: "Reply in 6 min" },
          { label: "Channel", value: "Customer support" }
        ].map((item, index) => (
          <div key={item.label} style={{ ...stackStyle("0.15rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }}>
            <span style={mutedTextStyle()}>{item.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item.value}</strong>
          </div>
        ))}
      </div>
      <div style={dividedListStyle()}>
        {messages.map((message, index) => (
          <div key={`${message.author}-${message.text}`} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }}>
              <Avatar name={message.author} size={34} status={message.status} />
              <div style={{ ...stackStyle("0.2rem") }}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.92rem" }}>{message.author} · {message.role}</strong>
                <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{message.text}</p>
              </div>
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
        <div style={stackStyle("0.25rem")}>
          <div style={kickerStyle()}>Team access</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="purple" variant="lighter">Admin</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "1rem", alignItems: "center", padding: "0.95rem 0", borderTop: "1px solid var(--z-color-border, #ebebeb)", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }}>
        <div style={stackStyle("0.18rem")}>
          <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.96rem" }}>2 people ready to invite</strong>
          <span style={mutedTextStyle()}>Editors can ship screens, reviewers can comment only.</span>
        </div>
        <Badge color="sky" variant="lighter">Editor</Badge>
      </div>
      <FormField label="Email addresses" hint="Press enter after each email to add multiple people.">
        <TagInput value={emails} onChange={setEmails} placeholder="name@company.com" />
      </FormField>
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
        <div style={stackStyle("0.25rem")}>
          <div style={kickerStyle()}>Directory</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="green" variant="lighter">{members.length} members</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", alignItems: "center", padding: "0.2rem 0 0.1rem" }}>
        {[
          { label: "Available", value: "2 teammates" },
          { label: "In review", value: "1 teammate" },
          { label: "Owner", value: "Maya Carter" }
        ].map((item, index) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            {index > 0 ? <span style={{ width: 3, height: 3, borderRadius: 999, background: "var(--z-color-stroke300, #d4d7dd)" }} /> : null}
            <span style={{ ...mutedTextStyle(), fontSize: "0.9rem" }}>{item.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.92rem" }}>{item.value}</strong>
          </div>
        ))}
      </div>
      <div style={dividedListStyle()}>
        {members.map((member, index) => (
          <div key={member.name} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "center" }}>
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
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  const rows = [
    { title: "Audit logging", description: "Track publish, billing, and access changes for the workspace.", value: auditEnabled, onChange: setAuditEnabled },
    { title: "Weekly digest", description: "Send a Friday summary with usage, shipping progress, and incidents.", value: weeklySummary, onChange: setWeeklySummary },
    { title: "Maintenance mode", description: "Show a maintenance notice before publishing risky migrations.", value: maintenanceMode, onChange: setMaintenanceMode }
  ];

  const handleSave = () => {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2000);
    }, 800);
  };

  const handleReset = () => {
    setAuditEnabled(true);
    setWeeklySummary(false);
    setMaintenanceMode(false);
    setSaveState("idle");
  };

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div style={stackStyle("0.25rem")}>
          <div style={kickerStyle()}>Settings</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        {saveState === "saved"
          ? <Badge color="green" variant="lighter">Saved</Badge>
          : <Badge tone="neutral">3 controls</Badge>
        }
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "1rem", alignItems: "center", padding: "0.95rem 0", borderTop: "1px solid var(--z-color-border, #ebebeb)", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }}>
        <div style={stackStyle("0.18rem")}>
          <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.96rem" }}>Audit logging is protecting billing and publish actions.</strong>
          <span style={mutedTextStyle()}>Review defaults before inviting external collaborators.</span>
        </div>
        <Badge tone="info">Protected</Badge>
      </div>
      <div style={dividedListStyle()}>
        {rows.map((row, index) => (
          <div key={row.title} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={{ ...inlineRowStyle(), alignItems: "center" }}>
              <div style={stackStyle("0.15rem")}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{row.title}</strong>
                <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>{row.description}</span>
              </div>
              <Switch checked={row.value} onChange={row.onChange} />
            </div>
          </div>
        ))}
      </div>
      {actionRow([
        { label: saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved ✓" : "Save settings", onClick: handleSave },
        { label: "Reset defaults", variant: "secondary", onClick: handleReset }
      ])}
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem 0",
          borderTop: "1px solid var(--z-color-border, #ebebeb)",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)"
        }}
      >
        <div style={stackStyle("0.3rem")}>
          <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "1rem" }}>Billing QA is the last critical milestone before launch.</strong>
          <span style={mutedTextStyle()}>Next checkpoint in 2 hours · customer comms blocked on QA signoff</span>
        </div>
        <div style={{ minWidth: 96, textAlign: "right" }}>
          <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "1.45rem", lineHeight: 1 }}>3/4</strong>
          <div style={mutedTextStyle()}>milestones complete</div>
        </div>
      </div>
      <div style={dividedListStyle()}>
        {steps.map((step, index) => (
          <div key={step.label} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={{ display: "grid", gridTemplateColumns: "24px minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: step.progress === 100 ? "color-mix(in srgb, var(--z-color-success, #0a7d53) 14%, white)" : "var(--z-color-background100, #f4f6fa)",
                  color: step.progress === 100 ? "var(--z-color-success, #0a7d53)" : "var(--muted)",
                  fontSize: "0.72rem",
                  fontWeight: 700
                }}
              >
                {step.progress === 100 ? "✓" : index + 1}
              </div>
              <div style={{ ...stackStyle("0.4rem") }}>
                <div style={inlineRowStyle()}>
                  <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{step.label}</strong>
                  <span style={mutedTextStyle()}>{step.progress}%</span>
                </div>
                <Progress value={step.progress} tone={step.tone} />
              </div>
            </div>
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
  const allItems = [
    { id: "1", label: "Pricing update approved", detail: "Maya approved the Q2 enterprise pricing change.", badge: { label: "Approved", color: "green" as BadgeColor }, group: "Today" },
    { id: "2", label: "2 new support mentions", detail: "Customer ops mentioned billing retries in #launch-war-room.", badge: { label: "Unread", color: "blue" as BadgeColor }, group: "Today" },
    { id: "3", label: "Scheduled publish in 30 min", detail: "Homepage hero and changelog copy are queued for publish.", badge: { label: "Scheduled", color: "orange" as BadgeColor }, group: "Today" },
    { id: "4", label: "Release v2.4 deployed", detail: "Staging deploy succeeded. 3 new components shipped.", badge: { label: "Deploy", color: "purple" as BadgeColor }, group: "Yesterday" }
  ];
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const markRead = (id: string) => setReadIds(prev => new Set([...prev, id]));
  const markAllRead = () => setReadIds(new Set(allItems.map(i => i.id)));
  const unreadCount = allItems.filter(i => !readIds.has(i.id)).length;

  const groups = ["Today", "Yesterday"];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div style={stackStyle("0.25rem")}>
          <div style={kickerStyle()}>Inbox</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        {unreadCount > 0
          ? <Badge color="blue" variant="lighter">{unreadCount} unread</Badge>
          : <Badge color="green" variant="lighter">All read</Badge>
        }
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={dividedListStyle()}>
        {groups.map(group => {
          const groupItems = allItems.filter(i => i.group === group);
          if (!groupItems.length) return null;
          return (
            <div key={group}>
              <div style={{ padding: "0.5rem 0 0.25rem", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--z-color-muted, #667085)" }}>
                {group}
              </div>
              {groupItems.map((item) => {
                const isRead = readIds.has(item.id);
                return (
                  <div
                    key={item.id}
                    style={{
                      ...dividedRowStyle(),
                      opacity: isRead ? 0.55 : 1,
                      transition: "opacity 200ms"
                    }}
                  >
                    <div style={{ ...stackStyle("0.35rem") }}>
                      <div style={inlineRowStyle()}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {!isRead && (
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--z-color-accent, #2563eb)", flexShrink: 0 }} />
                          )}
                          <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item.label}</strong>
                        </div>
                        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                          <Badge color={item.badge.color} variant="lighter">{item.badge.label}</Badge>
                          {!isRead && (
                            <button
                              type="button"
                              onClick={() => markRead(item.id)}
                              style={{ fontSize: "0.75rem", color: "var(--z-color-muted, #667085)", background: "none", border: "none", cursor: "pointer", padding: "0 0.25rem", textDecoration: "underline" }}
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {actionRow([{ label: "Open inbox" }, { label: "Mark all read", variant: "secondary", onClick: markAllRead }])}
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
      <div
        style={{
          ...dividedRowStyle({ paddingTop: "1rem" }),
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem"
        }}
      >
        <div style={stackStyle("0.15rem")}>
          <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>2FA is active for all owners</strong>
          <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>Review guest access before inviting external collaborators.</span>
        </div>
        <Badge tone="info">Protected</Badge>
      </div>
      <div style={dividedListStyle()}>
        {rows.map((row, index) => (
          <div key={row.title} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={{ ...inlineRowStyle(), alignItems: "center" }}>
              <div style={stackStyle("0.15rem")}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{row.title}</strong>
                <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>{row.detail}</span>
              </div>
              <Switch checked={row.value} onChange={row.setter} />
            </div>
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
      <div style={dividedListStyle()}>
        {methods.map((method, index) => (
          <div key={method.label} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={{ ...inlineRowStyle(), alignItems: "center" }}>
              <div style={stackStyle("0.15rem")}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{method.label}</strong>
                <span style={{ ...mutedTextStyle(), whiteSpace: "normal" }}>{method.meta}</span>
              </div>
              <Badge tone={method.tone} variant="lighter">{index === 0 ? "Default" : method.label.includes("invoice") ? "Invoice" : "Card"}</Badge>
            </div>
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
  const allCommands = [
    { label: "Create release", meta: "Workflow · cmd+k", badge: "Action" },
    { label: "Open billing usage", meta: "Settings · b", badge: "Page" },
    { label: "Invite team member", meta: "Team · i", badge: "Shortcut" },
    { label: "View audit trail", meta: "Security · a", badge: "Page" },
    { label: "Export analytics report", meta: "Analytics · e", badge: "Action" }
  ];
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const filtered = query.trim()
    ? allCommands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.meta.toLowerCase().includes(query.toLowerCase())
      )
    : allCommands.slice(0, 3);

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={stackStyle("0.4rem")}>
        <div style={kickerStyle()}>Command</div>
        <h3 style={titleStyle()}>{title}</h3>
        <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      </div>
      <Input
        value={query}
        onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
        placeholder="Search actions, pages, or team members…"
      />
      <div style={dividedListStyle()}>
        {filtered.length === 0 ? (
          <div style={{ ...dividedRowStyle(), borderTop: "none", color: "var(--z-color-muted, #667085)", fontSize: "0.9rem" }}>
            No results for &ldquo;{query}&rdquo;
          </div>
        ) : filtered.map((command, index) => (
          <div
            key={command.label}
            onMouseEnter={() => setActiveIndex(index)}
            style={{
              ...(index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()),
              borderRadius: 8,
              background: index === activeIndex ? "var(--z-color-background100, #f4f6fa)" : "transparent",
              cursor: "pointer"
            }}
          >
            <div style={{ ...inlineRowStyle() }}>
              <div style={stackStyle("0.12rem")}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{command.label}</strong>
                <span style={mutedTextStyle()}>{command.meta}</span>
              </div>
              <Badge color="gray" variant="stroke">{command.badge}</Badge>
            </div>
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
      <div style={dividedListStyle()}>
        {comments.map((comment, index) => (
          <div key={comment.name} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: "0.75rem", alignItems: "start" }}>
              <Avatar name={comment.name} size={34} status={comment.status} />
              <div style={stackStyle("0.25rem")}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{comment.name} · {comment.role}</strong>
                <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.55 }}>{comment.note}</p>
              </div>
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
      <div
        style={{
          ...summaryBandStyle(),
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem"
        }}
      >
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            style={{
              ...stackStyle("0.25rem"),
              paddingLeft: index === 0 ? 0 : "1rem",
              borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
            }}
          >
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.95rem" }}>{plan.name}</strong>
              {plan.featured ? <Badge color="blue" variant="lighter">Popular</Badge> : null}
            </div>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "1.2rem", lineHeight: 1.2 }}>{plan.price}</strong>
            <span style={mutedTextStyle()}>{plan.seats}</span>
          </div>
        ))}
      </div>
      <div style={dividedListStyle()}>
        {[
          { label: "AI context files", individual: "Included", startup: "Included", enterprise: "Included" },
          { label: "Premium widgets", individual: "Core set", startup: "Full access", enterprise: "Full + custom" },
          { label: "Workspace seats", individual: "1", startup: "10", enterprise: "Unlimited" }
        ].map((row, index) => (
          <div
            key={row.label}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.2fr) repeat(3, minmax(0, 1fr))",
                gap: "1rem",
                alignItems: "center"
              })
            }}
          >
            <span style={{ color: "var(--z-color-text, #171717)", fontSize: "0.92rem", fontWeight: 600 }}>{row.label}</span>
            <span style={mutedTextStyle()}>{row.individual}</span>
            <span style={mutedTextStyle()}>{row.startup}</span>
            <span style={mutedTextStyle()}>{row.enterprise}</span>
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
      <div style={dividedListStyle()}>
        {keys.map((key, index) => (
          <div key={key.label} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={{ ...stackStyle("0.28rem") }}>
              <div style={inlineRowStyle()}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{key.label}</strong>
                <Badge variant="lighter" color={key.status === "Active" ? "green" : key.status === "Staging" ? "blue" : "yellow"}>{key.status}</Badge>
              </div>
              <span style={mutedTextStyle()}>{key.scope}</span>
              <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{key.lastRotated}</span>
            </div>
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
        <div style={stackStyle("0.25rem")}>
          <div style={kickerStyle()}>Support</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="orange" variant="lighter">7 open</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
          padding: "0.95rem 0",
          borderTop: "1px solid var(--z-color-border, #ebebeb)",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)"
        }}
      >
        {[
          { label: "Urgent", value: "1 ticket" },
          { label: "Assigned", value: "3 owners" },
          { label: "Avg. first reply", value: "11 minutes" }
        ].map((item, index) => (
          <div key={item.label} style={{ ...stackStyle("0.15rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }}>
            <span style={mutedTextStyle()}>{item.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item.value}</strong>
          </div>
        ))}
      </div>
      <div style={dividedListStyle()}>
        {tickets.map((ticket, index) => (
          <div key={ticket.customer + ticket.issue} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={inlineRowStyle()}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{ticket.customer}</strong>
              <Badge color={ticket.priority === "Urgent" ? "red" : ticket.priority === "High" ? "yellow" : "gray"} variant="lighter">{ticket.priority}</Badge>
            </div>
            <p style={{ ...mutedTextStyle(), margin: "0.3rem 0 0", lineHeight: 1.55 }}>{ticket.issue}</p>
            <span style={{ ...mutedTextStyle(), fontSize: "0.82rem", display: "block", marginTop: "0.35rem" }}>Owner: {ticket.owner}</span>
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
          <div key={goal.label} style={{ ...stackStyle("0.38rem"), ...dividedRowStyle({ borderTop: "1px solid var(--z-color-border, #ebebeb)", padding: "0.9rem 0" }) }}>
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
      <div style={dividedListStyle()}>
        {integrations.map((integration) => (
          <div key={integration.name} style={dividedRowStyle({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" })}>
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
      <div style={dividedListStyle()}>
        {requests.map((request) => (
          <div key={request.name + request.request} style={{ ...stackStyle("0.28rem"), ...dividedRowStyle() }}>
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
          padding: "0.95rem 0",
          borderTop: "1px solid var(--z-color-border, #ebebeb)",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)"
        }}
      >
        {[
          { label: "Healthy", value: "2 accounts" },
          { label: "At limit", value: "1 workspace" },
          { label: "Resets pending", value: "1 request" }
        ].map((item, index) => (
          <div key={item.label} style={{ ...stackStyle("0.15rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }}>
            <span style={mutedTextStyle()}>{item.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item.value}</strong>
          </div>
        ))}
      </div>
      <div style={dividedListStyle()}>
        {workspaces.map((workspace, index) => (
          <div
            key={workspace.name}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              }),
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: "0.9rem",
              alignItems: "center"
            }}
          >
            <div style={stackStyle("0.18rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{workspace.name}</strong>
              <span style={mutedTextStyle()}>{workspace.usage}</span>
              <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{workspace.detail}</span>
            </div>
            <Badge color={workspace.status === "At limit" ? "yellow" : "green"} variant="lighter">{workspace.status}</Badge>
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
      <div style={dividedListStyle()}>
        {variants.map((variant, index) => (
          <div
            key={variant.name}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              }),
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: "0.9rem",
              alignItems: "center"
            }}
          >
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
        <div style={stackStyle("0.2rem")}>
          <Badge color="blue" variant="lighter">Analytics</Badge>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="blue" variant="lighter">Realtime</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: "1rem", padding: "1rem 0", borderTop: "1px solid var(--z-color-border, #ebebeb)", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }}>
        <div style={{ ...stackStyle("0.7rem"), justifyContent: "space-between" }}>
          <div style={stackStyle("0.25rem")}>
            <span style={mutedTextStyle()}>Weekly active workspaces</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", flexWrap: "wrap" }}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "2.2rem", lineHeight: 1 }}>1,284</strong>
              <span style={{ color: "var(--z-color-success, #0a7d53)", fontWeight: 600 }}>+8.2% vs last week</span>
            </div>
          </div>
          <div
            style={{
              height: 92,
              borderRadius: 14,
              background:
                "radial-gradient(circle at 76% 12%, rgba(120, 119, 255, 0.18) 0%, rgba(120,119,255,0) 28%), linear-gradient(180deg, color-mix(in srgb, var(--z-color-background100, #f4f6fa) 72%, #ffffff 28%) 0%, rgba(255,255,255,0.96) 100%)",
              border: "1px solid var(--z-color-border, #ebebeb)",
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
              alignItems: "end",
              gap: "0.45rem",
              padding: "1rem"
            }}
          >
            {[42, 54, 48, 61, 68, 73, 79].map((height, index) => (
              <span
                key={`${height}-${index}`}
                style={{
                  display: "block",
                  height: `${height}%`,
                  borderRadius: 999,
                  background: index === 5 ? "linear-gradient(180deg, rgba(64,132,255,0.95) 0%, rgba(145,173,255,0.62) 100%)" : "linear-gradient(180deg, rgba(64,132,255,0.22) 0%, rgba(145,173,255,0.08) 100%)"
                }}
              />
            ))}
          </div>
        </div>
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            style={{
              ...stackStyle("0.28rem"),
              padding: "0.15rem 0 0.2rem 1rem",
              borderTop: index > 1 ? "1px solid var(--z-color-border, #ebebeb)" : "none",
              borderLeft: "1px solid var(--z-color-border, #ebebeb)",
            }}
          >
            <span style={mutedTextStyle()}>{stat.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "1.08rem" }}>{stat.value}</strong>
            <span style={{ color: stat.delta.startsWith("+") ? "var(--z-color-success, #0a7d53)" : "var(--z-color-danger, #c43b2f)", fontSize: "0.82rem", fontWeight: 600 }}>{stat.delta} vs last week</span>
          </div>
        ))}
      </div>
      <div style={{ paddingTop: "0.95rem" }}>
        <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.9rem", display: "block" }}>Acquisition is trending up.</strong>
        <p style={{ ...mutedTextStyle(), margin: "0.25rem 0 0", lineHeight: 1.55 }}>Conversion from the new onboarding path is materially outperforming control.</p>
      </div>
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
      <div style={dividedListStyle()}>
        {deals.map((deal, index) => (
          <div
            key={deal.name}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              }),
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: "0.9rem",
              alignItems: "center"
            }}
          >
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem 0",
          borderTop: "1px solid var(--z-color-border, #ebebeb)",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)"
        }}
      >
        <div style={stackStyle("0.45rem")}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.55rem", flexWrap: "wrap" }}>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "2rem", lineHeight: 1 }}>64%</strong>
            <span style={{ color: "var(--z-color-warning, #d97706)", fontWeight: 600 }}>Recovery rate</span>
          </div>
          <Progress value={64} tone="warning" />
          <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>Most failed payments are recoverable with one more retry or direct outreach.</span>
        </div>
        <div style={stackStyle("0.15rem")}>
          <span style={mutedTextStyle()}>Recovered this week</span>
          <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "1.15rem" }}>$9,840</strong>
        </div>
      </div>
      <div style={dividedListStyle()}>
        {invoices.map((invoice, index) => (
          <div key={invoice.account} style={index === 0 ? { ...dividedRowStyle(), borderTop: "none" } : dividedRowStyle()}>
            <div style={inlineRowStyle()}>
              <div style={stackStyle("0.15rem")}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{invoice.account}</strong>
                <span style={mutedTextStyle()}>{invoice.amount}</span>
              </div>
              <Badge color={invoice.color} variant="lighter">{invoice.state}</Badge>
            </div>
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
          padding: "0.95rem 0",
          borderTop: "1px solid var(--z-color-border, #ebebeb)",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)"
        }}
      >
        {[
          { label: "Healthy", value: "1 run" },
          { label: "Delayed", value: "1 run" },
          { label: "Queued", value: "1 run" }
        ].map((item, index) => (
          <div key={item.label} style={{ ...stackStyle("0.15rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }}>
            <span style={mutedTextStyle()}>{item.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item.value}</strong>
          </div>
        ))}
      </div>
      <div style={dividedListStyle()}>
        {runs.map((run, index) => (
          <div
            key={run.name}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              }),
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: "0.9rem",
              alignItems: "center"
            }}
          >
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
      <div style={dividedListStyle()}>
        {events.map((event, index) => (
          <div
            key={`${event.actor}-${event.time}`}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              }),
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: "0.9rem",
              alignItems: "start"
            }}
          >
            <div style={stackStyle("0.2rem")}>
              <div style={inlineRowStyle()}>
                <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{event.actor}</strong>
                <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{event.time}</span>
              </div>
              <span style={mutedTextStyle()}>{event.action}</span>
            </div>
            <Badge color="gray" variant="stroke">{event.status}</Badge>
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
          padding: "0.95rem 0",
          borderTop: "1px solid var(--z-color-border, #ebebeb)",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)"
        }}
      >
        {items.map((item, index) => (
          <div key={item.label} style={{ ...stackStyle("0.2rem"), paddingLeft: index === 0 ? 0 : "1rem", borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)" }}>
            <span style={{ ...mutedTextStyle(), fontSize: "0.82rem" }}>{item.day}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem", lineHeight: 1.45 }}>{item.label}</strong>
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
        <div style={stackStyle("0.2rem")}>
          <div style={kickerStyle()}>Reliability</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="red" variant="lighter">P1 active</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ padding: "0.1rem 0 0.2rem", borderBottom: "1px solid var(--z-color-border, #ebebeb)" }}>
        <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.9rem", display: "block" }}>Webhook retries are degraded in eu-west.</strong>
        <p style={{ ...mutedTextStyle(), margin: "0.25rem 0 0", lineHeight: 1.55 }}>Customer-facing comms are live. Mitigation is in progress.</p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
          padding: "0.95rem 0",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)"
        }}
      >
        {[
          { label: "Owner", value: "Maya Carter" },
          { label: "Customers affected", value: "84 workspaces" },
          { label: "Updated", value: "2 minutes ago" }
        ].map((item, index) => (
          <div key={item.label} style={{ ...stackStyle("0.2rem"), borderLeft: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)", paddingLeft: index === 0 ? 0 : "1rem" }}>
            <span style={mutedTextStyle()}>{item.label}</span>
            <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.96rem" }}>{item.value}</strong>
          </div>
        ))}
      </div>
      <div style={dividedListStyle()}>
        {tasks.map((task, index) => (
          <div
            key={task.label}
            style={{
              ...dividedRowStyle(),
              borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)",
              display: "grid",
              gridTemplateColumns: "auto minmax(0, 1fr) auto",
              gap: "0.75rem",
              alignItems: "center"
            }}
          >
            <Checkbox checked={task.done} readOnly />
            <span style={mutedTextStyle()}>{task.label}</span>
            <span style={{ color: task.done ? "var(--z-color-success, #16a34a)" : "var(--z-color-warning, #d97706)", fontSize: "0.82rem", fontWeight: 600 }}>
              {task.done ? "Done" : "Active"}
            </span>
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
      <div style={dividedListStyle()}>
        {feedback.map((item, index) => (
          <div
            key={item.note}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              }),
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: "0.9rem",
              alignItems: "start"
            }}
          >
            <div style={stackStyle("0.2rem")}>
              <strong style={{ color: "var(--z-color-text, #171717)", fontSize: "0.94rem" }}>{item.source}</strong>
              <span style={mutedTextStyle()}>{item.note}</span>
            </div>
            <Badge color="blue" variant="lighter">{item.theme}</Badge>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Review feedback" }, { label: "Create insight", variant: "secondary" }])}
    </Card>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  NEW PREMIUM WIDGETS — Stripe-level polish                                */
/* ────────────────────────────────────────────────────────────────────────── */

/* ── Data Table ─────────────────────────────────────────────────────────── */

interface DataTableWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export function DataTableWidget({
  title = "Recent transactions",
  subtitle = "A sortable overview of the latest entries.",
  surface = "elevated",
  className,
  style
}: DataTableWidgetProps) {
  type SortKey = "name" | "amount" | "status" | "date";
  type SortDir = "asc" | "desc";
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const baseRows = [
    { name: "Acme Corp", amount: 4250, amountDisplay: "$4,250.00", status: "Completed", statusColor: "green" as BadgeColor, date: "Mar 5, 2026", dateSort: 5 },
    { name: "Globex Inc", amount: 1800, amountDisplay: "$1,800.00", status: "Pending", statusColor: "yellow" as BadgeColor, date: "Mar 4, 2026", dateSort: 4 },
    { name: "Initech Ltd", amount: 12000, amountDisplay: "$12,000.00", status: "Completed", statusColor: "green" as BadgeColor, date: "Mar 3, 2026", dateSort: 3 },
    { name: "Umbrella Co", amount: 3420, amountDisplay: "$3,420.00", status: "Failed", statusColor: "red" as BadgeColor, date: "Mar 2, 2026", dateSort: 2 },
    { name: "Stark Ind", amount: 8750, amountDisplay: "$8,750.00", status: "Completed", statusColor: "green" as BadgeColor, date: "Mar 1, 2026", dateSort: 1 }
  ];

  const rows = [...baseRows].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "name") cmp = a.name.localeCompare(b.name);
    else if (sortKey === "amount") cmp = a.amount - b.amount;
    else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
    else cmp = a.dateSort - b.dateSort;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };
  const toggleRow = (name: string) => setSelected(prev => {
    const next = new Set(prev);
    if (next.has(name)) next.delete(name); else next.add(name);
    return next;
  });
  const allSelected = selected.size === rows.length;
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(rows.map(r => r.name)));

  const SortIcon = ({ k }: { k: SortKey }) => sortKey !== k ? null : (
    <span style={{ marginLeft: 4, opacity: 0.7 }}>{sortDir === "asc" ? "↑" : "↓"}</span>
  );

  const thStyle: CSSProperties = {
    padding: "0.75rem 1rem",
    fontSize: "0.73rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--z-color-muted, #667085)",
    textAlign: "left",
    borderBottom: "1px solid var(--z-color-border, #ebebeb)",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap"
  };

  const tdStyle: CSSProperties = {
    padding: "0.85rem 1rem",
    fontSize: "0.92rem",
    color: "var(--z-color-text, #171717)",
    borderBottom: "1px solid var(--z-color-border, #ebebeb)"
  };

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Data</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {selected.size > 0 && <Badge color="blue" variant="lighter">{selected.size} selected</Badge>}
          <Badge color="blue" variant="lighter">{rows.length} entries</Badge>
        </div>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--z-color-border, #ebebeb)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--z-color-surface, #ffffff)" }}>
          <thead>
            <tr style={{ background: "var(--z-color-background100, #f4f6fa)" }}>
              <th style={{ ...thStyle, width: 40, cursor: "default" }}>
                <Checkbox checked={allSelected} indeterminate={selected.size > 0 && !allSelected} onChange={toggleAll} />
              </th>
              {(["name", "amount", "status", "date"] as SortKey[]).map(key => (
                <th key={key} style={thStyle} onClick={() => toggleSort(key)}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}<SortIcon k={key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.name}
                onClick={() => toggleRow(row.name)}
                style={{
                  borderBottom: i === rows.length - 1 ? "none" : undefined,
                  background: selected.has(row.name) ? "color-mix(in srgb, var(--z-color-accent, #2563eb) 5%, transparent)" : "transparent",
                  cursor: "pointer"
                }}
              >
                <td style={{ ...tdStyle, width: 40 }}>
                  <Checkbox checked={selected.has(row.name)} onChange={() => toggleRow(row.name)} />
                </td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{row.name}</td>
                <td style={{ ...tdStyle, fontFamily: "var(--z-type-family-mono, monospace)", fontSize: "0.88rem" }}>{row.amountDisplay}</td>
                <td style={tdStyle}><Badge color={row.statusColor} variant="lighter">{row.status}</Badge></td>
                <td style={{ ...tdStyle, color: "var(--z-color-muted, #667085)" }}>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--z-color-muted, #667085)" }}>
        <span>Showing 1–5 of 24</span>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <Button size="sm" variant="secondary">Previous</Button>
          <Button size="sm" variant="secondary">Next</Button>
        </div>
      </div>
    </Card>
  );
}

/* ── Status Page ────────────────────────────────────────────────────────── */

interface StatusPageWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export function StatusPageWidget({
  title = "System status",
  subtitle = "All services are operating normally.",
  surface = "elevated",
  className,
  style
}: StatusPageWidgetProps) {
  const services = [
    { name: "API", status: "Operational", color: "green" as BadgeColor, uptime: "99.99%" },
    { name: "Dashboard", status: "Operational", color: "green" as BadgeColor, uptime: "99.98%" },
    { name: "Webhooks", status: "Degraded", color: "yellow" as BadgeColor, uptime: "99.42%" },
    { name: "Storage", status: "Operational", color: "green" as BadgeColor, uptime: "99.97%" },
    { name: "Auth", status: "Operational", color: "green" as BadgeColor, uptime: "100%" }
  ];

  const dotStyle = (color: string): CSSProperties => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: color === "green"
      ? "var(--z-color-success, #0a7d53)"
      : color === "yellow"
        ? "var(--z-color-warning, #d97706)"
        : "var(--z-color-danger, #c43b2f)",
    flexShrink: 0
  });

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Status</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="green" variant="lighter">All systems go</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={dividedListStyle()}>
        {services.map((svc, index) => (
          <div
            key={svc.name}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              }),
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              gap: "0.85rem",
              alignItems: "center"
            }}
          >
            <div style={dotStyle(svc.color)} />
            <strong style={{ fontSize: "0.93rem", color: "var(--z-color-text, #171717)" }}>{svc.name}</strong>
            <span style={{ fontSize: "0.85rem", fontFamily: "var(--z-type-family-mono, monospace)", color: "var(--z-color-muted, #667085)" }}>{svc.uptime}</span>
            <Badge color={svc.color} variant="lighter">{svc.status}</Badge>
          </div>
        ))}
      </div>
      <div style={{ fontSize: "0.82rem", color: "var(--z-color-muted, #667085)" }}>Last checked 2 minutes ago</div>
    </Card>
  );
}

/* ── Navbar Preview ─────────────────────────────────────────────────────── */

interface NavbarWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export function NavbarWidget({
  title = "Navigation bar",
  subtitle = "Responsive top navigation with actions.",
  surface = "elevated",
  className,
  style
}: NavbarWidgetProps) {
  const links = ["Dashboard", "Projects", "Team", "Settings"];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div>
        <div style={kickerStyle()}>Navigation</div>
        <h3 style={titleStyle()}>{title}</h3>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div
        style={{
          ...panelStyle(),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "0.75rem 1.1rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <strong style={{ fontSize: "0.95rem", color: "var(--z-color-text, #171717)", letterSpacing: "-0.02em" }}>Acme</strong>
          <nav style={{ display: "flex", gap: "0.2rem" }}>
            {links.map((link, i) => (
              <span
                key={link}
                style={{
                  padding: "0.35rem 0.7rem",
                  borderRadius: 8,
                  fontSize: "0.88rem",
                  fontWeight: i === 0 ? 500 : 400,
                  color: i === 0 ? "var(--z-color-text, #171717)" : "var(--z-color-muted, #667085)",
                  background: i === 0 ? "var(--z-color-background100, #f4f6fa)" : "transparent",
                  cursor: "pointer"
                }}
              >
                {link}
              </span>
            ))}
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Button size="sm" variant="secondary">Search</Button>
          <Avatar name="AK" size={28} />
        </div>
      </div>
    </Card>
  );
}

/* ── Dropdown Menu ──────────────────────────────────────────────────────── */

interface DropdownMenuWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export function DropdownMenuWidget({
  title = "Dropdown menu",
  subtitle = "Contextual action menus and selects.",
  surface = "elevated",
  className,
  style
}: DropdownMenuWidgetProps) {
  const menuItems = [
    { label: "Edit", shortcut: "⌘E", section: "actions" },
    { label: "Duplicate", shortcut: "⌘D", section: "actions" },
    { label: "Move to…", shortcut: "⌘M", section: "actions" },
    { label: "Archive", shortcut: "", section: "danger" },
    { label: "Delete", shortcut: "⌫", section: "danger" }
  ];

  const menuItemStyle = (isDanger: boolean): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.55rem 0.85rem",
    borderRadius: 8,
    fontSize: "0.9rem",
    color: isDanger ? "var(--z-color-danger, #c43b2f)" : "var(--z-color-text, #171717)",
    cursor: "pointer"
  });

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div>
        <div style={kickerStyle()}>Menu</div>
        <h3 style={titleStyle()}>{title}</h3>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div
        style={{
          borderRadius: 14,
          border: "1px solid var(--z-color-border, #ebebeb)",
          background: "var(--z-color-surface, #ffffff)",
          padding: "0.4rem",
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          maxWidth: 260
        }}
      >
        {menuItems.map((item, i) => (
          <div key={item.label}>
            {i === 3 && <Divider style={{ margin: "0.3rem 0" }} />}
            <div style={menuItemStyle(item.section === "danger")}>
              <span>{item.label}</span>
              {item.shortcut && (
                <span style={{ fontSize: "0.78rem", color: "var(--z-color-muted, #667085)", fontFamily: "var(--z-type-family-mono, monospace)" }}>
                  {item.shortcut}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── Date Picker ────────────────────────────────────────────────────────── */

interface DatePickerWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export function DatePickerWidget({
  title = "Date picker",
  subtitle = "Calendar-based date selection.",
  surface = "elevated",
  className,
  style
}: DatePickerWidgetProps) {
  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const days = [
    [24, 25, 26, 27, 28, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30]
  ];
  const today = 8;
  const selected = 14;

  const dayCellStyle = (day: number, weekRow: number): CSSProperties => {
    const isPrev = weekRow === 0 && day > 20;
    const isSelected = day === selected && weekRow === 1;
    const isToday = day === today && weekRow === 1;
    return {
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      fontSize: "0.88rem",
      fontWeight: isSelected || isToday ? 600 : 400,
      cursor: "pointer",
      color: isPrev
        ? "var(--z-color-muted, #667085)"
        : isSelected
          ? "var(--z-color-primaryContrast, #fff)"
          : "var(--z-color-text, #171717)",
      background: isSelected
        ? "var(--z-color-primary, #533afd)"
        : isToday
          ? "var(--z-color-background100, #f4f6fa)"
          : "transparent"
    };
  };

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div>
        <div style={kickerStyle()}>Picker</div>
        <h3 style={titleStyle()}>{title}</h3>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div
        style={{
          borderRadius: 16,
          border: "1px solid var(--z-color-border, #ebebeb)",
          background: "var(--z-color-surface, #ffffff)",
          padding: "1rem",
          maxWidth: 300
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
          <Button size="sm" variant="secondary">‹</Button>
          <strong style={{ fontSize: "0.93rem", color: "var(--z-color-text, #171717)" }}>March 2026</strong>
          <Button size="sm" variant="secondary">›</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.15rem", justifyItems: "center" }}>
          {weekdays.map((wd) => (
            <div key={wd} style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--z-color-muted, #667085)", padding: "0.3rem 0", textAlign: "center" }}>
              {wd}
            </div>
          ))}
          {days.map((week, wi) =>
            week.map((day) => (
              <div key={`${wi}-${day}`} style={dayCellStyle(day, wi)}>
                {day}
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}

/* ── File Manager ───────────────────────────────────────────────────────── */

interface FileManagerWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export function FileManagerWidget({
  title = "File manager",
  subtitle = "Browse and manage project files.",
  surface = "elevated",
  className,
  style
}: FileManagerWidgetProps) {
  const files = [
    { name: "design-system.fig", type: "Figma", size: "4.2 MB", modified: "2h ago", icon: "🎨" },
    { name: "api-docs.md", type: "Markdown", size: "28 KB", modified: "5h ago", icon: "📄" },
    { name: "components.zip", type: "Archive", size: "12.8 MB", modified: "1d ago", icon: "📦" },
    { name: "brand-assets", type: "Folder", size: "—", modified: "3d ago", icon: "📁" },
    { name: "onboarding-flow.mp4", type: "Video", size: "86 MB", modified: "1w ago", icon: "🎬" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Files</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Button size="sm" variant="primary">Upload</Button>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={dividedListStyle()}>
        {files.map((file, index) => (
          <div
            key={file.name}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              }),
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              gap: "0.85rem",
              alignItems: "center"
            }}
          >
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>{file.icon}</span>
            <div style={stackStyle("0.1rem")}>
              <strong style={{ fontSize: "0.93rem", color: "var(--z-color-text, #171717)" }}>{file.name}</strong>
              <span style={{ fontSize: "0.82rem", color: "var(--z-color-muted, #667085)" }}>{file.type}</span>
            </div>
            <span style={{ fontSize: "0.82rem", color: "var(--z-color-muted, #667085)", fontFamily: "var(--z-type-family-mono, monospace)" }}>{file.size}</span>
            <span style={{ fontSize: "0.82rem", color: "var(--z-color-muted, #667085)" }}>{file.modified}</span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "New folder", variant: "secondary" }, { label: "Download all", variant: "secondary" }])}
    </Card>
  );
}

/* ── Metrics Dashboard ──────────────────────────────────────────────────── */

interface MetricsDashboardWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export function MetricsDashboardWidget({
  title = "Key metrics",
  subtitle = "Real-time performance indicators.",
  surface = "elevated",
  className,
  style
}: MetricsDashboardWidgetProps) {
  type Period = "7d" | "30d" | "90d";
  const [period, setPeriod] = useState<Period>("30d");

  const metricsByPeriod: Record<Period, Array<{ label: string; value: string; delta: string; positive: boolean }>> = {
    "7d": [
      { label: "Revenue", value: "$11.4K", delta: "+3.2%", positive: true },
      { label: "Users", value: "2,847", delta: "+1.8%", positive: true },
      { label: "Churn", value: "0.4%", delta: "-0.1%", positive: true },
      { label: "NPS", value: "72", delta: "—", positive: true }
    ],
    "30d": [
      { label: "Revenue", value: "$48.2K", delta: "+12.4%", positive: true },
      { label: "Users", value: "2,847", delta: "+8.1%", positive: true },
      { label: "Churn", value: "1.2%", delta: "-0.3%", positive: true },
      { label: "NPS", value: "72", delta: "-2", positive: false }
    ],
    "90d": [
      { label: "Revenue", value: "$142K", delta: "+28.7%", positive: true },
      { label: "Users", value: "2,847", delta: "+21.5%", positive: true },
      { label: "Churn", value: "3.8%", delta: "+0.6%", positive: false },
      { label: "NPS", value: "72", delta: "+5", positive: true }
    ]
  };

  const metrics = metricsByPeriod[period];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Dashboard</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <div style={{ display: "flex", gap: "0.25rem", background: "var(--z-color-background100, #f4f6fa)", borderRadius: 8, padding: "0.2rem" }}>
          {(["7d", "30d", "90d"] as Period[]).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                padding: "0.2rem 0.6rem",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                background: period === p ? "var(--z-color-surface, #ffffff)" : "transparent",
                color: period === p ? "var(--z-color-text, #171717)" : "var(--z-color-muted, #667085)",
                boxShadow: period === p ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 120ms"
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ ...panelStyle(), display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--z-color-muted, #667085)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {m.label}
            </span>
            <strong style={{ fontSize: "1.35rem", letterSpacing: "-0.03em", color: "var(--z-color-text, #171717)" }}>
              {m.value}
            </strong>
            <span style={{ fontSize: "0.82rem", fontWeight: 500, color: m.positive ? "var(--z-color-success, #0a7d53)" : "var(--z-color-danger, #c43b2f)" }}>
              {m.delta}
            </span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "View report" }, { label: "Export", variant: "secondary" }])}
    </Card>
  );
}

/* ── User Profile Card ──────────────────────────────────────────────────── */

interface UserProfileCardWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export function UserProfileCardWidget({
  title = "Profile",
  subtitle = "Manage your account details and preferences.",
  surface = "elevated",
  className,
  style
}: UserProfileCardWidgetProps) {
  const details = [
    { label: "Email", value: "alex@company.com" },
    { label: "Role", value: "Admin" },
    { label: "Team", value: "Engineering" },
    { label: "Timezone", value: "UTC-8 (PST)" }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div>
        <div style={kickerStyle()}>Account</div>
        <h3 style={titleStyle()}>{title}</h3>
      </div>
      <div
        style={{
          ...panelStyle(),
          display: "flex",
          alignItems: "center",
          gap: "1rem"
        }}
      >
        <Avatar name="Alex Chen" size={48} />
        <div style={stackStyle("0.15rem")}>
          <strong style={{ fontSize: "1.05rem", color: "var(--z-color-text, #171717)" }}>Alex Chen</strong>
          <span style={{ fontSize: "0.88rem", color: "var(--z-color-muted, #667085)" }}>Product Engineer</span>
          <Badge color="green" variant="lighter">Active</Badge>
        </div>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6, fontSize: "0.92rem" }}>{subtitle}</p>
      <div style={dividedListStyle()}>
        {details.map((d, index) => (
          <div
            key={d.label}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              }),
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span style={{ fontSize: "0.88rem", color: "var(--z-color-muted, #667085)" }}>{d.label}</span>
            <span style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--z-color-text, #171717)" }}>{d.value}</span>
          </div>
        ))}
      </div>
      {actionRow([{ label: "Edit profile" }, { label: "Change password", variant: "secondary" }])}
    </Card>
  );
}

/* ── Pricing Tier ───────────────────────────────────────────────────────── */

interface PricingTierWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export function PricingTierWidget({
  title = "Pro plan",
  subtitle = "Everything you need to scale your product.",
  surface = "elevated",
  className,
  style
}: PricingTierWidgetProps) {
  const features = [
    "Unlimited projects",
    "Advanced analytics",
    "Priority support",
    "Custom integrations",
    "Team collaboration",
    "API access"
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div>
        <div style={kickerStyle()}>Pricing</div>
        <h3 style={titleStyle()}>{title}</h3>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
        <span style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--z-color-text, #171717)" }}>$49</span>
        <span style={{ fontSize: "0.92rem", color: "var(--z-color-muted, #667085)" }}>/ month</span>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6, fontSize: "0.92rem" }}>{subtitle}</p>
      <Divider />
      <div style={stackStyle("0.6rem")}>
        {features.map((feat) => (
          <div key={feat} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <span style={{ color: "var(--z-color-success, #0a7d53)", fontSize: "1rem", fontWeight: 700, lineHeight: 1 }}>✓</span>
            <span style={{ fontSize: "0.92rem", color: "var(--z-color-text, #171717)" }}>{feat}</span>
          </div>
        ))}
      </div>
      <Divider />
      {actionRow([{ label: "Get started" }, { label: "Compare plans", variant: "secondary" }])}
    </Card>
  );
}

/* ── Changelog Feed ─────────────────────────────────────────────────────── */

interface ChangelogFeedWidgetProps {
  title?: string;
  subtitle?: string;
  surface?: WidgetSurface;
  className?: string;
  style?: CSSProperties;
}

export function ChangelogFeedWidget({
  title = "Changelog",
  subtitle = "Recent updates and improvements.",
  surface = "elevated",
  className,
  style
}: ChangelogFeedWidgetProps) {
  const entries = [
    { version: "v2.4.0", date: "Mar 5, 2026", label: "Feature", labelColor: "blue" as BadgeColor, description: "Added real-time collaboration for all project types." },
    { version: "v2.3.2", date: "Feb 28, 2026", label: "Fix", labelColor: "green" as BadgeColor, description: "Resolved issue with webhook delivery retries." },
    { version: "v2.3.1", date: "Feb 22, 2026", label: "Improvement", labelColor: "purple" as BadgeColor, description: "Dashboard load time reduced by 40% with new caching layer." },
    { version: "v2.3.0", date: "Feb 15, 2026", label: "Feature", labelColor: "blue" as BadgeColor, description: "Introduced custom roles and granular permissions." }
  ];

  return (
    <Card {...surfaceProps(surface)} padding="lg" className={className} style={cardStyle(style)}>
      <div style={inlineRowStyle()}>
        <div>
          <div style={kickerStyle()}>Updates</div>
          <h3 style={titleStyle()}>{title}</h3>
        </div>
        <Badge color="blue" variant="lighter">{entries.length} releases</Badge>
      </div>
      <p style={{ ...mutedTextStyle(), margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
      <div style={dividedListStyle()}>
        {entries.map((entry, index) => (
          <div
            key={entry.version}
            style={{
              ...dividedRowStyle({
                borderTop: index === 0 ? "none" : "1px solid var(--z-color-border, #ebebeb)"
              }),
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "0.45rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
              <strong style={{ fontSize: "0.93rem", fontFamily: "var(--z-type-family-mono, monospace)", color: "var(--z-color-text, #171717)" }}>
                {entry.version}
              </strong>
              <Badge color={entry.labelColor} variant="lighter">{entry.label}</Badge>
              <span style={{ fontSize: "0.82rem", color: "var(--z-color-muted, #667085)", marginLeft: "auto" }}>{entry.date}</span>
            </div>
            <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.55, color: "var(--z-color-text, #171717)" }}>
              {entry.description}
            </p>
          </div>
        ))}
      </div>
      {actionRow([{ label: "View all releases" }])}
    </Card>
  );
}
