/* eslint-disable react/no-unknown-property */
/**
 * setup-wizard / components / visuals — abstract animated illustrations (v2 redesign).
 *
 * Redesigned per user feedback: calmer, more premium, anime-app appropriate.
 * No chaotic orbits; clean shapes, gentle motion, soft glow.
 *
 *   1. WelcomeVisual      — a bold app "play" mark with soft glow + gentle
 *                            floating accent shapes (calm, premium entrance).
 *   2. ThemeVisual        — (kept, used as fallback) counter-rotating swatch.
 *                            The Theme screen primarily uses MiniAnimePreview.
 *   3. FolderVisual       — a more detailed folder (tab, gradient, inner file
 *                            lines) with a refined success-check badge.
 *   4. PermissionsVisual  — a cleaner shield with subtle ripples + draw-in
 *                            check (fewer particles than before).
 *   5. RestoreVisual      — a sleek backup file with circular restore arrows
 *                            (replaces the old cloud; user called cloud bad).
 *   6. SummaryVisual      — a calm "manifest/clipboard" stack that fills in.
 *   7. FinishVisual       — a single bold check-in-circle that draws smoothly,
 *                            with subtle refined confetti + soft glow.
 *
 * All use 200×200 viewBox, CSS tokens, useId() namespacing, prefers-reduced-motion.
 */
import { useId } from "react";

/* ------------------------------------------------------------------ */
/* Shared helper: soft blurred glow blob                              */
/* ------------------------------------------------------------------ */
function Glow({ cx, cy, r, color, opacity = 0.35 }: {
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity?: number;
}) {
  return (
    <circle cx={cx} cy={cy} r={r} fill={color} opacity={opacity} style={{ filter: "blur(8px)" }} />
  );
}

