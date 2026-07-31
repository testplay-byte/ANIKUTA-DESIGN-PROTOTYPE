// permissions_screen.dart — Step 3/15: Permissions
//
// Matches web prototype `permissions-screen.tsx`:
//   heading → PermissionsVisual → "Grant permissions" → "Optional: you can skip these"
//   → 4 permission rows (icon + title + desc + switch), staggered slide-in-left.
//   Row 4 (All files access) is disabled — toggle off, opacity 0.55.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/app_theme.dart';
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
    final onText = isDark ? Colors.white : Colors.black87;
    final muted = onText.withOpacity(0.6);
    final surface2 = isDark ? palette.surface2 : cs.surface;
    final surface4 = isDark ? palette.surface4 : cs.surfaceContainerHigh;
    final perms = controller.permissions;

    final rows = <_PermRowData>[
      _PermRowData(
        icon: Icons.install_mobile,
        title: 'Install apps',
        desc: 'Allow installing anime extensions',
        key: 'installApps',
        value: perms.installApps,
        enabled: true,
      ),
      _PermRowData(
        icon: Icons.notifications_outlined,
        title: 'Notifications',
        desc: 'Get notified about new episodes',
        key: 'notifications',
        value: perms.notifications,
        enabled: true,
      ),
      _PermRowData(
        icon: Icons.battery_full,
        title: 'Battery',
        desc: 'Allow background sync for updates',
        key: 'battery',
        value: perms.battery,
        enabled: true,
      ),
      _PermRowData(
        icon: Icons.folder_outlined,
        title: 'All files access',
        desc: 'Access all files on your device',
        key: 'allFilesAccess',
        value: perms.allFilesAccess,
        enabled: false,
      ),
    ];

    return WizardScaffold(
      pageHeading: 'Permissions',
      stepIndex: 3,
      stepTotal: kStepTotal,
      visual: PermissionsVisual(
        primary: cs.primary,
        onPrimary: cs.onPrimary,
        size: 140,
      ),
      descriptiveTitle: 'Grant permissions',
      subtitle: 'Optional: you can skip these',
      body: SizedBox(
        width: double.infinity,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (int i = 0; i < rows.length; i++)
              _StaggeredItem(
                index: i,
                child: _PermRow(
                  data: rows[i],
                  onChanged: rows[i].enabled
                      ? (_) => controller.togglePermission(rows[i].key)
                      : null,
                  primary: cs.primary,
                  onPrimary: cs.onPrimary,
                  surface: surface2,
                  surface4: surface4,
                  onText: onText,
                  muted: muted,
                ),
              ),
          ],
        ),
      ),
      backLabel: 'Back',
      onBack: () => WizardNav.back(context),
      primaryLabel: 'Continue',
      onPrimary: () => WizardNav.next(context, currentIndex: 3),
    );
  }
}

class _PermRowData {
  final IconData icon;
  final String title;
  final String desc;
  final String key;
  final bool value;
  final bool enabled;
  const _PermRowData({
    required this.icon,
    required this.title,
    required this.desc,
    required this.key,
    required this.value,
    required this.enabled,
  });
}

class _PermRow extends StatelessWidget {
  final _PermRowData data;
  final ValueChanged<bool>? onChanged;
  final Color primary;
  final Color onPrimary;
  final Color surface;
  final Color surface4;
  final Color onText;
  final Color muted;

  const _PermRow({
    required this.data,
    required this.onChanged,
    required this.primary,
    required this.onPrimary,
    required this.surface,
    required this.surface4,
    required this.onText,
    required this.muted,
  });

  @override
  Widget build(BuildContext context) {
    final row = Container(
      margin: const EdgeInsets.only(bottom: 10),
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
              color: data.value ? primary : primary.withOpacity(0.16),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(
              data.icon,
              size: 20,
              color: data.value ? onPrimary : primary,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  data.title,
                  style: TextStyle(
                    fontFamily: kFontFamily,
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: onText,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  data.desc,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontFamily: kFontFamily,
                    fontSize: 11,
                    fontWeight: FontWeight.w400,
                    color: muted,
                  ),
                ),
              ],
            ),
          ),
          Switch(
            value: data.value,
            onChanged: onChanged,
            activeTrackColor: primary,
            inactiveTrackColor: surface4,
            thumbColor: WidgetStateProperty.resolveWith<Color?>((states) {
              if (states.contains(WidgetState.selected)) return onPrimary;
              return Colors.white;
            }),
            trackOutlineColor: WidgetStateProperty.all(Colors.transparent),
          ),
        ],
      ),
    );

    if (!data.enabled) {
      return Opacity(opacity: 0.55, child: row);
    }
    return row;
  }
}

/// Staggered fade + slide-in-from-left entry for the permission rows.
/// Delay: 100 + index*100 ms · Duration: 400 ms · Curves: easeOut / easeOutCubic.
class _StaggeredItem extends StatefulWidget {
  final int index;
  final Widget child;
  const _StaggeredItem({required this.index, required this.child});

  @override
  State<_StaggeredItem> createState() => _StaggeredItemState();
}

class _StaggeredItemState extends State<_StaggeredItem>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c;
  late final Animation<double> _fade;
  late final Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );
    _fade = CurvedAnimation(parent: _c, curve: Curves.easeOut);
    _slide = Tween<Offset>(
      begin: const Offset(-0.15, 0),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _c, curve: Curves.easeOutCubic));
    Future.delayed(Duration(milliseconds: 100 + widget.index * 100), () {
      if (mounted) _c.forward();
    });
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _fade,
      child: SlideTransition(position: _slide, child: widget.child),
    );
  }
}
