/**
 * themes.ts — ANIKUTA Design Language palette system.
 *
 * Implements the exact color palette from the design language spec:
 * - Primary: #B1F256 (lime green)
 * - Dark theme default (owner preference)
 * - 5-level surface tier system with purple tint
 * - Light and AMOLED variants
 *
 * Reference: DESIGN_LANGUAGE/03-themes/anikuta-palette.md
 * Reference: DESIGN_LANGUAGE/03-themes/themes-and-colors.md
 */

export interface ThemePalette {
  id: string;
  name: string;
  /** Primary color hex */
  primary: string;
  /** Text/icons on primary */
  onPrimary: string;
  /** Active pill bg (bottom nav, day selector) */
  primaryContainer: string;
  /** Text on primaryContainer */
  onPrimaryContainer: string;
  /** Secondary accent */
  secondary: string;
  /** Tertiary accent */
  tertiary: string;
  /** Error color */
  error: string;
  /** Error container */
  errorContainer: string;
  /** Outline / dividers */
  outline: string;
  /** Subtle outlines */
  outlineVariant: string;
}

export interface ThemeMode {
  id: string;
  name: string;
  background: string;
  onBackground: string;
  onSurface: string;
  onSurfaceVariant: string;
  subtle: string;
  surface1: string;
  surface2: string;
  surface3: string;
  surface4: string;
  surface5: string;
}

// ─── ANIKUTA Default Palette ───────────────────────────────────────
// From DESIGN_LANGUAGE/03-themes/anikuta-palette.md

export const ANIKUTA_PALETTE: ThemePalette = {
  id: "anikuta",
  name: "Anikuta",
  primary: "#B1F256",
  onPrimary: "#1A2E00",
  primaryContainer: "#4A6B1A",
  onPrimaryContainer: "#D4F5A0",
  secondary: "#CCC2DC",
  tertiary: "#EFB8C8",
  error: "#F2B8B5",
  errorContainer: "#8C1D18",
  outline: "#938F99",
  outlineVariant: "#49454F",
};

// ─── Additional Curated Palettes ──────────────────────────────────

export const TEAL_PALETTE: ThemePalette = {
  id: "teal",
  name: "Teal",
  primary: "#2596BE",
  onPrimary: "#FFFFFF",
  primaryContainer: "#1A3A4A",
  onPrimaryContainer: "#B0D8EC",
  secondary: "#B8CCE0",
  tertiary: "#E0B8C8",
  error: "#F2B8B5",
  errorContainer: "#8C1D18",
  outline: "#8A9BA5",
  outlineVariant: "#4A555D",
};

export const CORAL_PALETTE: ThemePalette = {
  id: "coral",
  name: "Coral",
  primary: "#E85D5D",
  onPrimary: "#FFFFFF",
  primaryContainer: "#4A1A1A",
  onPrimaryContainer: "#F5B0B0",
  secondary: "#DCC2C2",
  tertiary: "#B8D8CC",
  error: "#F2B8B5",
  errorContainer: "#8C1D18",
  outline: "#A08A8A",
  outlineVariant: "#5D4A4A",
};

export const AMBER_PALETTE: ThemePalette = {
  id: "amber",
  name: "Amber",
  primary: "#E6912C",
  onPrimary: "#FFFFFF",
  primaryContainer: "#4A3210",
  onPrimaryContainer: "#F5D8A0",
  secondary: "#D8CCE0",
  tertiary: "#C8CCB8",
  error: "#F2B8B5",
  errorContainer: "#8C1D18",
  outline: "#A0978A",
  outlineVariant: "#5D5549",
};

export const VIOLET_PALETTE: ThemePalette = {
  id: "violet",
  name: "Violet",
  primary: "#B07CFF",
  onPrimary: "#1A0033",
  primaryContainer: "#3D1A6B",
  onPrimaryContainer: "#DDB8FF",
  secondary: "#C2CCE0",
  tertiary: "#E0CCB8",
  error: "#F2B8B5",
  errorContainer: "#8C1D18",
  outline: "#8A8BA0",
  outlineVariant: "#4A4A5D",
};

export const FOREST_PALETTE: ThemePalette = {
  id: "forest",
  name: "Forest",
  primary: "#2E7D32",
  onPrimary: "#FFFFFF",
  primaryContainer: "#1A4A1A",
  onPrimaryContainer: "#A0D4A0",
  secondary: "#C2DCC8",
  tertiary: "#CCC2B8",
  error: "#F2B8B5",
  errorContainer: "#8C1D18",
  outline: "#8AA08A",
  outlineVariant: "#4A5D4A",
};

