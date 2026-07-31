// restore_success_screen.dart — Step 13/15: Restore Complete
//
// Success state after a restore. Shows a confetti check, a 3-stat summary
// (anime restored / episodes / categories), and a Continue button. Also
// auto-advances after ~4s as a fallback — whichever fires first wins, guarded
// by a _navigated flag to avoid a double push.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class RestoreSuccessScreen extends StatefulWidget {
  const RestoreSuccessScreen({super.key});

  @override
  State<RestoreSuccessScreen> createState() => _RestoreSuccessScreenState();
}

class _RestoreSuccessScreenState extends State<RestoreSuccessScreen> {
  bool _navigated = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Future.delayed(const Duration(milliseconds: 4000), () {
        _advance();
      });
    });
  }

  void _advance() {
    if (!mounted || _navigated) return;
    _navigated = true;
    WizardNav.next(context, currentIndex: 12);
  }

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;

    return WizardScaffold(
      stepIndex: 12,
      stepTotal: kStepTotal,
      title: 'Restore Complete',
      subtitle: 'Your library is back.',
      primaryLabel: 'Continue',
      onPrimary: _advance,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 16),
          Center(
            child: CheckCircleVisual(
              primary: cs.primary,
              onPrimary: cs.onPrimary,
              size: 150,
              withConfetti: true,
            ),
          ),
          const SizedBox(height: 28),
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
            decoration: BoxDecoration(
              color: cs.surface,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Row(
              children: [
                Expanded(
                  child: _stat(
                    '${controller.linkedCount}',
                    'Anime restored',
                    cs,
                    onBg,
                  ),
                ),
                Expanded(
                  child: _stat('312', 'Episodes', cs, onBg),
                ),
                Expanded(
                  child: _stat('6', 'Categories', cs, onBg),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }

  Widget _stat(String number, String label, ColorScheme cs, Color onBg) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          number,
          style: TextStyle(
            color: cs.primary,
            fontSize: 24,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          textAlign: TextAlign.center,
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
