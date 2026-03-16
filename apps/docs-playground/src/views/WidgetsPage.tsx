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
  ReferralRewardWidget,
  RevenueSnapshotWidget,
  ReviewInboxWidget,
  SecurityAccessWidget,
  SettingsPanelWidget,
  SetupJourneyWidget,
  SupportQueueWidget,
  TeamPulseWidget,
  TeamDirectoryWidget,
  TravelItineraryWidget,
  UploadQueueWidget,
  WelcomeProfileWidget,
  MarketingInsightsWidget,
  ConversionScoreWidget,
  PromptComposerWidget,
  DeliveryTimelineWidget,
  CommentThreadWidget,
  ExperimentResultsWidget,
  DataTableWidget,
  StatusPageWidget,
  NavbarWidget,
  DropdownMenuWidget,
  DatePickerWidget,
  FileManagerWidget,
  MetricsDashboardWidget,
  UserProfileCardWidget,
  PricingTierWidget,
  ChangelogFeedWidget,
  Input,
  Tabs,
  type TabItem,
  type WidgetSurface
} from "@zephrui/ui-react";
import { widgetsV2CatalogIds } from "./widgetsCatalog";

type WidgetCategory = "all" | "workflow" | "forms" | "team" | "settings";
type ShowcaseVersion = "v1" | "v2";

interface WidgetEntry {
  id: string;
  title: string;
  description: string;
  category: WidgetCategory;
  featured: boolean;
  searchText: string;
  preview: ReactNode;
  code: string;
}

const WIDGET_CATEGORY_LABELS: Record<Exclude<WidgetCategory, "all">, string> = {
  workflow: "Workflow",
  forms: "Forms",
  team: "Team",
  settings: "Settings",
};

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
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Preview
        </button>
        <button type="button" className={`pcb-tab${tab === "code" ? " active" : ""}`} onClick={() => setTab("code")}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 18l6-6-6-6" />
            <path d="M8 6l-6 6 6 6" />
          </svg>
          Code
        </button>
        <button type="button" className="pcb-copy" onClick={onCopy}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </button>
      </div>
      {tab === "preview" ? <div className="pcb-preview-area">{preview}</div> : <pre className="pcb-code-area">{code}</pre>}
    </div>
  );
}

function WidgetGalleryCard({
  widget,
  onCopy,
  featured = false,
  showcaseVersion = "v1",
}: {
  widget: WidgetEntry;
  onCopy: () => void;
  featured?: boolean;
  showcaseVersion?: ShowcaseVersion;
}) {
  return (
    <article
      id={widget.id}
      className={`widget-gallery-card${featured ? " is-featured" : ""}${showcaseVersion === "v2" ? " widget-gallery-card--v2" : ""}`}
    >
      <div className="widget-gallery-meta">
        <div className="widget-gallery-head">
          <h3>{widget.title}</h3>
          <p>{widget.description}</p>
        </div>
      </div>
      <div className="widget-gallery-body">
        <PreviewCodeBlock
          preview={widget.preview}
          code={widget.code}
          onCopy={onCopy}
        />
      </div>
    </article>
  );
}

function WidgetSpotlightCard({ widget }: { widget: WidgetEntry }) {
  return (
    <a className="showcase-v2-card" href={`#${widget.id}`}>
      <div className="showcase-v2-card-stage">
        <span className="showcase-v2-card-eyebrow">{WIDGET_CATEGORY_LABELS[widget.category as keyof typeof WIDGET_CATEGORY_LABELS]}</span>
        <div className="showcase-v2-card-preview">
          <WidgetPreviewArt widget={widget} />
        </div>
      </div>
      <div className="showcase-v2-card-copy">
        <h3>{widget.title}</h3>
        <p>{widget.description}</p>
      </div>
    </a>
  );
}

