// wizard_scaffold.dart — shared layout shell matching the web prototype exactly.
//
// Web prototype layout (setup-wizard.css):
//   .wizard-step (flex column, full height)
//     .wizard-content (flex 1, centered, padding 16/24, gap 16)
//       .wizard-page-heading (30px, w800, palette.primary, top-left)
//       .wizard-visual (200x200, centered, float anim)
//       .wizard-heading (descriptive-title 22px w700 + screen-sub 13px muted)
//       .wizard-body (flex column, gap 12, stretch)
//     .wizard-actions (flex row, gap 12, padding 12/24/24)
//       .wizard-btn--secondary (Back, surface bg, left arrow)
//       .wizard-btn--primary (Next, primary bg, right arrow)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../state/wizard_controller.dart';

class WizardScaffold extends StatelessWidget {
  final String pageHeading;
  final bool xlHeading;
  final Widget? visual;
  final String? descriptiveTitle;
  final String? subtitle;
  final Widget? body;
  final String? backLabel;
  final VoidCallback? onBack;
  final String? primaryLabel;
  final VoidCallback? onPrimary;
  final bool primaryEnabled;
  final Widget? primaryButton;
  final Widget? backButton;
  final List<Widget>? secondaryActions;
  final int stepIndex;
  final int stepTotal;
  final bool scrollable;

  const WizardScaffold({
    super.key,
    required this.pageHeading,
    this.xlHeading = false,
    this.visual,
    this.descriptiveTitle,
    this.subtitle,
    this.body,
    this.backLabel,
    this.onBack,
    this.primaryLabel,
    this.onPrimary,
    this.primaryEnabled = true,
    this.primaryButton,
    this.backButton,
    this.secondaryActions,
    required this.stepIndex,
    required this.stepTotal,
    this.scrollable = true,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cs = theme.colorScheme;
    final isDark = theme.brightness == Brightness.dark;
    final controller = context.watch<WizardController>();
    final palette = controller.palette;
    final primary = palette.primary;
    final onPrimary = palette.onPrimary;
    final onText = isDark ? Colors.white : Colors.black87;
    final muted = onText.withOpacity(0.6);
    final surface3 = isDark ? palette.surface3 : cs.surfaceContainerHighest;
    final surface4 = isDark ? palette.surface4 : cs.surfaceContainerHigh;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // ---- Progress bar (thin line at top) ----
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 8, 20, 0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(999),
                child: LinearProgressIndicator(
                  value: stepTotal <= 0 ? 0 : (stepIndex + 1) / stepTotal,
                  minHeight: 4,
                  backgroundColor: surface3,
                  valueColor: AlwaysStoppedAnimation(primary),
                ),
              ),
            ),
            // ---- Content area ----
            Expanded(
              child: scrollable
                  ? SingleChildScrollView(
                      padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
                      child: _buildContent(primary, onText, muted),
                    )
                  : Padding(
                      padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
                      child: _buildContent(primary, onText, muted),
                    ),
            ),
            // ---- Bottom actions ----
            _buildActions(primary, onPrimary, onText, surface3, surface4),
          ],
        ),
      ),
    );
  }

  Widget _buildContent(Color primary, Color onText, Color muted) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Page heading (colored, top-left)
        Align(
          alignment: Alignment.centerLeft,
          child: Text(
            pageHeading,
            style: TextStyle(
              fontSize: xlHeading ? 36 : 30,
              fontWeight: FontWeight.w800,
              letterSpacing: -0.5,
              height: 1.1,
              color: primary,
            ),
          ),
        ),
        if (visual != null) ...[
          const SizedBox(height: 8),
          Center(child: visual!),
        ],
        if (descriptiveTitle != null) ...[
          const SizedBox(height: 12),
          Text(
            descriptiveTitle!,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w700,
              letterSpacing: -0.3,
              color: onText,
            ),
          ),
        ],
        if (subtitle != null) ...[
          const SizedBox(height: 4),
          Text(
            subtitle!,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              height: 1.45,
              color: muted,
            ),
          ),
        ],
        if (body != null) ...[
          const SizedBox(height: 16),
          body!,
        ],
      ],
    );
  }

  Widget _buildActions(
      Color primary, Color onPrimaryColor, Color onText, Color surface3, Color surface4) {
    final hasBack = backButton != null || (backLabel != null && onBack != null);
    final hasPrimary =
        primaryButton != null || (primaryLabel != null && onPrimary != null);
    if (!hasBack && !hasPrimary) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 4, 20, 16),
      child: Row(
        children: [
          if (hasBack)
            Expanded(
              child: backButton ??
                  PillButton.secondary(
                    label: backLabel!,
                    onTap: onBack,
                    primary: primary,
                    onText: onText,
                    surface3: surface3,
                    surface4: surface4,
                  ),
            ),
          if (hasBack && hasPrimary) const SizedBox(width: 12),
          if (secondaryActions != null) ...secondaryActions!,
          if (hasPrimary)
            Expanded(
              child: primaryButton ??
                  PillButton.primary(
                    label: primaryLabel!,
                    onTap: primaryEnabled ? onPrimary : null,
                    primary: primary,
                    onPrimary: onPrimaryColor,
                  ),
            ),
        ],
      ),
    );
  }
}

