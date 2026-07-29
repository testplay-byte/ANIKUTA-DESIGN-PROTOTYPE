# Android_app/navigation.md

> Native Android apps built with Kotlin + Jetpack Compose. Each app is in its own folder.

---

## Apps

| Folder | App | Status | Tech |
|--------|-----|--------|------|
| `Anime_App/` | Anime App | initial build | Kotlin + Compose + M3 + AniList + Ktor + Coil + DataStore |
| `SetupWizard/` | Setup Wizard | initial build | Kotlin + Compose + M3 (no networking, in-memory state) |

> Each app has its own GitHub Actions workflow that builds a separate debug APK:
> `Anime_App` → `.github/workflows/build-apk.yml` (artifact `anime-app-apk`),
> `SetupWizard` → `.github/workflows/build-setup-wizard-apk.yml` (artifact `setup-wizard-apk`).
> Multiple prototypes → multiple `app/prototypes/<name>/` folders; multiple APKs → multiple `Android_app/<App>/` folders + multiple workflows.

## Structure (per app)

```
<App_Name>/
├── app/
│   ├── build.gradle.kts          ← app module (dependencies, SDK versions)
│   └── src/main/
│       ├── AndroidManifest.xml   ← app config (permissions, activities)
│       └── java/<package>/
│           ├── MainActivity.kt   ← entry point
│           ├── theme/            ← M3 colors, typography, theme
│           ├── model/            ← data models
│           ├── data/             ← API client + repositories (DataStore)
│           ├── navigation/       ← NavHost with routes
│           └── ui/
│               ├── components/   ← shared composables
│               └── screens/      ← screen composables
├── build.gradle.kts              ← project-level (plugins)
├── settings.gradle.kts
├── gradle/wrapper/               ← Gradle wrapper
├── gradlew                       ← Unix build script
├── IMPROVEMENTS.md               ← gap tracker (what needs work vs. prototype)
└── .gitignore                    ← ignores build/, local.properties, *.apk
```

## Build

GitHub Actions builds the APK on every push to `main` (when `Android_app/**` changes).
The workflow is at `.github/workflows/build-apk.yml`. The APK is uploaded as an artifact.

## Design reference

Each Android app matches a web prototype in `app/prototypes/<name>/`. The prototype is the
design reference — match the M3 theme, colors, typography, layout, and animations.
