import 'package:flutter/material.dart';

// ANIKUTA Design Language
// Primary: #B1F256 (lime green)
// Dark purple-tinted surfaces

class AnikutaColors {
  static const primary = Color(0xFFB1F256);
  static const onPrimary = Color(0xFF14111F);
  static const primaryContainer = Color(0xFF4A6B1A);
  static const onPrimaryContainer = Color(0xFFD4F5A0);

  static const background = Color(0xFF14111F);
  static const surface1 = Color(0xFF1B1729);
  static const surface2 = Color(0xFF221E33);
  static const surface3 = Color(0xFF2A2540);
  static const surface4 = Color(0xFF332D4C);
  static const surface5 = Color(0xFF3D3656);

  static const onBackground = Color(0xFFECE6F5);
  static const onSurface = Color(0xFFECE6F5);
  static const onSurfaceVariant = Color(0xFFA89EC0);
  static const subtle = Color(0xFF6E6688);

  static const secondary = Color(0xFFCCC2DC);
  static const secondaryContainer = Color(0xFF4A4458);
  static const tertiary = Color(0xFFEFB8C8);
  static const error = Color(0xFFF2B8B5);
  static const errorContainer = Color(0xFF8C1D18);
  static const outline = Color(0xFF938F99);
  static const outlineVariant = Color(0xFF49454F);
  static const warn = Color(0xFFFFCC80);
  static const success = Color(0xFFA5D6A7);
}

class AnikutaTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: const ColorScheme.dark(
        primary: AnikutaColors.primary,
        onPrimary: AnikutaColors.onPrimary,
        primaryContainer: AnikutaColors.primaryContainer,
        onPrimaryContainer: AnikutaColors.onPrimaryContainer,
        secondary: AnikutaColors.secondary,
        secondaryContainer: AnikutaColors.secondaryContainer,
        tertiary: AnikutaColors.tertiary,
        error: AnikutaColors.error,
        errorContainer: AnikutaColors.errorContainer,
        surface: AnikutaColors.surface1,
        onSurface: AnikutaColors.onSurface,
        surfaceContainerHighest: AnikutaColors.surface3,
        onSurfaceVariant: AnikutaColors.onSurfaceVariant,
        outline: AnikutaColors.outline,
        outlineVariant: AnikutaColors.outlineVariant,
        background: AnikutaColors.background,
        onBackground: AnikutaColors.onBackground,
      ),
      scaffoldBackgroundColor: AnikutaColors.background,
      appBarTheme: const AppBarTheme(
        backgroundColor: AnikutaColors.background,
        foregroundColor: AnikutaColors.onBackground,
        elevation: 0,
        scrolledUnderElevation: 0,
      ),
      cardTheme: CardThemeData(
        color: AnikutaColors.surface2,
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: AnikutaColors.surface3,
        indicatorColor: AnikutaColors.primaryContainer,
        labelTextStyle: WidgetStateProperty.all(
          const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
        ),
      ),
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) return AnikutaColors.primary;
          return AnikutaColors.onSurfaceVariant;
        }),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) return AnikutaColors.primaryContainer;
          return AnikutaColors.surface4;
        }),
      ),
      textTheme: const TextTheme(
        displayLarge: TextStyle(fontSize: 36, fontWeight: FontWeight.w800, letterSpacing: -0.75, color: AnikutaColors.onBackground),
        displayMedium: TextStyle(fontSize: 30, fontWeight: FontWeight.w800, letterSpacing: -0.5, color: AnikutaColors.onBackground),
        displaySmall: TextStyle(fontSize: 26, fontWeight: FontWeight.w800, letterSpacing: -0.25, color: AnikutaColors.onBackground),
        headlineLarge: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: AnikutaColors.onBackground),
        headlineMedium: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: AnikutaColors.onBackground),
        headlineSmall: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: AnikutaColors.onBackground),
        titleLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: AnikutaColors.onBackground),
        titleMedium: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AnikutaColors.onBackground),
        titleSmall: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AnikutaColors.onBackground),
        bodyLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.w400, color: AnikutaColors.onBackground),
        bodyMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.w400, color: AnikutaColors.onBackground),
        bodySmall: TextStyle(fontSize: 13, fontWeight: FontWeight.w400, color: AnikutaColors.onSurfaceVariant),
        labelLarge: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, letterSpacing: 0.5, color: AnikutaColors.onBackground),
        labelMedium: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, letterSpacing: 0.5, color: AnikutaColors.onSurfaceVariant),
        labelSmall: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 0.06, color: AnikutaColors.onSurfaceVariant),
      ),
    );
  }
}
