"use client";

/**
 * setup-wizard / screens / welcome-screen — Step 0 (#welcome).
 *
 * v2.5: Simple, minimal details items (no descriptions). Clean + good-looking.
 */
import type { ThemePalette } from "../lib/themes";
import { WelcomeVisual } from "../components/visuals";

interface WelcomeScreenProps {
  active: boolean;
  onNext: () => void;
  palette: ThemePalette;
}

const DETAILS = [
  {
    title: "Track what you watch",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
  },
  {
    title: "Pick up anywhere",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>),
  },
  {
    title: "Never miss a release",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>),
  },
];

export function WelcomeScreen({ active, onNext, palette }: WelcomeScreenProps) {
  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content" style={{ justifyContent: "flex-start", paddingTop: "var(--sp-3)" }}>
        <h1 className="wizard-page-heading wizard-page-heading--xl">Welcome to Anime App!</h1>
        <p className="wizard-screen-sub" style={{ alignSelf: "flex-start" }}>
          Let&apos;s get things quickly set up for you.
        </p>

        <div className="wizard-visual" key={active ? "on" : "off"} style={{ margin: "var(--sp-2) auto" }}>
          <WelcomeVisual />
        </div>

        <ul className="welcome-details">
          {DETAILS.map((d, i) => (
            <li className="welcome-details__item" key={d.title} style={{ animationDelay: `${0.1 * i + 0.2}s` }}>
              <span className="welcome-details__icon">{d.icon}</span>
              <span className="welcome-details__title" style={{ fontSize: "var(--fs-body-l)" }}>{d.title}</span>
            </li>
          ))}
        </ul>
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
