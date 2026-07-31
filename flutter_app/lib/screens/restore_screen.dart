// restore_screen.dart — Step 5/15: Restore Backup (optional — pick a file or skip to finish).

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
    final onBg = isDark ? Colors.white : Colors.black87;

    return WizardScaffold(
      stepIndex: 4,
      stepTotal: kStepTotal,
      title: 'Restore Backup',
      subtitle: 'Pick up where you left off, or start fresh.',
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      // No standard primary CTA — the body hosts the main "Select Backup File"
      // action. The bottom bar instead offers a "Skip" secondary action.
      primaryButton: OutlinedButton(
        onPressed: () => WizardNav.skipToFinish(context),
        style: OutlinedButton.styleFrom(
          foregroundColor: cs.primary,
          side: BorderSide(color: cs.primary.withOpacity(0.5), width: 1.2),
        ),
        child: const Text('Skip'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 4),
          Center(
            child: RestoreVisual(
              primary: cs.primary,
              onPrimary: cs.onPrimary,
              surface: isDark ? palette.surface2 : cs.surface,
              size: 150,
            ),
          ),
          const SizedBox(height: 22),

          // Description.
          Text(
            'Restore from a previous backup file to bring back your library, history, and settings.',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: onBg.withOpacity(0.72),
              fontSize: 14,
              height: 1.5,
              fontWeight: FontWeight.w500,
            ),
          ),

          const SizedBox(height: 22),

          // Primary action — Select Backup File.
          Center(
            child: FilledButton.icon(
              onPressed: () {
                controller.setBackupSelected(true);
                WizardNav.next(context, currentIndex: 4);
              },
              icon: const Icon(Icons.file_upload_outlined, size: 20),
              label: const Padding(
                padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                child: Text(
                  'Select Backup File',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              style: FilledButton.styleFrom(
                padding:
                    const EdgeInsets.symmetric(horizontal: 22, vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
            ),
          ),

          const SizedBox(height: 20),

          // Helper hint card.
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: (isDark ? palette.surface2 : cs.surface)
                  .withOpacity(0.6),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(
                color: onBg.withOpacity(0.08),
                width: 1,
              ),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.info_outline,
                    color: onBg.withOpacity(0.55), size: 18),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'No backup yet? No problem — tap Skip to start with a fresh library.',
                    style: TextStyle(
                      color: onBg.withOpacity(0.65),
                      fontSize: 12.5,
                      height: 1.45,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 8),
        ],
      ),
    );
  }
}
