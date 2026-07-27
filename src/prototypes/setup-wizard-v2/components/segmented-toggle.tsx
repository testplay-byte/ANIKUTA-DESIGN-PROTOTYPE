"use client";

/**
 * SegmentedToggle — DESIGN_LANGUAGE component §2 (3-way) & §3 (2-way).
 *
 * Canonical segmented control implementation:
 * - Container: surfaceVariant 50% alpha, 12dp radius, 4dp padding
 * - Pill: 8dp radius, 8dp vertical padding
 * - Selected: primary fill, onPrimary text, Bold
 * - Unselected: transparent, onSurfaceVariant text, Medium
 *
 * Reference: DESIGN_LANGUAGE/04-screens/episode-layout-settings.md §4.3
 */

import styles from "./segmented-toggle.module.css";

interface SegmentedOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SegmentedToggleProps {
  options: SegmentedOption[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function SegmentedToggle({
  options,
  selected,
  onSelect,
  className = "",
}: SegmentedToggleProps) {
  return (
    <div className={`${styles.segmented} ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`${styles.segment} ${opt.value === selected ? styles.segmentActive : ""}`}
          onClick={() => onSelect(opt.value)}
        >
          {opt.icon && <span className={styles.segmentIcon}>{opt.icon}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
