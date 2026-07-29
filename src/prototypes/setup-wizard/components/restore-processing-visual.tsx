"use client";

/**
 * setup-wizard / components / restore-processing-visual — the animation shown
 * on the Restore Now processing screen (#restore-processing).
 *
 * Concept: a central anime card flowing into a library/folder icon, with a
 * circular progress ring and streaming particles. Calm, purposeful, premium.
 * Uses CSS tokens so it adapts to the active palette.
 */
import { useId } from "react";
import type { ThemePalette } from "../lib/themes";

export function RestoreProcessingVisual({ palette }: { palette: ThemePalette }) {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  const p = palette.primary;

  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
      <style>{`
        @keyframes rp-${id}-spin { to { transform: rotate(360deg); } }
        @keyframes rp-${id}-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes rp-${id}-glow { 0%,100% { opacity: 0.25; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.08); } }
        @keyframes rp-${id}-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes rp-${id}-flow { 0% { transform: translate(0,0); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translate(40px, 60px); opacity: 0; } }
        @keyframes rp-${id}-lib { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        .rp-${id}-ring-outer { transform-origin: 100px 100px; animation: rp-${id}-spin 4s linear infinite; }
        .rp-${id}-ring-inner { transform-origin: 100px 100px; animation: rp-${id}-spin-rev 3s linear infinite; }
        .rp-${id}-glow { transform-origin: 100px 100px; animation: rp-${id}-glow 2.4s ease-in-out infinite; }
        .rp-${id}-card { transform-origin: 60px 70px; animation: rp-${id}-pulse 2s ease-in-out infinite; }
        .rp-${id}-lib { transform-origin: 140px 130px; animation: rp-${id}-lib 2s ease-in-out infinite; }
        .rp-${id}-flow { animation: rp-${id}-flow 2.2s ease-in infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rp-${id}-ring-outer, .rp-${id}-ring-inner, .rp-${id}-glow, .rp-${id}-card, .rp-${id}-lib, .rp-${id}-flow { animation: none !important; }
        }
      `}</style>

      <defs>
        <radialGradient id={`rp-${id}-gl`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p} stopOpacity="0.5" />
          <stop offset="100%" stopColor={p} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow */}
      <circle className={`rp-${id}-glow`} cx="100" cy="100" r="70" fill={`url(#rp-${id}-gl)`} />

      {/* Outer dashed ring */}
      <circle className={`rp-${id}-ring-outer`} cx="100" cy="100" r="78" fill="none" stroke={p} strokeWidth="2" strokeDasharray="5 9" strokeLinecap="round" opacity="0.55" />
      {/* Inner ring */}
      <circle className={`rp-${id}-ring-inner`} cx="100" cy="100" r="62" fill="none" stroke="var(--color-tertiary, #ccc)" strokeWidth="1.5" strokeDasharray="3 7" strokeLinecap="round" opacity="0.4" />

      {/* Source anime card (top-left) */}
      <g className={`rp-${id}-card`}>
        <rect x="40" y="50" width="44" height="60" rx="6" fill="var(--color-surface-3)" stroke={p} strokeWidth="1.5" />
        <rect x="46" y="56" width="32" height="22" rx="3" fill={`${p}55`} />
        <rect x="46" y="82" width="26" height="3" rx="1.5" fill={`${p}99`} />
        <rect x="46" y="88" width="18" height="3" rx="1.5" fill="var(--color-surface-5)" />
        <rect x="46" y="96" width="22" height="3" rx="1.5" fill="var(--color-surface-5)" />
      </g>

      {/* Flowing particles from card to library */}
      <circle className={`rp-${id}-flow`} cx="60" cy="70" r="3" fill={p} style={{ animationDelay: "0s" }} />
      <circle className={`rp-${id}-flow`} cx="60" cy="70" r="2.5" fill={p} style={{ animationDelay: "0.55s" }} />
      <circle className={`rp-${id}-flow`} cx="60" cy="70" r="2" fill={p} style={{ animationDelay: "1.1s" }} />
      <circle className={`rp-${id}-flow`} cx="60" cy="70" r="3" fill={p} style={{ animationDelay: "1.65s" }} />

      {/* Destination library/folder (bottom-right) */}
      <g className={`rp-${id}-lib`}>
        <path d="M118 116 h18 l6 6 h24 a4 4 0 0 1 4 4 v22 a4 4 0 0 1 -4 4 h-48 a4 4 0 0 1 -4 -4 v-28 a4 4 0 0 1 4 -4 z" fill="var(--color-primary-container, #333)" stroke={p} strokeWidth="1.5" />
        <rect x="120" y="132" width="40" height="3" rx="1.5" fill={`${p}88`} />
        <rect x="120" y="139" width="28" height="3" rx="1.5" fill="var(--color-surface-5)" />
        <rect x="120" y="146" width="34" height="3" rx="1.5" fill="var(--color-surface-5)" />
        {/* check badge */}
        <circle cx="158" cy="118" r="9" fill={p} />
        <path d="M153 118 l3.5 3.5 l6 -6.5" fill="none" stroke="var(--color-bg, #000)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
