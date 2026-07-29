"use client";

/**
 * setup-wizard / screens / welcome-screen — Step 0 (#welcome).
 *
 * v2 redesign:
 *  - Top-left heading.
 *  - A proper list-kind view: a numbered list of what the setup covers.
 *  - A calm, premium, anime-app-suited animation (bold play mark + gentle
 *    floating accents) replacing the old "ugly" concentric-ring animation.
 */
import type { ThemePalette } from "../lib/themes";
import { WelcomeVisual } from "../components/visuals";

interface WelcomeScreenProps {
  active: boolean;
  onNext: () => void;
  palette: ThemePalette;
}

const SETUP_STEPS = [
  { icon: "palette", title: "Theme & colors", desc: "Pick a mode and palette" },
  { icon: "folder", title: "Anime folder", desc: "Where your library lives" },
  { icon: "shield", title: "Permissions", desc: "Optional — skip if you like" },
  { icon: "restore", title: "Restore backup", desc: "Optional — bring back your data" },
  { icon: "poison", title: "Ad preferences", desc: "Your daily dose, your way" },
];

function Icon({ name }: { name: string }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "palette") return <svg {...common}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>;
  if (name === "folder") return <svg {...common}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>;
  if (name === "shield") return <svg {...common}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>;
  if (name === "restore") return <svg {...common}><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>;
  if (name === "poison") return <svg {...common}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg>;
  return null;
}

export function WelcomeScreen({ active, onNext, palette }: WelcomeScreenProps) {
  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow">Welcome</p>
          <h1 className="wizard-screen-title">Welcome to Anime App!</h1>
          <p className="wizard-screen-sub">Let&apos;s get you set up in a few quick steps. Here&apos;s what we&apos;ll cover:</p>
        </div>

        <div className="wizard-visual" key={active ? "on" : "off"}>
          <WelcomeVisual />
        </div>

        <ol className="welcome-list">
          {SETUP_STEPS.map((s, i) => (
            <li className="welcome-list__item" key={s.title} style={{ animationDelay: `${0.1 * i + 0.2}s` }}>
              <span className="welcome-list__num">{i + 1}</span>
              <span className="welcome-list__icon"><Icon name={s.icon} /></span>
              <span className="welcome-list__text">
                <span className="welcome-list__title">{s.title}</span>
                <span className="welcome-list__desc">{s.desc}</span>
              </span>
            </li>
          ))}
        </ol>
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
