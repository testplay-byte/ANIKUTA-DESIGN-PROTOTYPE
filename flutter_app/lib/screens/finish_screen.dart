// finish_screen.dart — Step 15/15: Setup Complete
//
// Final screen. Shows a confetti check and a recap of what was configured
// (theme + mode, anime folder, ad preferences). The only action is
// "Start Exploring", which resets the wizard controller and pops back to the
// welcome screen so the flow can be run again.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class FinishScreen extends StatelessWidget {
  const FinishScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;

    return WizardScaffold(
      stepIndex: 14,
      stepTotal: kStepTotal,
      title: 'Setup Complete',
      subtitle: 'You\u2019re all set.',
      primaryLabel: 'Start Exploring',
      onPrimary: () {
        controller.reset();
        WizardNav.restart(context);
      },
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 12),
          Center(
            child: CheckCircleVisual(
              primary: cs.primary,
              onPrimary: cs.onPrimary,
              size: 160,
              withConfetti: true,
            ),
          ),
          const SizedBox(height: 28),
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: cs.surface,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _summaryRow(
                  Icons.palette_outlined,
                  'Theme',
                  '${controller.palette.name} \u00b7 ${themeModeLabel(controller.themeMode)}',
                  cs.primary,
                  onBg,
                ),
                Divider(
                  height: 24,
                  thickness: 1,
                  color: onBg.withOpacity(0.08),
                ),
                _summaryRow(
                  Icons.folder_outlined,
                  'Anime folder',
                  controller.folderSelected ? 'Selected' : 'Not set',
                  cs.primary,
                  onBg,
                ),
                Divider(
                  height: 24,
                  thickness: 1,
                  color: onBg.withOpacity(0.08),
                ),
                _summaryRow(
                  Icons.tune_outlined,
                  'Ad preferences',
                  controller.adSettings.summary,
                  cs.primary,
                  onBg,
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }

  Widget _summaryRow(
      IconData icon, String label, String value, Color accent, Color onBg) {
    return Row(
      children: [
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: accent.withOpacity(0.16),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: accent, size: 20),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                label,
                style: TextStyle(
                  color: onBg.withOpacity(0.6),
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.4,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: TextStyle(
                  color: onBg,
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
