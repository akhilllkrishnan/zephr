import { CSSProperties, ReactNode, useMemo, useState } from "react";
import {
  ActivityTimelineWidget,
  AccessRequestsWidget,
  AnalyticsOverviewWidget,
  AssetReviewWidget,
  ApiKeysWidget,
  AutomationRunsWidget,
  ApprovalModalWidget,
  AuthPage,
  AuditTrailWidget,
  Badge,
  BillingUsageWidget,
  BillingRecoveryWidget,
  Button,
  ChatPanelWidget,
  CustomerHealthWidget,
  CommentThreadWidget,
  ContentCalendarWidget,
  DashboardPage,
  DealsPipelineWidget,
  ExperimentResultsWidget,
  FeedbackInboxWidget,
  GoalTrackerWidget,
  Input,
  IncidentDigestWidget,
  IntegrationStatusWidget,
  IncidentResponseWidget,
  InviteMembersWidget,
  LaunchProgressWidget,
  LicenseActivationsWidget,
  MarketingPage,
  NotificationFeedWidget,
  OnboardingPage,
  PaymentMethodsWidget,
  QuickActionsWidget,
  ReleaseChecklistWidget,
  RevenueSnapshotWidget,
  ReleaseNotesWidget,
  ReviewInboxWidget,
  SecurityAccessWidget,
  SettingsPage,
  SettingsPanelWidget,
  SupportQueueWidget,
  TeamPulseWidget,
  TeamDirectoryWidget,
  UploadQueueWidget,
  type WidgetSurface,
} from "@zephrui/ui-react";
import { templateCatalogMeta } from "./templatesCatalog";

type UserTier = "free" | "pro";
type TemplateCategory = "all" | "template" | "example";

interface TemplatesPageProps {
  userTier: UserTier;
  widgetSurface: WidgetSurface;
  onOpenUpgrade: () => void;
  onCopy: (label: string, value: string) => void;
}

interface TemplateEntry {
  id: string;
  title: string;
  description: string;
  category: "template" | "example";
  featured: boolean;
  badge: ReactNode;
  previewCardLabel: string;
}

const CATEGORY_OPTIONS: Array<{ value: TemplateCategory; label: string }> = [
  { value: "all", label: "All pages" },
  { value: "template", label: "Templates" },
  { value: "example", label: "Examples" },
];

function snippet(label: string, code: string, onCopy: () => void) {
  return (
    <div className="snippet-item">
      <div className="snippet-item-head">
        <span className="snippet-item-label">{label}</span>
        <div className="snippet-item-actions">
          <button type="button" className="snippet-item-copy" onClick={onCopy}>Copy</button>
        </div>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

function BrowserPreviewFrame({
  children,
  address = "preview.zephr.local",
  minHeight,
}: {
  children: ReactNode;
  address?: string;
  minHeight?: string;
}) {
  return (
    <div className="preview-browser">
      <div className="preview-browser-top">
        <div className="preview-traffic" aria-hidden>
          <span className="traffic-dot traffic-red" />
          <span className="traffic-dot traffic-yellow" />
          <span className="traffic-dot traffic-green" />
        </div>
        <button type="button" className="preview-chrome-btn" aria-label="Toggle sidebar" tabIndex={-1}>
          <span className="ms">dock_to_left</span>
        </button>
        <div className="preview-browser-nav" aria-hidden>
          <span className="preview-chrome-btn"><span className="ms">chevron_left</span></span>
          <span className="preview-chrome-btn"><span className="ms">chevron_right</span></span>
          <span className="preview-chrome-btn"><span className="ms">refresh</span></span>
        </div>
        <div className="preview-address">
          <span className="preview-address-lock ms">lock</span>
          <span>{address}</span>
          <span className="preview-address-link ms">open_in_new</span>
        </div>
        <div className="preview-browser-actions" aria-hidden>
          <span className="preview-chrome-btn"><span className="ms">extension</span></span>
          <span className="preview-chrome-btn"><span className="ms">add</span></span>
        </div>
      </div>
      <div className="preview-surface-shell">
        <div className="preview-canvas preview-canvas--flush" style={minHeight ? { minHeight } : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}

function TemplateBrowserFrame({
  children,
  address,
  minHeight,
}: {
  children: ReactNode;
  address?: string;
  minHeight?: string;
}) {
  return <BrowserPreviewFrame address={address} minHeight={minHeight}>{children}</BrowserPreviewFrame>;
}

function examplePageShellStyle(): CSSProperties {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1.25rem",
    minHeight: "100%",
    background: "var(--z-color-surface, #ffffff)"
  };
}

function examplePageHeaderStyle(): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    flexWrap: "wrap"
  };
}

function examplePageMetaStyle(): CSSProperties {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem"
  };
}

