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
  MarketingInsightsWidget,
  NotificationFeedWidget,
  OnboardingPage,
  PaymentMethodsWidget,
  PromptComposerWidget,
  QuickActionsWidget,
  ReleaseChecklistWidget,
  RevenueSnapshotWidget,
  ReleaseNotesWidget,
  ReferralRewardWidget,
  ReviewInboxWidget,
  SecurityAccessWidget,
  SettingsPage,
  SettingsPanelWidget,
  SetupJourneyWidget,
  SupportQueueWidget,
  TeamPulseWidget,
  TeamDirectoryWidget,
  TravelItineraryWidget,
  UploadQueueWidget,
  WelcomeProfileWidget,
  ConversionScoreWidget,
  DeliveryTimelineWidget,
  type WidgetSurface,
} from "@zephrui/ui-react";
import { templatesV2CatalogIds } from "./templatesCatalog";

type TemplateCategory = "all" | "template" | "example";
type ShowcaseVersion = "v1" | "v2";

interface TemplatesPageProps {
  widgetSurface: WidgetSurface;
  showcaseVersion: ShowcaseVersion;
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

const TEMPLATE_CATEGORY_LABELS: Record<Exclude<TemplateCategory, "all">, string> = {
  template: "Template",
  example: "Example",
};

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

function TemplateSpotlightCard({
  entry,
}: {
  entry: TemplateEntry;
}) {
  return (
    <a className="showcase-v2-card showcase-v2-card--template" href={`#${entry.id}`}>
      <div className="showcase-v2-card-stage">
        <span className="showcase-v2-card-eyebrow">{TEMPLATE_CATEGORY_LABELS[entry.category]}</span>
        <TemplatePreviewArt entry={entry} />
      </div>
      <div className="showcase-v2-card-copy">
        <h3>{entry.title}</h3>
        <p>{entry.description}</p>
      </div>
    </a>
  );
}

function TemplatePreviewArt({ entry }: { entry: TemplateEntry }) {
  switch (entry.id) {
    case "template-dashboard":
      return (
        <div className="template-preview-art template-preview-art--dashboard" aria-hidden="true">
          <div className="template-preview-app-topbar">
            <span className="template-preview-pill">Recruiting</span>
            <div className="template-preview-app-actions">
              <span className="template-preview-chip" />
              <span className="template-preview-button template-preview-button--dark" />
            </div>
          </div>
          <div className="template-preview-app-table">
            <span className="template-preview-app-table-row template-preview-app-table-row--head" />
            <span className="template-preview-app-table-row" />
            <span className="template-preview-app-table-row" />
            <span className="template-preview-app-table-row" />
            <span className="template-preview-app-table-row" />
          </div>
        </div>
      );
    case "template-team-workspace":
      return (
        <div className="template-preview-art template-preview-art--team" aria-hidden="true">
          <div className="template-preview-app-shell">
            <div className="template-preview-app-sidebar">
              <span className="template-preview-search" />
              <div className="template-preview-app-list">
                <span className="template-preview-app-list-item template-preview-app-list-item--active" />
                <span className="template-preview-app-list-item" />
                <span className="template-preview-app-list-item" />
                <span className="template-preview-app-list-item" />
              </div>
            </div>
            <div className="template-preview-app-main">
              <div className="template-preview-app-tab-row">
                <span className="template-preview-app-tab template-preview-app-tab--active" />
                <span className="template-preview-app-tab" />
                <span className="template-preview-app-tab" />
              </div>
              <div className="template-preview-app-panel">
                <span className="template-preview-line template-preview-line--medium" />
                <span className="template-preview-line template-preview-line--full" />
                <span className="template-preview-line template-preview-line--short" />
              </div>
            </div>
            <div className="template-preview-app-aside">
              <span className="template-preview-line template-preview-line--medium" />
              <span className="template-preview-line template-preview-line--short" />
              <span className="template-preview-line template-preview-line--medium" />
            </div>
          </div>
        </div>
      );
    case "template-developer-console":
      return (
        <div className="template-preview-art template-preview-art--developer" aria-hidden="true">
          <div className="template-preview-toolbar">
            <span className="template-preview-pill">API</span>
            <span className="template-preview-chip" />
            <span className="template-preview-chip" />
          </div>
          <div className="template-preview-shell">
            <span className="template-preview-line template-preview-line--medium" />
            <div className="template-preview-code-block">
              <span className="template-preview-code-line" />
              <span className="template-preview-code-line template-preview-code-line--short" />
              <span className="template-preview-code-line" />
            </div>
          </div>
        </div>
      );
    case "template-crm-workspace":
      return (
        <div className="template-preview-art template-preview-art--crm" aria-hidden="true">
          <div className="template-preview-app-topbar">
            <span className="template-preview-pill">Deals</span>
            <div className="template-preview-app-actions">
              <span className="template-preview-chip" />
              <span className="template-preview-chip" />
            </div>
          </div>
          <div className="template-preview-kanban-shell">
            <div className="template-preview-kanban-column">
              <span className="template-preview-kanban-head" />
              <span className="template-preview-kanban-card" />
              <span className="template-preview-kanban-card" />
            </div>
            <div className="template-preview-kanban-column">
              <span className="template-preview-kanban-head" />
              <span className="template-preview-kanban-card template-preview-kanban-card--active" />
              <span className="template-preview-kanban-card" />
            </div>
            <div className="template-preview-kanban-column">
              <span className="template-preview-kanban-head" />
              <span className="template-preview-kanban-card" />
            </div>
            <div className="template-preview-kanban-column">
              <span className="template-preview-kanban-head" />
              <span className="template-preview-kanban-card" />
            </div>
          </div>
        </div>
      );
    case "template-support-portal":
      return (
        <div className="template-preview-art template-preview-art--support" aria-hidden="true">
          <div className="template-preview-app-shell">
            <div className="template-preview-app-main">
              <div className="template-preview-app-tab-row">
                <span className="template-preview-app-tab template-preview-app-tab--active" />
                <span className="template-preview-app-tab" />
              </div>
              <div className="template-preview-app-list">
                <span className="template-preview-app-list-item template-preview-app-list-item--active" />
                <span className="template-preview-app-list-item" />
                <span className="template-preview-app-list-item" />
              </div>
            </div>
            <div className="template-preview-app-aside">
              <span className="template-preview-pill template-preview-pill--accent">Urgent</span>
              <span className="template-preview-line template-preview-line--full" />
              <span className="template-preview-line template-preview-line--medium" />
              <span className="template-preview-line template-preview-line--short" />
            </div>
          </div>
        </div>
      );
    case "template-customer-onboarding":
      return (
        <div className="template-preview-art template-preview-art--onboarding" aria-hidden="true">
          <div className="template-preview-pill">Welcome flow</div>
          <div className="template-preview-hero" />
          <div className="template-preview-input-row">
            <span className="template-preview-avatar" />
            <span className="template-preview-button template-preview-button--dark" />
          </div>
          <span className="template-preview-line template-preview-line--full" />
        </div>
      );
    case "template-referral-center":
      return (
        <div className="template-preview-art template-preview-art--referral" aria-hidden="true">
          <div className="template-preview-banner">
            <div className="template-preview-copy">
              <span className="template-preview-pill">Earn credits</span>
              <span className="template-preview-line template-preview-line--medium" />
            </div>
            <span className="template-preview-orb" />
          </div>
          <div className="template-preview-list">
            <span className="template-preview-row" />
            <span className="template-preview-row" />
            <span className="template-preview-row" />
          </div>
          <div className="template-preview-input-row">
            <span className="template-preview-line template-preview-line--medium" />
            <span className="template-preview-button template-preview-button--dark" />
          </div>
        </div>
      );
    case "template-ai-composer-studio":
      return (
        <div className="template-preview-art template-preview-art--composer" aria-hidden="true">
          <div className="template-preview-toolbar">
            <span className="template-preview-icon" />
            <span className="template-preview-line template-preview-line--short" />
            <span className="template-preview-chip" />
          </div>
          <div className="template-preview-shell">
            <span className="template-preview-line template-preview-line--full" />
            <span className="template-preview-line template-preview-line--medium" />
            <div className="template-preview-actions">
              <span className="template-preview-chip" />
              <span className="template-preview-chip" />
              <span className="template-preview-button template-preview-button--icon" />
            </div>
          </div>
        </div>
      );
    case "template-delivery-operations":
      return (
        <div className="template-preview-art template-preview-art--timeline" aria-hidden="true">
          <div className="template-preview-timeline-header">
            <span className="template-preview-pill">In transit</span>
            <span className="template-preview-chip" />
          </div>
          <div className="template-preview-timeline">
            <span className="template-preview-node" />
            <span className="template-preview-node-line" />
            <span className="template-preview-node" />
            <span className="template-preview-node-line" />
            <span className="template-preview-node" />
          </div>
          <div className="template-preview-list">
            <span className="template-preview-row" />
            <span className="template-preview-row" />
            <span className="template-preview-row" />
          </div>
        </div>
      );
    case "template-growth-insights":
    case "template-analytics-workspace":
      return (
        <div className="template-preview-art template-preview-art--analytics" aria-hidden="true">
          <div className="template-preview-tabs">
            <span className="template-preview-tab template-preview-tab--active" />
            <span className="template-preview-tab" />
            <span className="template-preview-tab" />
          </div>
          <div className="template-preview-chart-grid">
            <div className="template-preview-stat-card">
              <span className="template-preview-line template-preview-line--short" />
              <span className="template-preview-chart-bars" />
            </div>
            <div className="template-preview-stat-card">
              <span className="template-preview-line template-preview-line--short" />
              <span className="template-preview-chart-wave" />
            </div>
          </div>
        </div>
      );
    case "template-content-studio":
      return (
        <div className="template-preview-art template-preview-art--content" aria-hidden="true">
          <div className="template-preview-grid template-preview-grid--content">
            <span className="template-preview-media template-preview-media--large" />
            <span className="template-preview-media" />
            <span className="template-preview-media" />
          </div>
          <span className="template-preview-line template-preview-line--full" />
        </div>
      );
    case "template-product-review-board":
      return (
        <div className="template-preview-art template-preview-art--review" aria-hidden="true">
          <div className="template-preview-board">
            <span className="template-preview-board-column" />
            <span className="template-preview-board-column template-preview-board-column--active" />
            <span className="template-preview-board-column" />
          </div>
          <div className="template-preview-input-row">
            <span className="template-preview-chip" />
            <span className="template-preview-chip" />
            <span className="template-preview-chip" />
          </div>
        </div>
      );
    default:
      return (
        <div className="template-preview-stack" aria-hidden="true">
          <span className="template-preview-line template-preview-line--full" />
          <div className="template-preview-grid">
            <span className="template-preview-line" />
            <span className="template-preview-line" />
          </div>
          <div className="template-preview-caption">{entry.previewCardLabel}</div>
        </div>
      );
  }
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

function ExampleCustomerOnboarding({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Onboarding</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Customer onboarding</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Guide new customers from account setup to workspace activation with a polished, conversion-friendly first-run flow.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="purple" variant="lighter">Activation</Badge>
          <Button size="sm">Preview journey</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--asymmetric">
        <WelcomeProfileWidget surface={widgetSurface} />
        <SetupJourneyWidget surface={widgetSurface} />
        <div className="example-page-span-two">
          <InviteMembersWidget surface={widgetSurface} />
        </div>
      </div>
    </div>
  );
}

function ExampleReferralCenter({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Growth loops</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Referral center</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Combine incentives, account health, and weekly outcomes into one conversion-friendly referral surface.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="green" variant="lighter">Growth</Badge>
          <Button size="sm">Share campaign</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <ReferralRewardWidget surface={widgetSurface} />
        <GoalTrackerWidget surface={widgetSurface} />
        <CustomerHealthWidget surface={widgetSurface} />
        <RevenueSnapshotWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleAIComposerStudio({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">AI tooling</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>AI composer studio</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>A premium workspace for prompt composition, asset staging, and threaded creative review before generation runs.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="purple" variant="lighter">AI</Badge>
          <Button size="sm">Generate draft</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <PromptComposerWidget surface={widgetSurface} />
        <AssetReviewWidget surface={widgetSurface} />
        <UploadQueueWidget surface={widgetSurface} />
        <CommentThreadWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleDeliveryOperations({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Delivery</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Delivery operations</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Track movement, handoffs, schedules, and support readiness from a single fulfillment control surface.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="sky" variant="lighter">Ops</Badge>
          <Button size="sm">Open route board</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <DeliveryTimelineWidget surface={widgetSurface} />
        <TravelItineraryWidget surface={widgetSurface} />
        <SupportQueueWidget surface={widgetSurface} />
        <ActivityTimelineWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

function ExampleGrowthInsights({ widgetSurface }: { widgetSurface: WidgetSurface }) {
  return (
    <div style={examplePageShellStyle()}>
      <div style={examplePageHeaderStyle()}>
        <div style={examplePageMetaStyle()}>
          <span className="widget-section-kicker">Performance</span>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Growth insights</h3>
          <p style={{ margin: 0, color: "var(--z-color-muted, #667085)" }}>Bring live marketing metrics, conversion analysis, and product KPIs into a premium decision-making workspace.</p>
        </div>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
          <Badge color="blue" variant="lighter">Insights</Badge>
          <Button size="sm">Open metrics</Button>
        </div>
      </div>
      <div className="example-page-grid example-page-grid--two">
        <MarketingInsightsWidget surface={widgetSurface} />
        <ConversionScoreWidget surface={widgetSurface} />
        <AnalyticsOverviewWidget surface={widgetSurface} />
        <RevenueSnapshotWidget surface={widgetSurface} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CRM Contacts — full app-shell contacts table with Sheet + ModalDialog
────────────────────────────────────────────────────────────────────────── */

interface CRMContact {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  email: string;
  company: string;
  role: string;
  status: "Active" | "Churned" | "Trial" | "Prospect";
  lastSeen: string;
  deals: number;
  phone: string;
  location: string;
}

const CRM_CONTACTS: CRMContact[] = [
  { id: "1", name: "Alice Hartmann", initials: "AH", avatarColor: "#f3f4f6", email: "alice@hartmann.io", company: "Hartmann & Co", role: "Head of Growth", status: "Active", lastSeen: "2 min ago", deals: 3, phone: "+1 415 900 1234", location: "San Francisco, CA" },
  { id: "2", name: "Jordan Miles", initials: "JM", avatarColor: "#eff6ff", email: "jordan@milesconsulting.co", company: "Miles Consulting", role: "CTO", status: "Trial", lastSeen: "1 hr ago", deals: 1, phone: "+1 212 555 8821", location: "New York, NY" },
  { id: "3", name: "Priya Kapoor", initials: "PK", avatarColor: "#f0fdf4", email: "priya@kapoortech.in", company: "Kapoor Tech", role: "CEO", status: "Active", lastSeen: "Yesterday", deals: 5, phone: "+91 98100 22233", location: "Bangalore, IN" },
  { id: "4", name: "Marco Benedetti", initials: "MB", avatarColor: "#fefce8", email: "marco@benedetti.eu", company: "Benedetti SRL", role: "VP Engineering", status: "Prospect", lastSeen: "3 days ago", deals: 0, phone: "+39 334 555 4411", location: "Milan, IT" },
  { id: "5", name: "Sakura Tanaka", initials: "ST", avatarColor: "#fdf4ff", email: "s.tanaka@genki.jp", company: "Genki Systems", role: "Product Lead", status: "Active", lastSeen: "Today", deals: 2, phone: "+81 80 1234 5678", location: "Tokyo, JP" },
  { id: "6", name: "Lena Müller", initials: "LM", avatarColor: "#fff7ed", email: "lena@muller-digital.de", company: "Müller Digital", role: "COO", status: "Churned", lastSeen: "2 weeks ago", deals: 4, phone: "+49 176 555 9900", location: "Berlin, DE" },
  { id: "7", name: "Carlos Ríos", initials: "CR", avatarColor: "#f0f9ff", email: "carlos@riosventures.mx", company: "Ríos Ventures", role: "Founder", status: "Trial", lastSeen: "4 hrs ago", deals: 1, phone: "+52 55 1234 5678", location: "Mexico City, MX" },
  { id: "8", name: "Amy Chen", initials: "AC", avatarColor: "#f0fdf4", email: "amy.chen@quantumleap.ai", company: "QuantumLeap AI", role: "Head of Sales", status: "Active", lastSeen: "Just now", deals: 7, phone: "+1 650 900 4321", location: "Palo Alto, CA" },
];

const STATUS_COLOR: Record<CRMContact["status"], { color: "green" | "red" | "blue" | "gray"; variant: "lighter" | "filled" }> = {
  Active: { color: "green", variant: "lighter" },
  Churned: { color: "red", variant: "lighter" },
  Trial: { color: "blue", variant: "lighter" },
  Prospect: { color: "gray", variant: "lighter" },
};

function ExampleCRMContacts() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | CRMContact["status"]>("All");
  const [selectedContact, setSelectedContact] = useState<CRMContact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<CRMContact | null>(null);
  const [contacts, setContacts] = useState<CRMContact[]>(CRM_CONTACTS);

  const filtered = contacts.filter((c) => {
    const matchSearch = search === "" || `${c.name} ${c.email} ${c.company}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const STATUS_FILTERS: Array<"All" | CRMContact["status"]> = ["All", "Active", "Trial", "Prospect", "Churned"];

  function confirmDelete() {
    if (!contactToDelete) return;
    setContacts((prev) => prev.filter((c) => c.id !== contactToDelete.id));
    if (selectedContact?.id === contactToDelete.id) setSelectedContact(null);
    setContactToDelete(null);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      background: "var(--z-color-surface, #fff)",
      fontFamily: "var(--z-font-sans, Inter, system-ui, sans-serif)",
    }}>
      {/* ── Page header ── */}
      <div style={{
        padding: "1.25rem 1.5rem 0",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
      }}>
        <div>
          <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--z-color-muted, #667085)" }}>CRM</span>
          <h2 style={{ margin: "0.2rem 0 0.3rem", fontSize: "1.3rem", fontWeight: 700, color: "var(--z-color-text, #111827)", letterSpacing: "-0.01em" }}>Contacts</h2>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--z-color-muted, #667085)" }}>{contacts.length} contacts · {contacts.filter(c => c.status === "Active").length} active</p>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
          <Button size="sm" variant="secondary">Import CSV</Button>
          <Button size="sm">Add contact</Button>
        </div>
      </div>

      {/* ── Toolbar: search + filter pills ── */}
      <div style={{
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
        borderBottom: "1px solid var(--z-color-line, #e5e7eb)",
      }}>
        <div className="crm-search-wrap">
          <span className="ms crm-search-icon" aria-hidden="true">search</span>
          <Input
            controlSize="sm"
            type="search"
            placeholder="Search contacts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              style={{
                padding: "0.3rem 0.75rem",
                borderRadius: "var(--z-radius-full, 9999px)",
                border: "1.5px solid",
                fontSize: "0.8rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
                background: statusFilter === s ? "var(--z-color-primary, #2563eb)" : "transparent",
                color: statusFilter === s ? "var(--z-color-primary-contrast, #fff)" : "var(--z-color-text, #374151)",
                borderColor: statusFilter === s ? "var(--z-color-primary, #2563eb)" : "var(--z-color-line, #d1d5db)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ overflowX: "auto", flex: 1 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--z-color-line, #e5e7eb)", background: "var(--z-color-bg, #f9fafb)" }}>
              {["Contact", "Company", "Status", "Last seen", "Deals", ""].map((col) => (
                <th key={col} style={{
                  padding: "0.65rem 1rem",
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--z-color-muted, #6b7280)",
                  whiteSpace: "nowrap",
                }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "var(--z-color-muted, #9ca3af)" }}>
                  No contacts match your search.
                </td>
              </tr>
            ) : filtered.map((contact, i) => (
              <tr
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                style={{
                  borderBottom: i < filtered.length - 1 ? "1px solid var(--z-color-line, #f3f4f6)" : undefined,
                  cursor: "pointer",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "var(--z-color-bg, #f9fafb)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = ""; }}
              >
                {/* Name + Avatar */}
                <td style={{ padding: "0.85rem 1rem", whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: contact.avatarColor,
                      border: "1px solid var(--z-color-line, #e5e7eb)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.7rem", fontWeight: 700,
                      color: "var(--z-color-text, #374151)",
                      flexShrink: 0,
                    }}>{contact.initials}</div>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--z-color-text, #111827)" }}>{contact.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--z-color-muted, #6b7280)" }}>{contact.email}</div>
                    </div>
                  </div>
                </td>
                {/* Company */}
                <td style={{ padding: "0.85rem 1rem", color: "var(--z-color-text, #374151)" }}>
                  <div style={{ fontWeight: 500 }}>{contact.company}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--z-color-muted, #9ca3af)" }}>{contact.role}</div>
                </td>
                {/* Status */}
                <td style={{ padding: "0.85rem 1rem" }}>
                  <Badge
                    color={STATUS_COLOR[contact.status].color}
                    variant={STATUS_COLOR[contact.status].variant}
                    type="dot"
                  >
                    {contact.status}
                  </Badge>
                </td>
                {/* Last seen */}
                <td style={{ padding: "0.85rem 1rem", color: "var(--z-color-muted, #6b7280)", whiteSpace: "nowrap", fontSize: "0.82rem" }}>
                  {contact.lastSeen}
                </td>
                {/* Deals */}
                <td style={{ padding: "0.85rem 1rem", textAlign: "center" }}>
                  {contact.deals > 0
                    ? <Badge color="blue" variant="lighter">{contact.deals}</Badge>
                    : <span style={{ color: "var(--z-color-muted, #d1d5db)" }}>—</span>
                  }
                </td>
                {/* Actions */}
                <td style={{ padding: "0.85rem 1rem", textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.35rem" }}>
                    <button
                      type="button"
                      aria-label={`View ${contact.name}`}
                      title="View details"
                      onClick={() => setSelectedContact(contact)}
                      style={{
                        padding: "0.3rem", borderRadius: "var(--z-radius-md, 6px)",
                        border: "none", background: "transparent", cursor: "pointer",
                        color: "var(--z-color-muted, #9ca3af)",
                        transition: "color 0.1s, background 0.1s",
                        display: "flex", alignItems: "center",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--z-color-bg, #f3f4f6)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--z-color-text)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--z-color-muted)"; }}
                    >
                      <span className="ms" style={{ fontSize: "1rem" }}>open_in_new</span>
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${contact.name}`}
                      title="Delete"
                      onClick={() => setContactToDelete(contact)}
                      style={{
                        padding: "0.3rem", borderRadius: "var(--z-radius-md, 6px)",
                        border: "none", background: "transparent", cursor: "pointer",
                        color: "var(--z-color-muted, #9ca3af)",
                        transition: "color 0.1s, background 0.1s",
                        display: "flex", alignItems: "center",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#fef2f2"; (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--z-color-muted)"; }}
                    >
                      <span className="ms" style={{ fontSize: "1rem" }}>delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Footer ── */}
      <div style={{
        padding: "0.75rem 1.5rem",
        borderTop: "1px solid var(--z-color-line, #e5e7eb)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "var(--z-color-muted, #6b7280)",
        fontSize: "0.82rem",
      }}>
        <span>Showing {filtered.length} of {contacts.length} contacts</span>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[1].map((p) => (
            <button key={p} type="button" style={{
              width: 28, height: 28, borderRadius: "var(--z-radius-md, 6px)",
              border: "1.5px solid var(--z-color-primary, #2563eb)",
              background: "var(--z-color-primary, #2563eb)",
              color: "#fff", fontSize: "0.82rem", fontWeight: 600, cursor: "default",
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* ── Sheet: Contact detail ── */}
      {selectedContact && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedContact.name} details`}
          style={{
            position: "absolute", inset: 0,
            display: "flex", justifyContent: "flex-end",
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(2px)",
            zIndex: 50,
          }}
          onClick={() => setSelectedContact(null)}
        >
          <div
            style={{
              width: "min(380px, 100%)",
              background: "var(--z-color-surface, #fff)",
              height: "100%",
              overflowY: "auto",
              boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet header */}
            <div style={{
              padding: "1.25rem 1.25rem 1rem",
              borderBottom: "1px solid var(--z-color-line, #e5e7eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--z-color-text, #111827)" }}>Contact details</span>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelectedContact(null)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--z-color-muted, #9ca3af)", display: "flex", alignItems: "center",
                  borderRadius: "var(--z-radius-md, 6px)", padding: "0.25rem",
                }}
              >
                <span className="ms" style={{ fontSize: "1.2rem" }}>close</span>
              </button>
            </div>

            {/* Avatar + name block */}
            <div style={{ padding: "1.5rem 1.25rem 1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: selectedContact.avatarColor,
                border: "1px solid var(--z-color-line, #e5e7eb)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.05rem", fontWeight: 700,
                color: "var(--z-color-text, #374151)",
                flexShrink: 0,
              }}>{selectedContact.initials}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--z-color-text, #111827)" }}>{selectedContact.name}</div>
                <div style={{ fontSize: "0.83rem", color: "var(--z-color-muted, #6b7280)" }}>{selectedContact.role} · {selectedContact.company}</div>
                <div style={{ marginTop: "0.4rem" }}>
                  <Badge color={STATUS_COLOR[selectedContact.status].color} variant={STATUS_COLOR[selectedContact.status].variant} type="dot">
                    {selectedContact.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Details */}
            <div style={{ padding: "0 1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "mail", label: "Email", value: selectedContact.email },
                { icon: "phone", label: "Phone", value: selectedContact.phone },
                { icon: "location_on", label: "Location", value: selectedContact.location },
                { icon: "business", label: "Company", value: selectedContact.company },
                { icon: "schedule", label: "Last seen", value: selectedContact.lastSeen },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span className="ms" style={{ fontSize: "1rem", color: "var(--z-color-muted, #9ca3af)", marginTop: 2, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--z-color-muted, #9ca3af)" }}>{label}</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--z-color-text, #374151)", fontWeight: 500 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active deals */}
            <div style={{
              margin: "0 1.25rem 1.25rem",
              padding: "1rem",
              borderRadius: "var(--z-radius-lg, 10px)",
              background: "var(--z-color-bg, #f9fafb)",
              border: "1px solid var(--z-color-line, #e5e7eb)",
            }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--z-color-muted, #6b7280)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Active deals</div>
              {selectedContact.deals === 0
                ? <p style={{ margin: 0, fontSize: "0.83rem", color: "var(--z-color-muted, #9ca3af)" }}>No active deals yet.</p>
                : Array.from({ length: Math.min(selectedContact.deals, 3) }).map((_, idx) => (
                  <div key={idx} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "0.5rem 0",
                    borderBottom: idx < Math.min(selectedContact.deals, 3) - 1 ? "1px solid var(--z-color-line, #e5e7eb)" : undefined,
                  }}>
                    <span style={{ fontSize: "0.83rem", color: "var(--z-color-text, #374151)" }}>Deal #{(idx + 1) * 1001}</span>
                    <Badge color={["green", "blue", "orange"][idx % 3] as "green" | "blue" | "orange"} variant="lighter">
                      {["Closed", "Negotiation", "Proposal"][idx % 3]}
                    </Badge>
                  </div>
                ))
              }
            </div>

            {/* Sheet actions */}
            <div style={{
              marginTop: "auto",
              padding: "1rem 1.25rem",
              borderTop: "1px solid var(--z-color-line, #e5e7eb)",
              display: "flex",
              gap: "0.6rem",
            }}>
              <Button size="sm" style={{ flex: 1 }}>Send email</Button>
              <Button size="sm" variant="secondary" onClick={() => { setContactToDelete(selectedContact); setSelectedContact(null); }}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── ModalDialog: Delete confirmation ── */}
      {contactToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirm delete"
          style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(3px)",
            zIndex: 60,
          }}
          onClick={() => setContactToDelete(null)}
        >
          <div
            style={{
              width: "min(420px, 90%)",
              background: "var(--z-color-surface, #fff)",
              borderRadius: "var(--z-radius-xl, 14px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "1.5rem 1.5rem 1rem" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "#fef2f2",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1rem",
              }}>
                <span className="ms" style={{ fontSize: "1.25rem", color: "#ef4444" }}>delete_forever</span>
              </div>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", fontWeight: 700, color: "var(--z-color-text, #111827)" }}>
                Delete contact
              </h3>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--z-color-muted, #6b7280)" }}>
                Are you sure you want to delete <strong>{contactToDelete.name}</strong>? This will permanently remove the contact and all associated deal data. This action cannot be undone.
              </p>
            </div>
            <div style={{
              padding: "1rem 1.5rem",
              display: "flex",
              gap: "0.6rem",
              justifyContent: "flex-end",
              borderTop: "1px solid var(--z-color-line, #e5e7eb)",
            }}>
              <Button size="sm" variant="secondary" onClick={() => setContactToDelete(null)}>Cancel</Button>
              <Button size="sm" variant="danger" onClick={confirmDelete}>Delete contact</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TemplatesPage({
  widgetSurface,
  showcaseVersion,
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
      featured: true,
      badge: <Badge color="teal" variant="lighter">Example</Badge>,
      previewCardLabel: "CRM example",
    },
    {
      id: "template-crm-contacts",
      title: "CRM Contacts",
      description: "An Attio-style contacts table with search, status filters, a slide-over detail panel, and delete confirmation.",
      category: "example",
      featured: true,
      badge: <Badge color="teal" variant="lighter">Example</Badge>,
      previewCardLabel: "Contacts table",
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
    {
      id: "template-customer-onboarding",
      title: "Customer Onboarding",
      description: "A premium onboarding workspace for profile setup, activation progress, and first-team invite handoff.",
      category: "example",
      featured: true,
      badge: <Badge color="purple" variant="lighter">Example</Badge>,
      previewCardLabel: "Onboarding example",
    },
    {
      id: "template-referral-center",
      title: "Referral Center",
      description: "A conversion-focused growth workspace for referrals, incentives, and revenue-aware campaign review.",
      category: "example",
      featured: true,
      badge: <Badge color="green" variant="lighter">Example</Badge>,
      previewCardLabel: "Growth example",
    },
    {
      id: "template-ai-composer-studio",
      title: "AI Composer Studio",
      description: "A prompt-and-assets workspace for AI generation, creative review, and staged asset handling.",
      category: "example",
      featured: true,
      badge: <Badge color="purple" variant="lighter">Example</Badge>,
      previewCardLabel: "AI example",
    },
    {
      id: "template-delivery-operations",
      title: "Delivery Operations",
      description: "A premium logistics workspace for timeline tracking, route context, and support-ready handoff.",
      category: "example",
      featured: false,
      badge: <Badge color="sky" variant="lighter">Example</Badge>,
      previewCardLabel: "Delivery example",
    },
    {
      id: "template-growth-insights",
      title: "Growth Insights",
      description: "A metrics workspace combining marketing performance, scorecards, and top-line product health.",
      category: "example",
      featured: true,
      badge: <Badge color="blue" variant="lighter">Example</Badge>,
      previewCardLabel: "Metrics example",
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
    () => new Set(
      visibleTemplateEntries
        .map((entry) => entry.id)
    ),
    [visibleTemplateEntries]
  );

  const curatedTemplateEntries = useMemo(() => {
    const order = new Map(templatesV2CatalogIds.map((id, index) => [id, index]));
    type CatalogId = typeof templatesV2CatalogIds[number];
    return visibleTemplateEntries
      .filter((entry) => order.has(entry.id as CatalogId))
      .sort((a, b) => (order.get(a.id as CatalogId) ?? 0) - (order.get(b.id as CatalogId) ?? 0));
  }, [visibleTemplateEntries]);

  const featuredTemplateEntries = useMemo(
    () => curatedTemplateEntries.slice(0, 2),
    [curatedTemplateEntries]
  );

  const catalogTemplateEntries = useMemo(
    () => curatedTemplateEntries.slice(2, 5),
    [curatedTemplateEntries]
  );

  return (
    <>
      {showcaseVersion === "v2" ? (
        <>
          <section id="templates-overview" className="doc-section showcase-v2-hero">
            <div className="showcase-v2-hero-grid">
              <div className="showcase-v2-copy">
                <h1>Page systems with product-level polish.</h1>
                <p className="lead">
                  SaaS-native dashboards, settings, team, support, and developer surfaces designed to feel production-ready before you customize anything.
                </p>
              </div>
            </div>
          </section>

          <section className="doc-section showcase-v2-toolbar-shell">
            <div className="showcase-v2-toolbar">
              <Input
                controlSize="xs"
                className="showcase-v2-search"
                aria-label="Search templates"
                placeholder="Search templates, onboarding, analytics, support..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <div className="showcase-v2-filter-row" role="tablist" aria-label="Template categories">
                {CATEGORY_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === value}
                    className={`showcase-v2-filter ${activeCategory === value ? "is-active" : ""}`}
                    onClick={() => setActiveCategory(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {curatedTemplateEntries.length > 0 ? (
            <>
              {featuredTemplateEntries.length > 0 ? (
                <section className="doc-section showcase-v2-section">
                  <div className="showcase-v2-section-head">
                    <h2>Spotlight</h2>
                  </div>
                  <div className="showcase-v2-spotlight-grid showcase-v2-spotlight-grid--templates">
                    {featuredTemplateEntries.map((entry) => (
                      <TemplateSpotlightCard key={entry.id} entry={entry} />
                    ))}
                  </div>
                </section>
              ) : null}

              {catalogTemplateEntries.length > 0 ? (
                <section className="doc-section showcase-v2-section">
                  <div className="showcase-v2-section-head">
                    <h2>Library selection</h2>
                  </div>
                  <div className="template-teaser-grid showcase-v2-template-grid">
                    {catalogTemplateEntries.map((entry) => (
                      <a key={entry.id} className="template-teaser-card showcase-v2-template-card" href={`#${entry.id}`}>
                        <div className="template-teaser-preview">
                          <TemplatePreviewArt entry={entry} />
                        </div>
                        <div className="template-teaser-info">
                          <div className="template-teaser-head">
                            <span className="template-teaser-name">{entry.title}</span>
                          </div>
                          <span className="template-teaser-desc">{entry.description}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          ) : (
            <section className="doc-section">
              <div className="widget-empty-state">
                <strong>No templates match this search.</strong>
                <p>Clear the search or switch categories to see the curated pages again.</p>
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          <section id="templates-overview" className="doc-section hero">
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
        </>
      )}

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

      {visibleTemplateIds.has("template-customer-onboarding") ? <section id="template-customer-onboarding" className="doc-section">
        <div className="section-heading">
          <h2>Customer Onboarding</h2>
          <p>A first-run onboarding workspace with profile setup, activation progress, and team invite follow-through.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/customer-onboarding" minHeight="760px">
          <ExampleCustomerOnboarding widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  InviteMembersWidget,
  SetupJourneyWidget,
  WelcomeProfileWidget
} from "@zephrui/ui-react";

export function CustomerOnboarding() {
  return (
    <div className="customer-onboarding-grid">
      <WelcomeProfileWidget />
      <SetupJourneyWidget />
      <InviteMembersWidget />
    </div>
  );
}`, () => onCopy("Customer Onboarding", `import {
  InviteMembersWidget,
  SetupJourneyWidget,
  WelcomeProfileWidget
} from "@zephrui/ui-react";

export function CustomerOnboarding() {
  return (
    <div className="customer-onboarding-grid">
      <WelcomeProfileWidget />
      <SetupJourneyWidget />
      <InviteMembersWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-referral-center") ? <section id="template-referral-center" className="doc-section">
        <div className="section-heading">
          <h2>Referral Center</h2>
          <p>A growth workspace for referral loops, weekly outcomes, customer quality, and commercial impact.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/referral-center" minHeight="760px">
          <ExampleReferralCenter widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  CustomerHealthWidget,
  GoalTrackerWidget,
  ReferralRewardWidget,
  RevenueSnapshotWidget
} from "@zephrui/ui-react";

export function ReferralCenter() {
  return (
    <div className="referral-center-grid">
      <ReferralRewardWidget />
      <GoalTrackerWidget />
      <CustomerHealthWidget />
      <RevenueSnapshotWidget />
    </div>
  );
}`, () => onCopy("Referral Center", `import {
  CustomerHealthWidget,
  GoalTrackerWidget,
  ReferralRewardWidget,
  RevenueSnapshotWidget
} from "@zephrui/ui-react";

export function ReferralCenter() {
  return (
    <div className="referral-center-grid">
      <ReferralRewardWidget />
      <GoalTrackerWidget />
      <CustomerHealthWidget />
      <RevenueSnapshotWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-ai-composer-studio") ? <section id="template-ai-composer-studio" className="doc-section">
        <div className="section-heading">
          <h2>AI Composer Studio</h2>
          <p>A premium AI workspace for composing prompts, staging inputs, and reviewing output-ready assets.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/ai-composer-studio" minHeight="760px">
          <ExampleAIComposerStudio widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  AssetReviewWidget,
  CommentThreadWidget,
  PromptComposerWidget,
  UploadQueueWidget
} from "@zephrui/ui-react";

export function AIComposerStudio() {
  return (
    <div className="ai-composer-studio-grid">
      <PromptComposerWidget />
      <AssetReviewWidget />
      <UploadQueueWidget />
      <CommentThreadWidget />
    </div>
  );
}`, () => onCopy("AI Composer Studio", `import {
  AssetReviewWidget,
  CommentThreadWidget,
  PromptComposerWidget,
  UploadQueueWidget
} from "@zephrui/ui-react";

export function AIComposerStudio() {
  return (
    <div className="ai-composer-studio-grid">
      <PromptComposerWidget />
      <AssetReviewWidget />
      <UploadQueueWidget />
      <CommentThreadWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-delivery-operations") ? <section id="template-delivery-operations" className="doc-section">
        <div className="section-heading">
          <h2>Delivery Operations</h2>
          <p>A logistics-focused workspace for route context, timeline visibility, and customer-facing handoff readiness.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/delivery-operations" minHeight="760px">
          <ExampleDeliveryOperations widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  ActivityTimelineWidget,
  DeliveryTimelineWidget,
  SupportQueueWidget,
  TravelItineraryWidget
} from "@zephrui/ui-react";

export function DeliveryOperations() {
  return (
    <div className="delivery-operations-grid">
      <DeliveryTimelineWidget />
      <TravelItineraryWidget />
      <SupportQueueWidget />
      <ActivityTimelineWidget />
    </div>
  );
}`, () => onCopy("Delivery Operations", `import {
  ActivityTimelineWidget,
  DeliveryTimelineWidget,
  SupportQueueWidget,
  TravelItineraryWidget
} from "@zephrui/ui-react";

export function DeliveryOperations() {
  return (
    <div className="delivery-operations-grid">
      <DeliveryTimelineWidget />
      <TravelItineraryWidget />
      <SupportQueueWidget />
      <ActivityTimelineWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-crm-contacts") ? <section id="template-crm-contacts" className="doc-section">
        <div className="section-heading">
          <h2>CRM Contacts</h2>
          <p>A full-page contacts table with search, status filter pills, avatar+name rows, a slide-over detail panel, and a delete confirmation modal — showing the complete Zephr component composition for a CRM contacts screen.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/crm/contacts" minHeight="640px">
          <div style={{ position: "relative", height: "640px", overflow: "hidden" }}>
            <ExampleCRMContacts />
          </div>
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import { useState } from 'react';
import { Badge, Button, Input } from '@zephrui/ui-react';

// Contact data shape
interface CRMContact {
  id: string; name: string; email: string; company: string; role: string;
  status: 'Active' | 'Trial' | 'Prospect' | 'Churned';
  lastSeen: string; deals: number;
}

export function ContactsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selected, setSelected] = useState<CRMContact | null>(null);
  const [toDelete, setToDelete] = useState<CRMContact | null>(null);

  const filtered = contacts.filter(c =>
    (statusFilter === 'All' || c.status === statusFilter) &&
    (search === '' || [c.name, c.email, c.company].join(' ').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <LayoutShell sidebar={<SidebarNav items={navItems} activeId="contacts" />}>
      {/* Toolbar */}
      <div className="contacts-toolbar">
        <Input placeholder="Search contacts…" value={search} onChange={e => setSearch(e.target.value)} />
        {['All', 'Active', 'Trial', 'Prospect', 'Churned'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}>{s}</button>
        ))}
      </div>
      {/* Table */}
      <DataTable
        data={filtered}
        columns={[
          { id: 'name', header: 'Contact', render: row => <AvatarNameCell contact={row} /> },
          { id: 'company', header: 'Company', accessor: 'company' },
          { id: 'status', header: 'Status', render: row => <Badge color={statusColor[row.status]} variant='lighter' type='dot'>{row.status}</Badge> },
          { id: 'lastSeen', header: 'Last seen', accessor: 'lastSeen' },
          { id: 'deals', header: 'Deals', render: row => row.deals ? <Badge color='blue' variant='lighter'>{row.deals}</Badge> : '—' },
        ]}
        rowKey={row => row.id}
        onRowClick={setSelected}
      />
      {/* Detail slide-over */}
      {selected && <Sheet open title={selected.name} onClose={() => setSelected(null)}>...</Sheet>}
      {/* Delete confirmation */}
      {toDelete && <ModalDialog open title='Delete contact' onCancel={() => setToDelete(null)} onConfirm={handleDelete} />}
    </LayoutShell>
  );
}`, () => onCopy("CRM Contacts", `// See full source above — paste into your contacts page route`))}
        </div>
      </section> : null}

      {visibleTemplateIds.has("template-growth-insights") ? <section id="template-growth-insights" className="doc-section">
        <div className="section-heading">
          <h2>Growth Insights</h2>
          <p>A premium metrics workspace that blends marketing performance, conversion analysis, and top-line KPI review.</p>
        </div>
        <TemplateBrowserFrame address="zephr.local/templates/growth-insights" minHeight="760px">
          <ExampleGrowthInsights widgetSurface={widgetSurface} />
        </TemplateBrowserFrame>
        <div style={{ marginTop: "1rem" }}>
          {snippet("Usage", `import {
  AnalyticsOverviewWidget,
  ConversionScoreWidget,
  MarketingInsightsWidget,
  RevenueSnapshotWidget
} from "@zephrui/ui-react";

export function GrowthInsights() {
  return (
    <div className="growth-insights-grid">
      <MarketingInsightsWidget />
      <ConversionScoreWidget />
      <AnalyticsOverviewWidget />
      <RevenueSnapshotWidget />
    </div>
  );
}`, () => onCopy("Growth Insights", `import {
  AnalyticsOverviewWidget,
  ConversionScoreWidget,
  MarketingInsightsWidget,
  RevenueSnapshotWidget
} from "@zephrui/ui-react";

export function GrowthInsights() {
  return (
    <div className="growth-insights-grid">
      <MarketingInsightsWidget />
      <ConversionScoreWidget />
      <AnalyticsOverviewWidget />
      <RevenueSnapshotWidget />
    </div>
  );
}`))}
        </div>
      </section> : null}
    </>
  );
}
