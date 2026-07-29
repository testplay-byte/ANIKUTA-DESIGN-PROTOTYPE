/**
 * anikuta / lib / mock-data — realistic mock anime data.
 *
 * No real API calls. All covers are CSS gradients (no image URLs).
 * 12 anime with full metadata + episode lists + history + updates + etc.
 */
import type {
  Anime,
  ContinueWatchingItem,
  DownloadItem,
  Episode,
  Extension,
  HistoryEntry,
  LibraryStatus,
  ScheduledItem,
  UpdateItem,
} from "./types";

// ---------------------------------------------------------------------------
// Helper: build a stable gradient for an anime cover.
// Each anime gets a distinctive 2-3 color diagonal gradient.
// ---------------------------------------------------------------------------
function grad(...colors: string[]): string {
  return `linear-gradient(135deg, ${colors.join(", ")})`;
}

// ---------------------------------------------------------------------------
// 12 mock anime — realistic titles, scores, episodes, genres.
// ---------------------------------------------------------------------------
export const ANIME: Anime[] = [
  {
    id: 1,
    title: "Frieren: Beyond Journey's End",
    titleEnglish: "Frieren: Beyond Journey's End",
    coverGrad: grad("#3a5a40", "#588157", "#a3b18a"),
    bannerGrad: grad("#344e41", "#588157", "#dad7cd"),
    letter: "F",
    averageScore: 92,
    episodes: 28,
    format: "TV",
    status: "FINISHED",
    season: "FALL",
    seasonYear: 2023,
    genres: ["Adventure", "Drama", "Fantasy", "Supernatural"],
    country: "JP",
    studio: "Madhouse",
    synopsis:
      "During their decade-long quest to defeat the Demon King, the hero party—Himmel, Heiter, Eisen, and Frieren—return victorious. Frieren, an elven mage, outlives her companions and embarks on a journey to understand the people she once dismissed. A meditation on time, memory, and the small moments that define a life.",
    inLibrary: true,
    libraryStatus: "watching",
    watchedEpisodes: 18,
  },
  {
    id: 2,
    title: "Solo Leveling",
    titleEnglish: "Solo Leveling",
    coverGrad: grad("#03045e", "#023e8a", "#0077b6"),
    bannerGrad: grad("#03045e", "#0077b6", "#90e0ef"),
    letter: "S",
    averageScore: 84,
    episodes: 12,
    format: "TV",
    status: "FINISHED",
    season: "WINTER",
    seasonYear: 2024,
    genres: ["Action", "Adventure", "Fantasy"],
    country: "KR",
    studio: "A-1 Pictures",
    synopsis:
      "In a world where hunters with superhuman abilities fight monsters to protect humanity, Sung Jinwoo is the 'Weakest Hunter of All Mankind.' After a near-fatal dungeon raid, he gains the unique ability to level up without limit, transforming from the weakest into the strongest hunter alive.",
    inLibrary: true,
    libraryStatus: "watching",
    watchedEpisodes: 12,
  },
  {
    id: 3,
    title: "Dandadan",
    titleEnglish: "Dandadan",
    coverGrad: grad("#9d0208", "#dc2f02", "#f48c06"),
    bannerGrad: grad("#370617", "#9d0208", "#ffba08"),
    letter: "D",
    averageScore: 86,
    episodes: 12,
    format: "TV",
    status: "RELEASING",
    season: "FALL",
    seasonYear: 2024,
    genres: ["Action", "Comedy", "Supernatural", "Sci-Fi"],
    country: "JP",
    studio: "Science SARU",
    synopsis:
      "Momo Ayase believes in ghosts but not aliens. Ken Takakura—'Okarun'—believes in aliens but not ghosts. To settle their argument, they dare each other to visit haunted and alien-infested locations. What follows is a chaotic, hilarious ride full of yokai, extraterrestrials, romance, and turbo-granny powers.",
    inLibrary: true,
    libraryStatus: "watching",
    watchedEpisodes: 7,
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    titleEnglish: "Jujutsu Kaisen",
    coverGrad: grad("#10002b", "#240046", "#5a189a"),
    bannerGrad: grad("#10002b", "#3c096c", "#7b2cbf"),
    letter: "J",
    averageScore: 88,
    episodes: 47,
    format: "TV",
    status: "FINISHED",
    season: "FALL",
    seasonYear: 2023,
    genres: ["Action", "Supernatural", "Horror", "School"],
    country: "JP",
    studio: "MAPPA",
    synopsis:
      "Yuji Itadori swallows a cursed object to save his friends and becomes the host of Sukuna, the King of Curses. He enrolls in Tokyo Jujutsu High to learn to control his power and exorcise curses alongside Megumi Fushiguro and Nobara Kugisaki under the guidance of Satoru Gojo.",
    inLibrary: true,
    libraryStatus: "completed",
    watchedEpisodes: 47,
  },
  {
    id: 5,
    title: "Demon Slayer: Kimetsu no Yaiba",
    titleEnglish: "Demon Slayer",
    coverGrad: grad("#1b4332", "#2d6a4f", "#95d5b2"),
    bannerGrad: grad("#081c15", "#2d6a4f", "#b7e4c7"),
    letter: "K",
    averageScore: 84,
    episodes: 55,
    format: "TV",
    status: "FINISHED",
    season: "SPRING",
    seasonYear: 2019,
    genres: ["Action", "Supernatural", "Historical", "Adventure"],
    country: "JP",
    studio: "ufotable",
    synopsis:
      "After his family is slaughtered by a demon and his sister Nezuko is turned into one, Tanjiro Kamado becomes a Demon Slayer to avenge them and find a cure. His journey is fueled by compassion and resolve as he masters Water Breathing and Sun Breathing techniques.",
    inLibrary: false,
    watchedEpisodes: 24,
  },
  {
    id: 6,
    title: "Chainsaw Man",
    titleEnglish: "Chainsaw Man",
    coverGrad: grad("#6a040f", "#9d0208", "#e85d04"),
    bannerGrad: grad("#370617", "#9d0208", "#faa307"),
    letter: "C",
    averageScore: 87,
    episodes: 12,
    format: "TV",
    status: "FINISHED",
    season: "FALL",
    seasonYear: 2022,
    genres: ["Action", "Supernatural", "Horror", "Comedy"],
    country: "JP",
    studio: "MAPPA",
    synopsis:
      "Denji is a young man trapped in poverty, hunting devils with his chainsaw devil-dog Pochita to pay off his father's debt. When betrayed and killed, Pochita merges with him, granting Denji the power to transform body parts into chainsaws. Recruited by the Public Safety Devil Hunters, he finally finds purpose—and food worth living for.",
    inLibrary: true,
    libraryStatus: "completed",
    watchedEpisodes: 12,
  },
  {
    id: 7,
    title: "Spy x Family",
    titleEnglish: "Spy x Family",
    coverGrad: grad("#0077b6", "#0096c7", "#48cae4"),
    bannerGrad: grad("#03045e", "#0096c7", "#ade8f4"),
    letter: "S",
    averageScore: 83,
    episodes: 25,
    format: "TV",
    status: "RELEASING",
    season: "SPRING",
    seasonYear: 2024,
    genres: ["Action", "Comedy", "Slice of Life", "School"],
    country: "JP",
    studio: "Wit Studio / CloverWorks",
    synopsis:
      "Master spy Twilight must build a family for his next mission—without realizing his adopted daughter Anya is a telepath and his wife Yor is a deadly assassin. The three protect their cover (and each other) in a Cold War-era world of espionage, comedy, and found-family warmth.",
    inLibrary: true,
    libraryStatus: "watching",
    watchedEpisodes: 19,
  },
  {
    id: 8,
    title: "One Piece",
    titleEnglish: "One Piece",
    coverGrad: grad("#ae2012", "#bb3e03", "#ee9b00"),
    bannerGrad: grad("#6a040f", "#bb3e03", "#ffd60a"),
    letter: "O",
    averageScore: 90,
    episodes: 1100,
    format: "TV",
    status: "RELEASING",
    season: "FALL",
    seasonYear: 1999,
    genres: ["Action", "Adventure", "Comedy", "Fantasy"],
    country: "JP",
    studio: "Toei Animation",
    synopsis:
      "Monkey D. Luffy sets sail with his pirate crew, the Straw Hats, to find the legendary treasure known as the One Piece and become the King of the Pirates. Along the way, they forge unbreakable bonds, battle tyrants, and uncover the secrets of the world government.",
    inLibrary: false,
    watchedEpisodes: 0,
  },
  {
    id: 9,
    title: "Attack on Titan",
    titleEnglish: "Attack on Titan",
    coverGrad: grad("#212529", "#495057", "#6c757d"),
    bannerGrad: grad("#000814", "#495057", "#adb5bd"),
    letter: "A",
    averageScore: 89,
    episodes: 89,
    format: "TV",
    status: "FINISHED",
    season: "WINTER",
    seasonYear: 2023,
    genres: ["Action", "Drama", "Suspense", "Supernatural"],
    country: "JP",
    studio: "Wit Studio / MAPPA",
    synopsis:
      "Behind enormous walls, humanity survives against man-eating Titans. Eren Yeager swears to exterminate them after a colossal Titan destroys his home. As the truth about the Titans—and the world beyond the walls—is revealed, the lines between hero and monster blur.",
    inLibrary: true,
    libraryStatus: "completed",
    watchedEpisodes: 89,
  },
  {
    id: 10,
    title: "Vinland Saga",
    titleEnglish: "Vinland Saga",
    coverGrad: grad("#1a3a5c", "#2c5f8a", "#6b9dc2"),
    bannerGrad: grad("#0d1f30", "#2c5f8a", "#a8c8e8"),
    letter: "V",
    averageScore: 89,
    episodes: 48,
    format: "TV",
    status: "FINISHED",
    season: "WINTER",
    seasonYear: 2023,
    genres: ["Action", "Adventure", "Drama", "Historical"],
    country: "JP",
    studio: "Wit Studio / MAPPA",
    synopsis:
      "Young Thorfinn dreams of Vinland, a peaceful land across the sea. But his father is murdered by the mercenary Askeladd, and Thorfinn is drawn into a life of vengeance amid the wars of 11th-century England. A profound saga of violence, redemption, and the search for a home worth fighting for.",
    inLibrary: false,
    watchedEpisodes: 24,
  },
  {
    id: 11,
    title: "Mushoku Tensei: Jobless Reincarnation",
    titleEnglish: "Mushoku Tensei",
    coverGrad: grad("#2d3a1f", "#5a6e3a", "#9ab87a"),
    bannerGrad: grad("#1a2210", "#5a6e3a", "#c5d9a8"),
    letter: "M",
    averageScore: 85,
    episodes: 23,
    format: "TV",
    status: "RELEASING",
    season: "SPRING",
    seasonYear: 2024,
    genres: ["Adventure", "Drama", "Fantasy", "Ecchi"],
    country: "JP",
    studio: "Studio Bind",
    synopsis:
      "A 34-year-old NEET dies in a traffic accident and is reborn as Rudeus Greyrat in a world of swords and magic. Determined to live his second chance without regret, he trains his magical talents, befriends a diverse cast, and faces the consequences of a world more dangerous than any game.",
    inLibrary: true,
    libraryStatus: "watching",
    watchedEpisodes: 11,
  },
  {
    id: 12,
    title: "Bocchi the Rock!",
    titleEnglish: "Bocchi the Rock!",
    coverGrad: grad("#d62828", "#f77f00", "#fcbf49"),
    bannerGrad: grad("#6a040f", "#f77f00", "#ffe6a7"),
    letter: "B",
    averageScore: 88,
    episodes: 12,
    format: "TV",
    status: "FINISHED",
    season: "FALL",
    seasonYear: 2022,
    genres: ["Comedy", "Slice of Life", "Music", "School"],
    country: "JP",
    studio: "CloverWorks",
    synopsis:
      "Hitori 'Bocchi' Gotoh is a painfully shy high schooler who dreams of being in a rock band. When she's recruited into Kessoku Band, her social anxiety meets the chaos of live performance. A heartwarming and hilarious comedy about friendship, growth, and the courage to be seen.",
    inLibrary: false,
    watchedEpisodes: 0,
  },
];

