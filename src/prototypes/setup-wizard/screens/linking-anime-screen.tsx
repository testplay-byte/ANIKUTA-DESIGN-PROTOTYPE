"use client";

/**
 * setup-wizard / screens / linking-anime-screen — Step 8 (#linking).
 *
 * v2 redesign (IMPORTANT screen — user stressed not to mess this up):
 *  - Top heading "Backup Restore".
 *  - Sub-heading "Linking anime".
 *  - Status line "Matching your backup entries" (dropped "to AniList").
 *  - Four stat headings: Linked · No match · Total · Remaining.
 *  - List fills the available space (no small constrained scroll area).
 *  - Two-section rows: left = name (wraps), middle = SVG marker, right =
 *    thumbnail (linked only).
 *  - Click a linked row → popup → "Mark as not linked" (calls onUnlink).
 */
import { useEffect, useState } from "react";
import type { ThemePalette } from "../lib/themes";
import type { LinkedAnime } from "../hooks/use-wizard-state";

interface LinkingAnimeScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  palette: ThemePalette;
  linkedAnime: LinkedAnime[];
  onUnlink: (id: number) => void;
}

export function LinkingAnimeScreen({ active, onNext, onBack, palette, linkedAnime, onUnlink }: LinkingAnimeScreenProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [popupId, setPopupId] = useState<number | null>(null);

  useEffect(() => {
    if (!active) {
      setRevealedCount(0);
      setPopupId(null);
      return;
    }
    setRevealedCount(0);
    const interval = setInterval(() => {
      setRevealedCount((c) => {
        if (c >= linkedAnime.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [active, linkedAnime.length]);

  const linkedCount = linkedAnime.filter((a) => a.linked).length;
  const unlinkedCount = linkedAnime.filter((a) => !a.linked).length;
  const total = linkedAnime.length;
  const remaining = Math.max(0, total - revealedCount);
  const allRevealed = revealedCount >= total;

  const popupAnime = popupId !== null ? linkedAnime.find((a) => a.id === popupId) : null;

  function thumbBg(name: string) {
    // Gradient placeholder using the palette primary.
    return `linear-gradient(135deg, ${palette.primary}, ${palette.primary}77)`;
  }

  return (
    <div className={`wizard-step wizard-step--v2 wizard-step--linking wizard-step--fixed ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <h1 className="wizard-page-heading">Backup Restore</h1>

        <div className="wizard-heading" style={{ alignItems: "center", textAlign: "center" }}>
          <h2 className="wizard-descriptive-title">Linking anime</h2>
          <p className="wizard-screen-sub" style={{ alignSelf: "center", textAlign: "center" }}>Matching your backup entries</p>
        </div>

        {/* Four stat headings — fixed (not in scroll area) */}
        <div className="linking-stats">
          <div className="linking-stat linking-stat--linked">
            <span className="linking-stat__value">{linkedCount}</span>
            <span className="linking-stat__label">Linked</span>
          </div>
          <div className="linking-stat linking-stat--nomatch">
            <span className="linking-stat__value">{unlinkedCount}</span>
            <span className="linking-stat__label">No match</span>
          </div>
          <div className="linking-stat linking-stat--total">
            <span className="linking-stat__value">{total}</span>
            <span className="linking-stat__label">Total</span>
          </div>
          <div className="linking-stat linking-stat--remaining">
            <span className="linking-stat__value">{remaining}</span>
            <span className="linking-stat__label">Remaining</span>
          </div>
        </div>

        <div className="wizard-body">
          {/* List — scrollable; header (above) + footer (below) stay fixed */}
          {/* List — fills available space */}
          <div className="linking-list">
            {linkedAnime.slice(0, revealedCount).map((anime, i) => (
              <div
                key={anime.id}
                className={`linking-row ${anime.linked ? "linking-row--linked" : ""}`}
                style={{ animationDelay: `${0.05 * i}s` }}
                onClick={anime.linked ? () => setPopupId(anime.id) : undefined}
                role={anime.linked ? "button" : undefined}
                tabIndex={anime.linked ? 0 : undefined}
                onKeyDown={anime.linked ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPopupId(anime.id); } } : undefined}
              >
                {/* Left half: name (wraps) */}
                <div className="linking-row__left">
                  <span className="linking-row__name">{anime.backupName}</span>
                  {anime.linked && anime.matchedName ? (
                    <span className="linking-row__matched">{anime.matchedName}</span>
                  ) : null}
                </div>

                {/* Middle: marker */}
                <div className={`linking-row__marker ${anime.linked ? "linking-row__marker--linked" : "linking-row__marker--nomatch"}`}>
                  {anime.linked ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  )}
                </div>

                {/* Right: thumbnail (linked only) */}
                {anime.linked ? (
                  <div className="linking-row__thumb" style={{ background: thumbBg(anime.backupName) }} aria-hidden="true">
                    {anime.backupName.charAt(0)}
                  </div>
                ) : (
                  <div className="linking-row__thumb linking-row__thumb--empty" aria-hidden="true" />
                )}
              </div>
            ))}
            {!allRevealed && (
              <div style={{ display: "flex", justifyContent: "center", padding: "8px" }}>
                <span className="scanning-dots" style={{ color: palette.primary }}>
                  <span /><span /><span />
                </span>
              </div>
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
        <button
          className="wizard-btn wizard-btn--primary"
          onClick={onNext}
          disabled={!allRevealed}
          style={{ background: palette.primary, color: palette.onPrimary, fontWeight: 800, opacity: allRevealed ? 1 : 0.5, cursor: allRevealed ? "pointer" : "not-allowed" }}
        >
          Next
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Popup: mark as not linked */}
      {popupAnime && (
        <div className="wizard-popup" onClick={() => setPopupId(null)} role="dialog" aria-modal="true" aria-label="Anime link options">
          <div className="wizard-popup__sheet" onClick={(e) => e.stopPropagation()}>
            <h2 className="wizard-popup__title">Linked entry</h2>
            <p className="wizard-popup__desc">This entry was auto-linked. If the match is wrong, mark it as not linked — you&apos;ll be able to link it manually.</p>
            <div className="wizard-popup__name">{popupAnime.backupName}</div>
            <div className="wizard-actions" style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
              <button className="wizard-btn wizard-btn--secondary" onClick={() => setPopupId(null)} style={{ fontWeight: 800 }}>
                Keep linked
              </button>
              <button
                className="wizard-btn wizard-btn--primary"
                onClick={() => {
                  onUnlink(popupAnime.id);
                  setPopupId(null);
                }}
                style={{ background: "var(--color-error)", color: "#fff", fontWeight: 800 }}
              >
                Mark as not linked
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
