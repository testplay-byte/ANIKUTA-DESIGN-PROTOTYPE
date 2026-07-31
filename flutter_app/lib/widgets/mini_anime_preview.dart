// mini_anime_preview.dart — a small phone-shaped frame that auto-cycles
// through mini representations of: home, library, search, settings, anime
// detail, and player. Used on the Choose Theme screen.

import 'package:flutter/material.dart';

enum _MiniScreen { home, library, search, settings, detail, player }

const _cycleOrder = [
  _MiniScreen.home,
  _MiniScreen.library,
  _MiniScreen.search,
  _MiniScreen.settings,
  _MiniScreen.detail,
  _MiniScreen.player,
];

class MiniAnimePreview extends StatefulWidget {
  final Color primary;
  final Color onPrimary;
  final Color surface;
  final Color onSurface;
  final Color surfaceVariant;
  final double height;
  const MiniAnimePreview({
    super.key,
    required this.primary,
    required this.onPrimary,
    required this.surface,
    required this.onSurface,
    required this.surfaceVariant,
    this.height = 280,
  });

  @override
  State<MiniAnimePreview> createState() => _MiniAnimePreviewState();
}

class _MiniAnimePreviewState extends State<MiniAnimePreview>
    with TickerProviderStateMixin {
  late final AnimationController _fade;
  late final PageController _page;
  int _index = 0;

  @override
  void initState() {
    super.initState();
    _fade = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
      value: 1,
    );
    _page = PageController();
    _autoCycle();
  }

  Future<void> _autoCycle() async {
    while (mounted) {
      await Future.delayed(const Duration(milliseconds: 2900));
      if (!mounted) return;
      await _fade.reverse();
      if (!mounted) return;
      setState(() => _index = (_index + 1) % _cycleOrder.length);
      await _fade.forward();
    }
  }

  @override
  void dispose() {
    _fade.dispose();
    _page.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: FadeTransition(
        opacity: _fade,
        child: _PhoneFrame(
          primary: widget.primary,
          surface: widget.surface,
          onSurface: widget.onSurface,
          surfaceVariant: widget.surfaceVariant,
          height: widget.height,
          child: _buildScreen(_cycleOrder[_index]),
        ),
      ),
    );
  }

  Widget _buildScreen(_MiniScreen s) {
    switch (s) {
      case _MiniScreen.home:
        return _HomeMini(
            primary: widget.primary,
            surface: widget.surface,
            onSurface: widget.onSurface,
            surfaceVariant: widget.surfaceVariant);
      case _MiniScreen.library:
        return _LibraryMini(
            primary: widget.primary,
            surface: widget.surface,
            onSurface: widget.onSurface,
            surfaceVariant: widget.surfaceVariant);
      case _MiniScreen.search:
        return _SearchMini(
            primary: widget.primary,
            surface: widget.surface,
            onSurface: widget.onSurface,
            surfaceVariant: widget.surfaceVariant);
      case _MiniScreen.settings:
        return _SettingsMini(
            primary: widget.primary,
            surface: widget.surface,
            onSurface: widget.onSurface,
            surfaceVariant: widget.surfaceVariant);
      case _MiniScreen.detail:
        return _DetailMini(
            primary: widget.primary,
            surface: widget.surface,
            onSurface: widget.onSurface,
            surfaceVariant: widget.surfaceVariant);
      case _MiniScreen.player:
        return _PlayerMini(
            primary: widget.primary,
            onPrimary: widget.onPrimary,
            surface: widget.surface,
            onSurface: widget.onSurface,
            surfaceVariant: widget.surfaceVariant);
    }
  }
}

// ---- Phone frame ----

class _PhoneFrame extends StatelessWidget {
  final Color primary;
  final Color surface;
  final Color onSurface;
  final Color surfaceVariant;
  final double height;
  final Widget child;
  const _PhoneFrame({
    required this.primary,
    required this.surface,
    required this.onSurface,
    required this.surfaceVariant,
    required this.height,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: height * 0.52,
      height: height,
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(height * 0.12),
        border: Border.all(color: surfaceVariant, width: 2),
        boxShadow: [
          BoxShadow(
            color: primary.withOpacity(0.18),
            blurRadius: 30,
            spreadRadius: 2,
          ),
        ],
      ),
      padding: EdgeInsets.symmetric(
          horizontal: height * 0.035, vertical: height * 0.05),
      child: ClipRect(child: child),
    );
  }
}