/** Lookup helper. */
export function getAnime(id: number | null): Anime | undefined {
  if (id == null) return undefined;
  return ANIME.find((a) => a.id === id);
}

// ---------------------------------------------------------------------------
// Trending / Popular This Season / Top Rated — derived from ANIME.
// ---------------------------------------------------------------------------
export const TRENDING = [ANIME[0], ANIME[2], ANIME[1], ANIME[3], ANIME[5]];
export const POPULAR_THIS_SEASON = [ANIME[2], ANIME[10], ANIME[6], ANIME[0], ANIME[11], ANIME[5]];
export const TOP_RATED = [...ANIME].sort((a, b) => b.averageScore - a.averageScore).slice(0, 9);

// ---------------------------------------------------------------------------
// Episode generator — builds a stable list of episodes per anime.
// Watched episodes get watched=true (used for grayscale+blur).
// ---------------------------------------------------------------------------
export function getEpisodes(anime: Anime): Episode[] {
  const epCount = Math.min(anime.episodes, 12); // cap at 12 for the prototype
  const watched = anime.watchedEpisodes ?? 0;
  const eps: Episode[] = [];
  for (let i = 1; i <= epCount; i++) {
    const isWatched = i <= watched;
    eps.push({
      number: i,
      title: episodeTitle(i, anime),
      description: episodeDesc(i, anime),
      releaseDate: episodeDate(i, anime),
      subAvailable: true,
      dubAvailable: i <= 6 && anime.country === "JP", // dubs lag subs
      thumbGrad: anime.bannerGrad,
      thumbLetter: anime.letter,
      watched: isWatched,
    });
  }
  return eps;
}

