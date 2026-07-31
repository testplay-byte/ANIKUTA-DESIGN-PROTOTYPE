// main.dart — Setup Wizard entry point.
//
// Provides the WizardController at the root and builds a MaterialApp whose
// theme is derived from the currently-selected palette + theme mode.
// The poison screen overrides the palette to red via a route-local
// Theme widget (see poison_screen.dart).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'state/wizard_controller.dart';
import 'theme/app_theme.dart';
import 'models/wizard_models.dart';
import 'screens/welcome_screen.dart';

void main() {
  runApp(const SetupWizardApp());
}

ThemeMode _themeModeFromPref(ThemeModePref pref) {
  switch (pref) {
    case ThemeModePref.dark:
      return ThemeMode.dark;
    case ThemeModePref.light:
      return ThemeMode.light;
    case ThemeModePref.system:
      return ThemeMode.system;
  }
}

class SetupWizardApp extends StatelessWidget {
  const SetupWizardApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => WizardController(),
      child: Consumer<WizardController>(
        builder: (context, controller, _) {
          final palette = controller.palette;
          return MaterialApp(
            title: 'Setup Wizard',
            debugShowCheckedModeBanner: false,
            theme: buildTheme(palette, Brightness.light),
            darkTheme: buildTheme(palette, Brightness.dark),
            themeMode: _themeModeFromPref(controller.themeMode),
            home: const WelcomeScreen(),
          );
        },
      ),
    );
  }
}
