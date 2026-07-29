"use client";

/**
 * setup-wizard / screens / poison-screen — Step 13 (#poison).
 *
 * v2.2:
 *  - Fixed text colors (bright/readable on dark red via .wizard-step--poison CSS).
 *  - Bottle→pills: when name === 'pills', show pills instead of a bottle.
 *  - Frequency = count: show N bottles or N pills (N = selected frequency).
 *  - Better bottle animation (more life).
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

/** A single poison bottle SVG. */
function PoisonBottle({ delay = "0s" }: { delay?: string }) {
  return (
    <svg className="poison-bottle" viewBox="0 0 100 140" aria-hidden="true" style={{ animationDelay: delay }}>
      <path d="M38 30 L38 44 Q30 50 30 62 L30 120 Q30 130 40 130 L60 130 Q70 130 70 120 L70 62 Q70 50 62 44 L62 30 Z" fill="var(--color-primary-container)" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="38" y="14" width="24" height="18" rx="2" fill="var(--color-surface-4)" stroke="var(--color-primary)" strokeWidth="1.5" />
      <rect x="36" y="8" width="28" height="8" rx="2" fill="var(--color-primary)" />
      <rect x="36" y="74" width="28" height="34" rx="3" fill="var(--color-bg)" opacity="0.9" />
      <circle cx="50" cy="86" r="6" fill="var(--color-primary)" />
      <rect x="46" y="92" width="8" height="5" rx="1" fill="var(--color-primary)" />
      <circle cx="48" cy="86" r="1.3" fill="var(--color-bg)" />
      <circle cx="52" cy="86" r="1.3" fill="var(--color-bg)" />
      <path d="M34 70 Q34 60 40 58 L40 120 Q34 120 34 110 Z" fill="var(--color-primary)" opacity="0.25" />
    </svg>
  );
}

/** A single poison pill (capsule). */
function PoisonPill({ delay = "0s" }: { delay?: string }) {
  return (
    <div className="poison-pill" style={{ animationDelay: delay }}>
      <div className="poison-pill__cap" />
      <div className="poison-pill__body">
        <div className="poison-pill__line" />
      </div>
    </div>
  );
}

/** Renders the appropriate visual: N bottles or N pills. */
function PoisonVisual({ name, count }: { name: AdName; count: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="poison-hero" key={`${name}-${count}`} aria-hidden="true">
      <span className="poison-glow" />
      <div className="poison-visual-row">
        {name === "poison"
          ? items.map((_, i) => <PoisonBottle key={i} delay={`${i * 0.2}s`} />)
          : items.map((_, i) => <PoisonPill key={i} delay={`${i * 0.15}s`} />)}
      </div>
    </div>
  );
}

export function PoisonScreen({ active, onNext, onBack, adSettings, updateAdSettings }: PoisonScreenProps) {
  const [step, setStep] = useState(0);

  function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      onNext();
    }
  }

  // The visual count: on step 0 (name) show 1 bottle or 3 pills; on step 1+2 show N (frequency).
  const visualCount = step === 0
    ? (adSettings.name === "pills" ? 3 : 1)
    : adSettings.frequency;
  // On step 0, show the currently-selected name's visual (bottle or pills).
  const visualName = adSettings.name;

  return (
    <div className={`wizard-step wizard-step--v2 wizard-step--poison ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <h1 className="wizard-page-heading">Choose Your Poison</h1>

        <p className="wizard-screen-sub" style={{ alignSelf: "flex-start" }}>
          Ads keep the app free. Let&apos;s make them non-intrusive — pick your daily dose.
        </p>

        {/* Poison visual: bottles or pills, count = frequency (or 1 on name step) */}
        <PoisonVisual name={visualName} count={visualCount} />

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