function episodeTitle(n: number, anime: Anime): string {
  const titles = [
    "The Journey Begins",
    "A New Path",
    "Whispers in the Dark",
    "Crossroads",
    "The Weight of Resolve",
    "Echoes of the Past",
    "Beyond the Horizon",
    "Calm Before the Storm",
    "Fractured Light",
    "The Final Stand",
    "Rebirth",
    "Where We Belong",
  ];
  return `${titles[(n - 1) % titles.length]}`;
}

function episodeDesc(n: number, anime: Anime): string {
  return `Episode ${n} of ${anime.title}. As the story unfolds, the stakes rise and our heroes face their greatest challenge yet. Bonds are tested, secrets revealed, and the world they know begins to change in ways no one could have predicted.`;
}

function episodeDate(n: number, anime: Anime): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIdx = (anime.season === "WINTER" ? 0 : anime.season === "SPRING" ? 3 : anime.season === "SUMMER" ? 6 : 9) + ((n - 1) % 3);
  const day = ((n * 7) % 27) + 1;
  return `${months[monthIdx % 12]} ${day}, ${anime.seasonYear}`;
}

// ---------------------------------------------------------------------------
// Continue Watching — derived from in-library anime with progress.
// ---------------------------------------------------------------------------
export const CONTINUE_WATCHING: ContinueWatchingItem[] = ANIME.filter(
  (a) => a.inLibrary && (a.watchedEpisodes ?? 0) > 0 && (a.watchedEpisodes ?? 0) < a.episodes,
).map((a) => {
  const ep = (a.watchedEpisodes ?? 0) + 1;
  return {
    animeId: a.id,
    title: a.title,
    coverGrad: a.coverGrad,
    letter: a.letter,
    episode: Math.min(ep, a.episodes),
    totalEpisodes: a.episodes,
    progress: 35 + ((a.id * 13) % 50), // deterministic 35-85%
    bannerGrad: a.bannerGrad,
  };
});

