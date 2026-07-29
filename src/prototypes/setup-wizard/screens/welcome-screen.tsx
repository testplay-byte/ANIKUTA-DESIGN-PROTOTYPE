"use client";

/**
 * setup-wizard / screens / welcome-screen — Step 0 (#welcome).
 *
 * v2.3: Bigger heading (--xl, ~25% bigger). Details list below the animation
 * (about the app experience, NOT about the next setup screens).
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
    title: "Thousands of anime",
    desc: "Stream and track your favorites",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="14" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></svg>),
  },
  {
    title: "Your library, synced",
    desc: "Watch history & progress everywhere",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>),
  },
  {
    title: "Never miss an episode",
    desc: "New-episode notifications",
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
              <span className="welcome-details__text">
                <span className="welcome-details__title">{d.title}</span>
                <span className="welcome-details__desc">{d.desc}</span>
              </span>
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
