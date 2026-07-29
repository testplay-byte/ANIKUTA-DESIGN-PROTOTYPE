"use client";

/**
 * setup-wizard / screens / theme-screen — Step 1 (#theme).
 *
 * v2.2: "Theme" big bold green heading at top-left. "Choose your theme"
 * descriptive title below the mini preview. Mini preview corners less rounded.
 */
import type { ThemeMode, ThemePalette } from "../lib/themes";
import { PALETTES } from "../lib/themes";
import { MiniAnimePreview } from "../components/mini-anime-preview";

interface ThemeScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  palette: ThemePalette;
  setPalette: (palette: ThemePalette) => void;
}

const MODE_OPTIONS = [
  {
    value: "dark" as const,
    label: "Dark",
    icon: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1111.2 3 a7 7 0 109.8 9.8z" /></svg>),
  },
  {
    value: "light" as const,
    label: "Light",
    icon: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>),
  },
  {
    value: "system" as const,
    label: "System",
    icon: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>),
  },
];

export function ThemeScreen({ active, onNext, onBack, themeMode, setThemeMode, palette, setPalette }: ThemeScreenProps) {
  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <h1 className="wizard-page-heading">Theme</h1>

        <MiniAnimePreview />

        <div className="wizard-heading" style={{ alignItems: "center", textAlign: "center" }}>
          <h2 className="wizard-descriptive-title">Choose your theme</h2>
          <p className="wizard-screen-sub" style={{ alignSelf: "center", textAlign: "center" }}>
            Pick a mode and a color and we are set with it.
          </p>
        </div>

        <div className="wizard-body">
          <div className="mode-toggle" role="radiogroup" aria-label="Theme mode" style={{ alignSelf: "stretch", maxWidth: "none" }}>
            {MODE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`mode-btn ${themeMode === opt.value ? "mode-btn--active" : ""}`}
                role="radio"
                aria-checked={themeMode === opt.value}
                onClick={() => setThemeMode(opt.value)}
                style={themeMode === opt.value ? { background: palette.primary, color: palette.onPrimary } : undefined}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>

          <div className="palette-carousel" role="radiogroup" aria-label="Color palette">
            {PALETTES.map((p, i) => (
              <button
                key={p.id}
                className={`palette-carousel__card ${palette.id === p.id ? "palette-carousel__card--active" : ""}`}
                role="radio"
                aria-checked={palette.id === p.id}
                onClick={() => setPalette(p)}
                style={{ animationDelay: `${0.05 * i + 0.1}s` }}
              >
                <span
                  className="palette-carousel__swatch"
                  style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.primary}aa)` }}
                />
                <span className="palette-carousel__name">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="wizard-actions">
        <button className="wizard-btn wizard-btn--secondary" onClick={onBack} style={{ fontWeight: 800 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button className="wizard-btn wizard-btn--primary" onClick={onNext} style={{ background: palette.primary, color: palette.onPrimary, fontWeight: 800 }}>
          Next
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
