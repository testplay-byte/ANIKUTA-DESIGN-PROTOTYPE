"use client";

/**
 * setup-wizard / page — the prototype entry point.
 *
 * A 15-route animated setup wizard for an anime app, using HASH ROUTING
 * (like the anime-app prototype) so every screen has its own addressable
 * URL:
 *
 *   #welcome             — Welcome / intro + setup overview list
 *   #theme               — Choose your theme (mini live preview + carousel)
 *   #folder              — Select your anime folder
 *   #permissions         — Grant permissions (optional)
 *   #restore             — Restore backup (Select Backup File / Skip)
 *   #format              — Format not supported
 *   #processing          — Processing backup (auto-advance)
 *   #summary             — Backup summary (Cancel → #format)
 *   #linking             — Linking anime
 *   #manual              — Manual linking (search overlay)
 *   #restore-summary     — Restore summary → Restore Now
 *   #restore-processing  — Restore Now processing (NEW)
 *   #restore-success     — Restore successful → #poison
 *   #poison              — Choose Your Poison (red, ad config) (NEW)
 *   #finish              — Setup complete
 *
 * The browser back button works (popstate listener re-parses the hash).
 * See docs/setup-wizard-redesign/plan.md for the full architecture.
 */
import { useEffect, useState } from "react";
import {
  DeviceThemeProvider,
  DeviceFrame,
  Screen,
  Stage,
  PanelBadge,
  PanelTitle,
  PanelDesc,
  PanelHead,
} from "../../../src/proto-kit";
import { useWizardState, ROUTE_ORDER, TOTAL_ROUTES } from "../../../src/prototypes/setup-wizard/hooks/use-wizard-state";
import type { WizardRoute } from "../../../src/prototypes/setup-wizard/hooks/use-wizard-state";
import { WelcomeScreen } from "../../../src/prototypes/setup-wizard/screens/welcome-screen";
import { ThemeScreen } from "../../../src/prototypes/setup-wizard/screens/theme-screen";
import { FolderScreen } from "../../../src/prototypes/setup-wizard/screens/folder-screen";
import { PermissionsScreen } from "../../../src/prototypes/setup-wizard/screens/permissions-screen";
import { RestoreScreen } from "../../../src/prototypes/setup-wizard/screens/restore-screen";
import { FormatNotSupportedScreen } from "../../../src/prototypes/setup-wizard/screens/format-not-supported-screen";
import { ProcessingBackupScreen } from "../../../src/prototypes/setup-wizard/screens/processing-backup-screen";
import { BackupSummaryScreen } from "../../../src/prototypes/setup-wizard/screens/backup-summary-screen";
import { LinkingAnimeScreen } from "../../../src/prototypes/setup-wizard/screens/linking-anime-screen";
import { ManualLinkingScreen } from "../../../src/prototypes/setup-wizard/screens/manual-linking-screen";
import { RestoreSummaryScreen } from "../../../src/prototypes/setup-wizard/screens/restore-summary-screen";
import { RestoreProcessingScreen } from "../../../src/prototypes/setup-wizard/screens/restore-processing-screen";
import { RestoreSuccessfulScreen } from "../../../src/prototypes/setup-wizard/screens/restore-successful-screen";
import { PoisonScreen } from "../../../src/prototypes/setup-wizard/screens/poison-screen";
import { FinishScreen } from "../../../src/prototypes/setup-wizard/screens/finish-screen";
import { WizardProgress } from "../../../src/prototypes/setup-wizard/components/wizard-progress";

const VALID_ROUTES = new Set<string>(ROUTE_ORDER);

function parseHash(): WizardRoute {
  if (typeof window === "undefined") return "welcome";
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return "welcome";
  if (VALID_ROUTES.has(hash)) return hash as WizardRoute;
  return "welcome";
}

const ROUTE_LABELS: Record<WizardRoute, string> = {
  welcome: "Welcome",
  theme: "Theme",
  folder: "Folder",
  permissions: "Permissions",
  restore: "Restore",
  format: "Format",
  processing: "Processing",
  summary: "Summary",
  linking: "Linking",
  manual: "Manual",
  "restore-summary": "Restore",
  "restore-processing": "Restoring",
  "restore-success": "Success",
  poison: "Poison",
  finish: "Finish",
};

const ROUTE_DESCRIPTIONS: Record<WizardRoute, string> = {
  welcome: "Welcome to the setup wizard.",
  theme: "Choose your theme and colors.",
  folder: "Select your anime folder.",
  permissions: "Grant app permissions (optional).",
  restore: "Restore from a backup or skip.",
  format: "Backup format not supported.",
  processing: "Processing your backup file…",
  summary: "Backup summary with manga warning.",
  linking: "Linking anime to AniList entries.",
  manual: "Manually link unlinked anime.",
  "restore-summary": "Final restore summary.",
  "restore-processing": "Restoring your library…",
  "restore-success": "Restore successful!",
  poison: "Pick your daily dose — ad preferences.",
  finish: "You're all set!",
};

