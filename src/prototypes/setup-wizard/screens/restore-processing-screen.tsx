"use client";

/**
 * setup-wizard / screens / restore-processing-screen — Step 11 (#restore-processing).
 *
 * NEW screen (added per user request): when the user clicks "Restore Now" on
 * the restore-summary screen, this screen shows a proper processing animation
 * (previously there was NO animation), then auto-advances to #restore-success.
 */
import { useEffect, useState } from "react";
import type { ThemePalette } from "../lib/themes";
import type { LinkedAnime } from "../hooks/use-wizard-state";
import { RestoreProcessingVisual } from "../components/restore-processing-visual";

interface RestoreProcessingScreenProps {
  active: boolean;
  onNext: () => void;
  palette: ThemePalette;
  linkedAnime: LinkedAnime[];
}

const STATUS_MESSAGES = [
  "Writing anime to your library…",
  "Restoring watch history…",
  "Applying settings…",
  "Finalizing restore…",
];

export function RestoreProcessingScreen({ active, onNext, palette, linkedAnime }: RestoreProcessingScreenProps) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    if (!active) {
      setMsgIdx(0);
      return;
    }
    // Cycle through status messages.
    const msgTimer = setInterval(() => {
      setMsgIdx((i) => Math.min(i + 1, STATUS_MESSAGES.length - 1));
    }, 900);
    // Auto-advance after the full sequence (~3.2s).
    const doneTimer = setTimeout(() => onNext(), 3200);
    return () => {
      clearInterval(msgTimer);
      clearTimeout(doneTimer);
    };
  }, [active, onNext]);

  const restoredCount = linkedAnime.filter((a) => a.linked).length + 239;

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow">Backup Restore</p>
          <h1 className="wizard-screen-title">Restoring your library</h1>
          <p className="wizard-screen-sub">Please wait while we restore {restoredCount} anime to your library.</p>
        </div>

        <div className="restore-processing-visual" key={active ? "on" : "off"}>
          <RestoreProcessingVisual palette={palette} />
        </div>

        <div className="wizard-body">
          <span className="scanning-pill" style={{ background: `${palette.primary}22`, color: palette.primary, alignSelf: "center", transition: "opacity 0.4s ease" }}>
            <span className="scanning-dots"><span /><span /><span /></span>
            {STATUS_MESSAGES[msgIdx]}
          </span>
        </div>
      </div>
      <div className="wizard-actions">
        <span className="wizard-btn wizard-btn--ghost" style={{ cursor: "default", color: "var(--color-text-muted)", fontWeight: 800 }}>
          Restoring…
        </span>
      </div>
    </div>
  );
}
