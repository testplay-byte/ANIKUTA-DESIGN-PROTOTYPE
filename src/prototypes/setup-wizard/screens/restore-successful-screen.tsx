"use client";

/**
 * setup-wizard / screens / restore-successful-screen — Step 12 (#restore-success).
 *
 * v2 redesign:
 *  - Top-left heading.
 *  - Show restore STATISTICS (anime restored, episodes, categories), not
 *    just one number.
 *  - Continue → #poison (was → finish).
 *  - Keeps the success check animation (refined).
 */
import type { ThemePalette } from "../lib/themes";
import type { LinkedAnime } from "../hooks/use-wizard-state";

interface RestoreSuccessfulScreenProps {
  active: boolean;
  onNext: () => void;
  palette: ThemePalette;
  linkedAnime: LinkedAnime[];
}

export function RestoreSuccessfulScreen({ active, onNext, palette, linkedAnime }: RestoreSuccessfulScreenProps) {
  const restoredCount = linkedAnime.filter((a) => a.linked).length + 239;
  const episodes = 1432;
  const categories = 12;

  const p = palette.primary;

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow">Backup Restore</p>
          <h1 className="wizard-screen-title">Restore successful!</h1>
        </div>

        <div className="wizard-visual wizard-visual--lg" key={active ? "on" : "off"}>
          <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
            <style>{`
              @keyframes rs-glow { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } }
              @keyframes rs-expand { 0% { transform: scale(0.3); opacity: 0.7; } 100% { transform: scale(1.8); opacity: 0; } }
              @keyframes rs-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
              @keyframes rs-draw { 0%,15% { stroke-dashoffset: 70; } 50%,100% { stroke-dashoffset: 0; } }
              .rs-glow { transform-origin: 100px 100px; animation: rs-glow 2.4s ease-in-out infinite; }
              .rs-ring1 { transform-origin: 100px 100px; animation: rs-expand 2.6s ease-out infinite; }
              .rs-ring2 { transform-origin: 100px 100px; animation: rs-expand 2.6s ease-out 1s infinite; }
              .rs-core { transform-origin: 100px 100px; animation: rs-pulse 2s ease-in-out infinite; }
              .rs-check { stroke-dasharray: 70; animation: rs-draw 1.6s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) 0.2s both; }
              @media (prefers-reduced-motion: reduce) { .rs-glow,.rs-ring1,.rs-ring2,.rs-core { animation: none !important; } .rs-check { stroke-dashoffset: 0 !important; animation: none !important; } }
            `}</style>
            <circle className="rs-glow" cx="100" cy="100" r="58" fill={p} opacity="0.3" style={{ filter: "blur(14px)" }} />
            <circle className="rs-ring1" cx="100" cy="100" r="40" fill="none" stroke={p} strokeWidth="2.5" opacity="0.5" />
            <circle className="rs-ring2" cx="100" cy="100" r="40" fill="none" stroke="var(--color-tertiary, #ccc)" strokeWidth="2" opacity="0.4" />
            <g className="rs-core">
              <circle cx="100" cy="100" r="38" fill={p} />
              <path className="rs-check" d="M82 100 L94 113 L120 87" fill="none" stroke={palette.onPrimary} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>

        <div className="wizard-body">
          <p className="wizard-screen-sub" style={{ fontSize: "var(--fs-body)", color: "var(--color-text)", fontWeight: 500, maxWidth: "none" }}>
            Your library has been restored. Here&apos;s what was recovered:
          </p>
          <div className="linking-stats">
            <div className="linking-stat linking-stat--linked">
              <span className="linking-stat__value">{restoredCount}</span>
              <span className="linking-stat__label">Anime restored</span>
            </div>
            <div className="linking-stat linking-stat--total">
              <span className="linking-stat__value">{episodes.toLocaleString()}</span>
              <span className="linking-stat__label">Episodes</span>
            </div>
            <div className="linking-stat linking-stat--linked">
              <span className="linking-stat__value">{categories}</span>
              <span className="linking-stat__label">Categories</span>
            </div>
          </div>
        </div>
      </div>
      <div className="wizard-actions">
        <button className="wizard-btn wizard-btn--primary" onClick={onNext} style={{ background: palette.primary, color: palette.onPrimary, fontWeight: 800 }}>
          Continue
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
