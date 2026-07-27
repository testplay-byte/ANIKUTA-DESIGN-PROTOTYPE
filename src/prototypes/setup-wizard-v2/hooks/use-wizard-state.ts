/**
 * use-wizard-state.ts — State management for the ANIKUTA setup wizard v2.
 *
 * 9-step flow:
 *   0. Welcome — Brand intro, version, features
 *   1. Theme — Mode (Dark/Light/AMOLED) + Palette picker
 *   2. Permissions — Grant app permissions
 *   3. Storage — Select anime file folder
 *   4. Backup & Restore — Restore from file only
 *   5. Restore Summary — Stats + categories + manga disclaimer
 *   6. Processing/Linking — Animated linking screen
 *   7. Linking Summary — What was linked/processed
 *   8. Finish — Celebration
 */

import { useState, useCallback } from "react";
import type { ThemeMode, ThemePalette } from "../lib/themes";
import { DARK_MODE, ANIKUTA_PALETTE } from "../lib/themes";

// ─── Wizard Steps ─────────────────────────────────────────────────

export const TOTAL_STEPS = 9;

export const STEP_NAMES = [
  "Welcome",
  "Theme",
  "Permissions",
  "Storage",
  "Restore",
  "Restore Summary",
  "Processing",
  "Linking Summary",
  "All Done",
] as const;

export const STEP_DESCRIPTIONS = [
  "Welcome to ANIKUTA — your anime companion.",
  "Choose your preferred theme and color palette.",
  "Grant permissions for the best experience.",
  "Select where your anime files are stored.",
  "Restore a previous ANIKUTA backup.",
  "Review restored data and manga disclaimer.",
  "Linking and processing your library...",
  "Summary of linked anime entries.",
  "Setup complete! Start exploring.",
] as const;

// ─── Permissions State ────────────────────────────────────────────

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

// ─── Mock backup data for demonstration ──────────────────────────

export interface BackupData {
  fileName: string;
  date: string;
  totalItems: number;
  categories: {
    name: string;
    count: number;
  }[];
}

export const MOCK_BACKUP: BackupData = {
  fileName: "anikuta_backup_2025-07-27.abk",
  date: "July 27, 2025",
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

// ─── Mock linking data ──────────────────────────────────────────

export interface LinkingData {
  totalAnime: number;
  linked: number;
  unlinked: number;
  entries: {
    title: string;
    episodes: number;
    status: "linked" | "unlinked";
    source: string;
  }[];
}

export const MOCK_LINKING: LinkingData = {
  totalAnime: 234,
  linked: 218,
  unlinked: 16,
  entries: [
    { title: "Attack on Titan", episodes: 87, status: "linked", source: "AniList" },
    { title: "Jujutsu Kaisen", episodes: 48, status: "linked", source: "AniList" },
    { title: "Demon Slayer", episodes: 55, status: "linked", source: "AniList" },
    { title: "One Piece", episodes: 1100, status: "linked", source: "AniList" },
    { title: "My Hero Academia", episodes: 138, status: "linked", source: "AniList" },
    { title: "Chainsaw Man", episodes: 12, status: "linked", source: "AniList" },
    { title: "Spy x Family", episodes: 37, status: "linked", source: "AniList" },
    { title: "Unknown Anime 1", episodes: 0, status: "unlinked", source: "—" },
    { title: "Unknown Anime 2", episodes: 0, status: "unlinked", source: "—" },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────

export interface WizardState {
  step: number;

  // Theme
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  palette: ThemePalette;
  setPalette: (palette: ThemePalette) => void;

  // Permissions
  permissions: PermissionsState;
  togglePermission: (key: keyof PermissionsState) => void;

  // Storage
  folderSelected: boolean;
  folderPath: string;
  setFolderSelected: (selected: boolean) => void;

  // Restore
  restoreInitiated: boolean;
  restoreComplete: boolean;
  setRestoreInitiated: (s: boolean) => void;
  setRestoreComplete: (c: boolean) => void;

  // Navigation
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
  const [restoreInitiated, setRestoreInitiated] = useState(false);
  const [restoreComplete, setRestoreComplete] = useState(false);

  const next = useCallback(() => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const back = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const skipToFinish = useCallback(() => {
    setStep(TOTAL_STEPS - 1);
  }, []);

  const goToStep = useCallback((target: number) => {
    setStep(Math.max(0, Math.min(target, TOTAL_STEPS - 1)));
  }, []);

  const reset = useCallback(() => {
    setStep(0);
    setThemeModeState(DARK_MODE);
    setPaletteState(ANIKUTA_PALETTE);
    setPermissions(DEFAULT_PERMISSIONS);
    setFolderSelected(false);
    setRestoreInitiated(false);
    setRestoreComplete(false);
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const setPalette = useCallback((p: ThemePalette) => {
    setPaletteState(p);
  }, []);

  const togglePermission = useCallback((key: keyof PermissionsState) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return {
    step,
    themeMode,
    setThemeMode,
    palette,
    setPalette,
    permissions,
    togglePermission,
    folderSelected,
    folderPath,
    setFolderSelected,
    restoreInitiated,
    restoreComplete,
    setRestoreInitiated,
    setRestoreComplete,
    next,
    back,
    skipToFinish,
    goToStep,
    reset,
  };
}