function WidgetPreviewArt({ widget }: { widget: WidgetEntry }) {
  switch (widget.id) {
    case "widget-navbar":
      return (
        <div className="widget-preview-art widget-preview-art--navbar" aria-hidden="true">
          <div className="widget-preview-toolbar">
            <span className="widget-preview-brand" />
            <span className="widget-preview-search" />
            <div className="widget-preview-toolbar-group">
              <span className="widget-preview-chip" />
              <span className="widget-preview-avatar" />
            </div>
          </div>
          <div className="widget-preview-tabs">
            <span className="widget-preview-tab widget-preview-tab--active" />
            <span className="widget-preview-tab" />
            <span className="widget-preview-tab" />
          </div>
        </div>
      );
    case "widget-command-palette":
      return (
        <div className="widget-preview-art widget-preview-art--palette" aria-hidden="true">
          <div className="widget-preview-shell">
            <div className="widget-preview-toolbar">
              <span className="widget-preview-search widget-preview-search--wide" />
              <span className="widget-preview-kbd" />
            </div>
            <div className="widget-preview-list">
              <span className="widget-preview-list-row" />
              <span className="widget-preview-list-row widget-preview-list-row--active" />
              <span className="widget-preview-list-row" />
              <span className="widget-preview-list-row" />
            </div>
          </div>
        </div>
      );
    case "widget-data-table":
      return (
        <div className="widget-preview-art widget-preview-art--table" aria-hidden="true">
          <div className="widget-preview-toolbar">
            <div className="widget-preview-toolbar-group">
              <span className="widget-preview-chip" />
              <span className="widget-preview-chip" />
            </div>
            <span className="widget-preview-button" />
          </div>
          <div className="widget-preview-shell">
            <div className="widget-preview-table widget-preview-table--wide">
              <span className="widget-preview-table-row widget-preview-table-row--head" />
              <span className="widget-preview-table-row" />
              <span className="widget-preview-table-row" />
              <span className="widget-preview-table-row" />
              <span className="widget-preview-table-row" />
            </div>
          </div>
        </div>
      );
    case "widget-prompt-composer":
      return (
        <div className="widget-preview-art widget-preview-art--composer" aria-hidden="true">
          <div className="widget-preview-shell">
            <span className="widget-preview-input widget-preview-input--hero" />
            <div className="widget-preview-toolbar">
              <div className="widget-preview-toolbar-group">
                <span className="widget-preview-button widget-preview-button--icon" />
                <span className="widget-preview-chip widget-preview-chip--label" />
              </div>
              <div className="widget-preview-toolbar-group">
                <span className="widget-preview-chip" />
                <span className="widget-preview-button widget-preview-button--dark" />
              </div>
            </div>
          </div>
        </div>
      );
    case "widget-team-directory":
      return (
        <div className="widget-preview-art widget-preview-art--directory" aria-hidden="true">
          <div className="widget-preview-shell widget-preview-shell--split">
            <div className="widget-preview-list widget-preview-list--people">
              <span className="widget-preview-person-row widget-preview-person-row--active" />
              <span className="widget-preview-person-row" />
              <span className="widget-preview-person-row" />
              <span className="widget-preview-person-row" />
            </div>
            <div className="widget-preview-rail">
              <span className="widget-preview-heading" />
              <span className="widget-preview-detail-line" />
              <span className="widget-preview-detail-line widget-preview-detail-line--short" />
              <span className="widget-preview-detail-line" />
            </div>
          </div>
        </div>
      );
    case "widget-settings-panel":
      return (
        <div className="widget-preview-art widget-preview-art--settings" aria-hidden="true">
          <div className="widget-preview-shell">
            <div className="widget-preview-list widget-preview-list--settings">
              <span className="widget-preview-setting-row" />
              <span className="widget-preview-setting-row" />
              <span className="widget-preview-setting-row" />
              <span className="widget-preview-setting-row" />
            </div>
          </div>
        </div>
      );
    case "widget-support-queue":
      return (
        <div className="widget-preview-art widget-preview-art--support" aria-hidden="true">
          <div className="widget-preview-shell widget-preview-shell--split">
            <div className="widget-preview-list widget-preview-list--support">
              <span className="widget-preview-ticket-row widget-preview-ticket-row--active" />
              <span className="widget-preview-ticket-row" />
              <span className="widget-preview-ticket-row" />
            </div>
            <div className="widget-preview-rail">
              <span className="widget-preview-pillline" />
              <span className="widget-preview-detail-line" />
              <span className="widget-preview-detail-line" />
              <div className="widget-preview-actions">
                <span className="widget-preview-button" />
                <span className="widget-preview-button widget-preview-button--dark" />
              </div>
            </div>
          </div>
        </div>
      );
    case "widget-api-keys":
      return (
        <div className="widget-preview-art widget-preview-art--api" aria-hidden="true">
          <div className="widget-preview-toolbar">
            <span className="widget-preview-chip widget-preview-chip--label" />
            <span className="widget-preview-button widget-preview-button--dark" />
          </div>
          <div className="widget-preview-shell">
            <div className="widget-preview-list widget-preview-list--api">
              <span className="widget-preview-token-row" />
              <span className="widget-preview-token-row" />
              <span className="widget-preview-token-row" />
            </div>
          </div>
        </div>
      );
    case "widget-analytics-overview":
      return (
        <div className="widget-preview-art widget-preview-art--analytics" aria-hidden="true">
          <div className="widget-preview-metric-grid">
            <span className="widget-preview-metric-card" />
            <span className="widget-preview-metric-card" />
            <span className="widget-preview-metric-card" />
          </div>
          <div className="widget-preview-shell">
            <span className="widget-preview-graph" />
            <div className="widget-preview-table">
              <span className="widget-preview-table-row" />
              <span className="widget-preview-table-row" />
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="widget-preview-art" aria-hidden="true">
          <div className="widget-preview-shell">
            <span className="widget-preview-heading" />
            <span className="widget-preview-detail-line" />
            <span className="widget-preview-detail-line widget-preview-detail-line--short" />
          </div>
        </div>
      );
  }
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
  showcaseVersion: ShowcaseVersion;
  onCopy: (label: string, value: string) => void;
}

