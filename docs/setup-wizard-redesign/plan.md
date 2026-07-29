# plan.md — Setup Wizard Redesign Implementation Plan

> Companion to `requirements.md` (frozen) and `checklist.md` (verification).
> This file describes **how** each requirement is implemented and is updated as
> the work progresses. Read `requirements.md` first for the "what".

---

## 0. Architecture decisions (apply across all screens)

### 0.1 Hash routing (replaces integer `step`)

Convert the wizard from an integer `step` state to **hash routing** so each screen has an addressable URL, exactly like the anime-app prototype (`#home`, `#search`, …).

**Route table** (in navigation order). Note: the new "Choose Your Poison" screen is inserted **before** Finish, and the new "Restore Now processing" is inserted **between** Restore Summary and Restore Successful.

| # | Hash            | Screen file                          | Notes |
|---|-----------------|--------------------------------------|-------|
| 0 | `#welcome`      | welcome-screen.tsx                   | First. |
| 1 | `#theme`        | theme-screen.tsx                     | |
| 2 | `#folder`       | folder-screen.tsx                    | |
| 3 | `#permissions`  | permissions-screen.tsx               | |
| 4 | `#restore`      | restore-screen.tsx                   | "Select Backup File" / Skip |
| 5 | `#format`       | format-not-supported-screen.tsx      | |
| 6 | `#processing`   | processing-backup-screen.tsx         | auto-advance → `#summary` |
| 7 | `#summary`      | backup-summary-screen.tsx            | Cancel → `#format` (NOT `#processing`) |
| 8 | `#linking`      | linking-anime-screen.tsx             | |
| 9 | `#manual`       | manual-linking-screen.tsx            | |
| 10| `#restore-summary` | restore-summary-screen.tsx       | Restore Now → `#restore-processing` |
| 11| `#restore-processing` | restore-processing-screen.tsx (NEW) | auto-advance → `#restore-success` |
| 12| `#restore-success` | restore-successful-screen.tsx     | auto-advance / Continue → `#poison` |
| 13| `#poison`       | poison-screen.tsx (NEW, multi-step)  | → `#finish` |
| 14| `#finish`       | finish-screen.tsx                    | Last. "Start Exploring" → restart → `#welcome` |

Total: **15 hash routes** (was 13 integer steps; +1 restore-processing, +1 poison; the poison screen may itself have sub-steps but shares one route with internal sub-state).

**Implementation pattern** (mirrors `app/prototypes/anime-app/page.tsx`):
- `parseHash()` returns the active route id (and sub-state for poison).
- On mount, if hash empty → `history.replaceState(null, "", "#welcome")`.
- `popstate` listener re-parses.
- `go(route)` does `history.pushState(null, "", "#"+route)` + setState.
- `goBack()` does `history.back()` (browser back button works).
- Skip (from `#restore`) → `go("finish")` (bypasses all restore screens).

This keeps the existing `useWizardState` (palette, folderSelected, permissions, linkedAnime, ad settings) but **removes the `step` integer** from it — routing is now external.

### 0.2 Top-left headings (replaces centered titles)

New layout for every screen:
```
┌─────────────────────────────┐
│  [Heading]            ← top-left, left-aligned
│  [optional subheading]      ← left-aligned
│                              │
│   [visual / animation]       ← centered or full-width
│                              │
│   [body content]             │
│   ...                        │
│                              │
│  [Back]      [Primary CTA]   ← bottom actions
└─────────────────────────────┘
```

CSS change in `setup-wizard.css`:
- `.wizard-content` switches from `align-items: center; text-align: center` to `align-items: stretch; text-align: left`.
- `.wizard-title` / `.wizard-subtitle` get `align-self: flex-start; text-align: left; margin` adjustments.
- A new `.wizard-heading` block at the top of `.wizard-content` wraps the title + optional subtitle, left-aligned, with consistent padding.

### 0.3 Bolding fix (web)

