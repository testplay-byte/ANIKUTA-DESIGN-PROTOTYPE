"use client";

/**
 * setup-wizard / screens / welcome-screen — Step 0 (#welcome).
 *
 * v2.2: Big bold theme-colored heading at top-left. Cleaner look.
 */
import type { ThemePalette } from "../lib/themes";
import { WelcomeVisual } from "../components/visuals";

interface WelcomeScreenProps {
  active: boolean;
  onNext: () => void;
  palette: ThemePalette;
}

export function WelcomeScreen({ active, onNext, palette }: WelcomeScreenProps) {
  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <h1 className="wizard-page-heading">Welcome to Anime App!</h1>
        <p className="wizard-screen-sub" style={{ alignSelf: "flex-start" }}>
          Let&apos;s get things quickly set up for you.
        </p>

        <div className="wizard-visual" key={active ? "on" : "off"} style={{ margin: "var(--sp-4) auto" }}>
          <WelcomeVisual />
        </div>
      </div>
      <div className="wizard-actions">
        <button
          className="wizard-btn wizard-btn--primary"
          onClick={onNext}
          style={{ background: palette.primary, color: palette.onPrimary, fontWeight: 800 }}
        >
          Get Started
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
