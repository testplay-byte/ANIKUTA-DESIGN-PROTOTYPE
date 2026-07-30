import 'package:flutter/material.dart';
import '../theme/anikuta_theme.dart';

class GradientCover extends StatelessWidget {
  final List<Color> colors;
  final String letter;
  final double? width;
  final double? height;
  final double borderRadius;

  const GradientCover({
    super.key,
    required this.colors,
    required this.letter,
    this.width,
    this.height,
    this.borderRadius = 8,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: colors,
        ),
        borderRadius: BorderRadius.circular(borderRadius),
      ),
      child: Center(
        child: Text(
          letter,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 32,
            fontWeight: FontWeight.w900,
          ),
        ),
      ),
    );
  }
}

class SectionHeader extends StatelessWidget {
  final String text;
  final bool accent;

  const SectionHeader({
    super.key,
    required this.text,
    this.accent = true,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20, bottom: 10, left: 16, right: 16),
      child: Align(
        alignment: Alignment.centerLeft,
        child: Text(
          text.toUpperCase(),
          style: TextStyle(
            color: accent ? AnikutaColors.primary : AnikutaColors.onSurfaceVariant,
            fontSize: 13,
            fontWeight: FontWeight.w800,
            letterSpacing: 0.8,
          ),
        ),
      ),
    );
  }
}

class AnimeCard extends StatelessWidget {
  final Anime anime;
  final VoidCallback onTap;

  const AnimeCard({super.key, required this.anime, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: anime.coverColors,
                      ),
                    ),
                    child: Center(
                      child: Text(
                        anime.letter,
                        style: const TextStyle(color: Colors.white54, fontSize: 36, fontWeight: FontWeight.w900),
                      ),
                    ),
                  ),
                  if (anime.averageScore > 0)
                    Positioned(
                      top: 4,
                      right: 4,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.6),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.star, size: 10, color: AnikutaColors.warn),
                            const SizedBox(width: 2),
                            Text(
                              '${(anime.averageScore / 10).toStringAsFixed(1)}',
                              style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            anime.title,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              color: AnikutaColors.onBackground,
              fontSize: 12,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

// Import the model
import '../models/anime_models.dart';

class CollapsingHeader extends StatelessWidget {
  final String title;
  final bool collapsed;
  final List<Widget> actions;

  const CollapsingHeader({
    super.key,
    required this.title,
    this.collapsed = false,
    this.actions = const [],
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 8, left: 16, right: 8, bottom: 8),
      child: Row(
        children: [
          Expanded(
            child: AnimatedDefaultDurationSwitcher(
              collapsed: collapsed,
              title: title,
            ),
          ),
          ...actions,
        ],
      ),
    );
  }
}

class AnimatedDefaultDurationSwitcher extends StatelessWidget {
  final bool collapsed;
  final String title;

  const AnimatedDefaultDurationSwitcher({
    super.key,
    required this.collapsed,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 200),
      child: Text(
        title,
        key: ValueKey(collapsed),
        style: TextStyle(
          fontSize: collapsed ? 26 : 36,
          fontWeight: FontWeight.w800,
          color: AnikutaColors.onBackground,
          letterSpacing: -0.5,
        ),
      ),
    );
  }
}

class SegmentedToggle extends StatelessWidget {
  final List<String> options;
  final int selected;
  final ValueChanged<int> onChanged;

