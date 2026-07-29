"use client";

/**
 * setup-wizard / screens / format-not-supported-screen — Step 5 (#format).
 *
 * v2 redesign:
 *  - Animation KEPT (user likes it).
 *  - Top heading "Restore Backup" (kept at the very top).
 *  - Better description: "This is not the format I was expecting." + new
 *    line "Still, I can try to restore from it properly."
 *  - File details card: name + size + format.
 *  - Renamed button "Don't worry, restore it" → "Try restoring anyway".
 */
import type { ThemePalette } from "../lib/themes";

interface FormatNotSupportedScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  palette: ThemePalette;
}

export function FormatNotSupportedScreen({ active, onNext, onBack, palette }: FormatNotSupportedScreenProps) {
  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow">Restore</p>
          <h1 className="wizard-screen-title">Restore backup</h1>
        </div>

        {/* Inline visual — KEPT from the original (user likes this animation) */}
        <div className="wizard-visual" key={active ? "on" : "off"}>
          <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
            <style>{`
              @keyframes fns-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
              @keyframes fns-pulse { 0%,100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.1); opacity: 1; } }
              @keyframes fns-twinkle { 0%,100% { opacity: 0.2; transform: scale(0.5); } 50% { opacity: 0.9; transform: scale(1.2); } }
              .fns-file { transform-origin: 100px 100px; animation: fns-bob 3s ease-in-out infinite; }
              .fns-warn { transform-origin: 140px 140px; animation: fns-pulse 1.5s ease-in-out infinite; }
              .fns-spark { animation: fns-twinkle 2s ease-in-out infinite; transform-origin: center; }
              @media (prefers-reduced-motion: reduce) { .fns-file,.fns-warn,.fns-spark { animation: none !important; } }
            `}</style>
            <circle cx="100" cy="100" r="64" fill="var(--color-warn)" opacity="0.18" style={{ filter: "blur(10px)" }} />
            <g className="fns-file">
              <path d="M70 52 L120 52 L140 72 L140 152 Q140 156 136 156 L64 156 Q60 156 60 152 L60 56 Q60 52 64 52 Z" fill="var(--color-surface-3)" stroke="var(--color-warn)" strokeWidth="2" strokeLinejoin="round" />
              <path d="M120 52 L120 72 L140 72" fill="none" stroke="var(--color-warn)" strokeWidth="2" strokeLinejoin="round" />
              <rect x="74" y="88" width="52" height="4" rx="2" fill="var(--color-warn)" opacity="0.5" />
              <rect x="74" y="100" width="40" height="4" rx="2" fill="var(--color-warn)" opacity="0.4" />
              <rect x="74" y="112" width="46" height="4" rx="2" fill="var(--color-warn)" opacity="0.4" />
              <rect x="74" y="124" width="34" height="4" rx="2" fill="var(--color-warn)" opacity="0.4" />
            </g>
            <g className="fns-warn">
              <path d="M140 118 L162 158 L118 158 Z" fill="var(--color-warn)" stroke="var(--color-bg)" strokeWidth="2" strokeLinejoin="round" />
              <path d="M140 132 L140 146" stroke="var(--color-bg)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="140" cy="153" r="2" fill="var(--color-bg)" />
            </g>
            <circle className="fns-spark" cx="48" cy="60" r="2" fill="var(--color-warn)" />
            <circle className="fns-spark" cx="160" cy="80" r="1.6" fill="var(--color-warn)" style={{ animationDelay: "0.5s" }} />
            <circle className="fns-spark" cx="50" cy="150" r="1.8" fill="var(--color-warn)" style={{ animationDelay: "1s" }} />
          </svg>
        </div>

        <div className="wizard-body">
          <p className="wizard-screen-sub" style={{ fontSize: "var(--fs-body)", color: "var(--color-text)", fontWeight: 600, maxWidth: "none" }}>
            This is not the format I was expecting.
            <br />
            <span style={{ color: "var(--color-text-muted)", fontWeight: 500 }}>Still, I can try to restore from it properly.</span>
          </p>

          {/* File details card */}
          <div
            className="mock-card"
            style={{ borderColor: `${palette.primary}44`, background: "var(--color-surface-2)", alignSelf: "stretch" }}
          >
            <div className="mock-icon" style={{ background: `${palette.primary}22`, color: palette.primary }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            </div>
            <div className="mock-info">
              <p className="mock-title">anime_backup_2025-01-15.json</p>
              <p className="mock-desc">2.3 MB · JSON (unknown schema)</p>
            </div>
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
          Try restoring anyway
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
