"use client";

/**
 * setup-wizard / screens / restore-successful-screen — Step 12 (#restore-success).
 *
 * v2.2: "Restore Backup" page-heading top-left. Better success animation.
 * Bolder/bigger stats in a horizontal row (no line break).
 */
import { useId } from "react";
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
  const raw = useId();
  const id = raw.replace(/:/g, "");
  const p = palette.primary;

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <h1 className="wizard-page-heading">Restore Backup</h1>

        <div className="wizard-visual wizard-visual--lg" key={active ? "on" : "off"}>
          <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
            <style>{`
              @keyframes rs-${id}-glow { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.12); } }
              @keyframes rs-${id}-expand { 0% { transform: scale(0.3); opacity: 0.7; } 100% { transform: scale(1.9); opacity: 0; } }
              @keyframes rs-${id}-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
              @keyframes rs-${id}-draw { 0%,15% { stroke-dashoffset: 70; } 50%,100% { stroke-dashoffset: 0; } }
              @keyframes rs-${id}-spark { 0%,100% { opacity: 0.2; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.2); } }
              .rs-${id}-glow { transform-origin: 100px 100px; animation: rs-${id}-glow 2.4s ease-in-out infinite; }
              .rs-${id}-ring1 { transform-origin: 100px 100px; animation: rs-${id}-expand 2.8s ease-out infinite; }
              .rs-${id}-ring2 { transform-origin: 100px 100px; animation: rs-${id}-expand 2.8s ease-out 1.2s infinite; }
              .rs-${id}-ring3 { transform-origin: 100px 100px; animation: rs-${id}-expand 2.8s ease-out 1.8s infinite; }
              .rs-${id}-core { transform-origin: 100px 100px; animation: rs-${id}-pulse 2s ease-in-out infinite; }
              .rs-${id}-check { stroke-dasharray: 70; animation: rs-${id}-draw 1.6s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) 0.3s both; }
              .rs-${id}-spark { transform-origin: center; animation: rs-${id}-spark 2s ease-in-out infinite; }
              @media (prefers-reduced-motion: reduce) { .rs-${id}-glow,.rs-${id}-ring1,.rs-${id}-ring2,.rs-${id}-ring3,.rs-${id}-core,.rs-${id}-spark { animation: none !important; } .rs-${id}-check { stroke-dashoffset: 0 !important; animation: none !important; } }
            `}</style>
            <circle className={`rs-${id}-glow`} cx="100" cy="100" r="60" fill={p} opacity="0.3" style={{ filter: "blur(16px)" }} />
            <circle className={`rs-${id}-ring1`} cx="100" cy="100" r="42" fill="none" stroke={p} strokeWidth="2.5" opacity="0.5" />
            <circle className={`rs-${id}-ring2`} cx="100" cy="100" r="42" fill="none" stroke="var(--color-tertiary, #ccc)" strokeWidth="2" opacity="0.4" />
            <circle className={`rs-${id}-ring3`} cx="100" cy="100" r="42" fill="none" stroke={p} strokeWidth="1.5" opacity="0.3" />
            <g className={`rs-${id}-core`}>
              <circle cx="100" cy="100" r="38" fill={p} />
              <circle cx="100" cy="100" r="38" fill="none" stroke={p} strokeWidth="1" opacity="0.5" />
              <path className={`rs-${id}-check`} d="M82 100 L94 113 L120 87" fill="none" stroke={palette.onPrimary} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            {/* sparkles */}
            <circle className={`rs-${id}-spark`} cx="50" cy="60" r="2.5" fill={p} />
            <circle className={`rs-${id}-spark`} cx="152" cy="58" r="2" fill={p} style={{ animationDelay: "0.5s" }} />
            <circle className={`rs-${id}-spark`} cx="156" cy="140" r="2.2" fill="var(--color-tertiary, #ccc)" style={{ animationDelay: "1s" }} />
            <circle className={`rs-${id}-spark`} cx="46" cy="142" r="1.8" fill={p} style={{ animationDelay: "1.5s" }} />
          </svg>
        </div>

        <div className="wizard-heading" style={{ alignItems: "center", textAlign: "center" }}>
          <h2 className="wizard-descriptive-title">Restore successful!</h2>
        </div>

        <div className="wizard-body">
          <div className="rs-success-stats">
            <div className="rs-success-stat">
              <span className="rs-success-stat__value">{restoredCount}</span>
              <span className="rs-success-stat__label">Anime restored</span>
            </div>
            <div className="rs-success-stat">
              <span className="rs-success-stat__value">{episodes.toLocaleString()}</span>
              <span className="rs-success-stat__label">Episodes</span>
            </div>
            <div className="rs-success-stat">
              <span className="rs-success-stat__value">{categories}</span>
              <span className="rs-success-stat__label">Categories</span>
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