/* ------------------------------------------------------------------ */
/* 1. WelcomeVisual — bold play mark + gentle accents (v2)            */
/* ------------------------------------------------------------------ */
export function WelcomeVisual() {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
      <style>{`
        @keyframes wv-${id}-breathe { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.04); opacity: 0.92; } }
        @keyframes wv-${id}-glow { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } }
        @keyframes wv-${id}-float1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(4px,-6px); } }
        @keyframes wv-${id}-float2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-5px,4px); } }
        @keyframes wv-${id}-twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 0.9; } }
        .wv-${id}-mark { transform-origin: 100px 100px; animation: wv-${id}-breathe 3.4s ease-in-out infinite; }
        .wv-${id}-glow { transform-origin: 100px 100px; animation: wv-${id}-glow 3.4s ease-in-out infinite; }
        .wv-${id}-a1 { animation: wv-${id}-float1 5s ease-in-out infinite; }
        .wv-${id}-a2 { animation: wv-${id}-float2 6s ease-in-out infinite; }
        .wv-${id}-spark { animation: wv-${id}-twinkle 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .wv-${id}-mark,.wv-${id}-glow,.wv-${id}-a1,.wv-${id}-a2,.wv-${id}-spark { animation: none !important; } }
      `}</style>

      {/* soft glow */}
      <circle className={`wv-${id}-glow`} cx="100" cy="100" r="62" fill="var(--color-primary)" opacity="0.3" style={{ filter: "blur(14px)" }} />

      {/* rounded square badge with play triangle */}
      <g className={`wv-${id}-mark`}>
        <rect x="58" y="58" width="84" height="84" rx="22" fill="var(--color-primary)" />
        <rect x="58" y="58" width="84" height="84" rx="22" fill="none" stroke="var(--color-primary)" strokeWidth="1" opacity="0.4" />
        <path d="M92 84 L92 116 Q92 122 97.5 119 L122 104 Q127 101 122 98 L97.5 81 Q92 78 92 84 Z" fill="var(--color-primary-fg)" />
      </g>

      {/* gentle floating accent shapes */}
      <circle className={`wv-${id}-a1`} cx="48" cy="60" r="6" fill="var(--color-primary)" opacity="0.25" />
      <circle className={`wv-${id}-a2`} cx="156" cy="142" r="8" fill="var(--color-primary)" opacity="0.2" />
      <rect className={`wv-${id}-a2`} x="150" y="56" width="10" height="10" rx="3" fill="var(--color-primary)" opacity="0.22" transform="rotate(20 155 61)" />
      <rect className={`wv-${id}-a1`} x="42" y="140" width="8" height="8" rx="2" fill="var(--color-primary)" opacity="0.2" transform="rotate(-15 46 144)" />

      {/* subtle sparkles */}
      <circle className={`wv-${id}-spark`} cx="100" cy="34" r="2" fill="var(--color-primary)" />
      <circle className={`wv-${id}-spark`} cx="170" cy="100" r="1.6" fill="var(--color-primary)" style={{ animationDelay: "0.6s" }} />
      <circle className={`wv-${id}-spark`} cx="30" cy="110" r="1.6" fill="var(--color-primary)" style={{ animationDelay: "1.2s" }} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. ThemeVisual — counter-rotating swatch (kept, fallback)          */
/* ------------------------------------------------------------------ */
export function ThemeVisual() {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "hidden" }} aria-hidden="true">
      <style>{`
        @keyframes tv-${id}-spin1 { to { transform: rotate(360deg); } }
        @keyframes tv-${id}-spin2 { to { transform: rotate(-360deg); } }
        @keyframes tv-${id}-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        .tv-${id}-o1 { transform-origin: 100px 100px; animation: tv-${id}-spin1 12s linear infinite; }
        .tv-${id}-o2 { transform-origin: 100px 100px; animation: tv-${id}-spin2 9s linear infinite; }
        .tv-${id}-sw { transform-origin: 100px 100px; animation: tv-${id}-breathe 3.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .tv-${id}-o1,.tv-${id}-o2,.tv-${id}-sw { animation: none !important; } }
      `}</style>
      <Glow cx={100} cy={100} r={48} color="var(--color-primary)" opacity={0.25} />
      <g className={`tv-${id}-o2`}>
        <circle cx="100" cy="32" r="4" fill="var(--color-primary)" />
        <circle cx="168" cy="100" r="4" fill="var(--color-tertiary, #ccc)" />
        <circle cx="100" cy="168" r="4" fill="var(--color-primary)" />
        <circle cx="32" cy="100" r="4" fill="var(--color-tertiary, #ccc)" />
      </g>
      <g className={`tv-${id}-o1`}>
        <circle cx="100" cy="56" r="6" fill="var(--color-primary)" opacity="0.85" />
        <circle cx="144" cy="100" r="6" fill="var(--color-tertiary, #ccc)" opacity="0.7" />
        <circle cx="100" cy="144" r="6" fill="var(--color-primary)" opacity="0.85" />
        <circle cx="56" cy="100" r="6" fill="var(--color-tertiary, #ccc)" opacity="0.7" />
      </g>
      <g className={`tv-${id}-sw`}>
        <rect x="76" y="76" width="48" height="48" rx="14" fill="var(--color-primary-container)" stroke="var(--color-primary)" strokeWidth="2" />
        <circle cx="100" cy="100" r="12" fill="var(--color-primary)" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. FolderVisual — detailed folder + refined success badge (v2)     */
