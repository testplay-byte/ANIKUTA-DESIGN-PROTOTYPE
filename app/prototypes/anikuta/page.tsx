"use client";

/**
 * anikuta / page — the prototype entry point.
 *
 * Renders the full shell:
 *   DeviceThemeProvider (theme, scoped to .device) →
 *   Stage (left/right info panels + device) →
 *   DeviceFrame → Screen → (all screens always mounted; visibility via
 *   .view--active) + BottomNav (hidden on pushed screens).
 *
 * Hash router:
 *   #home / #library / #updates / #more  → bottom-nav tabs.
 *   #search                              → pushed search screen.
 *   #history                             → pushed history screen.
 *   #my                                  → pushed profile screen.
 *   #backup                              → pushed backup screen.
 *   #downloads                           → pushed downloads screen.
 *   #extensions                          → pushed extensions screen.
 *   #appearance / #display / #data / #about / #trackers / #details
 *                                        → pushed settings subpage.
 *   #animedetails{id}                    → pushed detail view.
 *   #watch{id}[-{ep}]                    → pushed watch view.
 *
 * Pushed views use history.pushState so the browser back button works.
 */
import { useEffect, useState } from "react";
import {
  DeviceThemeProvider,
  DeviceFrame,
  Screen,
  Stage,
  BottomNav,
  PanelBadge,
  PanelTitle,
  PanelDesc,
  PanelHead,
  useSwipeSimulation,
} from "../../../src/proto-kit";
import { HomeScreen } from "../../../src/prototypes/anikuta/screens/home-screen";
import { LibraryScreen } from "../../../src/prototypes/anikuta/screens/library-screen";
import { UpdatesScreen } from "../../../src/prototypes/anikuta/screens/updates-screen";
import { MoreScreen } from "../../../src/prototypes/anikuta/screens/more-screen";
import { SearchScreen } from "../../../src/prototypes/anikuta/screens/search-screen";
import { HistoryScreen } from "../../../src/prototypes/anikuta/screens/history-screen";
import { ProfileScreen } from "../../../src/prototypes/anikuta/screens/profile-screen";
import { BackupScreen } from "../../../src/prototypes/anikuta/screens/backup-screen";
import { DownloadsScreen } from "../../../src/prototypes/anikuta/screens/downloads-screen";
import { ExtensionsScreen } from "../../../src/prototypes/anikuta/screens/extensions-screen";
import { DetailsScreen } from "../../../src/prototypes/anikuta/screens/details-screen";
import { WatchScreen } from "../../../src/prototypes/anikuta/screens/watch-screen";
import { SettingsSubpageScreen } from "../../../src/prototypes/anikuta/screens/settings-subpage-screen";

// ---------------------------------------------------------------------------
// View IDs + nav items
// ---------------------------------------------------------------------------

type ViewId =
  | "home"
  | "library"
  | "updates"
  | "more"
  | "search"
  | "history"
  | "my"
  | "backup"
  | "downloads"
  | "extensions"
  | "appearance"
  | "display"
  | "data"
  | "about"
  | "trackers"
  | "details"
  | "watch";

/** Settings subpage sections handled by SettingsSubpageScreen. */
const SETTINGS_SUBPAGES = new Set<string>([
  "appearance", "display", "data", "about", "trackers", "details",
]);

/** Routes where the bottom nav is hidden. */
const NAV_HIDDEN = new Set<ViewId>([
  "search", "history", "my", "backup", "downloads", "extensions",
  "appearance", "display", "data", "about", "trackers", "details",
  "watch",
]);

const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    id: "library",
    label: "Library",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: "updates",
    label: "Updates",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    id: "more",
    label: "More",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="19" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

