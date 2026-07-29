/**
 * anikuta / lib / types — shared TypeScript types for the ANIKUTA prototype.
 *
 * All data is mock (no real API calls). Anime covers are represented as
 * gradient strings (CSS gradients) so the prototype needs no image URLs.
 */

export type AnimeFormat = "TV" | "MOVIE" | "OVA" | "ONA" | "SPECIAL" | "MUSIC";
export type AnimeStatus = "RELEASING" | "FINISHED" | "NOT_YET_RELEASED" | "CANCELLED";
export type AnimeSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";
export type Country = "JP" | "KR" | "CN" | "TW" | "US";

export interface Anime {
  id: number;
  title: string;
  titleEnglish?: string;
  /** CSS gradient string used as the cover art (no image URLs). */
  coverGrad: string;
  /** CSS gradient string used as the banner (wider, blurred on detail). */
  bannerGrad: string;
  /** First letter of title (for the big cover letter overlay). */
  letter: string;
  averageScore: number; // 0-100
  episodes: number;
  format: AnimeFormat;
  status: AnimeStatus;
  season: AnimeSeason;
  seasonYear: number;
  genres: string[];
  country: Country;
  studio: string;
  synopsis: string;
  /** True if this anime is in the user's library. */
  inLibrary?: boolean;
  libraryStatus?: LibraryStatus;
  /** User's watched-episode count (for continue-watching + watched state). */
  watchedEpisodes?: number;
}

export type LibraryStatus = "watching" | "completed" | "plan";

export interface Episode {
  number: number;
  title: string;
  description: string;
  releaseDate: string;
  subAvailable: boolean;
  dubAvailable: boolean;
  /** Thumbnail gradient (16:9 frame). */
  thumbGrad: string;
  /** Letter shown over the thumbnail. */
  thumbLetter: string;
  /** Whether the user has watched this episode. */
  watched: boolean;
}

export interface ContinueWatchingItem {
  animeId: number;
  title: string;
  coverGrad: string;
  letter: string;
  episode: number;
  totalEpisodes: number;
  progress: number; // 0-100
  /** Wide banner gradient for the continue-watching card. */
  bannerGrad: string;
}

export interface HistoryEntry {
  animeId: number;
  title: string;
  coverGrad: string;
  letter: string;
  episode: number;
  episodeTitle: string;
  thumbGrad: string;
  thumbLetter: string;
  /** Unix ms timestamp. */
  viewedAt: number;
}

export interface UpdateItem {
  animeId: number;
  title: string;
  coverGrad: string;
  letter: string;
  episode: number;
  episodeTitle: string;
  subAvailable: boolean;
  dubAvailable: boolean;
  isNew: boolean;
  /** Human-readable relative time, e.g. "2h ago". */
  timeAgo: string;
}

export interface ScheduledItem {
  animeId: number;
  title: string;
  episode: number;
  /** "MON", "TUE", ... */
  day: string;
  /** "18:00" 24h time. */
  time: string;
}

export interface Extension {
  id: string;
  name: string;
  /** Short language/source code, e.g. "en", "all", "ja". */
  lang: string;
  version: string;
  /** Squircle icon gradient. */
  iconGrad: string;
  iconLetter: string;
  installed: boolean;
  trusted: boolean;
  /** True if this is a trusted source (only 2 allowed). */
  isTrustedSource: boolean;
  /** "anime" or "manga" type. */
  type: "anime" | "manga";
}

export interface DownloadItem {
  id: string;
  animeId: number;
  title: string;
  episode: number;
  coverGrad: string;
  letter: string;
  size: string;
  /** Progress 0-100 (queue items only; downloaded = 100). */
  progress: number;
  status: "queued" | "downloading" | "paused" | "completed";
}

/** Source toggle (search). */
export type Source = "anilist" | "extension";

/** Library filter tabs. */
export type LibraryTab = "all" | LibraryStatus;

/** Library layout (grid or list). */
export type LibraryLayout = "grid" | "list";

/** Updates tab. */
export type UpdatesTab = "updates" | "schedule";

/** Extension type toggle. */
export type ExtType = "anime" | "manga";