/// Pill-shaped button matching .wizard-btn (height 52, radius 999, w800).
class PillButton extends StatelessWidget {
  final String label;
  final VoidCallback? onTap;
  final Color primary;
  final Color onPrimary;
  final Color onText;
  final Color surface3;
  final Color surface4;
  final bool showBackArrow;
  final bool showForwardArrow;

  const PillButton.primary({
    super.key,
    required this.label,
    required this.onTap,
    required this.primary,
    required this.onPrimary,
    this.onText = Colors.black,
    this.surface3 = Colors.grey,
    this.surface4 = Colors.grey,
    this.showBackArrow = false,
    this.showForwardArrow = true,
  });

  const PillButton.secondary({
    super.key,
    required this.label,
    required this.onTap,
    required this.primary,
    required this.onText,
    required this.surface3,
    required this.surface4,
    this.onPrimary = Colors.black,
    this.showBackArrow = true,
    this.showForwardArrow = false,
  });

  const PillButton.ghost({
    super.key,
    required this.label,
    required this.onTap,
    required this.onText,
    this.primary = Colors.grey,
    this.onPrimary = Colors.black,
    this.surface3 = Colors.grey,
    this.surface4 = Colors.grey,
    this.showBackArrow = false,
    this.showForwardArrow = false,
  });

  @override
  Widget build(BuildContext context) {
    final isPrimary = showForwardArrow;
    final isGhost = !showForwardArrow && !showBackArrow;
    final bg = isPrimary
        ? primary
        : isGhost
            ? Colors.transparent
            : surface3;
    final fg = isPrimary
        ? onPrimary
        : isGhost
            ? onText.withOpacity(0.6)
            : onText;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 52,
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(999),
          border: !isPrimary && !isGhost
              ? Border.all(color: surface4, width: 1)
              : null,
          boxShadow: isPrimary && onTap != null
              ? [
                  BoxShadow(
                    color: primary.withOpacity(0.30),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ]
              : null,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (showBackArrow) ...[
              Icon(Icons.arrow_back_rounded, size: 20, color: fg),
              const SizedBox(width: 8),
            ],
            Text(
              label,
              style: TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w800,
                letterSpacing: 0.2,
                color: fg,
              ),
            ),
            if (showForwardArrow) ...[
              const SizedBox(width: 8),
              Icon(Icons.arrow_forward_rounded, size: 20, color: fg),
            ],
          ],
        ),
      ),
    );
  }
}

/// Outlined "select" button — 44px, used for "Select Folder" / "Select Backup File".
class SelectButton extends StatelessWidget {
  final String label;
  final VoidCallback? onTap;
  final Color primary;
  final IconData? icon;

  const SelectButton({
    super.key,
    required this.label,
    required this.onTap,
    required this.primary,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 44,
        padding: const EdgeInsets.symmetric(horizontal: 24),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: primary, width: 1.5),
          boxShadow: [
            BoxShadow(
              color: primary.withOpacity(0.18),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null) ...[
              Icon(icon, size: 18, color: primary),
              const SizedBox(width: 8),
            ],
            Text(
              label,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w800,
                letterSpacing: 0.2,
                color: primary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
