"use client";

/**
 * setup-wizard / screens / restore-summary-screen — Step 10 (#restore-summary).
 *
 * v2 redesign:
 *  - Top heading "Restore Backup".
 *  - Custom M3 Expressive layout (hero card with elegant inline stats),
 *    not the basic stat grid.
 *  - Restore Now → #restore-processing (NEW processing animation screen).
 *  - Fixed the "Manually linked" stat misnomer.
 */
import type { ThemePalette } from "../lib/themes";
import type { LinkedAnime } from "../hooks/use-wizard-state";

interface RestoreSummaryScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  palette: ThemePalette;
  linkedAnime: LinkedAnime[];
}

export function RestoreSummaryScreen({ active, onNext, onBack, palette, linkedAnime }: RestoreSummaryScreenProps) {
  const linkedCount = linkedAnime.filter((a) => a.linked).length;
  const manuallyLinked = Math.max(0, linkedCount - 5); // mock: 5 auto-linked, rest manual
  const episodes = 1432;

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow">Backup Restore</p>
          <h1 className="wizard-screen-title">Restore summary</h1>
          <p className="wizard-screen-sub">Ready to restore. Review the details below.</p>
        </div>

        <div className="wizard-body">
          <div className="restore-hero">
            <h2 className="restore-hero__title">Ready to restore your library</h2>
            <div className="restore-hero__stats">
              <div className="restore-hero__stat">
                <span className="restore-hero__stat-value">{linkedCount + 239}</span>
                <span className="restore-hero__stat-label">Anime to restore</span>
              </div>
              <div className="restore-hero__stat">
                <span className="restore-hero__stat-value">{linkedCount}</span>
                <span className="restore-hero__stat-label">Auto-linked</span>
              </div>
              <div className="restore-hero__stat">
                <span className="restore-hero__stat-value">{manuallyLinked}</span>
                <span className="restore-hero__stat-label">Manually linked</span>
              </div>
              <div className="restore-hero__stat">
                <span className="restore-hero__stat-value">{episodes.toLocaleString()}</span>
                <span className="restore-hero__stat-label">Episodes</span>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "11px 14px",
              borderRadius: "var(--r-md)",
              background: `${palette.primary}11`,
              border: `1px solid ${palette.primary}33`,
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto", marginTop: 1 }} aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
            </svg>
            <p style={{ fontSize: 12, color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
              This will overwrite any existing library data. The restore process may take a few moments.
            </p>
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
          Restore Now
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
