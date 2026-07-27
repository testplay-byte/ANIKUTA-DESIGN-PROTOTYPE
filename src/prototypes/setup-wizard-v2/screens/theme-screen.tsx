"use client";

/**
 * ThemeScreen — Theme mode + color palette selection.
 * Uses SegmentedToggle for mode (Dark / Light / AMOLED)
 * and a 3x2 palette swatch grid.
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

        <div
          className="wv-palette-grid wv-stagger-4"
          style={{
            animation: mounted
              ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.30s backwards"
              : "none",
          }}
        >
          {PALETTES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`wv-palette-swatch ${p.id === palette.id ? "wv-palette-swatch--active" : ""}`}
              onClick={() => setPalette(p)}
            >
              <div
                className="wv-palette-swatch__color"
                style={{ background: p.primary }}
              />
              <span className="wv-palette-swatch__name">{p.name}</span>
            </button>
          ))}
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
