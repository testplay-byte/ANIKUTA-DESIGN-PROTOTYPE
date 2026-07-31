// main.dart — Setup Wizard entry point.
//
// Provides the WizardController at the root and builds a MaterialApp whose
// theme is derived from the currently-selected palette + theme mode.
// The poison screen overrides the palette to red via a route-local
// Theme widget (see poison_screen.dart).
//
// Edge-to-edge: the app draws behind the system status bar so the wizard's
// progress bar sits at the very top of the screen. The status bar icons are
// styled to be visible on the dark background.

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'state/wizard_controller.dart';
import 'theme/app_theme.dart';
import 'models/wizard_models.dart';
import 'screens/welcome_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  // Edge-to-edge: draw behind the status bar (transparent) and gesture nav bar.
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
  // Status bar: transparent bg, light icons (app is dark by default).
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.light, // Android
    statusBarBrightness: Brightness.dark, // iOS
    systemNavigationBarColor: Colors.transparent,
    systemNavigationBarIconBrightness: Brightness.light,
  ));
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
            builder: (context, child) {
              // AnnotatedRegion lets each screen set its own status bar style
              // based on the current theme brightness.
              final brightness = Theme.of(context).brightness;
              return AnnotatedRegion<SystemUiOverlayStyle>(
                value: SystemUiOverlayStyle(
                  statusBarColor: Colors.transparent,
                  statusBarIconBrightness:
                      brightness == Brightness.dark ? Brightness.light : Brightness.dark,
                  statusBarBrightness:
                      brightness == Brightness.dark ? Brightness.dark : Brightness.light,
                  systemNavigationBarColor: Colors.transparent,
                  systemNavigationBarIconBrightness:
                      brightness == Brightness.dark ? Brightness.light : Brightness.dark,
                ),
                child: child!,
              );
            },
          );
        },
      ),
    );
  }
}
