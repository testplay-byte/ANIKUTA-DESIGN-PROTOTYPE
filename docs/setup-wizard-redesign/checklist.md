# checklist.md — Setup Wizard Redesign Verification

> One row per concrete requirement from `requirements.md`. Updated as each is
> verified on the live GitHub Pages site. Status: ⬜ todo · 🚧 in progress · ✅ done · ⚠️ partial.

---

## A. Process & architecture

| # | Requirement | Status | Notes |
|---|---|---|---|
| A1 | Requirements saved in a specific folder | ✅ | `docs/setup-wizard-redesign/` |
| A2 | Plan created for each screen | ✅ | `plan.md` |
| A3 | Checklist of verifications | ✅ | this file |
| A4 | Modular architecture (each screen separate file) | ✅ | 15 screens, each own file |
| A5 | Hash routing like anime-app (`#welcome`, `#theme`, …) | ✅ | 15 routes, popstate works, verified #welcome→#theme→…→#finish |
| A6 | Top-left headings on every screen | ✅ | .wizard-step--v2 + .wizard-heading; verified all screens |
| A7 | Bolding fix (bold renders on mobile) | ✅ | .device font-family + font-synthesis:none + weight reinforcement |
| A8 | No APK built in this environment | ✅ | by constraint; no Android_app changes pushed |
| A9 | Structure proper & documented | ✅ | plan.md + checklist.md + navigation.md |

## B. Dashboard

| # | Requirement | Status | Notes |
|---|---|---|---|
| B1 | Download button on anime-app prototype card | ✅ | verified live |
| B2 | Download button on setup-wizard prototype card | ✅ | verified live |
| B3 | Button above the prototype, clearly visible | ✅ | top of show__info--left, teal pill |
| B4 | Click → proper APK download place (Actions → Artifacts) | ✅ | links to workflows/build-apk.yml + build-setup-wizard-apk.yml |
| B5 | Info added (how APKs are built, updated) | ✅ | title attr + "Android · GitHub Actions" subtitle |
| B6 | No download button on search-page (no Android app) | ✅ | search-page card has no button |

## C. Setup-wizard screens

### Welcome (#welcome)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C1.1 | Heading top-left | ✅ | "Welcome to Anime App!" top-left |
| C1.2 | List-kind view (what setup covers) | ✅ | 5-item numbered list (Theme/Folder/Permissions/Restore/Ads) |
| C1.3 | Beautiful anime-suited animation | ✅ | bold play-mark + gentle floating accents (was concentric rings) |
| C1.4 | Proper/good-looking/casual/beautiful overall | ✅ | VLM: clean, well-spaced, all elements fit |

### Choose Theme (#theme)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C2.1 | Heading top-left | ✅ | "Choose your theme" top-left |
| C2.2 | Mini live anime-app preview (auto-navigates) | ✅ | MiniAnimePreview cycles home/library/search/settings/detail/player every 2.6s |
| C2.3 | Theme options in carousel / single row | ✅ | .palette-carousel horizontal scroll, 6 palettes |
| C2.4 | More customization options | ✅ | Bold text + Reduced motion toggles added |
| C2.5 | Bold fix applies | ✅ | global .device bold reinforcement |

### Select Folder (#folder)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C3.1 | Heading top-left | ✅ | "Select your anime folder" top-left |
| C3.2 | Folder more detailed & better looking | ✅ | tab + gradient + inner file lines |
| C3.3 | Better animations | ✅ | calm bob + refined float |
| C3.4 | Better selected mark on folder | ✅ | refined check badge scales in; verified live |

### Grant Permissions (#permissions)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C4.1 | Heading "Grant Permissions" top-left | ✅ | verified |
| C4.2 | Better top animation | ✅ | calmer shield, fewer particles, cleaner ripples |
| C4.3 | One-line descriptions | ✅ | white-space:nowrap + ellipsis |
| C4.4 | Added "All files access" permission (not needed) | ✅ | 4th row, "Not needed" tag, locked off |

### Restore Backup (#restore)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C5.1 | Heading "Restore Backup" top-left | ✅ | verified |
| C5.2 | Cloud animation replaced (was bad) | ✅ | now backup-file + circular restore arrows |

### Format Not Supported (#format)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C6.1 | Animation kept (user likes it) | ✅ | inline SVG kept |
| C6.2 | Heading "Restore Backup" top | ✅ | eyebrow "Restore" + title "Restore backup" |
| C6.3 | Better description ("not the format I was expecting" + "Still I can try…") | ✅ | exact copy verified |
| C6.4 | File details (name, size, format) below | ✅ | "anime_backup_2025-01-15.json · 2.3 MB · JSON (unknown schema)" |
| C6.5 | Button renamed from "Don't worry, restore it" | ✅ | now "Try restoring anyway" |

