// wizard_scaffold.dart — shared layout shell (v4).
//
// v4 changes (addresses user feedback):
// 1. PROGRESS BAR AT THE VERY TOP — no top padding at all. The progress bar
//    fills the full width at y=0, and the transparent status bar is drawn
//    ON TOP of it. A thin gap is added below the status bar height so the
//    bar is visible under the status icons.
// 2. HEADING LINE HEIGHT — increased to 1.25 and added tight letter spacing
//    so wrapped headings don't overlap.
// 3. ADAPTIVE — LayoutBuilder scales spacing based on available height.
// 4. INTER FONT — all TextStyles use fontFamily: kFontFamily.
// 5. REPAINT BOUNDARY — visual wrapped in RepaintBoundary.

import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../state/wizard_controller.dart';
import '../theme/app_theme.dart';

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
  final bool centerContent;

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
    this.centerContent = true,
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

    final topPad = MediaQuery.viewPaddingOf(context).top;
    final bottomPad = MediaQuery.viewPaddingOf(context).bottom;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      // No SafeArea — we draw the progress bar at y=0 (behind the status bar).
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // ---- Progress bar — FULL WIDTH, AT THE VERY TOP (y=0) ----
          // The transparent status bar icons are drawn on top of this bar.
          // Bar height = 3px, positioned at the very top edge.
          Container(
            height: 3,
            width: double.infinity,
            color: surface3,
            child: ClipRect(
              child: LinearProgressIndicator(
                value: stepTotal <= 0 ? 0 : (stepIndex + 1) / stepTotal,
                minHeight: 3,
                backgroundColor: Colors.transparent,
                valueColor: AlwaysStoppedAnimation(primary),
              ),
            ),
          ),
          // ---- Status bar spacer (so content starts below the status icons) ----
          SizedBox(height: topPad > 0 ? topPad - 3 : 8),
          // ---- Content area ----
          Expanded(
            child: LayoutBuilder(
              builder: (context, constraints) {
                final h = constraints.maxHeight;
                final w = constraints.maxWidth;
                return scrollable
                    ? SingleChildScrollView(
                        padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
                        child: ConstrainedBox(
                          constraints: BoxConstraints(minHeight: h - 20),
                          child: _buildContent(
                            primary, onText, muted, w, h, centerContent,
                          ),
                        ),
                      )
                    : Padding(
                        padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
                        child: _buildContent(
                          primary, onText, muted, w, h - 20, centerContent,
                        ),
                      );
              },
            ),
          ),
          // ---- Bottom actions (above gesture nav bar) ----
          _buildActions(primary, onPrimary, onText, surface3, surface4, bottomPad),
        ],
      ),
    );
  }

  Widget _buildContent(
    Color primary, Color onText, Color muted,
    double width, double height, bool center,
  ) {
    final isSmall = height < 560;
    final visualGap = isSmall ? 8.0 : 14.0;
    final titleGap = isSmall ? 8.0 : 12.0;

    return Column(
      mainAxisAlignment: center ? MainAxisAlignment.center : MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Page heading (colored, top-left) — line-height 1.25 prevents overlap on wrap
        Align(
          alignment: Alignment.centerLeft,
          child: Text(
            pageHeading,
            style: TextStyle(
              fontFamily: kFontFamily,
              fontSize: xlHeading ? 32 : 27,
              fontWeight: FontWeight.w800,
              letterSpacing: -0.5,
              height: 1.25, // prevents wrapped lines from overlapping
              color: primary,
            ),
          ),
        ),
        if (visual != null) ...[
          SizedBox(height: visualGap),
          Center(child: RepaintBoundary(child: visual!)),
        ],
        if (descriptiveTitle != null) ...[
          SizedBox(height: titleGap),
          Text(
            descriptiveTitle!,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: kFontFamily,
              fontSize: 20,
              fontWeight: FontWeight.w700,
              letterSpacing: -0.3,
              height: 1.25,
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
              fontFamily: kFontFamily,
              fontSize: 13,
              height: 1.5,
              fontWeight: FontWeight.w400,
              color: muted,
            ),
          ),
        ],
        if (body != null) ...[
          const SizedBox(height: 14),
          body!,
        ],
      ],
    );
  }

  Widget _buildActions(
    Color primary, Color onPrimaryColor, Color onText,
    Color surface3, Color surface4, double bottomPad,
  ) {
    final hasBack = backButton != null || (backLabel != null && onBack != null);
    final hasPrimary =
        primaryButton != null || (primaryLabel != null && onPrimary != null);
    if (!hasBack && !hasPrimary) {
      return SizedBox(height: bottomPad > 0 ? bottomPad : 16);
    }

    return Padding(
      padding: EdgeInsets.fromLTRB(20, 4, 20, bottomPad > 0 ? bottomPad + 8 : 16),
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

/// Pill-shaped button matching .wizard-btn (height 52, radius 999, w800, Inter).
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
                fontFamily: kFontFamily,
                fontSize: 16,
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
                fontFamily: kFontFamily,
                fontSize: 15,
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

/// Shows a centered modal dialog with a frosted-glass (backdrop blur) background.
/// The background dims + blurs the screen behind it.
void showFrostedDialog({
  required BuildContext context,
  required WidgetBuilder builder,
  bool barrierDismissible = true,
}) {
  showDialog(
    context: context,
    barrierDismissible: barrierDismissible,
    barrierColor: Colors.transparent, // we draw our own frosted barrier
    builder: (context) => FrostedDialogWrapper(
      child: builder(context),
      dismissible: barrierDismissible,
    ),
  );
}

/// A widget that paints a frosted-glass (backdrop blur) layer over the
/// screen behind it, then centers a child dialog.
class FrostedDialogWrapper extends StatelessWidget {
  final Widget child;
  final bool dismissible;
  const FrostedDialogWrapper({
    super.key,
    required this.child,
    this.dismissible = true,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return GestureDetector(
      onTap: dismissible ? () => Navigator.of(context).pop() : null,
      child: Container(
        color: Colors.black.withOpacity(0.2),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
          child: Container(
            color: (isDark ? Colors.black : Colors.white).withOpacity(0.3),
            alignment: Alignment.center,
            padding: const EdgeInsets.symmetric(horizontal: 28),
            child: GestureDetector(
              onTap: () {}, // swallow taps so they don't close the dialog
              child: child,
            ),
          ),
        ),
      ),
    );
  }
}
