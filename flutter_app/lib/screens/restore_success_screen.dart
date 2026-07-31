// restore_success_screen.dart — Step 12/15: Restore successful.
//
// Mirrors the web prototype's restore-successful-screen.tsx exactly:
//   - Page heading "Restore Backup".
//   - Large confetti check-circle visual (size 220, the web --lg size).
//   - Descriptive title "Restore successful" + subtitle.
//   - No stats card (removed per the web prototype's latest revision).
//   - No back button. Primary "Continue" pill only.
//   - No auto-advance — the user taps Continue.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class RestoreSuccessScreen extends StatelessWidget {
  const RestoreSuccessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    context.watch<WizardController>();
    final cs = Theme.of(context).colorScheme;

    return WizardScaffold(
      stepIndex: 12,
      stepTotal: kStepTotal,
      scrollable: false,
      pageHeading: 'Restore Backup',
      visual: CheckCircleVisual(
        primary: cs.primary,
        onPrimary: cs.onPrimary,
        size: 220,
        withConfetti: true,
      ),
      descriptiveTitle: 'Restore successful',
      subtitle: 'Your library has been restored successfully.',
      primaryLabel: 'Continue',
      onPrimary: () => WizardNav.next(context, currentIndex: 12),
      body: const SizedBox(height: 8),
    );
  }
}
