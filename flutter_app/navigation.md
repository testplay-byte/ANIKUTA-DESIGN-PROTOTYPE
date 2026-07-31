# flutter_app — Setup Wizard (Flutter)

A native Android onboarding wizard for an anime app, built with Flutter.
Built into a debug-signed APK by GitHub Actions
(`.github/workflows/build-flutter-apk.yml`).

This is the Flutter counterpart of the web prototype at
`app/prototypes/setup-wizard/`. The web prototype uses hash routing for
shareable URLs; the Flutter APK uses a linear `Navigator` stack (no URL
routing needed for a native app).

## Tech choices (see `worklog.md` RESEARCH-1 for the full rationale)

- **State:** `provider` + a single `WizardController extends ChangeNotifier`.
- **Navigation:** `Navigator.push`/`pop` + `MaterialPageRoute` (no `go_router`).
- **Theming:** Material 3 (`useMaterial3: true`), `ColorScheme.fromSeed` per
  selectable palette, `themeMode` for dark/light/system. The poison screen
  forces a red theme via a route-local `Theme` widget.
- **Fonts:** Android's default Roboto (renders bold natively — no
  `google_fonts` dependency, fully offline).
- **Animations:** built-in `AnimationController` + `CustomPainter` only
  (zero extra animation deps → maximally CI-safe).
- **Build:** `flutter build apk --debug` (debug-signed, sideloadable, no
  keystore needed). Single fat APK.

## Project layout

```
flutter_app/
├── pubspec.yaml              # name: setup_wizard, dep: provider
├── analysis_options.yaml
└── lib/
    ├── main.dart             # entry — ChangeNotifierProvider + MaterialApp
    ├── models/
    │   └── wizard_models.dart# LinkedAnime, Permissions, AdSettings, enums, kDefaultAnime, kBackupFile
    ├── theme/
    │   ├── palettes.dart     # 6 WizardPalettes (lime/teal/purple/coral/forest/amber)
    │   └── app_theme.dart    # buildTheme(palette, brightness), buildPoisonTheme(brightness)
    ├── state/
    │   └── wizard_controller.dart  # ChangeNotifier — all wizard state + helpers
    ├── navigation/
    │   └── wizard_navigator.dart   # WizardNav.{next,back,skipToFinish,cancelToFormat,restart}, kStepTotal=15
    ├── widgets/
    │   ├── wizard_scaffold.dart    # shared layout: progress bar + top-left heading + bottom Back/Next
    │   ├── wizard_visuals.dart     # custom-painted animations (Welcome/Folder/Shield/Restore/Format/Processing/CheckCircle/ProgressRing)
    │   └── mini_anime_preview.dart # auto-cycling phone preview for the Theme screen
    └── screens/              # 15 screens, one per wizard step
        ├── welcome_screen.dart            # 0
        ├── theme_screen.dart              # 1
        ├── folder_screen.dart             # 2
        ├── permissions_screen.dart        # 3
        ├── restore_screen.dart            # 4  (Select Backup File / Skip)
        ├── format_screen.dart             # 5  (format not supported)
        ├── processing_screen.dart         # 6  (auto-advance 2.5s)
        ├── summary_screen.dart            # 7  (Cancel → format)
        ├── linking_screen.dart            # 8
        ├── manual_screen.dart             # 9
        ├── restore_summary_screen.dart    # 10 (Restore Now)
        ├── restore_processing_screen.dart # 11 (auto-advance 3s)
        ├── restore_success_screen.dart    # 12 (auto-advance 4s / Continue)
        ├── poison_screen.dart             # 13 (forced red, 3 sub-steps)
        └── finish_screen.dart             # 14 (Start Exploring → restart)
```

## How the wizard flows

Linear 15-step flow. Each screen is a self-contained widget that reads
`WizardController` via `context.watch` and wires Back/Next to `WizardNav`.

```
welcome → theme → folder → permissions → restore ─┬─→ format → processing →
                                                   │
                                                   └─ Skip ──────────────────→ finish
        ← (Cancel from summary goes back to format, not processing)
   … → summary → linking → manual → restore-summary → restore-processing →
      restore-success → poison → finish
```

## How the APK is built (CI)

`flutter create` is run in CI with `--no-overwrite` so it only generates the
missing `android/` platform folder and does **not** clobber our committed
`lib/main.dart`. Then `flutter build apk --debug` produces a sideloadable
debug-signed APK. The Kotlin version is sed-bumped from `1.7.10` to `1.9.0`
(defensive; Flutter 3.27 already ships 1.9.22).

Artifact: `setup-wizard-flutter-apk` (30-day retention) — download from the
repo's Actions tab → "Build Setup Wizard Flutter APK" → latest run → Artifacts.

## Local dev (requires Flutter SDK — not in this sandbox)

```bash
cd flutter_app
flutter create --org com.testplaybyte --project-name setup_wizard --platforms android --no-overwrite .
flutter pub get
flutter run                  # on a device/emulator
flutter build apk --debug    # produces build/app/outputs/flutter-apk/app-debug.apk
```