export const PALETTES: ThemePalette[] = [
  ANIKUTA_PALETTE,
  TEAL_PALETTE,
  CORAL_PALETTE,
  AMBER_PALETTE,
  VIOLET_PALETTE,
  FOREST_PALETTE,
];

// ─── Theme Modes ─────────────────────────────────────────────────
// From DESIGN_LANGUAGE/03-themes/themes-and-colors.md §2

export const DARK_MODE: ThemeMode = {
  id: "dark",
  name: "Dark",
  background: "#14111F",
  onBackground: "#ECE6F5",
  onSurface: "#ECE6F5",
  onSurfaceVariant: "#A89EC0",
  subtle: "#6E6688",
  surface1: "#1B1729",
  surface2: "#221E33",
  surface3: "#2A2540",
  surface4: "#332D4C",
  surface5: "#3D3656",
};

export const LIGHT_MODE: ThemeMode = {
  id: "light",
  name: "Light",
  background: "#FEF7FF",
  onBackground: "#1D1B20",
  onSurface: "#1D1B20",
  onSurfaceVariant: "#49454F",
  subtle: "#766C8E",
  surface1: "#F3EDF7",
  surface2: "#EDE7F4",
  surface3: "#E7E0EB",
  surface4: "#DDD6E4",
  surface5: "#D0C9DD",
};

export const AMOLED_MODE: ThemeMode = {
  id: "amoled",
  name: "AMOLED",
  background: "#000000",
  onBackground: "#ECE6F5",
  onSurface: "#ECE6F5",
  onSurfaceVariant: "#A89EC0",
  subtle: "#6E6688",
  surface1: "#0A0A0F",
  surface2: "#0C0C0C",
  surface3: "#101010",
  surface4: "#151515",
  surface5: "#1B1B1B",
};

export const THEME_MODES: ThemeMode[] = [DARK_MODE, LIGHT_MODE, AMOLED_MODE];
export const SYSTEM_MODE: ThemeMode = DARK_MODE; // Resolved at runtime; default to dark

// ─── Helper: Resolve mode ID to ThemeMode ────────────────────────

export function resolveMode(modeId: string): ThemeMode {
  return THEME_MODES.find((m) => m.id === modeId) ?? DARK_MODE;
}

// ─── Helper: Resolve palette ID to ThemePalette ──────────────────

export function resolvePalette(paletteId: string): ThemePalette {
  return PALETTES.find((p) => p.id === paletteId) ?? ANIKUTA_PALETTE;
}

// ─── Helper: Generate CSS custom properties for a given mode+palette ──

export function getThemeCSSVars(mode: ThemeMode, palette: ThemePalette): Record<string, string> {
  return {
    // Backgrounds & surfaces
    "--color-bg": mode.background,
    "--color-surface-1": mode.surface1,
    "--color-surface-2": mode.surface2,
    "--color-surface-3": mode.surface3,
    "--color-surface-4": mode.surface4,
    "--color-surface-5": mode.surface5,
    // Text
    "--color-text": mode.onSurface,
    "--color-text-muted": mode.onSurfaceVariant,
    "--color-text-subtle": mode.subtle,
    // Primary
    "--color-primary": palette.primary,
    "--color-primary-fg": palette.onPrimary,
    "--color-primary-container": palette.primaryContainer,
    "--color-on-primary-container": palette.onPrimaryContainer,
    // Secondary
    "--color-secondary": palette.secondary,
    // Tertiary
    "--color-tertiary": palette.tertiary,
    // Error
    "--color-error": palette.error,
    "--color-error-container": palette.errorContainer,
    // Outlines
    "--color-outline": palette.outline,
    "--color-outline-variant": palette.outlineVariant,
    // Derived
    "--color-surface-variant-alpha-40": hexToRGBA(mode.surface3, 0.4),
    "--color-surface-variant-alpha-50": hexToRGBA(mode.surface3, 0.5),
    "--color-primary-alpha-12": hexToRGBA(palette.primary, 0.12),
    "--color-primary-alpha-16": hexToRGBA(palette.primary, 0.16),
    "--color-primary-alpha-40": hexToRGBA(palette.primary, 0.4),
    // Stage background (for the desktop stage area)
    "--stage-bg": mode.id === "light" ? "#e0e0e0" : mode.background,
  };
}

// ─── Hex → RGBA helper ───────────────────────────────────────────

function hexToRGBA(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
