// linking_screen.dart — Step 8/15: Backup Restore — linking anime overview.

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../models/wizard_models.dart';
import '../theme/app_theme.dart';
import '../widgets/wizard_scaffold.dart';

/// Shows match stats plus the full list of backup anime entries with their
/// auto-link status. Rows appear progressively (one every 400ms). Tapping a
/// linked row opens a sheet to mark it unlinked.
class LinkingScreen extends StatefulWidget {
  const LinkingScreen({super.key});

  @override
  State<LinkingScreen> createState() => _LinkingScreenState();
}

class _LinkingScreenState extends State<LinkingScreen> {
  int _revealedCount = 0;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(milliseconds: 400), (t) {
      if (!mounted) {
        t.cancel();
        return;
      }
      final total = context.read<WizardController>().totalAnime;
      if (_revealedCount >= total) {
        t.cancel();
        return;
      }
      setState(() => _revealedCount++);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
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

    final total = controller.totalAnime;
    final linked = controller.linkedCount;
    final unlinked = controller.unlinkedCount;
    final remaining = (total - _revealedCount).clamp(0, total);
    final allRevealed = _revealedCount >= total;

    final anime = controller.linkedAnime;

    return WizardScaffold(
      pageHeading: 'Backup Restore',
      descriptiveTitle: 'Linking anime',
      subtitle: 'Matching your backup entries',
      scrollable: false,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // 1. 4 stats in a 2x2 grid.
          Row(
            children: [
              Expanded(
                child: _Stat(
                  number: '$linked',
                  label: 'Linked',
                  primary: cs.primary,
                  muted: muted,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _Stat(
                  number: '$unlinked',
                  label: 'No match',
                  primary: cs.primary,
                  muted: muted,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _Stat(
                  number: '$total',
                  label: 'Total',
                  primary: cs.primary,
                  muted: muted,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _Stat(
                  number: '$remaining',
                  label: 'Remaining',
                  primary: cs.primary,
                  muted: muted,
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          // 2-3. Progressive reveal list (scrolls internally).
          Expanded(
            child: ListView.builder(
              padding: EdgeInsets.zero,
              itemCount: anime.length,
              itemBuilder: (context, i) {
                final item = anime[i];
                final visible = i < _revealedCount;
                return AnimatedOpacity(
                  opacity: visible ? 1.0 : 0.0,
                  duration: const Duration(milliseconds: 280),
                  curve: Curves.easeOut,
                  child: AnimatedSlide(
                    offset: visible ? Offset.zero : const Offset(0, 0.06),
                    duration: const Duration(milliseconds: 280),
                    curve: Curves.easeOut,
                    child: _AnimeRow(
                      anime: item,
                      surface2: surface2,
                      primary: cs.primary,
                      error: cs.error,
                      onText: onText,
                      muted: muted,
                      onTapLinked: () =>
                          _openUnlinkSheet(context, controller, item),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Next',
      onPrimary: () => WizardNav.next(context, currentIndex: 8),
      primaryEnabled: allRevealed,
      stepIndex: 8,
      stepTotal: kStepTotal,
    );
  }

  void _openUnlinkSheet(BuildContext context, WizardController controller,
      LinkedAnime anime) {
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onText = isDark ? Colors.white : Colors.black87;
    final surface2 = isDark ? controller.palette.surface2 : cs.surface;
    final surface3 =
        isDark ? controller.palette.surface3 : cs.surfaceContainerHighest;
    final surface4 =
        isDark ? controller.palette.surface4 : cs.surfaceContainerHigh;
    showFrostedDialog(
      context: context,
      builder: (ctx) => _UnlinkDialog(
        animeName: anime.backupName,
        primary: cs.primary,
        error: cs.error,
        onText: onText,
        surface2: surface2,
        surface3: surface3,
        surface4: surface4,
        onKeepLinked: () => Navigator.of(ctx).pop(),
        onMarkUnlinked: () {
          controller.unlinkAnime(anime.id);
          Navigator.of(ctx).pop();
        },
      ),
    );
  }
}

/// Centered frosted-glass popup that asks the user whether to keep an auto-link
/// or unlink the entry. Shown via [showFrostedDialog] when a linked row is tapped.
class _UnlinkDialog extends StatelessWidget {
  final String animeName;
  final Color primary;
  final Color error;
  final Color onText;
  final Color surface2;
  final Color surface3;
  final Color surface4;
  final VoidCallback onKeepLinked;
  final VoidCallback onMarkUnlinked;

  const _UnlinkDialog({
    required this.animeName,
    required this.primary,
    required this.error,
    required this.onText,
    required this.surface2,
    required this.surface3,
    required this.surface4,
    required this.onKeepLinked,
    required this.onMarkUnlinked,
  });

  @override
  Widget build(BuildContext context) {
    final muted = onText.withOpacity(0.6);
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: surface2,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Linked entry',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: kFontFamily,
              color: onText,
              fontSize: 18,
              fontWeight: FontWeight.w800,
              letterSpacing: -0.2,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'This entry was auto-linked. If the match is wrong, mark it as not linked \u2014 you\'ll be able to link it manually.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: kFontFamily,
              color: muted,
              fontSize: 13,
              height: 1.45,
              fontWeight: FontWeight.w400,
            ),
          ),
          const SizedBox(height: 14),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: surface3,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              animeName,
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontFamily: kFontFamily,
                color: onText,
                fontSize: 14,
                fontWeight: FontWeight.w600,
                height: 1.3,
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: PillButton.secondary(
                  label: 'Keep linked',
                  onTap: onKeepLinked,
                  primary: primary,
                  onText: onText,
                  surface3: surface3,
                  surface4: surface4,
                  showBackArrow: false,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: PillButton.primary(
                  label: 'Mark as not linked',
                  onTap: onMarkUnlinked,
                  primary: error,
                  onPrimary: Colors.white,
                  showForwardArrow: false,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

/// A single stat box (primary.withOpacity(0.08) bg, rounded 14).
class _Stat extends StatelessWidget {
  final String number;
  final String label;
  final Color primary;
  final Color muted;

  const _Stat({
    required this.number,
    required this.label,
    required this.primary,
    required this.muted,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: primary.withOpacity(0.08),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            number,
            style: TextStyle(
              fontFamily: kFontFamily,
              color: primary,
              fontSize: 28,
              fontWeight: FontWeight.w800,
              height: 1.0,
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              fontFamily: kFontFamily,
              color: muted,
              fontSize: 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

/// A single backup anime row.
/// - Expanded flex 2: backupName 14px w600 white maxLines 2, optional matchedName row.
/// - Marker icon (22px): check_circle (primary) for linked, remove_circle_outline (error) for not.
/// - Expanded flex 1: 44x60 gradient poster (linked) or empty SizedBox (unlinked).
class _AnimeRow extends StatelessWidget {
  final LinkedAnime anime;
  final Color surface2;
  final Color primary;
  final Color error;
  final Color onText;
  final Color muted;
  final VoidCallback onTapLinked;

  const _AnimeRow({
    required this.anime,
    required this.surface2,
    required this.primary,
    required this.error,
    required this.onText,
    required this.muted,
    required this.onTapLinked,
  });

  @override
  Widget build(BuildContext context) {
    final letter = anime.backupName.isEmpty
        ? '?'
        : anime.backupName.substring(0, 1).toUpperCase();

    final row = RepaintBoundary(
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: surface2,
          borderRadius: BorderRadius.circular(14),
        ),
        child: Row(
          children: [
            Expanded(
              flex: 2,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    anime.backupName,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontFamily: kFontFamily,
                      color: onText,
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      height: 1.3,
                    ),
                  ),
                  if (anime.linked && anime.matchedName != null) ...[
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Icon(Icons.check, size: 14, color: primary),
                        const SizedBox(width: 4),
                        Flexible(
                          child: Text(
                            anime.matchedName!,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              fontFamily: kFontFamily,
                              color: muted,
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(width: 8),
            Icon(
              anime.linked ? Icons.check_circle : Icons.remove_circle_outline,
              color: anime.linked ? primary : error,
              size: 22,
            ),
            const SizedBox(width: 12),
            Expanded(
              flex: 1,
              child: anime.linked
                  ? Center(
                      child: Container(
                        width: 44,
                        height: 60,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(6),
                          gradient: LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [primary, primary.withOpacity(0.4)],
                          ),
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          letter,
                          style: const TextStyle(
                            fontFamily: kFontFamily,
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    )
                  : const SizedBox(height: 60),
            ),
          ],
        ),
      ),
    );

    if (anime.linked) {
      return GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onTapLinked,
        child: row,
      );
    }
    return row;
  }
}
