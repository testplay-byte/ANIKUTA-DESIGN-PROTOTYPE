// restore_screen.dart — Step 4/15: Restore Backup
//
// Matches web prototype `restore-screen.tsx`:
//   heading → RestoreVisual → "Restore backup" → subtitle
//   → "Select Backup File" outlined button (advances to next step).
//   Primary action is a ghost "Skip" button that jumps to the finish screen.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class RestoreScreen extends StatelessWidget {
  const RestoreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onText = isDark ? Colors.white : Colors.black87;

    return WizardScaffold(
      pageHeading: 'Restore Backup',
      stepIndex: 4,
      stepTotal: kStepTotal,
      visual: RestoreVisual(
        primary: cs.primary,
        onPrimary: cs.onPrimary,
        surface: isDark ? palette.surface2 : cs.surface,
        size: 180,
      ),
      descriptiveTitle: 'Restore backup',
      subtitle:
          'Got a backup from a previous install? Restore your library, history, and settings in one tap.',
      body: Center(
        child: SelectButton(
          label: 'Select Backup File',
          onTap: () {
            controller.setBackupSelected(true);
            WizardNav.next(context, currentIndex: 4);
          },
          primary: cs.primary,
          icon: Icons.file_download_outlined,
        ),
      ),
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryButton: PillButton.ghost(
        label: 'Skip',
        onTap: () => WizardNav.skipToFinish(context),
        onText: onText,
      ),
    );
  }
}
