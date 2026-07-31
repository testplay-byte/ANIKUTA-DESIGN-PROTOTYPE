# REBUILD-B Worklog — full-stack-developer

## Task
REBUILD 5 Flutter screens (steps 5–9) to exactly match the web prototype, using the new `WizardScaffold` API (`pageHeading` / `visual` / `descriptiveTitle` / `subtitle` / `body` / `backLabel` / `onBack` / `primaryLabel` / `onPrimary` / `primaryButton` / `primaryEnabled` / `stepIndex` / `stepTotal` / `scrollable`).

## Files rebuilt (write_file → OVERWRITE)
1. `flutter_app/lib/screens/format_screen.dart` — `FormatScreen` (step 5)
2. `flutter_app/lib/screens/processing_screen.dart` — `ProcessingScreen` (step 6, auto-advance 2.5s)
3. `flutter_app/lib/screens/summary_screen.dart` — `SummaryScreen` (step 7)
4. `flutter_app/lib/screens/linking_screen.dart` — `LinkingScreen` (step 8)
5. `flutter_app/lib/screens/manual_screen.dart` — `ManualScreen` (step 9)

## What each screen does

### Screen 5 — Format (`format_screen.dart`)
- StatelessWidget.
- `pageHeading: 'Restore Backup'`, no `descriptiveTitle` (message lives in body).
- `visual: FormatVisual(primary: cs.primary, onPrimary: cs.onPrimary, size: 180)` — kept the file+warning-triangle custom painter animation from the original.
- Body: 2-line message (`16/w600/onText` + `15/w500/muted`) → `SizedBox(20)` → file details card.
- File card: `surface2` bg, `rounded 16`, border `primary.withOpacity(0.27)`, padding 16, 3 rows (Name / Size / Format from `kBackupFile`) separated by `Divider`.
- Each row: label `13/w600 onText.withOpacity(0.55)` (left), value `14/w600 onText` (right).
- Actions: Back (secondary pill) → `WizardNav.back(context)`; "Try restoring anyway" (primary pill) → `WizardNav.next(context, currentIndex: 5)`.

### Screen 6 — Processing (`processing_screen.dart`) — AUTO-ADVANCE
- StatefulWidget. `initState` schedules `WidgetsBinding.instance.addPostFrameCallback((_) { Future.delayed(Duration(milliseconds: 2500), () { if (!mounted) return; WizardNav.next(context, currentIndex: 6); }); });`.
- `pageHeading: 'Restore Backup'`, `descriptiveTitle: 'Processing backup'`, `subtitle: 'Reading your backup file and extracting data…'`.
- `visual: ProcessingVisual(primary: cs.primary, surface: isDark ? palette.surface2 : cs.surface, size: 180)`.
- Body: centered "scanning pill" — `Container` with `primary.withOpacity(0.13)` bg, `rounded 999`, padding `8/14`, `Row` of `_ScanningDots(primary)` + `Text('Processing', 13/w700 primary)`.
- `_ScanningDots` is a StatefulWidget with a 1200ms repeating `AnimationController`; 3 circles phase-offset by 1/3 cycle, triangular pulse opacity 0.35→1.0.
- `primaryButton: PillButton.ghost(label: 'Please wait…', onTap: null, onText: onText)`. No back button. (`GhostButton` referenced in the spec maps to the existing `PillButton.ghost` constructor — same signature, identical visual behavior.)
- `scrollable: false`.

### Screen 7 — Summary (`summary_screen.dart`)
- StatefulWidget to host the stagger animation.
- `pageHeading: 'Restore Backup'`, `descriptiveTitle: 'Backup summary'`, no subtitle.
- `visual: ProcessingVisual(primary: cs.primary, surface: isDark ? palette.surface2 : cs.surface, size: 120)`.
- 6 summary rows (held as a `const _items` list of `_SummaryItem`):
  1. `Icons.video_library_outlined` — 'Anime detected' — 'Ready to restore' — '247'
  2. `Icons.category_outlined` — 'Categories' — 'Watching, Completed, Plan…' — '12'
  3. `Icons.play_circle_outline` — 'Episodes tracked' — 'Progress + timestamps' — '1,432'
  4. `Icons.history` — 'Watch history' — 'Recently viewed' — '89'
  5. `Icons.settings_outlined` — 'Settings' — 'Theme, display, data' — '—'
  6. `Icons.book_outlined` — 'Manga entries' — 'Not supported — will be skipped' — '12' (warn: cs.error for icon/value, error border)
- Each row: `Container surface2` bg, `rounded 14`, padding 14. `Row`: 38×38 rounded-10 icon square (`accent.withOpacity(0.16)` bg, `accent` icon, 18px) → `Expanded` Column(label 15/w700 onText + meta 12/w600 muted) → value 16/w800 accent.
- Stagger: single 800ms `AnimationController` + `Interval(start: i*80/800, end: (i*80+400)/800)`. Each row wrapped in `SlideTransition(Offset(0, 0.08)→0) + FadeTransition`.
- Actions: "Cancel" (secondary) → `WizardNav.cancelToFormat(context)`; "Restore" (primary) → `WizardNav.next(context, currentIndex: 7)`.

