---
description: Drop in a Zephr widget fully wired — /widget data-table, command-palette, notification-feed, etc.
---

Generate the specified Zephr widget from "$ARGUMENTS" as production-ready React code.

**Available widgets:**

Data & Tables: `data-table`, `deals-pipeline`, `audit-trail`, `automation-runs`, `experiment-results`
Command & Navigation: `command-palette`, `quick-actions`, `navbar`
Analytics: `analytics-overview`, `metrics-dashboard`, `revenue-snapshot`, `marketing-insights`, `conversion-score`
Notifications: `notification-feed`, `activity-timeline`, `incident-digest`, `incident-response`
Settings: `settings-panel`, `security-access`, `api-keys`, `billing-usage`
Onboarding: `setup-journey`, `welcome-profile`, `goal-tracker`, `referral-reward`
Content: `comment-thread`, `content-calendar`, `feedback-inbox`, `review-inbox`
Team: `team-directory`, `team-pulse`, `access-requests`
Billing: `plan-comparison`, `billing-recovery`, `license-activations`
AI/Compose: `prompt-composer`
Project: `kanban-board`, `project-brief`, `launch-progress`, `release-checklist`, `release-notes`
Support: `support-queue`, `approval-modal`
Scheduling: `event-scheduler`, `delivery-timeline`, `travel-itinerary`

**Generation requirements:**
1. Import all Zephr components from `@zephrui/ui-react`
2. Use `useState` for all interactive state — the widget must be interactive, not decorative
3. Include realistic placeholder data that matches the widget's domain
4. Wire all action buttons to state handlers (mark-read, sort, select, save, etc.)
5. Use `--z-color-*`, `--z-space-*`, `--z-font-*` tokens throughout
6. The widget should be self-contained — no external data fetching required
7. Export as a named React component

**For data-related widgets** (tables, feeds, pipelines):
- Include sortable columns (DataTable)
- Include row selection with header checkbox (indeterminate state)
- Include search/filter state
- Include empty and loading states

**For notification/activity widgets:**
- Group items by date (Today, Yesterday, Earlier)
- Track read/unread state with `useState<Set<string>>`
- Include "Mark all read" action

**For settings/config widgets:**
- Include save feedback cycle: idle → saving → saved → idle
- Reset functionality
- Toggle state per option

**For metric/analytics widgets:**
- Include a period selector (7d / 30d / 90d) with distinct data per period
- Show trend direction (up/down) with colored Badge

If $ARGUMENTS is empty, list the available widget categories and ask which to generate.
