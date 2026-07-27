"use client";

import { useEffect, useState, useMemo } from "react";
import type { ThemePalette } from "../lib/themes";

interface FinishScreenProps {
  active: boolean;
  onRestart: () => void;
  palette: ThemePalette;
}

export function FinishScreen({ active, onRestart, palette }: FinishScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    }
  }, [active]);

  const confetti = useMemo(() => {
    const colors = [palette.primary, palette.secondary, palette.tertiary, "#FFFFFF"];
    return Array.from({ length: 20 }, (_, i) => {
      const sz = 3 + Math.random() * 4;
      const dur = 2 + Math.random();
      return {
        id: i,
        color: colors[i % colors.length],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1s}s`,
        size: sz,
        duration: dur,
      };
    });
  }, [palette]);

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`} style={{ overflow: "hidden" }}>
      {mounted && confetti.map((p) => (
        <div key={p.id} className="wv-confetti" style={{
          left: p.left, backgroundColor: p.color, width: p.size, height: p.size,
          animationDelay: p.delay, animationDuration: `${p.duration}s`,
        }} />
      ))}

      <div className="wv-content" style={{ position: "relative", zIndex: 1, gap: "var(--sp-4)", paddingTop: "var(--sp-8)" }}>
        {/* Beautiful celebration illustration */}
        <div
          className="wv-illustration wv-illustration--lg"
          style={{
            animation: mounted ? "wvScaleIn 0.6s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
          }}
        >
          <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="fi-glow" cx="50%" cy="50%" r="45%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glow */}
            <circle cx="110" cy="110" r="90" fill="url(#fi-glow)" />

            {/* Rotating light rays */}
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1="110" y1="110" x2="110" y2="30" stroke="var(--color-primary)" strokeWidth="1" opacity="0.15"
                style={{
                  transformBox: "fill-box", transformOrigin: "110px 110px",
                  transform: `rotate(${i * 30}deg)`,
                  animation: `wvPulse 3s ease-in-out infinite ${i * 0.25}s`,
                }}
              />
            ))}

            {/* Expanding rings */}
            {[75, 60, 45].map((r, i) => (
              <circle key={r} cx="110" cy="110" r={r} fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity={0.2 + i * 0.1}
                style={{
                  transformBox: "fill-box", transformOrigin: "center",
                  animation: `wvPulse 2.5s ease-in-out infinite ${i * 0.4}s`,
                }}
              />
            ))}

            {/* Glowing star badge */}
            <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvFloat 3s ease-in-out infinite" }}>
              <circle cx="110" cy="110" r="40" fill="var(--color-primary)" opacity="0.12" />
              <circle cx="110" cy="110" r="30" fill="var(--color-primary)" opacity="0.15"
                stroke="var(--color-primary)" strokeWidth="2" />
              {/* Star shape */}
              <path d="M110 80 L114 100 L135 100 L118 115 L125 135 L110 122 L95 135 L102 115 L85 100 L106 100 Z"
                fill="var(--color-primary)" opacity="0.6"
                style={{ filter: "drop-shadow(0 0 12px var(--color-primary-alpha-40))" }}
            </g>

            {/* Ambient sparkles */}
            {[[30, 50], [190, 55], [35, 165], [180, 160], [60, 30], [160, 180]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={2} fill={i % 2 === 0 ? "var(--color-primary)" : "var(--color-tertiary)"} opacity="0.4"
                style={{ animation: `wvPulse 2s ease-in-out infinite ${i * 0.3}s` }} />
            ))}
          </svg>
        </div>

        {/* Badge */}
        <div className="wv-badge" style={{
          animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.35s backwards" : "none",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          10 steps completed
        </div>

        <h1 className="wv-title wv-title--xl" style={{
          animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.45s backwards" : "none",
        }}>
          You&apos;re All Set!
        </h1>

        <p className="wv-subtitle" style={{
          animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.55s backwards" : "none",
        }}>
          ANIKUTA is ready to use. Start exploring your library.
        </p>

        {/* One big Start Exploring button */}
        <div className="wv-actions" style={{
          justifyContent: "center",
          animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.65s backwards" : "none",
        }}>
          <button className="wv-btn wv-btn--primary" onClick={onRestart} style={{ maxWidth: 300, width: "100%", height: 56 }}>
            Start Exploring
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