// ---- Mini screens ----

Widget _bar(String label, Color onSurface, {double h = 14}) {
  return Container(
    height: h,
    width: double.infinity,
    margin: const EdgeInsets.only(bottom: 8),
    decoration: BoxDecoration(
      color: onSurface.withOpacity(0.12),
      borderRadius: BorderRadius.circular(4),
    ),
    alignment: Alignment.centerLeft,
    padding: const EdgeInsets.symmetric(horizontal: 6),
    child: Text(label,
        style: TextStyle(
            color: onSurface.withOpacity(0.6),
            fontSize: 8,
            fontWeight: FontWeight.w700)),
  );
}

Widget _poster(Color c, {double w = 38, double h = 54}) {
  return Container(
    width: w,
    height: h,
    margin: const EdgeInsets.only(right: 8),
    decoration: BoxDecoration(
      color: c,
      borderRadius: BorderRadius.circular(6),
    ),
  );
}

/// A poster that fills its parent (for grid cells).
Widget _posterFill(Color c) {
  return Container(
    decoration: BoxDecoration(
      color: c,
      borderRadius: BorderRadius.circular(6),
    ),
  );
}

class _HomeMini extends StatelessWidget {
  final Color primary, surface, onSurface, surfaceVariant;
  const _HomeMini({
    required this.primary,
    required this.surface,
    required this.onSurface,
    required this.surfaceVariant,
  });
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _bar('Trending now', onSurface),
        SizedBox(
          height: 70,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: [
              _poster(primary),
              _poster(primary.withOpacity(0.6)),
              _poster(primary.withOpacity(0.4)),
              _poster(primary.withOpacity(0.7)),
            ],
          ),
        ),
        const SizedBox(height: 8),
        _bar('Continue watching', onSurface),
        SizedBox(
          height: 60,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: [
              _poster(primary.withOpacity(0.5), w: 96, h: 60),
              _poster(primary.withOpacity(0.3), w: 96, h: 60),
            ],
          ),
        ),
      ],
    );
  }
}

class _LibraryMini extends StatelessWidget {
  final Color primary, surface, onSurface, surfaceVariant;
  const _LibraryMini({
    required this.primary,
    required this.surface,
    required this.onSurface,
    required this.surfaceVariant,
  });
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _bar('Your library', onSurface),
        Expanded(
          child: GridView.count(
            crossAxisCount: 3,
            mainAxisSpacing: 6,
            crossAxisSpacing: 6,
            childAspectRatio: 0.66,
            children: [
              _posterFill(primary),
              _posterFill(primary.withOpacity(0.6)),
              _posterFill(primary.withOpacity(0.4)),
              _posterFill(primary.withOpacity(0.7)),
              _posterFill(primary.withOpacity(0.5)),
              _posterFill(primary.withOpacity(0.3)),
            ],
          ),
        ),
      ],
    );
  }
}

class _SearchMini extends StatelessWidget {
  final Color primary, surface, onSurface, surfaceVariant;
  const _SearchMini({
    required this.primary,
    required this.surface,
    required this.onSurface,
    required this.surfaceVariant,
  });
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: 24,
          decoration: BoxDecoration(
            color: primary.withOpacity(0.15),
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 8),
          alignment: Alignment.centerLeft,
          child: Icon(Icons.search, size: 14, color: primary),
        ),
        const SizedBox(height: 10),
        _bar('Results', onSurface),
        ...List.generate(3, (i) => Container(
              margin: const EdgeInsets.only(bottom: 6),
              height: 34,
              decoration: BoxDecoration(
                color: onSurface.withOpacity(0.08),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(children: [
                Container(
                    width: 24,
                    height: 34,
                    margin: const EdgeInsets.only(right: 8),
                    decoration: BoxDecoration(
                      color: primary.withOpacity(0.4 + i * 0.1),
                      borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(8), bottomLeft: Radius.circular(8)),
                    )),
                Container(
                    width: 60,
                    height: 6,
                    decoration: BoxDecoration(
                        color: onSurface.withOpacity(0.3),
                        borderRadius: BorderRadius.circular(3))),
              ]),
            )),
      ],
    );
  }
}

