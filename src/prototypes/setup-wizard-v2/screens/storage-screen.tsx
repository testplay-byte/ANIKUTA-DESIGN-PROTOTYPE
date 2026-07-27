"use client";

import { useEffect, useState, useCallback } from "react";

interface StorageScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  folderSelected: boolean;
  folderPath: string;
  setFolderSelected: (s: boolean) => void;
}

export function StorageScreen({ active, onNext, onBack, folderSelected, folderPath, setFolderSelected }: StorageScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  useEffect(() => {
    if (!scanning) return;
    const t = setTimeout(() => setScanning(false), 1500);
    return () => clearTimeout(t);
  }, [scanning]);

  const handleSelectFolder = useCallback(() => {
    if (folderSelected) {
      setFolderSelected(false);
      setTimeout(() => {
        setFolderSelected(true);
        setScanning(true);
      }, 100);
    } else {
      setFolderSelected(true);
      setScanning(true);
    }
  }, [folderSelected, setFolderSelected]);

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-content" style={{ paddingTop: "var(--sp-4)" }}>
        {/* Folder illustration with floating files */}
        <div
          className="wv-illustration wv-illustration--lg"
          style={{
            animation: mounted
              ? "wvFloat 4.5s ease-in-out infinite, wvScaleIn 0.6s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards"
              : "none",
          }}
        >
          <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="sf-glow" cx="50%" cy="60%" r="40%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="110" cy="140" r="64" fill="url(#sf-glow)" />

            {/* Floating file cards (behind folder) — 3 files */}
            {/* File 1 — left */}
            <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvFloat 4s ease-in-out infinite 0.5s" }}>
              <rect x="42" y="44" width="40" height="52" rx="5" fill="var(--color-surface-3)" stroke="var(--color-primary)" strokeWidth="1.2" />
              <rect x="49" y="53" width="26" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.5" />
              <rect x="49" y="60" width="20" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.35" />
              <rect x="49" y="67" width="23" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.35" />
              <rect x="49" y="78" width="26" height="8" rx="2" fill="var(--color-tertiary)" opacity="0.3" />
            </g>

            {/* File 2 — right */}
            <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvFloat 4.5s ease-in-out infinite 1s" }}>
              <rect x="130" y="36" width="40" height="52" rx="5" fill="var(--color-surface-4)" stroke="var(--color-tertiary)" strokeWidth="1.2" />
              <rect x="137" y="45" width="26" height="3" rx="1.5" fill="var(--color-tertiary)" opacity="0.5" />
              <rect x="137" y="52" width="20" height="3" rx="1.5" fill="var(--color-tertiary)" opacity="0.35" />
              <rect x="137" y="59" width="23" height="3" rx="1.5" fill="var(--color-tertiary)" opacity="0.35" />
              <rect x="137" y="70" width="26" height="8" rx="2" fill="var(--color-secondary)" opacity="0.3" />
            </g>

            {/* File 3 — top center */}
            <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvFloat 5s ease-in-out infinite 1.5s" }}>
              <rect x="85" y="30" width="40" height="52" rx="5" fill="var(--color-surface-5)" stroke="var(--color-primary)" strokeWidth="1.2" />
              <circle cx="105" cy="46" r="6" fill="var(--color-primary)" opacity="0.5" />
              <rect x="91" y="58" width="28" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.4" />
              <rect x="91" y="65" width="22" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.3" />
              <rect x="91" y="72" width="25" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.3" />
            </g>

            {/* Folder body */}
            <g style={{ transformBox: "fill-box", transformOrigin: "110px 160px", animation: "wvFloat 3.6s ease-in-out infinite" }}>
              {/* Folder back (tab) */}
              <path d="M 44 118 L 44 188 Q 44 194 50 194 L 170 194 Q 176 194 176 188 L 176 124 L 100 124 L 92 118 Z"
                fill="var(--color-primary-container)" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" />
              {/* Folder front flap */}
              <path d="M 44 136 L 92 136 L 100 142 L 176 142 L 176 188 Q 176 194 170 194 L 50 194 Q 44 194 44 188 Z"
                fill="var(--color-primary)" opacity="0.92" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" />
              {/* Folder highlight */}
              <path d="M 52 140 L 88 140" stroke="var(--color-on-primary)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
              {/* Seam */}
              <path d="M 44 136 L 92 136 L 100 142 L 176 142" fill="none" stroke="var(--color-on-primary)" strokeWidth="1" opacity="0.12" />
              {/* Content lines */}
              <path d="M 60 158 L 162 158" stroke="var(--color-on-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
              <path d="M 60 168 L 142 168" stroke="var(--color-on-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.12" />
              <path d="M 60 178 L 152 178" stroke="var(--color-on-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.1" />
            </g>

            {/* Success checkmark badge */}
            {folderSelected && !scanning && (
              <g style={{ animation: "wvScaleIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) backwards" }}>
                <circle cx="168" cy="126" r="20" fill="var(--color-primary)" stroke="var(--color-bg)" strokeWidth="3" />
                <path d="M 159 126 L 166 133 L 177 122" stroke="var(--color-on-primary)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>
            )}

            {/* Scanning badge */}
            {scanning && (
              <g style={{ animation: "wvScaleIn 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) backwards" }}>
                <circle cx="168" cy="126" r="18" fill="var(--color-primary)" opacity="0.15" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="6 4" style={{ animation: "wvRotate 1.5s linear infinite" }} />
              </g>
            )}

            {/* Sparkles */}
            <circle cx="30" cy="90" r="2" fill="var(--color-primary)" opacity="0.4" style={{ animation: "wvPulse 2s ease-in-out infinite" }} />
            <circle cx="190" cy="100" r="2" fill="var(--color-tertiary)" opacity="0.3" style={{ animation: "wvPulse 2.5s ease-in-out infinite 0.7s" }} />
            <circle cx="185" cy="50" r="1.5" fill="var(--color-primary)" opacity="0.25" style={{ animation: "wvPulse 3s ease-in-out infinite 1.2s" }} />
          </svg>
        </div>

        <h1
          className="wv-title wv-title--page"
          style={{ animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s backwards" : "none" }}
        >
          Storage
        </h1>

        <p
          className="wv-subtitle"
          style={{ animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.35s backwards" : "none" }}
        >
          Select where your anime files are stored
        </p>

        <div style={{ width: "100%", maxWidth: 320, animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.45s backwards" : "none" }}>
          {!folderSelected ? (
            <button className="wv-btn wv-btn--outline wv-btn--sm" onClick={handleSelectFolder} style={{ width: "100%" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              Select Folder
            </button>
          ) : (
            <button className="wv-file-card" onClick={handleSelectFolder} style={{
              border: "1px solid var(--color-outline-variant)",
              cursor: "pointer",
              animation: scanning ? "wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) backwards" : "wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) backwards",
              background: "var(--color-surface-2)",
              borderRadius: 12,
              padding: "var(--sp-3) var(--sp-4)",
              display: "flex",
              alignItems: "center",
              gap: "var(--sp-3)",
              width: "100%",
              textAlign: "left",
            }}>
              <div className="wv-file-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="wv-file-card__info">
                <p className="wv-file-card__name">Anime</p>
                <p className="wv-file-card__detail">{scanning ? "Scanning..." : `${folderPath} · 247 items · ready`}</p>
              </div>
              {scanning ? (
                <div className="wv-loading-pill" style={{ fontSize: 10 }}>
                  <span className="wv-dots"><span /><span /><span /></span>
                </div>
              ) : (
                <div style={{ color: "var(--color-primary)", flex: "0 0 auto" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: "wvCheckDraw 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s forwards" }} />
                  </svg>
                </div>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Back and Continue buttons — always visible */}
      <div className="wv-actions">
        <button className="wv-btn wv-btn--ghost" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back
        </button>
        {scanning ? (
          <span className="wv-btn wv-btn--primary" style={{ opacity: 0.5, cursor: "not-allowed" }}>
            Scanning...
          </span>
        ) : (
          <button className="wv-btn wv-btn--primary" onClick={onNext} disabled={!folderSelected} style={{ opacity: folderSelected ? 1 : 0.4 }}>
            Continue
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
