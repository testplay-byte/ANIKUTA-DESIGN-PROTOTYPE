// palettes.dart — selectable color palettes for the Setup Wizard.
//
// Mirrors the web prototype's lib/themes.ts exactly (6 palettes).
// Each palette defines a seed color used to derive a Material 3 ColorScheme,
// plus a set of explicit surface tints for dark theme so the UI has the
// same layered-surface look as the web/Kotlin prototypes.

import 'package:flutter/material.dart';

class WizardPalette {
  final String id;
  final String name;
  /// Seed color used to derive the Material 3 ColorScheme.
  final Color seed;
  /// Explicit dark-theme background tint (very dark version of primary).
  final Color bgDark;
  /// Dark-theme surface tiers (progressively lighter).
  final Color surface1;
  final Color surface2;
  final Color surface3;
  final Color surface4;
  final Color surface5;
  /// Light-theme background tint.
  final Color bgLight;

  const WizardPalette({
    required this.id,
    required this.name,
    required this.seed,
    required this.bgDark,
    required this.surface1,
    required this.surface2,
    required this.surface3,
    required this.surface4,
    required this.surface5,
    required this.bgLight,
  });
}

const WizardPalette kDefaultPalette = WizardPalette(
  id: 'lime',
  name: 'Lime',
  seed: Color(0xFFb3f35a),
  bgDark: Color(0xFF0a120a),
  surface1: Color(0xFF0f1a0f),
  surface2: Color(0xFF142214),
  surface3: Color(0xFF1a2a1a),
  surface4: Color(0xFF1f321f),
  surface5: Color(0xFF253a25),
  bgLight: Color(0xFFf5fdf0),
);

const List<WizardPalette> kPalettes = [
  kDefaultPalette,
  WizardPalette(
    id: 'teal',
    name: 'Teal',
    seed: Color(0xFF2596be),
    bgDark: Color(0xFF0a1a1f),
    surface1: Color(0xFF0f2329),
    surface2: Color(0xFF142d35),
    surface3: Color(0xFF1a3740),
    surface4: Color(0xFF1f414b),
    surface5: Color(0xFF254b56),
    bgLight: Color(0xFFf0fafd),
  ),
  WizardPalette(
    id: 'purple',
    name: 'Purple',
    seed: Color(0xFF6750a4),
    bgDark: Color(0xFF14111f),
    surface1: Color(0xFF1b1729),
    surface2: Color(0xFF221e33),
    surface3: Color(0xFF2a2540),
    surface4: Color(0xFF332d4c),
    surface5: Color(0xFF3d3656),
    bgLight: Color(0xFFfef7ff),
  ),
  WizardPalette(
    id: 'coral',
    name: 'Coral',
    seed: Color(0xFFe85d5d),
    bgDark: Color(0xFF1f0e0e),
    surface1: Color(0xFF291515),
    surface2: Color(0xFF331c1c),
    surface3: Color(0xFF3d2424),
    surface4: Color(0xFF472c2c),
    surface5: Color(0xFF523434),
    bgLight: Color(0xFFfff5f5),
  ),
  WizardPalette(
    id: 'forest',
    name: 'Forest',
    seed: Color(0xFF2e7d32),
    bgDark: Color(0xFF0a1a0a),
    surface1: Color(0xFF0f2310),
    surface2: Color(0xFF142d16),
    surface3: Color(0xFF1a371c),
    surface4: Color(0xFF1f4122),
    surface5: Color(0xFF254b28),
    bgLight: Color(0xFFf0faf0),
  ),
  WizardPalette(
    id: 'amber',
    name: 'Amber',
    seed: Color(0xFFe6912c),
    bgDark: Color(0xFF1f1505),
    surface1: Color(0xFF291f0a),
    surface2: Color(0xFF332910),
    surface3: Color(0xFF3d3316),
    surface4: Color(0xFF473d1c),
    surface5: Color(0xFF524722),
    bgLight: Color(0xFFfffaf0),
  ),
];

WizardPalette paletteById(String id) {
  return kPalettes.firstWhere((p) => p.id == id, orElse: () => kDefaultPalette);
}