The user reported text not bold on mobile. Root causes & fixes:
- The prototype uses the **Inter** font (loaded in `tokens.css` from Google Fonts). Inter has weights 400–900. But `font-weight: 800` only renders bold **if the 800 weight file is actually loaded**. Google Fonts URL must request `wght 400;500;700;800;900`.
- Verify the `@import`/`<link>` in `tokens.css` includes `wght@400;500;600;700;800;900`. If it only loads 400;700, then `font-weight: 800` falls back to 700 (looks like normal bold, not extra-bold).
- Add `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility` for crisper rendering on mobile.
- Ensure every `font-weight: 800` is on an element whose `font-family` is Inter (not a system fallback).
- This is a **global** fix in `tokens.css` / `setup-wizard.css`, applied once, inherited by all screens.

### 0.4 Modular architecture (keep + strengthen)

The current structure is already modular (one file per screen). We keep it and:
- Each screen stays a self-contained file with its own props interface.
- Shared visual primitives move into `components/visuals.tsx` (already there) — we add new visuals there rather than inline.
- A new `components/mini-anime-preview.tsx` for the live anime-app preview on the Theme screen.
- A new `components/restore-processing-visual.tsx` for the Restore Now processing animation.
- New `lib/ad-settings.ts` for the poison screen's ad config state (added to `useWizardState`).
- Each screen keeps its inline styles (the prototype uses inline styles + the shared `setup-wizard.css` — no per-screen CSS modules except `wizard-progress`).

### 0.5 Red theme for the Poison screen

The poison screen is "forced red-themed." We override the palette on `.device` for the duration of that screen:
- A dedicated red palette (`primary: #e85d5d` — the existing Coral palette already has this; we reuse Coral or define a dedicated "Poison" red palette with a deeper red `#d32f2f` for stronger "danger" feel).
- Set via the same CSS-custom-property mechanism already used for palette switching, but forced (not user-selectable) on this screen.

---

## 1. Dashboard — APK download buttons

### 1.1 Where the APKs come from
- **anime-app APK:** built by `.github/workflows/build-apk.yml`, artifact name `anime-app-apk`, 30-day retention. Downloaded from the repo's **Actions** tab → latest "Build Android APK" run → Artifacts.
- **setup-wizard APK:** built by `.github/workflows/build-setup-wizard-apk.yml`, artifact name `setup-wizard-apk`. (Note: the SetupWizard Kotlin app currently has a pre-existing light-mode color bug in `Theme.kt:104` — `Color(0xFFDF5B0)` 7-hex-digit literal. This does not block the debug APK build but the light-mode `primaryContainer` will be nearly transparent. Flagged separately; not in scope for the prototype redesign, but the APK will still build.)

### 1.2 Download button design
- A clearly-visible button placed **above** each prototype card (in the `show__info--left` block, or as a dedicated row above the `phone`).
- Links to the GitHub Actions workflow runs page for that APK:
  - anime-app: `https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE/actions/workflows/build-apk.yml`
  - setup-wizard: `https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE/actions/workflows/build-setup-wizard-apk.yml`
- (We link to the workflow runs list — the user clicks the latest successful run → Artifacts → downloads the APK. This is the most stable URL; per-run URLs expire.)
- Label: "Download APK" with a download icon. Secondary style (outlined) so it doesn't compete with the "Open prototype" CTA, but clearly visible.
- Only shown for prototypes that HAVE an Android app: **anime-app** and **setup-wizard**. **search-page** has no Android app → no download button.

### 1.3 Info / documentation
- Add a short note near the download button: "APK built by GitHub Actions — download from the latest run's Artifacts."
- Update `Android_app/navigation.md` (already done in the prior rebrand commit) and add a line in the dashboard's help text.

---

## 2. Per-screen implementation plans

### Screen 0 — Welcome (`welcome-screen.tsx`)
**Changes:**
1. Move heading to top-left.
2. Replace `WelcomeVisual` (concentric pulsing rings + orbits — "ugly, bad, out of order") with a **new, beautiful, anime-suited animation**. Concept: a stylized anime "play" mark / app logo with a smooth, premium entrance — soft gradient glow, a single bold play triangle that scales in, gentle floating accent shapes (no busy orbits). Calm and elegant, not chaotic.
3. Add a **list-kind view**: instead of one subtitle paragraph, show a short vertical list of what the setup will cover (e.g. "Theme & colors", "Anime folder", "Permissions", "Restore backup (optional)", "Ad preferences"). Each item: small icon + label, staggered fade-in. This gives the welcome screen substance and sets expectations.
4. Keep "Get Started" CTA → `#theme`.

