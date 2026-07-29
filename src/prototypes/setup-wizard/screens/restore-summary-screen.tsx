"use client";

/**
 * setup-wizard / screens / restore-summary-screen — Step 10 (#restore-summary).
 *
 * v2.1 refinements:
 *  - Cleaner, more proper UI redesign (rs-card + rs-stats grid).
 *  - "Restore Backup" heading top-left.
 *  - Restore Now → #restore-processing.
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
  const manuallyLinked = Math.max(0, linkedCount - 5);
  const episodes = 1432;
  const toRestore = linkedCount + 239;

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <h1 className="wizard-page-heading">Restore Backup</h1>

        <div className="wizard-heading" style={{ alignItems: "center", textAlign: "center" }}>
          <h2 className="wizard-descriptive-title">Restore summary</h2>
          <p className="wizard-screen-sub" style={{ alignSelf: "center", textAlign: "center" }}>Ready to restore. Review the details below.</p>
        </div>

        <div className="wizard-body">
          <div className="rs-card">
            <div className="rs-card__header">
              <span className="rs-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" />
                </svg>
              </span>
              <div>
                <p className="rs-card__title">Ready to restore</p>
                <p className="rs-card__sub">Your library will be overwritten with the backup data.</p>
              </div>
            </div>

            <div className="rs-stats">
              <div className="rs-stat">
                <span className="rs-stat__value">{toRestore}</span>
                <span className="rs-stat__label">Anime to restore</span>
              </div>
              <div className="rs-stat">
                <span className="rs-stat__value">{linkedCount}</span>
                <span className="rs-stat__label">Auto-linked</span>
              </div>
              <div className="rs-stat">
                <span className="rs-stat__value">{manuallyLinked}</span>
                <span className="rs-stat__label">Manually linked</span>
              </div>
              <div className="rs-stat">
                <span className="rs-stat__value">{episodes.toLocaleString()}</span>
                <span className="rs-stat__label">Episodes</span>
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
