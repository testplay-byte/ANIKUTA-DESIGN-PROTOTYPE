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

/** A single poison bottle SVG (v3: bubbles rise to cap + pop, skull with bones, random motion per idx). */
function PoisonBottle({ delay = "0s", idx = 0 }: { delay?: string; idx?: number }) {
  const clipId = `poison-clip-${idx}`;
  const bubbleId = `poison-bubble-anim-${idx}`;
  const spinId = `poison-bottle-spin-${idx}`;
  // 3 different spin animations for random motion
  const spins = [
    `@keyframes ${spinId} { 0% { transform: rotate(-6deg) translateY(0); } 25% { transform: rotate(8deg) translateY(-3px); } 50% { transform: rotate(-10deg) translateY(-1px); } 75% { transform: rotate(5deg) translateY(-4px); } 100% { transform: rotate(-6deg) translateY(0); } }`,
    `@keyframes ${spinId} { 0% { transform: rotate(4deg) translateY(0); } 20% { transform: rotate(-12deg) translateY(-4px); } 45% { transform: rotate(7deg) translateY(-2px); } 70% { transform: rotate(-3deg) translateY(-5px); } 100% { transform: rotate(4deg) translateY(0); } }`,
    `@keyframes ${spinId} { 0% { transform: rotate(-2deg) translateY(0); } 30% { transform: rotate(10deg) translateY(-3px); } 55% { transform: rotate(-8deg) translateY(-5px); } 80% { transform: rotate(3deg) translateY(-1px); } 100% { transform: rotate(-2deg) translateY(0); } }`,
  ];
  return (
    <div style={{ position: "relative", animation: `${spinId} ${4 + idx * 0.5}s ease-in-out infinite`, animationDelay: delay }} className="poison-bottle-v2">
      <svg viewBox="0 0 100 140" width="100%" height="100%" aria-hidden="true" style={{ overflow: "visible" }}>
        <defs>
          {/* Clip includes neck + body so bubbles can rise to the cap */}
          <clipPath id={clipId}>
            <path d="M38 14 L38 44 Q30 50 30 62 L30 120 Q30 130 40 130 L60 130 Q70 130 70 120 L70 62 Q70 50 62 44 L62 14 Z" />
          </clipPath>
        </defs>
        <style>{`
          ${spins[idx % 3]}
          @keyframes ${bubbleId} {
            0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
            10% { opacity: 0.95; transform: translate(0, -10px) scale(1); }
            70% { opacity: 0.85; transform: translate(0, -70px) scale(1); }
            90% { opacity: 0.6; transform: translate(0, -92px) scale(1.3); }
            100% { transform: translate(0, -98px) scale(1.6); opacity: 0; }
          }
          .${bubbleId}-b1 { animation: ${bubbleId} 3.5s ease-in infinite; }
          .${bubbleId}-b2 { animation: ${bubbleId} 3.5s ease-in infinite 0.9s; }
          .${bubbleId}-b3 { animation: ${bubbleId} 3.5s ease-in infinite 1.8s; }
          .${bubbleId}-b4 { animation: ${bubbleId} 3.5s ease-in infinite 2.5s; }
          @media (prefers-reduced-motion: reduce) { .${bubbleId}-b1, .${bubbleId}-b2, .${bubbleId}-b3, .${bubbleId}-b4 { animation: none !important; opacity: 0.7 !important; } }
        `}</style>
        {/* bottle body */}
        <path d="M38 30 L38 44 Q30 50 30 62 L30 120 Q30 130 40 130 L60 130 Q70 130 70 120 L70 62 Q70 50 62 44 L62 30 Z" fill="var(--color-primary-container)" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinejoin="round" />
        {/* neck + cap */}
        <rect x="38" y="14" width="24" height="18" rx="2" fill="var(--color-surface-4)" stroke="var(--color-primary)" strokeWidth="1.5" />
        <rect x="36" y="8" width="28" height="8" rx="2" fill="var(--color-primary)" />
        {/* liquid + bubbles INSIDE the bottle (clipped to neck+body so bubbles rise to cap) */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="28" y="72" width="44" height="60" fill="var(--color-primary)" opacity="0.55" />
          {/* liquid surface wave */}
          <path d="M28 72 Q38 68 50 72 Q62 76 72 72 L72 78 L28 78 Z" fill="var(--color-primary)" opacity="0.75" />
          {/* bubbles rise from liquid through neck to cap, then pop */}
          <circle className={`${bubbleId}-b1`} cx="42" cy="118" r="3" fill="white" opacity="0.9" />
          <circle className={`${bubbleId}-b2`} cx="55" cy="120" r="2.5" fill="white" opacity="0.9" />
          <circle className={`${bubbleId}-b3`} cx="48" cy="116" r="3.5" fill="white" opacity="0.85" />
          <circle className={`${bubbleId}-b4`} cx="57" cy="122" r="2" fill="white" opacity="0.85" />
        </g>
        {/* label */}
        <rect x="34" y="74" width="32" height="38" rx="3" fill="var(--color-bg)" opacity="0.94" />
        {/* crossed bones behind skull */}
        <g stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" fill="var(--color-primary)">
          <line x1="40" y1="106" x2="60" y2="82" />
          <line x1="60" y1="106" x2="40" y2="82" />
          {/* bone ends (small circles) */}
          <circle cx="40" cy="106" r="2.5" fill="var(--color-primary)" />
          <circle cx="60" cy="82" r="2.5" fill="var(--color-primary)" />
          <circle cx="60" cy="106" r="2.5" fill="var(--color-primary)" />
          <circle cx="40" cy="82" r="2.5" fill="var(--color-primary)" />
        </g>
        {/* skull on top of bones */}
        <circle cx="50" cy="92" r="8" fill="var(--color-primary)" />
        <rect x="44" y="99" width="12" height="6" rx="2" fill="var(--color-primary)" />
        {/* skull eye sockets */}
        <circle cx="47" cy="91" r="2" fill="var(--color-bg)" />
        <circle cx="53" cy="91" r="2" fill="var(--color-bg)" />
        {/* skull nose */}
        <path d="M50 95 L49 97 L51 97 Z" fill="var(--color-bg)" />
        {/* skull teeth lines */}
        <line x1="46" y1="101" x2="46" y2="104" stroke="var(--color-bg)" strokeWidth="0.6" />
        <line x1="50" y1="101" x2="50" y2="104" stroke="var(--color-bg)" strokeWidth="0.6" />
        <line x1="54" y1="101" x2="54" y2="104" stroke="var(--color-bg)" strokeWidth="0.6" />
      </svg>
    </div>
  );
}

/** A single poison pill (v3: wider/stretched, plus on RED half, random rotation). */
function PoisonPill({ delay = "0s", idx = 0 }: { delay?: string; idx?: number }) {
  return (
    <div className="poison-pill-v2" style={{ animationDelay: delay }} aria-hidden="true">
      <div className="poison-pill-v2__half poison-pill-v2__half--left" />
      <div className="poison-pill-v2__half poison-pill-v2__half--right" />
      {/* plus icon on the RED (left) half */}
      <svg className="poison-pill-v2__plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true" style={{ left: "25%" }}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    </div>
  );
}

/** Renders the appropriate visual: N bottles or N pills (with z-index hierarchy). */
function PoisonVisual({ name, count }: { name: AdName; count: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="poison-hero" key={`${name}-${count}`} aria-hidden="true">
      <span className="poison-glow" />
      <div className="poison-visual-row--v2">
        {name === "poison"
          ? items.map((_, i) => <PoisonBottle key={i} delay={`${i * 0.4}s`} idx={i} />)
          : items.map((_, i) => <PoisonPill key={i} delay={`${i * 0.4}s`} idx={i} />)}
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

  // The visual count: on step 0 (name) show 1; on step 1+2 show N (frequency).
  const visualCount = step === 0 ? 1 : adSettings.frequency;
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
