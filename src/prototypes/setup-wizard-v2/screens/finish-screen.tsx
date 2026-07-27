"use client";

/**
 * FinishScreen — Setup complete celebration.
 * Animated checkmark, confetti, stats badge, and CTA.
 */

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

  const confettiPieces = useMemo(() => {
    const colors = [palette.primary, palette.secondary, palette.tertiary, "#FFFFFF", palette.primary];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.2}s`,
      size: 4 + Math.random() * 4,
      duration: 1.8 + Math.random() * 1.2,
    }));
  }, [palette]);

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`} style={{ overflow: "hidden" }}>
      {mounted && confettiPieces.map((p) => (
        <div
          key={p.id}
          className="wv-confetti"
          style={{
            left: p.left,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <div className="wv-content" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="wv-illustration wv-illustration--lg"
          style={{
            animation: mounted
              ? "wvScaleIn 0.6s cubic-bezier(0.05, 0.7, 0.1, 1) 0.15s backwards"
              : "none",
          }}
        >
          <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="finish-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={palette.primary} stopOpacity="0.2" />
                <stop offset="100%" stopColor={palette.primary} stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="110" cy="110" r="100" fill="url(#finish-glow)" />
            <circle
              className={mounted ? "wv-check-circle" : ""}
              cx="110" cy="110" r="80"
              stroke={palette.primary}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              style={!mounted ? { strokeDasharray: 120, strokeDashoffset: 120 } : undefined}
            />
            <path
              className={mounted ? "wv-check-mark" : ""}
              d="M78 112 L100 134 L145 88"
              stroke={palette.primary}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={!mounted ? { strokeDasharray: 50, strokeDashoffset: 50 } : undefined}
            />
            <circle cx="50" cy="60" r="3" fill={palette.primary} opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="170" cy="55" r="2.5" fill={palette.primary} opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="45" cy="160" r="2" fill={palette.secondary} opacity="0.3">
              <animate attributeName="opacity" values="0.15;0.45;0.15" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="175" cy="155" r="3" fill={palette.tertiary} opacity="0.25">
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div
          className="wv-badge"
          style={{
            animation: mounted
              ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.7s backwards"
              : "none",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          6 steps completed
        </div>

        <h1
          className="wv-title wv-title--xl"
          style={{
            animation: mounted
              ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.8s backwards"
              : "none",
          }}
        >
          You&apos;re All Set!
        </h1>

        <p
          className="wv-subtitle"
          style={{
            animation: mounted
              ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.9s backwards"
              : "none",
          }}
        >
          ANIKUTA is ready to use
        </p>

        <div
          className="wv-actions"
          style={{
            flexDirection: "column",
            gap: "var(--sp-2)",
            animation: mounted
              ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 1s backwards"
              : "none",
          }}
        >
          <button
            className="wv-btn wv-btn--primary"
            style={{ width: "100%", maxWidth: 280 }}
          >
            Start Exploring
          </button>
          <button
            className="wv-btn wv-btn--ghost wv-btn--sm"
            onClick={onRestart}
            style={{ width: "100%", maxWidth: 280 }}
          >
            Restart Setup
          </button>
        </div>
      </div>
    </div>
  );
}