### Screen 1 — Choose Theme (`theme-screen.tsx`)
**Changes:**
1. Heading top-left.
2. Replace `ThemeVisual` (rotating dots around swatch) with a **mini live anime-app preview** (`components/mini-anime-preview.tsx`): a small phone-shaped frame that auto-cycles through mini representations of: home (trending row), library (grid), search (search bar + results), settings (toggles), anime detail (banner + title), player (video frame with play). Each "screen" auto-scrolls a bit, then transitions to the next on a ~3s cadence. Smooth crossfades. This is the hero of this screen.
3. Theme options below in a **horizontal carousel / single row** (not a 3-col grid). Horizontally scrollable row of palette cards; active one is enlarged/highlighted. Swipe/scroll to see all 6 palettes.
4. Keep the Dark/Light/System mode toggle (top-left, under heading).
5. **More customization options:** add a few extra toggles e.g. "Bold text" (on/off), "Reduced motion" (on/off) — gives the user real customization beyond just palette. (These can be cosmetic in the prototype.)
6. Bold fix applied globally (see 0.3).

### Screen 2 — Select Folder (`folder-screen.tsx`)
**Changes:**
1. Heading top-left.
2. Redesign `FolderVisual`: more detailed folder (subtle gradient, tab, inner file lines), better proportions, smoother float. Less "card explosion" around it.
3. Better **selected mark**: when `folderSelected && !scanning`, show a clean check badge that scales in on the folder corner (already partially there via `selected` prop) — refine the visual (better colors, smoother pop, no jarring jump).
4. Smoother, more beautiful animations overall.
5. Keep the scanning → ready flow + "Continue" CTA.

### Screen 3 — Grant Permissions (`permissions-screen.tsx`)
**Changes:**
1. Heading "Grant Permissions" top-left.
2. Improve `PermissionsVisual` (shield) — calmer, less busy (fewer particles, cleaner ripple).
3. **One-line descriptions** for each permission (currently 2-line). Tighten copy.
4. **Add a 4th permission row: "All files access"** with description "Not needed — leave off" and the toggle **off + disabled** (visually greyed) to communicate it's intentionally not required. This matches the user's "below it you can say that it is not needed."

### Screen 4 — Restore Backup (`restore-screen.tsx`)
**Changes:**
1. Heading "Restore Backup" top-left.
2. **Replace `RestoreVisual` (cloud + data drops)** — user explicitly called it out as bad. New concept: a sleek "backup file" card with a restore-circular-arrow animation (file → rotating restore arrows → check), or an abstract "time-restore" visual. Calm, premium, anime-app appropriate.
3. Keep "Select Backup File" (→ `#format`) and "Skip" (→ `#finish`).

### Screen 5 — Format Not Supported (`format-not-supported-screen.tsx`)
**Changes:**
1. **Keep the animation** (user likes it).
2. Heading "Restore Backup" top-left (currently "Format not supported" — change to "Restore Backup" as the H1, keep "Format not supported" as a sub-label or the warn-colored accent).
3. **Better description:** "This is not the format I was expecting." + new line "Still, I can try to restore from it properly."
4. **File details card** below: name (`anime_backup_2025-01-15.json`), size (`2.3 MB`), format (`JSON (unknown schema)`). More detailed than current.
5. **Rename the button** "Don't worry, restore it" → something more appropriate, e.g. **"Try restoring anyway"** (clearer, less colloquial).