  const SegmentedToggle({
    super.key,
    required this.options,
    required this.selected,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: AnikutaColors.surface2,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: AnikutaColors.outlineVariant),
      ),
      child: Row(
        children: List.generate(options.length, (i) {
          final isActive = i == selected;
          return Expanded(
            child: GestureDetector(
              onTap: () => onChanged(i),
              child: Container(
                height: 40,
                decoration: BoxDecoration(
                  color: isActive ? AnikutaColors.primary : Colors.transparent,
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Center(
                  child: Text(
                    options[i],
                    style: TextStyle(
                      color: isActive ? AnikutaColors.onPrimary : AnikutaColors.onSurfaceVariant,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
          );
        }),
      ),
    );
  }
}

class EpisodeRow extends StatelessWidget {
  final Episode episode;
  final VoidCallback onTap;
  final bool isCurrent;

  const EpisodeRow({
    super.key,
    required this.episode,
    required this.onTap,
    this.isCurrent = false,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Opacity(
        opacity: episode.watched ? 0.5 : 1.0,
        child: Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: AnikutaColors.surface2,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isCurrent ? AnikutaColors.primary : AnikutaColors.outlineVariant,
              width: isCurrent ? 1.5 : 1,
            ),
          ),
          child: Row(
            children: [
              // Thumbnail
              ClipRRect(
                borderRadius: BorderRadius.circular(6),
                child: SizedBox(
                  width: 100,
                  height: 56,
                  child: Stack(
                    fit: StackFit.expand,
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: episode.thumbColors,
                          ),
                        ),
                        child: Center(
                          child: Text(
                            episode.thumbLetter,
                            style: TextStyle(
                              color: Colors.white.withOpacity(episode.watched ? 0.3 : 0.5),
                              fontSize: 20,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ),
                      ),
                      if (episode.watched)
                        Container(color: Colors.black.withOpacity(0.4)),
                      if (isCurrent)
                        const Center(
                          child: Icon(Icons.play_arrow, color: AnikutaColors.primary, size: 28),
                        ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 10),
              // Text
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'EP ${episode.number}',
                      style: TextStyle(
                        color: AnikutaColors.primary,
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      episode.title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: AnikutaColors.onBackground,
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        if (episode.subAvailable)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                            margin: const EdgeInsets.only(right: 4),
                            decoration: BoxDecoration(
                              color: AnikutaColors.primaryContainer,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text('SUB', style: TextStyle(color: AnikutaColors.onPrimaryContainer, fontSize: 9, fontWeight: FontWeight.bold)),
                          ),
                        if (episode.dubAvailable)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                            decoration: BoxDecoration(
                              color: AnikutaColors.secondaryContainer,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text('DUB', style: TextStyle(color: AnikutaColors.secondary, fontSize: 9, fontWeight: FontWeight.bold)),
                          ),
                        const Spacer(),
                        if (episode.watched)
                          const Icon(Icons.check_circle, color: AnikutaColors.primary, size: 16),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Bottom nav bar — floating pill
class AnikutaBottomNav extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;

  const AnikutaBottomNav({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  static const _items = [
    _NavItem(icon: Icons.home, label: 'Home'),
    _NavItem(icon: Icons.library_books, label: 'Library'),
    _NavItem(icon: Icons.update, label: 'Updates'),
    _NavItem(icon: Icons.more_horiz, label: 'More'),
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      decoration: BoxDecoration(
        color: AnikutaColors.surface3,
        borderRadius: BorderRadius.circular(28),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: List.generate(_items.length, (i) {
          final item = _items[i];
          final isActive = i == currentIndex;
          return Expanded(
            child: GestureDetector(
              onTap: () => onTap(i),
              child: Container(
                padding: EdgeInsets.symmetric(
                  horizontal: isActive ? 14 : 10,
                  vertical: 7,
                ),
                decoration: BoxDecoration(
                  color: isActive ? AnikutaColors.primaryContainer : Colors.transparent,
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      item.icon,
                      size: 22,
                      color: isActive ? AnikutaColors.onPrimaryContainer : AnikutaColors.onSurfaceVariant,
                    ),
                    if (isActive) ...[
                      const SizedBox(width: 6),
                      Flexible(
                        child: Text(
                          item.label,
                          style: TextStyle(
                            color: AnikutaColors.onPrimaryContainer,
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          );
        }),
      ),
    );
  }
}

class _NavItem {
  final IconData icon;
  final String label;
  const _NavItem({required this.icon, required this.label});
}