// ---------------------------------------------------------------------------
// History — recently viewed episodes, grouped by day.
// ---------------------------------------------------------------------------
const HOUR = 3600_000;
const DAY = 24 * HOUR;

export const HISTORY: HistoryEntry[] = [
  // Today
  histEntry(ANIME[2], 7, Date.now() - 1 * HOUR, "Echoes of the Past"),
  histEntry(ANIME[6], 19, Date.now() - 3 * HOUR, "Crossroads"),
  histEntry(ANIME[0], 18, Date.now() - 6 * HOUR, "The Weight of Resolve"),
  // Yesterday
  histEntry(ANIME[10], 11, Date.now() - 26 * HOUR, "Calm Before the Storm"),
  histEntry(ANIME[5], 12, Date.now() - 30 * HOUR, "Where We Belong"),
  // This Week
  histEntry(ANIME[3], 47, Date.now() - 3 * DAY, "The Final Stand"),
  histEntry(ANIME[8], 89, Date.now() - 4 * DAY, "Rebirth"),
  histEntry(ANIME[10], 10, Date.now() - 5 * DAY, "Fractured Light"),
  // Earlier
  histEntry(ANIME[7], 19, Date.now() - 10 * DAY, "A New Path"),
  histEntry(ANIME[1], 12, Date.now() - 14 * DAY, "Beyond the Horizon"),
];

