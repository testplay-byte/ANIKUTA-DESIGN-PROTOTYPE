/**
 * use-wizard-state.ts — 10-step wizard state management.
 *
 * 0. Welcome — Brand intro, features
 * 1. Theme — Mode (Dark/Light/AMOLED) + Palette picker
 * 2. Storage — Folder selection
 * 3. Permissions — Grant app permissions
 * 4. Restore Backup — Select backup file
 * 5. Format Error — Format not supported
 * 6. Linking Anime — Animated linking with cover images
 * 7. Manual Linking — Link unlinked entries
 * 8. Restore Summary — Stats, manga disclaimer, restore button, animation
 * 9. Finish — Celebration
 */

import { useState, useCallback } from "react";
import type { ThemeMode, ThemePalette } from "../lib/themes";
import { DARK_MODE, ANIKUTA_PALETTE } from "../lib/themes";

export const TOTAL_STEPS = 10;

export const STEP_NAMES = [
  "Welcome", "Theme", "Storage", "Permissions", "Restore",
  "Format Error", "Linking", "Manual Linking", "Restore Summary", "All Done",
] as const;

export const STEP_DESCRIPTIONS = [
  "Welcome to ANIKUTA — your anime companion.",
  "Choose your preferred theme and color palette.",
  "Select where your anime files are stored.",
  "Grant permissions for the best experience.",
  "Import a previous ANIKUTA backup.",
  "The selected backup format is not supported.",
  "Matching your library to AniList...",
  "Link remaining entries manually.",
  "Review and restore your data.",
  "Setup complete! Start exploring.",
] as const;

export interface PermissionsState {
  notifications: boolean;
  storage: boolean;
  batteryOptimization: boolean;
  installApps: boolean;
}

const DEFAULT_PERMISSIONS: PermissionsState = {
  notifications: true,
  storage: true,
  batteryOptimization: false,
  installApps: false,
};

export interface BackupData {
  fileName: string;
  date: string;
  size: string;
  totalItems: number;
  categories: { name: string; count: number }[];
}

export const MOCK_BACKUP: BackupData = {
  fileName: "anikuta_backup_2025-07-27.abk",
  date: "July 27, 2025",
  size: "24.7 MB",
  totalItems: 847,
  categories: [
    { name: "Library", count: 234 },
    { name: "History", count: 189 },
    { name: "Episodes", count: 312 },
    { name: "Settings", count: 48 },
    { name: "Categories", count: 36 },
    { name: "Trackers", count: 28 },
  ],
};

export interface LinkingEntry {
  title: string;
  episodes: number;
  status: "linked" | "unlinked";
  source: string;
  coverGradient: [string, string];
}

export const MOCK_LINKING_ENTRIES: LinkingEntry[] = [
  { title: "Attack on Titan", episodes: 87, status: "linked", source: "AniList", coverGradient: ["#FF6B6B", "#EE5A24"] },
  { title: "Jujutsu Kaisen", episodes: 48, status: "linked", source: "AniList", coverGradient: ["#4834D4", "#686DE0"] },
  { title: "Demon Slayer", episodes: 55, status: "linked", source: "AniList", coverGradient: ["#6AB04C", "#BADC58"] },
  { title: "One Piece", episodes: 1100, status: "linked", source: "AniList", coverGradient: ["#F0932B", "#FFBE76"] },
  { title: "My Hero Academia", episodes: 138, status: "linked", source: "AniList", coverGradient: ["#22A6B3", "#7ED6DF"] },
  { title: "Chainsaw Man", episodes: 12, status: "linked", source: "AniList", coverGradient: ["#EB4D4B", "#FC5C65"] },
  { title: "Spy x Family", episodes: 37, status: "linked", source: "AniList", coverGradient: ["#E056A0", "#F78FB3"] },
  { title: "Tokyo Revengers", episodes: 50, status: "linked", source: "AniList", coverGradient: ["#130F40", "#535C68"] },
  { title: "Unknown Anime 1", episodes: 0, status: "unlinked", source: "—", coverGradient: ["#636E72", "#B2BEC3"] },
  { title: "Unknown Anime 2", episodes: 0, status: "unlinked", source: "—", coverGradient: ["#636E72", "#DFE6E9"] },
  { title: "Unknown Anime 3", episodes: 0, status: "unlinked", source: "—", coverGradient: ["#636E72", "#B2BEC3"] },
  { title: "Unknown Anime 4", episodes: 0, status: "unlinked", source: "—", coverGradient: ["#636E72", "#DFE6E9"] },
];

export const MOCK_LINKING = {
  totalAnime: MOCK_LINKING_ENTRIES.length,
  linked: MOCK_LINKING_ENTRIES.filter((e) => e.status === "linked").length,
  unlinked: MOCK_LINKING_ENTRIES.filter((e) => e.status === "unlinked").length,
  entries: MOCK_LINKING_ENTRIES,
};

export interface WizardState {
  step: number;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  palette: ThemePalette;
  setPalette: (palette: ThemePalette) => void;
  permissions: PermissionsState;
  togglePermission: (key: keyof PermissionsState) => void;
  folderSelected: boolean;
  folderPath: string;
  setFolderSelected: (selected: boolean) => void;
  next: () => void;
  back: () => void;
  skipToFinish: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
}

export function useWizardState(): WizardState {
  const [step, setStep] = useState(0);
  const [themeMode, setThemeModeState] = useState<ThemeMode>(DARK_MODE);
  const [palette, setPaletteState] = useState<ThemePalette>(ANIKUTA_PALETTE);
  const [permissions, setPermissions] = useState<PermissionsState>(DEFAULT_PERMISSIONS);
  const [folderSelected, setFolderSelected] = useState(false);
  const [folderPath] = useState("/storage/emulated/0/Anime");

  const next = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)), []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);
  const skipToFinish = useCallback(() => setStep(TOTAL_STEPS - 1), []);
  const goToStep = useCallback((t: number) => setStep(Math.max(0, Math.min(t, TOTAL_STEPS - 1))), []);

  const reset = useCallback(() => {
    setStep(0);
    setThemeModeState(DARK_MODE);
    setPaletteState(ANIKUTA_PALETTE);
    setPermissions(DEFAULT_PERMISSIONS);
    setFolderSelected(false);
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => setThemeModeState(mode), []);
  const setPalette = useCallback((p: ThemePalette) => setPaletteState(p), []);

  const togglePermission = useCallback((key: keyof PermissionsState) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return {
    step, themeMode, setThemeMode, palette, setPalette,
    permissions, togglePermission,
    folderSelected, folderPath, setFolderSelected,
    next, back, skipToFinish, goToStep, reset,
  };
}