const SCREEN_INFO: Record<ViewId, { name: string; desc: string }> = {
  home: { name: "Home", desc: "Trending anime, continue watching, popular this season, top rated." },
  library: { name: "Library", desc: "Saved anime by status. Grid/list toggle, display settings." },
  updates: { name: "Updates", desc: "New episodes with SUB/DUB badges + weekly schedule." },
  more: { name: "More", desc: "Settings hub: appearance, display, data, extensions, backup, downloads." },
  search: { name: "Search", desc: "AniList/Extension source toggle, filter chips, recent searches." },
  history: { name: "History", desc: "Continue watching carousel + day-grouped episode history." },
  my: { name: "My Profile", desc: "Stats: genre/format/status/score/country distributions." },
  backup: { name: "Backup & Restore", desc: "Manual + auto-backup, storage folder selector." },
  downloads: { name: "Downloads", desc: "Active download queue + completed files." },
  extensions: { name: "Extensions", desc: "Anime/manga sources: trusted, installed, available." },
  appearance: { name: "Appearance", desc: "Theme, accent color, bold text." },
  display: { name: "Display", desc: "Card density, poster style, animation speed." },
  data: { name: "Data & Storage", desc: "Cache, image loading, sync." },
  about: { name: "About", desc: "Version, license, credits." },
  trackers: { name: "Trackers", desc: "AniList, MyAnimeList connection + sync settings." },
  details: { name: "Anime Details", desc: "Blurred cover header, synopsis, episodes." },
  watch: { name: "Watch", desc: "Mini-player + episode list." },
};

// ---------------------------------------------------------------------------
// Hash parsing
// ---------------------------------------------------------------------------

interface HashState {
  view: ViewId;
  /** Anime id for details/watch. */
  animeId: number | null;
  /** Episode number for watch. */
  episode: number | null;
  /** Settings subpage section (for SettingsSubpageScreen). */
  section: string | null;
}

const TAB_VIEWS = new Set<string>(["home", "library", "updates", "more"]);
const PUSH_VIEWS = new Set<string>([
  "search", "history", "my", "backup", "downloads", "extensions",
]);

