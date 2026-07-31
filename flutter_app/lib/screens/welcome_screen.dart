// welcome_screen.dart — Step 0/15: Welcome to Anime App!
//
// Matches web prototype `welcome-screen.tsx`:
//   heading → subtitle → visual → 3 detail cards (staggered fade+slide up).
// The subtitle + visual + list all live in the body slot so the order
// matches the web (scaffold would put visual→descriptiveTitle→subtitle).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onText = isDark ? Colors.white : Colors.black87;
    final muted = onText.withOpacity(0.6);
    final surface2 = isDark ? palette.surface2 : cs.surface;

    const details = <_DetailItem>[
      _DetailItem(icon: Icons.check_circle_outline, title: 'Track what you watch'),
      _DetailItem(icon: Icons.refresh, title: 'Pick up anywhere'),
      _DetailItem(icon: Icons.notifications_outlined, title: 'Never miss a release'),
    ];

    return WizardScaffold(
      pageHeading: 'Welcome to Anime App!',
      xlHeading: true,
      stepIndex: 0,
      stepTotal: kStepTotal,
      body: SizedBox(
        width: double.infinity,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Align(
              alignment: Alignment.centerLeft,
              child: Text(
                "Let's get things quickly set up for you.",
                style: TextStyle(
                  fontSize: 16,
                  height: 1.45,
                  color: muted,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Center(
              child: WelcomeVisual(
                primary: cs.primary,
                onPrimary: cs.onPrimary,
                size: 180,
              ),
            ),
            const SizedBox(height: 20),
            for (int i = 0; i < details.length; i++)
              _StaggeredItem(
                index: i,
                child: _DetailCard(
                  icon: details[i].icon,
                  title: details[i].title,
                  primary: cs.primary,
                  surface: surface2,
                  onText: onText,
                ),
              ),
          ],
        ),
      ),
      primaryLabel: 'Get Started',
      onPrimary: () => WizardNav.next(context, currentIndex: 0),
    );
  }
}

class _DetailItem {
  final IconData icon;
  final String title;
  const _DetailItem({required this.icon, required this.title});
}

class _DetailCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final Color primary;
  final Color surface;
  final Color onText;

  const _DetailCard({
    required this.icon,
    required this.title,
    required this.primary,
    required this.surface,
    required this.onText,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: primary.withOpacity(0.16),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, size: 18, color: primary),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              title,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: onText,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Staggered fade + slide-up entry for the welcome detail cards.
/// Delay: 120 + index*90 ms · Duration: 420 ms · Curves: easeOut / easeOutCubic.
class _StaggeredItem extends StatefulWidget {
  final int index;
  final Widget child;
  const _StaggeredItem({required this.index, required this.child});

  @override
  State<_StaggeredItem> createState() => _StaggeredItemState();
}

class _StaggeredItemState extends State<_StaggeredItem>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c;
  late final Animation<double> _fade;
  late final Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 420),
    );
    _fade = CurvedAnimation(parent: _c, curve: Curves.easeOut);
    _slide = Tween<Offset>(
      begin: const Offset(0, 0.18),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _c, curve: Curves.easeOutCubic));
    Future.delayed(Duration(milliseconds: 120 + widget.index * 90), () {
      if (mounted) _c.forward();
    });
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _fade,
      child: SlideTransition(position: _slide, child: widget.child),
    );
  }
}