function ExampleOpsControlCenter({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Operations</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Ops control center</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Track approvals, launch status, and recent changes from one workspace.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="orange" variant="lighter">Shipping</Badge>
          <Button size="sm">Publish changes</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <LaunchProgressWidget surface={widgetSurface} />
        <NotificationFeedWidget surface={widgetSurface} />
        <ActivityTimelineWidget surface={widgetSurface} />
        <ApprovalModalWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleTeamWorkspace({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Team workspace</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Collaborator workspace</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Invite teammates, review ownership, and handle live support context in one place.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Input controlSize="sm" placeholder="Search people or channels" style={{ minWidth: "240px" }} />
          <Button size="sm" variant="secondary">Export roster</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--asymmetric">
        <TeamDirectoryWidget surface={widgetSurface} />
        <InviteMembersWidget surface={widgetSurface} />
        <div className="example-page-span-two">
          <ChatPanelWidget surface={widgetSurface} />
        </div>
      </div>
    </div>
  );
}

function ExampleAdminSettingsHub({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Admin settings</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Workspace control hub</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Manage settings, payment methods, and security controls without leaving the same screen.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge tone="neutral">Enterprise</Badge>
          <Button size="sm">Save all changes</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <SettingsPanelWidget surface={widgetSurface} />
        <SecurityAccessWidget surface={widgetSurface} />
        <PaymentMethodsWidget surface={widgetSurface} />
        <UploadQueueWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleGrowthWorkspace({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Growth</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Growth workspace</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Monitor revenue, goals, pricing plans, and customer-facing commercial health from a single page.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="green" variant="lighter">Healthy</Badge>
          <Button size="sm">Share report</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <RevenueSnapshotWidget surface={widgetSurface} />
        <BillingUsageWidget surface={widgetSurface} />
        <GoalTrackerWidget surface={widgetSurface} />
        <div className="example-page-span-two">
          <NotificationFeedWidget surface={widgetSurface} />
        </div>
      </div>
    </div>
  );
}

function ExampleSupportDesk({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Support operations</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Support desk</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Handle triage, threaded feedback, live chat, and integration health from one support workspace.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="orange" variant="lighter">Queue active</Badge>
          <Button size="sm" variant="secondary">Export cases</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <SupportQueueWidget surface={widgetSurface} />
        <IntegrationStatusWidget surface={widgetSurface} />
        <ChatPanelWidget surface={widgetSurface} />
        <ApiKeysWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleDeveloperConsole({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Platform</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Developer console</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Manage API access, integration health, licensing state, and privileged requests from one internal console.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="blue" variant="lighter">Platform</Badge>
          <Button size="sm">Generate report</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <ApiKeysWidget surface={widgetSurface} />
        <IntegrationStatusWidget surface={widgetSurface} />
        <LicenseActivationsWidget surface={widgetSurface} />
        <AccessRequestsWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleReleaseCenter({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Launch</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Release center</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Coordinate progress, results, final notes, and announcement channels before a public release.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="green" variant="lighter">Ready to ship</Badge>
          <Button size="sm" variant="secondary">Preview announcement</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <LaunchProgressWidget surface={widgetSurface} />
        <ExperimentResultsWidget surface={widgetSurface} />
        <ReleaseNotesWidget surface={widgetSurface} />
        <div className="example-page-span-two">
          <NotificationFeedWidget surface={widgetSurface} />
        </div>
      </div>
    </div>
  );
}

function ExampleAnalyticsWorkspace({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Analytics</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Analytics workspace</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Combine top-line KPIs, revenue health, experiments, and goal tracking in one decision surface.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="blue" variant="lighter">Weekly review</Badge>
          <Button size="sm">Share metrics</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <AnalyticsOverviewWidget surface={widgetSurface} />
        <RevenueSnapshotWidget surface={widgetSurface} />
        <ExperimentResultsWidget surface={widgetSurface} />
        <GoalTrackerWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleBillingConsole({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Billing operations</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Billing console</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Monitor recovery, payment methods, seat activations, and commercial status from one internal console.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="yellow" variant="lighter">Needs follow-up</Badge>
          <Button size="sm" variant="secondary">Export deltas</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <BillingRecoveryWidget surface={widgetSurface} />
        <PaymentMethodsWidget surface={widgetSurface} />
        <LicenseActivationsWidget surface={widgetSurface} />
        <RevenueSnapshotWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleCRMWorkspace({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Commercial</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>CRM workspace</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Keep pipeline, account owners, team discussion, and automation state in one revenue workspace.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="teal" variant="lighter">Pipeline active</Badge>
          <Button size="sm">Open board</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <DealsPipelineWidget surface={widgetSurface} />
        <TeamDirectoryWidget surface={widgetSurface} />
        <CommentThreadWidget surface={widgetSurface} />
        <AutomationRunsWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleAuditCenter({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Audit & compliance</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Audit center</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Keep access requests, audit history, security controls, and automation health in one review surface.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge tone="neutral">Compliance review</Badge>
          <Button size="sm" variant="secondary">Export evidence</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <AuditTrailWidget surface={widgetSurface} />
        <SecurityAccessWidget surface={widgetSurface} />
        <AccessRequestsWidget surface={widgetSurface} />
        <AutomationRunsWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleContentStudio({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Content operations</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Content studio</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Run upload, asset review, release communication, and publishing schedule work from one shared studio.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="blue" variant="lighter">Publishing</Badge>
          <Button size="sm">Queue launch</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <UploadQueueWidget surface={widgetSurface} />
        <AssetReviewWidget surface={widgetSurface} />
        <ReleaseNotesWidget surface={widgetSurface} />
        <ContentCalendarWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleSupportPortal({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Support</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Support portal</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Unify queue triage, live incidents, customer health, and threaded product feedback in one service workspace.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="orange" variant="lighter">Service active</Badge>
          <Button size="sm">Open queue</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <SupportQueueWidget surface={widgetSurface} />
        <IncidentDigestWidget surface={widgetSurface} />
        <CustomerHealthWidget surface={widgetSurface} />
        <FeedbackInboxWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleFinanceWorkspace({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Finance</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Finance workspace</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Run spend review, billing recovery, payment control, and release gating from one internal operations surface.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge tone="neutral">Month close</Badge>
          <Button size="sm" variant="secondary">Export book</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <BillingUsageWidget surface={widgetSurface} />
        <BillingRecoveryWidget surface={widgetSurface} />
        <PaymentMethodsWidget surface={widgetSurface} />
        <ReleaseChecklistWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleProductReviewBoard({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Product review</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Product review board</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Coordinate review queue, comments, team availability, and quick operator actions from one product board.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="purple" variant="lighter">Review week</Badge>
          <Button size="sm">Open board</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <ReviewInboxWidget surface={widgetSurface} />
        <CommentThreadWidget surface={widgetSurface} />
        <TeamPulseWidget surface={widgetSurface} />
        <QuickActionsWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

export default function TemplatesPage({
  userTier,
  widgetSurface,
  onOpenUpgrade,
  onCopy,
}: TemplatesPageProps) {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("all");
  const [query, setQuery] = useState("");

  const templateEntries = useMemo<TemplateEntry[]>(() => [
    {
      id: "template-dashboard",
      title: "Dashboard",
      description: "Revenue charts, project table, activity feed, and sidebar nav.",
      category: "template",
      featured: true,
      badge: <Badge tone="neutral">Template</Badge>,
      previewCardLabel: "Analytics + tables",
    },
    {
      id: "template-auth",
      title: "Auth",
      description: "Sign-in / sign-up flows with OAuth provider slots and friendly error states.",
      category: "template",
      featured: true,
      badge: <Badge tone="neutral">Template</Badge>,
      previewCardLabel: "Sign in / Sign up",
    },
    {
      id: "template-settings",
      title: "Settings",
      description: "Tabbed settings layout for profile, notifications, billing, and danger-zone flows.",
      category: "template",
      featured: false,
      badge: <Badge tone="neutral">Template</Badge>,
      previewCardLabel: "Account settings",
    },
    {
      id: "template-onboarding",
      title: "Onboarding",
      description: "Step-based setup wizard with progress, context, and clear completion state.",
      category: "template",
      featured: false,
      badge: <Badge tone="neutral">Template</Badge>,
      previewCardLabel: "Wizard flow",
    },
    {
      id: "template-marketing",
      title: "Marketing",
      description: "Landing page sections with hero, pricing, proof, and CTA structure.",
      category: "template",
      featured: true,
      badge: <Badge tone="neutral">Template</Badge>,
      previewCardLabel: "Landing page",
    },
    {
      id: "template-ops-center",
      title: "Ops Center",
      description: "An assembled operations page built from approvals, progress, and updates widgets.",
      category: "example",
      featured: false,
      badge: <Badge color="orange" variant="lighter">Example</Badge>,
      previewCardLabel: "Workflow example",
    },
    {
      id: "template-team-workspace",
      title: "Team Workspace",
      description: "A people-focused page with invites, team directory, and support chat context.",
      category: "example",
      featured: false,
      badge: <Badge color="sky" variant="lighter">Example</Badge>,
      previewCardLabel: "Team example",
    },
    {
      id: "template-admin-hub",
      title: "Admin Hub",
      description: "An internal control page for security, billing, uploads, and settings.",
      category: "example",
      featured: false,
      badge: <Badge color="purple" variant="lighter">Example</Badge>,
      previewCardLabel: "Admin example",
    },
    {
      id: "template-growth-workspace",
      title: "Growth Workspace",
      description: "A commercial page example for revenue, goals, product usage, and pricing decisions.",
      category: "example",
      featured: true,
      badge: <Badge color="green" variant="lighter">Example</Badge>,
      previewCardLabel: "Growth example",
    },
    {
      id: "template-support-desk",
      title: "Support Desk",
      description: "A support operations page with triage, integrations, conversations, and access tooling.",
      category: "example",
      featured: false,
      badge: <Badge color="orange" variant="lighter">Example</Badge>,
      previewCardLabel: "Support example",
    },
    {
      id: "template-developer-console",
      title: "Developer Console",
      description: "An internal platform page for API access, integrations, licensing state, and request review.",
      category: "example",
      featured: true,
      badge: <Badge color="blue" variant="lighter">Example</Badge>,
      previewCardLabel: "Platform example",
    },
    {
      id: "template-release-center",
      title: "Release Center",
      description: "A launch workspace for progress, experiment outcomes, notes, and final ship approval.",
      category: "example",
      featured: false,
      badge: <Badge color="green" variant="lighter">Example</Badge>,
      previewCardLabel: "Launch example",
    },
    {
      id: "template-analytics-workspace",
      title: "Analytics Workspace",
      description: "A decision workspace for weekly KPI reviews, experiments, revenue health, and target tracking.",
      category: "example",
      featured: true,
      badge: <Badge color="blue" variant="lighter">Example</Badge>,
      previewCardLabel: "Analytics example",
    },
    {
      id: "template-billing-console",
      title: "Billing Console",
      description: "An internal revenue-ops page for recovery, payment methods, activations, and billing health.",
      category: "example",
      featured: false,
      badge: <Badge color="orange" variant="lighter">Example</Badge>,
      previewCardLabel: "Billing example",
    },
    {
      id: "template-crm-workspace",
      title: "CRM Workspace",
      description: "A commercial workspace for opportunities, owners, team discussion, and automation health.",
      category: "example",
      featured: false,
      badge: <Badge color="teal" variant="lighter">Example</Badge>,
      previewCardLabel: "CRM example",
    },
    {
      id: "template-audit-center",
      title: "Audit Center",
      description: "A compliance page for access review, audit history, security controls, and automation state.",
      category: "example",
      featured: false,
      badge: <Badge tone="neutral">Example</Badge>,
      previewCardLabel: "Audit example",
    },
    {
      id: "template-content-studio",
      title: "Content Studio",
      description: "A publishing workspace for asset review, upload queues, release notes, and content scheduling.",
      category: "example",
      featured: true,
      badge: <Badge color="blue" variant="lighter">Example</Badge>,
      previewCardLabel: "Content example",
    },
    {
      id: "template-support-portal",
      title: "Support Portal",
      description: "A service workspace for queue triage, incidents, customer health, and incoming feedback.",
      category: "example",
      featured: true,
      badge: <Badge color="orange" variant="lighter">Example</Badge>,
      previewCardLabel: "Support example",
    },
    {
      id: "template-finance-workspace",
      title: "Finance Workspace",
      description: "An internal finance page for spend review, dunning, payment controls, and release gating.",
      category: "example",
      featured: false,
      badge: <Badge tone="neutral">Example</Badge>,
      previewCardLabel: "Finance example",
    },
    {
      id: "template-product-review-board",
      title: "Product Review Board",
      description: "A product team workspace for review queue, comments, staffing, and fast internal actions.",
      category: "example",
      featured: true,
      badge: <Badge color="purple" variant="lighter">Example</Badge>,
      previewCardLabel: "Product example",
    },
  ], []);

  const visibleTemplateEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return templateEntries.filter((entry) => {
      const categoryMatch = activeCategory === "all" || entry.category === activeCategory;
      if (!categoryMatch) return false;
      if (!normalized) return true;
      return `${entry.title} ${entry.description} ${entry.previewCardLabel}`.toLowerCase().includes(normalized);
    });
  }, [activeCategory, query, templateEntries]);

  const visibleTemplateIds = useMemo(
    () => new Set(visibleTemplateEntries.map((entry) => entry.id)),
    [visibleTemplateEntries]
  );

  const featuredTemplateEntries = useMemo(
    () => visibleTemplateEntries.filter((entry) => entry.featured),
    [visibleTemplateEntries]
  );

  const catalogTemplateEntries = useMemo(
    () => visibleTemplateEntries.filter((entry) => !entry.featured),
    [visibleTemplateEntries]
  );

  return (
    <>
      <section id="templates-overview" className="doc-section hero">
        <p className="breadcrumbs">Pages / Templates</p>
        <h1>Page templates</h1>
        <p className="lead">
          Drop-in page templates and assembled page examples built from Zephr components. Use the search and category filter to narrow the catalog before copying the full page composition.
        </p>
        <div className="widget-hero-metrics" aria-label="Template page highlights">
          <div className="widget-hero-metric">
            <strong>{templateEntries.filter((entry) => entry.category === "template").length}</strong>
            <span>Reusable page templates</span>
          </div>
          <div className="widget-hero-metric">
            <strong>{templateEntries.filter((entry) => entry.category === "example").length}</strong>
            <span>Composed page examples</span>
          </div>
          <div className="widget-hero-metric">
            <strong>Search + filter</strong>
            <span>Find the right page shape before dropping into the detailed examples below</span>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <div className="section-heading">
          <h2>Browse templates</h2>
          <p>Search the catalog first, then jump into the matching full-size preview and implementation snippet below.</p>
        </div>
        <div className="widget-toolbar-shell">
          <div className="widget-toolbar-meta">
            <span className="widget-toolbar-count">{visibleTemplateEntries.length} pages</span>
            <p>Filter by first-party templates or assembled examples, then jump directly to the page section you want.</p>
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
                aria-label="Search templates"
                placeholder="Search templates, admin, auth, dashboard..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="widget-filter-row" role="tablist" aria-label="Template categories">
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
        {visibleTemplateEntries.length > 0 ? (
          <div className="widget-section-shell">
            {featuredTemplateEntries.length > 0 ? (
              <div className="widget-section-shell">
                <div className="widget-section-head">
                  <div>
                    <p className="widget-section-kicker">Featured</p>
                    <h3>Best starting points</h3>
                  </div>
                  <p>Curated templates and examples that show the strongest end-to-end surfaces in the current catalog.</p>
                </div>
                <div className="template-feature-grid">
                  {featuredTemplateEntries.map((entry) => (
                    <a key={entry.id} className="template-teaser-card is-featured" href={`#${entry.id}`}>
                      <div className="template-teaser-preview">
                        <div className="template-preview-stack" aria-hidden="true">
                          <span className="template-preview-line template-preview-line--full" />
                          <div className="template-preview-grid">
                            <span className="template-preview-line" />
                            <span className="template-preview-line" />
                          </div>
                          <div className="template-preview-caption">{entry.previewCardLabel}</div>
                        </div>
                      </div>
                      <div className="template-teaser-info">
                        <div className="template-teaser-head">
                          <span className="template-teaser-name">{entry.title}</span>
                          {entry.badge}
                        </div>
                        <span className="template-teaser-desc">{entry.description}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
            {catalogTemplateEntries.length > 0 ? (
              <div className="widget-section-shell">
                <div className="widget-section-head">
                  <div>
                    <p className="widget-section-kicker">Catalog</p>
                    <h3>Browse the full page library</h3>
                  </div>
                  <p>Search and filter first, then jump directly into the matching full-size preview and implementation snippet below.</p>
                </div>
                <div className="template-teaser-grid">
                  {catalogTemplateEntries.map((entry) => (
                    <a key={entry.id} className="template-teaser-card" href={`#${entry.id}`}>
                      <div className="template-teaser-preview">
                        <div className="template-preview-stack" aria-hidden="true">
                          <span className="template-preview-line template-preview-line--full" />
                          <div className="template-preview-grid">
                            <span className="template-preview-line" />
                            <span className="template-preview-line" />
                          </div>
                          <div className="template-preview-caption">{entry.previewCardLabel}</div>
                        </div>
                      </div>
                      <div className="template-teaser-info">
                        <div className="template-teaser-head">
                          <span className="template-teaser-name">{entry.title}</span>
                          {entry.badge}
                        </div>
                        <span className="template-teaser-desc">{entry.description}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="widget-empty-state">
            <strong>No templates match this search.</strong>
            <p>Clear the search or switch categories to see the full catalog again.</p>
          </div>
        )}
      </section>

      {userTier !== "pro" ? (
        <section className="doc-section">
          <div className="section-heading">
            <h2>Unlock the full page library</h2>
            <p>Pro keeps the assembled page kits together in one install path with support for larger product surfaces and internal tools.</p>
          </div>
          <div className="template-teaser-grid">
            {templateCatalogMeta.map((entry) => (
              <div key={entry.id} className="template-teaser-card">
                <div className="template-teaser-preview">
                  <span className="ms template-teaser-lock">lock</span>
                </div>
                <div className="template-teaser-info">
                  <div className="template-teaser-head">
                    <span className="template-teaser-name">{entry.label}</span>
                    <Badge size="sm" tone="neutral">Pro</Badge>
                  </div>
                  <span className="template-teaser-desc">
                    {entry.category === "template" ? "Reusable page scaffold" : "Composed page example"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Button onClick={onOpenUpgrade}>Unlock Pro — access all templates</Button>
          </div>
        </section>
      ) : null}

      {visibleTemplateIds.has("template-dashboard") ? <section id="template-dashboard" className="doc-section">
        <div className="section-heading">
          <h2>Dashboard</h2>
          <p>Revenue charts, project table, activity feed, and sidebar nav — ready to wire up to real data.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/dashboard" minHeight="620px">
          <div style={{ transform: "scale(0.65)", transformOrigin: "top left", width: "153.85%", height: "960px", overflow: "hidden", pointerEvents: "none" }}>
            <DashboardPage />
          </div>
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import { DashboardPage } from "@zephrui/ui-react";

<DashboardPage
  title="Analytics"
  onNewItem={() => {}}
/>`, () => onCopy("DashboardPage", `import { DashboardPage } from "@zephrui/ui-react";

<DashboardPage title="Analytics" onNewItem={() => {}} />`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-auth") ? <section id="template-auth" className="doc-section">
        <div className="section-heading">
          <h2>Auth</h2>
          <p>Centered sign-in / sign-up form with OAuth provider slots, error handling, and mode switching.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/auth" minHeight="560px">
          <div style={{ transform: "scale(0.74)", transformOrigin: "top left", width: "135.14%", height: "760px", overflow: "hidden", pointerEvents: "none" }}>
            <AuthPage />
          </div>
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import { AuthPage } from "@zephrui/ui-react";

<AuthPage
  mode="sign-in"
  onSubmit={async (email, password) => {
    await signIn(email, password);
  }}
  onModeSwitch={() => setMode("sign-up")}
/>`, () => onCopy("AuthPage", `import { AuthPage } from "@zephrui/ui-react";

<AuthPage mode="sign-in" onSubmit={signIn} />`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-settings") ? <section id="template-settings" className="doc-section">
        <div className="section-heading">
          <h2>Settings</h2>
          <p>Tabbed settings layout with profile, notifications, and danger-zone actions built in.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/settings" minHeight="560px">
          <div style={{ transform: "scale(0.62)", transformOrigin: "top left", width: "161.3%", height: "900px", overflow: "hidden", pointerEvents: "none" }}>
            <SettingsPage />
          </div>
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import { SettingsPage } from "@zephrui/ui-react";

<SettingsPage
  title="Account Settings"
  subtitle="Manage your preferences"
/>`, () => onCopy("SettingsPage", `import { SettingsPage } from "@zephrui/ui-react";

<SettingsPage title="Account Settings" />`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-onboarding") ? <section id="template-onboarding" className="doc-section">
        <div className="section-heading">
          <h2>Onboarding</h2>
          <p>Step-by-step wizard with progress, navigation, and customisable completion logic.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/onboarding" minHeight="560px">
          <div style={{ transform: "scale(0.74)", transformOrigin: "top left", width: "135.14%", height: "760px", overflow: "hidden", pointerEvents: "none" }}>
            <OnboardingPage />
          </div>
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import { OnboardingPage } from "@zephrui/ui-react";

<OnboardingPage
  steps={mySteps}
  onComplete={() => router.push("/dashboard")}
/>`, () => onCopy("OnboardingPage", `import { OnboardingPage } from "@zephrui/ui-react";

<OnboardingPage steps={mySteps} onComplete={onDone} />`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-marketing") ? <section id="template-marketing" className="doc-section">
        <div className="section-heading">
          <h2>Marketing</h2>
          <p>Landing page with hero, feature grid, social proof, pricing cards, and CTA structure.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/marketing" minHeight="680px">
          <div style={{ transform: "scale(0.65)", transformOrigin: "top left", width: "153.85%", height: "1046px", overflow: "hidden", pointerEvents: "none" }}>
            <MarketingPage />
          </div>
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import { MarketingPage } from "@zephrui/ui-react";

<MarketingPage
  heroTitle="Ship faster with Zephr"
  heroSubtitle="The AI-native component system"
  onCtaClick={() => router.push("/signup")}
/>`, () => onCopy("MarketingPage", `import { MarketingPage } from "@zephrui/ui-react";

<MarketingPage heroTitle="Ship faster" onCtaClick={onSignup} />`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-ops-center") ? <section id="template-ops-center" className="doc-section">
        <div className="section-heading">
          <h2>Ops Center</h2>
          <p>A composed operations page built from approval, notification, activity, and launch workflow widgets.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/ops-center" minHeight="760px">
          <ExampleOpsControlCenter widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  ActivityTimelineWidget,
  ApprovalModalWidget,
  LaunchProgressWidget,
  NotificationFeedWidget
} from "@zephrui/ui-react";

export function OpsControlCenter() {
  return (
    <div className="ops-page-grid">
      <LaunchProgressWidget />
      <NotificationFeedWidget />
      <ActivityTimelineWidget />
      <ApprovalModalWidget />
    </div>
  );
}`, () => onCopy("Ops Center", `import {
  ActivityTimelineWidget,
  ApprovalModalWidget,
  LaunchProgressWidget,
  NotificationFeedWidget
} from "@zephrui/ui-react";

export function OpsControlCenter() {
  return (
    <div className="ops-page-grid">
      <LaunchProgressWidget />
      <NotificationFeedWidget />
      <ActivityTimelineWidget />
      <ApprovalModalWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-team-workspace") ? <section id="template-team-workspace" className="doc-section">
        <div className="section-heading">
          <h2>Team Workspace</h2>
          <p>A collaboration-focused page example with team directory, invites, and an embedded support chat lane.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/team-workspace" minHeight="760px">
          <ExampleTeamWorkspace widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  ChatPanelWidget,
  InviteMembersWidget,
  TeamDirectoryWidget
} from "@zephrui/ui-react";

export function TeamWorkspace() {
  return (
    <div className="team-page-grid">
      <TeamDirectoryWidget />
      <InviteMembersWidget />
      <ChatPanelWidget />
    </div>
  );
}`, () => onCopy("Team Workspace", `import {
  ChatPanelWidget,
  InviteMembersWidget,
  TeamDirectoryWidget
} from "@zephrui/ui-react";

export function TeamWorkspace() {
  return (
    <div className="team-page-grid">
      <TeamDirectoryWidget />
      <InviteMembersWidget />
      <ChatPanelWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-admin-hub") ? <section id="template-admin-hub" className="doc-section">
        <div className="section-heading">
          <h2>Admin Hub</h2>
          <p>An internal admin page example for settings, security, payments, and upload operations.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/admin-hub" minHeight="780px">
          <ExampleAdminSettingsHub widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  PaymentMethodsWidget,
  SecurityAccessWidget,
  SettingsPanelWidget,
  UploadQueueWidget
} from "@zephrui/ui-react";

export function AdminSettingsHub() {
  return (
    <div className="admin-page-grid">
      <SettingsPanelWidget />
      <SecurityAccessWidget />
      <PaymentMethodsWidget />
      <UploadQueueWidget />
    </div>
  );
}`, () => onCopy("Admin Hub", `import {
  PaymentMethodsWidget,
  SecurityAccessWidget,
  SettingsPanelWidget,
  UploadQueueWidget
} from "@zephrui/ui-react";

export function AdminSettingsHub() {
  return (
    <div className="admin-page-grid">
      <SettingsPanelWidget />
      <SecurityAccessWidget />
      <PaymentMethodsWidget />
      <UploadQueueWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-growth-workspace") ? <section id="template-growth-workspace" className="doc-section">
        <div className="section-heading">
          <h2>Growth Workspace</h2>
          <p>A commercial workspace for revenue health, pricing decisions, usage tracking, and team goals.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/growth-workspace" minHeight="760px">
          <ExampleGrowthWorkspace widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  BillingUsageWidget,
  GoalTrackerWidget,
  NotificationFeedWidget,
  RevenueSnapshotWidget
} from "@zephrui/ui-react";

export function GrowthWorkspace() {
  return (
    <div className="growth-page-grid">
      <RevenueSnapshotWidget />
      <BillingUsageWidget />
      <GoalTrackerWidget />
      <NotificationFeedWidget />
    </div>
  );
}`, () => onCopy("Growth Workspace", `import {
  BillingUsageWidget,
  GoalTrackerWidget,
  NotificationFeedWidget,
  RevenueSnapshotWidget
} from "@zephrui/ui-react";

export function GrowthWorkspace() {
  return (
    <div className="growth-page-grid">
      <RevenueSnapshotWidget />
      <BillingUsageWidget />
      <GoalTrackerWidget />
      <NotificationFeedWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-support-desk") ? <section id="template-support-desk" className="doc-section">
        <div className="section-heading">
          <h2>Support Desk</h2>
          <p>A support operations page for triage, integration health, API access, and live customer coordination.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/support-desk" minHeight="760px">
          <ExampleSupportDesk widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  ApiKeysWidget,
  ChatPanelWidget,
  IntegrationStatusWidget,
  SupportQueueWidget
} from "@zephrui/ui-react";

export function SupportDesk() {
  return (
    <div className="support-page-grid">
      <SupportQueueWidget />
      <IntegrationStatusWidget />
      <ChatPanelWidget />
      <ApiKeysWidget />
    </div>
  );
}`, () => onCopy("Support Desk", `import {
  ApiKeysWidget,
  ChatPanelWidget,
  IntegrationStatusWidget,
  SupportQueueWidget
} from "@zephrui/ui-react";

export function SupportDesk() {
  return (
    <div className="support-page-grid">
      <SupportQueueWidget />
      <IntegrationStatusWidget />
      <ChatPanelWidget />
      <ApiKeysWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-developer-console") ? <section id="template-developer-console" className="doc-section">
        <div className="section-heading">
          <h2>Developer Console</h2>
          <p>An internal platform page for API access, integration health, license state, and privileged request review.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/developer-console" minHeight="760px">
          <ExampleDeveloperConsole widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  AccessRequestsWidget,
  ApiKeysWidget,
  IntegrationStatusWidget,
  LicenseActivationsWidget
} from "@zephrui/ui-react";

export function DeveloperConsole() {
  return (
    <div className="developer-console-grid">
      <ApiKeysWidget />
      <IntegrationStatusWidget />
      <LicenseActivationsWidget />
      <AccessRequestsWidget />
    </div>
  );
}`, () => onCopy("Developer Console", `import {
  AccessRequestsWidget,
  ApiKeysWidget,
  IntegrationStatusWidget,
  LicenseActivationsWidget
} from "@zephrui/ui-react";

export function DeveloperConsole() {
  return (
    <div className="developer-console-grid">
      <ApiKeysWidget />
      <IntegrationStatusWidget />
      <LicenseActivationsWidget />
      <AccessRequestsWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-release-center") ? <section id="template-release-center" className="doc-section">
        <div className="section-heading">
          <h2>Release Center</h2>
          <p>A launch workspace for progress, experiment outcomes, announcement prep, and final ship readiness.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/release-center" minHeight="760px">
          <ExampleReleaseCenter widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  ExperimentResultsWidget,
  LaunchProgressWidget,
  NotificationFeedWidget,
  ReleaseNotesWidget
} from "@zephrui/ui-react";

export function ReleaseCenter() {
  return (
    <div className="release-center-grid">
      <LaunchProgressWidget />
      <ExperimentResultsWidget />
      <ReleaseNotesWidget />
      <NotificationFeedWidget />
    </div>
  );
}`, () => onCopy("Release Center", `import {
  ExperimentResultsWidget,
  LaunchProgressWidget,
  NotificationFeedWidget,
  ReleaseNotesWidget
} from "@zephrui/ui-react";

export function ReleaseCenter() {
  return (
    <div className="release-center-grid">
      <LaunchProgressWidget />
      <ExperimentResultsWidget />
      <ReleaseNotesWidget />
      <NotificationFeedWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-analytics-workspace") ? <section id="template-analytics-workspace" className="doc-section">
        <div className="section-heading">
          <h2>Analytics Workspace</h2>
          <p>A weekly review page for top-line KPIs, experiments, revenue health, and target tracking.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/analytics-workspace" minHeight="760px">
          <ExampleAnalyticsWorkspace widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  AnalyticsOverviewWidget,
  ExperimentResultsWidget,
  GoalTrackerWidget,
  RevenueSnapshotWidget
} from "@zephrui/ui-react";

export function AnalyticsWorkspace() {
  return (
    <div className="analytics-workspace-grid">
      <AnalyticsOverviewWidget />
      <RevenueSnapshotWidget />
      <ExperimentResultsWidget />
      <GoalTrackerWidget />
    </div>
  );
}`, () => onCopy("Analytics Workspace", `import {
  AnalyticsOverviewWidget,
  ExperimentResultsWidget,
  GoalTrackerWidget,
  RevenueSnapshotWidget
} from "@zephrui/ui-react";

export function AnalyticsWorkspace() {
  return (
    <div className="analytics-workspace-grid">
      <AnalyticsOverviewWidget />
      <RevenueSnapshotWidget />
      <ExperimentResultsWidget />
      <GoalTrackerWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-billing-console") ? <section id="template-billing-console" className="doc-section">
        <div className="section-heading">
          <h2>Billing Console</h2>
          <p>An internal billing workspace for recovery, payment methods, seat activations, and commercial health.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/billing-console" minHeight="760px">
          <ExampleBillingConsole widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  BillingRecoveryWidget,
  LicenseActivationsWidget,
  PaymentMethodsWidget,
  RevenueSnapshotWidget
} from "@zephrui/ui-react";

export function BillingConsole() {
  return (
    <div className="billing-console-grid">
      <BillingRecoveryWidget />
      <PaymentMethodsWidget />
      <LicenseActivationsWidget />
      <RevenueSnapshotWidget />
    </div>
  );
}`, () => onCopy("Billing Console", `import {
  BillingRecoveryWidget,
  LicenseActivationsWidget,
  PaymentMethodsWidget,
  RevenueSnapshotWidget
} from "@zephrui/ui-react";

export function BillingConsole() {
  return (
    <div className="billing-console-grid">
      <BillingRecoveryWidget />
      <PaymentMethodsWidget />
      <LicenseActivationsWidget />
      <RevenueSnapshotWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-crm-workspace") ? <section id="template-crm-workspace" className="doc-section">
        <div className="section-heading">
          <h2>CRM Workspace</h2>
          <p>A commercial workspace for pipeline review, owner context, team discussion, and automation health.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/crm-workspace" minHeight="760px">
          <ExampleCRMWorkspace widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  AutomationRunsWidget,
  CommentThreadWidget,
  DealsPipelineWidget,
  TeamDirectoryWidget
} from "@zephrui/ui-react";

export function CRMWorkspace() {
  return (
    <div className="crm-workspace-grid">
      <DealsPipelineWidget />
      <TeamDirectoryWidget />
      <CommentThreadWidget />
      <AutomationRunsWidget />
    </div>
  );
}`, () => onCopy("CRM Workspace", `import {
  AutomationRunsWidget,
  CommentThreadWidget,
  DealsPipelineWidget,
  TeamDirectoryWidget
} from "@zephrui/ui-react";

export function CRMWorkspace() {
  return (
    <div className="crm-workspace-grid">
      <DealsPipelineWidget />
      <TeamDirectoryWidget />
      <CommentThreadWidget />
      <AutomationRunsWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-audit-center") ? <section id="template-audit-center" className="doc-section">
        <div className="section-heading">
          <h2>Audit Center</h2>
          <p>A compliance workspace for audit history, access review, security controls, and automation oversight.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/audit-center" minHeight="760px">
          <ExampleAuditCenter widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  AccessRequestsWidget,
  AuditTrailWidget,
  AutomationRunsWidget,
  SecurityAccessWidget
} from "@zephrui/ui-react";

export function AuditCenter() {
  return (
    <div className="audit-center-grid">
      <AuditTrailWidget />
      <SecurityAccessWidget />
      <AccessRequestsWidget />
      <AutomationRunsWidget />
    </div>
  );
}`, () => onCopy("Audit Center", `import {
  AccessRequestsWidget,
  AuditTrailWidget,
  AutomationRunsWidget,
  SecurityAccessWidget
} from "@zephrui/ui-react";

export function AuditCenter() {
  return (
    <div className="audit-center-grid">
      <AuditTrailWidget />
      <SecurityAccessWidget />
      <AccessRequestsWidget />
      <AutomationRunsWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-content-studio") ? <section id="template-content-studio" className="doc-section">
        <div className="section-heading">
          <h2>Content Studio</h2>
          <p>A publishing workspace for upload management, asset review, release communication, and content scheduling.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/content-studio" minHeight="760px">
          <ExampleContentStudio widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  AssetReviewWidget,
  ContentCalendarWidget,
  ReleaseNotesWidget,
  UploadQueueWidget
} from "@zephrui/ui-react";

export function ContentStudio() {
  return (
    <div className="content-studio-grid">
      <UploadQueueWidget />
      <AssetReviewWidget />
      <ReleaseNotesWidget />
      <ContentCalendarWidget />
    </div>
  );
}`, () => onCopy("Content Studio", `import {
  AssetReviewWidget,
  ContentCalendarWidget,
  ReleaseNotesWidget,
  UploadQueueWidget
} from "@zephrui/ui-react";

export function ContentStudio() {
  return (
    <div className="content-studio-grid">
      <UploadQueueWidget />
      <AssetReviewWidget />
      <ReleaseNotesWidget />
      <ContentCalendarWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-support-portal") ? <section id="template-support-portal" className="doc-section">
        <div className="section-heading">
          <h2>Support Portal</h2>
          <p>A support workspace for queue triage, live incidents, customer health review, and feedback intake.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/support-portal" minHeight="760px">
          <ExampleSupportPortal widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  CustomerHealthWidget,
  FeedbackInboxWidget,
  IncidentDigestWidget,
  SupportQueueWidget
} from "@zephrui/ui-react";

export function SupportPortal() {
  return (
    <div className="support-portal-grid">
      <SupportQueueWidget />
      <IncidentDigestWidget />
      <CustomerHealthWidget />
      <FeedbackInboxWidget />
    </div>
  );
}`, () => onCopy("Support Portal", `import {
  CustomerHealthWidget,
  FeedbackInboxWidget,
  IncidentDigestWidget,
  SupportQueueWidget
} from "@zephrui/ui-react";

export function SupportPortal() {
  return (
    <div className="support-portal-grid">
      <SupportQueueWidget />
      <IncidentDigestWidget />
      <CustomerHealthWidget />
      <FeedbackInboxWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-finance-workspace") ? <section id="template-finance-workspace" className="doc-section">
        <div className="section-heading">
          <h2>Finance Workspace</h2>
          <p>An internal finance page for spend review, billing recovery, payment controls, and release readiness.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/finance-workspace" minHeight="760px">
          <ExampleFinanceWorkspace widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  BillingRecoveryWidget,
  BillingUsageWidget,
  PaymentMethodsWidget,
  ReleaseChecklistWidget
} from "@zephrui/ui-react";

export function FinanceWorkspace() {
  return (
    <div className="finance-workspace-grid">
      <BillingUsageWidget />
      <BillingRecoveryWidget />
      <PaymentMethodsWidget />
      <ReleaseChecklistWidget />
    </div>
  );
}`, () => onCopy("Finance Workspace", `import {
  BillingRecoveryWidget,
  BillingUsageWidget,
  PaymentMethodsWidget,
  ReleaseChecklistWidget
} from "@zephrui/ui-react";

export function FinanceWorkspace() {
  return (
    <div className="finance-workspace-grid">
      <BillingUsageWidget />
      <BillingRecoveryWidget />
      <PaymentMethodsWidget />
      <ReleaseChecklistWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-product-review-board") ? <section id="template-product-review-board" className="doc-section">
        <div className="section-heading">
          <h2>Product Review Board</h2>
          <p>A product-team workspace for review queue, threaded feedback, team context, and high-frequency actions.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/product-review-board" minHeight="760px">
          <ExampleProductReviewBoard widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  CommentThreadWidget,
  QuickActionsWidget,
  ReviewInboxWidget,
  TeamPulseWidget
} from "@zephrui/ui-react";

export function ProductReviewBoard() {
  return (
    <div className="product-review-board-grid">
      <ReviewInboxWidget />
      <CommentThreadWidget />
      <TeamPulseWidget />
      <QuickActionsWidget />
    </div>
  );
}`, () => onCopy("Product Review Board", `import {
  CommentThreadWidget,
  QuickActionsWidget,
  ReviewInboxWidget,
  TeamPulseWidget
} from "@zephrui/ui-react";

export function ProductReviewBoard() {
  return (
    <div className="product-review-board-grid">
      <ReviewInboxWidget />
      <CommentThreadWidget />
      <TeamPulseWidget />
      <QuickActionsWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}
    </>
  );
}
