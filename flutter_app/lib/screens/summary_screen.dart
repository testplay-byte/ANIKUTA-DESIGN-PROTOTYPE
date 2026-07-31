// summary_screen.dart — Step 8/15: Backup Summary (what will be restored).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/palettes.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

/// Lists the categories found in the parsed backup file, including one
/// unsupported (Manga) row styled distinctly as an error/skipped item.
/// "Cancel" pops back to the Format screen (step 5) rather than the prior
/// Processing screen; "Restore" continues forward.
class SummaryScreen extends StatelessWidget {
  const SummaryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;
    final surface = isDark ? palette.surface2 : cs.surface;
    final errorSurface = cs.errorContainer.withOpacity(0.3);

    return WizardScaffold(
      stepIndex: 7,
      stepTotal: kStepTotal,
      title: 'Backup Summary',
      subtitle: 'Here\u2019s what will be restored.',
      backLabel: 'Cancel',
      onBack: () => WizardNav.cancelToFormat(context),
      primaryLabel: 'Restore',
      onPrimary: () => WizardNav.next(context, currentIndex: 7),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 4),
          _summaryRow(
            icon: Icons.movie_outlined,
            label: 'Anime',
            count: '24 entries',
            surface: surface,
            accent: cs.primary,
            onBg: onBg,
          ),
          _summaryRow(
            icon: Icons.category_outlined,
            label: 'Categories',
            count: '6',
            surface: surface,
            accent: cs.primary,
            onBg: onBg,
          ),
          _summaryRow(
            icon: Icons.play_circle_outline,
            label: 'Episodes tracked',
            count: '312',
            surface: surface,
            accent: cs.primary,
            onBg: onBg,
          ),
          _summaryRow(
            icon: Icons.history,
            label: 'History',
            count: '89',
            surface: surface,
            accent: cs.primary,
            onBg: onBg,
          ),
          _summaryRow(
            icon: Icons.settings_outlined,
            label: 'Settings',
            count: 'All',
            surface: surface,
            accent: cs.primary,
            onBg: onBg,
          ),
          _summaryRow(
            icon: Icons.warning_amber_rounded,
            label: 'Manga',
            count: '12 \u2014 not supported, will be skipped',
            surface: errorSurface,
            accent: cs.error,
            onBg: onBg,
            error: true,
          ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }

  Widget _summaryRow({
    required IconData icon,
    required String label,
    required String count,
    required Color surface,
    required Color accent,
    required Color onBg,
    bool error = false,
  }) {
    final bg = surface;
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(14),
        border: error ? Border.all(color: accent.withOpacity(0.35), width: 1) : null,
      ),
      child: Row(
        children: [
          Container(
            width: 38,
            height: 38,
            decoration: BoxDecoration(
              color: accent.withOpacity(0.16),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: accent, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              label,
              style: TextStyle(
                color: onBg,
                fontSize: 15,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const SizedBox(width: 8),
          Flexible(
            child: Text(
              count,
              textAlign: TextAlign.right,
              style: TextStyle(
                color: error ? accent : onBg.withOpacity(0.85),
                fontSize: 13,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
