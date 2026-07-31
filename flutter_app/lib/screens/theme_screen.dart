// theme_screen.dart — Step 2/15: Choose Your Theme (palette + mode + live preview).

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/palettes.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/mini_anime_preview.dart';

class ThemeScreen extends StatefulWidget {
  const ThemeScreen({super.key});

  @override
  State<ThemeScreen> createState() => _ThemeScreenState();
}

class _ThemeScreenState extends State<ThemeScreen> {
  // Cosmetic customization toggles (UI-only, not persisted in the controller).
  bool _boldText = true;
  bool _reducedMotion = false;

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;

    return WizardScaffold(
      stepIndex: 1,
      stepTotal: kStepTotal,
      title: 'Choose Your Theme',
      subtitle: 'Pick a palette and mode. Preview it live below.',
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Continue',
      onPrimary: () => WizardNav.next(context, currentIndex: 1),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 4),

          // ---- Mode segmented control ----
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: isDark ? palette.surface2 : cs.surface,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(
                color: onBg.withOpacity(0.08),
                width: 1,
              ),
            ),
            child: Row(
              children: ThemeModePref.values.map((m) {
                final selected = controller.themeMode == m;
                return Expanded(
                  child: GestureDetector(
                    onTap: () => controller.setThemeMode(m),
                    behavior: HitTestBehavior.opaque,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 180),
                      curve: Curves.easeOutCubic,
                      padding: const EdgeInsets.symmetric(vertical: 9),
                      decoration: BoxDecoration(
                        color: selected ? cs.primary : Colors.transparent,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      alignment: Alignment.center,
                      child: Text(
                        themeModeLabel(m),
                        style: TextStyle(
                          color: selected
                              ? cs.onPrimary
                              : onBg.withOpacity(0.7),
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 0.2,
                        ),
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: 16),

          // ---- Live preview hero ----
          Center(
            child: MiniAnimePreview(
              primary: cs.primary,
              onPrimary: cs.onPrimary,
              surface: isDark ? palette.surface2 : cs.surface,
              onSurface: cs.onSurface,
              surfaceVariant: cs.surfaceContainerHighest,
              height: 260,
            ),
          ),

          const SizedBox(height: 18),

          // ---- Palette carousel ----
          const SectionLabel('Palettes'),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: kPalettes.map((p) {
                final active = controller.palette.id == p.id;
                return _PaletteCard(
                  palette: p,
                  active: active,
                  onBg: onBg,
                  accent: cs.primary,
                  onTap: () => controller.setPalette(p),
                );
              }).toList(),
            ),
          ),

          const SizedBox(height: 8),

          // ---- Cosmetic customization toggles ----
          const SectionLabel('Customization'),
          _ToggleRow(
            icon: Icons.text_fields,
            title: 'Bold text',
            subtitle: 'Use heavier font weights throughout the app.',
            value: _boldText,
            onChanged: (v) => setState(() => _boldText = v),
            accent: cs.primary,
            onBg: onBg,
            surface: isDark ? palette.surface2 : cs.surface,
          ),
          const SizedBox(height: 10),
          _ToggleRow(
            icon: Icons.animation_outlined,
            title: 'Reduced motion',
            subtitle: 'Minimize animations and transitions.',
            value: _reducedMotion,
            onChanged: (v) => setState(() => _reducedMotion = v),
            accent: cs.primary,
            onBg: onBg,
            surface: isDark ? palette.surface2 : cs.surface,
          ),

          const SizedBox(height: 8),
        ],
      ),
    );
  }
}

/// A single palette card in the horizontal carousel.
class _PaletteCard extends StatelessWidget {
  final WizardPalette palette;
  final bool active;
  final Color onBg;
  final Color accent;
  final VoidCallback onTap;

  const _PaletteCard({
    required this.palette,
    required this.active,
    required this.onBg,
    required this.accent,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: 96,
        height: 120,
        margin: const EdgeInsets.only(right: 12),
        child: Stack(
          children: [
            // Swatch filling the whole card.
            Container(
              decoration: BoxDecoration(
                color: palette.seed,
                borderRadius: BorderRadius.circular(16),
                border: active
                    ? Border.all(color: accent, width: 3)
                    : Border.all(color: onBg.withOpacity(0.08), width: 1),
              ),
            ),
            // Darkened label strip at the bottom.
            Positioned(
              left: 0,
              right: 0,
              bottom: 0,
              child: Container(
                height: 34,
                padding: const EdgeInsets.symmetric(horizontal: 6),
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.38),
                  borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(active ? 13 : 15),
                    bottomRight: Radius.circular(active ? 13 : 15),
                  ),
                ),
                child: Text(
                  palette.name,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ),
            // Active check badge.
            if (active)
              Positioned(
                top: 6,
                right: 6,
                child: Container(
                  width: 22,
                  height: 22,
                  decoration: BoxDecoration(
                    color: accent,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.25),
                        blurRadius: 4,
                        offset: const Offset(0, 1),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.check,
                    color: Colors.white,
                    size: 14,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

/// A single cosmetic toggle row.
class _ToggleRow extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final bool value;
  final ValueChanged<bool> onChanged;
  final Color accent;
  final Color onBg;
  final Color surface;

  const _ToggleRow({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.value,
    required this.onChanged,
    required this.accent,
    required this.onBg,
    required this.surface,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
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
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    color: onBg,
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: TextStyle(
                    color: onBg.withOpacity(0.6),
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    height: 1.3,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Switch(
            value: value,
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }
}
