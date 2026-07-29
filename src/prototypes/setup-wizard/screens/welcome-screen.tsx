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
    title: "Binge without guilt",
    desc: "We won't judge your watch history",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21h10M9 17h6M12 3a7 7 0 0 0-4 12.7V17h8v-1.3A7 7 0 0 0 12 3z" /></svg>),
  },
  {
    title: "Syncs like magic",
    desc: "Pick up where you left off, anywhere",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l2.5 6.5L22 12l-6.5 2.5L13 21l-2.5-6.5L4 12l6.5-2.5z" /></svg>),
  },
  {
    title: "Spoilers? Never.",
    desc: "We guard your watch history with our life",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
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
