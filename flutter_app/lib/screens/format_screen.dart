// format_screen.dart — Step 5/15: Restore Backup (Format not supported).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../models/wizard_models.dart';
import '../theme/app_theme.dart';
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
    final onText = isDark ? Colors.white : Colors.black87;
    final muted = onText.withOpacity(0.6);
    final surface2 = isDark ? palette.surface2 : cs.surface;

    return WizardScaffold(
      pageHeading: 'Restore Backup',
      visual: FormatVisual(
        primary: cs.primary,
        onPrimary: cs.onPrimary,
        size: 190,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // 1. Message block.
          Text(
            'This is not the format I was expecting.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: kFontFamily,
              color: onText,
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
              fontFamily: kFontFamily,
              color: muted,
              fontSize: 15,
              height: 1.4,
              fontWeight: FontWeight.w500,
            ),
          ),

          // 2. Spacer.
          const SizedBox(height: 20),

          // 3. File details card.
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: surface2,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: cs.primary.withOpacity(0.27),
                width: 1,
              ),
            ),
            child: Column(
              children: [
                _FileRow(
                  label: 'Name',
                  value: kBackupFile.name,
                  onText: onText,
                ),
                Divider(
                  height: 18,
                  thickness: 1,
                  color: onText.withOpacity(0.08),
                ),
                _FileRow(
                  label: 'Size',
                  value: kBackupFile.size,
                  onText: onText,
                ),
                Divider(
                  height: 18,
                  thickness: 1,
                  color: onText.withOpacity(0.08),
                ),
                _FileRow(
                  label: 'Format',
                  value: kBackupFile.format,
                  onText: onText,
                ),
              ],
            ),
          ),
        ],
      ),
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Try restoring anyway',
      onPrimary: () => WizardNav.next(context, currentIndex: 5),
      stepIndex: 5,
      stepTotal: kStepTotal,
    );
  }
}

/// A single label/value row inside the backup file details card.
/// label: 13px w600 onText.withOpacity(0.55), grey, left.
/// value: 14px w600 onText, white, right.
class _FileRow extends StatelessWidget {
  final String label;
  final String value;
  final Color onText;

  const _FileRow({
    required this.label,
    required this.value,
    required this.onText,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontFamily: kFontFamily,
            color: onText.withOpacity(0.55),
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
              fontFamily: kFontFamily,
              color: onText,
              fontSize: 14,
              fontWeight: FontWeight.w600,
              height: 1.35,
            ),
          ),
        ),
      ],
    );
  }
}