export default function WidgetsPage({ widgetSurface, showcaseVersion, onCopy }: WidgetsPageProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<WidgetCategory>("all");

  const widgetEntries = useMemo<WidgetEntry[]>(() => [
    {
      id: "widget-approval-modal",
      title: "Approval modal",
      description: "A production-ready confirmation flow for approvals, publishing, and high-impact actions.",
      category: "workflow",
      featured: true,
      searchText: "modal approval dialog publish confirm workflow release review",
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
      preview: <QuickActionsWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("QuickActionsWidget", `      title="Quick actions"\n      subtitle="Collect the highest-frequency internal tools into one compact action surface."`)
    },
    {
      id: "widget-welcome-profile",
      title: "Welcome profile",
      description: "A polished onboarding card for avatar upload, display-name setup, and clean first-run handoff.",
      category: "forms",
      featured: true,
      searchText: "welcome profile onboarding avatar upload display name account setup first run",
      preview: <WelcomeProfileWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("WelcomeProfileWidget", `      title="Welcome to Zephr"\n      subtitle="Add your profile details before entering the workspace."`)
    },
    {
      id: "widget-referral-reward",
      title: "Referral reward",
      description: "A referral and credits block with invite link, incentive explanation, and copy-first CTA.",
      category: "workflow",
      featured: true,
      searchText: "referral reward invite credits growth sharing link copy acquisition",
      preview: <ReferralRewardWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ReferralRewardWidget", `      title="Refer & earn"\n      subtitle="Reward users for sharing the product with friends or teammates."`)
    },
    {
      id: "widget-setup-journey",
      title: "Setup journey",
      description: "A step-driven setup widget for workspace activation, company setup, and first-run success paths.",
      category: "workflow",
      featured: true,
      searchText: "setup journey checklist onboarding progress activation steps company resource service",
      preview: <SetupJourneyWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("SetupJourneyWidget", `      title="Let’s start now"\n      subtitle="Guide new users through workspace setup without losing momentum."`)
    },
    {
      id: "widget-delivery-timeline",
      title: "Delivery timeline",
      description: "A clean shipment or order-progress widget with timeline stages, status badge, and feedback CTA.",
      category: "workflow",
      featured: true,
      searchText: "delivery timeline order progress shipping tracking logistics handoff rating",
      preview: <DeliveryTimelineWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("DeliveryTimelineWidget", `      title="Order timeline"\n      subtitle="Track shipping stages and prompt customers for feedback at the right moment."`)
    },
    {
      id: "widget-travel-itinerary",
      title: "Travel itinerary",
      description: "A route and itinerary widget for trips, multi-leg travel, and schedule-heavy planning flows.",
      category: "workflow",
      featured: true,
      searchText: "travel itinerary trip route flights schedule passengers timeline booking",
      preview: <TravelItineraryWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("TravelItineraryWidget", `      title="Your trip"\n      subtitle="Show route legs, passenger counts, and departure detail in one compact view."`)
    },
    {
      id: "widget-prompt-composer",
      title: "Prompt composer",
      description: "A premium AI composer surface with attachments, mode selector, microphone input, and send action.",
      category: "forms",
      featured: true,
      searchText: "prompt composer ai input attachments microphone mode selector brainwave inspiration",
      preview: <PromptComposerWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("PromptComposerWidget", `      title="Prompt composer"\n      subtitle="Compose richer AI instructions with attachments, modes, and voice-ready actions."`)
    },
    {
      id: "widget-conversion-score",
      title: "Conversion score",
      description: "A focused scorecard for audit-style feedback, severity ranking, and prioritized UX recommendations.",
      category: "settings",
      featured: true,
      searchText: "conversion score audit ux review scorecard recommendations impact analysis",
      preview: <ConversionScoreWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ConversionScoreWidget", `      title="Conversion score"\n      subtitle="Explain UX issues in ranked order with a single top-line health score."`)
    },
    {
      id: "widget-marketing-insights",
      title: "Marketing insights",
      description: "A premium metrics block for channel performance, device split, and live campaign readouts.",
      category: "settings",
      featured: true,
      searchText: "marketing insights analytics channels device traffic performance campaigns metrics",
      preview: <MarketingInsightsWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("MarketingInsightsWidget", `      title="Marketing insights"\n      subtitle="Track channel performance and device trends in one premium analytics surface."`)
    },
    {
      id: "widget-data-table",
      title: "Data table",
      description: "A sortable, paginated table for structured data with status badges and actions.",
      category: "workflow",
      featured: true,
      searchText: "data table sort paginate transactions list grid rows columns",
      preview: <DataTableWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("DataTableWidget", `      title="Recent transactions"\n      subtitle="A sortable overview of the latest entries."`)
    },
    {
      id: "widget-status-page",
      title: "Status page",
      description: "Service health dashboard showing uptime, degraded services, and status indicators.",
      category: "settings",
      featured: true,
      searchText: "status page uptime health services operational degraded monitor incidents",
      preview: <StatusPageWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("StatusPageWidget", `      title="System status"\n      subtitle="All services are operating normally."`)
    },
    {
      id: "widget-navbar",
      title: "Navigation bar",
      description: "Responsive top navigation with links, search trigger, and avatar.",
      category: "workflow",
      featured: false,
      searchText: "navbar navigation header menu topbar links responsive avatar search",
      preview: <NavbarWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("NavbarWidget", `      title="Navigation bar"\n      subtitle="Responsive top navigation with actions."`)
    },
    {
      id: "widget-dropdown-menu",
      title: "Dropdown menu",
      description: "Contextual action menus with keyboard shortcuts and danger zone separators.",
      category: "workflow",
      featured: false,
      searchText: "dropdown menu context actions select shortcuts popover overlay",
      preview: <DropdownMenuWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("DropdownMenuWidget", `      title="Dropdown menu"\n      subtitle="Contextual action menus and selects."`)
    },
    {
      id: "widget-date-picker",
      title: "Date picker",
      description: "Calendar-based date selector with today highlight, selection state, and month navigation.",
      category: "forms",
      featured: true,
      searchText: "date picker calendar month day select schedule booking time",
      preview: <DatePickerWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("DatePickerWidget", `      title="Date picker"\n      subtitle="Calendar-based date selection."`)
    },
    {
      id: "widget-file-manager",
      title: "File manager",
      description: "Browse, upload, and manage project files with type indicators and metadata.",
      category: "forms",
      featured: false,
      searchText: "file manager browser upload download folder documents assets storage",
      preview: <FileManagerWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("FileManagerWidget", `      title="File manager"\n      subtitle="Browse and manage project files."`)
    },
    {
      id: "widget-metrics-dashboard",
      title: "Metrics dashboard",
      description: "KPI cards with real-time values, deltas, and trend indicators.",
      category: "workflow",
      featured: true,
      searchText: "metrics dashboard kpi analytics revenue users churn performance indicators",
      preview: <MetricsDashboardWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("MetricsDashboardWidget", `      title="Key metrics"\n      subtitle="Real-time performance indicators."`)
    },
    {
      id: "widget-user-profile",
      title: "User profile",
      description: "Account profile card with avatar, details, and quick actions.",
      category: "team",
      featured: false,
      searchText: "user profile account card avatar details settings preferences identity",
      preview: <UserProfileCardWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("UserProfileCardWidget", `      title="Profile"\n      subtitle="Manage your account details and preferences."`)
    },
    {
      id: "widget-pricing-tier",
      title: "Pricing tier",
      description: "Product pricing card with feature list, price display, and conversion actions.",
      category: "forms",
      featured: true,
      searchText: "pricing plan tier subscription billing features comparison upgrade",
      preview: <PricingTierWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("PricingTierWidget", `      title="Pro plan"\n      subtitle="Everything you need to scale your product."`)
    },
    {
      id: "widget-changelog-feed",
      title: "Changelog feed",
      description: "Version changelog with release types, dates, and descriptions.",
      category: "workflow",
      featured: false,
      searchText: "changelog feed releases updates versions history improvements features fixes",
      preview: <ChangelogFeedWidget surface={widgetSurface} className="widget-card-surface" />,
      code: widgetSnippet("ChangelogFeedWidget", `      title="Changelog"\n      subtitle="Recent updates and improvements."`)
    }
  ], [widgetSurface]);

  const queryFilteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return widgetEntries;
    return widgetEntries.filter((entry) =>
      `${entry.title} ${entry.description} ${entry.searchText}`.toLowerCase().includes(normalized)
    );
  }, [query, widgetEntries]);

  const visibleEntries = useMemo(() => (
    activeCategory === "all"
      ? queryFilteredEntries
      : queryFilteredEntries.filter((entry) => entry.category === activeCategory)
  ), [activeCategory, queryFilteredEntries]);

  const curatedVisibleEntries = useMemo(() => {
    const order = new Map<string, number>(widgetsV2CatalogIds.map((id, index) => [id, index]));
    return visibleEntries
      .filter((entry) => order.has(entry.id))
      .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
  }, [visibleEntries]);

  const featuredEntries = useMemo(
    () => visibleEntries.filter((entry) => entry.featured),
    [visibleEntries]
  );

  const spotlightEntries = useMemo(
    () => curatedVisibleEntries.slice(0, 3),
    [curatedVisibleEntries]
  );

  const libraryEntries = useMemo(
    () => visibleEntries,
    [visibleEntries]
  );

  const curatedLibraryEntries = useMemo(
    () => curatedVisibleEntries.slice(3, 6),
    [curatedVisibleEntries]
  );

  const tabItems = useMemo<TabItem[]>(() =>
    CATEGORY_OPTIONS.map(({ value, label }) => {
      const entries = value === "all"
        ? queryFilteredEntries
        : queryFilteredEntries.filter((e) => e.category === value);
      const featured = entries.filter((e) => e.featured);
      const catalog = entries.filter((e) => !e.featured);
      const content = entries.length === 0 ? (
        <div className="widget-empty-state">
          <strong>No widgets match this search.</strong>
          <p>Clear the search or switch categories to see the full gallery again.</p>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="widget-section-shell">
              <div className="widget-section-head"><h3>Featured</h3></div>
              <div className="widget-feature-grid">
                {featured.map((w) => (
                  <WidgetGalleryCard key={w.id} widget={w} featured onCopy={() => onCopy(`${w.title} widget`, w.code)} />
                ))}
              </div>
            </div>
          )}
          {catalog.length > 0 && (
            <div className="widget-section-shell">
              <div className="widget-section-head"><h3>All widgets</h3></div>
              <div className="widget-gallery-grid">
                {catalog.map((w) => (
                  <WidgetGalleryCard key={w.id} widget={w} onCopy={() => onCopy(`${w.title} widget`, w.code)} />
                ))}
              </div>
            </div>
          )}
        </>
      );
      return { id: value, label, content };
    }),
  [queryFilteredEntries, onCopy]);

  if (showcaseVersion === "v2") {
    return (
      <>
        <section id="widgets-overview" className="doc-section showcase-v2-hero">
          <div className="showcase-v2-hero-grid">
            <div className="showcase-v2-copy">
              <h1>Curated blocks for real products.</h1>
              <p className="lead">
                SaaS-native blocks for navigation, search, records, AI workspaces, settings, support, and developer workflows built from the same Zephr primitives you ship in production.
              </p>
            </div>
          </div>
        </section>

        <section className="doc-section showcase-v2-toolbar-shell">
          <div className="showcase-v2-toolbar">
            <Input
              controlSize="xs"
              aria-label="Search widgets"
              placeholder="Search widgets, onboarding, metrics, support..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="showcase-v2-search"
            />
            <div className="showcase-v2-filter-row" role="tablist" aria-label="Widget categories">
              {CATEGORY_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === value}
                  className={`showcase-v2-filter${activeCategory === value ? " is-active" : ""}`}
                  onClick={() => setActiveCategory(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {curatedVisibleEntries.length === 0 ? (
          <section className="doc-section">
            <div className="widget-empty-state">
              <strong>No widgets match this search.</strong>
              <p>Clear the search or switch categories to see the curated library again.</p>
            </div>
          </section>
        ) : (
          <>
            {spotlightEntries.length > 0 ? (
              <section className="doc-section showcase-v2-section">
                <div className="showcase-v2-section-head">
                  <h2>Spotlight</h2>
                </div>
                <div className="showcase-v2-spotlight-grid">
                  {spotlightEntries.map((widget) => (
                    <WidgetSpotlightCard key={widget.id} widget={widget} />
                  ))}
                </div>
              </section>
            ) : null}

            {curatedLibraryEntries.length > 0 ? (
              <section className="doc-section showcase-v2-section">
                <div className="showcase-v2-section-head">
                  <h2>Library selection</h2>
                </div>
                <div className="widget-gallery-grid">
                  {curatedLibraryEntries.map((widget) => (
                    <WidgetGalleryCard
                      key={widget.id}
                      widget={widget}
                      featured={widget.featured}
                      showcaseVersion="v2"
                      onCopy={() => onCopy(`${widget.title} widget`, widget.code)}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}
      </>
    );
  }

  return (
    <>
      <section id="widgets-overview" className="doc-section hero">
        <h1>Widgets</h1>
        <p className="lead">
          Real-world product widgets composed from Zephr foundations and components. Use them as starting points for approvals, forms, team management, uploads, settings, billing, and internal tools.
        </p>
      </section>

      <section className="doc-section">
        <div className="section-heading">
          <h2>Ready-made widget patterns</h2>
        </div>
        <Input
          controlSize="xs"
          aria-label="Search widgets"
          placeholder="Search widgets, forms, modals, team..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="widget-search-input"
        />
        <Tabs
          className="widget-tabs"
          items={tabItems}
          initialTabId="all"
        />
      </section>
    </>
  );
}
