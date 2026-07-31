// wizard_scaffold.dart — shared layout shell for every wizard screen.
//
// Layout (per the redesign spec):
//   ┌───────────────────────────────┐
//   │ [progress bar]                │
//   │ [Heading]            ← top-left, left-aligned
//   │ [optional subheading]         │
//   │                                │
//   │  [body content]                │  ← scrolls if too tall
//   │  ...                           │
//   │                                │
//   │ [Back]      [Primary CTA]      │  ← bottom actions
//   └───────────────────────────────┘

import 'package:flutter/material.dart';

class WizardScaffold extends StatelessWidget {
  final String title;
  final String? subtitle;
  final Widget body;
  final String? backLabel;
  final VoidCallback? onBack;
  final String? primaryLabel;
  final VoidCallback? onPrimary;
  final bool primaryEnabled;
  final Widget? primaryButton; // override the primary button entirely
  final List<Widget>? secondaryActions; // extra buttons next to primary
  final int stepIndex; // 0-based, for the progress bar
  final int stepTotal;
  final bool scrollable;

  const WizardScaffold({
    super.key,
    required this.title,
    this.subtitle,
    required this.body,
    this.backLabel,
    this.onBack,
    this.primaryLabel,
    this.onPrimary,
    this.primaryEnabled = true,
    this.primaryButton,
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
    final onBg = isDark ? Colors.white : Colors.black87;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Progress bar
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 4),
              child: Row(
                children: [
                  Expanded(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(999),
                      child: LinearProgressIndicator(
                        value: stepTotal <= 0 ? 0 : (stepIndex + 1) / stepTotal,
                        minHeight: 6,
                        backgroundColor: cs.surfaceContainerHighest,
                        valueColor: AlwaysStoppedAnimation(cs.primary),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Text(
                    '${stepIndex + 1}/$stepTotal',
                    style: TextStyle(
                      color: onBg.withOpacity(0.6),
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            // Top-left heading block
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 4),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      color: onBg,
                      fontSize: 26,
                      height: 1.15,
                      fontWeight: FontWeight.w800,
                      letterSpacing: -0.3,
                    ),
                  ),
                  if (subtitle != null) ...[
                    const SizedBox(height: 6),
                    Text(
                      subtitle!,
                      style: TextStyle(
                        color: onBg.withOpacity(0.65),
                        fontSize: 14,
                        height: 1.4,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            // Body (scrollable)
            Expanded(
              child: scrollable
                  ? SingleChildScrollView(
                      padding: const EdgeInsets.fromLTRB(20, 8, 20, 12),
                      child: body,
                    )
                  : Padding(
                      padding: const EdgeInsets.fromLTRB(20, 8, 20, 12),
                      child: body,
                    ),
            ),
            // Bottom actions
            if (backLabel != null || primaryButton != null || primaryLabel != null)
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 4, 20, 16),
                child: Row(
                  children: [
                    if (backLabel != null && onBack != null)
                      OutlinedButton(
                        onPressed: onBack,
                        child: Text(backLabel!),
                      ),
                    const Spacer(),
                    if (secondaryActions != null) ...[
                      ...secondaryActions!.map((w) => Padding(
                            padding: const EdgeInsets.only(right: 8),
                            child: w,
                          )),
                    ],
                    if (primaryButton != null)
                      primaryButton!
                    else if (primaryLabel != null && onPrimary != null)
                      FilledButton(
                        onPressed: primaryEnabled ? onPrimary : null,
                        child: Text(primaryLabel!),
                      ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}

/// Small reusable section label.
class SectionLabel extends StatelessWidget {
  final String text;
  const SectionLabel(this.text, {super.key});
  @override
  Widget build(BuildContext context) {
    final onBg = Theme.of(context).brightness == Brightness.dark
        ? Colors.white
        : Colors.black87;
    return Padding(
      padding: const EdgeInsets.only(top: 4, bottom: 8),
      child: Text(
        text,
        style: TextStyle(
          color: onBg.withOpacity(0.55),
          fontSize: 12,
          fontWeight: FontWeight.w700,
          letterSpacing: 0.8,
        ),
      ),
    );
  }
}