### Processing Backup (#processing)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C7.1 | Better animation | ✅ | file→rows parsing with flowing particles |
| C7.2 | Cancel on Summary → goes to Format (not Processing) | ✅ | verified: Cancel on #summary → #format |

### Backup Summary (#summary)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C8.1 | Full UI redesign (not ugly) | ✅ | VLM: matches requirements, no problems |
| C8.2 | List view layout | ✅ | .summary-list with 6 rows |
| C8.3 | Stat animation replaced | ✅ | clipboard/manifest visual (was bar chart) |
| C8.4 | Flexible (can show other summary options) | ✅ | SUMMARY_ITEMS array, easy to extend |
| C8.5 | Manga entries better integrated | ✅ | red list row (was separate ugly red box) |

### Linking Anime (#linking)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C9.1 | Heading "Backup Restore" top-left | ✅ | eyebrow "Backup Restore" |
| C9.2 | Sub-heading "Linking anime" | ✅ | title "Linking anime" |
| C9.3 | Status "Matching your backup entries" (no "to AniList") | ✅ | exact copy verified |
| C9.4 | Four headings: Linked / No match / Total / Remaining | ✅ | 4 stat boxes verified |
| C9.5 | List fills space (no small constrained area) | ✅ | .linking-list flex:1, no maxHeight |
| C9.6 | Two-section rows: left=name(wraps), middle=marker, right=thumbnail(linked only) | ✅ | verified; word-break:break-word on names |
| C9.7 | Click linked → popup → "Mark as not linked" | ✅ | verified: clicked Frieren → popup → unlinked → stats updated 5→4 linked |

### Manual Linking (#manual)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C10.1 | Heading "Restore Backup" top-left | ✅ | eyebrow "Backup Restore" + title "Manual linking" |
| C10.2 | Sub-heading "Manual linking" + options line | ✅ | "Tap any entry to search for a match" |
| C10.3 | Beautiful search page UI | ✅ | redesigned overlay: search bar + poster thumbnails + link icons; VLM: polished |

### Restore Summary (#restore-summary)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C11.1 | Heading "Restore Backup" top-left | ✅ | eyebrow "Backup Restore" + title "Restore summary" |
| C11.2 | Custom M3 Expressive layout (not basic) | ✅ | .restore-hero gradient card with inline stats |
| C11.3 | Beautiful, proper, smooth | ✅ | VLM: custom-designed layout |
| C11.4 | Restore Now → processing animation (not nothing) | ✅ | → #restore-processing (NEW) with animation |

### Restore Processing (NEW, #restore-processing)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C12.1 | Processing animation shown | ✅ | RestoreProcessingVisual: card→library flow + particles + ring |
| C12.2 | Then finished screen with statistics | ✅ | auto-advances → #restore-success with stats |

### Restore Successful (#restore-success)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C13.1 | Restore statistics shown (anime restored etc.) | ✅ | 3 stats: Anime restored / Episodes / Categories |
| C13.2 | Auto-close + Continue button | ✅ | Continue → #poison |

### Choose Your Poison (NEW, #poison)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C14.1 | Added before Setup Complete | ✅ | #poison sits between #restore-success and #finish |
| C14.2 | Forced red theme | ✅ | .device--poison overrides palette; VLM confirmed red |
| C14.3 | Heading "Choose Your Poison" (one line) | ✅ | verified |
| C14.4 | Pick name: "daily dose of poison" / "daily dose of pills" | ✅ | step 1 segmented control |
| C14.5 | Pick 1–3 ads per day | ✅ | step 2 segmented (1 ad / 2 ads / 3 ads) |
| C14.6 | Pick timing: app open / episode start | ✅ | step 3 chips (app-open / episode-start / both) |
| C14.7 | Tells user ads essential + non-intrusive | ✅ | "Ads keep the app free. Let's make them non-intrusive…" |
| C14.8 | Multi-screen process | ✅ | 3 sub-steps with progress dots |

### Setup Complete / Finish (#finish)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C15.1 | Not minimal — shows info | ✅ | config summary list (Theme/Folder/Library/Ads/Daily dose) |
| C15.2 | API URL card removed | ✅ | VLM confirmed: no API URL card |
| C15.3 | Animation restructured completely | ✅ | clean check-in-circle + refined confetti (was chaotic celebration) |
| C15.4 | Green rectangle bug fixed | ✅ | VLM confirmed: no green rectangle overlapping text |

---

## D. Final verification

| # | Requirement | Status | Notes |
|---|---|---|---|
| D1 | Local build passes (`npm run build`) | ✅ | all 15 routes prerender, no TS errors |
| D2 | Pushed to GitHub main | ✅ | commit 2e58c83 |
| D3 | Deploy workflow succeeded | ✅ | sha 2e58c83 completed success |
| D4 | Live site verified per screen | ✅ | Agent Browser + VLM verified all 15 screens + dashboard |
| D5 | No APK workflows triggered | ✅ | no Android_app/** changes |
| D6 | Worklog updated | ✅ | appended |