/* ------------------------------------------------------------------ */
export function FolderVisual({ selected = false }: { selected?: boolean }) {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
      <style>{`
        @keyframes fv-${id}-bob { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-4px) rotate(-0.8deg); } }
        @keyframes fv-${id}-pop { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.18); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fv-${id}-twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 0.8; } }
        .fv-${id}-folder { transform-origin: 100px 120px; animation: fv-${id}-bob 3.6s ease-in-out infinite; }
        .fv-${id}-badge { transform-origin: 150px 80px; animation: fv-${id}-pop 0.5s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) both; }
        .fv-${id}-spark { animation: fv-${id}-twinkle 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .fv-${id}-folder,.fv-${id}-badge,.fv-${id}-spark { animation: none !important; } }
      `}</style>
      <Glow cx={100} cy={120} r={56} color="var(--color-primary)" opacity={0.22} />

      <g className={`fv-${id}-folder`}>
        {/* folder tab */}
        <path d="M44 92 Q44 84 52 84 L84 84 L92 92 L148 92 Q156 92 156 100 L156 152 Q156 160 148 160 L52 160 Q44 160 44 152 Z" fill="var(--color-primary-container)" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" />
        {/* inner file lines */}
        <rect x="60" y="108" width="80" height="4" rx="2" fill="var(--color-primary)" opacity="0.5" />
        <rect x="60" y="120" width="60" height="4" rx="2" fill="var(--color-primary)" opacity="0.3" />
        <rect x="60" y="132" width="70" height="4" rx="2" fill="var(--color-primary)" opacity="0.3" />
        {/* highlight */}
        <path d="M44 92 Q44 84 52 84 L84 84 L92 92" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* floating file cards */}
      <g opacity="0.85">
        <rect x="120" y="44" width="26" height="34" rx="3" fill="var(--color-surface-4)" stroke="var(--color-tertiary, #ccc)" strokeWidth="1" />
        <rect x="124" y="50" width="18" height="3" rx="1.5" fill="var(--color-tertiary, #ccc)" opacity="0.6" />
      </g>

      <circle className={`fv-${id}-spark`} cx="56" cy="70" r="2" fill="var(--color-primary)" />
      <circle className={`fv-${id}-spark`} cx="160" cy="120" r="1.8" fill="var(--color-primary)" style={{ animationDelay: "0.8s" }} />

      {selected && (
        <g className={`fv-${id}-badge`}>
          <circle cx="150" cy="80" r="20" fill="var(--color-primary)" />
          <path d="M141 80 L148 87 L160 73" fill="none" stroke="var(--color-bg)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. PermissionsVisual — cleaner shield + draw-in check (v2)         */
/* ------------------------------------------------------------------ */
export function PermissionsVisual() {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
      <style>{`
        @keyframes pm-${id}-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes pm-${id}-ripple { 0% { transform: scale(0.6); opacity: 0.6; } 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes pm-${id}-draw { 0%,15% { stroke-dashoffset: 60; } 45%,75% { stroke-dashoffset: 0; } 90%,100% { stroke-dashoffset: -60; } }
        .pm-${id}-shield { transform-origin: 100px 100px; animation: pm-${id}-float 3.4s ease-in-out infinite; }
        .pm-${id}-ripple1 { transform-origin: 100px 100px; animation: pm-${id}-ripple 3s ease-out infinite; }
        .pm-${id}-ripple2 { transform-origin: 100px 100px; animation: pm-${id}-ripple 3s ease-out infinite 1s; }
        .pm-${id}-check { stroke-dasharray: 60; animation: pm-${id}-draw 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pm-${id}-shield,.pm-${id}-ripple1,.pm-${id}-ripple2 { animation: none !important; } .pm-${id}-check { stroke-dashoffset: 0 !important; animation: none !important; } }
      `}</style>
      <Glow cx={100} cy={100} r={52} color="var(--color-primary)" opacity={0.22} />
      <circle className={`pm-${id}-ripple1`} cx="100" cy="100" r="60" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.4" />
      <circle className={`pm-${id}-ripple2`} cx="100" cy="100" r="60" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.4" />
      <g className={`pm-${id}-shield`}>
        <path d="M100 56 L138 70 L138 104 Q138 134 100 150 Q62 134 62 104 L62 70 Z" fill="var(--color-primary-container)" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M84 100 L95 112 L118 88" fill="none" stroke="var(--color-primary)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className={`pm-${id}-check`} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. RestoreVisual — backup file + circular restore arrows (v2)      */
/* ------------------------------------------------------------------ */
export function RestoreVisual() {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
      <style>{`
        @keyframes rv-${id}-spin { to { transform: rotate(360deg); } }
        @keyframes rv-${id}-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes rv-${id}-glow { 0%,100% { opacity: 0.25; } 50% { opacity: 0.45; } }
        @keyframes rv-${id}-dash { to { stroke-dashoffset: -60; } }
        .rv-${id}-arrows { transform-origin: 100px 100px; animation: rv-${id}-spin 6s linear infinite; }
        .rv-${id}-file { transform-origin: 100px 100px; animation: rv-${id}-bob 3.6s ease-in-out infinite; }
        .rv-${id}-glow { animation: rv-${id}-glow 3s ease-in-out infinite; }
        .rv-${id}-ring { stroke-dasharray: 6 8; animation: rv-${id}-dash 3s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .rv-${id}-arrows,.rv-${id}-file,.rv-${id}-glow,.rv-${id}-ring { animation: none !important; } }
      `}</style>
      <circle className={`rv-${id}-glow`} cx="100" cy="100" r="62" fill="var(--color-primary)" opacity="0.3" style={{ filter: "blur(14px)" }} />
      {/* rotating dashed ring */}
      <circle className={`rv-${id}-ring`} cx="100" cy="100" r="74" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.4" />

      {/* central file */}
      <g className={`rv-${id}-file`}>
        <path d="M74 64 L116 64 L130 78 L130 140 Q130 144 126 144 L74 144 Q70 144 70 140 L70 68 Q70 64 74 64 Z" fill="var(--color-surface-3)" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M116 64 L116 78 L130 78" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" />
        <rect x="80" y="88" width="40" height="3.5" rx="1.75" fill="var(--color-primary)" opacity="0.6" />
        <rect x="80" y="98" width="32" height="3.5" rx="1.75" fill="var(--color-primary)" opacity="0.4" />
        <rect x="80" y="108" width="36" height="3.5" rx="1.75" fill="var(--color-primary)" opacity="0.4" />
        <rect x="80" y="120" width="28" height="3.5" rx="1.75" fill="var(--color-primary)" opacity="0.4" />
      </g>

      {/* circular restore arrows around the file */}
      <g className={`rv-${id}-arrows`}>
        <path d="M100 30 A70 70 0 0 1 168 88" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
        <path d="M168 88 L168 76 M168 88 L156 88" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
        <path d="M100 170 A70 70 0 0 1 32 112" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <path d="M32 112 L32 124 M32 112 L44 112" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6. SummaryVisual — calm manifest/clipboard stack that fills in     */
/* ------------------------------------------------------------------ */
export function SummaryVisual() {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
      <style>{`
        @keyframes sv-${id}-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes sv-${id}-fill { 0% { transform: scaleY(0); } 70% { transform: scaleY(1); } 100% { transform: scaleY(1); } }
        @keyframes sv-${id}-check { 0%,30% { stroke-dashoffset: 30; } 70%,100% { stroke-dashoffset: 0; } }
        .sv-${id}-clip { transform-origin: 100px 100px; animation: sv-${id}-float 3.6s ease-in-out infinite; }
        .sv-${id}-bar1 { transform-origin: 88px 110px; animation: sv-${id}-fill 1.4s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) 0.1s both; }
        .sv-${id}-bar2 { transform-origin: 88px 124px; animation: sv-${id}-fill 1.4s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) 0.25s both; }
        .sv-${id}-bar3 { transform-origin: 88px 138px; animation: sv-${id}-fill 1.4s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) 0.4s both; }
        .sv-${id}-check { stroke-dasharray: 30; animation: sv-${id}-check 2.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .sv-${id}-clip,.sv-${id}-bar1,.sv-${id}-bar2,.sv-${id}-bar3,.sv-${id}-check { animation: none !important; } .sv-${id}-check { stroke-dashoffset: 0 !important; } }
      `}</style>
      <Glow cx={100} cy={100} r={54} color="var(--color-primary)" opacity={0.22} />
      <g className={`sv-${id}-clip`}>
        {/* clipboard */}
        <rect x="62" y="58" width="76" height="96" rx="10" fill="var(--color-surface-3)" stroke="var(--color-primary)" strokeWidth="2" />
        <rect x="84" y="52" width="32" height="12" rx="4" fill="var(--color-primary)" />
        {/* rows that fill in */}
        <rect className={`sv-${id}-bar1`} x="74" y="84" width="24" height="6" rx="3" fill="var(--color-primary)" />
        <rect x="74" y="84" width="40" height="6" rx="3" fill="var(--color-surface-5)" opacity="0.5" />
        <rect className={`sv-${id}-bar2`} x="74" y="98" width="24" height="6" rx="3" fill="var(--color-primary)" opacity="0.8" />
        <rect x="74" y="98" width="40" height="6" rx="3" fill="var(--color-surface-5)" opacity="0.5" />
        <rect className={`sv-${id}-bar3`} x="74" y="112" width="24" height="6" rx="3" fill="var(--color-primary)" opacity="0.6" />
        <rect x="74" y="112" width="40" height="6" rx="3" fill="var(--color-surface-5)" opacity="0.5" />
        {/* check badge */}
        <circle cx="134" cy="138" r="14" fill="var(--color-primary)" />
        <path className={`sv-${id}-check`} d="M127 138 L132 143 L142 132" fill="none" stroke="var(--color-bg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 7. FinishVisual — clean check-in-circle + refined confetti (v2)    */
/* ------------------------------------------------------------------ */
export function FinishVisual() {
  const raw = useId();
  const id = raw.replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
      <style>{`
        @keyframes fn-${id}-glow { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.08); } }
        @keyframes fn-${id}-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes fn-${id}-draw { 0%,10% { stroke-dashoffset: 70; } 45%,100% { stroke-dashoffset: 0; } }
        @keyframes fn-${id}-ring { 0% { transform: scale(0.4); opacity: 0.6; } 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes fn-${id}-confetti { 0% { transform: translateY(0) rotate(0); opacity: 1; } 100% { transform: translateY(70px) rotate(360deg); opacity: 0; } }
        .fn-${id}-glow { transform-origin: 100px 100px; animation: fn-${id}-glow 3s ease-in-out infinite; }
        .fn-${id}-badge { transform-origin: 100px 100px; animation: fn-${id}-pulse 2.6s ease-in-out infinite; }
        .fn-${id}-check { stroke-dasharray: 70; animation: fn-${id}-draw 1.6s var(--ease-emphasized-decel, cubic-bezier(.05,.7,.1,1)) 0.3s both; }
        .fn-${id}-ring1 { transform-origin: 100px 100px; animation: fn-${id}-ring 2.8s ease-out infinite; }
        .fn-${id}-ring2 { transform-origin: 100px 100px; animation: fn-${id}-ring 2.8s ease-out 1.4s infinite; }
        .fn-${id}-confetti { animation: fn-${id}-confetti 2.4s ease-in infinite; }
        @media (prefers-reduced-motion: reduce) { .fn-${id}-glow,.fn-${id}-badge,.fn-${id}-ring1,.fn-${id}-ring2,.fn-${id}-confetti { animation: none !important; } .fn-${id}-check { stroke-dashoffset: 0 !important; animation: none !important; } }
      `}</style>

      <circle className={`fn-${id}-glow`} cx="100" cy="100" r="60" fill="var(--color-primary)" opacity="0.3" style={{ filter: "blur(14px)" }} />
      <circle className={`fn-${id}-ring1`} cx="100" cy="100" r="44" fill="none" stroke="var(--color-primary)" strokeWidth="2" opacity="0.4" />
      <circle className={`fn-${id}-ring2`} cx="100" cy="100" r="44" fill="none" stroke="var(--color-primary)" strokeWidth="2" opacity="0.3" />

      <g className={`fn-${id}-badge`}>
        <circle cx="100" cy="100" r="40" fill="var(--color-primary)" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="var(--color-primary)" strokeWidth="1" opacity="0.5" />
        <path className={`fn-${id}-check`} d="M82 100 L94 113 L120 87" fill="none" stroke="var(--color-primary-fg)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* refined confetti (fewer, calmer) */}
      <rect className={`fn-${id}-confetti`} x="58" y="44" width="5" height="5" rx="1" fill="var(--color-primary)" style={{ animationDelay: "0s" }} />
      <rect className={`fn-${id}-confetti`} x="140" y="50" width="4" height="4" rx="1" fill="var(--color-tertiary, #ccc)" style={{ animationDelay: "0.5s" }} />
      <rect className={`fn-${id}-confetti`} x="100" y="36" width="4" height="4" rx="1" fill="var(--color-primary)" style={{ animationDelay: "1s" }} />
      <rect className={`fn-${id}-confetti`} x="48" y="80" width="4" height="4" rx="1" fill="var(--color-tertiary, #ccc)" style={{ animationDelay: "1.5s" }} />
      <rect className={`fn-${id}-confetti`} x="150" y="86" width="5" height="5" rx="1" fill="var(--color-primary)" style={{ animationDelay: "0.8s" }} />
    </svg>
  );
}

export default { WelcomeVisual, ThemeVisual, FolderVisual, PermissionsVisual, RestoreVisual, SummaryVisual, FinishVisual };
