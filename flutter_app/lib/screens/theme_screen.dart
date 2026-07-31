// theme_screen.dart — Step 1/15: Theme
//
// Matches web prototype `theme-screen.tsx`:
//   heading → MiniAnimePreview → "Choose your theme" → subtitle
//   → mode toggle (Dark/Light/System) → palette carousel (6 swatches).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/app_theme.dart';
import '../theme/palettes.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/mini_anime_preview.dart';

class ThemeScreen extends StatelessWidget {
  const ThemeScreen({super.key});

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
      pageHeading: 'Theme',
      stepIndex: 1,
      stepTotal: kStepTotal,
      visual: MiniAnimePreview(
        primary: cs.primary,
        onPrimary: cs.onPrimary,
        surface: isDark ? palette.surface2 : cs.surface,
        onSurface: cs.onSurface,
        surfaceVariant: cs.surfaceContainerHighest,
        height: 180,
      ),
      descriptiveTitle: 'Choose your theme',
      subtitle: 'Pick a mode and a color and we are set with it.',
      body: SizedBox(
        width: double.infinity,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _ModeToggle(
              mode: controller.themeMode,
              onMode: controller.setThemeMode,
              primary: cs.primary,
              onPrimary: cs.onPrimary,
              surface: surface2,
              muted: muted,
            ),
            const SizedBox(height: 16),
            _PaletteCarousel(
              palettes: kPalettes,
              activeId: palette.id,
              onPick: controller.setPalette,
              primary: cs.primary,
              scaffoldBg: Theme.of(context).scaffoldBackgroundColor,
              muted: muted,
            ),
          ],
        ),
      ),
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Next',
      onPrimary: () => WizardNav.next(context, currentIndex: 1),
    );
  }
}

// ---------------------------------------------------------------------------
// Mode toggle (Dark / Light / System) — surface2 pill with 3 equal segments.
// ---------------------------------------------------------------------------

class _ModeToggle extends StatelessWidget {
  final ThemeModePref mode;
  final ValueChanged<ThemeModePref> onMode;
  final Color primary;
  final Color onPrimary;
  final Color surface;
  final Color muted;

  const _ModeToggle({
    required this.mode,
    required this.onMode,
    required this.primary,
    required this.onPrimary,
    required this.surface,
    required this.muted,
  });

  @override
  Widget build(BuildContext context) {
    const options = [
      _ModeOpt(ThemeModePref.dark, 'Dark', Icons.nightlight_round),
      _ModeOpt(ThemeModePref.light, 'Light', Icons.wb_sunny_outlined),
      _ModeOpt(ThemeModePref.system, 'System', Icons.laptop),
    ];
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: [
          for (final opt in options)
            Expanded(
              child: _ModeButton(
                opt: opt,
                isActive: mode == opt.mode,
                onTap: () => onMode(opt.mode),
                primary: primary,
                onPrimary: onPrimary,
                muted: muted,
              ),
            ),
        ],
      ),
    );
  }
}

class _ModeOpt {
  final ThemeModePref mode;
  final String label;
  final IconData icon;
  const _ModeOpt(this.mode, this.label, this.icon);
}

class _ModeButton extends StatelessWidget {
  final _ModeOpt opt;
  final bool isActive;
  final VoidCallback onTap;
  final Color primary;
  final Color onPrimary;
  final Color muted;

  const _ModeButton({
    required this.opt,
    required this.isActive,
    required this.onTap,
    required this.primary,
    required this.onPrimary,
    required this.muted,
  });

  @override
  Widget build(BuildContext context) {
    final fg = isActive ? onPrimary : muted;
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: isActive ? primary : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(opt.icon, size: 14, color: fg),
            const SizedBox(width: 6),
            Text(
              opt.label,
              style: TextStyle(
                fontFamily: kFontFamily,
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: fg,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------------------------------------------------------------------
// Palette carousel — horizontal scroll of 6 color swatches.
// ---------------------------------------------------------------------------

class _PaletteCarousel extends StatelessWidget {
  final List<WizardPalette> palettes;
  final String activeId;
  final ValueChanged<WizardPalette> onPick;
  final Color primary;
  final Color scaffoldBg;
  final Color muted;

  const _PaletteCarousel({
    required this.palettes,
    required this.activeId,
    required this.onPick,
    required this.primary,
    required this.scaffoldBg,
    required this.muted,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.only(top: 8, bottom: 4),
      child: Row(
        children: [
          for (int i = 0; i < palettes.length; i++) ...[
            if (i > 0) const SizedBox(width: 10),
            _PaletteCard(
              palette: palettes[i],
              isActive: palettes[i].id == activeId,
              onTap: () => onPick(palettes[i]),
              primary: primary,
              scaffoldBg: scaffoldBg,
              muted: muted,
            ),
          ],
        ],
      ),
    );
  }
}

class _PaletteCard extends StatelessWidget {
  final WizardPalette palette;
  final bool isActive;
  final VoidCallback onTap;
  final Color primary;
  final Color scaffoldBg;
  final Color muted;

  const _PaletteCard({
    required this.palette,
    required this.isActive,
    required this.onTap,
    required this.primary,
    required this.scaffoldBg,
    required this.muted,
  });

  @override
  Widget build(BuildContext context) {
    final swatchColor = palette.seed;
    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: 72,
        height: 96,
        child: Column(
          children: [
            Stack(
              clipBehavior: Clip.none,
              children: [
                Container(
                  width: 72,
                  height: 72,
                  decoration: BoxDecoration(
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(14),
                    ),
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [
                        swatchColor,
                        swatchColor.withOpacity(0.67),
                      ],
                    ),
                    border: isActive
                        ? Border.all(color: primary, width: 2.5)
                        : null,
                  ),
                ),
                if (isActive)
                  Positioned(
                    top: -6,
                    right: -6,
                    child: Container(
                      width: 20,
                      height: 20,
                      decoration: BoxDecoration(
                        color: primary,
                        shape: BoxShape.circle,
                        border: Border.all(color: scaffoldBg, width: 2),
                      ),
                      child: const Icon(
                        Icons.check,
                        size: 12,
                        color: Colors.white,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              palette.name,
              style: TextStyle(
                fontFamily: kFontFamily,
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: isActive ? primary : muted,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
