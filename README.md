# ANIKUTA-DESIGN-PROTOTYPE

> A mobile UI prototyping workspace for **Anikuta**. We design **interactive, fully functional mobile app interfaces** and deploy them as live prototypes via **GitHub Pages** — with native Android builds for each prototype.

---

## Live Site

**Dashboard:** [https://testplay-byte.github.io/ANIKUTA-DESIGN-PROTOTYPE/](https://testplay-byte.github.io/ANIKUTA-DESIGN-PROTOTYPE/)

---

## What This Is

This repository holds **web-based mobile UI prototypes** — real, clickable interfaces that look and feel like Android apps, rendered in the browser for fast design iteration before committing to native builds.

Each prototype is a **self-contained folder of React components** (one file per screen) sharing a common design system (`src/proto-kit/`). The project is a **Next.js 16 static export** — `next build` produces pure static HTML/CSS/JS that GitHub Pages serves directly. No server, no backend.

Each prototype also has a corresponding **native Android app** (Kotlin + Jetpack Compose) built via GitHub Actions CI.

---

## Prototypes

### Web Prototypes (Live)

| Prototype | Screens | Description | Live URL |
|-----------|---------|-------------|----------|
| **Anime App** | 7 | Material 3 Expressive anime streaming app with Home, Library, History, Schedule, Search, Settings, and Detail pages. Real AniList data. | [Open](https://testplay-byte.github.io/ANIKUTA-DESIGN-PROTOTYPE/prototypes/anime-app/) |
| **Setup Wizard** | 13 | Animated 13-step onboarding wizard with 4 color palettes, theme switching, folder selection, permissions, backup restore, and Canvas-drawn animated visuals. | [Open](https://testplay-byte.github.io/ANIKUTA-DESIGN-PROTOTYPE/prototypes/setup-wizard/) |

### Android Apps (APK Builds)

| App | Package | APK Download |
|-----|---------|-------------|
| **Anime App** | `com.testplaybyte.animeapp` | [Download from Actions](https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE/actions/workflows/build-apk.yml) |
| **Setup Wizard** | `com.testplaybyte.setupwizard` | [Download from Actions](https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE/actions/workflows/build-setup-wizard-apk.yml) |

APKs are debug-signed and built automatically on push. Download the latest artifact from the Actions tab.

---

## Repository Structure

```
ANIKUTA-DESIGN-PROTOTYPE/
├── app/                        # Next.js App Router (thin routes)
│   ├── page.tsx                # Dashboard / prototypes gallery (grid layout)
│   └── prototypes/             # One route folder per prototype
│       ├── anime-app/          # Anime app prototype route
│       └── setup-wizard/       # Setup wizard prototype route
├── src/
│   ├── proto-kit/              # Shared design system
│   │   ├── tokens/tokens.css   # Single source of truth for all design tokens
│   │   ├── device-frame/       # Phone mockup (bezel + status bar + screen)
│   │   ├── bottom-nav/         # Floating pill navigation bar
│   │   ├── stage/              # Desktop side panels + stage layout
│   │   └── theme/              # Device-scoped theme provider (dark/light)
│   ├── prototypes/             # Prototype source code
│   │   ├── anime-app/          # 7-screen anime app (screens, components, hooks, lib)
│   │   └── setup-wizard/       # 13-step wizard (screens, components, hooks, lib)
│   └── dashboard/              # Dashboard styles + theme toggle
├── Android_app/                # Native Android apps (Kotlin + Compose)
│   ├── Anime_App/              # Anime app (AniList API, DataStore, Material 3)
│   └── SetupWizard/            # Setup wizard (animated Canvas visuals, 4 palettes)
├── docs/                       # All documentation (27+ files)
│   ├── agent-quickstart.md     # 2-minute fast-start for AI agents
│   ├── prototype-blueprint.md  # Step-by-step guide to build a new prototype
│   ├── repo-map.md             # Full annotated tree of the repo
│   ├── notification-protocol.md # ntfy.sh notification format
│   ├── design-standards.md     # UI/UX standards
│   ├── preferences.md          # User design preferences
│   ├── android-dev/            # Android conversion docs
│   │   ├── WORKFLOW.md         # 8-phase web→native conversion process
│   │   ├── BUILD_GUIDE.md      # Gradle structure + build instructions
│   │   ├── navigation.md       # 14 golden rules for Android
│   │   ├── UI_PATTERNS.md       # UI pattern translations (CSS→Compose)
│   │   └── CRASH_LESSONS.md    # Every crash encountered + fix
│   └── design-systems/         # Material 3 Expressive + basic design docs
├── public/                     # Static assets served verbatim
├── archive/                    # Backup of pre-Next.js static site
├── .github/workflows/          # CI/CD
│   ├── deploy.yml              # Next.js → GitHub Pages (auto on push)
│   ├── build-apk.yml          # Anime App APK build
│   └── build-setup-wizard-apk.yml # Setup Wizard APK build
├── next.config.ts             # Static export, basePath '/ANIKUTA-DESIGN-PROTOTYPE'
└── package.json               # Next.js 16 + React 19 + TypeScript 5
```

Every directory has its own `navigation.md`. See [`docs/repo-map.md`](./docs/repo-map.md) for the full annotated tree.

---

## Start Here

- **New to the repo?** Read [`STARTUP.md`](./STARTUP.md) — the master context file.
- **Want a 2-minute overview?** Read [`docs/agent-quickstart.md`](./docs/agent-quickstart.md).
- **Looking for something specific?** Check [`navigation.md`](./navigation.md) or [`docs/repo-map.md`](./docs/repo-map.md).
- **Want to build a new prototype?** Read [`docs/prototype-blueprint.md`](./docs/prototype-blueprint.md) and study [`app/prototypes/anime-app/`](./app/prototypes/anime-app/) as the reference pattern.
- **Want to convert to Android?** Read [`docs/android-dev/WORKFLOW.md`](./docs/android-dev/WORKFLOW.md) and [`docs/android-dev/navigation.md`](./docs/android-dev/navigation.md).

---

## Tech Stack

| Layer | Web (Prototypes) | Native (Android) |
|-------|-------------------|-------------------|
| Framework | Next.js 16 (App Router) + React 19 | Kotlin + Jetpack Compose |
| Language | TypeScript 5 | Kotlin 2.0.20 |
| Styling | CSS Modules + CSS custom properties | Material 3 (from BOM 2024.09) |
| State | React state + localStorage | Compose state + DataStore Preferences |
| API | `fetch()` in hooks | Ktor HTTP client |
| Icons | Inline SVG | Material Icons Extended |
| Navigation | Hash routing (`#home`, `#search`) | Navigation Compose |
| Export | `output: 'export'` → pure static HTML/CSS/JS | Gradle → debug APK |
| Deploy | GitHub Pages (auto on push to `main`) | GitHub Actions artifact upload |

**Build & preview locally:**
```bash
npm install && npm run build   # → ./out (static export)
```

See [`docs/tech-stack.md`](./docs/tech-stack.md) for the full rationale.

---

## CI/CD

### GitHub Pages Deploy
Push to `main` → `deploy.yml` builds Next.js static export → deploys to GitHub Pages.

### Android APK Builds
- **Anime App:** Triggered on changes to `Android_app/Anime_App/**`
- **Setup Wizard:** Triggered on changes to `Android_app/SetupWizard/**`
- Both can be triggered manually via `workflow_dispatch`

Download APKs from the **Actions** tab → latest run → **Artifacts** section.

---

## Conventions

- Default branch: `main`
- Prototype folders use `kebab-case`
- Every directory has a `navigation.md`, updated alongside any change
- Every completed task triggers an `ntfy.sh` notification (topic: `TASKISDONE`)
- Each prototype is self-contained — no cross-prototype dependencies except `src/proto-kit/`

---

## License

Proprietary — internal prototyping use only.
