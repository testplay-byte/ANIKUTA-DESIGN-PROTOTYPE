// restore_processing_screen.dart — Step 11/15: Restore Backup (auto-advancing).
//
// Mirrors the web prototype's restore-processing-screen.tsx exactly:
//   - Page heading "Restore Backup".
//   - RestoreProcessingVisual (size 180): circular progress ring with 6
//     flowing particles orbiting inside + a soft pulsing glow + a central
//     downloading icon.
//   - Descriptive title "Restoring your library" + dynamic subtitle that
//     counts the anime being restored.
//   - Body: a "scanning pill" with 3 animated dots + a cycling status message.
//   - Primary action replaced with a ghost "Restoring…" button (no onTap).
//   - No back button.
//   - Auto-advances to the next step after 3.2s.

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/app_theme.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class RestoreProcessingScreen extends StatefulWidget {
  const RestoreProcessingScreen({super.key});

  @override
  State<RestoreProcessingScreen> createState() =>
      _RestoreProcessingScreenState();
}

class _RestoreProcessingScreenState extends State<RestoreProcessingScreen> {
  static const _messages = <String>[
    'Writing anime to your library\u2026',
    'Restoring watch history\u2026',
    'Applying settings\u2026',
    'Finalizing restore\u2026',
  ];

  int _messageIndex = 0;
  Timer? _messageTimer;

  @override
  void initState() {
    super.initState();
    // Cycle the status message every 900ms.
    _messageTimer = Timer.periodic(const Duration(milliseconds: 900), (_) {
      if (!mounted) return;
      setState(() {
        _messageIndex = (_messageIndex + 1) % _messages.length;
      });
    });
    // Auto-advance after 3.2s.
    Future.delayed(const Duration(milliseconds: 3200), () {
      if (!mounted) return;
      WizardNav.next(context, currentIndex: 11);
    });
  }

  @override
  void dispose() {
    _messageTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onText = isDark ? Colors.white : Colors.black87;
    final restoredCount = controller.linkedCount + 239;

    return WizardScaffold(
      stepIndex: 11,
      stepTotal: kStepTotal,
      scrollable: false,
      pageHeading: 'Restore Backup',
      visual: RestoreProcessingVisual(
        primary: cs.primary,
        track: cs.surfaceContainerHighest,
        icon: Icons.downloading_rounded,
        size: 180,
      ),
      descriptiveTitle: 'Restoring your library',
      subtitle:
          'Please wait while we restore $restoredCount anime to your library.',
      primaryButton: GhostButton(
        label: 'Restoring\u2026',
        onTap: null,
        onText: onText,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 8),
          Center(
            child: _ScanningPill(
              message: _messages[_messageIndex],
              primary: cs.primary,
            ),
          ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}

/// Pill-shaped status indicator with 3 bouncing dots + a cycling message.
class _ScanningPill extends StatelessWidget {
  final String message;
  final Color primary;

  const _ScanningPill({required this.message, required this.primary});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: primary.withOpacity(0.13),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _Dots(primary: primary),
          const SizedBox(width: 10),
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 220),
            child: Text(
              message,
              key: ValueKey(message),
              style: TextStyle(
                fontFamily: kFontFamily,
                color: primary,
                fontSize: 13,
                fontWeight: FontWeight.w700,
                letterSpacing: 0.1,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Three dots that bounce in sequence (driven by a single controller).
class _Dots extends StatefulWidget {
  final Color primary;
  const _Dots({required this.primary});

  @override
  State<_Dots> createState() => _DotsState();
}

class _DotsState extends State<_Dots> with SingleTickerProviderStateMixin {
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1100),
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
        return Row(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(3, (i) {
            // Each dot peaks at a different phase.
            final phase = (_c.value * 3 - i) % 3;
            final t = (1 - (phase - 1).abs()).clamp(0.0, 1.0);
            return Container(
              margin: EdgeInsets.only(right: i == 2 ? 0 : 4),
              width: 7,
              height: 7,
              decoration: BoxDecoration(
                color: widget.primary.withOpacity(0.45 + 0.55 * t),
                shape: BoxShape.circle,
              ),
            );
          }),
        );
      },
    );
  }
}

/// Ghost-style pill button used for the "Restoring…" affordance.
/// Transparent background, muted text, no arrows — visually present but
/// non-interactive (onTap == null).
class GhostButton extends StatelessWidget {
  final String label;
  final VoidCallback? onTap;
  final Color onText;

  const GhostButton({
    super.key,
    required this.label,
    required this.onTap,
    required this.onText,
  });

  @override
  Widget build(BuildContext context) {
    final fg = onText.withOpacity(0.6);
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 52,
        decoration: BoxDecoration(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: onText.withOpacity(0.12), width: 1),
        ),
        alignment: Alignment.center,
        child: Text(
          label,
          style: TextStyle(
            fontFamily: kFontFamily,
            color: fg,
            fontSize: 17,
            fontWeight: FontWeight.w800,
            letterSpacing: 0.2,
          ),
        ),
      ),
    );
  }
}
