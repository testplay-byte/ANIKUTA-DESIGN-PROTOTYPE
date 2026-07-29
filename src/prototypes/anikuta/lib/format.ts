/**
 * anikuta / lib / format — small formatting helpers.
 */

/** Format a 0-100 score as "8.7" (one decimal). */
export function fmtScore(score: number | null | undefined): string {
  if (score == null) return "—";
  return (score / 10).toFixed(1);
}

/** Format episodes count: "28 ep" or "1100+ ep". */
export function fmtEps(eps: number | null | undefined): string {
  if (eps == null) return "—";
  if (eps >= 1000) return `${eps}+ ep`;
  return `${eps} ep`;
}

/** Human-readable format label. */
export function formatLabel(format: string): string {
  switch (format) {
    case "TV": return "TV";
    case "MOVIE": return "Movie";
    case "OVA": return "OVA";
    case "ONA": return "ONA";
    case "SPECIAL": return "Special";
    case "MUSIC": return "Music";
    default: return format;
  }
}

/** Human-readable status label. */
export function statusLabel(status: string): string {
  switch (status) {
    case "RELEASING": return "Releasing";
    case "FINISHED": return "Finished";
    case "NOT_YET_RELEASED": return "Upcoming";
    case "CANCELLED": return "Cancelled";
    default: return status;
  }
}

/** Human-readable season label. */
export function seasonLabel(season: string): string {
  switch (season) {
    case "WINTER": return "Winter";
    case "SPRING": return "Spring";
    case "SUMMER": return "Summer";
    case "FALL": return "Fall";
    default: return season;
  }
}

/** Library status label. */
export function libraryStatusLabel(status: string): string {
  switch (status) {
    case "watching": return "Watching";
    case "completed": return "Completed";
    case "plan": return "Plan to Watch";
    default: return status;
  }
}
