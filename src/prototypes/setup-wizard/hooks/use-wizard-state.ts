import { useState, useCallback } from "react";
import type { ThemeMode, ThemePalette } from "../lib/themes";
import { DEFAULT_PALETTE } from "../lib/themes";
import type { AdSettings } from "../lib/ad-settings";
import { DEFAULT_AD_SETTINGS } from "../lib/ad-settings";

/**
 * An anime entry being linked during the restore flow.
 * - `linked: true` + `matchedName` → successfully linked to an AniList entry
 * - `linked: false` → no match found (shown in manual linking screen)
 */
export interface LinkedAnime {
  id: number;
  /** The name from the backup file. */
  backupName: string;
  /** Whether a match was found. */
  linked: boolean;
  /** The matched AniList name (if linked). */
  matchedName?: string;
}

/** Wizard permissions (toggleable, except all-files-access which is fixed off). */
export interface Permissions {
  installApps: boolean;
  notifications: boolean;
  battery: boolean;
  /** All files access — NOT needed, always off, toggle disabled. */
  allFilesAccess: boolean;
}

/**
 * Wizard routes (hash routing, like the anime-app prototype).
 *
 *   welcome             — Welcome / intro + setup overview list
 *   theme               — Choose your theme (mini preview + carousel)
 *   folder              — Select your anime folder
 *   permissions         — Grant permissions (optional)
 *   restore             — Restore backup (Select Backup File / Skip)
 *   format              — Format not supported (fun screen)
 *   processing          — Processing backup (~2.5s auto-advance)
 *   summary             — Backup summary (list view) — Cancel → format
 *   linking             — Linking anime (stats + two-half rows)
 *   manual              — Manual linking (search overlay)
 *   restore-summary     — Restore summary (custom M3) → Restore Now
 *   restore-processing  — Restore Now processing animation (NEW)
 *   restore-success     — Restore successful (statistics) → poison
 *   poison              — Choose Your Poison (red, ad config) (NEW)
 *   finish              — Setup complete
 */
export type WizardRoute =
  | "welcome"
  | "theme"
  | "folder"
  | "permissions"
  | "restore"
  | "format"
  | "processing"
  | "summary"
  | "linking"
  | "manual"
  | "restore-summary"
  | "restore-processing"
  | "restore-success"
  | "poison"
  | "finish";

/** Ordered route list (for progress bar + next/back stepping). */
export const ROUTE_ORDER: WizardRoute[] = [
  "welcome",
  "theme",
  "folder",
  "permissions",
  "restore",
  "format",
  "processing",
  "summary",
  "linking",
  "manual",
  "restore-summary",
  "restore-processing",
  "restore-success",
  "poison",
  "finish",
];

export const TOTAL_ROUTES = ROUTE_ORDER.length;

/** Mock anime entries for the linking flow. */
const MOCK_ANIME_ENTRIES: LinkedAnime[] = [
  { id: 1, backupName: "Frieren: Beyond Journey's End", linked: true, matchedName: "Sousou no Frieren" },
  { id: 2, backupName: "Jujutsu Kaisen Season 2", linked: true, matchedName: "Jujutsu Kaisen 2nd Season" },
  { id: 3, backupName: "Demon Slayer: Hashira Training", linked: false },
  { id: 4, backupName: "Attack on Titan Final", linked: true, matchedName: "Shingeki no Kyojin: The Final Season" },
  { id: 5, backupName: "Spy x Family Code: White", linked: false },
  { id: 6, backupName: "Chainsaw Man", linked: true, matchedName: "Chainsaw Man" },
  { id: 7, backupName: "One Piece Egghead Arc", linked: false },
  { id: 8, backupName: "Solo Leveling", linked: true, matchedName: "Ore dake Level Up na Ken" },
];

