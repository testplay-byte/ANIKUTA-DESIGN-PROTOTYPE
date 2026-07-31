# Task UIFIX2-A — Flutter wizard screen v2 UI fixes

**Agent:** full-stack-developer
**Scope:** 5 Flutter screens in `/home/z/my-project/flutter_app/lib/screens/`
**Goal:** Wire up the newly recreated v2 visuals (`wizard_visuals.dart`) and apply screen-specific layout fixes to address user complaints about overlapping layout, too-small preview, and bad animations.

## Files modified
1. `lib/screens/welcome_screen.dart` — overlap fix + compact cards + new WelcomeVisual signature
2. `lib/screens/theme_screen.dart` — bigger animated MiniAnimePreview (200)
3. `lib/screens/folder_screen.dart` — FolderVisual size 180 → 190
4. `lib/screens/permissions_screen.dart` — NO EDITS (already spec-compliant)
5. `lib/screens/restore_screen.dart` — RestoreVisual size 150 → 160

## What was done per file

### 1. welcome_screen.dart — overlap fix
User complaint: "the bottom section (Track what you watch...) is overlapping on top of the animation and the animation itself is not good."

Fixes:
- Added `centerContent: false` to `WizardScaffold` (content starts at top, no vertical centering → cards can't overlap the visual).
- `WelcomeVisual` call updated to NEW signature: added `surface: Colors.transparent`, size 160 → **150**.
- Subtitle "Let's get things quickly set up for you.": fontSize 16 → **14**, added explicit `FontWeight.w400` (Inter-Regular).
- `_DetailCard` made compact (~52px tall):
  - Padding `EdgeInsets.all(14)` → `EdgeInsets.symmetric(horizontal: 14, vertical: 10)`.
  - Icon container 36×36 → **32×32**, radius 10 → **8**.
  - Title fontSize 16 → **14** (w700 Inter-Bold kept).
- Layout in body (top to bottom): subtitle (14px Inter w400, muted, left-aligned) → SizedBox(16) → Center(WelcomeVisual 150) → SizedBox(20) → 3 compact cards.
- Total height: 3 cards × ~52 + visual 150 + subtitle 14 + gaps ≈ 360px — fits a normal phone without scrolling.

### 2. theme_screen.dart — bigger animated preview
User complaint: "the mini live preview was kind of not proper and it was actually not animated. It needs to be a bit bigger."

Fixes:
- `MiniAnimePreview` `height: 180` → **200** (the v2 preview now uses slide+fade transitions cycling every 2.2s with a screen label below — bigger size makes it the visible hero).
- Mode toggle, palette carousel (72×96 cards), and Inter bindings kept as-is.

### 3. folder_screen.dart — use NEW detailed folder visual
User complaint: "the animation is way too bad. I need you to recreate it as a highly detailed folder animation which looks beautiful, minimalistic, yet good."

Fixes:
- `FolderVisual` size 180 → **190** (per spec).
- Constructor call already matches NEW signature (`primary/surface3/surface4/surface5/background/selected/size`). Verified all params wired correctly.
- `centerContent: true` (scaffold default) — kept (visual centers vertically).
- Scanning state logic + mock-card + Inter bindings kept as-is.
- The NEW FolderVisual (gradient folder body, floating file cards, content lines, check badge) is picked up automatically — no signature change needed.

### 4. permissions_screen.dart — NO EDITS (already spec-compliant)
User complaint: "the animation is very bad. It needs to be much much much better."

The existing call already matches the NEW signature and spec exactly:
```dart
PermissionsVisual(
  primary: cs.primary,
  onPrimary: cs.onPrimary,
  size: 140,
)
```
The recreated v2 visual (drawing check + expanding ripple rings) is picked up automatically. All 4 permission rows already have `fontFamily: kFontFamily` on both title (w700 Inter-Bold) and description (w400 Inter-Regular). No edits needed.

### 5. restore_screen.dart — use NEW restore visual
User complaint: "the actual animation is not good. Pick a much more suitable, proper, manageable animation."

Fixes:
- `RestoreVisual` size 150 → **160** (per spec).
- Constructor call already matches NEW signature (`primary/onPrimary/surface/size`). Verified.
- "Select Backup File" `SelectButton` + "Skip" `PillButton.ghost` kept as-is.
- No inline TextStyles in this file — all text goes through `WizardScaffold` which already applies `kFontFamily`. Did not add unused `app_theme.dart` import (would trigger lint).

## Verification
- No `flutter analyze` run locally (no Flutter SDK available per task instructions — CI will validate).
- All edits are minimal targeted changes; no navigation, state, or controller logic touched.
- All `TextStyle` constructors retain `fontFamily: kFontFamily`.
- No `print`, no test code, no `const` removed.

## Summary tally
- 4 of 5 files edited (permissions was already spec-compliant).
- 1 layout fix (welcome: `centerContent: false` + compact 52px cards).
- 3 visual size fixes (theme 180→200, folder 180→190, restore 150→160).
- 1 visual size fix (welcome 160→150, smaller to fit alongside cards without overlap).
- 1 NEW param wired (welcome: `surface: Colors.transparent`).
- 2 TextStyle adjustments (welcome subtitle 16→14 + explicit w400; welcome card title 16→14).
- 0 changes to WizardScaffold API, navigation, state, or controllers.
- 0 changes to permissions_screen.dart.
