"use client";

/**
 * setup-wizard / screens / restore-successful-screen — Step 12 (#restore-success).
 *
 * v2.4: Better restore-themed animation (a database cylinder with data flowing
 * into a library, + a success check). Statistics REMOVED per user request.
 * Continue → #poison.
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
  void linkedAnime;
  const raw = useId();
  const id = raw.replace(/:/g, "");
  const p = palette.primary;

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content" style={{ justifyContent: "center" }}>
        <h1 className="wizard-page-heading">Restore Backup</h1>

        <div className="wizard-visual wizard-visual--lg" key={active ? "on" : "off"}>
          <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
            <style>{`
              @keyframes rs-${id}-glow { 0%,100% { opacity: 0.25; transform: scale(1); } 50% { opacity: 0.45; transform: scale(1.1); } }
              @keyframes rs-${id}-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
              @keyframes rs-${id}-flow { 0% { transform: translateY(-30px); opacity: 0; } 25% { opacity: 1; } 75% { opacity: 1; } 100% { transform: translateY(30px); opacity: 0; } }
              @keyframes rs-${id}-draw { 0%,50% { stroke-dashoffset: 30; } 80%,100% { stroke-dashoffset: 0; } }
              @keyframes rs-${id}-pop { 0%,45% { transform: scale(0); opacity: 0; } 65% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
              .rs-${id}-glow { transform-origin: 100px 100px; animation: rs-${id}-glow 2.6s ease-in-out infinite; }
              .rs-${id}-db { transform-origin: 100px 100px; animation: rs-${id}-float 3.4s ease-in-out infinite; }
              .rs-${id}-flow { animation: rs-${id}-flow 2s ease-in infinite; }
              .rs-${id}-check { stroke-dasharray: 30; animation: rs-${id}-draw 1.2s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) 1.4s both; }
              .rs-${id}-badge { transform-origin: 142px 58px; animation: rs-${id}-pop 0.6s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) 1.2s both; }
              @media (prefers-reduced-motion: reduce) { .rs-${id}-glow,.rs-${id}-db,.rs-${id}-flow,.rs-${id}-badge { animation: none !important; } .rs-${id}-check { stroke-dashoffset: 0 !important; animation: none !important; } }
            `}</style>
            {/* glow */}
            <circle className={`rs-${id}-glow`} cx="100" cy="100" r="62" fill={p} opacity="0.25" style={{ filter: "blur(16px)" }} />

            {/* Database cylinder (restore source) */}
            <g className={`rs-${id}-db`}>
              {/* top ellipse */}
              <ellipse cx="100" cy="56" rx="44" ry="12" fill="var(--color-primary-container)" stroke={p} strokeWidth="2.5" />
              {/* body */}
              <path d="M56 56 L56 120 Q56 132 100 132 Q144 132 144 120 L144 56" fill="var(--color-primary-container)" stroke={p} strokeWidth="2.5" strokeLinejoin="round" />
              {/* middle rings (database tiers) */}
              <ellipse cx="100" cy="78" rx="44" ry="12" fill="none" stroke={p} strokeWidth="1.5" opacity="0.5" />
              <ellipse cx="100" cy="100" rx="44" ry="12" fill="none" stroke={p} strokeWidth="1.5" opacity="0.4" />
              {/* top highlight */}
              <ellipse cx="100" cy="54" rx="36" ry="8" fill="none" stroke={p} strokeWidth="1" opacity="0.6" />
            </g>

            {/* Flowing data particles (data being restored) */}
            <circle className={`rs-${id}-flow`} cx="80" cy="100" r="3" fill={p} style={{ animationDelay: "0s" }} />
            <circle className={`rs-${id}-flow`} cx="100" cy="100" r="3.5" fill={p} style={{ animationDelay: "0.5s" }} />
            <circle className={`rs-${id}-flow`} cx="120" cy="100" r="3" fill={p} style={{ animationDelay: "1s" }} />
            <circle className={`rs-${id}-flow`} cx="90" cy="100" r="2.5" fill="var(--color-tertiary, #ccc)" style={{ animationDelay: "1.5s" }} />
            <circle className={`rs-${id}-flow`} cx="110" cy="100" r="2.5" fill={p} style={{ animationDelay: "0.3s" }} />

            {/* Success check badge (pops in after data flows) */}
            <g className={`rs-${id}-badge`}>
              <circle cx="142" cy="58" r="22" fill={p} />
              <circle cx="142" cy="58" r="22" fill="none" stroke={p} strokeWidth="1" opacity="0.5" />
              <path className={`rs-${id}-check`} d="M132 58 L139 65 L153 51" fill="none" stroke={palette.onPrimary} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>

        <div className="wizard-heading" style={{ alignItems: "center", textAlign: "center" }}>
          <h2 className="wizard-descriptive-title">Restore successful!</h2>
          <p className="wizard-screen-sub" style={{ alignSelf: "center", textAlign: "center" }}>
            Your library has been restored and is ready to go.
          </p>
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
