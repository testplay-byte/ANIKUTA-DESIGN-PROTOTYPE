"use client";

/**
 * setup-wizard / screens / manual-linking-screen — Step 9 (#manual).
 *
 * v2 redesign:
 *  - Top heading "Restore Backup".
 *  - Sub-heading "Manual linking" + options line.
 *  - Redesigned, beautiful search overlay (nice search bar, poster
 *    thumbnails, smooth transitions, clear Link affordance).
 */
import { useState } from "react";
import type { ThemePalette } from "../lib/themes";
import type { LinkedAnime } from "../hooks/use-wizard-state";

interface ManualLinkingScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  palette: ThemePalette;
  linkedAnime: LinkedAnime[];
  onLink: (id: number, matchedName: string) => void;
}

const MOCK_SEARCH_RESULTS = [
  { title: "Demon Slayer: Hashira Training Arc", sub: "Kimetsu no Yaiba · 2024" },
  { title: "Kimetsu no Yaiba: Hashira Geiko-hen", sub: "Japanese title · 2024" },
  { title: "Demon Slayer Season 4", sub: "Sequel · 8 eps" },
  { title: "Demon Slayer: To the Swordsmith Village", sub: "Movie · 2023" },
  { title: "Kimetsu no Yaiba: Yuukaku-hen", sub: "Entertainment District · 2021" },
];

export function ManualLinkingScreen({ active, onNext, onBack, palette, linkedAnime, onLink }: ManualLinkingScreenProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);

  const unlinked = linkedAnime.filter((a) => !a.linked);
  const selectedAnime = linkedAnime.find((a) => a.id === selectedAnimeId);

  function handleOpenSearch(anime: LinkedAnime) {
    setSelectedAnimeId(anime.id);
    setSearchQuery(anime.backupName);
    setSearchOpen(true);
  }
  function handleSelectResult(title: string) {
    if (selectedAnimeId !== null) onLink(selectedAnimeId, title);
    setSearchOpen(false);
    setSelectedAnimeId(null);
    setSearchQuery("");
  }

  const filteredResults = MOCK_SEARCH_RESULTS.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.sub.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function posterBg(title: string) {
    return `linear-gradient(135deg, ${palette.primary}, ${palette.primary}77)`;
  }

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow">Backup Restore</p>
          <h1 className="wizard-screen-title">Manual linking</h1>
          <p className="wizard-screen-sub">
            {unlinked.length > 0
              ? `${unlinked.length} anime need your help. Tap any entry to search for a match.`
              : "All anime are linked! You're ready to continue."}
          </p>
        </div>

        <div className="wizard-body">
          <div className="linking-list" style={{ maxHeight: "none", flex: "1 1 auto" }}>
            {unlinked.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "24px", border: `1px solid ${palette.primary}33`, borderRadius: "var(--r-md)", background: "var(--color-surface-2)" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <p style={{ fontSize: 13, fontWeight: 700, color: palette.primary, margin: 0 }}>All linked!</p>
              </div>
            ) : (
              unlinked.map((anime, i) => (
                <button
                  key={anime.id}
                  onClick={() => handleOpenSearch(anime)}
                  className="linking-row"
                  style={{ animationDelay: `${0.05 * i}s`, cursor: "pointer", textAlign: "left" }}
                >
                  <div className="linking-row__left">
                    <span className="linking-row__name">{anime.backupName}</span>
                  </div>
                  <div className="linking-row__marker linking-row__marker--nomatch">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "var(--color-text-muted)", flex: "0 0 auto" }}>Search</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="wizard-actions">
        <button className="wizard-btn wizard-btn--secondary" onClick={onBack} style={{ fontWeight: 800 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button className="wizard-btn wizard-btn--primary" onClick={onNext} style={{ background: palette.primary, color: palette.onPrimary, fontWeight: 800 }}>
          Continue
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Search overlay — v2: centered, modern */}
      {searchOpen && (
        <div className="search-overlay search-overlay--v2">
          <button className="search-overlay__back" onClick={() => { setSearchOpen(false); setSelectedAnimeId(null); }} aria-label="Close search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="search-overlay__header">
            <h2 className="search-overlay__title">Find a match</h2>
          </div>
          <div className="search-overlay__input-wrap">
            <span className="search-overlay__input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="text"
              className="search-overlay__input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for anime…"
              autoFocus
            />
          </div>
          <div className="search-overlay__info">
            Linking: <b>{selectedAnime?.backupName}</b>
          </div>
          <div className="search-overlay__results">
            {filteredResults.length === 0 ? (
              <div className="search-overlay__empty">No results found. Try a different search.</div>
            ) : (
              filteredResults.map((result, i) => (
                <button
                  key={result.title}
                  className="search-result"
                  onClick={() => handleSelectResult(result.title)}
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  <span className="search-result__poster" style={{ background: posterBg(result.title) }}>
                    {result.title.charAt(0)}
                  </span>
                  <span className="search-result__text">
                    <span className="search-result__title">{result.title}</span>
                    <span className="search-result__sub">{result.sub}</span>
                  </span>
                  <span className="search-result__link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
