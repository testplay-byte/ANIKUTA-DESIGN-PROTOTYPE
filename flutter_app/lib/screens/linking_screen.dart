// linking_screen.dart — Step 9/15: Backup Restore — linking anime overview.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/palettes.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

/// Shows match stats plus the full list of backup anime entries with their
/// auto-link status. Tapping a linked row opens a sheet to mark it unlinked.
class LinkingScreen extends StatelessWidget {
  const LinkingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;
    final surface = isDark ? palette.surface2 : cs.surface;

    final linked = controller.linkedCount;
    final unlinked = controller.unlinkedCount;
    final total = controller.totalAnime;
    final remaining = total - linked - unlinked;

    return WizardScaffold(
      stepIndex: 8,
      stepTotal: kStepTotal,
      title: 'Backup Restore',
      subtitle: 'Linking anime',
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Next',
      onPrimary: () => WizardNav.next(context, currentIndex: 8),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 4),
          Text(
            'Matching your backup entries',
            style: TextStyle(
              color: onBg.withOpacity(0.7),
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(child: _stat('${controller.linkedCount}', 'Linked', cs.primary, onBg)),
              const SizedBox(width: 10),
              Expanded(child: _stat('${controller.unlinkedCount}', 'No match', cs.error, onBg)),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(child: _stat('$total', 'Total', cs.primary, onBg)),
              const SizedBox(width: 10),
              Expanded(child: _stat('$remaining', 'Remaining', cs.primary, onBg)),
            ],
          ),
          const SizedBox(height: 16),
          const SectionLabel('Entries'),
          ...controller.linkedAnime.map((anime) => _AnimeRow(
                anime: anime,
                surface: surface,
                accent: cs.primary,
                error: cs.error,
                onBg: onBg,
                onTapLinked: () => _openUnlinkSheet(context, controller, anime),
              )),
          const SizedBox(height: 8),
        ],
      ),
    );
  }

  Widget _stat(String number, String label, Color accent, Color onBg) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: accent.withOpacity(0.08),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            number,
            style: TextStyle(
              color: accent,
              fontSize: 28,
              fontWeight: FontWeight.w800,
              height: 1.0,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              color: onBg.withOpacity(0.6),
              fontSize: 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  void _openUnlinkSheet(
      BuildContext context, WizardController controller, LinkedAnime anime) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    anime.backupName,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ),
              ListTile(
                leading: const Icon(Icons.link_off),
                title: const Text('Mark as not linked'),
                onTap: () {
                  controller.unlinkAnime(anime.id);
                  Navigator.pop(ctx);
                },
              ),
              ListTile(
                leading: const Icon(Icons.close),
                title: const Text('Cancel'),
                onTap: () => Navigator.pop(ctx),
              ),
              const SizedBox(height: 8),
            ],
          ),
        );
      },
    );
  }
}

class _AnimeRow extends StatelessWidget {
  final LinkedAnime anime;
  final Color surface;
  final Color accent;
  final Color error;
  final Color onBg;
  final VoidCallback onTapLinked;

  const _AnimeRow({
    required this.anime,
    required this.surface,
    required this.accent,
    required this.error,
    required this.onBg,
    required this.onTapLinked,
  });

  @override
  Widget build(BuildContext context) {
    final letter = anime.backupName.isEmpty
        ? '?'
        : anime.backupName.substring(0, 1).toUpperCase();

    final row = Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: surface,
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
                    color: onBg,
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                if (anime.linked && anime.matchedName != null) ...[
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Icon(Icons.check, size: 14, color: accent),
                      const SizedBox(width: 4),
                      Flexible(
                        child: Text(
                          anime.matchedName!,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: onBg.withOpacity(0.5),
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
            color: anime.linked ? accent : error,
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
                          colors: [accent, accent.withOpacity(0.4)],
                        ),
                      ),
                      alignment: Alignment.center,
                      child: Text(
                        letter,
                        style: const TextStyle(
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
