"use client";

/**
 * setup-wizard-v2 / page — ANIKUTA Design Language setup wizard.
 *
 * A 10-step animated setup wizard:
 *   0. Welcome — Brand introduction
 *   1. Theme — Mode + Palette picker
 *   2. Storage — Folder selection
 *   3. Permissions — Grant app permissions
 *   4. Restore Backup — Select backup file
 *   5. Format Error — Format not supported
 *   6. Linking Anime — Animated linking with covers
 *   7. Manual Linking — Link unlinked entries
 *   8. Restore Summary — Stats, disclaimer, restore button + animation
 *   9. Finish — Celebration
 */

import { useEffect } from "react";
import {
  DeviceThemeProvider, DeviceFrame, Screen, Stage,
  PanelBadge, PanelTitle, PanelDesc, PanelHead,
} from "@/proto-kit";
import { useWizardState, TOTAL_STEPS, STEP_NAMES, STEP_DESCRIPTIONS } from "../../../src/prototypes/setup-wizard-v2/hooks/use-wizard-state";
import { getThemeCSSVars } from "../../../src/prototypes/setup-wizard-v2/lib/themes";
import { WelcomeScreen } from "../../../src/prototypes/setup-wizard-v2/screens/welcome-screen";
import { ThemeScreen } from "../../../src/prototypes/setup-wizard-v2/screens/theme-screen";
import { StorageScreen } from "../../../src/prototypes/setup-wizard-v2/screens/storage-screen";
import { PermissionsScreen } from "../../../src/prototypes/setup-wizard-v2/screens/permissions-screen";
import { RestoreBackupScreen } from "../../../src/prototypes/setup-wizard-v2/screens/restore-backup-screen";
import { FormatErrorScreen } from "../../../src/prototypes/setup-wizard-v2/screens/format-error-screen";
import { LinkingAnimeScreen } from "../../../src/prototypes/setup-wizard-v2/screens/linking-anime-screen";
import { ManualLinkingScreen } from "../../../src/prototypes/setup-wizard-v2/screens/manual-linking-screen";
import { RestoreSummaryScreen } from "../../../src/prototypes/setup-wizard-v2/screens/restore-summary-screen";
import { FinishScreen } from "../../../src/prototypes/setup-wizard-v2/screens/finish-screen";
import { WizardProgress } from "../../../src/prototypes/setup-wizard-v2/components/wizard-progress";

export default function Page() {
  const wizard = useWizardState();
  const { step, themeMode, palette } = wizard;

  useEffect(() => {
    const device = document.querySelector(".device") as HTMLElement | null;
    if (!device) return;
    device.setAttribute("data-theme", themeMode.id === "light" ? "light" : "dark");
    const vars = getThemeCSSVars(themeMode, palette);
    Object.entries(vars).forEach(([prop, value]) => {
      device.style.setProperty(prop, value);
    });
    const root = document.documentElement;
    root.style.setProperty("--stage-bg", vars["--stage-bg"] ?? "#14111F");
  }, [themeMode, palette]);

  const currentStepName = STEP_NAMES[step] ?? "Unknown";
  const currentStepDesc = STEP_DESCRIPTIONS[step] ?? "";

  return (
    <DeviceThemeProvider storageKey="setup-wizard-v2-theme" initialTheme="dark">
      <Stage
        leftPanel={
          <>
            <PanelBadge>prototype v2</PanelBadge>
            <PanelTitle>Setup Wizard</PanelTitle>
            <PanelDesc>
              A 10-step onboarding wizard built with the ANIKUTA design language.
              Custom M3-inspired design with the Anikuta palette (#B1F256),
              5-level surface tiers, linking animations, and smooth transitions.
            </PanelDesc>
            <div className="tags">
              <span className="tag">ANIKUTA</span>
              <span className="tag">Design Language</span>
              <span className="tag">M3-Inspired</span>
            </div>
          </>
        }
        rightPanel={
          <>
            <PanelHead>Step info</PanelHead>
            <div className="screeninfo">
              <span className="screeninfo__name">{currentStepName}</span>
              <span className="screeninfo__desc">{currentStepDesc}</span>
            </div>
            <PanelHead>Progress</PanelHead>
            <div className="mini-bars">
              {STEP_NAMES.map((name, i) => (
                <div key={`${name}-${i}`} className="mini-bar-row">
                  <span className="mini-bar-label">{name}</span>
                  <div className="mini-bar-track">
                    <div className="mini-bar-fill" style={{
                      width: i <= step ? "100%" : "0%",
                      background: i <= step ? "var(--color-primary)" : "var(--muted)",
                      transition: "width 0.4s var(--ease-emphasized)",
                    }} />
                  </div>
                  <span className="mini-bar-num">{i + 1}</span>
                </div>
              ))}
            </div>
            <PanelHead>Design Language</PanelHead>
            <div className="kvlist">
              <div className="kvlist__row"><span>Language</span><b>ANIKUTA</b></div>
              <div className="kvlist__row"><span>Primary</span><b style={{ color: palette.primary }}>{palette.primary}</b></div>
              <div className="kvlist__row"><span>Mode</span><b>{themeMode.name}</b></div>
              <div className="kvlist__row"><span>Steps</span><b>{TOTAL_STEPS}</b></div>
              <div className="kvlist__row"><span>Surfaces</span><b>5-tier</b></div>
            </div>
          </>
        }
      >
        <DeviceFrame theme="dark">
          <WizardProgress currentStep={step} totalSteps={TOTAL_STEPS} palette={palette} />
          <Screen>
            <WelcomeScreen active={step === 0} onNext={wizard.next} palette={palette} />
            <ThemeScreen active={step === 1} onNext={wizard.next} onBack={wizard.back}
              themeMode={themeMode} setThemeMode={wizard.setThemeMode} palette={palette} setPalette={wizard.setPalette} />
            <StorageScreen active={step === 2} onNext={wizard.next} onBack={wizard.back}
              folderSelected={wizard.folderSelected} folderPath={wizard.folderPath} setFolderSelected={wizard.setFolderSelected} />
            <PermissionsScreen active={step === 3} onNext={wizard.next} onBack={wizard.back}
              permissions={wizard.permissions} togglePermission={wizard.togglePermission} />
            <RestoreBackupScreen active={step === 4} onNext={wizard.next} onBack={wizard.back} />
            <FormatErrorScreen active={step === 5} onNext={wizard.next} onBack={wizard.back} />
            <LinkingAnimeScreen active={step === 6} onNext={wizard.next} />
            <ManualLinkingScreen active={step === 7} onNext={wizard.next} onBack={wizard.back} />
            <RestoreSummaryScreen active={step === 8} onNext={wizard.next} onBack={wizard.back} />
            <FinishScreen active={step === 9} onRestart={wizard.reset} palette={palette} />
          </Screen>
        </DeviceFrame>
      </Stage>
    </DeviceThemeProvider>
  );
}
