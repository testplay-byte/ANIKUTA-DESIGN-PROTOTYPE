"use client";

/**
 * WizardProgress — Step indicator bar for the ANIKUTA setup wizard v2.
 * Shows a thin progress track with animated fill and step dots below.
 */

import type { ThemePalette } from "../lib/themes";
import styles from "./wizard-progress.module.css";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  palette: ThemePalette;
}

export function WizardProgress({ currentStep, totalSteps, palette }: WizardProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${palette.primary}, ${palette.primary}cc)`,
          }}
        />
      </div>
      <div className={styles.stepDots}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i <= currentStep ? styles.dotActive : ""}`}
            style={i <= currentStep ? { background: palette.primary } : undefined}
          />
        ))}
      </div>
    </div>
  );
}
