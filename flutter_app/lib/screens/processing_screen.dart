// processing_screen.dart — Step 7/15: Processing Backup (auto-advance).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/palettes.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

/// Auto-advancing "parsing backup" screen. Displays a processing visual for
/// ~2.5s then pushes the next step. No back / primary action — fully passive.
class ProcessingScreen extends StatefulWidget {
  const ProcessingScreen({super.key});

  @override
  State<ProcessingScreen> createState() => _ProcessingScreenState();
}

class _ProcessingScreenState extends State<ProcessingScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Future.delayed(const Duration(milliseconds: 2500), () {
        if (!mounted) return;
        WizardNav.next(context, currentIndex: 6);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;

    return WizardScaffold(
      stepIndex: 6,
      stepTotal: kStepTotal,
      title: 'Processing Backup',
      subtitle: 'Parsing your backup file\u2026',
      scrollable: false,
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ProcessingVisual(
              primary: cs.primary,
              surface: isDark ? palette.surface2 : cs.surface,
              size: 160,
            ),
            const SizedBox(height: 24),
            Text(
              'Extracting entries\u2026',
              style: TextStyle(
                color: onBg.withOpacity(0.6),
                fontSize: 14,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
