# REBUILD-A — full-stack-developer

**Task:** Rebuild 5 Flutter setup-wizard screens (steps 0–4) to match the web prototype exactly, using the redesigned WizardScaffold API.

**Scope:** 5 screen files (overwrite) + 1 minimal foundation fix.

## Files written

| File | Step | Class | State |
|------|------|-------|-------|
| `lib/screens/welcome_screen.dart` | 0/15 | `WelcomeScreen` | StatelessWidget |
| `lib/screens/theme_screen.dart` | 1/15 | `ThemeScreen` | StatelessWidget |
| `lib/screens/folder_screen.dart` | 2/15 | `FolderScreen` | StatefulWidget (`_scanning` + `Timer`) |
| `lib/screens/permissions_screen.dart` | 3/15 | `PermissionsScreen` | StatelessWidget |
| `lib/screens/restore_screen.dart` | 4/15 | `RestoreScreen` | StatelessWidget |

## Foundation fix (necessary)

### Fix 1: `lib/theme/palettes.dart` — missing `primary` / `onPrimary`

`palettes.dart` was missing `primary` and `onPrimary` even though the already-redesigned `wizard_scaffold.dart` (uncommitted in working tree) references `palette.primary` and `palette.onPrimary`. Without this fix, the scaffold and every screen importing it would fail to compile.

