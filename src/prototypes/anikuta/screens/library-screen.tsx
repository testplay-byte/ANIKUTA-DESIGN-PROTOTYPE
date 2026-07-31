"use client";

/**
 * anikuta / screens / library-screen — saved anime.
 *
 * Features:
 *   - Grid / List layout toggle (top right)
 *   - Category tabs (All, Watching, Completed, Plan to Watch) with counts
 *   - Grid: 3-col cards (cover + title + score)
 *   - List: rows with cover + title + meta + status badge
 *   - Settings gear button opens a bottom sheet (display options)
 */
import { useState } from "react";
import { CollapsingHeader } from "../components/collapsing-header";
import { AnimeCard } from "../components/anime-card";
import { BottomSheet } from "../components/bottom-sheet";
import { SegmentedToggle, Toggle } from "../components/segmented-toggle";
import { useCollapsingHeader } from "../hooks/use-collapsing-header";
import { getLibrary } from "../lib/mock-data";
import { fmtScore, libraryStatusLabel } from "../lib/format";
import type { LibraryLayout, LibraryStatus, LibraryTab } from "../lib/types";

interface LibraryScreenProps {
  active: boolean;
  onOpenAnime: (id: number) => void;
}

const TABS: { id: LibraryTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "watching", label: "Watching" },
  { id: "completed", label: "Completed" },
  { id: "plan", label: "Plan to Watch" },
];

export function LibraryScreen({ active, onOpenAnime }: LibraryScreenProps) {
  const { contentRef, collapsed } = useCollapsingHeader();
  const library = getLibrary();
  const [tab, setTab] = useState<LibraryTab>("all");
  const [layout, setLayout] = useState<LibraryLayout>("grid");
  const [sheetOpen, setSheetOpen] = useState(false);
  // Sheet-local display settings (visual only)
  const [showScore, setShowScore] = useState(true);
  const [showStatus, setShowStatus] = useState(true);

  const visible =
    tab === "all" ? library : library.filter((x) => x.status === tab);

  const counts = {
    all: library.length,
    watching: library.filter((x) => x.status === "watching").length,
    completed: library.filter((x) => x.status === "completed").length,
    plan: library.filter((x) => x.status === "plan").length,
  };

  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view="library"
      aria-label="Library"
      aria-hidden={!active}
    >
      <CollapsingHeader title="Library" collapsed={collapsed}>
        <div style={{ flex: "0 0 auto", display: "flex", background: "var(--color-surface-2)", borderRadius: "var(--r-pill)", padding: 3 }}>
          <button
            type="button"
            aria-label="Grid layout"
            onClick={() => setLayout("grid")}
            style={{
              width: 34, height: 34, borderRadius: "var(--r-pill)", border: "none", cursor: "pointer",
              background: layout === "grid" ? "var(--color-primary)" : "transparent",
              color: layout === "grid" ? "var(--color-primary-fg)" : "var(--color-text-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all var(--dur-2) var(--ease-emphasized)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="List layout"
            onClick={() => setLayout("list")}
            style={{
              width: 34, height: 34, borderRadius: "var(--r-pill)", border: "none", cursor: "pointer",
              background: layout === "list" ? "var(--color-primary)" : "transparent",
              color: layout === "list" ? "var(--color-primary-fg)" : "var(--color-text-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all var(--dur-2) var(--ease-emphasized)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
        <button
          type="button"
          className="an-topbar__iconbtn"
          onClick={() => setSheetOpen(true)}
          aria-label="Library display settings"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </CollapsingHeader>

      <div ref={contentRef} className="an-content">
        {/* Category tabs */}
        <div className="an-lib__tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`an-lib__tab ${tab === t.id ? "an-lib__tab--active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              <span className="an-lib__count">{counts[t.id]}</span>
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="an-lib__empty">
            <div className="an-lib__empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3 className="an-lib__empty-title">Nothing here yet</h3>
            <p className="an-lib__empty-desc">
              Anime you add to this category will appear here.
            </p>
          </div>
        ) : layout === "grid" ? (
          <div className="an-grid-3 an-bottom-pad">
            {visible.map(({ anime }, i) => (
              <AnimeCard key={anime.id} anime={anime} index={i} onClick={onOpenAnime} />
            ))}
          </div>
        ) : (
          <div className="an-lib__list">
            {visible.map(({ anime, status }, i) => (
              <div
                key={anime.id}
                className="an-lib__list-row"
                style={{ animationDelay: `${i * 35}ms` }}
                onClick={() => onOpenAnime(anime.id)}
                role="button"
                tabIndex={0}
              >
                <div className="an-lib__list-cover">
                  <div className="an-lib__list-cover-art" style={{ background: anime.coverGrad }} />
                </div>
                <div className="an-lib__list-info">
                  <h3 className="an-lib__list-title">{anime.title}</h3>
                  <div className="an-lib__list-meta">
                    {showScore && anime.averageScore && (
                      <span className="an-lib__list-score">★ {fmtScore(anime.averageScore)}</span>
                    )}
                    <span>{anime.format}</span>
                    <span>· {anime.episodes} ep</span>
                  </div>
                  {showStatus && (
                    <span className={`an-lib__list-status an-lib__list-status--${status}`}>
                      {libraryStatusLabel(status)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Library display settings bottom sheet */}
      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Customize Library"
      >
        <BottomSheet.Section label="Layout">
          <SegmentedToggle
            options={[
              { value: "grid", label: "Grid" },
              { value: "list", label: "List" },
            ]}
            value={layout}
            onChange={(v) => setLayout(v as LibraryLayout)}
          />
        </BottomSheet.Section>
        <BottomSheet.Section label="Display options">
          <BottomSheet.Row label="Show score">
            <Toggle on={showScore} onChange={setShowScore} aria-label="Show score" />
          </BottomSheet.Row>
          <BottomSheet.Row label="Show status badge">
            <Toggle on={showStatus} onChange={setShowStatus} aria-label="Show status" />
          </BottomSheet.Row>
        </BottomSheet.Section>
        <BottomSheet.Section label="Sort by">
          <SegmentedToggle
            options={[
              { value: "title", label: "Title" },
              { value: "score", label: "Score" },
              { value: "recent", label: "Recent" },
            ]}
            value="recent"
            onChange={() => {}}
          />
        </BottomSheet.Section>
      </BottomSheet>
    </section>
  );
}
