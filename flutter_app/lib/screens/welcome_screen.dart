// welcome_screen.dart — Step 1/15: Welcome / intro + setup overview list.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/palettes.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  static const _items = <_SetupItem>[
    _SetupItem(icon: Icons.palette_outlined, label: 'Theme & colors'),
    _SetupItem(icon: Icons.folder_outlined, label: 'Anime folder'),
    _SetupItem(icon: Icons.shield_outlined, label: 'Permissions'),
    _SetupItem(icon: Icons.cloud_download_outlined, label: 'Restore backup (optional)'),
    _SetupItem(icon: Icons.tune_outlined, label: 'Ad preferences'),
  ];

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;

    return WizardScaffold(
      stepIndex: 0,
      stepTotal: kStepTotal,
      title: 'Welcome',
      subtitle: 'Set up your anime library in a few quick steps.',
      primaryLabel: 'Get Started',
      onPrimary: () => WizardNav.next(context, currentIndex: 0),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 8),
          Center(
            child: WelcomeVisual(
              primary: cs.primary,
              onPrimary: cs.onPrimary,
              size: 160,
            ),
          ),
          const SizedBox(height: 24),
          Text(
            'Here\u2019s what we\u2019ll set up:',
            style: TextStyle(
              color: onBg.withOpacity(0.6),
              fontSize: 13,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.5,
            ),
          ),
          const SizedBox(height: 12),
          // staggered fade-in list
          ..._items.asMap().entries.map((e) {
            final i = e.key;
            final item = e.value;
            return _StaggeredItem(
              index: i,
              child: _SetupItemRow(
                icon: item.icon,
                label: item.label,
                accent: cs.primary,
                onBg: onBg,
                surface: isDark ? palette.surface2 : cs.surface,
              ),
            );
          }),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}

class _SetupItem {
  final IconData icon;
  final String label;
  const _SetupItem({required this.icon, required this.label});
}

class _SetupItemRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color accent;
  final Color onBg;
  final Color surface;
  const _SetupItemRow({
    required this.icon,
    required this.label,
    required this.accent,
    required this.onBg,
    required this.surface,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
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
          Icon(Icons.chevron_right, color: onBg.withOpacity(0.35), size: 20),
        ],
      ),
    );
  }
}

/// Staggered fade + slide-in for list items.
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
    final begin = Duration(milliseconds: 120 + widget.index * 90);
    Future.delayed(begin, () {
      if (mounted) _c.forward();
    });
    _fade = CurvedAnimation(parent: _c, curve: Curves.easeOut);
    _slide = Tween<Offset>(
      begin: const Offset(0, 0.12),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _c, curve: Curves.easeOutCubic));
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