### Screen 8 — Linking (`linking_screen.dart`)
- StatefulWidget. `initState` starts a `Timer.periodic(400ms)` that increments `_revealedCount` until it equals `controller.totalAnime`, then cancels. `dispose` cancels the timer.
- `pageHeading: 'Backup Restore'`, no visual, `descriptiveTitle: 'Linking anime'`, `subtitle: 'Matching your backup entries'`.
- `scrollable: false`.
- Body: 4-stat `Row` (Linked / No match / Total / Remaining) using `controller.linkedCount`, `controller.unlinkedCount`, `controller.totalAnime`, `max(0, total - _revealedCount)`. Each `_Stat`: `primary.withOpacity(0.08)` bg, `rounded 14`, padding `14/12`, big number (28/w800 primary) + label (12/w600 muted).
- `SizedBox(12)` then `Expanded(ListView.builder)` of `controller.linkedAnime` with progressive reveal (each row fades+slides in via `AnimatedOpacity` + `AnimatedSlide` when `i < _revealedCount`).
- Each `_AnimeRow`: `Container surface2` bg, `rounded 14`, padding `10/12`. `Row`: `Expanded(flex 2)` Column(backupName 14/w600 onText maxLines 2 + optional matchedName Row with check icon 14px primary + matchedName 12/w500 muted) → marker icon 22px (`Icons.check_circle` primary if linked, `Icons.remove_circle_outline` cs.error if not) → `Expanded(flex 1)` (linked: 44×60 gradient poster with first letter 18/w800 white; unlinked: `SizedBox`).
- Tapping a linked row opens `showModalBottomSheet` with: 'Linked entry' eyebrow, the backupName, a description, a surface2 card showing the matched name with a link icon, and two buttons: 'Keep linked' (secondary pill) + 'Mark as not linked' (primary pill, `cs.error` bg, white text). The latter calls `controller.unlinkAnime(id)` then `Navigator.pop`.
- `primaryEnabled: allRevealed` (Next button disabled until all rows have revealed).

### Screen 9 — Manual (`manual_screen.dart`)
- StatelessWidget. The search overlay is a separate StatefulWidget (`_SearchOverlay`).
- `pageHeading: 'Restore Backup'`, no visual, `descriptiveTitle: 'Manual linking'`.
- `subtitle`: dynamic — `'${unlinked.length} anime need your help. Tap any entry to search for a match.'` when there are unlinked entries, else `'All anime are linked! You\'re ready to continue.'`.
- `scrollable: false`.
- Body: `ListView.builder` of `controller.linkedAnime.where((a) => !a.linked)` (or `SizedBox.shrink()` if empty). Each `_UnlinkedRow`: `Container surface2` bg, `rounded 14`, padding `10/12`. `Row`: `Expanded(backupName 14/w600 onText maxLines 2)` → `Icons.add_circle_outline` 22px cs.error → 'Search' text (10/w700 muted).
- Tapping a row opens a FULL-SCREEN search overlay: `showModalBottomSheet(isScrollControlled: true)`, height 85% of screen. The overlay contains:
  - Topbar: back arrow IconButton + 'Find a match' (18/w800 onText).
  - Info line: 'Linking: <anime name>' (RichText with bolded anime name).
  - Search bar: `Container surface2` bg, `rounded 12`, `Row(Icons.search + TextField(autofocus, placeholder 'Search for anime…') + clear IconButton if query non-empty)`.
  - Results list: 5 mock `_MockResult`s with exact titles/subs from the spec; each row is a `Container surface2` with 44×60 gradient primary poster (first letter), title (14/w600 onText maxLines 2), sub (12/w500 muted), and `Icons.add_circle` 26px primary. On tap: `controller.linkAnime(id, title)` + `Navigator.pop`.
  - 5 mock results exactly match the spec (Demon Slayer variants).

## Lint status
Installed Flutter 3.24.5 SDK + Dart 3.5.3 locally to run `flutter analyze`. On just the 5 rebuilt screens:
```
Analyzing 5 items...
No issues found! (ran in 0.7s)
```
Zero errors, zero warnings, zero infos on the 5 deliverable files.

Cleaned up unused imports after the first analyze pass (`palettes.dart`, `wizard_models.dart`, `wizard_visuals.dart` removed from screens that don't reference their symbols; `palette.surface2` still resolves via `WizardController.palette`'s inferred `WizardPalette` type).

## Notes for other agents
- The repo's local working tree has pre-existing analyzer errors in OTHER files (not my deliverable): `wizard_scaffold.dart` references `palette.primary`/`palette.onPrimary` (WizardPalette doesn't currently define those getters), `theme_screen.dart`/`folder_screen.dart`/`permissions_screen.dart`/`restore_screen.dart`/`welcome_screen.dart` still use the old `title:` named parameter, `poison_screen.dart` uses `Icons.skull_outlined` (doesn't exist), `theme_screen.dart` references `SectionLabel` (class never defined). These are out of scope for REBUILD-B and were not touched. My 5 screens are written against the NEW scaffold API documented in the task (which assumes those errors get fixed in REBUILD-A or a follow-up).
- The `GhostButton` mentioned in the task spec maps to the existing `PillButton.ghost` constructor in `wizard_scaffold.dart` — same field signature (`label`, `onTap`, `onText`), identical visual behavior (transparent bg, 0.6-opacity onText label, no arrows).
- `WizardPalette` is referenced implicitly in my screens via `controller.palette` — the `palette` variable's type is inferred from `WizardController.palette`, so the `palettes.dart` import is genuinely unused (per the analyzer) and was removed.
- For the Linking screen, `controller.linkedAnime` returns an unmodifiable view (`List.unmodifiable`), which is fine for read-only iteration in `ListView.builder`.
