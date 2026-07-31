// mini_anime_preview.dart — a phone-shaped frame that auto-cycles through
// mini representations of the anime app's screens (home, library, search,
// settings, detail, player). Used on the Choose Theme screen.
//
// v2: bigger (default 220), faster cycle (2.2s), slide+fade transition
// (more visibly animated than pure fade), polished phone frame.

import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

enum _MiniScreen { home, library, search, settings, detail, player }

const _cycleOrder = [
  _MiniScreen.home,
  _MiniScreen.library,
  _MiniScreen.search,
  _MiniScreen.settings,
  _MiniScreen.detail,
  _MiniScreen.player,
];

const _screenLabels = {
  _MiniScreen.home: 'Home',
  _MiniScreen.library: 'Library',
  _MiniScreen.search: 'Search',
  _MiniScreen.settings: 'Settings',
  _MiniScreen.detail: 'Detail',
  _MiniScreen.player: 'Player',
};

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
    this.height = 220,
  });

  @override
  State<MiniAnimePreview> createState() => _MiniAnimePreviewState();
}

class _MiniAnimePreviewState extends State<MiniAnimePreview>
    with TickerProviderStateMixin {
  late final AnimationController _transition;
  int _index = 0;

  @override
  void initState() {
    super.initState();
    _transition = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 450),
      value: 1,
    );
    _autoCycle();
  }

  Future<void> _autoCycle() async {
    while (mounted) {
      await Future.delayed(const Duration(milliseconds: 2200));
      if (!mounted) return;
      // Slide out
      await _transition.reverse();
      if (!mounted) return;
      setState(() => _index = (_index + 1) % _cycleOrder.length);
      // Slide in
      await _transition.forward();
    }
  }

  @override
  void dispose() {
    _transition.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Phone frame with sliding content
        _PhoneFrame(
          primary: widget.primary,
          surface: widget.surface,
          onSurface: widget.onSurface,
          surfaceVariant: widget.surfaceVariant,
          height: widget.height,
          child: SlideTransition(
            position: Tween<Offset>(
              begin: const Offset(0.15, 0),
              end: Offset.zero,
            ).animate(CurvedAnimation(
              parent: _transition,
              curve: Curves.easeOutCubic,
            )),
            child: FadeTransition(
              opacity: _transition,
              child: _buildScreen(_cycleOrder[_index]),
            ),
          ),
        ),
        SizedBox(height: widget.height * 0.04),
        // Screen label (shows which mini-screen is active)
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: Text(
            _screenLabels[_cycleOrder[_index]]!,
            key: ValueKey(_index),
            style: TextStyle(
              fontFamily: kFontFamily,
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: widget.primary,
              letterSpacing: 0.5,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildScreen(_MiniScreen s) {
    switch (s) {
      case _MiniScreen.home:
        return _HomeMini(
            primary: widget.primary,
            surface: widget.surface,
            onSurface: widget.onSurface);
      case _MiniScreen.library:
        return _LibraryMini(
            primary: widget.primary,
            surface: widget.surface,
            onSurface: widget.onSurface);
      case _MiniScreen.search:
        return _SearchMini(
            primary: widget.primary,
            surface: widget.surface,
            onSurface: widget.onSurface);
      case _MiniScreen.settings:
        return _SettingsMini(
            primary: widget.primary,
            surface: widget.surface,
            onSurface: widget.onSurface);
      case _MiniScreen.detail:
        return _DetailMini(
            primary: widget.primary,
            surface: widget.surface,
            onSurface: widget.onSurface,
            onPrimary: widget.onPrimary);
      case _MiniScreen.player:
        return _PlayerMini(
            primary: widget.primary,
            onPrimary: widget.onPrimary,
            surface: widget.surface,
            onSurface: widget.onSurface);
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
    final w = height * 0.54;
    return Container(
      width: w,
      height: height,
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(height * 0.11),
        border: Border.all(color: surfaceVariant, width: 2),
        boxShadow: [
          BoxShadow(
            color: primary.withOpacity(0.20),
            blurRadius: 30,
            spreadRadius: 2,
          ),
        ],
      ),
      padding: EdgeInsets.symmetric(
          horizontal: height * 0.035, vertical: height * 0.045),
      child: ClipRect(child: child),
    );
  }
}

// ---- Mini screens ----

Widget _labelBar(String label, Color onSurface) {
  return Container(
    height: 12,
    width: double.infinity,
    margin: const EdgeInsets.only(bottom: 6),
    decoration: BoxDecoration(
      color: onSurface.withOpacity(0.12),
      borderRadius: BorderRadius.circular(4),
    ),
    alignment: Alignment.centerLeft,
    padding: const EdgeInsets.symmetric(horizontal: 5),
    child: Text(label,
        style: TextStyle(
            color: onSurface.withOpacity(0.6),
            fontSize: 7,
            fontWeight: FontWeight.w700)),
  );
}

Widget _poster(Color c) {
  return Container(
    width: 34,
    height: 50,
    margin: const EdgeInsets.only(right: 6),
    decoration: BoxDecoration(
      color: c,
      borderRadius: BorderRadius.circular(5),
    ),
  );
}

Widget _posterFill(Color c) {
  return Container(
    decoration: BoxDecoration(
      color: c,
      borderRadius: BorderRadius.circular(5),
    ),
  );
}

class _HomeMini extends StatelessWidget {
  final Color primary, surface, onSurface;
  const _HomeMini({required this.primary, required this.surface, required this.onSurface});
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _labelBar('Trending now', onSurface),
        SizedBox(
          height: 58,
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
        const SizedBox(height: 6),
        _labelBar('Continue watching', onSurface),
        SizedBox(
          height: 48,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: [
              _poster(primary.withOpacity(0.5)),
              _poster(primary.withOpacity(0.3)),
            ],
          ),
        ),
      ],
    );
  }
}

