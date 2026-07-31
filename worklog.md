
---
Task ID: FLUTTER-CI-BUILD
Agent: main (Z.ai Code)
Task: Build the Flutter Setup Wizard APK via GitHub Actions — push to repo, fix CI errors, get a successful APK artifact.

Work Log:
- Discovered the repo state: origin/main was 18 commits ahead of local, ALL being iterative "fix(flutter): fix bracket mismatches" commits. The previous fixing session had consolidated my 15 modular screen files into a single 1321-line lib/main.dart which STILL had unmatched-bracket compile errors after 18 attempts. All CI runs were failing.
- Fetched the failing CI logs via the GitHub API (token from git remote, redacted in all output). Confirmed the error: bracket mismatches in the giant single-file main.dart at lines 1108/1135/1137.
- Decision: discard the broken single-file approach. Reset local to origin/main, then restored my clean modular structure (24 files) from git reflog commit 4697135. My modular files were never tested by CI — only the consolidated version was.
- Restored: lib/{main.dart, models/, theme/, state/, navigation/, widgets/, screens/} (24 files) + pubspec.yaml (name: setup_wizard, dep provider) + analysis_options.yaml + navigation.md.
- Wrote an improved workflow combining origin's working "temp dir" approach (flutter create in /tmp, copy only android/) with my improvements: --debug (sideloadable, no keystore), JDK 17, flutter analyze step (fails only on `error •`).
- Added "Download APK · Flutter" button to app/page.tsx dashboard (next to the existing Kotlin button).
- Committed + pushed (51f4487). CI run 30620819930 FAILED at the `flutter analyze` step with 5 real Dart errors my manual review missed:
  1. wizard_navigator.dart:73 — `{int currentIndex}` needs `required` (non-nullable named param without default).
  2. permissions_screen.dart:186 — _PermRow.onChanged was `VoidCallback?` but Switch.onChanged expects `ValueChanged<bool>?`.
  3. app_theme.dart:50 — `CardThemeData` isn't defined in Flutter 3.24 (added in 3.27); removed the unused cardTheme block.
  4. palettes.dart:115 — `const kDefaultPalette = kPalettes[0]` — list indexing isn't a const expression; extracted kDefaultPalette as a standalone const literal referenced by kPalettes.
  5. mini_anime_preview.dart:436 — `const EdgeInsets.only(top: i == 0 ? 0 : 0)` used runtime var `i` in a const context; removed const + the no-op ternary.
- Fixed all 5, committed + pushed (75bf441). CI run 30621111340 SUCCEEDED. ✅
- Artifact uploaded: `setup-wizard-flutter-apk`, 81.69 MB, not expired, 30-day retention.

Stage Summary:
- **Flutter Setup Wizard APK built successfully via GitHub Actions.** ✅
- Run: https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE/actions/runs/30621111340
- Artifact: `setup-wizard-flutter-apk` (81.69 MB, debug-signed, sideloadable on any Android device).
- Download: Actions tab → "Build Setup Wizard Flutter APK" → latest run → Artifacts → setup-wizard-flutter-apk.
- The modular structure (24 files, ~5150 lines) is now on origin/main and builds cleanly. The `flutter analyze` step passes with zero errors.
- Dashboard (Next.js) verified via Agent Browser: 3 download buttons render correctly (anime-app, Flutter setup-wizard, Kotlin setup-wizard), no console errors.
- Key lesson: the `flutter analyze` CI step was the critical addition — it catches Dart type/const errors in ~10s instead of waiting ~2min for the Gradle build to fail with less clear errors.
- Security note: the user's GitHub PAT was used only in the git remote URL (already configured); it was never written to any committed file and was redacted from all command output. The user should revoke it now since it was shared in plaintext in the chat.
