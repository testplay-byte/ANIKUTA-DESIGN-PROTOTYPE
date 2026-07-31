// finish_screen.dart — Step 14/15: Setup complete.
//
// Mirrors the web prototype's finish-screen.tsx exactly:
//   - Page heading "Setup complete" (colored, top-left).
//   - Confetti check-circle visual (size 180).
//   - Descriptive title "You're all set!" + subtitle.
//   - A summary card (surface2, rounded 20, padding 18) with three rows
//     separated by Dividers:
//       1. Theme        — palette name + theme mode label
//       2. Anime folder — Selected / Not set
//       3. Ad prefs     — controller.adSettings.summary
//   - Each row: a tinted icon square (36x36, rounded 10) + label/value.
//   - No back button. Primary "Start Exploring" — resets the wizard state
//     and pops back to the welcome screen.

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
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onText = isDark ? Colors.white : Colors.black87;
    final muted = onText.withOpacity(0.6);
    final surface2 = isDark ? palette.surface2 : cs.surface;
    final primary = palette.primary;

    return WizardScaffold(
      stepIndex: 14,
      stepTotal: kStepTotal,
      pageHeading: 'Setup complete',
      visual: CheckCircleVisual(
        primary: cs.primary,
        onPrimary: cs.onPrimary,
        size: 180,
        withConfetti: true,
      ),
      descriptiveTitle: 'You\u2019re all set!',
      subtitle: 'Your anime app is ready to go.',
      primaryLabel: 'Start Exploring',
      onPrimary: () {
        controller.reset();
        WizardNav.restart(context);
      },
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: surface2,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _SummaryRow(
                  icon: Icons.palette_outlined,
                  label: 'Theme',
                  value:
                      '${controller.palette.name} \u00b7 ${themeModeLabel(controller.themeMode)}',
                  primary: primary,
                  onText: onText,
                  muted: muted,
                ),
                Divider(
                  height: 22,
                  thickness: 1,
                  color: onText.withOpacity(0.08),
                ),
                _SummaryRow(
                  icon: Icons.folder_outlined,
                  label: 'Anime folder',
                  value: controller.folderSelected ? 'Selected' : 'Not set',
                  primary: primary,
                  onText: onText,
                  muted: muted,
                ),
                Divider(
                  height: 22,
                  thickness: 1,
                  color: onText.withOpacity(0.08),
                ),
                _SummaryRow(
                  icon: Icons.tune_outlined,
                  label: 'Ad preferences',
                  value: controller.adSettings.summary,
                  primary: primary,
                  onText: onText,
                  muted: muted,
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

/// One row of the final summary card: tinted icon tile + label/value column.
class _SummaryRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color primary;
  final Color onText;
  final Color muted;

  const _SummaryRow({
    required this.icon,
    required this.label,
    required this.value,
    required this.primary,
    required this.onText,
    required this.muted,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: primary.withOpacity(0.16),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: primary, size: 20),
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
                  color: muted,
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.4,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: TextStyle(
                  color: onText,
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