export interface WizardState {
  /** Active route (driven by the hash in page.tsx). */
  route: WizardRoute;
  themeMode: ThemeMode;
  palette: ThemePalette;
  folderSelected: boolean;
  backupSelected: boolean;
  permissions: Permissions;
  /** Linked anime state (for the restore flow). */
  linkedAnime: LinkedAnime[];
  /** Ad preferences (Choose Your Poison screen). */
  adSettings: AdSettings;
}

export function useWizardState() {
  const [route, setRoute] = useState<WizardRoute>("welcome");
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [palette, setPalette] = useState<ThemePalette>(DEFAULT_PALETTE);
  const [folderSelected, setFolderSelected] = useState(false);
  const [backupSelected, setBackupSelected] = useState(false);
  const [permissions, setPermissions] = useState<Permissions>({
    installApps: false,
    notifications: false,
    battery: false,
    allFilesAccess: false,
  });
  const [linkedAnime, setLinkedAnime] = useState<LinkedAnime[]>(MOCK_ANIME_ENTRIES);
  const [adSettings, setAdSettings] = useState<AdSettings>(DEFAULT_AD_SETTINGS);

  /** Set the active route (page.tsx calls this from the hash router). */
  const setRouteAction = useCallback((r: WizardRoute) => {
    setRoute(r);
  }, []);

  /** Step to the next route in ROUTE_ORDER. */
  const next = useCallback(() => {
    setRoute((r) => {
      const i = ROUTE_ORDER.indexOf(r);
      return ROUTE_ORDER[Math.min(i + 1, TOTAL_ROUTES - 1)];
    });
  }, []);

  /** Step to the previous route in ROUTE_ORDER. */
  const back = useCallback(() => {
    setRoute((r) => {
      const i = ROUTE_ORDER.indexOf(r);
      return ROUTE_ORDER[Math.max(i - 1, 0)];
    });
  }, []);

  /** Jump to a specific route. */
  const goTo = useCallback((target: WizardRoute) => {
    setRoute(target);
  }, []);

  /**
   * Skip from the Restore screen directly to the Finish screen,
   * bypassing the entire restore flow.
   */
  const skipToFinish = useCallback(() => {
    setRoute("finish");
  }, []);

  /** Toggle a permission (all are user-toggleable now). */
  const togglePermission = useCallback((key: keyof Permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /**
   * Link an unlinked anime to a matched AniList entry.
   */
  const linkAnime = useCallback((id: number, matchedName: string) => {
    setLinkedAnime((prev) =>
      prev.map((a) => (a.id === id ? { ...a, linked: true, matchedName } : a)),
    );
  }, []);

  /**
   * Mark a previously-linked anime as NOT linked (undo a wrong link).
   * Used by the popup on the Linking Anime screen.
   */
  const unlinkAnime = useCallback((id: number) => {
    setLinkedAnime((prev) =>
      prev.map((a) => (a.id === id ? { ...a, linked: false, matchedName: undefined } : a)),
    );
  }, []);

  /** Update ad settings (Choose Your Poison screen). */
  const updateAdSettings = useCallback((patch: Partial<AdSettings>) => {
    setAdSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  /** Reset the entire wizard to the initial state. */
  const reset = useCallback(() => {
    setRoute("welcome");
    setThemeMode("dark");
    setPalette(DEFAULT_PALETTE);
    setFolderSelected(false);
    setBackupSelected(false);
    setPermissions({ installApps: false, notifications: false, battery: false, allFilesAccess: false });
    setLinkedAnime(MOCK_ANIME_ENTRIES);
    setAdSettings(DEFAULT_AD_SETTINGS);
  }, []);

  return {
    route,
    setRoute: setRouteAction,
    themeMode,
    setThemeMode,
    palette,
    setPalette,
    folderSelected,
    setFolderSelected,
    backupSelected,
    setBackupSelected,
    permissions,
    togglePermission,
    linkedAnime,
    linkAnime,
    unlinkAnime,
    adSettings,
    updateAdSettings,
    next,
    back,
    goTo,
    skipToFinish,
    reset,
  };
}
