"use client";

import { useEffect, useState } from "react";
import type { ThemePalette } from "../lib/themes";

interface WelcomeScreenProps {
  active: boolean;
  onNext: () => void;
  palette: ThemePalette;
}

const FEATURES = [
  {
    title: "Stream & Download",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /><line x1="12" y1="3" x2="12" y2="21" /></svg>,
  },
  {
    title: "Library Management",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
  },
  {
    title: "Backup & Restore",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>,
  },
  {
    title: "Custom Themes",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" /><circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>,
  },
];

export function WelcomeScreen({ active, onNext }: WelcomeScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`} style={{ overflow: "hidden" }}>
      {/* Background radial glow */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at 50% 35%, var(--color-primary-alpha-12) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div className="wv-content" style={{ position: "relative", zIndex: 1, gap: "var(--sp-4)", paddingTop: "var(--sp-8)" }}>
        {/* Custom animated illustration — concentric pulsing rings + orbiting dots + sparkles */}
        <div
          className="wv-illustration wv-illustration--lg"
          style={{
            animation: mounted
              ? "wvFloat 4.5s ease-in-out infinite, wvScaleIn 0.7s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards"
              : "none",
          }}
        >
          <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="wc-glow" cx="50%" cy="50%" r="40%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glow */}
            <circle cx="110" cy="110" r="70" fill="url(#wc-glow)" />

            {/* 4 concentric pulsing rings */}
            {[90, 72, 54, 36].map((r, i) => (
              <circle key={r} cx="110" cy="110" r={r} fill="none" stroke="var(--color-primary)"
                strokeWidth={1.5 + i * 0.3} opacity={0.2 + i * 0.12}
                style={{
                  transformBox: "fill-box", transformOrigin: "center",
                  animation: `wvPulse 3s ease-in-out infinite ${i * 0.4}s`,
                }}
              />
            ))}

            {/* Inner orbit — 3 dots, clockwise */}
            <g style={{ transformBox: "fill-box", transformOrigin: "110px 110px", animation: mounted ? "wvRotate 8s linear infinite" : "none" }}>
              <circle cx="110" cy="48" r="5" fill="var(--color-primary)" />
              <circle cx="155" cy="130" r="4" fill="var(--color-tertiary)" />
              <circle cx="65" cy="130" r="4" fill="var(--color-secondary)" />
            </g>

            {/* Outer orbit — 4 dots, counter-clockwise */}
            <g style={{ transformBox: "fill-box", transformOrigin: "110px 110px", animation: mounted ? "wvRotate 12s linear infinite reverse" : "none" }}>
              <circle cx="110" cy="28" r="3" fill="var(--color-secondary)" opacity="0.7" />
              <circle cx="178" cy="110" r="3" fill="var(--color-primary)" opacity="0.7" />
              <circle cx="110" cy="178" r="3" fill="var(--color-tertiary)" opacity="0.7" />
              <circle cx="42" cy="110" r="3" fill="var(--color-primary)" opacity="0.5" />
            </g>

            {/* Ambient sparkles */}
            {[[36, 55], [175, 65], [38, 155], [170, 150], [110, 22], [110, 195]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={2 + (i % 2) * 0.5} fill="var(--color-primary)"
                opacity="0.3" style={{
                  transformBox: "fill-box", transformOrigin: "center",
                  animation: `wvPulse 2s ease-in-out infinite ${i * 0.35}s`,
                }}
              />
            ))}

            {/* Star diamonds */}
            <polygon points="170,42 173,36 176,42 173,48" fill="var(--color-primary)" opacity="0.4"
              style={{ animation: "wvPulse 2.8s ease-in-out infinite 0.5s" }} />
            <polygon points="44,68 46,63 48,68 46,73" fill="var(--color-secondary)" opacity="0.3"
              style={{ animation: "wvPulse 3.2s ease-in-out infinite 1s" }} />
          </svg>
        </div>

        {/* Title */}
        <h1
          className="wv-title wv-title--xl"
          style={{
            animation: mounted ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.35s backwards" : "none",
            whiteSpace: "pre-line",
          }}
        >
          {"Welcome to\nANIKUTA"}
        </h1>

        {/* Subtitle */}
        <p
          className="wv-subtitle"
          style={{
            animation: mounted ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.45s backwards" : "none",
          }}
        >
          Your ultimate anime streaming companion. Let&apos;s set things up.
        </p>

        {/* Feature highlights — NO emojis, SVG icons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--sp-2)",
            width: "100%",
            maxWidth: 280,
            animation: mounted ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.55s backwards" : "none",
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--sp-2)",
                padding: "var(--sp-2) var(--sp-3)",
                borderRadius: 10,
                background: "var(--color-surface-variant-alpha-40)",
                border: "1px solid var(--color-outline-variant)",
                animation: mounted
                  ? `wvFadeInUp 0.35s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.6 + i * 0.06}s backwards`
                  : "none",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>{f.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)" }}>{f.title}</span>
            </div>
          ))}
        </div>

        {/* Get Started button */}
        <div
          className="wv-actions"
          style={{
            justifyContent: "center",
            animation: mounted ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.8s backwards" : "none",
          }}
        >
          <button className="wv-btn wv-btn--outline" onClick={onNext} style={{ maxWidth: 280, width: "100%" }}>
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
