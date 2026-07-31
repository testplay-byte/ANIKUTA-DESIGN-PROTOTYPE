// restore_summary_screen.dart — Step 10/15: Restore Backup — restore summary.
//
// Mirrors the web prototype's restore-summary-screen.tsx exactly:
//   - Page heading "Restore Backup" (colored, top-left).
//   - Descriptive title "Restore summary" + subtitle.
//   - A single hero card (surface2, rounded 20, primary-tinted border) with:
//       * Header row: download icon tile + title/desc.
//       * 2x2 stat grid (to restore / auto-linked / manually linked / episodes).
//       * Info note (primary-tinted bg) about overwrite.
//   - Back (secondary pill) + Restore Now (primary pill).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/app_theme.dart';
import '../widgets/wizard_scaffold.dart';

class RestoreSummaryScreen extends StatelessWidget {
  const RestoreSummaryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onText = isDark ? Colors.white : Colors.black87;
    final muted = onText.withOpacity(0.6);
    final surface2 = isDark ? palette.surface2 : cs.surface;
    final surface3 = isDark ? palette.surface3 : cs.surfaceContainerHighest;
    final primary = palette.primary;

    // toRestore matches the web prototype: linkedCount + 239.
    final toRestore = controller.linkedCount + 239;

    return WizardScaffold(
      stepIndex: 10,
      stepTotal: kStepTotal,
      pageHeading: 'Restore Backup',
      descriptiveTitle: 'Restore summary',
      subtitle: 'Ready to restore. Review the details below.',
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
              color: surface2,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: primary.withOpacity(0.33), width: 1),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // ---- Header row ----
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        color: primary.withOpacity(0.16),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(Icons.download_rounded,
                          color: primary, size: 22),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'Ready to restore',
                            style: TextStyle(
                              fontFamily: kFontFamily,
                              color: onText,
                              fontSize: 18,
                              fontWeight: FontWeight.w800,
                              letterSpacing: -0.2,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            'Your library will be overwritten.',
                            style: TextStyle(
                              fontFamily: kFontFamily,
                              color: Colors.white.withOpacity(0.54),
                              fontSize: 11,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                // ---- 2x2 stats grid ----
                Row(
                  children: [
                    Expanded(
                      child: _StatBox(
                        number: '$toRestore',
                        label: 'Anime to restore',
                        primary: primary,
                        muted: muted,
                        surface3: surface3,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: _StatBox(
                        number: '${controller.linkedCount}',
                        label: 'Auto-linked',
                        primary: primary,
                        muted: muted,
                        surface3: surface3,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: _StatBox(
                        number: '0',
                        label: 'Manually linked',
                        primary: primary,
                        muted: muted,
                        surface3: surface3,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: _StatBox(
                        number: '1,432',
                        label: 'Episodes',
                        primary: primary,
                        muted: muted,
                        surface3: surface3,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                // ---- Info note ----
                Container(
                  padding: const EdgeInsets.all(11),
                  decoration: BoxDecoration(
                    color: primary.withOpacity(0.07),
                    borderRadius: BorderRadius.circular(16),
                    border:
                        Border.all(color: primary.withOpacity(0.33), width: 1),
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(Icons.info_rounded, color: primary, size: 20),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          'This will overwrite any existing library data. The restore process may take a few moments.',
                          style: TextStyle(
                            fontFamily: kFontFamily,
                            color: muted,
                            fontSize: 12,
                            height: 1.4,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
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

/// One stat tile of the 2x2 grid.
class _StatBox extends StatelessWidget {
  final String number;
  final String label;
  final Color primary;
  final Color muted;
  final Color surface3;

  const _StatBox({
    required this.number,
    required this.label,
    required this.primary,
    required this.muted,
    required this.surface3,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: surface3,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            number,
            style: TextStyle(
              fontFamily: kFontFamily,
              color: primary,
              fontSize: 20,
              fontWeight: FontWeight.w800,
              height: 1.1,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              fontFamily: kFontFamily,
              color: muted,
              fontSize: 10,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.3,
            ),
          ),
        ],
      ),
    );
  }
}
