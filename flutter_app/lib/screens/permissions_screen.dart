// permissions_screen.dart — Step 4/15: Grant Permissions.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../widgets/wizard_scaffold.dart';
import '../widgets/wizard_visuals.dart';

class PermissionsScreen extends StatelessWidget {
  const PermissionsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;
    final perms = controller.permissions;

    return WizardScaffold(
      stepIndex: 3,
      stepTotal: kStepTotal,
      title: 'Grant Permissions',
      subtitle: 'Optional — improve notifications and installs.',
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Continue',
      onPrimary: () => WizardNav.next(context, currentIndex: 3),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 4),
          Center(
            child: PermissionsVisual(
              primary: cs.primary,
              onPrimary: cs.onPrimary,
              size: 140,
            ),
          ),
          const SizedBox(height: 18),

          // Toggleable permissions.
          _PermRow(
            icon: Icons.install_mobile,
            title: 'Install apps',
            description: 'Install companion anime apps',
            value: perms.installApps,
            enabled: true,
            accent: cs.primary,
            onBg: onBg,
            surface: isDark ? palette.surface2 : cs.surface,
            onChanged: () => controller.togglePermission('installApps'),
          ),
          const SizedBox(height: 10),
          _PermRow(
            icon: Icons.notifications_outlined,
            title: 'Notifications',
            description: 'Get new episode alerts',
            value: perms.notifications,
            enabled: true,
            accent: cs.primary,
            onBg: onBg,
            surface: isDark ? palette.surface2 : cs.surface,
            onChanged: () => controller.togglePermission('notifications'),
          ),
          const SizedBox(height: 10),
          _PermRow(
            icon: Icons.battery_full,
            title: 'Battery optimization',
            description: 'Skip doze for downloads',
            value: perms.battery,
            enabled: true,
            accent: cs.primary,
            onBg: onBg,
            surface: isDark ? palette.surface2 : cs.surface,
            onChanged: () => controller.togglePermission('battery'),
          ),
          const SizedBox(height: 10),

          // All-files-access: permanently disabled.
          _PermRow(
            icon: Icons.folder_outlined,
            title: 'All files access',
            description: 'Not needed — leave off',
            value: false,
            enabled: false,
            accent: cs.primary,
            onBg: onBg,
            surface: isDark ? palette.surface2 : cs.surface,
            onChanged: null,
          ),

          const SizedBox(height: 8),
        ],
      ),
    );
  }
}

/// A single permission toggle row.
///
/// When [enabled] is false the switch is greyed out and disabled (used for the
/// all-files-access row, which is intentionally kept off).
class _PermRow extends StatelessWidget {
  final IconData icon;
  final String title;
  final String description;
  final bool value;
  final bool enabled;
  final Color accent;
  final Color onBg;
  final Color surface;
  final VoidCallback? onChanged;

  const _PermRow({
    required this.icon,
    required this.title,
    required this.description,
    required this.value,
    required this.enabled,
    required this.accent,
    required this.onBg,
    required this.surface,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final dim = !enabled;
    final iconColor = dim ? onBg.withOpacity(0.35) : accent;
    final titleColor = dim ? onBg.withOpacity(0.55) : onBg;
    final descColor = onBg.withOpacity(dim ? 0.4 : 0.6);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: [
          Container(
            width: 38,
            height: 38,
            decoration: BoxDecoration(
              color: dim
                  ? onBg.withOpacity(0.06)
                  : accent.withOpacity(0.16),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: iconColor, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    color: titleColor,
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  description,
                  style: TextStyle(
                    color: descColor,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    height: 1.3,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Opacity(
            opacity: dim ? 0.5 : 1,
            child: Switch(
              value: value,
              onChanged: onChanged,
            ),
          ),
        ],
      ),
    );
  }
}
