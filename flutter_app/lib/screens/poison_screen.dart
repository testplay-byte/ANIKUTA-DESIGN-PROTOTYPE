// poison_screen.dart — Step 14/15: Choose Your Poison (forced red theme)
//
// The ad-preferences screen. Forces a red Material 3 theme via a route-local
// Theme widget + Builder so the whole scaffold (progress bar, heading, buttons,
// chips) renders red. Three sub-steps driven by WizardController.poisonStep:
//   0 — name (poison / pills)
//   1 — frequency (1/2/3 per day)
//   2 — timing (app open / episode start / both)
// All state lives in the controller; this widget is stateless and rebuilds on
// notifyListeners via context.watch inside the Builder.

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
          final onBg = isDark ? Colors.white : Colors.black87;
          final step = controller.poisonStep;

          return WizardScaffold(
            stepIndex: 13,
            stepTotal: kStepTotal,
            title: 'Choose Your Poison',
            subtitle:
                'Ads keep the app free. Let\u2019s make them non-intrusive \u2014 pick your daily dose.',
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
                  inactiveColor: onBg.withOpacity(0.18),
                ),
                const SizedBox(height: 18),
                if (step == 0) ...[
                  const SectionLabel('What do you call it?'),
                  _ChoiceChip(
                    label: 'Daily dose of poison',
                    value: AdName.poison,
                    current: controller.adSettings.name,
                    onTap: () => controller.setAdName(AdName.poison),
                  ),
                  const SizedBox(height: 12),
                  _ChoiceChip(
                    label: 'Daily dose of pills',
                    value: AdName.pills,
                    current: controller.adSettings.name,
                    onTap: () => controller.setAdName(AdName.pills),
                  ),
                ] else if (step == 1) ...[
                  const SectionLabel('How often?'),
                  _ChoiceChip(
                    label: '1 ad per day',
                    value: 1,
                    current: controller.adSettings.frequency,
                    onTap: () => controller.setAdFrequency(1),
                  ),
                  const SizedBox(height: 12),
                  _ChoiceChip(
                    label: '2 ads per day',
                    value: 2,
                    current: controller.adSettings.frequency,
                    onTap: () => controller.setAdFrequency(2),
                  ),
                  const SizedBox(height: 12),
                  _ChoiceChip(
                    label: '3 ads per day',
                    value: 3,
                    current: controller.adSettings.frequency,
                    onTap: () => controller.setAdFrequency(3),
                  ),
                ] else ...[
                  const SectionLabel('When?'),
                  _ChoiceChip(
                    label: 'On app open',
                    value: AdTiming.appOpen,
                    current: controller.adSettings.timing,
                    onTap: () => controller.setAdTiming(AdTiming.appOpen),
                  ),
                  const SizedBox(height: 12),
                  _ChoiceChip(
                    label: 'On episode start',
                    value: AdTiming.episodeStart,
                    current: controller.adSettings.timing,
                    onTap: () => controller.setAdTiming(AdTiming.episodeStart),
                  ),
                  const SizedBox(height: 12),
                  _ChoiceChip(
                    label: 'Both',
                    value: AdTiming.both,
                    current: controller.adSettings.timing,
                    onTap: () => controller.setAdTiming(AdTiming.both),
                  ),
                ],
                const SizedBox(height: 20),
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
                            color: onBg.withOpacity(0.85),
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

/// Three-dot indicator for the poison sub-steps. The current dot expands into
/// a pill; transitions are animated for a smooth step-change feel.
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

/// Big tappable choice chip. Active state fills with the theme primary and
/// shows a check icon; inactive shows a radio outline. Min height 56 for a
/// comfortable touch target.
class _ChoiceChip extends StatelessWidget {
  final String label;
  final Object value;
  final Object current;
  final VoidCallback onTap;

  const _ChoiceChip({
    required this.label,
    required this.value,
    required this.current,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final onBg = isDark ? Colors.white : Colors.black87;
    final active = value == current;

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
              Expanded(
                child: Text(
                  label,
                  style: TextStyle(
                    color: active ? cs.onPrimary : onBg,
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
                color: active ? cs.onPrimary : onBg.withOpacity(0.35),
                size: 22,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
