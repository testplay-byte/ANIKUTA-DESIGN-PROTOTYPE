"use client";

import { useEffect, useState } from "react";

interface RestoreBackupScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function RestoreBackupScreen({ active, onNext, onBack }: RestoreBackupScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-content" style={{ paddingTop: "var(--sp-6)", gap: "var(--sp-5)" }}>
        {/* Cloud + data stream illustration */}
        <div className="wv-illustration wv-illustration--lg" style={{
          animation: mounted ? "wvFloat 4.5s ease-in-out infinite, wvScaleIn 0.6s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
        }}>
          <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="rb-glow" cx="50%" cy="40%" r="45%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="110" cy="90" r="80" fill="url(#rb-glow)" />

            {/* Background rings */}
            <circle cx="110" cy="90" r="90" fill="none" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="4 8" opacity="0.15"
              style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvRotate 20s linear infinite" }} />
            <circle cx="110" cy="90" r="80" fill="none" stroke="var(--color-secondary)" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.12"
              style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvRotate 30s linear infinite reverse" }} />

            {/* Cloud puffs */}
            <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvFloat 4s ease-in-out infinite" }}>
              <circle cx="80" cy="65" r="28" fill="var(--color-surface-3)" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.6" />
              <circle cx="110" cy="50" r="32" fill="var(--color-surface-3)" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.7" />
              <circle cx="140" cy="62" r="26" fill="var(--color-surface-3)" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.6" />
              <rect x="62" y="65" width="96" height="24" rx="4" fill="var(--color-surface-3)" />
            </g>

            {/* Data particles flowing down */}
            {[0, 0.3, 0.6, 0.9, 1.2].map((delay, i) => (
              <circle key={i} cx={85 + i * 12} r="2.5" fill="var(--color-primary)" opacity="0.5"
                style={{
                  animation: `rb-fall 2s ease-in infinite ${delay}s`,
                }}
              />
            ))}
            <style>{`
              @keyframes rb-fall {
                0% { transform: translateY(0); opacity: 0.6; }
                100% { transform: translateY(60px); opacity: 0; }
              }
            `}</style>

            {/* Tray at bottom */}
            <rect x="55" y="140" width="110" height="50" rx="12" fill="var(--color-surface-variant-alpha-50)" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.5" />
            <rect x="65" y="150" width="90" height="4" rx="2" fill="var(--color-primary)" opacity="0.2" />
            <rect x="65" y="160" width="70" height="4" rx="2" fill="var(--color-primary)" opacity="0.15" />
            <rect x="65" y="170" width="80" height="4" rx="2" fill="var(--color-primary)" opacity="0.1" />

            {/* Download arrow */}
            <g style={{ animation: "wvPulse 1.5s ease-in-out infinite" }}>
              <path d="M110 115 L110 130" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
              <polyline points="102 124 110 132 118 124" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Orbiting dots */}
            <circle cx="170" cy="40" r="3" fill="var(--color-primary)" opacity="0.35" style={{ animation: "wvPulse 2.5s ease-in-out infinite" }} />
            <circle cx="45" cy="160" r="2.5" fill="var(--color-secondary)" opacity="0.3" style={{ animation: "wvPulse 3s ease-in-out infinite 0.8s" }} />
          </svg>
        </div>

        <h1 className="wv-title" style={{
          animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.3s backwards" : "none",
        }}>
          Restore Backup
        </h1>

        <p className="wv-subtitle" style={{
          animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.4s backwards" : "none",
        }}>
          Import a previous ANIKUTA backup to restore your library and settings
        </p>

        {/* Select backup file card */}
        <div className="wv-card" style={{
          maxWidth: 300, width: "100%",
          animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.5s backwards" : "none",
        }}>
          <div className="wv-card__header">
            <div className="wv-card__icon">
              <div className="wv-card__icon-bg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="wv-card__title">Select Backup File</h3>
              <p className="wv-card__desc">Choose an .abk backup file</p>
            </div>
          </div>
          <button className="wv-btn wv-btn--primary wv-btn--sm" onClick={onNext} style={{ width: "100%" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Restore from File
          </button>
        </div>
      </div>

      <div className="wv-actions">
        <button className="wv-btn wv-btn--ghost" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
