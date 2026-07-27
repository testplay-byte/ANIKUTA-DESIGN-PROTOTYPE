"use client";

/**
 * ThemeScreen — Theme mode + color palette selection.
 * Uses SegmentedToggle for mode (Dark / Light / AMOLED)
 * and improved palette swatches with gradient preview bars.
 */

import { useEffect, useState } from "react";
import { SegmentedToggle } from "../components/segmented-toggle";
import { THEME_MODES, PALETTES } from "../lib/themes";
import type { ThemeMode, ThemePalette } from "../lib/themes";

interface ThemeScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  themeMode: ThemeMode;
  setThemeMode: (m: ThemeMode) => void;
  palette: ThemePalette;
  setPalette: (p: ThemePalette) => void;
}

export function ThemeScreen({
  active,
  onNext,
  onBack,
  themeMode,
  setThemeMode,
  palette,
  setPalette,
}: ThemeScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  const modeOptions = THEME_MODES.map((m) => ({
    label: m.name,
    value: m.id,
  }));

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-scroll">
        {/* Title */}
        <div className="wv-section-header wv-stagger-1" style={{ padding: 0 }}>
          Choose Your Look
        </div>

        {/* Theme mode segmented toggle */}
        <div
          className="wv-labeled wv-stagger-2"
          style={{
            animation: mounted
              ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.12s backwards"
              : "none",
          }}
        >
          <p className="wv-labeled__title">Theme Mode</p>
          <p className="wv-labeled__desc">Select your preferred appearance</p>
          <SegmentedToggle
            options={modeOptions}
            selected={themeMode.id}
            onSelect={(id) => {
              const mode = THEME_MODES.find((m) => m.id === id);
              if (mode) setThemeMode(mode);
            }}
          />
        </div>

        {/* Palette selection */}
        <div
          className="wv-labeled wv-stagger-3"
          style={{
            animation: mounted
              ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.22s backwards"
              : "none",
          }}
        >
          <p className="wv-labeled__title">Color Palette</p>
          <p className="wv-labeled__desc">Pick an accent color that suits you</p>
        </div>

        {/* Improved palette grid */}
        <div
          className="wv-palette-grid wv-stagger-4"
          style={{
            animation: mounted
              ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.30s backwards"
              : "none",
          }}
        >
          {PALETTES.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`wv-palette-swatch ${p.id === palette.id ? "wv-palette-swatch--active" : ""}`}
              onClick={() => setPalette(p)}
              style={{
                animation: mounted
                  ? `wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.35 + i * 0.05}s backwards`
                  : "none",
              }}
            >
              {/* Gradient color preview */}
              <div className="wv-palette-swatch__preview">
                <div
                  className="wv-palette-swatch__color"
                  style={{ background: p.primary }}
                />
                <div
                  style={{
                    width: 40,
                    height: 3,
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${p.primary}, ${p.secondary})`,
                    opacity: 0.7,
                  }}
                />
              </div>
              <span className="wv-palette-swatch__name">{p.name}</span>
              {/* Active check indicator */}
              {p.id === palette.id && (
                <div
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: p.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "wvScaleIn 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) backwards",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={p.onPrimary} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Live preview card */}
        <div
          className="wv-card wv-stagger-5"
          style={{
            animation: mounted
              ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.6s backwards"
              : "none",
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Preview
          </p>
          <div style={{ display: "flex", gap: "var(--sp-2)", marginTop: "var(--sp-2)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: palette.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.onPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ height: 10, width: "70%", borderRadius: 5, background: palette.primary, opacity: 0.3 }} />
              <div style={{ height: 8, width: "50%", borderRadius: 4, background: "var(--color-surface-4)" }} />
              <div style={{ height: 8, width: "35%", borderRadius: 4, background: "var(--color-surface-4)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="wv-actions">
        <button className="wv-btn wv-btn--ghost" onClick={onBack}>
          Back
        </button>
        <button className="wv-btn wv-btn--primary" onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
}
