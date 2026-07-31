// folder_screen.dart — Step 2/15: Folder
//
// Matches web prototype `folder-screen.tsx`:
//   heading → FolderVisual → "Select your anime folder" → subtitle
//   → Select Folder button OR mock card with scanning state.
// The scanning state is local; 1500 ms after selecting, scanning clears
// and a check badge replaces the scanning pill.

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/app_theme.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class FolderScreen extends StatefulWidget {
  const FolderScreen({super.key});

  @override
  State<FolderScreen> createState() => _FolderScreenState();
}

class _FolderScreenState extends State<FolderScreen> {
  bool _scanning = false;
  Timer? _timer;

  void _handleSelectFolder() {
    final controller = context.read<WizardController>();
    controller.setFolderSelected(true);
    setState(() => _scanning = true);
    _timer?.cancel();
    _timer = Timer(const Duration(milliseconds: 1500), () {
      if (mounted) setState(() => _scanning = false);
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
    final folderSelected = controller.folderSelected;
    final showSelected = folderSelected && !_scanning;

    final String descTitle = folderSelected
        ? 'Folder connected!'
        : 'Select your anime folder';
    final String subtitle;
    if (folderSelected && _scanning) {
      subtitle = 'Scanning your library…';
    } else if (folderSelected && !_scanning) {
      subtitle = 'Your library is ready to go. Continue when you are.';
    } else {
      subtitle =
          "Pick the folder where your anime library lives. We'll scan it and organize everything for you.";
    }

    return WizardScaffold(
      pageHeading: 'Folder',
      stepIndex: 2,
      stepTotal: kStepTotal,
      visual: FolderVisual(
        primary: cs.primary,
        surface3: palette.surface3,
        surface4: palette.surface4,
        surface5: palette.surface5,
        background: Theme.of(context).scaffoldBackgroundColor,
        selected: showSelected,
        size: 190,
      ),
      descriptiveTitle: descTitle,
      subtitle: subtitle,
      body: folderSelected
          ? SizedBox(
              width: double.infinity,
              child: _FolderMockCard(
                scanning: _scanning,
                primary: cs.primary,
                surface: surface2,
                onText: onText,
                muted: muted,
                primaryContainer: cs.primaryContainer,
                onPrimaryContainer: cs.onPrimaryContainer,
              ),
            )
          : Center(
              child: SelectButton(
                label: 'Select Folder',
                onTap: _handleSelectFolder,
                primary: cs.primary,
                icon: Icons.folder_outlined,
              ),
            ),
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryButton: _scanning
          ? PillButton.ghost(
              label: 'Scanning…',
              onTap: null,
              onText: onText,
            )
          : Opacity(
              opacity: folderSelected ? 1.0 : 0.4,
              child: PillButton.primary(
                label: 'Continue',
                onTap: folderSelected
                    ? () => WizardNav.next(context, currentIndex: 2)
                    : null,
                primary: cs.primary,
                onPrimary: cs.onPrimary,
              ),
            ),
    );
  }
}

// ---------------------------------------------------------------------------
// Mock card shown after folder is selected — shows path, status, and either
// an animated "Scanning" pill or a primary check circle.
// ---------------------------------------------------------------------------

class _FolderMockCard extends StatelessWidget {
  final bool scanning;
  final Color primary;
  final Color surface;
  final Color onText;
  final Color muted;
  final Color primaryContainer;
  final Color onPrimaryContainer;

  const _FolderMockCard({
    required this.scanning,
    required this.primary,
    required this.surface,
    required this.onText,
    required this.muted,
    required this.primaryContainer,
    required this.onPrimaryContainer,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: primary, width: 1.5),
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: primaryContainer,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(Icons.folder, size: 24, color: onPrimaryContainer),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  '/storage/anime-library',
                  style: TextStyle(
                    fontFamily: kFontFamily,
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: onText,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  scanning ? 'Scanning…' : '247 items · ready',
                  style: TextStyle(
                    fontFamily: kFontFamily,
                    fontSize: 12,
                    color: muted,
                  ),
                ),
              ],
            ),
          ),
          if (scanning)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: primary.withOpacity(0.13),
                borderRadius: BorderRadius.circular(999),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  _ScanningDots(primary: primary),
                  const SizedBox(width: 6),
                  Text(
                    'Scanning',
                    style: TextStyle(
                      fontFamily: kFontFamily,
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      color: primary,
                    ),
                  ),
                ],
              ),
            )
          else
            Container(
              width: 28,
              height: 28,
              decoration: BoxDecoration(
                color: primary,
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.check, size: 18, color: Colors.white),
            ),
        ],
      ),
    );
  }
}

/// Three pulsing dots for the "Scanning…" pill.
class _ScanningDots extends StatefulWidget {
  final Color primary;
  const _ScanningDots({required this.primary});

  @override
  State<_ScanningDots> createState() => _ScanningDotsState();
}

class _ScanningDotsState extends State<_ScanningDots>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat();
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        return Row(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(3, (i) {
            // Each dot has a phase offset; visible dot sweeps left→right.
            final t = (_c.value * 3 - i) % 3.0;
            final phase = (t < 1.0 ? t : 0.0).clamp(0.0, 1.0);
            // peak at phase=0.5, fade at edges
            final v = (1 - (phase - 0.5).abs() * 2).clamp(0.0, 1.0);
            return Padding(
              padding: EdgeInsets.only(right: i < 2 ? 3 : 0),
              child: Container(
                width: 5,
                height: 5,
                decoration: BoxDecoration(
                  color: widget.primary.withOpacity(0.25 + 0.75 * v),
                  shape: BoxShape.circle,
                ),
              ),
            );
          }),
        );
      },
    );
  }
}