class _SettingsMini extends StatelessWidget {
  final Color primary, surface, onSurface, surfaceVariant;
  const _SettingsMini({
    required this.primary,
    required this.surface,
    required this.onSurface,
    required this.surfaceVariant,
  });
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _bar('Settings', onSurface),
        ...List.generate(4, (i) => Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
              decoration: BoxDecoration(
                color: onSurface.withOpacity(0.06),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Container(
                      width: 12, height: 12, decoration: BoxDecoration(color: primary.withOpacity(0.6), shape: BoxShape.circle)),
                  const SizedBox(width: 8),
                  Expanded(
                      child: Container(
                          height: 6,
                          decoration: BoxDecoration(color: onSurface.withOpacity(0.25), borderRadius: BorderRadius.circular(3)))),
                  const SizedBox(width: 6),
                  Container(
                    width: 22,
                    height: 12,
                    decoration: BoxDecoration(
                      color: i < 2 ? primary : onSurface.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(6),
                    ),
                  ),
                ],
              ),
            )),
      ],
    );
  }
}

class _DetailMini extends StatelessWidget {
  final Color primary, surface, onSurface, surfaceVariant;
  const _DetailMini({
    required this.primary,
    required this.surface,
    required this.onSurface,
    required this.surfaceVariant,
  });
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: 80,
          width: double.infinity,
          decoration: BoxDecoration(
            gradient: LinearGradient(
                colors: [primary, primary.withOpacity(0.4)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight),
            borderRadius: BorderRadius.circular(10),
          ),
        ),
        const SizedBox(height: 8),
        Container(
            height: 12,
            width: 100,
            decoration: BoxDecoration(color: onSurface.withOpacity(0.5), borderRadius: BorderRadius.circular(4))),
        const SizedBox(height: 4),
        Container(
            height: 8,
            width: 60,
            decoration: BoxDecoration(color: primary, borderRadius: BorderRadius.circular(4))),
        const SizedBox(height: 8),
        ...List.generate(2, (i) => Container(
              margin: const EdgeInsets.only(bottom: 4, top: i == 0 ? 0 : 0),
              height: 6,
              width: double.infinity,
              decoration: BoxDecoration(color: onSurface.withOpacity(0.15), borderRadius: BorderRadius.circular(3)),
            )),
        Container(
            height: 6, width: 120, decoration: BoxDecoration(color: onSurface.withOpacity(0.15), borderRadius: BorderRadius.circular(3))),
        const Spacer(),
        Container(
          height: 22,
          width: double.infinity,
          decoration: BoxDecoration(color: primary, borderRadius: BorderRadius.circular(11)),
          alignment: Alignment.center,
          child: const Icon(Icons.play_arrow, size: 14, color: Colors.white),
        ),
      ],
    );
  }
}

class _PlayerMini extends StatelessWidget {
  final Color primary, onPrimary, surface, onSurface, surfaceVariant;
  const _PlayerMini({
    required this.primary,
    required this.onPrimary,
    required this.surface,
    required this.onSurface,
    required this.surfaceVariant,
  });
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: Stack(
            alignment: Alignment.center,
            children: [
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                      colors: [primary.withOpacity(0.6), primary.withOpacity(0.2)],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter),
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: primary,
                  shape: BoxShape.circle,
                ),
                child: Icon(Icons.play_arrow, color: onPrimary, size: 24),
              ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        Container(
          height: 4,
          width: double.infinity,
          decoration: BoxDecoration(color: onSurface.withOpacity(0.2), borderRadius: BorderRadius.circular(2)),
          child: FractionallySizedBox(
            alignment: Alignment.centerLeft,
            widthFactor: 0.4,
            child: Container(decoration: BoxDecoration(color: primary, borderRadius: BorderRadius.circular(2))),
          ),
        ),
      ],
    );
  }
}