function histEntry(anime: Anime, ep: number, viewedAt: number, epTitle: string): HistoryEntry {
  return {
    animeId: anime.id,
    title: anime.title,
    coverGrad: anime.coverGrad,
    letter: anime.letter,
    episode: ep,
    episodeTitle: epTitle,
    thumbGrad: anime.bannerGrad,
    thumbLetter: anime.letter,
    viewedAt,
  };
}

export interface HistoryGroup {
  label: string;
  items: HistoryEntry[];
}

export function groupHistory(items: HistoryEntry[]): HistoryGroup[] {
  const now = Date.now();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfYesterday = startOfToday.getTime() - DAY;
  const startOfWeek = startOfToday.getTime() - 7 * DAY;

  const groups: HistoryGroup[] = [
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "This Week", items: [] },
    { label: "Earlier", items: [] },
  ];

  for (const it of items) {
    if (it.viewedAt >= startOfToday.getTime()) groups[0].items.push(it);
    else if (it.viewedAt >= startOfYesterday) groups[1].items.push(it);
    else if (it.viewedAt >= startOfWeek) groups[2].items.push(it);
    else groups[3].items.push(it);
  }
  return groups.filter((g) => g.items.length > 0);
}

// ---------------------------------------------------------------------------
// Updates — new episodes with SUB/DUB badges.
// ---------------------------------------------------------------------------
export const UPDATES: UpdateItem[] = [
  {
    animeId: ANIME[2].id,
    title: ANIME[2].title,
    coverGrad: ANIME[2].coverGrad,
    letter: ANIME[2].letter,
    episode: 8,
    episodeTitle: "Echoes of the Past",
    subAvailable: true,
    dubAvailable: false,
    isNew: true,
    timeAgo: "32m ago",
  },
  {
    animeId: ANIME[6].id,
    title: ANIME[6].title,
    coverGrad: ANIME[6].coverGrad,
    letter: ANIME[6].letter,
    episode: 20,
    episodeTitle: "Crossroads",
    subAvailable: true,
    dubAvailable: true,
    isNew: true,
    timeAgo: "2h ago",
  },
  {
    animeId: ANIME[10].id,
    title: ANIME[10].title,
    coverGrad: ANIME[10].coverGrad,
    letter: ANIME[10].letter,
    episode: 12,
    episodeTitle: "Calm Before the Storm",
    subAvailable: true,
    dubAvailable: false,
    isNew: true,
    timeAgo: "5h ago",
  },
  {
    animeId: ANIME[0].id,
    title: ANIME[0].title,
    coverGrad: ANIME[0].coverGrad,
    letter: ANIME[0].letter,
    episode: 19,
    episodeTitle: "The Weight of Resolve",
    subAvailable: true,
    dubAvailable: true,
    isNew: false,
    timeAgo: "8h ago",
  },
  {
    animeId: ANIME[3].id,
    title: ANIME[3].title,
    coverGrad: ANIME[3].coverGrad,
    letter: ANIME[3].letter,
    episode: 48,
    episodeTitle: "Rebirth",
    subAvailable: true,
    dubAvailable: true,
    isNew: false,
    timeAgo: "1d ago",
  },
  {
    animeId: ANIME[5].id,
    title: ANIME[5].title,
    coverGrad: ANIME[5].coverGrad,
    letter: ANIME[5].letter,
    episode: 13,
    episodeTitle: "A New Path",
    subAvailable: true,
    dubAvailable: false,
    isNew: false,
    timeAgo: "2d ago",
  },
  {
    animeId: ANIME[11].id,
    title: ANIME[11].title,
    coverGrad: ANIME[11].coverGrad,
    letter: ANIME[11].letter,
    episode: 13,
    episodeTitle: "Where We Belong",
    subAvailable: true,
    dubAvailable: true,
    isNew: false,
    timeAgo: "3d ago",
  },
];

