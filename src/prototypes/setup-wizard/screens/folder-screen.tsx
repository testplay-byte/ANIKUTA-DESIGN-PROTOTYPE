"use client";

/**
 * setup-wizard / screens / folder-screen — Step 2 (#folder).
 *
 * v2 redesign:
 *  - Top-left heading.
 *  - More detailed folder visual (tab, gradient, inner file lines).
 *  - Refined success check badge when selected.
 *  - Smoother, calmer animations.
 */
import { useEffect, useState } from "react";
import type { ThemePalette } from "../lib/themes";
import { FolderVisual } from "../components/visuals";

interface FolderScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  folderSelected: boolean;
  setFolderSelected: (selected: boolean) => void;
  palette: ThemePalette;
}

export function FolderScreen({ active, onNext, onBack, folderSelected, setFolderSelected, palette }: FolderScreenProps) {
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    const t = setTimeout(() => setScanning(false), 1500);
    return () => clearTimeout(t);
  }, [scanning]);

  function handleSelectFolder() {
    setFolderSelected(true);
    setScanning(true);
  }

  const showSelected = folderSelected && !scanning;

  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow">Folder</p>
          <h1 className="wizard-screen-title">
            {folderSelected ? "Folder connected!" : "Select your anime folder"}
          </h1>
          <p className="wizard-screen-sub">
            {folderSelected && scanning && "Scanning your library…"}
            {folderSelected && !scanning && "Your library is ready to go. Continue when you are."}
            {!folderSelected && "Pick the folder where your anime library lives. We'll scan it and organize everything for you."}
          </p>
        </div>

        <div className="wizard-visual" key={`${active ? "on" : "off"}-${folderSelected ? "sel" : "empty"}`}>
          <FolderVisual selected={showSelected} />
        </div>

        <div className="wizard-body">
          {!folderSelected ? (
            <button
              className="wizard-btn wizard-btn--select"
              style={{ color: palette.primary, borderColor: palette.primary, alignSelf: "center" }}
              onClick={handleSelectFolder}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                <path d="M12 10v6M9 13l3 3 3-3" />
              </svg>
              Select Folder
            </button>
          ) : (
            <div
              className="mock-card"
              style={{ animation: "cardEntry 0.4s var(--ease-emphasized-decel) backwards", borderColor: palette.primary, alignSelf: "stretch" }}
            >
              <div className="mock-icon" style={{ background: palette.primaryContainerDark, color: palette.onPrimaryContainer }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                </svg>
              </div>
              <div className="mock-info">
                <p className="mock-title">/storage/anime-library</p>
                <p className="mock-desc">{scanning ? "Scanning…" : "247 items · ready"}</p>
              </div>
              {scanning ? (
                <span className="scanning-pill" style={{ background: `${palette.primary}22`, color: palette.primary }}>
                  <span className="scanning-dots"><span /><span /><span /></span>
                  Scanning
                </span>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" fill={palette.primary} opacity="0.18" />
                  <path d="M7 12.5l3.5 3.5L17 9" stroke={palette.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="wizard-actions">
        <button className="wizard-btn wizard-btn--secondary" onClick={onBack} style={{ fontWeight: 800 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        {scanning ? (
          <span className="wizard-btn wizard-btn--ghost" style={{ cursor: "default", color: "var(--color-text-muted)", fontWeight: 800 }}>
            Scanning…
          </span>
        ) : (
          <button
            className="wizard-btn wizard-btn--primary"
            onClick={onNext}
            disabled={!folderSelected}
            style={{ background: palette.primary, color: palette.onPrimary, fontWeight: 800, opacity: folderSelected ? 1 : 0.4, cursor: folderSelected ? "pointer" : "not-allowed" }}
          >
            Continue
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
