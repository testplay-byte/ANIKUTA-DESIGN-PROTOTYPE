// processing_screen.dart — Step 6/15: Processing Backup (auto-advance 2.5s).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/app_theme.dart';
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
    final onText = isDark ? Colors.white : Colors.black87;

    return WizardScaffold(
      pageHeading: 'Restore Backup',
      visual: ProcessingVisual(
        primary: cs.primary,
        surface: isDark ? palette.surface2 : cs.surface,
        size: 160,
      ),
      descriptiveTitle: 'Processing backup',
      subtitle: 'Reading your backup file and extracting data\u2026',
      scrollable: false,
      body: Center(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: cs.primary.withOpacity(0.13),
            borderRadius: BorderRadius.circular(999),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              _ScanningDots(primary: cs.primary),
              const SizedBox(width: 8),
              Text(
                'Processing',
                style: TextStyle(
                  fontFamily: kFontFamily,
                  color: cs.primary,
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.2,
                ),
              ),
            ],
          ),
        ),
      ),
      primaryButton: PillButton.ghost(
        label: 'Please wait\u2026',
        onTap: null,
        onText: onText,
      ),
      stepIndex: 6,
      stepTotal: kStepTotal,
    );
  }
}

/// Three small circles that pulse in sequence (typical "loading" indicator).
class _ScanningDots extends StatefulWidget {
  final Color primary;
  const _ScanningDots({required this.primary});

  @override
  State<_ScanningDots> createState() => _ScanningDotsState();
}

class _ScanningDotsState extends State<_ScanningDots>
    with TickerProviderStateMixin {
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat();
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        // 3 dots, each phase-offset by 1/3 of the cycle.
        return Row(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(3, (i) {
            final phase = (_c.value * 3 - i) % 1.0;
            // Triangular pulse: 0..0.5 ramps up, 0.5..1 ramps down.
            final t = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
            final opacity = 0.35 + 0.65 * t;
            return Padding(
              padding: EdgeInsets.only(right: i == 2 ? 0 : 4),
              child: Container(
                width: 7,
                height: 7,
                decoration: BoxDecoration(
                  color: widget.primary.withOpacity(opacity.clamp(0.0, 1.0)),
                  shape: BoxShape.circle,
                ),
              ),
            );
          }),
        );
      },
    );
  }
}
