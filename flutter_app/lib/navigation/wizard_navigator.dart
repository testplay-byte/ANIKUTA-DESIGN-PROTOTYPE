// wizard_navigator.dart — centralized wizard navigation.
//
// The wizard is a linear 15-step flow. Screens call WizardNav.next/back/etc.
// and this helper knows which screen widget to push for each step index.
//
// Special navigation:
//   - skipToFinish (from restore): push finish, remove everything below except welcome.
//   - cancelToFormat (from summary): pop back until the format screen.
//
// Each route is a MaterialPageRoute with name 'step-<index>' so popUntil works.

import 'package:flutter/widgets.dart';
import '../screens/welcome_screen.dart';
import '../screens/theme_screen.dart';
import '../screens/folder_screen.dart';
import '../screens/permissions_screen.dart';
import '../screens/restore_screen.dart';
import '../screens/format_screen.dart';
import '../screens/processing_screen.dart';
import '../screens/summary_screen.dart';
import '../screens/linking_screen.dart';
import '../screens/manual_screen.dart';
import '../screens/restore_summary_screen.dart';
import '../screens/restore_processing_screen.dart';
import '../screens/restore_success_screen.dart';
import '../screens/poison_screen.dart';
import '../screens/finish_screen.dart';

/// Total number of wizard steps.
const int kStepTotal = 15;

Widget _buildStep(int index) {
  switch (index) {
    case 0:
      return const WelcomeScreen();
    case 1:
      return const ThemeScreen();
    case 2:
      return const FolderScreen();
    case 3:
      return const PermissionsScreen();
    case 4:
      return const RestoreScreen();
    case 5:
      return const FormatScreen();
    case 6:
      return const ProcessingScreen();
    case 7:
      return const SummaryScreen();
    case 8:
      return const LinkingScreen();
    case 9:
      return const ManualScreen();
    case 10:
      return const RestoreSummaryScreen();
    case 11:
      return const RestoreProcessingScreen();
    case 12:
      return const RestoreSuccessScreen();
    case 13:
      return const PoisonScreen();
    case 14:
      return const FinishScreen();
    default:
      return const WelcomeScreen();
  }
}

class WizardNav {
  WizardNav._();

  /// Push the next step (index + 1). No-op if already at the last step.
  static void next(BuildContext context, {required int currentIndex}) {
    final nextIndex = (currentIndex + 1).clamp(0, kStepTotal - 1);
    if (nextIndex == currentIndex) return;
    Navigator.of(context).push(
      PageRouteBuilder(
        settings: RouteSettings(name: 'step-$nextIndex'),
        pageBuilder: (_, __, ___) => _buildStep(nextIndex),
        transitionsBuilder: (_, anim, __, child) {
          // Slide + fade forward
          return FadeTransition(
            opacity: anim,
            child: SlideTransition(
              position: Tween<Offset>(
                begin: const Offset(0.06, 0.0),
                end: Offset.zero,
              ).animate(CurvedAnimation(parent: anim, curve: Curves.easeOutCubic)),
              child: child,
            ),
          );
        },
        transitionDuration: const Duration(milliseconds: 260),
      ),
    );
  }

  /// Pop back one step.
  static void back(BuildContext context) {
    Navigator.of(context).maybePop();
  }

  /// From the Restore screen: skip the entire restore flow and jump to Finish.
  /// Removes all routes between the current one and the first, then pushes finish.
  static void skipToFinish(BuildContext context) {
    Navigator.of(context).pushAndRemoveUntil(
      PageRouteBuilder(
        settings: const RouteSettings(name: 'step-14'),
        pageBuilder: (_, __, ___) => _buildStep(14),
        transitionsBuilder: (_, anim, __, child) =>
            FadeTransition(opacity: anim, child: child),
        transitionDuration: const Duration(milliseconds: 300),
      ),
      (route) => route.isFirst,
    );
  }

  /// From the Backup Summary screen: cancel back to the Format screen.
  static void cancelToFormat(BuildContext context) {
    Navigator.of(context).popUntil((route) {
      final name = route.settings.name;
      return name == 'step-5' || route.isFirst;
    });
  }

  /// Restart the wizard from the welcome screen (used by Finish → Start Exploring).
  static void restart(BuildContext context) {
    Navigator.of(context).popUntil((route) => route.isFirst);
  }
}
