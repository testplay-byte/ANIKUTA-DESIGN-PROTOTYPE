// manual_screen.dart — Step 10/15: Restore Backup — manual linking.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/palettes.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

/// Lists only the unlinked backup entries and lets the user open a search
/// sheet to manually pick a match. The sheet cycles through mock results.
class ManualScreen extends StatelessWidget {
  const ManualScreen({super.key});

  // Mock search results used to "match" an unlinked anime.
  static const _mockResults = <String>[
    'Sousou no Frieren',
    "Frieren: Beyond Journey's End",
    'Frieren (2024)',
    'Frieren: Beyond Journey\u2019s End (TV)',
  ];

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;
    final surface = isDark ? palette.surface2 : cs.surface;

    final unlinked = controller.linkedAnime.where((a) => !a.linked).toList();

    return WizardScaffold(
      stepIndex: 9,
      stepTotal: kStepTotal,
      title: 'Restore Backup',
      subtitle: 'Manual linking',
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Continue',
      onPrimary: () => WizardNav.next(context, currentIndex: 9),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 4),
          Text(
            'Tap an unlinked anime to search and link it.',
            style: TextStyle(
              color: onBg.withOpacity(0.7),
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 12),
          const SectionLabel('Unlinked'),
          if (unlinked.isEmpty)
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: surface,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Text(
                'All entries are linked.',
                style: TextStyle(
                  color: onBg.withOpacity(0.6),
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            )
          else
            ...unlinked.map((anime) => _UnlinkedRow(
                  anime: anime,
                  surface: surface,
                  accent: cs.primary,
                  onBg: onBg,
                  onTap: () => _openSearchSheet(context, controller, anime),
                )),
          const SizedBox(height: 8),
        ],
      ),
    );
  }

  void _openSearchSheet(
      BuildContext context, WizardController controller, LinkedAnime anime) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => _SearchSheet(
        anime: anime,
        results: _mockResults,
        onLink: (id, matchedName) {
          controller.linkAnime(id, matchedName);
          Navigator.of(ctx).pop();
        },
      ),
    );
  }
}

class _UnlinkedRow extends StatelessWidget {
  final LinkedAnime anime;
  final Color surface;
  final Color accent;
  final Color onBg;
  final VoidCallback onTap;

  const _UnlinkedRow({
    required this.anime,
    required this.surface,
    required this.accent,
    required this.onBg,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: [
          Expanded(
            child: Text(
              anime.backupName,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: onBg,
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const SizedBox(width: 8),
          OutlinedButton.icon(
            onPressed: onTap,
            icon: const Icon(Icons.link, size: 18),
            label: const Text('Link'),
            style: OutlinedButton.styleFrom(
              foregroundColor: accent,
              side: BorderSide(color: accent.withOpacity(0.5)),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              minimumSize: const Size(0, 36),
              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              visualDensity: VisualDensity.compact,
            ),
          ),
        ],
      ),
    );
  }
}

/// A ~70% height search sheet with a query field and a list of mock results.
/// Each result has a gradient poster thumbnail + a Link button.
class _SearchSheet extends StatefulWidget {
  final LinkedAnime anime;
  final List<String> results;
  final void Function(int id, String matchedName) onLink;

  const _SearchSheet({
    required this.anime,
    required this.results,
    required this.onLink,
  });

  @override
  State<_SearchSheet> createState() => _SearchSheetState();
}

class _SearchSheetState extends State<_SearchSheet> {
  String _query = '';
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;
    final surface = isDark ? cs.surfaceContainerHighest : cs.surface;

    final q = _query.trim().toLowerCase();
    final filtered = q.isEmpty
        ? widget.results
        : widget.results.where((r) => r.toLowerCase().contains(q)).toList();

    final sheetHeight = MediaQuery.of(context).size.height * 0.7;

    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: SizedBox(
        height: sheetHeight,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 4),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      'Link \u201C${widget.anime.backupName}\u201D',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: onBg,
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Container(
                decoration: BoxDecoration(
                  color: surface,
                  borderRadius: BorderRadius.circular(12),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 12),
                child: Row(
                  children: [
                    Icon(Icons.search, color: onBg.withOpacity(0.5), size: 20),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextField(
                        controller: _controller,
                        autofocus: true,
                        textInputAction: TextInputAction.search,
                        style: TextStyle(color: onBg, fontSize: 15),
                        decoration: const InputDecoration(
                          hintText: 'Search anime\u2026',
                          border: InputBorder.none,
                          isDense: true,
                          contentPadding: EdgeInsets.symmetric(vertical: 12),
                        ),
                        onChanged: (v) => setState(() => _query = v),
                      ),
                    ),
                    if (_query.isNotEmpty)
                      IconButton(
                        icon: const Icon(Icons.clear, size: 18),
                        visualDensity: VisualDensity.compact,
                        onPressed: () {
                          _controller.clear();
                          setState(() => _query = '');
                        },
                      ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: filtered.isEmpty
                  ? Center(
                      child: Text(
                        'No results',
                        style: TextStyle(
                          color: onBg.withOpacity(0.6),
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    )
                  : ListView.separated(
                      padding: const EdgeInsets.fromLTRB(20, 4, 20, 16),
                      itemCount: filtered.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 10),
                      itemBuilder: (context, i) {
                        final title = filtered[i];
                        return _SearchResultRow(
                          title: title,
                          accent: cs.primary,
                          onBg: onBg,
                          surface: surface,
                          onLink: () => widget.onLink(widget.anime.id, title),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SearchResultRow extends StatelessWidget {
  final String title;
  final Color accent;
  final Color onBg;
  final Color surface;
  final VoidCallback onLink;

  const _SearchResultRow({
    required this.title,
    required this.accent,
    required this.onBg,
    required this.surface,
    required this.onLink,
  });

  @override
  Widget build(BuildContext context) {
    final letter = title.isEmpty ? '?' : title.substring(0, 1).toUpperCase();
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: [
          Container(
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
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              title,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: onBg,
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const SizedBox(width: 8),
          FilledButton(
            onPressed: onLink,
            style: FilledButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
              minimumSize: const Size(0, 36),
              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              visualDensity: VisualDensity.compact,
            ),
            child: const Text('Link'),
          ),
        ],
      ),
    );
  }
}
