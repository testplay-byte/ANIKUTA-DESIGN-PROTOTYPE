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
              @keyframes rs-${id}-glow { 0%,100% { opacity: 0.25; transform: scale(1); } 50% { opacity: 0.45; transform: scale(1.1); } }
              @keyframes rs-${id}-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
              @keyframes rs-${id}-fill { 0% { transform: scaleY(0); } 60% { transform: scaleY(1); } 100% { transform: scaleY(1); } }
              @keyframes rs-${id}-draw { 0%,40% { stroke-dashoffset: 30; } 70%,100% { stroke-dashoffset: 0; } }
              @keyframes rs-${id}-spark { 0%,100% { opacity: 0.2; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.2); } }
              .rs-${id}-glow { transform-origin: 100px 110px; animation: rs-${id}-glow 2.6s ease-in-out infinite; }
              .rs-${id}-lib { transform-origin: 100px 120px; animation: rs-${id}-float 3.4s ease-in-out infinite; }
              .rs-${id}-fill { transform-origin: 100px 150px; animation: rs-${id}-fill 1.8s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) 0.3s both; }
              .rs-${id}-check { stroke-dasharray: 30; animation: rs-${id}-draw 1.4s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) 1s both; }
              .rs-${id}-spark { transform-origin: center; animation: rs-${id}-spark 2.2s ease-in-out infinite; }
              @media (prefers-reduced-motion: reduce) { .rs-${id}-glow,.rs-${id}-lib,.rs-${id}-fill,.rs-${id}-spark { animation: none !important; } .rs-${id}-check { stroke-dashoffset: 0 !important; animation: none !important; } }
            `}</style>
            {/* glow */}
            <circle className={`rs-${id}-glow`} cx="100" cy="110" r="58" fill={p} opacity="0.25" style={{ filter: "blur(16px)" }} />

            {/* Library/database stack being restored */}
            <g className={`rs-${id}-lib`}>
              {/* base shelf */}
              <rect x="50" y="150" width="100" height="10" rx="3" fill="var(--color-primary-container)" stroke={p} strokeWidth="2" />
              {/* 3 book spines standing on the shelf, each a slightly different shade */}
              <rect x="58" y="108" width="14" height="42" rx="2" fill={p} opacity="0.85" />
              <rect x="76" y="100" width="14" height="50" rx="2" fill={p} opacity="0.65" />
              <rect x="94" y="112" width="14" height="38" rx="2" fill="var(--color-tertiary, #ccc)" opacity="0.7" />
              <rect x="112" y="104" width="14" height="46" rx="2" fill={p} opacity="0.75" />
              <rect x="130" y="110" width="14" height="40" rx="2" fill={p} opacity="0.55" />
              {/* liquid data filling up the shelf (restore feel) */}
              <rect className={`rs-${id}-fill`} x="52" y="120" width="96" height="32" rx="2" fill={p} opacity="0.18" />
            </g>

            {/* success check badge (top-right of the library) */}
            <g>
              <circle cx="146" cy="64" r="20" fill={p} />
              <path className={`rs-${id}-check`} d="M137 64 L143 70 L156 57" fill="none" stroke={palette.onPrimary} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* sparkles */}
            <circle className={`rs-${id}-spark`} cx="48" cy="58" r="2.5" fill={p} />
            <circle className={`rs-${id}-spark`} cx="158" cy="100" r="2" fill={p} style={{ animationDelay: "0.5s" }} />
            <circle className={`rs-${id}-spark`} cx="44" cy="120" r="1.8" fill="var(--color-tertiary, #ccc)" style={{ animationDelay: "1s" }} />
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
