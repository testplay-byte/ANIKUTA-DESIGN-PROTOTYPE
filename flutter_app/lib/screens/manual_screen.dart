// manual_screen.dart — Step 9/15: Restore Backup — manual linking.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';

/// Lists only the unlinked backup entries and lets the user open a full-screen
/// search overlay to manually pick a match from a list of mock results.
class ManualScreen extends StatelessWidget {
  const ManualScreen({super.key});

  // Mock search results (Demon Slayer variants, matching the web prototype).
  static const _mockResults = <_MockResult>[
    _MockResult(
      title: 'Demon Slayer: Hashira Training Arc',
      sub: 'Kimetsu no Yaiba \u00b7 2024',
    ),
    _MockResult(
      title: 'Kimetsu no Yaiba: Hashira Geiko-hen',
      sub: 'Japanese title \u00b7 2024',
    ),
    _MockResult(
      title: 'Demon Slayer Season 4',
      sub: 'Sequel \u00b7 8 eps',
    ),
    _MockResult(
      title: 'Demon Slayer: To the Swordsmith Village',
      sub: 'Movie \u00b7 2023',
    ),
    _MockResult(
      title: 'Kimetsu no Yaiba: Yuukaku-hen',
      sub: 'Entertainment District \u00b7 2021',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onText = isDark ? Colors.white : Colors.black87;
    final muted = onText.withOpacity(0.6);
    final surface2 = isDark ? palette.surface2 : cs.surface;

    final unlinked = controller.linkedAnime.where((a) => !a.linked).toList();
    final subtitle = unlinked.isEmpty
        ? 'All anime are linked! You\'re ready to continue.'
        : '${unlinked.length} anime need your help. Tap any entry to search for a match.';

    return WizardScaffold(
      pageHeading: 'Restore Backup',
      descriptiveTitle: 'Manual linking',
      subtitle: subtitle,
      scrollable: false,
      body: unlinked.isEmpty
          ? const SizedBox.shrink()
          : ListView.builder(
              padding: EdgeInsets.zero,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: unlinked.length,
              itemBuilder: (context, i) {
                final anime = unlinked[i];
                return _UnlinkedRow(
                  anime: anime,
                  surface2: surface2,
                  error: cs.error,
                  onText: onText,
                  muted: muted,
                  onTap: () =>
                      _openSearchSheet(context, controller, anime),
                );
              },
            ),
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Continue',
      onPrimary: () => WizardNav.next(context, currentIndex: 9),
      stepIndex: 9,
      stepTotal: kStepTotal,
    );
  }

  void _openSearchSheet(BuildContext context, WizardController controller,
      LinkedAnime anime) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => _SearchOverlay(
        anime: anime,
        results: _mockResults,
        onLink: (matchedName) {
          controller.linkAnime(anime.id, matchedName);
          Navigator.of(ctx).pop();
        },
      ),
    );
  }
}

class _MockResult {
  final String title;
  final String sub;
  const _MockResult({required this.title, required this.sub});
}

/// A single unlinked row.
/// Expanded(backupName 14px w600 white maxLines 2) + add_circle_outline (22px, error) + 'Search' (10px w700 muted).
class _UnlinkedRow extends StatelessWidget {
  final LinkedAnime anime;
  final Color surface2;
  final Color error;
  final Color onText;
  final Color muted;
  final VoidCallback onTap;

  const _UnlinkedRow({
    required this.anime,
    required this.surface2,
    required this.error,
    required this.onText,
    required this.muted,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: onTap,
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
              child: Text(
                anime.backupName,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  color: onText,
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  height: 1.3,
                ),
              ),
            ),
            const SizedBox(width: 8),
            Icon(Icons.add_circle_outline, color: error, size: 22),
            const SizedBox(width: 6),
            Text(
              'Search',
              style: TextStyle(
                color: muted,
                fontSize: 10,
                fontWeight: FontWeight.w700,
                letterSpacing: 0.4,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Full-screen (~85% height) search overlay with topbar, info line, search bar
/// and a list of mock results.
class _SearchOverlay extends StatefulWidget {
  final LinkedAnime anime;
  final List<_MockResult> results;
  final void Function(String matchedName) onLink;

  const _SearchOverlay({
    required this.anime,
    required this.results,
    required this.onLink,
  });

  @override
  State<_SearchOverlay> createState() => _SearchOverlayState();
}

class _SearchOverlayState extends State<_SearchOverlay> {
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
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onText = isDark ? Colors.white : Colors.black87;
    final muted = onText.withOpacity(0.6);
    final surface2 = isDark ? palette.surface2 : cs.surface;

    final q = _query.trim().toLowerCase();
    final filtered = q.isEmpty
        ? widget.results
        : widget.results
            .where((r) => r.title.toLowerCase().contains(q))
            .toList();

    final sheetHeight = MediaQuery.of(context).size.height * 0.85;

    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: SizedBox(
        height: sheetHeight,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Topbar: back arrow + 'Find a match' title.
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 8, 20, 4),
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back_rounded, size: 22),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                  const SizedBox(width: 4),
                  Text(
                    'Find a match',
                    style: TextStyle(
                      color: onText,
                      fontSize: 18,
                      fontWeight: FontWeight.w800,
                      letterSpacing: -0.2,
                    ),
                  ),
                ],
              ),
            ),

            // Info line: 'Linking: <anime name>'.
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 4, 20, 12),
              child: RichText(
                text: TextSpan(
                  style: TextStyle(
                    color: muted,
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                    height: 1.4,
                  ),
                  children: [
                    const TextSpan(text: 'Linking: '),
                    TextSpan(
                      text: widget.anime.backupName,
                      style: TextStyle(
                        color: onText,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Search bar.
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Container(
                decoration: BoxDecoration(
                  color: surface2,
                  borderRadius: BorderRadius.circular(12),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 12),
                child: Row(
                  children: [
                    Icon(Icons.search, color: muted, size: 20),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextField(
                        controller: _controller,
                        autofocus: true,
                        textInputAction: TextInputAction.search,
                        style: TextStyle(color: onText, fontSize: 15),
                        decoration: const InputDecoration(
                          hintText: 'Search for anime\u2026',
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

            const SizedBox(height: 12),

            // Results list.
            Expanded(
              child: filtered.isEmpty
                  ? Center(
                      child: Text(
                        'No results',
                        style: TextStyle(
                          color: muted,
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    )
                  : ListView.separated(
                      padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                      itemCount: filtered.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 10),
                      itemBuilder: (context, i) {
                        final r = filtered[i];
                        return _SearchResultRow(
                          result: r,
                          primary: cs.primary,
                          onText: onText,
                          muted: muted,
                          surface2: surface2,
                          onTap: () => widget.onLink(r.title),
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
  final _MockResult result;
  final Color primary;
  final Color onText;
  final Color muted;
  final Color surface2;
  final VoidCallback onTap;

  const _SearchResultRow({
    required this.result,
    required this.primary,
    required this.onText,
    required this.muted,
    required this.surface2,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final letter =
        result.title.isEmpty ? '?' : result.title.substring(0, 1).toUpperCase();
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: surface2,
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
                  colors: [primary, primary.withOpacity(0.4)],
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
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    result.title,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: onText,
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      height: 1.3,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    result.sub,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: muted,
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            Icon(Icons.add_circle, color: primary, size: 26),
          ],
        ),
      ),
    );
  }
}
