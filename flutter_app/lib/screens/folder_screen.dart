// folder_screen.dart — Step 3/15: Select Your Anime Folder.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class FolderScreen extends StatelessWidget {
  const FolderScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;
    final selected = controller.folderSelected;

    return WizardScaffold(
      stepIndex: 2,
      stepTotal: kStepTotal,
      title: 'Select Your Anime Folder',
      subtitle: 'Where should we look for your anime library?',
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: selected ? 'Continue' : 'Select Folder',
      onPrimary: selected
          ? () => WizardNav.next(context, currentIndex: 2)
          : () => controller.setFolderSelected(true),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 8),

          // Tappable folder visual.
          Center(
            child: GestureDetector(
              onTap: () => controller.setFolderSelected(true),
              behavior: HitTestBehavior.opaque,
              child: FolderVisual(
                primary: cs.primary,
                surface3: palette.surface3,
                surface4: palette.surface4,
                surface5: palette.surface5,
                background: Theme.of(context).scaffoldBackgroundColor,
                selected: selected,
                size: 200,
              ),
            ),
          ),

          const SizedBox(height: 20),

          // Description line.
          Text(
            'Tap the folder to choose where your anime files live.',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: onBg.withOpacity(0.7),
              fontSize: 14,
              height: 1.5,
              fontWeight: FontWeight.w500,
            ),
          ),

          const SizedBox(height: 16),

          // Selected status pill.
          Center(
            child: AnimatedSwitcher(
              duration: const Duration(milliseconds: 220),
              child: selected
                  ? Container(
                      key: const ValueKey('selected'),
                      padding: const EdgeInsets.symmetric(
                          horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: cs.primary.withOpacity(0.14),
                        borderRadius: BorderRadius.circular(999),
                        border: Border.all(
                          color: cs.primary.withOpacity(0.4),
                          width: 1,
                        ),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.check_circle,
                              color: cs.primary, size: 18),
                          const SizedBox(width: 8),
                          Text(
                            'Folder selected',
                            style: TextStyle(
                              color: cs.primary,
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                    )
                  : const SizedBox.shrink(key: ValueKey('empty')),
            ),
          ),

          const SizedBox(height: 8),

          // Path-style preview card once a folder is selected.
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 220),
            child: selected
                ? Container(
                    key: const ValueKey('path'),
                    margin: const EdgeInsets.only(top: 12),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 14, vertical: 12),
                    decoration: BoxDecoration(
                      color: isDark ? palette.surface2 : cs.surface,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.folder_open,
                            color: cs.primary, size: 20),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            '/storage/emulated/0/Anime',
                            style: TextStyle(
                              color: onBg.withOpacity(0.85),
                              fontSize: 13,
                              fontWeight: FontWeight.w600,
                              fontFamily: 'monospace',
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  )
                : const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}