// ---------------------------------------------------------------------------
// Schedule — weekly airing schedule (by day).
// ---------------------------------------------------------------------------
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const SCHEDULE: ScheduledItem[] = [
  sched(ANIME[2], 9, "MON", "18:00"),
  sched(ANIME[6], 21, "MON", "23:00"),
  sched(ANIME[0], 20, "TUE", "20:30"),
  sched(ANIME[10], 13, "WED", "22:00"),
  sched(ANIME[3], 49, "THU", "19:00"),
  sched(ANIME[5], 14, "FRI", "21:30"),
  sched(ANIME[11], 14, "SAT", "20:00"),
  sched(ANIME[7], 1101, "SUN", "11:00"),
];

function sched(anime: Anime, ep: number, day: string, time: string): ScheduledItem {
  return { animeId: anime.id, title: anime.title, episode: ep, day, time };
}

export function groupSchedule(items: ScheduledItem[]): { day: string; items: ScheduledItem[] }[] {
  return DAYS.map((day) => ({
    day,
    items: items.filter((i) => i.day === day),
  })).filter((g) => g.items.length > 0);
}

// ---------------------------------------------------------------------------
// Library — items with status.
// ---------------------------------------------------------------------------
export interface LibraryEntry {
  anime: Anime;
  status: LibraryStatus;
}

export function getLibrary(): LibraryEntry[] {
  return ANIME.filter((a) => a.inLibrary).map((a) => ({
    anime: a,
    status: a.libraryStatus ?? "watching",
  }));
}

// ---------------------------------------------------------------------------
// Profile stats — distributions derived from the library.
// ---------------------------------------------------------------------------
export interface DistItem {
  label: string;
  count: number;
  color: string;
}

const DIST_COLORS = [
  "#b1f256",
  "#ffb86b",
  "#c3b5e8",
  "#f48c06",
  "#588157",
  "#0077b6",
  "#bb3e03",
  "#7b2cbf",
];

export function getGenreDistribution(): DistItem[] {
  const counts = new Map<string, number>();
  for (const a of ANIME) {
    for (const g of a.genres) {
      counts.set(g, (counts.get(g) ?? 0) + 1);
    }
  }
  const arr = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, count], i) => ({ label, count, color: DIST_COLORS[i % DIST_COLORS.length] }));
  const max = Math.max(...arr.map((x) => x.count));
  return arr.map((x) => ({ ...x, count: Math.round((x.count / max) * 100) }));
}

export function getFormatDistribution(): DistItem[] {
  const counts = new Map<string, number>();
  for (const a of ANIME) {
    counts.set(a.format, (counts.get(a.format) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, count], i) => ({ label, count, color: DIST_COLORS[i % DIST_COLORS.length] }));
}

