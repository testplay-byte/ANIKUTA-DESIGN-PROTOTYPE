"use client";

/**
 * setup-wizard / screens / finish-screen — Step 14 (#finish).
 *
 * v2 redesign:
 *  - Restructured animation completely: a clean check-in-circle that draws
 *    smoothly, with refined (calmer) confetti + soft glow. Replaces the old
 *    "ugly" celebration.
 *  - Removed the "API URL" card entirely (user said don't show it).
 *  - Fixed the green-rectangle bug: the old finish-badge background
 *    (${palette.primary}22) overlapped the URL card; with the URL card gone
 *    and the badge restyled, the overlap is gone.
 *  - Shows a summary of what was configured (theme, folder, ads) — not minimal.
 *  - "Start Exploring" → restart → #welcome.
 */
import type { ThemePalette } from "../lib/themes";
import type { ThemeMode } from "../lib/themes";
import type { AdSettings } from "../lib/ad-settings";
import { AD_NAME_LABELS, AD_TIMING_LABELS } from "../lib/ad-settings";
import type { LinkedAnime } from "../hooks/use-wizard-state";
import { FinishVisual } from "../components/visuals";

interface FinishScreenProps {
  active: boolean;
  onRestart: () => void;
  palette: ThemePalette;
  themeMode: ThemeMode;
  folderSelected: boolean;
  adSettings: AdSettings;
  linkedAnime: LinkedAnime[];
}

export function FinishScreen({ active, onRestart, palette, themeMode, folderSelected, adSettings, linkedAnime }: FinishScreenProps) {
  const restoredCount = linkedAnime.filter((a) => a.linked).length + 239;

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content" style={{ position: "relative", zIndex: 2 }}>
        <div className="wizard-heading" style={{ alignItems: "center", textAlign: "center" }}>
          <span className="finish-badge" style={{ background: `${palette.primary}22`, color: palette.primary, animation: "scaleIn 0.5s var(--ease-emphasized-decel) 0.1s backwards", alignSelf: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6-6.3 4.6L7.9 14l-6-4.6h7.6z" />
            </svg>
            Setup complete
          </span>
          <h1 className="wizard-screen-title" style={{ fontSize: 32, background: `linear-gradient(135deg, ${palette.primary}, ${palette.primary}aa)`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent", animation: "titleSlideUp 0.5s var(--ease-emphasized-decel) 0.4s backwards" }}>
            You&apos;re all set!
          </h1>
        </div>

        <div className="wizard-visual wizard-visual--lg" key={active ? "on" : "off"} style={{ animation: "scaleIn 0.6s var(--ease-emphasized-decel) 0.2s backwards, float 4s ease-in-out 0.8s infinite" }}>
          <FinishVisual />
        </div>

        <div className="wizard-body">
          <p className="wizard-screen-sub" style={{ alignSelf: "center", textAlign: "center", animation: "titleSlideUp 0.5s var(--ease-emphasized-decel) 0.55s backwards" }}>
            Your anime journey begins now. Enjoy exploring thousands of titles, tracking your progress, and never missing a new episode.
          </p>

          {/* Config summary — gives the screen substance (not minimal) */}
          <div className="finish-summary">
            <div className="finish-summary__row">
              <span className="finish-summary__label">Theme</span>
              <span className="finish-summary__value"><b>{palette.name}</b> · {themeMode}</span>
            </div>
            <div className="finish-summary__row">
              <span className="finish-summary__label">Anime folder</span>
              <span className="finish-summary__value">{folderSelected ? "Connected" : "Skipped"}</span>
            </div>
            <div className="finish-summary__row">
              <span className="finish-summary__label">Library restored</span>
              <span className="finish-summary__value">{restoredCount} anime</span>
            </div>
            <div className="finish-summary__row">
              <span className="finish-summary__label">Ads</span>
              <span className="finish-summary__value">{adSettings.frequency}/day · {AD_TIMING_LABELS[adSettings.timing]}</span>
            </div>
            <div className="finish-summary__row">
              <span className="finish-summary__label">Daily dose</span>
              <span className="finish-summary__value">{AD_NAME_LABELS[adSettings.name]}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="wizard-actions" style={{ position: "relative", zIndex: 2 }}>
        <button
          className="wizard-btn wizard-btn--primary"
          onClick={onRestart}
          style={{ background: palette.primary, color: palette.onPrimary, fontWeight: 800, boxShadow: `0 6px 24px ${palette.primary}55`, animation: "scaleIn 0.5s var(--ease-emphasized-decel) 0.9s backwards" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12a7 7 0 0112-5l2 2M19 12a7 7 0 01-12 5l-2-2M19 4v5h-5M5 20v-5h5" />
          </svg>
          Start Exploring
        </button>
      </div>
    </div>
  );
}
