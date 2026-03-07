# Plan: Style Pack Differentiation + Premium Template Overhaul

## Problem
1. **Style packs**: Currently locked to Clarity only (`BASE_STYLE_PACK = "Clarity"`). Users can't see or switch between the 6 packs — only accent color changes. "All options look the same."
2. **Page templates**: All 5 templates are functional skeletons (~150-350 lines each). Plain boxes, no decorative elements, no gradients, no SVG icons, no visual hierarchy. Looks like wireframes, not production-quality.

## Solution

### Phase 1: Re-introduce Style Pack Picker (in docs playground)

**What**: Add a style pack selector to the "Get Started" view with rich visual thumbnails that showcase each pack's personality. Allow live switching — selected pack applies to all component + template previews.

**Changes in `App.tsx`**:
- Remove `BASE_STYLE_PACK` constant → make `stylePack` a real `useState` (persisted via sessionStorage like accent)
- Add new **"Choose a style pack"** section ABOVE the accent section in Get Started view
- Each pack rendered as a card showing:
  - Pack name + description
  - A rich mini-app mockup (inline JSX with pack tokens) showing sidebar + header + stat cards + table rows + color palette strip + typography sample
  - The mockup uses the pack's actual color/radius/shadow/font tokens so each looks dramatically different:
    - Studio: Neutral gray, orange accent, standard radius
    - Editorial: Warm cream (#f8f5f1), stone borders, Fraunces serif
    - NeoBrutal: Yellow background (#fff6d5), BLACK borders, red primary
    - SoftTech: Blue-tinted (#f4f7ff), cyan accent, soft blues
    - Enterprise: Near-white, teal primary, conservative
    - Clarity: Inter font, orange accent, larger radius
- Pro badge on non-free packs (Editorial, NeoBrutal, SoftTech, Enterprise)
- Active pack gets accent ring border
- Switching pack updates CSS variables for entire docs

**New function**: `StylePackCard` component (~130 lines) — renders the rich mini-app mockup using pack tokens

**Scope**: ~200 lines of new JSX in App.tsx, minor CSS additions for the card grid

### Phase 2: MarketingPage Overhaul (Stripe-quality)

**File**: `packages/ui-react/src/templates/MarketingPage.tsx`

Overhaul from ~350 lines to ~600 lines. New/upgraded sections:

1. **Hero**: Gradient background (`linear-gradient` using primary at low opacity), decorative SVG dot grid pattern, "Now in Beta" badge above title, dual CTAs ("Get Started Free" primary + "View Docs" secondary), tighter letter-spacing on headline
2. **Stats section** (NEW): 4 stats in a row ("30+ Components", "6 Style Packs", "Zero Config", "AI-Native") with large numbers, divider lines
3. **Features**: Each card gets an inline SVG icon in a colored circle (lightning, robot, palette, accessibility, code, gift). Cards get shadow on hover
4. **Social proof**: Larger text logos with varying opacity, "500+ developers" headline
5. **Testimonials** (NEW): 3 testimonial cards with quote, avatar circle, name, title
6. **Pricing**: "Most Popular" badge on highlighted plan, colored top border (3px primary), inline SVG checkmarks (green for included), "/month" after price
7. **Bottom CTA**: Gradient background banner, larger text, "No credit card required" muted note

### Phase 3: AuthPage Overhaul (Clerk-quality)

**File**: `packages/ui-react/src/templates/AuthPage.tsx`

Overhaul from ~207 lines to ~400 lines. Changes:

1. **Split layout**: `grid-template-columns: 1fr 1fr; min-height: 100vh`
   - **Left panel (decorative)**: Gradient background (primary 10% → accent 5%), SVG dot pattern, large testimonial quote + author, brand logo
   - **Right panel (form)**: Existing form, refined spacing
2. **Social auth defaults**: 3 default providers with inline SVG icons (GitHub octocat, Google G, Apple logo)
3. **Forgot password link**, Terms & Privacy text
4. **Divider**: "or continue with email" between social and form
5. **Responsive**: Single column on narrow viewports

### Phase 4: DashboardPage Overhaul (Linear-quality)

**File**: `packages/ui-react/src/templates/DashboardPage.tsx`

Overhaul from ~232 lines to ~380 lines. Changes:

1. **Stat cards**: Inline SVG sparkline (7-point polyline ~40x16px), up/down arrow indicator SVGs, shadow applied
2. **Sub-navigation row**: "Overview / Analytics / Reports" text tabs above stats
3. **Table**: Avatar column next to project name, "View all →" link
4. **Activity feed**: Vertical timeline line connecting items (1px border color)
5. **Quick Actions row** (NEW): 3 small icon buttons above stats

### Phase 5: OnboardingPage Overhaul (Framer-quality)

**File**: `packages/ui-react/src/templates/OnboardingPage.tsx`

Overhaul from ~204 lines to ~380 lines. Changes:

1. **Split layout**: Left 40% decorative (SVG illustrations per step), right 60% wizard
2. **Step indicator**: Numbered circles connected by lines (completed = filled + check, current = ring, future = muted)
3. **Step content enrichment**: Feature highlights (step 1), syntax-colored code block (step 2), visual theme cards (step 3)

### Phase 6: SettingsPage Overhaul (Notion-quality)

**File**: `packages/ui-react/src/templates/SettingsPage.tsx`

Overhaul from ~155 lines to ~350 lines. Changes:

1. **Layout**: Sidebar nav + content panel (`grid-template-columns: 200px 1fr`) instead of Tabs
2. **Profile**: Avatar upload placeholder (camera SVG overlay), Display Name + Email side-by-side, bio textarea
3. **Notifications**: Grouped by category (Activity, Marketing, Updates), description per toggle
4. **Team section** (NEW): Member list with avatar, name, role Badge, "Invite" button
5. **Danger Zone**: Red left border, deactivate + delete options

### Phase 7: Docs Preview Adjustments + Verification

**File**: `apps/docs-playground/src/App.tsx` (template preview sections)

- Adjust scale factors for each template's BrowserPreviewFrame
- Verify all templates render cleanly at preview scale
- Run full typecheck + build across monorepo

## Implementation Order

1. Phase 1 (Style Pack Picker) — highest impact, lowest risk
2. Phase 2 (MarketingPage) — most visually impactful template
3. Phase 3 (AuthPage) — second most impactful
4. Phase 4 (DashboardPage) — data-heavy polish
5. Phase 5 (OnboardingPage)
6. Phase 6 (SettingsPage)
7. Phase 7 (Verification)

## Verification

After each phase:
- `corepack pnpm --filter @zephrui/ui-react tsc --noEmit`
- `corepack pnpm --filter @zephrui/docs-playground build`
- Visual verification in preview server

Final:
- `corepack pnpm run build` (full monorepo)
- Compare NeoBrutal vs Studio vs Editorial thumbnails — must look unmistakably different
- All 5 templates must look polished at preview scale
