// restore_summary_screen.dart — Step 11/15: Restore Backup — ready to restore.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/palettes.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

/// Final pre-restore summary: a hero card with the three headline stats, plus
/// a small note about manually linked / unmatched counts and ad preferences.
class RestoreSummaryScreen extends StatelessWidget {
  const RestoreSummaryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;
    final surface = isDark ? palette.surface2 : cs.surface;

    return WizardScaffold(
      stepIndex: 10,
      stepTotal: kStepTotal,
      title: 'Restore Backup',
      subtitle: 'Ready to restore',
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Restore Now',
      onPrimary: () => WizardNav.next(context, currentIndex: 10),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 4),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: surface,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    Expanded(
                        child: _inlineStat(
                            '${controller.linkedCount}', 'Anime', cs.primary, onBg)),
                    Container(
                      width: 1,
                      height: 40,
                      color: onBg.withOpacity(0.1),
                    ),
                    Expanded(
                        child: _inlineStat('312', 'Episodes', cs.primary, onBg)),
                    Container(
                      width: 1,
                      height: 40,
                      color: onBg.withOpacity(0.1),
                    ),
                    Expanded(
                        child: _inlineStat('6', 'Categories', cs.primary, onBg)),
                  ],
                ),
                const SizedBox(height: 16),
                Text(
                  'Your backup is matched and ready.',
                  style: TextStyle(
                    color: onBg.withOpacity(0.75),
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          const SectionLabel('Ad preferences'),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: BoxDecoration(
              color: surface,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              children: [
                Icon(Icons.campaign_outlined,
                    color: cs.primary, size: 20),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    controller.adSettings.summary,
                    style: TextStyle(
                      color: onBg.withOpacity(0.8),
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: BoxDecoration(
              color: surface,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Text(
              'Manually linked: ${controller.linkedCount} \u00B7 Unmatched: ${controller.unlinkedCount}',
              style: TextStyle(
                color: onBg.withOpacity(0.6),
                fontSize: 13,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }

  Widget _inlineStat(String number, String label, Color accent, Color onBg) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          number,
          style: TextStyle(
            color: accent,
            fontSize: 24,
            fontWeight: FontWeight.w800,
            height: 1.0,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          label,
          style: TextStyle(
            color: onBg.withOpacity(0.6),
            fontSize: 12,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
