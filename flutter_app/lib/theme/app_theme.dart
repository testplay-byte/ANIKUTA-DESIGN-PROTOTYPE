// app_theme.dart — builds Material 3 ThemeData from a WizardPalette.
//
// Uses ColorScheme.fromSeed so dark/light variants are derived consistently.
// Fonts: Inter (bundled in assets/fonts/) with weights 400-900 so bold
// weights (700/800/900) render with REAL glyph files, not fake-bold.
// The poison screen forces a dedicated red palette via buildPoisonTheme().

import 'package:flutter/material.dart';
import 'palettes.dart';

const String kFontFamily = 'Inter';

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
    fontFamily: kFontFamily,
    textTheme: _buildTextTheme(brightness),
    appBarTheme: AppBarTheme(
      backgroundColor: brightness == Brightness.dark ? palette.bgDark : palette.bgLight,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: const TextStyle(
        fontFamily: kFontFamily,
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
        textStyle: const TextStyle(fontFamily: kFontFamily, fontSize: 16, fontWeight: FontWeight.w700),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        minimumSize: const Size(64, 52),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        textStyle: const TextStyle(fontFamily: kFontFamily, fontSize: 16, fontWeight: FontWeight.w600),
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
    fontFamily: kFontFamily,
    textTheme: _buildTextTheme(brightness),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        minimumSize: const Size(64, 52),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        textStyle: const TextStyle(fontFamily: kFontFamily, fontSize: 16, fontWeight: FontWeight.w700),
      ),
    ),
  );
}

TextTheme _buildTextTheme(Brightness brightness) {
  final base = Typography.material2021().black.copyWith(
    displayLarge: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w800),
    displayMedium: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w800),
    displaySmall: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w700),
    headlineLarge: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w800),
    headlineMedium: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w800),
    headlineSmall: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w700),
    titleLarge: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w700),
    titleMedium: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w700),
    titleSmall: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w600),
    bodyLarge: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w400),
    bodyMedium: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w400),
    bodySmall: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w400),
    labelLarge: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w700),
    labelMedium: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w600),
    labelSmall: const TextStyle(fontFamily: kFontFamily, fontWeight: FontWeight.w600),
  );
  return base;
}
