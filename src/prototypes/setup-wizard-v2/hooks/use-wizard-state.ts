/**
 * use-wizard-state.ts — State management for the ANIKUTA setup wizard v2.
 *
 * Manages:
 * - Current wizard step (0-5)
 * - Theme mode selection (dark/light/amoled)
 * - Palette selection (6 curated palettes)
 * - Permissions granted state
 * - Folder selection state
 * - Backup/restore choices
 * - Navigation (next, back, skip)
 */

import { useState, useCallback } from "react";
import type { ThemeMode, ThemePalette } from "../lib/themes";
import { DARK_MODE, ANIKUTA_PALETTE } from "../lib/themes";

// ─── Wizard Steps ─────────────────────────────────────────────────
// 0. Welcome
// 1. Theme (mode + palette)
// 2. Permissions
// 3. Storage (folder)
// 4. Backup & Restore
// 5. Finish

export const TOTAL_STEPS = 6;

export const STEP_NAMES = [
  "Welcome",
  "Theme",
  "Permissions",
  "Storage",
  "Backup & Restore",
  "All Done",
] as const;

export const STEP_DESCRIPTIONS = [
  "Welcome to ANIKUTA — your anime companion.",
  "Choose your preferred theme and color palette.",
  "Grant permissions for the best experience.",
  "Select where your anime files are stored.",
  "Restore a backup or start fresh.",
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

// ─── Hook ────────────────────────────────────────────────────────

export interface WizardState {
  // Current step
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

  // Backup
  backupSelected: boolean;
  restoreComplete: boolean;
  setBackupSelected: (selected: boolean) => void;
  setRestoreComplete: (complete: boolean) => void;

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
  const [backupSelected, setBackupSelected] = useState(false);
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
    setBackupSelected(false);
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
    backupSelected,
    restoreComplete,
    setBackupSelected,
    setRestoreComplete,
    next,
    back,
    skipToFinish,
    goToStep,
    reset,
  };
}