export default function Page() {
  const wizard = useWizardState();
  const { route, themeMode, palette } = wizard;
  const [, setHashTick] = useState(0);

  // Read hash on mount; if empty, replaceState to #welcome.
  useEffect(() => {
    if (window.location.hash === "") {
      try {
        history.replaceState(null, "", "#welcome");
      } catch {
        /* sandbox may block hash writes — ignore */
      }
      wizard.setRoute("welcome");
    } else {
      wizard.setRoute(parseHash());
    }
    setHashTick((t) => t + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for back/forward.
  useEffect(() => {
    function onPop() {
      wizard.setRoute(parseHash());
      setHashTick((t) => t + 1);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [wizard]);

  // Navigate to a route via pushState (so back button works).
  function go(target: WizardRoute) {
    if (target === route) return;
    try {
      history.pushState(null, "", `#${target}`);
    } catch {
      /* ignore */
    }
    wizard.setRoute(target);
    setHashTick((t) => t + 1);
  }

  // Browser back.
  function goBack() {
    try {
      history.back();
    } catch {
      /* ignore */
    }
  }

  // Apply the selected palette as CSS custom properties on the .device element.
  useEffect(() => {
    const device = document.querySelector(".device") as HTMLElement | null;
    if (!device) return;

    // Determine effective theme (system → dark for prototype)
    const effectiveDark = themeMode !== "light";

    // The poison screen forces a RED theme. Inline styles override the
    // .device--poison CSS class (inline > class), so we apply the red palette
    // values directly here to guarantee the red theme renders.
    const POISON_RED = {
      primary: "#ff5252",
      primaryFg: "#1a0000",
      onPrimaryContainer: "#ffe5e5",
      primaryContainer: "#5c1a1a",
      bg: "#1a0808",
      s1: "#240d0d",
      s2: "#2e1414",
      s3: "#3a1c1c",
      s4: "#462424",
      s5: "#522c2c",
    };
    const isPoison = route === "poison";
    if (isPoison) {
      device.classList.add("device--poison");
    } else {
      device.classList.remove("device--poison");
    }

    // Apply theme mode
    device.setAttribute("data-theme", effectiveDark ? "dark" : "light");

    // Apply palette colors as CSS custom properties (red palette on poison).
    const root = device;
    root.style.setProperty("--color-primary", isPoison ? POISON_RED.primary : palette.primary);
    root.style.setProperty("--color-primary-fg", isPoison ? POISON_RED.primaryFg : palette.onPrimary);
    root.style.setProperty("--color-on-primary-container", isPoison ? POISON_RED.onPrimaryContainer : palette.onPrimaryContainer);
    root.style.setProperty("--color-primary-container", isPoison ? POISON_RED.primaryContainer : (effectiveDark ? palette.primaryContainerDark : palette.primaryContainerLight));
    root.style.setProperty("--color-bg", isPoison ? POISON_RED.bg : (effectiveDark ? palette.bgDark : palette.bgLight));
    root.style.setProperty("--color-surface-1", isPoison ? POISON_RED.s1 : (effectiveDark ? palette.surface1Dark : palette.bgLight));
    root.style.setProperty("--color-surface-2", isPoison ? POISON_RED.s2 : (effectiveDark ? palette.surface2Dark : palette.primaryContainerLight));
    root.style.setProperty("--color-surface-3", isPoison ? POISON_RED.s3 : (effectiveDark ? palette.surface3Dark : palette.bgLight));
    root.style.setProperty("--color-surface-4", isPoison ? POISON_RED.s4 : (effectiveDark ? palette.surface4Dark : palette.primaryContainerLight));
    root.style.setProperty("--color-surface-5", isPoison ? POISON_RED.s5 : (effectiveDark ? palette.surface5Dark : palette.primaryContainerLight));

    // Stage background
    document.documentElement.style.setProperty("--stage-bg", isPoison ? POISON_RED.bg : (effectiveDark ? palette.bgDark : "#e0e0e0"));
  }, [themeMode, palette, route]);

  // Wrap wizard navigation for screens (each screen receives inline handlers below).
  const routeIndex = ROUTE_ORDER.indexOf(route);
  const info = ROUTE_LABELS[route] || "Unknown";
  const desc = ROUTE_DESCRIPTIONS[route] || "";

  return (
    <DeviceThemeProvider storageKey="setup-wizard-theme" initialTheme="dark">
      <Stage
        leftPanel={
          <>
            <PanelBadge>prototype</PanelBadge>
            <PanelTitle>Setup Wizard</PanelTitle>
            <PanelDesc>
              An animated 15-route setup wizard for an anime app. Material 3
              Expressive with a lime (#b3f35a) primary color and switchable
              palettes. Hash routing (#welcome, #theme, …) like the anime
              app. Theme selection with a mini live preview, folder
              selection, permissions, a full backup-restore flow with anime
              linking, an ad-preferences (&quot;Choose Your Poison&quot;)
              step, and a setup complete screen.
            </PanelDesc>
            <div className="tags">
              <span className="tag">Material 3</span>
              <span className="tag">Animated</span>
              <span className="tag">Hash routing</span>
            </div>
          </>
        }
        rightPanel={
          <>
            <PanelHead>Step info</PanelHead>
            <div className="screeninfo">
              <span className="screeninfo__name">{info}</span>
              <span className="screeninfo__desc">{desc}</span>
            </div>

            <PanelHead>Progress</PanelHead>
            <div className="mini-bars">
              {ROUTE_ORDER.map((r, i) => (
                <div key={`${r}-${i}`} className="mini-bar-row">
                  <span className="mini-bar-label">{ROUTE_LABELS[r]}</span>
                  <div className="mini-bar-track">
                    <div
                      className="mini-bar-fill"
                      style={{
                        width: i <= routeIndex ? "100%" : "0%",
                        background: i <= routeIndex ? "var(--color-primary)" : "var(--muted)",
                        transition: "width 0.4s var(--ease-emphasized)",
                      }}
                    />
                  </div>
                  <span className="mini-bar-num">{i + 1}</span>
                </div>
              ))}
            </div>

            <PanelHead>Design</PanelHead>
            <div className="kvlist">
              <div className="kvlist__row">
                <span>Theme</span>
                <b>M3 Expressive</b>
              </div>
              <div className="kvlist__row">
                <span>Primary</span>
                <b style={{ color: route === "poison" ? "#ff5252" : palette.primary }}>
                  {route === "poison" ? "#ff5252" : palette.primary}
                </b>
              </div>
              <div className="kvlist__row">
                <span>Mode</span>
                <b>{themeMode}</b>
              </div>
              <div className="kvlist__row">
                <span>Route</span>
                <b>#{route}</b>
              </div>
            </div>
          </>
        }
      >
        <DeviceFrame theme="dark">
          {/* Progress bar — flows in the flex column between status bar and screen */}
          <WizardProgress currentStep={routeIndex} totalSteps={TOTAL_ROUTES} palette={route === "poison" ? { ...palette, primary: "#ff5252" } : palette} />
          <Screen>
            {/* All screens always mounted; visibility via .wizard-step--active.
                Each screen receives `active` + a navigation proxy. */}
            <WelcomeScreen active={route === "welcome"} onNext={() => go("theme")} palette={palette} />
            <ThemeScreen
              active={route === "theme"}
              onNext={() => go("folder")}
              onBack={goBack}
              themeMode={themeMode}
              setThemeMode={wizard.setThemeMode}
              palette={palette}
              setPalette={wizard.setPalette}
            />
            <FolderScreen
              active={route === "folder"}
              onNext={() => go("permissions")}
              onBack={goBack}
              folderSelected={wizard.folderSelected}
              setFolderSelected={wizard.setFolderSelected}
              palette={palette}
            />
            <PermissionsScreen
              active={route === "permissions"}
              onNext={() => go("restore")}
              onBack={goBack}
              permissions={wizard.permissions}
              togglePermission={wizard.togglePermission}
              palette={palette}
            />
            <RestoreScreen
              active={route === "restore"}
              onNext={() => go("format")}
              onBack={goBack}
              onSkip={() => go("finish")}
              palette={palette}
            />
            <FormatNotSupportedScreen
              active={route === "format"}
              onNext={() => go("processing")}
              onBack={goBack}
              palette={palette}
            />
            <ProcessingBackupScreen
              active={route === "processing"}
              onNext={() => go("summary")}
              palette={palette}
            />
            <BackupSummaryScreen
              active={route === "summary"}
              onNext={() => go("linking")}
              onCancel={() => go("format")}
              onBack={goBack}
              palette={palette}
            />
            <LinkingAnimeScreen
              active={route === "linking"}
              onNext={() => go("manual")}
              onBack={goBack}
              palette={palette}
              linkedAnime={wizard.linkedAnime}
              onUnlink={wizard.unlinkAnime}
            />
            <ManualLinkingScreen
              active={route === "manual"}
              onNext={() => go("restore-summary")}
              onBack={goBack}
              palette={palette}
              linkedAnime={wizard.linkedAnime}
              onLink={wizard.linkAnime}
            />
            <RestoreSummaryScreen
              active={route === "restore-summary"}
              onNext={() => go("restore-processing")}
              onBack={goBack}
              palette={palette}
              linkedAnime={wizard.linkedAnime}
            />
            <RestoreProcessingScreen
              active={route === "restore-processing"}
              onNext={() => go("restore-success")}
              palette={palette}
              linkedAnime={wizard.linkedAnime}
            />
            <RestoreSuccessfulScreen
              active={route === "restore-success"}
              onNext={() => go("poison")}
              palette={palette}
              linkedAnime={wizard.linkedAnime}
            />
            <PoisonScreen
              active={route === "poison"}
              onNext={() => go("finish")}
              onBack={goBack}
              adSettings={wizard.adSettings}
              updateAdSettings={wizard.updateAdSettings}
            />
            <FinishScreen
              active={route === "finish"}
              onRestart={() => {
                wizard.reset();
                go("welcome");
              }}
              palette={palette}
              themeMode={themeMode}
              folderSelected={wizard.folderSelected}
              adSettings={wizard.adSettings}
              linkedAnime={wizard.linkedAnime}
            />
          </Screen>
        </DeviceFrame>
      </Stage>
    </DeviceThemeProvider>
  );
}