**Change to `palettes.dart`:**
- Added `final Color onPrimary;` field + `required this.onPrimary` in constructor.
- Added `Color get primary => seed;` getter (primary === seed in the web prototype's `lib/themes.ts`; named `primary` for parity with `palette.primary`).
- Populated `onPrimary` for all 6 palettes matching `lib/themes.ts`:
  - lime → `Color(0xFF0a1a00)` (dark — bright primary needs dark text)
  - teal, purple, coral, forest, amber → `Color(0xFFFFFFFF)` (white)
- `seed` unchanged → `app_theme.dart`'s `ColorScheme.fromSeed(seedColor: palette.seed)` still works.
- `kDefaultPalette` and `kPalettes` remain `const`.

### Fix 2: `lib/widgets/wizard_scaffold.dart` — `onPrimary` parameter shadowing field (compile error)

The palettes.dart fix exposed a pre-existing compile error in `wizard_scaffold.dart`'s `_buildActions` method. The method signature was:

```dart
Widget _buildActions(
    Color primary, Color onPrimary, Color onText, Color surface3, Color surface4)
```

The Color parameter `onPrimary` **shadowed** the `WizardScaffold.onPrimary` field (`VoidCallback?`). So on line 198:

```dart
onTap: primaryEnabled ? onPrimary : null,   // onPrimary = Color, NOT the callback!
```

…was passing a `Color?` where `VoidCallback?` was expected — a hard compile error (`argument_type_not_assignable`). The same shadowing also caused `hasPrimary`'s `onPrimary != null` check to always be true (unnecessary_null_comparison warning), since the Color parameter is never null.

**Fix:** renamed the Color parameter to `onPrimaryColor`. Now `onPrimary` in the method body correctly refers to the field (the callback):
- Line 172: `primaryButton != null || (primaryLabel != null && onPrimary != null)` → `onPrimary` = field (callback) ✓
- Line 198: `onTap: primaryEnabled ? onPrimary : null` → `onPrimary` = field (callback) ✓
- Line 200: `onPrimary: onPrimaryColor` → passes the Color to `PillButton.primary.onPrimary` ✓

Also cleaned up two warnings the scaffold was carrying:
- Removed unused `import '../theme/palettes.dart';` (palette is accessed via transitive type visibility from `wizard_controller.dart`).
- Removed unused `final surface2 = ...` local variable (declared but never read; `surface3`/`surface4` are still used).

Both fixes are purely additive/internal — no public API change. `WizardScaffold`'s field set and `PillButton`'s constructors are unchanged, so REBUILD-B's and REBUILD-C's screens are unaffected.

## API used (per task spec)

```dart
WizardScaffold(
  pageHeading: '...',           // 30px w800, palette.primary, top-left  (36px if xlHeading: true)
  xlHeading: true,              // welcome only
  visual: SomeVisual(...),      // 200×200 centered (welcome puts visual in body instead)
  descriptiveTitle: '...',      // 22px w700 centered
  subtitle: '...',              // 13px muted centered
  body: SizedBox(width: double.infinity, child: Column(...)),  // stretch to fill scaffold content width
  backLabel: 'Back', onBack: () => WizardNav.back(context),
  primaryLabel: 'Next',  onPrimary: () => WizardNav.next(context, currentIndex: N),
  primaryButton: PillButton.ghost(...),  // override primary (folder scanning, restore skip)
  stepIndex: N, stepTotal: kStepTotal,   // 15
)
```

Color sources per task examples:
- `cs.primary` / `cs.onPrimary` for primary colors (visuals, icons, accents) — M3-derived from `palette.seed`.
- `palette.surface2/3/4/5` for dark-theme surfaces (raw hex, matches web).
- `cs.surface` / `cs.surfaceContainerHighest` / `cs.surfaceContainerHigh` for light-theme surfaces.
- `cs.primaryContainer` / `cs.onPrimaryContainer` for the folder mock-card icon square (M3-derived; close to web's `primaryContainerDark` in dark mode).

## Per-screen notes

### 0 — Welcome
- `pageHeading: 'Welcome to Anime App!'`, `xlHeading: true`.
- Subtitle + visual + list all live in `body` (NOT the scaffold's visual/descriptiveTitle/subtitle slots) so the order matches the web: heading → subtitle → visual → list. The scaffold would otherwise order them visual → descriptiveTitle → subtitle.
- Subtitle `"Let's get things quickly set up for you."` is 16px muted, left-aligned (NOT centered — wrapped in `Align(centerLeft)`).
- 3 detail cards staggered with `_StaggeredItem` (StatefulWidget, 120+idx*90 ms delay, 420 ms duration, fade + slide-up `Offset(0,0.18)→zero`).
- Card spec: surface2 bg, rounded 14, padding 14, 36×36 tinted icon square (primary@0.16 bg, primary icon size 18), 16px w700 title.
- Icons: `Icons.check_circle_outline`, `Icons.refresh`, `Icons.notifications_outlined`.
- Primary: 'Get Started' → `WizardNav.next(context, currentIndex: 0)`. No back button.

### 1 — Theme
- `pageHeading: 'Theme'`.
- Visual: `MiniAnimePreview(primary: cs.primary, onPrimary: cs.onPrimary, surface: isDark ? palette.surface2 : cs.surface, onSurface: cs.onSurface, surfaceVariant: cs.surfaceContainerHighest, height: 240)`.
- `descriptiveTitle: 'Choose your theme'`, `subtitle: 'Pick a mode and a color and we are set with it.'`.
- Mode toggle: surface2 Container, 4px padding, 3 equal `Expanded` buttons. Active = primary bg + onPrimary text. Inactive = transparent + muted. Icons: `nightlight_round` (Dark), `wb_sunny_outlined` (Light), `laptop` (System). Uses `ThemeModePref.values` and `themeModeLabel`.
- Palette carousel: `SingleChildScrollView(horizontal)` with 8px top padding (so the active-card check badge at `top: -6` isn't clipped). 6 cards 80×100. Swatch 80×72, `borderRadius.vertical(top: Radius.circular(16))`, `LinearGradient([seed, seed@0.67])`. Active: 2.5px primary border + 22×22 primary check badge (white check, scaffoldBg 2px border) at `Positioned(top: -6, right: -6)` with `Stack(clipBehavior: Clip.none)`. Name 12px w700 (active=primary, inactive=muted). On tap: `controller.setPalette(p)`.

### 2 — Folder
- `StatefulWidget` with `bool _scanning` + `Timer? _timer`.
- `_handleSelectFolder`: `controller.setFolderSelected(true)` → `setState(_scanning = true)` → 1500 ms `Timer` → `setState(_scanning = false)`. Uses `context.read<WizardController>()` (one-shot, no listener).
- `showSelected = folderSelected && !_scanning` (drives `FolderVisual.selected`).
- 3-state subtitle (exact web text):
  - `!folderSelected` → `"Pick the folder where your anime library lives. We'll scan it and organize everything for you."`
  - `folderSelected && _scanning` → `'Scanning your library…'`
  - `folderSelected && !_scanning` → `'Your library is ready to go. Continue when you are.'`
- `descriptiveTitle`: `'Folder connected!'` when selected, else `'Select your anime folder'`.
- Body: `SelectButton` (when empty) or `_FolderMockCard` (when selected). Mock card: surface2 bg, 1.5px primary border, 44×44 `cs.primaryContainer` icon square with `cs.onPrimaryContainer` `Icons.folder` (size 24), title '/storage/anime-library' 14px w700, desc '247 items · ready' or 'Scanning…' 12px muted, trailing: scanning → pill with `_ScanningDots` (3 phase-offset pulsing dots on 1200 ms loop) + 'Scanning' label; ready → 28×28 primary circle with white `Icons.check` (size 18).
- Primary action: if `_scanning` → `PillButton.ghost(label: 'Scanning…', onTap: null, onText: onText)`; else → `Opacity(opacity: folderSelected ? 1.0 : 0.4, child: PillButton.primary(label: 'Continue', onTap: folderSelected ? next : null, ...))` — matches web's `opacity: folderSelected ? 1 : 0.4` disabled styling.

### 3 — Permissions
- `pageHeading: 'Permissions'`. Visual: `PermissionsVisual(primary: cs.primary, onPrimary: cs.onPrimary, size: 140)`.
- `descriptiveTitle: 'Grant permissions'`, `subtitle: 'Optional: you can skip these'`.
- 4 `_PermRow`s in a stagger (100+idx*100 ms delay, 400 ms duration, slide-in-left `Offset(-0.15,0)→zero`).
- Row spec: surface2 bg, rounded 14, padding 10/14, 36×36 icon square (on → primary bg + onPrimary icon; off → primary@0.16 bg + primary icon), title 15px w700, desc 11px muted single-line ellipsis, `Switch` (activeTrackColor=primary, inactiveTrackColor=surface4, thumbColor resolves onPrimary when selected else white, trackOutlineColor transparent).
- Rows (exact web text):
  1. `Icons.install_mobile` — 'Install apps' — 'Allow installing anime extensions' — key `'installApps'`
  2. `Icons.notifications_outlined` — 'Notifications' — 'Get notified about new episodes' — key `'notifications'`
  3. `Icons.battery_full` — 'Battery' — 'Allow background sync for updates' — key `'battery'`
  4. `Icons.folder_outlined` — 'All files access' — 'Access all files on your device' — DISABLED (`enabled: false` → `onChanged: null` + `Opacity(0.55)`). The controller's `togglePermission('allFilesAccess')` is a no-op anyway, but the row is non-interactive to match the web.
- Rows 1–3 `onChanged: (_) => controller.togglePermission(key)`.

### 4 — Restore
- `pageHeading: 'Restore Backup'`.
- Visual: `RestoreVisual(primary: cs.primary, onPrimary: cs.onPrimary, surface: isDark ? palette.surface2 : cs.surface, size: 180)`.
- `descriptiveTitle: 'Restore backup'`, `subtitle: 'Got a backup from a previous install? Restore your library, history, and settings in one tap.'`.
- Body: `Center(SelectButton(label: 'Select Backup File', icon: Icons.file_download_outlined, primary: cs.primary, onTap: () { controller.setBackupSelected(true); WizardNav.next(context, currentIndex: 4); }))`.
- Back → `WizardNav.back`. Primary overridden with `PillButton.ghost(label: 'Skip', onTap: () => WizardNav.skipToFinish(context), onText: onText)`.

## Verification

- `flutter analyze` could not be run locally (no Flutter SDK in this sandbox). CI runs Flutter 3.24.0 (`build-flutter-apk.yml`).
- Manually verified API compatibility with Flutter 3.24.0:
  - `WidgetStateProperty` / `WidgetState.selected` (renamed from `MaterialState*` in 3.22) ✓
  - `ColorScheme.surfaceContainerHigh` / `surfaceContainerHighest` (added 3.22) ✓ — also used by `wizard_scaffold.dart` and other existing screens
  - `Switch.activeTrackColor` / `inactiveTrackColor` / `thumbColor` (WidgetStateProperty) / `trackOutlineColor` ✓
  - `Icons.check_circle_outline`, `install_mobile`, `wb_sunny_outlined`, `nightlight_round`, `laptop`, `file_download_outlined` all exist ✓
- Type-inference check: screens that access `palette.surface2/3/4/5` without explicitly importing `palettes.dart` still compile, because `WizardPalette` is transitively visible via `wizard_controller.dart` (which imports `palettes.dart`). `welcome_screen.dart` and `theme_screen.dart` import `palettes.dart` explicitly; `folder_screen.dart`, `permissions_screen.dart`, `restore_screen.dart` rely on transitive visibility (matches Dart convention — no analyzer warning).

## What downstream agents should know

- **`palettes.dart` now has `primary` (getter = `seed`) and `onPrimary` (field).** Any screen that needs the raw web-matching primary color should use `palette.primary` (= `palette.seed`). For M3-derived primary (tonal), use `cs.primary`. The redesigned `WizardScaffold` uses `palette.primary` for the heading, progress bar, and primary pill button.
- The `WizardScaffold` orders content as: `pageHeading` → `visual` → `descriptiveTitle` → `subtitle` → `body` → actions. If a screen needs a different order (like welcome did), put everything in `body` and pass only `pageHeading` (+ optionally `xlHeading`).
- Wrap `body` in `SizedBox(width: double.infinity, child: Column(crossAxisAlignment: stretch, ...))` if the body needs to fill the scaffold's content width (the scaffold's content Column uses `crossAxisAlignment.center`, which would otherwise shrink-wrap a stretch Column).
- `PillButton.ghost` is transparent with muted text — use it for "Skip"-style actions via the `primaryButton` parameter (overrides `primaryLabel`/`onPrimary`).
- To dim a disabled primary button to 0.4 opacity (matching web), wrap `PillButton.primary` in `Opacity(opacity: 0.4, ...)` and pass it as `primaryButton` (the scaffold's `primaryEnabled` only nulls the `onTap`; it doesn't apply opacity).
- The remaining 10 screens (steps 5–14) still need rebuilding: format, processing, summary, linking, manual, restore_summary, restore_processing, restore_success, poison, finish. The `palettes.dart` fix unblocks all of them.
