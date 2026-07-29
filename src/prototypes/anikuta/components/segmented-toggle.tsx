"use client";

/**
 * anikuta / components / segmented-toggle — N-way pill toggle (2-way and 3-way).
 *
 * ANIKUTA signature component. The active option gets the lime primary color.
 */
export interface SegOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedToggleProps {
  options: SegOption[];
  value: string;
  onChange: (v: string) => void;
  /** Stretch to fill width (default true). */
  fullWidth?: boolean;
}

export function SegmentedToggle({
  options,
  value,
  onChange,
  fullWidth = true,
}: SegmentedToggleProps) {
  return (
    <div className="an-seg" style={fullWidth ? { width: "100%" } : undefined} role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          className={`an-seg__btn ${value === opt.value ? "an-seg__btn--active" : ""}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Toggle switch — a small on/off pill switch (used in sheets + settings).
 */
interface ToggleProps {
  on: boolean;
  onChange: (v: boolean) => void;
  "aria-label"?: string;
}

export function Toggle({ on, onChange, ...rest }: ToggleProps) {
  return (
    <button
      type="button"
      className={`an-toggle ${on ? "an-toggle--on" : ""}`}
      onClick={() => onChange(!on)}
      aria-pressed={on}
      {...rest}
    >
      <span className="an-toggle__knob" />
    </button>
  );
}