export function getStatusDistribution(): DistItem[] {
  const counts = new Map<string, number>();
  for (const a of ANIME) {
    const label =
      a.status === "RELEASING" ? "Releasing" : a.status === "FINISHED" ? "Finished" : "Other";
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, count], i) => ({ label, count, color: DIST_COLORS[i % DIST_COLORS.length] }));
}

export function getScoreDistribution(): DistItem[] {
  // Buckets: 90+, 80-89, 70-79, <70
  const buckets = [
    { label: "90+", min: 90, max: 100, count: 0 },
    { label: "80-89", min: 80, max: 89, count: 0 },
    { label: "70-79", min: 70, max: 79, count: 0 },
    { label: "<70", min: 0, max: 69, count: 0 },
  ];
  for (const a of ANIME) {
    for (const b of buckets) {
      if (a.averageScore >= b.min && a.averageScore <= b.max) {
        b.count++;
        break;
      }
    }
  }
  return buckets
    .map((b, i) => ({ label: b.label, count: b.count, color: DIST_COLORS[i % DIST_COLORS.length] }))
    .filter((x) => x.count > 0);
}

export function getCountryDistribution(): DistItem[] {
  const counts = new Map<string, number>();
  for (const a of ANIME) {
    const label =
      a.country === "JP" ? "Japan" : a.country === "KR" ? "Korea" : a.country === "CN" ? "China" : "Other";
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, count], i) => ({ label, count, color: DIST_COLORS[i % DIST_COLORS.length] }));
}

// ---------------------------------------------------------------------------
// Extensions — anime + manga sources.
// ---------------------------------------------------------------------------
export const EXTENSIONS: Extension[] = [
  // Trusted sources (max 2 by convention)
  {
    id: "anilist",
    name: "AniList",
    lang: "all",
    version: "1.4.2",
    iconGrad: grad("#3a5a40", "#588157"),
    iconLetter: "A",
    installed: true,
    trusted: true,
    isTrustedSource: true,
    type: "anime",
  },
  {
    id: "myanimelist",
    name: "MyAnimeList",
    lang: "all",
    version: "2.1.0",
    iconGrad: grad("#2e51a2", "#5a8dee"),
    iconLetter: "M",
    installed: true,
    trusted: true,
    isTrustedSource: true,
    type: "anime",
  },
  // Installed
  {
    id: "gogoanime",
    name: "Gogoanime",
    lang: "en",
    version: "1.8.3",
    iconGrad: grad("#6a040f", "#dc2f02"),
    iconLetter: "G",
    installed: true,
    trusted: false,
    isTrustedSource: false,
    type: "anime",
  },
  {
    id: "9anime",
    name: "9Anime",
    lang: "en",
    version: "1.5.1",
    iconGrad: grad("#0077b6", "#48cae4"),
    iconLetter: "9",
    installed: true,
    trusted: false,
    isTrustedSource: false,
    type: "anime",
  },
  {
    id: "animepahe",
    name: "AnimePahe",
    lang: "en",
    version: "1.2.0",
    iconGrad: grad("#7b2cbf", "#c77dff"),
    iconLetter: "P",
    installed: true,
    trusted: false,
    isTrustedSource: false,
    type: "anime",
  },
  {
    id: "mangadex",
    name: "MangaDex",
    lang: "all",
    version: "3.0.1",
    iconGrad: grad("#ff758c", "#ff7eb3"),
    iconLetter: "M",
    installed: true,
    trusted: false,
    isTrustedSource: false,
    type: "manga",
  },
  // Available (not installed)
  {
    id: "crunchyroll",
    name: "Crunchyroll",
    lang: "en",
    version: "2.4.0",
    iconGrad: grad("#f47521", "#ffa563"),
    iconLetter: "C",
    installed: false,
    trusted: false,
    isTrustedSource: false,
    type: "anime",
  },
  {
    id: "hianime",
    name: "HiAnime",
    lang: "en",
    version: "1.1.4",
    iconGrad: grad("#10002b", "#5a189a"),
    iconLetter: "H",
    installed: false,
    trusted: false,
    isTrustedSource: false,
    type: "anime",
  },
  {
    id: "nyaa-si",
    name: "Nyaa",
    lang: "all",
    version: "1.0.7",
    iconGrad: grad("#ffba08", "#faa307"),
    iconLetter: "N",
    installed: false,
    trusted: false,
    isTrustedSource: false,
    type: "anime",
  },
  {
    id: "mangaplus",
    name: "Manga Plus",
    lang: "en",
    version: "1.3.0",
    iconGrad: grad("#d62828", "#f77f00"),
    iconLetter: "M",
    installed: false,
    trusted: false,
    isTrustedSource: false,
    type: "manga",
  },
  {
    id: "mangakakalot",
    name: "MangaKakalot",
    lang: "en",
    version: "1.6.2",
    iconGrad: grad("#2d6a4f", "#95d5b2"),
    iconLetter: "K",
    installed: false,
    trusted: false,
    isTrustedSource: false,
    type: "manga",
  },
];