### Screen 6 — Processing Backup (`processing-backup-screen.tsx`)
**Changes:**
1. **Better animation** — replace the spinning rings + file with a more polished "data extraction" visual: a file that unfolds into rows of data being parsed, with a smooth progress feel. Calm and purposeful.
2. Keep auto-advance (~2.5s) → `#summary`.
3. **Navigation fix (cross-screen):** the Cancel button on Backup Summary (`#summary`) currently calls `onBack` → `#processing`. Change it to go to `#format` instead. (Implemented in the summary screen's Cancel handler, documented here.)

### Screen 7 — Backup Summary (`backup-summary-screen.tsx`)
**Changes:**
1. **Full UI redesign** — current is "ugly, bad." New layout: a **list view** of backup-content categories (Anime, Categories, Episodes tracked, History, Settings, Manga) each as a row with an icon + count + label. More like a "what will be restored" manifest. Flexible (easy to add more rows).
2. **Replace `SummaryVisual` (bar chart)** — statistical look is bad. New visual: a calm "inventory/manifest" animation (e.g. a clipboard/stack that fills in) or reuse a refined version of the restore visual.
3. **Manga entries** — keep the red warning but make it a row in the list (Manga: "12 — not supported, will be skipped") rather than a separate ugly red box. Cleaner integration.
4. Buttons: Cancel → `#format` (per Screen 6 fix); Restore → `#linking`.

### Screen 8 — Linking Anime (`linking-anime-screen.tsx`)
**Changes:**
1. **Top heading "Backup Restore"** (top-left).
2. **Sub-heading "Linking anime"** below it.
3. **Status line "Matching your backup entries"** (drop "to AniList").
4. **Four stat headings at top: Linked · No match · Total · Remaining** (Remaining = Total − processed so far, animates as the progressive reveal runs).
5. **List fills the available space** — remove the `maxHeight: 200` constraint with empty space around; let it flex to fill.
6. **Two-section list rows:**
   - **Left half:** anime name (wraps to 2 lines if needed, `word-break: break-word`).
   - **Middle:** status marker SVG (green check for linked, red x / dash for no-match).
   - **Right:** cover thumbnail **only for linked** entries (a colored gradient placeholder with the first letter, since we have no real images in the prototype — or a small poster-shaped gradient).
7. **Click a linked entry → popup** (modal/bottom-sheet) with option "Mark as not linked" → calls a new `unlinkAnime(id)` action (add to `useWizardState`). Popup also has "Cancel".
8. Keep progressive reveal animation (it's good).
9. Next → `#manual`.

### Screen 9 — Manual Linking (`manual-linking-screen.tsx`)
**Changes:**
1. **Top heading "Restore Backup"** (top-left).
2. **Sub-heading "Manual linking"** + a little options line (e.g. "Tap an unlinked anime to search").
3. **Beautiful search page** — redesign the search overlay into a polished full-screen search UI: nice search bar with icon, animated result cards with poster thumbnails (gradient placeholders), smooth transitions, clear "Link" affordance. Current is "bad."
4. Keep the link flow (tap unlinked → search → pick result → `onLink`).
5. Continue → `#restore-summary`.

### Screen 10 — Restore Summary (`restore-summary-screen.tsx`)
**Changes:**
1. **Top heading "Restore Backup"** (top-left).
2. **Custom M3 Expressive layout** — not the basic stat grid. Use a more designed layout: a hero "ready to restore" card with the counts as elegant inline stats, a summary list, and a prominent Restore Now CTA.
3. Fix the "Manually linked" stat misnomer (currently shows unlinkedCount).
4. Restore Now → `#restore-processing` (NEW).

### Screen 11 — Restore Processing (NEW, `restore-processing-screen.tsx`)
**New screen.** Sits between Restore Summary and Restore Successful.
1. **Processing animation** — a proper restore-in-progress visual (e.g. a circular progress with anime icons flowing into a library icon, or a "writing to library" animation). Not static.
2. Auto-advance (~3s) → `#restore-success`.
3. Shows a status line "Restoring your library…".

### Screen 12 — Restore Successful (`restore-successful-screen.tsx`)
**Changes:**
1. Keep the success animation (refine if needed).
2. **Show restore statistics:** "X anime restored · Y episodes · Z categories" — proper numbers, not just one number.
3. Heading top-left.
4. Continue → `#poison` (was → finish).

### Screen 13 — Choose Your Poison (NEW, `poison-screen.tsx`)
**New screen, red-themed, possibly multi-step.**
1. **Forced red palette** on `.device` for this screen.
2. **Heading "Choose Your Poison"** (one line, top-left).
3. Intro: "Ads keep the app free. Let's make them non-intrusive — pick your daily dose."
4. **Multi-step within the screen** (sub-state, same `#poison` route):
   - **Step A — Name:** pick "Daily dose of poison" or "Daily dose of pills" (segmented control).
   - **Step B — Frequency:** pick 1 / 2 / 3 ads per day (segmented or slider).
   - **Step C — Timing:** pick when ads show — "On app open" / "On episode start" / "Both" (segmented or chips).
5. A summary line updates live based on selections.
6. Confirm → `#finish`.
7. Ad settings persisted in `useWizardState` (new `adSettings` field).

### Screen 14 — Setup Complete / Finish (`finish-screen.tsx`)
**Changes:**
1. **Redesign the animation completely** — current `WelcomeVisual` reuse + celebration is "ugly, bad." New concept: a clean, premium "all set" visual — a single bold check-in-circle that draws smoothly, with subtle confetti (refined, not chaotic), calm gradient glow. Less is more.
2. **Remove the "API URL" card** entirely.
3. **Fix the green rectangle bug** — the green rectangle is the `finish-badge` background (`${palette.primary}22` on lime = greenish) overlapping the URL card. Removing the URL card + restyling the badge fixes it.
4. **Show some info** (not minimal): a short summary of what was configured (theme, folder, ads) as a small list — gives the screen substance.
5. "Start Exploring" → restart → `#welcome`.

---

## 3. New / changed files summary

### New files
- `src/prototypes/setup-wizard/components/mini-anime-preview.tsx` — live anime-app preview for Theme screen.
- `src/prototypes/setup-wizard/components/restore-processing-visual.tsx` — restore-now processing visual.
- `src/prototypes/setup-wizard/screens/restore-processing-screen.tsx` — NEW screen (#restore-processing).
- `src/prototypes/setup-wizard/screens/poison-screen.tsx` — NEW screen (#poison).
- `src/prototypes/setup-wizard/lib/ad-settings.ts` — ad config types + defaults.

### Changed files
- `app/prototypes/setup-wizard/page.tsx` — hash router (replace integer step).
- `src/prototypes/setup-wizard/hooks/use-wizard-state.ts` — drop `step`, add `adSettings`, `unlinkAnime`, route-aware `go`/`goBack`.
- `src/prototypes/setup-wizard/setup-wizard.css` — top-left headings, layout tweaks, new components styling, bold-rendering fix.
- `src/prototypes/setup-wizard/components/visuals.tsx` — replace/add several visuals (Welcome, Theme replaced by mini-preview, Restore, Processing, Summary, Finish).
- All 13 existing screen files — per-screen changes above.
- `app/page.tsx` — dashboard APK download buttons.

### Not changed (out of scope)
- `app/prototypes/anime-app/**`, `src/prototypes/anime-app/**` — no changes (it's the reference, not the target).
- `app/prototypes/search-page/**`, `src/prototypes/search-page/**` — no changes.
- `src/proto-kit/**` — no changes (shared design system; the bold-fix is in `tokens.css` which is part of proto-kit — minimal, additive change only).

---

## 4. Verification strategy

1. **Local build** (`npm install && npm run build`) before every push — catches TypeScript/JSX errors.
2. **Push to `main`** → GitHub Actions deploys to Pages.
3. **Verify on live URL** (`https://testplay-byte.github.io/ANIKUTA-DESIGN-PROTOTYPE/prototypes/setup-wizard/`) — curl + Agent Browser per screen.
4. **Checklist** (`checklist.md`) updated per screen as it's verified.
5. **No APK builds** triggered (path filters `Android_app/**` unchanged).

---

## 5. Execution order

Phases (matching the todo list):
- Phase 2: Dashboard download buttons (independent, quick win).
- Phase 3: Hash-routing architecture (foundation for all screen work).
- Phase 0.3: Bold-rendering global fix (foundation).
- Phases 4–17: Per-screen, in route order (welcome → theme → folder → permissions → restore → format → processing → summary → linking → manual → restore-summary → restore-processing → restore-success → poison → finish).
- Phase 18: Local build.
- Phase 19: Push + live verify.
- Phase 20: Final checklist + worklog.

Each phase: implement → local-build-check → commit → (batch push at logical milestones) → live verify.
