"use client";

/**
 * WelcomeScreen — First screen of the ANIKUTA setup wizard.
 * Features a large animated anime/streaming SVG illustration,
 * decorative blurred orbs, and a centered CTA.
 */

import { useEffect, useState } from "react";
import type { ThemePalette } from "../lib/themes";

interface WelcomeScreenProps {
  active: boolean;
  onNext: () => void;
  palette: ThemePalette;
}

export function WelcomeScreen({ active, onNext, palette }: WelcomeScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    }
  }, [active]);

  const primary = palette.primary;

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      {/* Decorative background orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-15%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: primary,
          opacity: 0.08,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "-10%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "var(--color-tertiary, #EFB8C8)",
          opacity: 0.1,
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "20%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: primary,
          opacity: 0.05,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Main centered content */}
      <div className="wv-content" style={{ position: "relative", zIndex: 1 }}>
        {/* Animated SVG illustration */}
        <div
          className="wv-illustration wv-illustration--lg"
          style={{
            animation: mounted
              ? "wvFloat 4.5s ease-in-out infinite, wvScaleIn 0.6s cubic-bezier(0.05, 0.7, 0.1, 1) backwards"
              : "none",
            animationDelay: "0s, 0.1s",
          }}
        >
          <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="welcome-bg-grad" x1="0" y1="0" x2="220" y2="220">
                <stop offset="0%" stopColor={primary} stopOpacity="0.12" />
                <stop offset="100%" stopColor={primary} stopOpacity="0.03" />
              </linearGradient>
              <linearGradient id="welcome-accent-grad" x1="60" y1="40" x2="180" y2="180">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={primary} stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="welcome-play-grad" x1="95" y1="80" x2="140" y2="145">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor="#8BD930" />
              </linearGradient>
            </defs>

            {/* Outer glow rings */}
            <circle cx="110" cy="110" r="100" stroke={primary} strokeWidth="0.5" opacity="0.2" />
            <circle cx="110" cy="110" r="85" stroke={primary} strokeWidth="0.5" opacity="0.1" />

            {/* Background gradient circle */}
            <circle cx="110" cy="110" r="90" fill="url(#welcome-bg-grad)" />

            {/* Abstract play triangle (streaming) */}
            <path
              d="M90 75 L90 145 L148 110 Z"
              fill="url(#welcome-play-grad)"
              opacity="0.9"
              style={{ filter: "drop-shadow(0 4px 16px rgba(177, 242, 86, 0.35))" }}
            />

            {/* Orbiting dots — anime energy feel */}
            <circle cx="170" cy="60" r="4" fill={primary} opacity="0.7">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="180" cy="95" r="3" fill={primary} opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="55" cy="50" r="2.5" fill={primary} opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="40" cy="140" r="3" fill={primary} opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.8s" repeatCount="indefinite" />
            </circle>

            {/* Small accent diamonds (anime star-burst feel) */}
            <polygon points="165,40 168,34 171,40 168,46" fill={primary} opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.2s" repeatCount="indefinite" />
            </polygon>
            <polygon points="42,70 44,66 46,70 44,74" fill={primary} opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.6s" repeatCount="indefinite" />
            </polygon>

            {/* Circular arc strokes (streaming rings) */}
            <path
              d="M 110 25 A 85 85 0 0 1 195 110"
              stroke={primary}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.25"
              strokeDasharray="4 8"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 110 110"
                to="360 110 110"
                dur="20s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M 110 195 A 85 85 0 0 1 25 110"
              stroke={primary}
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.15"
              strokeDasharray="6 10"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 110 110"
                to="0 110 110"
                dur="25s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>

        {/* Title */}
        <h1
          className="wv-title wv-title--xl"
          style={{
            animation: mounted
              ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s backwards"
              : "none",
          }}
        >
          Welcome to ANIKUTA
        </h1>

        {/* Subtitle */}
        <p
          className="wv-subtitle"
          style={{
            animation: mounted
              ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.35s backwards"
              : "none",
          }}
        >
          Your ultimate anime streaming companion
        </p>

        {/* Get Started button */}
        <div
          className="wv-actions"
          style={{
            justifyContent: "center",
            animation: mounted
              ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.45s backwards"
              : "none",
          }}
        >
          <button className="wv-btn wv-btn--primary" onClick={onNext}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
