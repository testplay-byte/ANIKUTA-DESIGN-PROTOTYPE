// summary_screen.dart — Step 7/15: Backup Summary (what will be restored).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/app_theme.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

/// Lists the categories found in the parsed backup file, including one
/// unsupported (Manga) row styled distinctly as an error/skipped item.
/// "Cancel" pops back to the Format screen (step 5) rather than the prior
/// Processing screen; "Restore" continues forward.
///
/// Rows stagger in with a 80+index*80ms delay, 400ms slide-in.
class SummaryScreen extends StatefulWidget {
  const SummaryScreen({super.key});

  @override
  State<SummaryScreen> createState() => _SummaryScreenState();
}

class _SummaryScreenState extends State<SummaryScreen>
    with TickerProviderStateMixin {
  late final AnimationController _c;

  static const _items = <_SummaryItem>[
    _SummaryItem(
      icon: Icons.video_library_outlined,
      label: 'Anime detected',
      meta: 'Ready to restore',
      value: '247',
    ),
    _SummaryItem(
      icon: Icons.category_outlined,
      label: 'Categories',
      meta: 'Watching, Completed, Plan\u2026',
      value: '12',
    ),
    _SummaryItem(
      icon: Icons.play_circle_outline,
      label: 'Episodes tracked',
      meta: 'Progress + timestamps',
      value: '1,432',
    ),
    _SummaryItem(
      icon: Icons.history,
      label: 'Watch history',
      meta: 'Recently viewed',
      value: '89',
    ),
    _SummaryItem(
      icon: Icons.settings_outlined,
      label: 'Settings',
      meta: 'Theme, display, data',
      value: '\u2014',
    ),
    _SummaryItem(
      icon: Icons.book_outlined,
      label: 'Manga entries',
      meta: 'Not supported \u2014 will be skipped',
      value: '12',
      warn: true,
    ),
  ];

  @override
  void initState() {
    super.initState();
    // total duration = (n-1)*80 + 400 = 5*80 + 400 = 800ms
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    )..forward();
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

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
      visual: SummaryVisual(
        primary: cs.primary,
        surface: isDark ? palette.surface2 : cs.surface,
        size: 140,
      ),
      descriptiveTitle: 'Backup summary',
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (int i = 0; i < _items.length; i++)
            _AnimatedSummaryRow(
              animation: _c,
              intervalStart: (i * 80) / 800,
              intervalEnd: (i * 80 + 400) / 800,
              item: _items[i],
              surface2: surface2,
              primary: cs.primary,
              error: cs.error,
              onText: onText,
              muted: muted,
            ),
        ],
      ),
      backLabel: 'Cancel',
      onBack: () => WizardNav.cancelToFormat(context),
      primaryLabel: 'Restore',
      onPrimary: () => WizardNav.next(context, currentIndex: 7),
      stepIndex: 7,
      stepTotal: kStepTotal,
    );
  }
}

class _SummaryItem {
  final IconData icon;
  final String label;
  final String meta;
  final String value;
  final bool warn;

  const _SummaryItem({
    required this.icon,
    required this.label,
    required this.meta,
    required this.value,
    this.warn = false,
  });
}

class _AnimatedSummaryRow extends StatelessWidget {
  final Animation<double> animation;
  final double intervalStart;
  final double intervalEnd;
  final _SummaryItem item;
  final Color surface2;
  final Color primary;
  final Color error;
  final Color onText;
  final Color muted;

  const _AnimatedSummaryRow({
    required this.animation,
    required this.intervalStart,
    required this.intervalEnd,
    required this.item,
    required this.surface2,
    required this.primary,
    required this.error,
    required this.onText,
    required this.muted,
  });

  @override
  Widget build(BuildContext context) {
    final tween = Tween<Offset>(
      begin: const Offset(0, 0.08),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(
        parent: animation,
        curve: Interval(intervalStart, intervalEnd, curve: Curves.easeOutCubic),
      ),
    );
    final fade = CurvedAnimation(
      parent: animation,
      curve: Interval(intervalStart, intervalEnd, curve: Curves.easeOut),
    );

    return SlideTransition(
      position: tween,
      child: FadeTransition(
        opacity: fade,
        child: Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: _SummaryRow(
            item: item,
            surface2: surface2,
            primary: primary,
            error: error,
            onText: onText,
            muted: muted,
          ),
        ),
      ),
    );
  }
}

class _SummaryRow extends StatelessWidget {
  final _SummaryItem item;
  final Color surface2;
  final Color primary;
  final Color error;
  final Color onText;
  final Color muted;

  const _SummaryRow({
    required this.item,
    required this.surface2,
    required this.primary,
    required this.error,
    required this.onText,
    required this.muted,
  });

  @override
  Widget build(BuildContext context) {
    final accent = item.warn ? error : primary;
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: surface2,
        borderRadius: BorderRadius.circular(14),
        border: item.warn
            ? Border.all(color: error.withOpacity(0.35), width: 1)
            : null,
      ),
      child: Row(
        children: [
          // Icon square (38x38, rounded 10, primary.withOpacity(0.16) bg).
          Container(
            width: 38,
            height: 38,
            decoration: BoxDecoration(
              color: accent.withOpacity(0.16),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(item.icon, color: accent, size: 18),
          ),
          const SizedBox(width: 12),
          // Expanded Column(label 15px w700 onText, meta 12px muted).
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  item.label,
                  style: TextStyle(
                    fontFamily: kFontFamily,
                    color: onText,
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    height: 1.2,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  item.meta,
                  style: TextStyle(
                    fontFamily: kFontFamily,
                    color: muted,
                    fontSize: 12,
                    fontWeight: FontWeight.w400,
                    height: 1.3,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          // Value text (16px w800, accent color).
          Text(
            item.value,
            style: TextStyle(
              fontFamily: kFontFamily,
              color: accent,
              fontSize: 16,
              fontWeight: FontWeight.w800,
              letterSpacing: -0.2,
            ),
          ),
        ],
      ),
    );
  }
}
