"use client";

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

export function ThemeScreen({ active, onNext, onBack, themeMode, setThemeMode, palette, setPalette }: ThemeScreenProps) {
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
      <div className="wv-scroll">
        {/* Big bold heading */}
        <h1
          className="wv-title wv-title--page"
          style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.06s backwards" : "none" }}
        >
          Choose Your Theme
        </h1>
        <p style={{ fontSize: "var(--fs-body-l)", color: "var(--color-text-muted)", margin: "0 0 var(--sp-4)", lineHeight: 1.5,
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
        }}>
          Pick the look that suits you best
        </p>

        {/* Theme mode */}
        <div className="wv-labeled" style={{
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.15s backwards" : "none",
        }}>
          <p className="wv-labeled__title">Appearance</p>
          <SegmentedToggle
            options={THEME_MODES.map((m) => ({ label: m.name, value: m.id }))}
            selected={themeMode.id}
            onSelect={(id) => {
              const mode = THEME_MODES.find((m) => m.id === id);
              if (mode) setThemeMode(mode);
            }}
          />
        </div>

        {/* Palette heading */}
        <div style={{
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.22s backwards" : "none",
        }}>
          <p className="wv-labeled__title">Accent Color</p>
          <p className="wv-labeled__desc">Choose an accent color for the interface</p>
        </div>

        {/* Mini screen palette grid (2 columns) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--sp-3)",
          width: "100%",
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.3s backwards" : "none",
        }}>
          {PALETTES.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="wv-palette-swatch"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--sp-2)",
                padding: "var(--sp-3)",
                borderRadius: 16,
                background: p.id === palette.id ? "var(--color-primary-alpha-12)" : "var(--color-surface-2)",
                border: `2px solid ${p.id === palette.id ? p.primary : "transparent"}`,
                cursor: "pointer",
                transition: "border-color 0.2s var(--ease-emphasized), background 0.2s var(--ease-emphasized), transform 0.15s var(--ease-emphasized)",
                position: "relative",
                animation: mounted ? `wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.35 + i * 0.05}s backwards` : "none",
              }}
              onClick={() => setPalette(p)}
            >
              {/* Mini phone screen */}
              <div style={{
                width: 56,
                height: 96,
                borderRadius: 10,
                border: `1.5px solid ${p.primary}40`,
                overflow: "hidden",
                background: themeMode.id === "amoled" ? "#000" : themeMode.background,
                position: "relative",
              }}>
                {/* Mini status bar */}
                <div style={{
                  height: 8,
                  background: p.id === palette.id ? p.primary + "25" : "var(--color-surface-3)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: `0.5px solid ${p.primary}15`,
                }}>
                  <div style={{ width: 16, height: 2, borderRadius: 1, background: p.primary + "60" }} />
                </div>
                {/* Mini accent bar */}
                <div style={{
                  height: 20,
                  background: `linear-gradient(135deg, ${p.primary}30, ${p.primary}10)`,
                  margin: 4,
                  borderRadius: 4,
                }}>
                  <div style={{
                    width: 20, height: 3, borderRadius: 2, background: p.primary,
                    margin: "6px 6px 0", opacity: 0.8,
                  }} />
                  <div style={{
                    width: 14, height: 2, borderRadius: 1, background: p.primary,
                    margin: "3px 6px 0", opacity: 0.4,
                  }} />
                </div>
                {/* Mini content lines */}
                <div style={{ padding: "0 6px", display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ height: 4, borderRadius: 2, background: p.primary, opacity: 0.12 }} />
                  <div style={{ height: 4, borderRadius: 2, background: p.primary, opacity: 0.08 }} />
                  <div style={{
                    height: 28, borderRadius: 4, marginTop: 2,
                    background: `linear-gradient(135deg, ${p.primary}15, ${p.secondary}10)`,
                    border: `0.5px solid ${p.primary}20`,
                  }} />
                </div>
                {/* Mini nav bar */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 12,
                  background: p.id === palette.id ? p.primary + "20" : "var(--color-surface-2)",
                  borderTop: `0.5px solid ${p.primary}15`,
                  display: "flex", justifyContent: "center", alignItems: "center", gap: 12,
                }}>
                  {[0, 1, 2].map((dot) => (
                    <div key={dot} style={{
                      width: 3, height: 3, borderRadius: "50%",
                      background: dot === 0 ? p.primary : p.primary + "40",
                    }} />
                  ))}
                </div>
              </div>
              {/* Palette name */}
              <span style={{
                fontSize: 11, fontWeight: p.id === palette.id ? 700 : 500,
                color: p.id === palette.id ? "var(--color-text)" : "var(--color-text-muted)",
              }}>
                {p.name}
              </span>
              {/* Active check */}
              {p.id === palette.id && (
                <div style={{
                  position: "absolute", top: 6, right: 6,
                  width: 18, height: 18, borderRadius: "50%",
                  background: p.primary, display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "wvScaleIn 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) backwards",
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={p.onPrimary} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="wv-actions">
        <button className="wv-btn wv-btn--ghost" onClick={onBack}>Back</button>
        <button className="wv-btn wv-btn--primary" onClick={onNext}>Continue</button>
      </div>
    </div>
  );
}
