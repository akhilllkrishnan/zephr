import { ReactNode, useMemo, useState } from "react";
import {
  ActivityTimelineWidget,
  AccessRequestsWidget,
  ApprovalModalWidget,
  AnalyticsOverviewWidget,
  ApiKeysWidget,
  AssetReviewWidget,
  AuditTrailWidget,
  AutomationRunsWidget,
  Badge,
  BillingRecoveryWidget,
  BillingUsageWidget,
  ChatPanelWidget,
  CommandPaletteWidget,
  ContentCalendarWidget,
  CustomerHealthWidget,
  DealsPipelineWidget,
  EventSchedulerWidget,
  FeedbackInboxWidget,
  GoalTrackerWidget,
  Input,
  IncidentDigestWidget,
  IncidentResponseWidget,
  IntegrationStatusWidget,
  InviteMembersWidget,
  KanbanBoardWidget,
  LaunchProgressWidget,
  LicenseActivationsWidget,
  NotificationFeedWidget,
  PaymentMethodsWidget,
  PlanComparisonWidget,
  ProjectBriefFormWidget,
  QuickActionsWidget,
  ReleaseNotesWidget,
  ReleaseChecklistWidget,
  RevenueSnapshotWidget,
  ReviewInboxWidget,
  SecurityAccessWidget,
  SettingsPanelWidget,
  SupportQueueWidget,
  TeamPulseWidget,
  TeamDirectoryWidget,
  UploadQueueWidget,
  CommentThreadWidget,
  ExperimentResultsWidget,
  type WidgetSurface
} from "@zephrui/ui-react";

type WidgetCategory = "all" | "workflow" | "forms" | "team" | "settings";

interface WidgetEntry {
  id: string;
  title: string;
  description: string;
  category: WidgetCategory;
  featured: boolean;
  searchText: string;
  tags: string[];
  badge: ReactNode;
  preview: ReactNode;
  code: string;
}

function widgetSnippet(widgetName: string, propsBlock: string): string {
  return `import { ${widgetName} } from "@zephrui/ui-react";

export function Example${widgetName}() {
  return (
    <${widgetName}
${propsBlock}
    />
  );
}`;
}