function parseHash(): HashState {
  if (typeof window === "undefined") return { view: "home", animeId: null, episode: null, section: null };
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash || hash === "home") return { view: "home", animeId: null, episode: null, section: null };

  if (TAB_VIEWS.has(hash)) {
    return { view: hash as ViewId, animeId: null, episode: null, section: null };
  }
  if (PUSH_VIEWS.has(hash)) {
    return { view: hash as ViewId, animeId: null, episode: null, section: null };
  }
  if (SETTINGS_SUBPAGES.has(hash)) {
    return { view: hash as ViewId, animeId: null, episode: null, section: hash };
  }
  if (hash.startsWith("animedetails")) {
    const id = parseInt(hash.replace("animedetails", ""), 10);
    if (id) return { view: "details", animeId: id, episode: null, section: null };
  }
  if (hash.startsWith("watch")) {
    const rest = hash.replace("watch", "");
    // Format: watch{id} or watch{id}-{ep}
    const m = rest.match(/^(\d+)(?:-(\d+))?$/);
    if (m) {
      const id = parseInt(m[1], 10);
      const ep = m[2] ? parseInt(m[2], 10) : null;
      return { view: "watch", animeId: id, episode: ep, section: null };
    }
  }
  return { view: "home", animeId: null, episode: null, section: null };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  const [view, setView] = useState<ViewId>("home");
  const [animeId, setAnimeId] = useState<number | null>(null);
  const [episode, setEpisode] = useState<number | null>(null);
  const [section, setSection] = useState<string | null>(null);

  // Read hash on mount. If empty, replaceState to #home.
  useEffect(() => {
    if (window.location.hash === "") {
      try {
        history.replaceState(null, "", "#home");
      } catch {
        /* sandbox may block — ignore */
      }
      setView("home");
    } else {
      const s = parseHash();
      setView(s.view);
      setAnimeId(s.animeId);
      setEpisode(s.episode);
      setSection(s.section);
    }
  }, []);

  // Listen for back/forward.
  useEffect(() => {
    function onPop() {
      const s = parseHash();
      setView(s.view);
      setAnimeId(s.animeId);
      setEpisode(s.episode);
      setSection(s.section);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Navigation helpers — pushState so back button works.
  function navigate(target: ViewId, hash?: string) {
    const h = hash ?? `#${target}`;
    try {
      history.pushState(null, "", h);
    } catch {
      /* ignore */
    }
    setView(target);
    setAnimeId(null);
    setEpisode(null);
    setSection(SETTINGS_SUBPAGES.has(target) ? target : null);
    // Scroll the active content to top on navigation
    requestAnimationFrame(() => {
      const contents = document.querySelectorAll(".an-content, .an-detail__content");
      contents.forEach((c) => {
        if ((c as HTMLElement).closest(".view--active")) {
          (c as HTMLElement).scrollTop = 0;
        }
      });
    });
  }

  function openDetail(id: number) {
    try {
      history.pushState(null, "", `#animedetails${id}`);
    } catch {
      /* ignore */
    }
    setView("details");
    setAnimeId(id);
    setEpisode(null);
    setSection(null);
  }

  function openWatch(id: number, ep?: number) {
    const hash = ep ? `#watch${id}-${ep}` : `#watch${id}`;
    try {
      history.pushState(null, "", hash);
    } catch {
      /* ignore */
    }
    setView("watch");
    setAnimeId(id);
    setEpisode(ep ?? null);
    setSection(null);
  }

  function back() {
    try {
      history.back();
    } catch {
      /* ignore */
    }
  }

  // Bottom nav click.
  function handleNav(id: string) {
    if (id === view) return;
    navigate(id as ViewId);
  }

  // More menu navigation — handles both push-views and settings subpages.
  function handleMoreNav(target: string) {
    navigate(target as ViewId);
  }

  // ─────────────────────────────────────────────────────────────────────
  // Swipe gestures (proto-kit)
  // ─────────────────────────────────────────────────────────────────────
  const SWIPE_ORDER: ViewId[] = ["home", "library", "updates", "more"];

  useSwipeSimulation({
    enabled: true,
    onSwipeLeft: () => {
      if (view === "details" || view === "watch") return;
      const idx = SWIPE_ORDER.indexOf(view);
      if (idx >= 0 && idx < SWIPE_ORDER.length - 1) {
        handleNav(SWIPE_ORDER[idx + 1]);
      }
    },
    onSwipeRight: () => {
      // On any pushed view, swipe right = back
      if (!TAB_VIEWS.has(view)) {
        back();
        return;
      }
      const idx = SWIPE_ORDER.indexOf(view);
      if (idx > 0) {
        handleNav(SWIPE_ORDER[idx - 1]);
      }
    },
  });

  const info = SCREEN_INFO[view];
  const navVisible = !NAV_HIDDEN.has(view);
  const navActiveId = view;

  return (
    <DeviceThemeProvider storageKey="anikuta-theme" initialTheme="dark">
      <Stage
        leftPanel={
          <>
            <PanelBadge>prototype</PanelBadge>
            <PanelTitle>ANIKUTA</PanelTitle>
            <PanelDesc>
              An anime-first app prototype with 12 screens: Home, Library,
              Search, Details, Watch, History, Updates, Profile, More,
              Backup &amp; Restore, Downloads, Extensions. Lime primary
              (#B1F256) on purple-tinted dark surfaces. Floating pill
              bottom nav. Hash routing like the anime-app prototype.
            </PanelDesc>
            <div className="tags">
              <span className="tag">Lime</span>
              <span className="tag">12 screens</span>
              <span className="tag">Hash routing</span>
              <span className="tag">Mock data</span>
            </div>
          </>
        }
        rightPanel={
          <>
            <PanelHead>Screen info</PanelHead>
            <div className="screeninfo">
              <span className="screeninfo__name">{info.name}</span>
              <span className="screeninfo__desc">{info.desc}</span>
            </div>

            <PanelHead>Navigation</PanelHead>
            <div className="kvlist">
              <div className="kvlist__row">
                <span>Route</span>
                <b>#{view}</b>
              </div>
              <div className="kvlist__row">
                <span>Bottom nav</span>
                <b>{navVisible ? "visible" : "hidden"}</b>
              </div>
              <div className="kvlist__row">
                <span>Pushed</span>
                <b>{!TAB_VIEWS.has(view) ? "yes" : "no"}</b>
              </div>
            </div>

            <PanelHead>Design</PanelHead>
            <div className="kvlist">
              <div className="kvlist__row">
                <span>Primary</span>
                <b style={{ color: "#b1f256" }}>#B1F256</b>
              </div>
              <div className="kvlist__row">
                <span>Theme</span>
                <b>Dark</b>
              </div>
              <div className="kvlist__row">
                <span>Font</span>
                <b>Inter 800</b>
              </div>
              <div className="kvlist__row">
                <span>Nav</span>
                <b>Floating pill</b>
              </div>
            </div>

            <PanelHead>Screens</PanelHead>
            <div className="mini-bars">
              {[
                ["Home", "100%", "var(--chart-1)"],
                ["Library", "85%", "#b1f256"],
                ["Search", "70%", "var(--chart-3)"],
                ["Details", "90%", "var(--chart-2)"],
                ["Watch", "60%", "var(--chart-4)"],
                ["History", "55%", "var(--chart-5)"],
                ["Updates", "80%", "#b1f256"],
                ["Profile", "75%", "var(--chart-3)"],
                ["More", "65%", "var(--chart-1)"],
                ["Backup", "50%", "var(--chart-2)"],
                ["Downloads", "45%", "var(--chart-4)"],
                ["Extensions", "85%", "#b1f256"],
              ].map(([label, w, c], i) => (
                <div key={i} className="mini-bar-row">
                  <span className="mini-bar-label">{label}</span>
                  <div className="mini-bar-track">
                    <div className="mini-bar-fill" style={{ width: w, background: c }} />
                  </div>
                  <span className="mini-bar-num">{i + 1}</span>
                </div>
              ))}
            </div>
          </>
        }
      >
        <DeviceFrame theme="dark">
          <Screen>
            {/* Tab views (always mounted) */}
            <HomeScreen
              active={view === "home"}
              onOpenAnime={openDetail}
              onOpenSearch={() => navigate("search")}
              onOpenHistory={() => navigate("history")}
              onOpenWatch={(id) => openWatch(id)}
            />
            <LibraryScreen
              active={view === "library"}
              onOpenAnime={openDetail}
            />
            <UpdatesScreen
              active={view === "updates"}
              onOpenAnime={openDetail}
            />
            <MoreScreen
              active={view === "more"}
              onNavigate={handleMoreNav}
            />

            {/* Pushed views */}
            <SearchScreen
              active={view === "search"}
              onOpenAnime={openDetail}
              onBack={back}
            />
            <HistoryScreen
              active={view === "history"}
              onOpenAnime={openDetail}
              onOpenWatch={(id) => openWatch(id)}
              onBack={back}
            />
            <ProfileScreen
              active={view === "my"}
              onOpenAnime={openDetail}
              onOpenWatch={(id) => openWatch(id)}
              onBack={back}
            />
            <BackupScreen
              active={view === "backup"}
              onBack={back}
            />
            <DownloadsScreen
              active={view === "downloads"}
              onBack={back}
              onOpenWatch={(id) => openWatch(id)}
            />
            <ExtensionsScreen
              active={view === "extensions"}
              onBack={back}
            />

            {/* Settings subpages (one component, section-driven) */}
            <SettingsSubpageScreen
              active={!!section && SETTINGS_SUBPAGES.has(section)}
              section={section ?? "appearance"}
              onBack={back}
            />

            {/* Detail + Watch */}
            <DetailsScreen
              active={view === "details"}
              animeId={animeId}
              onBack={back}
              onWatch={(id, ep) => openWatch(id, ep)}
            />
            <WatchScreen
              active={view === "watch"}
              animeId={animeId}
              episodeNumber={episode}
              onBack={back}
              onEpisodeChange={(id, ep) => openWatch(id, ep)}
            />
          </Screen>

          {/* Floating bottom nav — hidden on pushed views */}
          {navVisible && (
            <BottomNav
              items={NAV_ITEMS}
              activeId={navActiveId}
              onSelect={handleNav}
            />
          )}
        </DeviceFrame>
      </Stage>
    </DeviceThemeProvider>
  );
}
