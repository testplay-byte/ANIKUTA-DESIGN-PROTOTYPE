// restore_processing_screen.dart — Step 12/15: Restore Backup (auto-advancing)
//
// Transient "working" screen. Shows a circular progress ring with a download
// icon, then auto-advances to the restore-success screen after ~3s. No back or
// primary action — the user just waits.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class RestoreProcessingScreen extends StatefulWidget {
  const RestoreProcessingScreen({super.key});

  @override
  State<RestoreProcessingScreen> createState() =>
      _RestoreProcessingScreenState();
}

class _RestoreProcessingScreenState extends State<RestoreProcessingScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Future.delayed(const Duration(milliseconds: 3000), () {
        if (!mounted) return;
        WizardNav.next(context, currentIndex: 11);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    // Subscribe to controller changes so the ring recolors if the palette
    // changes mid-flight (defensive; no interactive state on this screen).
    context.watch<WizardController>();
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;

    return WizardScaffold(
      stepIndex: 11,
      stepTotal: kStepTotal,
      scrollable: false,
      title: 'Restore Backup',
      subtitle: 'Writing to your library\u2026',
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          ProgressRingVisual(
            primary: cs.primary,
            track: cs.surfaceContainerHighest,
            icon: Icons.downloading_rounded,
            size: 160,
          ),
          const SizedBox(height: 28),
          Text(
            'Restoring your library\u2026',
            style: TextStyle(
              color: onBg.withOpacity(0.6),
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
