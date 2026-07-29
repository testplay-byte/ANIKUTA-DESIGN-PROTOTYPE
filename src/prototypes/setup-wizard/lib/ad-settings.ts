/**
 * setup-wizard / lib / ad-settings — ad preference types for the
 * "Choose Your Poison" screen.
 *
 * The poison screen is a forced red-themed screen where the user
 * configures how ads behave. These settings are stored in wizard state
 * and shown on the final setup-complete summary.
 */

/** What the user calls their daily ad allowance. */
export type AdName = "poison" | "pills";

/** When ads are shown. */
export type AdTiming = "app-open" | "episode-start" | "both";

export interface AdSettings {
  /** "daily dose of poison" or "daily dose of pills" — user's chosen label. */
  name: AdName;
  /** 1–3 ads per day. */
  frequency: number;
  /** When ads are shown. */
  timing: AdTiming;
}

export const DEFAULT_AD_SETTINGS: AdSettings = {
  name: "poison",
  frequency: 2,
  timing: "app-open",
};

export const AD_NAME_LABELS: Record<AdName, string> = {
  poison: "Daily dose of poison",
  pills: "Daily dose of pills",
};

export const AD_TIMING_LABELS: Record<AdTiming, string> = {
  "app-open": "On app open",
  "episode-start": "On episode start",
  both: "Both",
};

/** Builds a human-readable summary line for the chosen ad settings. */
export function adSummary(a: AdSettings): string {
  const nameLabel = AD_NAME_LABELS[a.name];
  const timingLabel = AD_TIMING_LABELS[a.timing];
  return `${a.frequency} ${a.frequency === 1 ? "ad" : "ads"}/day · ${timingLabel} · ${nameLabel}`;
}
