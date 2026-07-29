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
| A4 | Modular architecture (each screen separate file) | 🚧 | already modular; kept + strengthened |
| A5 | Hash routing like anime-app (`#welcome`, `#theme`, …) | ⬜ | |
| A6 | Top-left headings on every screen | ⬜ | |
| A7 | Bolding fix (bold renders on mobile) | ⬜ | |
| A8 | No APK built in this environment | ✅ | by constraint |
| A9 | Structure proper & documented | ⬜ | |

## B. Dashboard

| # | Requirement | Status | Notes |
|---|---|---|---|
| B1 | Download button on anime-app prototype card | ⬜ | |
| B2 | Download button on setup-wizard prototype card | ⬜ | |
| B3 | Button above the prototype, clearly visible | ⬜ | |
| B4 | Click → proper APK download place (Actions → Artifacts) | ⬜ | |
| B5 | Info added (how APKs are built, updated) | ⬜ | |
| B6 | No download button on search-page (no Android app) | ⬜ | |

## C. Setup-wizard screens

### Welcome
| # | Requirement | Status | Notes |
|---|---|---|---|
| C1.1 | Heading top-left | ⬜ | |
| C1.2 | List-kind view (what setup covers) | ⬜ | |
| C1.3 | Beautiful anime-suited animation (replaces current ugly one) | ⬜ | |
| C1.4 | Proper/good-looking/casual/beautiful overall | ⬜ | |

### Choose Theme
| # | Requirement | Status | Notes |
|---|---|---|---|
| C2.1 | Heading top-left | ⬜ | |
| C2.2 | Mini live anime-app preview animation (auto-navigates home/library/search/settings/detail/player, scrolls) | ⬜ | |
| C2.3 | Theme options in carousel / single row | ⬜ | |
| C2.4 | More customization options | ⬜ | |
| C2.5 | Bold fix applies | ⬜ | |

### Select Folder
| # | Requirement | Status | Notes |
|---|---|---|---|
| C3.1 | Heading top-left | ⬜ | |
| C3.2 | Folder more detailed & better looking | ⬜ | |
| C3.3 | Better animations | ⬜ | |
| C3.4 | Better selected mark on folder after Select Folder | ⬜ | |

### Grant Permissions
| # | Requirement | Status | Notes |
|---|---|---|---|
| C4.1 | Heading "Grant Permissions" top-left | ⬜ | |
| C4.2 | Better top animation | ⬜ | |
| C4.3 | One-line descriptions | ⬜ | |
| C4.4 | Added "All files access" permission (not needed) | ⬜ | |

### Restore Backup
| # | Requirement | Status | Notes |
|---|---|---|---|
| C5.1 | Heading "Restore Backup" top-left | ⬜ | |
| C5.2 | Cloud animation replaced (was bad) | ⬜ | |

### Format Not Supported
| # | Requirement | Status | Notes |
|---|---|---|---|
| C6.1 | Animation kept (user likes it) | ⬜ | |
| C6.2 | Heading "Restore Backup" top | ⬜ | |
| C6.3 | Better description ("not the format I was expecting" + "Still I can try…") | ⬜ | |
| C6.4 | File details (name, size, format) below | ⬜ | |
| C6.5 | Button renamed from "Don't worry, restore it" | ⬜ | |

### Processing Backup
| # | Requirement | Status | Notes |
|---|---|---|---|
| C7.1 | Better animation | ⬜ | |
| C7.2 | Cancel on Summary → goes to Format (not Processing) | ⬜ | cross-screen fix |

### Backup Summary
| # | Requirement | Status | Notes |
|---|---|---|---|
| C8.1 | Full UI redesign (not ugly) | ⬜ | |
| C8.2 | List view layout | ⬜ | |
| C8.3 | Stat animation replaced | ⬜ | |
| C8.4 | Flexible (can show other summary options) | ⬜ | |
| C8.5 | Manga entries better integrated | ⬜ | |

### Linking Anime
| # | Requirement | Status | Notes |
|---|---|---|---|
| C9.1 | Heading "Backup Restore" top-left | ⬜ | |
| C9.2 | Sub-heading "Linking anime" | ⬜ | |
| C9.3 | Status "Matching your backup entries" (no "to AniList") | ⬜ | |
| C9.4 | Four headings: Linked / No match / Total / Remaining | ⬜ | |
| C9.5 | List fills space (no small constrained area) | ⬜ | |
| C9.6 | Two-section rows: left=name(wraps), middle=marker, right=thumbnail(linked only) | ⬜ | |
| C9.7 | Click linked → popup → "Mark as not linked" | ⬜ | |

### Manual Linking
| # | Requirement | Status | Notes |
|---|---|---|---|
| C10.1 | Heading "Restore Backup" top-left | ⬜ | |
| C10.2 | Sub-heading "Manual linking" + options line | ⬜ | |
| C10.3 | Beautiful search page UI | ⬜ | |

### Restore Summary
| # | Requirement | Status | Notes |
|---|---|---|---|
| C11.1 | Heading "Restore Backup" top-left | ⬜ | |
| C11.2 | Custom M3 Expressive layout (not basic) | ⬜ | |
| C11.3 | Beautiful, proper, smooth | ⬜ | |
| C11.4 | Restore Now → processing animation (not nothing) | ⬜ | |

### Restore Processing (NEW)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C12.1 | Processing animation shown | ⬜ | |
| C12.2 | Then finished screen with statistics | ⬜ | |

### Restore Successful
| # | Requirement | Status | Notes |
|---|---|---|---|
| C13.1 | Restore statistics shown (anime restored etc.) | ⬜ | |
| C13.2 | Auto-close + Continue button | ⬜ | |

### Choose Your Poison (NEW)
| # | Requirement | Status | Notes |
|---|---|---|---|
| C14.1 | Added before Setup Complete | ⬜ | |
| C14.2 | Forced red theme | ⬜ | |
| C14.3 | Heading "Choose Your Poison" (one line) | ⬜ | |
| C14.4 | Pick name: "daily dose of poison" / "daily dose of pills" | ⬜ | |
| C14.5 | Pick 1–3 ads per day | ⬜ | |
| C14.6 | Pick timing: app open / episode start | ⬜ | |
| C14.7 | Tells user ads essential + non-intrusive | ⬜ | |
| C14.8 | Multi-screen process | ⬜ | |

### Setup Complete / Finish
| # | Requirement | Status | Notes |
|---|---|---|---|
| C15.1 | Not minimal — shows info | ⬜ | |
| C15.2 | API URL card removed | ⬜ | |
| C15.3 | Animation restructured completely | ⬜ | |
| C15.4 | Green rectangle bug fixed | ⬜ | |

---

## D. Final verification

| # | Requirement | Status | Notes |
|---|---|---|---|
| D1 | Local build passes (`npm run build`) | ⬜ | |
| D2 | Pushed to GitHub main | ⬜ | |
| D3 | Deploy workflow succeeded | ⬜ | |
| D4 | Live site verified per screen | ⬜ | |
| D5 | No APK workflows triggered | ⬜ | |
| D6 | Worklog updated | ⬜ | |
