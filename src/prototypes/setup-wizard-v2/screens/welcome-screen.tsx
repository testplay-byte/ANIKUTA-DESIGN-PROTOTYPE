"use client";

/**
 * WelcomeScreen — Redesigned welcome with animated illustration,
 * version badge, feature highlights, and a prominent CTA.
 */

import { useEffect, useState } from "react";
import type { ThemePalette } from "../lib/themes";

interface WelcomeScreenProps {
  active: boolean;
  onNext: () => void;
  palette: ThemePalette;
}

const FEATURES = [
  { icon: "📺", label: "Stream & Download" },
  { icon: "📚", label: "Library Management" },
  { icon: "🔄", label: "Backup & Restore" },
  { icon: "🎨", label: "Custom Themes" },
];

export function WelcomeScreen({ active, onNext, palette }: WelcomeScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  const primary = palette.primary;
  const secondary = palette.secondary;

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`} style={{ overflow: "hidden" }}>
      {/* Decorative gradient background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${primary}10 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Floating orbs */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "-12%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: primary,
          opacity: 0.06,
          filter: "blur(70px)",
          pointerEvents: "none",
          animation: mounted ? "wvFloatSlow 8s ease-in-out infinite" : "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "-8%",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: secondary,
          opacity: 0.06,
          filter: "blur(60px)",
          pointerEvents: "none",
          animation: mounted ? "wvFloatSlow 10s ease-in-out infinite 2s" : "none",
        }}
      />

      {/* Main content */}
      <div className="wv-content" style={{ position: "relative", zIndex: 1, gap: "var(--sp-4)", paddingTop: "var(--sp-8)" }}>
        {/* Animated logo illustration */}
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
              <linearGradient id="w-bg-grad" x1="0" y1="0" x2="220" y2="220">
                <stop offset="0%" stopColor={primary} stopOpacity="0.15" />
                <stop offset="100%" stopColor={primary} stopOpacity="0.03" />
              </linearGradient>
              <linearGradient id="w-accent-grad" x1="60" y1="40" x2="160" y2="180">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor="#8BD930" />
              </linearGradient>
              <radialGradient id="w-glow" cx="50%" cy="45%" r="40%">
                <stop offset="0%" stopColor={primary} stopOpacity="0.25" />
                <stop offset="100%" stopColor={primary} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glow */}
            <circle cx="110" cy="100" r="80" fill="url(#w-glow)" />

            {/* Background circle */}
            <circle cx="110" cy="110" r="90" fill="url(#w-bg-grad)" />

            {/* Decorative rings */}
            <circle cx="110" cy="110" r="100" stroke={primary} strokeWidth="0.5" opacity="0.15" strokeDasharray="3 6" />
            <circle cx="110" cy="110" r="85" stroke={primary} strokeWidth="0.3" opacity="0.1" />

            {/* Phone device frame */}
            <rect x="70" y="48" width="80" height="130" rx="14" fill="var(--color-surface-2)" stroke={primary} strokeWidth="1.5" opacity="0.8" />
            <rect x="76" y="58" width="68" height="106" rx="4" fill="var(--color-bg)" />

            {/* Play button inside phone */}
            <circle cx="110" cy="95" r="22" fill="url(#w-accent-grad)" opacity="0.9" style={{ filter: "drop-shadow(0 2px 12px rgba(177, 242, 86, 0.4))" }}>
              <animate attributeName="r" values="22;23;22" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <path d="M104 88 L104 102 L117 95 Z" fill="var(--color-primary-fg)" opacity="0.95" />

            {/* Signal bars at bottom of phone */}
            <rect x="88" y="145" width="6" height="10" rx="1" fill={primary} opacity="0.5" />
            <rect x="98" y="141" width="6" height="14" rx="1" fill={primary} opacity="0.6" />
            <rect x="108" y="137" width="6" height="18" rx="1" fill={primary} opacity="0.7" />
            <rect x="118" y="133" width="6" height="22" rx="1" fill={primary} opacity="0.8" />

            {/* Orbiting energy dots */}
            <circle cx="175" cy="55" r="4" fill={primary} opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="185" cy="90" r="3" fill={primary} opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="55" r="3" fill={primary} opacity="0.35">
              <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="38" cy="140" r="2.5" fill={secondary} opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2.8s" repeatCount="indefinite" />
            </circle>

            {/* Stars */}
            <polygon points="170,38 173,32 176,38 173,44" fill={primary} opacity="0.45">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.2s" repeatCount="indefinite" />
            </polygon>
            <polygon points="42,72 44,68 46,72 44,76" fill={primary} opacity="0.35">
              <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2.6s" repeatCount="indefinite" />
            </polygon>

            {/* Rotating arc */}
            <path
              d="M 110 20 A 90 90 0 0 1 200 110"
              stroke={primary}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.2"
              strokeDasharray="4 8"
            >
              <animateTransform attributeName="transform" type="rotate" from="0 110 110" to="360 110 110" dur="20s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        {/* Version badge */}
        <div
          style={{
            animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.3s backwards" : "none",
          }}
        >
          <span className="wv-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            v2.0 — NEW
          </span>
        </div>

        {/* Title */}
        <h1
          className="wv-title wv-title--xl"
          style={{
            animation: mounted
              ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.4s backwards"
              : "none",
          }}
        >
          Welcome to{"\n"}ANIKUTA
        </h1>

        {/* Subtitle */}
        <p
          className="wv-subtitle"
          style={{
            animation: mounted
              ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.5s backwards"
              : "none",
          }}
        >
          Your ultimate anime streaming &amp; library companion. Let&apos;s set things up.
        </p>

        {/* Feature highlights */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--sp-2)",
            width: "100%",
            maxWidth: 280,
            animation: mounted
              ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.6s backwards"
              : "none",
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--sp-2)",
                padding: "var(--sp-2) var(--sp-3)",
                borderRadius: 10,
                background: "var(--color-surface-variant-alpha-40)",
                border: "1px solid var(--color-outline-variant)",
                animation: mounted
                  ? `wvFadeInUp 0.35s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.65 + i * 0.06}s backwards`
                  : "none",
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>{f.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)" }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="wv-actions"
          style={{
            justifyContent: "center",
            animation: mounted
              ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.85s backwards"
              : "none",
          }}
        >
          <button className="wv-btn wv-btn--primary" onClick={onNext} style={{ maxWidth: 280, width: "100%" }}>
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
