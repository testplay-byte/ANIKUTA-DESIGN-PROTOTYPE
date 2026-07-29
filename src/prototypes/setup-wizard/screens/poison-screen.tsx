"use client";

/**
 * setup-wizard / screens / poison-screen — Step 13 (#poison). NEW.
 *
 * "Choose Your Poison" — a forced red-themed screen where the user configures
 * ad preferences. Multi-step within the same route:
 *   Step A — Name: "Daily dose of poison" / "Daily dose of pills"
 *   Step B — Frequency: 1 / 2 / 3 ads per day
 *   Step C — Timing: On app open / On episode start / Both
 *
 * The red theme is applied via the .device--poison class (forced by page.tsx
 * when route === "poison"), so this screen ignores the user's chosen palette.
 */
import { useState } from "react";
import type { AdSettings, AdName, AdTiming } from "../lib/ad-settings";
import { AD_NAME_LABELS, AD_TIMING_LABELS, adSummary } from "../lib/ad-settings";

interface PoisonScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  adSettings: AdSettings;
  updateAdSettings: (patch: Partial<AdSettings>) => void;
}

const TOTAL_STEPS = 3;

export function PoisonScreen({ active, onNext, onBack, adSettings, updateAdSettings }: PoisonScreenProps) {
  const [step, setStep] = useState(0);

  function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      onNext();
    }
  }

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow" style={{ color: "var(--color-primary)" }}>Ad preferences</p>
          <h1 className="wizard-screen-title">Choose your poison</h1>
          <p className="wizard-screen-sub">
            Ads keep the app free. Let&apos;s make them non-intrusive — pick your daily dose.
          </p>
        </div>

        {/* Step progress dots */}
        <div className="poison-steps">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span key={i} className={`poison-step-dot ${i <= step ? "poison-step-dot--active" : ""}`} />
          ))}
        </div>

        <div className="wizard-body">
          {step === 0 && (
            <div className="poison-option-group" style={{ animationDelay: "0.1s" }}>
              <p className="poison-option-group__label">What should we call it?</p>
              <div className="poison-segmented">
                <button
                  className={`poison-segmented__btn ${adSettings.name === "poison" ? "poison-segmented__btn--active" : ""}`}
                  onClick={() => updateAdSettings({ name: "poison" as AdName })}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" />
                  </svg>
                  {AD_NAME_LABELS.poison}
                </button>
                <button
                  className={`poison-segmented__btn ${adSettings.name === "pills" ? "poison-segmented__btn--active" : ""}`}
                  onClick={() => updateAdSettings({ name: "pills" as AdName })}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" />
                  </svg>
                  {AD_NAME_LABELS.pills}
                </button>
              </div>
              <p className="poison-summary">Your daily ads will be shown as your <b>{AD_NAME_LABELS[adSettings.name]}</b>.</p>
            </div>
          )}

          {step === 1 && (
            <div className="poison-option-group" style={{ animationDelay: "0.1s" }}>
              <p className="poison-option-group__label">How many per day?</p>
              <div className="poison-segmented">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className={`poison-segmented__btn ${adSettings.frequency === n ? "poison-segmented__btn--active" : ""}`}
                    onClick={() => updateAdSettings({ frequency: n })}
                  >
                    {n} {n === 1 ? "ad" : "ads"}
                  </button>
                ))}
              </div>
              <p className="poison-summary">You&apos;ll see at most <b>{adSettings.frequency} {adSettings.frequency === 1 ? "ad" : "ads"}</b> per day.</p>
            </div>
          )}

          {step === 2 && (
            <div className="poison-option-group" style={{ animationDelay: "0.1s" }}>
              <p className="poison-option-group__label">When should they appear?</p>
              <div className="poison-chips">
                {(["app-open", "episode-start", "both"] as AdTiming[]).map((t) => (
                  <button
                    key={t}
                    className={`poison-chip ${adSettings.timing === t ? "poison-chip--active" : ""}`}
                    onClick={() => updateAdSettings({ timing: t })}
                  >
                    {AD_TIMING_LABELS[t]}
                  </button>
                ))}
              </div>
              <p className="poison-summary">Summary: <b>{adSummary(adSettings)}</b></p>
            </div>
          )}
        </div>
      </div>
      <div className="wizard-actions">
        {step > 0 ? (
          <button className="wizard-btn wizard-btn--secondary" onClick={() => setStep((s) => s - 1)} style={{ fontWeight: 800, color: "var(--color-text-muted)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        ) : (
          <button className="wizard-btn wizard-btn--secondary" onClick={onBack} style={{ fontWeight: 800, color: "var(--color-text-muted)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        )}
        <button className="wizard-btn wizard-btn--primary" onClick={handleNext} style={{ fontWeight: 800 }}>
          {step < TOTAL_STEPS - 1 ? "Next" : "Confirm"}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