function PreviewCodeBlock({
  preview,
  code,
  onCopy,
  className,
}: {
  preview: ReactNode;
  code: string;
  onCopy: () => void;
  className?: string;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  return (
    <div className={`pcb-root${className ? ` ${className}` : ""}`}>
      <div className="pcb-toolbar">
        <button type="button" className={`pcb-tab${tab === "preview" ? " active" : ""}`} onClick={() => setTab("preview")}>
          Preview
        </button>
        <button type="button" className={`pcb-tab${tab === "code" ? " active" : ""}`} onClick={() => setTab("code")}>
          Code
        </button>
        <button type="button" className="pcb-copy" onClick={onCopy}>Copy</button>
      </div>
      {tab === "preview" ? <div className="pcb-preview-area">{preview}</div> : <pre className="pcb-code-area">{code}</pre>}
    </div>
  );
}

function WidgetGalleryCard({
  widget,
  onCopy,
  featured = false,
}: {
  widget: WidgetEntry;
  onCopy: () => void;
  featured?: boolean;
}) {
  return (
    <article id={widget.id} className={`widget-gallery-card${featured ? " is-featured" : ""}`}>
      <div className="widget-gallery-head">
        <div>
          <h3>{widget.title}</h3>
          <p>{widget.description}</p>
          <div className="widget-tag-row" aria-label={`${widget.title} tags`}>
            {widget.tags.map((tag) => (
              <span key={tag} className="widget-tag">{tag}</span>
            ))}
          </div>
        </div>
        {widget.badge}
      </div>
      <PreviewCodeBlock
        className={`widget-preview-block${featured ? " is-featured" : ""}`}
        preview={<div className={`widget-preview-stage${featured ? " is-featured" : ""}`}>{widget.preview}</div>}
        code={widget.code}
        onCopy={onCopy}
      />
    </article>
  );
}

const CATEGORY_OPTIONS: Array<{ value: WidgetCategory; label: string }> = [
  { value: "all", label: "All widgets" },
  { value: "workflow", label: "Workflow" },
  { value: "forms", label: "Forms" },
  { value: "team", label: "Team" },
  { value: "settings", label: "Settings" }
];

interface WidgetsPageProps {
  widgetSurface: WidgetSurface;
  onCopy: (label: string, value: string) => void;
}

export default function WidgetsPage({ widgetSurface, onCopy }: WidgetsPageProps) {
  const [activeCategory, setActiveCategory] = useState<WidgetCategory>("all");
  const [query, setQuery] = useState("");

  const widgetEntries = useMemo<WidgetEntry[]>(() => [
    {
      id: "widget-approval-modal",
      title: "Approval modal",
      description: "A production-ready confirmation flow for approvals, publishing, and high-impact actions.",
      category: "workflow",
      featured: true,
      searchText: "modal approval dialog publish confirm workflow release review",
      tags: ["modal", "approval", "workflow"],
      badge: <Badge color="orange" variant="lighter">Workflow</Badge>,
      preview: <ApprovalModalWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ApprovalModalWidget", `      title="Approval modal"\n      subtitle="Review contract changes"\n      confirmLabel="Publish changes"`)
    },
    {
      id: "widget-project-brief",
      title: "Project brief form",
      description: "A structured intake form for AI-assisted feature briefs, product requests, and scoped work.",
      category: "forms",
      featured: true,
      searchText: "form brief intake ai project request textarea goals context",
      tags: ["form", "brief", "intake"],
      badge: <Badge color="sky" variant="lighter">Forms</Badge>,
      preview: <ProjectBriefFormWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ProjectBriefFormWidget", `      title="Project brief"\n      subtitle="Collect the inputs before your AI generates the first screen."`)
    },
    {
      id: "widget-launch-progress",
      title: "Launch progress",
      description: "A multi-step progress block for shipping work, QA readiness, and launch status.",
      category: "workflow",
      featured: true,
      searchText: "progress launch shipping checklist milestones qa project tracker",
      tags: ["progress", "launch", "tracker"],
      badge: <Badge color="green" variant="lighter">Progress</Badge>,
      preview: <LaunchProgressWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("LaunchProgressWidget", `      title="Launch progress"\n      subtitle="Track remaining work across design, QA, and customer-facing comms."`)
    },
    {
      id: "widget-team-directory",
      title: "Team list",
      description: "A simple directory for project ownership, roles, availability, and people lookup.",
      category: "team",
      featured: true,
      searchText: "team list directory members people avatars roles staffing availability",
      tags: ["directory", "people", "team"],
      badge: <Badge color="sky" variant="lighter">Team</Badge>,
      preview: <TeamDirectoryWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("TeamDirectoryWidget", `      title="Team list"\n      subtitle="Who is on the project, what they own, and whether they are available right now."`)
    },
    {
      id: "widget-upload-queue",
      title: "File upload",
      description: "An upload queue with drop zone, file states, and progress bars for content workflows.",
      category: "forms",
      featured: false,
      searchText: "file upload drag drop progress queue media assets csv publish",
      tags: ["upload", "files", "queue"],
      badge: <Badge color="purple" variant="lighter">Assets</Badge>,
      preview: <UploadQueueWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("UploadQueueWidget", `      title="File upload"\n      subtitle="Monitor files, progress, and publish state from a single queue."`)
    },
    {
      id: "widget-chat-panel",
      title: "Chat panel",
      description: "A compact support and assistant conversation surface with recent messages and reply input.",
      category: "team",
      featured: false,
      searchText: "chat support assistant conversation thread reply customer success",
      tags: ["chat", "support", "assistant"],
      badge: <Badge color="teal" variant="lighter">Live</Badge>,
      preview: <ChatPanelWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ChatPanelWidget", `      title="Support chat"\n      subtitle="Compact assistant thread with recent context and a fast reply field."`)
    },
    {
      id: "widget-invite-members",
      title: "Invite team members",
      description: "A team invitation flow with multi-email entry, role context, and shareable access actions.",
      category: "team",
      featured: false,
      searchText: "invite members team access roles admin email tag input collaboration",
      tags: ["invite", "roles", "access"],
      badge: <Badge color="purple" variant="lighter">Admin</Badge>,
      preview: <InviteMembersWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("InviteMembersWidget", `      title="Invite team members"\n      subtitle="Add collaborators, assign a role, and send access in one step."`)
    },
    {
      id: "widget-settings-panel",
      title: "Settings panel",
      description: "A practical settings surface with toggles, descriptions, and save/reset actions.",
      category: "settings",
      featured: false,
      searchText: "settings preferences toggles save reset controls workspace admin",
      tags: ["settings", "toggles", "preferences"],
      badge: <Badge tone="neutral">Settings</Badge>,
      preview: <SettingsPanelWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("SettingsPanelWidget", `      title="Workspace settings"\n      subtitle="Common account controls that combine switches, status, and action buttons."`)
    },
    {
      id: "widget-notification-feed",
      title: "Notifications feed",
      description: "A compact feed for approvals, mentions, publishing updates, and customer-facing alerts.",
      category: "workflow",
      featured: false,
      searchText: "notifications feed inbox alerts mentions publish approvals release updates",
      tags: ["notifications", "feed", "alerts"],
      badge: <Badge color="blue" variant="lighter">Inbox</Badge>,
      preview: <NotificationFeedWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("NotificationFeedWidget", `      title="Notifications feed"\n      subtitle="A mixed feed for approvals, releases, mentions, and customer-facing alerts."`)
    },
    {
      id: "widget-security-access",
      title: "Security & access",
      description: "An admin block for SSO, audit logging, alerts, and access-sensitive settings.",
      category: "settings",
      featured: false,
      searchText: "security access sso scim audit logging settings admin compliance",
      tags: ["security", "sso", "audit"],
      badge: <Badge color="purple" variant="lighter">Admin</Badge>,
      preview: <SecurityAccessWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("SecurityAccessWidget", `      title="Security & access"\n      subtitle="A compact admin surface for SSO, audit logging, and role-sensitive controls."`)
    },
    {
      id: "widget-payment-methods",
      title: "Payment methods",
      description: "A billing block for cards, invoice routes, and payment preference management.",
      category: "forms",
      featured: false,
      searchText: "payment methods billing cards invoices subscriptions finance",
      tags: ["billing", "payments", "cards"],
      badge: <Badge tone="neutral">Billing</Badge>,
      preview: <PaymentMethodsWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("PaymentMethodsWidget", `      title="Payment methods"\n      subtitle="A reusable billing block for cards, invoices, and plan-level payment preferences."`)
    },
    {
      id: "widget-activity-timeline",
      title: "Recent activity",
      description: "A simple activity timeline for launches, edits, deployments, and collaboration events.",
      category: "workflow",
      featured: false,
      searchText: "activity timeline feed launches deploys edits history collaboration",
      tags: ["timeline", "activity", "history"],
      badge: <Badge color="gray" variant="stroke">Timeline</Badge>,
      preview: <ActivityTimelineWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ActivityTimelineWidget", `      title="Recent activity"\n      subtitle="A compact timeline for launches, merges, comments, and operational updates."`)
    },
    {
      id: "widget-command-palette",
      title: "Command palette",
      description: "A command surface for navigation, actions, and account search with high-frequency shortcuts.",
      category: "workflow",
      featured: false,
      searchText: "command palette search navigation shortcuts global actions",
      tags: ["command", "search", "shortcuts"],
      badge: <Badge color="blue" variant="lighter">Action</Badge>,
      preview: <CommandPaletteWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("CommandPaletteWidget", `      title="Command palette"\n      subtitle="A fast command surface for global navigation, actions, and recent entities."`)
    },
    {
      id: "widget-kanban-board",
      title: "Kanban board",
      description: "A compact task board for status tracking across backlog, review, and shipped lanes.",
      category: "workflow",
      featured: false,
      searchText: "kanban board tasks backlog review shipped project management",
      tags: ["kanban", "tasks", "board"],
      badge: <Badge color="orange" variant="lighter">Board</Badge>,
      preview: <KanbanBoardWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("KanbanBoardWidget", `      title="Kanban board"\n      subtitle="A compact task board for design, review, and shipping workflows."`)
    },
    {
      id: "widget-event-scheduler",
      title: "Event scheduler",
      description: "A scheduling block for launches, stakeholder reviews, and shared internal meetings.",
      category: "forms",
      featured: false,
      searchText: "scheduler calendar event meeting launch guests attendees",
      tags: ["scheduler", "calendar", "meeting"],
      badge: <Badge color="teal" variant="lighter">Calendar</Badge>,
      preview: <EventSchedulerWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("EventSchedulerWidget", `      title="Event scheduler"\n      subtitle="A small scheduling block for launches, demos, or stakeholder reviews."`)
    },
    {
      id: "widget-comment-thread",
      title: "Comment thread",
      description: "A threaded review surface for design QA, docs feedback, and launch discussion.",
      category: "team",
      featured: false,
      searchText: "comment thread discussion feedback review qa replies",
      tags: ["comments", "review", "feedback"],
      badge: <Badge color="gray" variant="stroke">Thread</Badge>,
      preview: <CommentThreadWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("CommentThreadWidget", `      title="Comment thread"\n      subtitle="A review thread for design QA, docs editing, or launch feedback."`)
    },
    {
      id: "widget-plan-comparison",
      title: "Plan comparison",
      description: "A compact upgrade widget for pricing, seat counts, and tier selection.",
      category: "forms",
      featured: false,
      searchText: "plan comparison pricing upgrade tiers seats billing",
      tags: ["pricing", "upgrade", "plans"],
      badge: <Badge tone="neutral">Pricing</Badge>,
      preview: <PlanComparisonWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("PlanComparisonWidget", `      title="Plan comparison"\n      subtitle="A compact pricing widget for upgrades, workspace seats, and feature access."`)
    },
    {
      id: "widget-asset-review",
      title: "Asset review",
      description: "A lightweight approval surface for campaign assets, screenshots, and media files.",
      category: "forms",
      featured: false,
      searchText: "asset review media content approval campaign images video",
      tags: ["assets", "review", "media"],
      badge: <Badge color="purple" variant="lighter">Review</Badge>,
      preview: <AssetReviewWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("AssetReviewWidget", `      title="Asset review"\n      subtitle="A media approval widget for content, homepage assets, and campaign files."`)
    },
    {
      id: "widget-api-keys",
      title: "API keys",
      description: "A practical developer access block for key creation, scope review, and rotation status.",
      category: "settings",
      featured: false,
      searchText: "api keys developer access tokens rotate scopes webhooks",
      tags: ["api", "keys", "developer"],
      badge: <Badge tone="neutral">Settings</Badge>,
      preview: <ApiKeysWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ApiKeysWidget", `      title="API keys"\n      subtitle="Review scopes, generate internal tokens, and rotate credentials safely."`)
    },
    {
      id: "widget-support-queue",
      title: "Support queue",
      description: "A triage surface for customer issues, priorities, owners, and response-ready handoff.",
      category: "workflow",
      featured: true,
      searchText: "support queue tickets customer ops triage priority owner",
      tags: ["support", "queue", "triage"],
      badge: <Badge color="orange" variant="lighter">Ops</Badge>,
      preview: <SupportQueueWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("SupportQueueWidget", `      title="Support queue"\n      subtitle="Prioritize customer issues, assign owners, and track response urgency."`)
    },
    {
      id: "widget-goal-tracker",
      title: "Goal tracker",
      description: "A compact quarterly goals block for progress, confidence, and execution context.",
      category: "workflow",
      featured: false,
      searchText: "goals okr tracker progress planning quarterly metrics",
      tags: ["goals", "okr", "planning"],
      badge: <Badge color="teal" variant="lighter">Goals</Badge>,
      preview: <GoalTrackerWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("GoalTrackerWidget", `      title="Goal tracker"\n      subtitle="Track quarter goals, current confidence, and what is blocking the metric."`)
    },
    {
      id: "widget-integration-status",
      title: "Integration status",
      description: "A dependency health block for hosted services, webhooks, sync jobs, and external tooling.",
      category: "settings",
      featured: false,
      searchText: "integrations status health webhooks sync dependencies vercel supabase",
      tags: ["integrations", "status", "health"],
      badge: <Badge color="blue" variant="lighter">Status</Badge>,
      preview: <IntegrationStatusWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("IntegrationStatusWidget", `      title="Integration status"\n      subtitle="See what third-party systems are healthy, degraded, or awaiting review."`)
    },
    {
      id: "widget-access-requests",
      title: "Access requests",
      description: "A review queue for admin access, guest invites, and audit-sensitive permission changes.",
      category: "team",
      featured: false,
      searchText: "access requests roles permissions guest admin audit approvals",
      tags: ["access", "permissions", "review"],
      badge: <Badge color="purple" variant="lighter">Admin</Badge>,
      preview: <AccessRequestsWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("AccessRequestsWidget", `      title="Access requests"\n      subtitle="Review elevated permissions, guest invites, and audit-sensitive access changes."`)
    },
    {
      id: "widget-license-activations",
      title: "License activations",
      description: "A commercial admin block for seat usage, reset requests, and recent workspace activations.",
      category: "settings",
      featured: false,
      searchText: "license activations seats usage resets customers commercial billing",
      tags: ["licensing", "seats", "activations"],
      badge: <Badge tone="neutral">Billing</Badge>,
      preview: <LicenseActivationsWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("LicenseActivationsWidget", `      title="License activations"\n      subtitle="Track seats, reset requests, and current activation health across customers."`)
    },
    {
      id: "widget-experiment-results",
      title: "Experiment results",
      description: "A decision block for A/B tests, confidence, rollout calls, and product growth reporting.",
      category: "workflow",
      featured: false,
      searchText: "experiment results ab test confidence rollout winner growth",
      tags: ["experiments", "growth", "rollout"],
      badge: <Badge color="green" variant="lighter">Growth</Badge>,
      preview: <ExperimentResultsWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ExperimentResultsWidget", `      title="Experiment results"\n      subtitle="Review confidence, uplift, and rollout readiness before shipping the winner."`)
    },
    {
      id: "widget-release-notes",
      title: "Release notes",
      description: "A publishing widget for launch communication, copy approval, and channel selection.",
      category: "forms",
      featured: false,
      searchText: "release notes changelog launch communication publish copy",
      tags: ["release", "changelog", "comms"],
      badge: <Badge color="blue" variant="lighter">Comms</Badge>,
      preview: <ReleaseNotesWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ReleaseNotesWidget", `      title="Release notes"\n      subtitle="Draft launch communication and choose where the update should go live."`)
    },
    {
      id: "widget-analytics-overview",
      title: "Analytics overview",
      description: "A compact KPI layer for product, retention, and growth signals that matter every week.",
      category: "workflow",
      featured: true,
      searchText: "analytics overview dashboard kpi retention growth metrics product",
      tags: ["analytics", "kpi", "growth"],
      badge: <Badge color="blue" variant="lighter">Metrics</Badge>,
      preview: <AnalyticsOverviewWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("AnalyticsOverviewWidget", `      title="Analytics overview"\n      subtitle="Keep the top-line product and growth signals visible in one compact widget."`)
    },
    {
      id: "widget-deals-pipeline",
      title: "Deals pipeline",
      description: "A commercial pipeline block for opportunities, owners, stage review, and ARR context.",
      category: "team",
      featured: false,
      searchText: "deals pipeline crm opportunities revenue sales commercial arr",
      tags: ["crm", "pipeline", "revenue"],
      badge: <Badge color="teal" variant="lighter">CRM</Badge>,
      preview: <DealsPipelineWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("DealsPipelineWidget", `      title="Deals pipeline"\n      subtitle="Review opportunity stage, ownership, and ARR context in one compact workspace block."`)
    },
    {
      id: "widget-billing-recovery",
      title: "Billing recovery",
      description: "A dunning-focused widget for failed charges, retry health, and outreach decisions.",
      category: "settings",
      featured: true,
      searchText: "billing recovery dunning failed invoices retry payments revenue",
      tags: ["billing", "recovery", "dunning"],
      badge: <Badge color="yellow" variant="lighter">Billing</Badge>,
      preview: <BillingRecoveryWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("BillingRecoveryWidget", `      title="Billing recovery"\n      subtitle="Prioritize failed charges and the next intervention path before revenue slips."`)
    },
    {
      id: "widget-automation-runs",
      title: "Automation runs",
      description: "A run-history block for scheduled jobs, webhook automations, and retry-sensitive workflows.",
      category: "workflow",
      featured: false,
      searchText: "automation runs jobs workflows retries webhooks scheduled agents",
      tags: ["automation", "jobs", "runs"],
      badge: <Badge color="purple" variant="lighter">Ops</Badge>,
      preview: <AutomationRunsWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("AutomationRunsWidget", `      title="Automation runs"\n      subtitle="Monitor scheduled jobs, retries, and workflow health before your team gets blocked."`)
    },
    {
      id: "widget-audit-trail",
      title: "Audit trail",
      description: "A compact review widget for sensitive admin actions, billing changes, and role updates.",
      category: "settings",
      featured: false,
      searchText: "audit trail compliance access billing roles admin history",
      tags: ["audit", "compliance", "history"],
      badge: <Badge tone="neutral">Audit</Badge>,
      preview: <AuditTrailWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("AuditTrailWidget", `      title="Audit trail"\n      subtitle="Track sensitive admin and billing events without opening a separate audit screen."`)
    },
    {
      id: "widget-content-calendar",
      title: "Content calendar",
      description: "A publishing schedule widget for launches, release notes, and asset-review planning.",
      category: "forms",
      featured: false,
      searchText: "content calendar publishing launch campaign release notes schedule",
      tags: ["content", "calendar", "publishing"],
      badge: <Badge color="blue" variant="lighter">Content</Badge>,
      preview: <ContentCalendarWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ContentCalendarWidget", `      title="Content calendar"\n      subtitle="Coordinate launch content, homepage updates, and release-notes publishing in one schedule-aware block."`)
    },
    {
      id: "widget-incident-response",
      title: "Incident response",
      description: "A live incident block for mitigation status, owner handoff, and active response steps.",
      category: "workflow",
      featured: true,
      searchText: "incident response reliability mitigation outage status postmortem",
      tags: ["incident", "reliability", "response"],
      badge: <Badge color="red" variant="lighter">P1</Badge>,
      preview: <IncidentResponseWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("IncidentResponseWidget", `      title="Incident response"\n      subtitle="Keep mitigation steps, owner handoff, and incident state visible while the team is in flight."`)
    },
    {
      id: "widget-feedback-inbox",
      title: "Feedback inbox",
      description: "A product-feedback block for customer signals, grouped themes, and follow-up routing.",
      category: "team",
      featured: false,
      searchText: "feedback inbox customer insights themes product requests research",
      tags: ["feedback", "insights", "product"],
      badge: <Badge color="teal" variant="lighter">Insights</Badge>,
      preview: <FeedbackInboxWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("FeedbackInboxWidget", `      title="Feedback inbox"\n      subtitle="Collect qualitative product feedback, group themes, and route follow-up without losing the thread."`)
    },
    {
      id: "widget-revenue-snapshot",
      title: "Revenue snapshot",
      description: "A top-level revenue widget for weekly review, target progress, and export-ready KPI framing.",
      category: "workflow",
      featured: false,
      searchText: "revenue snapshot kpi target growth finance weekly metrics",
      tags: ["revenue", "kpi", "finance"],
      badge: <Badge color="green" variant="lighter">Metrics</Badge>,
      preview: <RevenueSnapshotWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("RevenueSnapshotWidget", `      title="Revenue snapshot"\n      subtitle="Track the top-line commercial metrics that matter every week."`)
    },
    {
      id: "widget-release-checklist",
      title: "Release checklist",
      description: "A launch operations widget for final tasks, publish readiness, and release-day ownership.",
      category: "workflow",
      featured: false,
      searchText: "release checklist launch qa publish readiness operations ship",
      tags: ["release", "checklist", "launch"],
      badge: <Badge color="orange" variant="lighter">Launch</Badge>,
      preview: <ReleaseChecklistWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ReleaseChecklistWidget", `      title="Release checklist"\n      subtitle="Track the final tasks that stand between staging and ship."`)
    },
    {
      id: "widget-team-pulse",
      title: "Team pulse",
      description: "A compact team health widget for availability, ownership, and staffing context.",
      category: "team",
      featured: false,
      searchText: "team pulse staffing availability owners collaboration people",
      tags: ["team", "staffing", "availability"],
      badge: <Badge color="sky" variant="lighter">People</Badge>,
      preview: <TeamPulseWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("TeamPulseWidget", `      title="Team pulse"\n      subtitle="Track current staffing, availability, and ownership across your workspace."`)
    },
    {
      id: "widget-billing-usage",
      title: "Billing usage",
      description: "A budget and usage widget for monthly spend, limits, and commercial alerts.",
      category: "settings",
      featured: false,
      searchText: "billing usage spend budget monthly finance limits alerts",
      tags: ["billing", "usage", "budget"],
      badge: <Badge tone="neutral">Billing</Badge>,
      preview: <BillingUsageWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("BillingUsageWidget", `      title="Billing usage"\n      subtitle="Keep spend, limits, and billing alerts visible without opening a separate dashboard."`)
    },
    {
      id: "widget-customer-health",
      title: "Customer health",
      description: "A customer success widget for account health, owner context, and renewal risk.",
      category: "team",
      featured: false,
      searchText: "customer health success renewals risk accounts owner churn",
      tags: ["customers", "health", "success"],
      badge: <Badge color="teal" variant="lighter">CS</Badge>,
      preview: <CustomerHealthWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("CustomerHealthWidget", `      title="Customer health"\n      subtitle="Review account health, ownership, and renewal risk in one compact block."`)
    },
    {
      id: "widget-incident-digest",
      title: "Incident digest",
      description: "A reliability widget for incident severity, live updates, and operator escalation context.",
      category: "workflow",
      featured: false,
      searchText: "incident digest reliability outage updates severity escalation",
      tags: ["incident", "digest", "reliability"],
      badge: <Badge color="red" variant="lighter">Reliability</Badge>,
      preview: <IncidentDigestWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("IncidentDigestWidget", `      title="Incident digest"\n      subtitle="Summarize the current incident, severity, and the operator update stream."`)
    },
    {
      id: "widget-review-inbox",
      title: "Review inbox",
      description: "A review queue widget for pending approvals, priorities, and high-signal collaboration tasks.",
      category: "team",
      featured: false,
      searchText: "review inbox approvals priorities queue collaboration tasks",
      tags: ["review", "queue", "approvals"],
      badge: <Badge color="purple" variant="lighter">Review</Badge>,
      preview: <ReviewInboxWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ReviewInboxWidget", `      title="Review inbox"\n      subtitle="Prioritize the items that need team review before shipping."`)
    },
    {
      id: "widget-quick-actions",
      title: "Quick actions",
      description: "A command-heavy utility widget for high-frequency internal actions and operator shortcuts.",
      category: "workflow",
      featured: false,
      searchText: "quick actions commands operators shortcuts internal tools",
      tags: ["actions", "shortcuts", "ops"],
      badge: <Badge color="blue" variant="lighter">Actions</Badge>,
      preview: <QuickActionsWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("QuickActionsWidget", `      title="Quick actions"\n      subtitle="Collect the highest-frequency internal tools into one compact action surface."`)
    }
  ], [widgetSurface]);

  const visibleWidgetEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return widgetEntries.filter((entry) => {
      const categoryMatch = activeCategory === "all" || entry.category === activeCategory;
      if (!categoryMatch) return false;
      if (!normalized) return true;
      return `${entry.title} ${entry.description} ${entry.searchText}`.toLowerCase().includes(normalized);
    });
  }, [activeCategory, query, widgetEntries]);

  const featuredWidgetEntries = useMemo(() => visibleWidgetEntries.filter((entry) => entry.featured), [visibleWidgetEntries]);
  const catalogWidgetEntries = useMemo(() => visibleWidgetEntries.filter((entry) => !entry.featured), [visibleWidgetEntries]);

  return (
    <>
      <section id="widgets-overview" className="doc-section hero">
        <p className="breadcrumbs">Pages / Widgets</p>
        <h1>Widgets</h1>
        <p className="lead">
          Real-world product widgets composed from Zephr foundations and components. Use them as starting points for approvals, forms, team management, uploads, settings, billing, and internal tools.
        </p>
        <div className="widget-hero-metrics" aria-label="Widget page highlights">
          <div className="widget-hero-metric">
            <strong>{widgetEntries.length}</strong>
            <span>Package-backed widgets</span>
          </div>
          <div className="widget-hero-metric">
            <strong>Preview + code</strong>
            <span>Toggle each block before copying</span>
          </div>
          <div className="widget-hero-metric">
            <strong>Built from primitives</strong>
            <span>Every widget uses the same Zephr components you ship in your app</span>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <div className="section-heading">
          <h2>Ready-made widget patterns</h2>
          <p>Preview each widget, copy the composition, and adapt it to your workflows without dropping to raw HTML controls.</p>
        </div>
        <div className="widget-toolbar-shell">
          <div className="widget-toolbar-meta">
            <span className="widget-toolbar-count">{visibleWidgetEntries.length} widgets</span>
            <p>Search by workflow, form, team, or settings use case, then copy a production-ready starting point.</p>
          </div>
          <div className="widget-toolbar-row">
            <div className="widget-search">
              <span className="widget-search-icon" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <Input
                controlSize="sm"
                className="widget-search-input"
                aria-label="Search widgets"
                placeholder="Search widgets, forms, modals, team..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="widget-filter-row" role="tablist" aria-label="Widget categories">
              {CATEGORY_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === value}
                  className={`widget-filter-chip ${activeCategory === value ? "is-active" : ""}`}
                  onClick={() => setActiveCategory(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {visibleWidgetEntries.length > 0 ? (
          <>
            {featuredWidgetEntries.length > 0 ? (
              <div className="widget-section-shell">
                <div className="widget-section-head">
                  <div>
                    <p className="widget-section-kicker">Featured</p>
                    <h3>Start with the most reusable flows</h3>
                  </div>
                  <p>These blocks cover the highest-frequency product needs: approvals, intake, progress, and people operations.</p>
                </div>
                <div className="widget-feature-grid">
                  {featuredWidgetEntries.map((widget) => (
                    <WidgetGalleryCard key={widget.id} widget={widget} featured onCopy={() => onCopy(`${widget.title} widget`, widget.code)} />
                  ))}
                </div>
              </div>
            ) : null}
            {catalogWidgetEntries.length > 0 ? (
              <div className="widget-section-shell">
                <div className="widget-section-head">
                  <div>
                    <p className="widget-section-kicker">Catalog</p>
                    <h3>More widgets for team operations, settings, internal tools, and billing</h3>
                  </div>
                  <p>Each widget stays grounded in the same Zephr token and component contract, so styling remains consistent as you scale.</p>
                </div>
                <div className="widget-gallery-grid">
                  {catalogWidgetEntries.map((widget) => (
                    <WidgetGalleryCard key={widget.id} widget={widget} onCopy={() => onCopy(`${widget.title} widget`, widget.code)} />
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="widget-empty-state">
            <strong>No widgets match this search.</strong>
            <p>Clear the search or switch categories to see the full gallery again.</p>
          </div>
        )}
      </section>
    </>
  );
}