class _LibraryMini extends StatelessWidget {
  final Color primary, surface, onSurface;
  const _LibraryMini({required this.primary, required this.surface, required this.onSurface});
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _labelBar('Your library', onSurface),
        Expanded(
          child: GridView.count(
            crossAxisCount: 3,
            mainAxisSpacing: 5,
            crossAxisSpacing: 5,
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
  final Color primary, surface, onSurface;
  const _SearchMini({required this.primary, required this.surface, required this.onSurface});
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: 20,
          decoration: BoxDecoration(
            color: primary.withOpacity(0.15),
            borderRadius: BorderRadius.circular(10),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 6),
          alignment: Alignment.centerLeft,
          child: Icon(Icons.search, size: 12, color: primary),
        ),
        const SizedBox(height: 8),
        _labelBar('Results', onSurface),
        ...List.generate(3, (i) => Container(
              margin: const EdgeInsets.only(bottom: 5),
              height: 28,
              decoration: BoxDecoration(
                color: onSurface.withOpacity(0.08),
                borderRadius: BorderRadius.circular(7),
              ),
              child: Row(children: [
                Container(
                    width: 20,
                    height: 28,
                    decoration: BoxDecoration(
                      color: primary.withOpacity(0.4 + i * 0.1),
                      borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(7), bottomLeft: Radius.circular(7)),
                    )),
                const SizedBox(width: 6),
                Container(
                    width: 50,
                    height: 5,
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
  final Color primary, surface, onSurface;
  const _SettingsMini({required this.primary, required this.surface, required this.onSurface});
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _labelBar('Settings', onSurface),
        ...List.generate(4, (i) => Container(
              margin: const EdgeInsets.only(bottom: 6),
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 5),
              decoration: BoxDecoration(
                color: onSurface.withOpacity(0.06),
                borderRadius: BorderRadius.circular(7),
              ),
              child: Row(
                children: [
                  Container(
                      width: 10, height: 10, decoration: BoxDecoration(color: primary.withOpacity(0.6), shape: BoxShape.circle)),
                  const SizedBox(width: 6),
                  Expanded(
                      child: Container(
                          height: 5,
                          decoration: BoxDecoration(color: onSurface.withOpacity(0.25), borderRadius: BorderRadius.circular(3)))),
                  const SizedBox(width: 5),
                  Container(
                    width: 18,
                    height: 10,
                    decoration: BoxDecoration(
                      color: i < 2 ? primary : onSurface.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(5),
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
  final Color primary, surface, onSurface, onPrimary;
  const _DetailMini({required this.primary, required this.surface, required this.onSurface, required this.onPrimary});
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: 64,
          width: double.infinity,
          decoration: BoxDecoration(
            gradient: LinearGradient(
                colors: [primary, primary.withOpacity(0.4)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight),
            borderRadius: BorderRadius.circular(8),
          ),
        ),
        const SizedBox(height: 6),
        Container(
            height: 10,
            width: 80,
            decoration: BoxDecoration(color: onSurface.withOpacity(0.5), borderRadius: BorderRadius.circular(4))),
        const SizedBox(height: 3),
        Container(
            height: 7,
            width: 50,
            decoration: BoxDecoration(color: primary, borderRadius: BorderRadius.circular(4))),
        const SizedBox(height: 6),
        ...List.generate(2, (i) => Container(
              margin: const EdgeInsets.only(bottom: 3),
              height: 5,
              width: double.infinity,
              decoration: BoxDecoration(color: onSurface.withOpacity(0.15), borderRadius: BorderRadius.circular(3)),
            )),
        Container(
            height: 5, width: 100, decoration: BoxDecoration(color: onSurface.withOpacity(0.15), borderRadius: BorderRadius.circular(3))),
        const Spacer(),
        Container(
          height: 18,
          width: double.infinity,
          decoration: BoxDecoration(color: primary, borderRadius: BorderRadius.circular(9)),
          alignment: Alignment.center,
          child: Icon(Icons.play_arrow, size: 12, color: onPrimary),
        ),
      ],
    );
  }
}

class _PlayerMini extends StatelessWidget {
  final Color primary, onPrimary, surface, onSurface;
  const _PlayerMini({required this.primary, required this.onPrimary, required this.surface, required this.onSurface});
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
                  borderRadius: BorderRadius.circular(7),
                ),
              ),
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: primary,
                  shape: BoxShape.circle,
                ),
                child: Icon(Icons.play_arrow, color: onPrimary, size: 18),
              ),
            ],
          ),
        ),
        const SizedBox(height: 6),
        Container(
          height: 3,
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
