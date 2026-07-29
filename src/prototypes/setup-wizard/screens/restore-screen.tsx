"use client";

/**
 * setup-wizard / screens / restore-screen — Step 4 (#restore).
 *
 * v2 redesign:
 *  - Top-left heading "Restore Backup".
 *  - Cloud animation replaced with a sleek "backup file + circular restore
 *    arrows" visual (user explicitly called the cloud bad).
 */
import type { ThemePalette } from "../lib/themes";
import { RestoreVisual } from "../components/visuals";

interface RestoreScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  palette: ThemePalette;
}

export function RestoreScreen({ active, onNext, onBack, onSkip, palette }: RestoreScreenProps) {
  return (
    <div className={`wizard-step wizard-step--v2 wizard-step--anim-first ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-visual" key={active ? "on" : "off"}>
          <RestoreVisual />
        </div>

        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow">Restore</p>
          <h1 className="wizard-screen-title">Restore backup</h1>
          <p className="wizard-screen-sub">Got a backup from a previous install? Restore your library, history, and settings in one tap.</p>
        </div>

        <div className="wizard-body">
          <button
            className="wizard-btn wizard-btn--select"
            style={{ color: palette.primary, borderColor: palette.primary, alignSelf: "center" }}
            onClick={onNext}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
            </svg>
            Select Backup File
          </button>
        </div>
      </div>
      <div className="wizard-actions">
        <button className="wizard-btn wizard-btn--secondary" onClick={onBack} style={{ fontWeight: 800 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button className="wizard-btn wizard-btn--ghost" onClick={onSkip} style={{ fontWeight: 800 }}>
          Skip
        </button>
      </div>
    </div>
  );
}
