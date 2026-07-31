// poison_screen.dart — Step 13/15: Choose Your Poison (forced red theme).
//
// Mirrors the web prototype's poison-screen.tsx exactly:
//   - The whole scaffold is wrapped in a Theme(data: buildPoisonTheme(...))
//     so the page heading, progress bar, choice cards, summary chip and
//     primary button all render in the red Material 3 ColorScheme.
//   - Page heading "Choose Your Poison" (renders in red #ff6b6b).
//   - No visual.
//   - Multi-step body (3 sub-steps) driven by controller.poisonStep:
//       0 — Name    : "Daily dose of poison" / "Daily dose of pills"
//       1 — Frequency: 1 / 2 / 3 ads per day
//       2 — Timing   : On app open / On episode start / Both
//   - A 3-dot step indicator (current dot expands to a pill).
//   - A live summary chip showing controller.adSettings.summary.
//   - Back goes to the previous sub-step (or pops the screen on step 0).
//   - Next advances the sub-step (or pushes step 14 on step 2 as "Confirm").
//
// All ad state lives in WizardController; this widget is stateless and
// rebuilds on notifyListeners via context.watch inside the Builder.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../navigation/wizard_navigator.dart';
import '../state/wizard_controller.dart';
import '../theme/app_theme.dart';
import '../models/wizard_models.dart';
import '../widgets/wizard_scaffold.dart';

class PoisonScreen extends StatelessWidget {
  const PoisonScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: buildPoisonTheme(Theme.of(context).brightness),
      child: Builder(
        builder: (context) {
          final controller = context.watch<WizardController>();
          final cs = Theme.of(context).colorScheme;
          final isDark = Theme.of(context).brightness == Brightness.dark;
          final onText = isDark ? Colors.white : Colors.black87;
          final muted = onText.withOpacity(0.6);
          final step = controller.poisonStep;

          return WizardScaffold(
            stepIndex: 13,
            stepTotal: kStepTotal,
            pageHeading: 'Choose Your Poison',
            backLabel: 'Back',
            onBack: () {
              if (controller.poisonStep > 0) {
                controller.prevPoisonStep();
              } else {
                WizardNav.back(context);
              }
            },
            primaryLabel: step < 2 ? 'Next' : 'Confirm',
            onPrimary: () {
              if (step < 2) {
                controller.nextPoisonStep();
              } else {
                WizardNav.next(context, currentIndex: 13);
              }
            },
            body: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 4),
                _StepDots(
                  current: step,
                  total: 3,
                  activeColor: cs.primary,
                  inactiveColor: onText.withOpacity(0.18),
                ),
                const SizedBox(height: 18),
                if (step == 0) ...[
                  _SectionLabel('What do you call it?', muted: muted),
                  const SizedBox(height: 10),
                  _ChoiceCard(
                    label: 'Daily dose of poison',
                    icon: Icons.dangerous_outlined,
                    active: controller.adSettings.name == AdName.poison,
                    onTap: () => controller.setAdName(AdName.poison),
                  ),
                  const SizedBox(height: 10),
                  _ChoiceCard(
                    label: 'Daily dose of pills',
                    icon: Icons.medication_outlined,
                    active: controller.adSettings.name == AdName.pills,
                    onTap: () => controller.setAdName(AdName.pills),
                  ),
                ] else if (step == 1) ...[
                  _SectionLabel('How many per day?', muted: muted),
                  const SizedBox(height: 10),
                  _ChoiceCard(
                    label: '1 ad per day',
                    icon: Icons.looks_one_outlined,
                    active: controller.adSettings.frequency == 1,
                    onTap: () => controller.setAdFrequency(1),
                  ),
                  const SizedBox(height: 10),
                  _ChoiceCard(
                    label: '2 ads per day',
                    icon: Icons.looks_two_outlined,
                    active: controller.adSettings.frequency == 2,
                    onTap: () => controller.setAdFrequency(2),
                  ),
                  const SizedBox(height: 10),
                  _ChoiceCard(
                    label: '3 ads per day',
                    icon: Icons.looks_3_outlined,
                    active: controller.adSettings.frequency == 3,
                    onTap: () => controller.setAdFrequency(3),
                  ),
                ] else ...[
                  _SectionLabel('When should they show?', muted: muted),
                  const SizedBox(height: 10),
                  _ChoiceCard(
                    label: 'On app open',
                    icon: Icons.play_circle_outline,
                    active: controller.adSettings.timing == AdTiming.appOpen,
                    onTap: () => controller.setAdTiming(AdTiming.appOpen),
                  ),
                  const SizedBox(height: 10),
                  _ChoiceCard(
                    label: 'On episode start',
                    icon: Icons.video_library_outlined,
                    active:
                        controller.adSettings.timing == AdTiming.episodeStart,
                    onTap: () =>
                        controller.setAdTiming(AdTiming.episodeStart),
                  ),
                  const SizedBox(height: 10),
                  _ChoiceCard(
                    label: 'Both',
                    icon: Icons.all_inclusive_outlined,
                    active: controller.adSettings.timing == AdTiming.both,
                    onTap: () => controller.setAdTiming(AdTiming.both),
                  ),
                ],
                const SizedBox(height: 18),
                // Live summary chip — always visible across all sub-steps.
                Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 14, vertical: 12),
                  decoration: BoxDecoration(
                    color: cs.surface,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.tune_outlined, size: 18, color: cs.primary),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          controller.adSettings.summary,
                          style: TextStyle(
                            color: onText.withOpacity(0.85),
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

/// Small muted section label above a group of choice cards.
class _SectionLabel extends StatelessWidget {
  final String text;
  final Color muted;
  const _SectionLabel(this.text, {required this.muted});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(
        color: muted,
        fontSize: 13,
        fontWeight: FontWeight.w700,
        letterSpacing: 0.3,
      ),
    );
  }
}

/// Three-dot indicator for the poison sub-steps. The current dot expands
/// into a pill; transitions are animated for a smooth step-change feel.
class _StepDots extends StatelessWidget {
  final int current;
  final int total;
  final Color activeColor;
  final Color inactiveColor;

