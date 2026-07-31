// format_screen.dart — Step 6/15: Restore Backup (Format not supported).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class FormatScreen extends StatelessWidget {
  const FormatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;

    return WizardScaffold(
      stepIndex: 5,
      stepTotal: kStepTotal,
      title: 'Restore Backup',
      subtitle: 'Format not supported',
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Try restoring anyway',
      onPrimary: () => WizardNav.next(context, currentIndex: 5),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 4),
          Center(
            child: FormatVisual(
              primary: cs.primary,
              onPrimary: cs.onPrimary,
              size: 150,
            ),
          ),
          const SizedBox(height: 22),

          // Two-line description.
          Text(
            'This is not the format I was expecting.',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: onBg,
              fontSize: 16,
              height: 1.4,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            'Still, I can try to restore from it properly.',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: onBg.withOpacity(0.7),
              fontSize: 15,
              height: 1.4,
              fontWeight: FontWeight.w500,
            ),
          ),

          const SizedBox(height: 22),

          // File details card.
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: isDark ? palette.surface2 : cs.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: onBg.withOpacity(0.08),
                width: 1,
              ),
            ),
            child: Column(
              children: [
                _FileRow(
                  label: 'Name',
                  value: kBackupFile.name,
                  onBg: onBg,
                ),
                Divider(
                  height: 18,
                  thickness: 1,
                  color: onBg.withOpacity(0.08),
                ),
                _FileRow(
                  label: 'Size',
                  value: kBackupFile.size,
                  onBg: onBg,
                ),
                Divider(
                  height: 18,
                  thickness: 1,
                  color: onBg.withOpacity(0.08),
                ),
                _FileRow(
                  label: 'Format',
                  value: kBackupFile.format,
                  onBg: onBg,
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

/// A single label/value row inside the backup file details card.
class _FileRow extends StatelessWidget {
  final String label;
  final String value;
  final Color onBg;

  const _FileRow({
    required this.label,
    required this.value,
    required this.onBg,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            color: onBg.withOpacity(0.55),
            fontSize: 13,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.3,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Text(
            value,
            textAlign: TextAlign.right,
            style: TextStyle(
              color: onBg,
              fontSize: 13.5,
              fontWeight: FontWeight.w600,
              height: 1.35,
            ),
          ),
        ),
      ],
    );
  }
}
