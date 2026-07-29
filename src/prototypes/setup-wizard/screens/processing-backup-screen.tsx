"use client";

/**
 * setup-wizard / screens / processing-backup-screen — Step 6 (#processing).
 *
 * v2 redesign:
 *  - Better, more purposeful animation: a file unfolding into rows of data
 *    being parsed, with a circular progress feel.
 *  - Auto-advances to #summary after ~2.5s.
 */
import { useEffect } from "react";
import type { ThemePalette } from "../lib/themes";

interface ProcessingBackupScreenProps {
  active: boolean;
  onNext: () => void;
  palette: ThemePalette;
}

export function ProcessingBackupScreen({ active, onNext, palette }: ProcessingBackupScreenProps) {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => onNext(), 2500);
    return () => clearTimeout(t);
  }, [active, onNext]);

  const p = palette.primary;

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow">Restore</p>
          <h1 className="wizard-screen-title">Processing backup</h1>
          <p className="wizard-screen-sub">Reading your backup file and extracting data…</p>
        </div>

        <div className="wizard-visual" key={active ? "on" : "off"}>
          <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
            <style>{`
              @keyframes pb-spin { to { transform: rotate(360deg); } }
              @keyframes pb-spin-rev { to { transform: rotate(-360deg); } }
              @keyframes pb-glow { 0%,100% { opacity: 0.25; transform: scale(1); } 50% { opacity: 0.45; transform: scale(1.08); } }
              @keyframes pb-parse { 0% { transform: translateX(-30px); opacity: 0; } 30% { opacity: 1; } 70% { opacity: 1; } 100% { transform: translateX(30px); opacity: 0; } }
              @keyframes pb-row-in { 0%,40% { transform: scaleY(0); opacity: 0; } 60%,100% { transform: scaleY(1); opacity: 1; } }
              .pb-ring-outer { transform-origin: 100px 100px; animation: pb-spin 4s linear infinite; }
              .pb-ring-inner { transform-origin: 100px 100px; animation: pb-spin-rev 3s linear infinite; }
              .pb-glow { transform-origin: 100px 100px; animation: pb-glow 2s ease-in-out infinite; }
              .pb-parse { animation: pb-parse 2.2s ease-in-out infinite; }
              .pb-row1 { transform-origin: 100px 92px; animation: pb-row-in 2.4s ease-in-out infinite; }
              .pb-row2 { transform-origin: 100px 104px; animation: pb-row-in 2.4s ease-in-out 0.3s infinite; }
              .pb-row3 { transform-origin: 100px 116px; animation: pb-row-in 2.4s ease-in-out 0.6s infinite; }
              .pb-row4 { transform-origin: 100px 128px; animation: pb-row-in 2.4s ease-in-out 0.9s infinite; }
              @media (prefers-reduced-motion: reduce) { .pb-ring-outer,.pb-ring-inner,.pb-glow,.pb-parse,.pb-row1,.pb-row2,.pb-row3,.pb-row4 { animation: none !important; } }
            `}</style>
            <circle className="pb-glow" cx="100" cy="100" r="60" fill={p} opacity="0.3" style={{ filter: "blur(14px)" }} />
            <circle className="pb-ring-outer" cx="100" cy="100" r="76" fill="none" stroke={p} strokeWidth="2" strokeDasharray="5 9" strokeLinecap="round" opacity="0.5" />
            <circle className="pb-ring-inner" cx="100" cy="100" r="62" fill="none" stroke="var(--color-tertiary, #ccc)" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" opacity="0.4" />

            {/* central file transforming into rows */}
            <rect x="68" y="76" width="64" height="56" rx="6" fill="var(--color-surface-3)" stroke={p} strokeWidth="1.5" />
            {/* parsing particles flowing through */}
            <circle className="pb-parse" cx="100" cy="100" r="2.5" fill={p} style={{ animationDelay: "0s" }} />
            <circle className="pb-parse" cx="100" cy="100" r="2" fill={p} style={{ animationDelay: "0.55s" }} />
            <circle className="pb-parse" cx="100" cy="100" r="2.5" fill={p} style={{ animationDelay: "1.1s" }} />
            <circle className="pb-parse" cx="100" cy="100" r="2" fill={p} style={{ animationDelay: "1.65s" }} />
            {/* rows being parsed */}
            <rect className="pb-row1" x="76" y="90" width="48" height="4" rx="2" fill={p} opacity="0.8" />
            <rect className="pb-row2" x="76" y="102" width="40" height="4" rx="2" fill={p} opacity="0.6" />
            <rect className="pb-row3" x="76" y="114" width="44" height="4" rx="2" fill={p} opacity="0.6" />
            <rect className="pb-row4" x="76" y="126" width="36" height="4" rx="2" fill={p} opacity="0.5" />
          </svg>
        </div>

        <div className="wizard-body">
          <span className="scanning-pill" style={{ background: `${p}22`, color: p, alignSelf: "center" }}>
            <span className="scanning-dots"><span /><span /><span /></span>
            Processing
          </span>
        </div>
      </div>
      <div className="wizard-actions">
        <span className="wizard-btn wizard-btn--ghost" style={{ cursor: "default", color: "var(--color-text-muted)", fontWeight: 800 }}>
          Please wait…
        </span>
      </div>
    </div>
  );
}