  const _StepDots({
    required this.current,
    required this.total,
    required this.activeColor,
    required this.inactiveColor,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(total, (i) {
        final active = i == current;
        return AnimatedContainer(
          duration: const Duration(milliseconds: 220),
          curve: Curves.easeOutCubic,
          margin: EdgeInsets.only(right: i == total - 1 ? 0 : 8),
          width: active ? 24 : 8,
          height: 8,
          decoration: BoxDecoration(
            color: active ? activeColor : inactiveColor,
            borderRadius: BorderRadius.circular(999),
          ),
        );
      }),
    );
  }
}

/// Big tappable choice card. Active state fills with the theme primary and
/// shows a check icon; inactive shows a radio outline. Min height 56, full
/// width, with a leading icon + label + trailing check/radio.
class _ChoiceCard extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool active;
  final VoidCallback onTap;

  const _ChoiceCard({
    required this.label,
    required this.icon,
    required this.active,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onText = isDark ? Colors.white : Colors.black87;

    return Material(
      color: active ? cs.primary : cs.surface,
      borderRadius: BorderRadius.circular(16),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          constraints: const BoxConstraints(minHeight: 56),
          padding:
              const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          child: Row(
            children: [
              Icon(
                icon,
                color: active ? cs.onPrimary : onText.withOpacity(0.7),
                size: 22,
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  label,
                  style: TextStyle(
                    color: active ? cs.onPrimary : onText,
                    fontSize: 16,
                    fontWeight: active ? FontWeight.w800 : FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Icon(
                active
                    ? Icons.check_circle_rounded
                    : Icons.radio_button_unchecked,
                color: active
                    ? cs.onPrimary
                    : onText.withOpacity(0.35),
                size: 22,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
