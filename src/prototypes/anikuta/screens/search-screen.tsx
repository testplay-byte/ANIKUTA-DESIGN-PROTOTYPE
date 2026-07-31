"use client";

/**
 * anikuta / screens / search-screen — search with source toggle + filters.
 *
 * Layout:
 *   - Search bar (with back button)
 *   - Source toggle: AniList / Extension
 *   - Filter chips row (All, TV, Movie, Trending, Top Rated, ...)
 *   - Recent searches (when no query)
 *   - Results grid (when query present)
 */
import { useMemo, useState } from "react";
import { AnimeCard } from "../components/anime-card";
import { SectionHeader } from "../components/section-header";
import { SegmentedToggle } from "../components/segmented-toggle";
import { ANIME, RECENT_SEARCHES, SEARCH_FILTERS } from "../lib/mock-data";
import type { Source } from "../lib/types";

interface SearchScreenProps {
  active: boolean;
  onOpenAnime: (id: number) => void;
  onBack: () => void;
}

export function SearchScreen({ active, onOpenAnime, onBack }: SearchScreenProps) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<Source>("anilist");
  const [activeFilter, setActiveFilter] = useState("All");
  const [recent, setRecent] = useState<string[]>(RECENT_SEARCHES);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ANIME.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.titleEnglish ?? "").toLowerCase().includes(q) ||
        a.genres.some((g) => g.toLowerCase().includes(q)) ||
        a.studio.toLowerCase().includes(q),
    );
  }, [query]);

  function submitSearch(q: string) {
    if (!q.trim()) return;
    setQuery(q);
    // Add to recent (dedupe, move to front)
    setRecent((prev) => [q, ...prev.filter((x) => x !== q)].slice(0, 8));
  }

  function removeRecent(item: string) {
    setRecent((prev) => prev.filter((x) => x !== item));
  }

  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view="search"
      data-push="true"
      aria-label="Search"
      aria-hidden={!active}
    >
      <div className="an-topbar">
        <button
          type="button"
          className="an-topbar__iconbtn"
          onClick={onBack}
          aria-label="Back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="an-topbar__title" style={{ fontSize: "var(--fs-h3)" }}>Search</h1>
      </div>

      <div className="an-content">
        {/* Search bar */}
        <div className="an-search__bar">
          <div className="an-search__input-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-text-muted)", flex: "0 0 auto" }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              className="an-search__input"
              placeholder="Search anime, manga, studios…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitSearch(query);
              }}
              autoFocus={active}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--color-text-subtle)", display: "flex", padding: 0, flex: "0 0 auto",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Source toggle */}
        <div className="an-search__source">
          <SegmentedToggle
            fullWidth={false}
            options={[
              { value: "anilist", label: "AniList" },
              { value: "extension", label: "Extension" },
            ]}
            value={source}
            onChange={(v) => setSource(v as Source)}
          />
        </div>

        {/* Filter chips */}
        <div className="an-search__chips">
          {SEARCH_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`an-search__chip ${activeFilter === f ? "an-search__chip--active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results or recent searches */}
        {query.trim() ? (
          results.length > 0 ? (
            <>
              <SectionHeader title={`${results.length} result${results.length === 1 ? "" : "s"}`} />
              <div className="an-grid-3 an-bottom-pad">
                {results.map((a, i) => (
                  <AnimeCard key={a.id} anime={a} index={i} onClick={onOpenAnime} />
                ))}
              </div>
            </>
          ) : (
            <div className="an-lib__empty">
              <div className="an-lib__empty-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="an-lib__empty-title">No results for "{query}"</h3>
              <p className="an-lib__empty-desc">
                Try a different keyword or check the spelling.
              </p>
            </div>
          )
        ) : (
          <>
            <SectionHeader title="Recent Searches" />
            <div className="an-search__recent">
              {recent.map((item) => (
                <div
                  key={item}
                  className="an-search__recent-item"
                  onClick={() => submitSearch(item)}
                  role="button"
                  tabIndex={0}
                >
                  <span className="an-search__recent-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <span className="an-search__recent-text">{item}</span>
                  <button
                    type="button"
                    className="an-search__recent-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecent(item);
                    }}
                    aria-label={`Remove ${item}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "var(--sp-5)" }} />
            <SectionHeader title="Trending Now" />
            <div className="an-grid-3 an-bottom-pad">
              {ANIME.slice(0, 6).map((a, i) => (
                <AnimeCard key={a.id} anime={a} index={i} onClick={onOpenAnime} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
