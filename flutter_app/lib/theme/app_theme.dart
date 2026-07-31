// app_theme.dart — builds Material 3 ThemeData from a WizardPalette.
//
// Uses ColorScheme.fromSeed so dark/light variants are derived consistently.
// The poison screen forces a dedicated red palette via forcePoisonTheme().

import 'package:flutter/material.dart';
import 'palettes.dart';

ThemeData buildTheme(WizardPalette palette, Brightness brightness) {
  final scheme = ColorScheme.fromSeed(
    seedColor: palette.seed,
    brightness: brightness,
  );
  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor:
        brightness == Brightness.dark ? palette.bgDark : palette.bgLight,
    canvasColor:
        brightness == Brightness.dark ? palette.bgDark : palette.bgLight,
    fontFamily: null, // use platform default (Roboto on Android) — bold renders natively
    textTheme: _buildTextTheme(brightness),
    appBarTheme: AppBarTheme(
      backgroundColor: brightness == Brightness.dark ? palette.bgDark : palette.bgLight,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: TextStyle(
        color: scheme.onSurface,
        fontSize: 18,
        fontWeight: FontWeight.w700,
      ),
      iconTheme: IconThemeData(color: scheme.onSurface),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        minimumSize: const Size(64, 52),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        minimumSize: const Size(64, 52),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
      ),
    ),
  );
}

/// Forced red theme for the "Choose Your Poison" screen.
ThemeData buildPoisonTheme(Brightness brightness) {
  const seed = Color(0xFFd32f2f);
  final scheme = ColorScheme.fromSeed(seedColor: seed, brightness: brightness);
  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor:
        brightness == Brightness.dark ? const Color(0xFF1a0606) : const Color(0xFFFFF0F0),
    canvasColor:
        brightness == Brightness.dark ? const Color(0xFF1a0606) : const Color(0xFFFFF0F0),
    fontFamily: null,
    textTheme: _buildTextTheme(brightness),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        minimumSize: const Size(64, 52),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
      ),
    ),
  );
}

TextTheme _buildTextTheme(Brightness brightness) {
  final base = Typography.material2021().black;
  return base.copyWith(
    displayLarge: base.displayLarge?.copyWith(fontWeight: FontWeight.w800),
    displayMedium: base.displayMedium?.copyWith(fontWeight: FontWeight.w800),
    headlineLarge: base.headlineLarge?.copyWith(fontWeight: FontWeight.w800),
    headlineMedium: base.headlineMedium?.copyWith(fontWeight: FontWeight.w800),
    headlineSmall: base.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
    titleLarge: base.titleLarge?.copyWith(fontWeight: FontWeight.w700),
    titleMedium: base.titleMedium?.copyWith(fontWeight: FontWeight.w700),
    labelLarge: base.labelLarge?.copyWith(fontWeight: FontWeight.w700),
  );
}