// ---------------------------------------------------------------------------
// Downloads — queue + downloaded files.
// ---------------------------------------------------------------------------
export const DOWNLOADS: DownloadItem[] = [
  {
    id: "dl-1",
    animeId: ANIME[2].id,
    title: ANIME[2].title,
    episode: 8,
    coverGrad: ANIME[2].coverGrad,
    letter: ANIME[2].letter,
    size: "—",
    progress: 64,
    status: "downloading",
  },
  {
    id: "dl-2",
    animeId: ANIME[6].id,
    title: ANIME[6].title,
    episode: 20,
    coverGrad: ANIME[6].coverGrad,
    letter: ANIME[6].letter,
    size: "—",
    progress: 12,
    status: "downloading",
  },
  {
    id: "dl-3",
    animeId: ANIME[0].id,
    title: ANIME[0].title,
    episode: 19,
    coverGrad: ANIME[0].coverGrad,
    letter: ANIME[0].letter,
    size: "—",
    progress: 0,
    status: "queued",
  },
];

export const DOWNLOADED_FILES: DownloadItem[] = [
  {
    id: "df-1",
    animeId: ANIME[0].id,
    title: ANIME[0].title,
    episode: 17,
    coverGrad: ANIME[0].coverGrad,
    letter: ANIME[0].letter,
    size: "284 MB",
    progress: 100,
    status: "completed",
  },
  {
    id: "df-2",
    animeId: ANIME[3].id,
    title: ANIME[3].title,
    episode: 47,
    coverGrad: ANIME[3].coverGrad,
    letter: ANIME[3].letter,
    size: "412 MB",
    progress: 100,
    status: "completed",
  },
  {
    id: "df-3",
    animeId: ANIME[5].id,
    title: ANIME[5].title,
    episode: 12,
    coverGrad: ANIME[5].coverGrad,
    letter: ANIME[5].letter,
    size: "198 MB",
    progress: 100,
    status: "completed",
  },
  {
    id: "df-4",
    animeId: ANIME[8].id,
    title: ANIME[8].title,
    episode: 89,
    coverGrad: ANIME[8].coverGrad,
    letter: ANIME[8].letter,
    size: "356 MB",
    progress: 100,
    status: "completed",
  },
];

// ---------------------------------------------------------------------------
// Recent searches (shown on the search screen when no query).
// ---------------------------------------------------------------------------
export const RECENT_SEARCHES = [
  "Frieren",
  "Solo Leveling",
  "Dandadan",
  "Jujutsu Kaisen",
  "Slice of Life",
  "Madhouse",
];

/** Search filter chips. */
export const SEARCH_FILTERS = [
  "All",
  "TV",
  "Movie",
  "Trending",
  "Top Rated",
  "This Season",
  "Subbed",
  "Dubbed",
];
