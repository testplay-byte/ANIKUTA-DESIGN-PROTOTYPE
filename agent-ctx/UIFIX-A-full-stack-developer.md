# Task UIFIX-A — Flutter wizard screen UI/font fixes

**Agent:** full-stack-developer
**Scope:** 5 Flutter screens in `/home/z/my-project/flutter_app/lib/screens/`
**Goal:** Explicitly bind every inline `TextStyle(...)` to Inter (`kFontFamily`) so bold weights (700/800/900) resolve to the bundled Inter-Bold/ExtraBold/Black glyph files (not Roboto fake-bold), and apply screen-specific layout fixes.

## Files modified
1. `lib/screens/welcome_screen.dart`
2. `lib/screens/theme_screen.dart`
3. `lib/screens/folder_screen.dart`
4. `lib/screens/permissions_screen.dart`
5. `lib/screens/restore_screen.dart`

## What was done per file

### 1. welcome_screen.dart
- Added `import '../theme/app_theme.dart';`.
- `WelcomeVisual` size: 180 → **160** (per spec — visual not too big).
- Added `fontFamily: kFontFamily` to 2 inline `TextStyle` constructors:
  - "Let's get things quickly set up for you." subtitle (fontSize 16).
  - Feature-card title (fontSize 16, FontWeight.w700 → Inter-Bold).
- The "Welcome to Anime App!" heading is rendered via `WizardScaffold.pageHeading` + `xlHeading: true`; the scaffold already applies `fontFamily: kFontFamily, fontWeight: FontWeight.w800` (Inter-ExtraBold), so the w800 requirement is satisfied with no further edits.

### 2. theme_screen.dart — CRITICAL layout fix
- Added `import '../theme/app_theme.dart';`.
- `MiniAnimePreview` `height: 240` → **180** (was pushing palette carousel off-screen).
- Palette carousel cards resized **80×100 → 72×96**:
  - Outer SizedBox: 80×100 → 72×96.
  - Inner swatch Container width 80 → 72 (height kept 72, fits 96 = 72+8+12).
  - Active-state check badge 22 → 20, icon 14 → 12.
  - Top-corner radius 16 → 14.
  - Label fontSize 12 / fontWeight w700 unchanged.
- Mode toggle verified compact (~44px): outer padding 4 + per-button vertical padding 10 + 14px icon/13px label row ≈ 44px. No change needed beyond fontFamily.
- Added `fontFamily: kFontFamily` to 2 inline `TextStyle` constructors:
  - Mode-button label (fontSize 13, w700 → Inter-Bold).
  - Palette name label (fontSize 12, w700 → Inter-Bold).

### 3. folder_screen.dart
- Added `import '../theme/app_theme.dart';`.
- `centerContent: true` is the WizardScaffold default — no API call change needed.
- `FolderVisual` size 180 — kept.
- Added `fontFamily: kFontFamily` to 3 inline `TextStyle` constructors:
  - "/storage/anime-library" (fontSize 14, w700 → Inter-Bold).
  - "Scanning… / 247 items · ready" (fontSize 12, regular → Inter-Regular).
  - "Scanning" pill label (fontSize 11, w700 → Inter-Bold).

### 4. permissions_screen.dart
- Added `import '../theme/app_theme.dart';`.
- Rows already compact (~58-64px): icon container 36×36 + column (15+2+11 ≈ 28px) inside Container with vertical padding 10+10 + 10px margin. No padding change needed.
- Added `fontFamily: kFontFamily` to 2 inline `TextStyle` constructors:
  - Permission-row title (fontSize 15, FontWeight.w700 → Inter-Bold).
  - Permission-row description (fontSize 11, **explicitly** added FontWeight.w400 → Inter-Regular; previously weight was implicit default which can resolve to fake-regular on some devices).

### 5. restore_screen.dart
- Did **NOT** add `import '../theme/app_theme.dart';` because the file contains zero inline `TextStyle(...)` constructors — all text (`pageHeading` "Restore Backup", `descriptiveTitle` "Restore backup", `subtitle`) is rendered through `WizardScaffold`, which already applies `fontFamily: kFontFamily`. Adding an unused import would trigger a flutter_lints `unused_import` warning.
- `RestoreVisual` size: 180 → **150** (per spec).
- "Make sure text uses Inter font" requirement satisfied via WizardScaffold's already-correct Inter bindings.

## Verification

```bash
export PATH="/home/z/flutter/bin:$PATH"
cd /home/z/my-project/flutter_app && flutter analyze
```

Result: **`No issues found! (ran in 1.7s)`** — 0 errors, 0 warnings, 0 lints.

## Summary tally
- 5 files edited.
- 9 inline `TextStyle` constructors got `fontFamily: kFontFamily` added across 4 files (welcome×2, theme×2, folder×3, permissions×2).
- 1 explicit `FontWeight.w400` added to permission-row description.
- 4 layout/size fixes:
  - WelcomeVisual 180 → 160.
  - MiniAnimePreview height 240 → 180.
  - Palette cards 80×100 → 72×96 (+ proportional badge/radius scale-down).
  - RestoreVisual size 180 → 150.
- 0 changes to WizardScaffold API calls (`centerContent` left at default `true`).
- 0 changes to state, controllers, navigation, or text content.
- flutter analyze: **0 issues**.
