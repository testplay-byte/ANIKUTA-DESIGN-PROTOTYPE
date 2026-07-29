"use client";

/**
 * setup-wizard / screens / welcome-screen — Step 0 (#welcome).
 *
 * v2.1 refinements (per second round of feedback):
 *  - BIG, bold, prominent hero heading (was too small).
 *  - Removed the steps list (unnecessary — user said don't show theme/colors/etc).
 *  - Just welcomes the user + "Let's get things quickly set up for you."
 *  - Calm play-mark animation kept.
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
      <div className="wizard-content" style={{ justifyContent: "center" }}>
        <div className="wizard-visual" key={active ? "on" : "off"} style={{ marginBottom: "var(--sp-4)" }}>
          <WelcomeVisual />
        </div>

        <div className="welcome-hero">
          <p className="wizard-screen-eyebrow">Welcome</p>
          <h1 className="welcome-hero__title">Welcome to Anime App!</h1>
          <p className="welcome-hero__sub">Let&apos;s get things quickly set up for you.</p>
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
