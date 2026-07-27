"use client";

/**
 * StorageScreen — Folder selection for anime library.
 * Shows folder browser with file types, animated file scanning,
 * then success card with file count stats.
 */

import { useEffect, useState, useCallback } from "react";

interface StorageScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  folderSelected: boolean;
  folderPath: string;
  setFolderSelected: (s: boolean) => void;
}

const FILE_TYPES = [
  { ext: "MKV", color: "#B1F256" },
  { ext: "MP4", color: "#EFB8C8" },
  { ext: "AVI", color: "#CCC2DC" },
  { ext: "SRT", color: "#A0D4F5" },
  { ext: "ASS", color: "#F5D8A0" },
];

const MOCK_FOLDERS = [
  { name: "Attack on Titan", count: 87 },
  { name: "Jujutsu Kaisen", count: 48 },
  { name: "Demon Slayer", count: 55 },
  { name: "One Piece", count: 112 },
  { name: "My Hero Academia", count: 138 },
  { name: "Chainsaw Man", count: 24 },
  { name: "Spy x Family", count: 37 },
];

export function StorageScreen({
  active,
  onNext,
  onBack,
  folderSelected,
  folderPath,
  setFolderSelected,
}: StorageScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [discoveredFiles, setDiscoveredFiles] = useState(0);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  // Scanning animation after folder select
  useEffect(() => {
    if (folderSelected && active && !scanning) {
      setScanning(true);
      setScanProgress(0);
      setDiscoveredFiles(0);
    }
  }, [folderSelected, active, scanning]);

  useEffect(() => {
    if (!scanning) return;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + Math.random() * 12 + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onNext(), 600);
          return 100;
        }
        return next;
      });
      setDiscoveredFiles((prev) => prev + Math.floor(Math.random() * 15) + 3);
    }, 200);
    return () => clearInterval(interval);
  }, [scanning, onNext]);

  const handleSelectFolder = useCallback(() => {
    setFolderSelected(true);
  }, [setFolderSelected]);

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-content" style={{ paddingTop: "var(--sp-4)" }}>
        {/* Storage illustration */}
        <div
          className="wv-illustration"
          style={{
            animation: mounted
              ? "wvFloat 4.5s ease-in-out infinite, wvScaleIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards"
              : "none",
          }}
        >
          <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="st-grad" x1="40" y1="30" x2="150" y2="150">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <circle cx="90" cy="90" r="75" fill="url(#st-grad)" />
            {/* Folder */}
            <rect x="32" y="62" width="116" height="80" rx="12" fill="var(--color-surface-3)" stroke="var(--color-primary)" strokeWidth="1.5" />
            <path d="M48 62 L48 50 Q48 45 53 45 L78 45 Q83 45 85 50 L88 62" fill="var(--color-surface-3)" stroke="var(--color-primary)" strokeWidth="1.5" />
            {/* File lines */}
            <rect x="52" y="78" width="76" height="8" rx="4" fill="var(--color-primary)" opacity="0.25" />
            <rect x="52" y="92" width="60" height="6" rx="3" fill="var(--color-primary)" opacity="0.15" />
            <rect x="52" y="104" width="68" height="6" rx="3" fill="var(--color-primary)" opacity="0.1" />
            <rect x="52" y="116" width="50" height="6" rx="3" fill="var(--color-primary)" opacity="0.08" />
            {/* File type badges */}
            <rect x="100" y="72" width="28" height="14" rx="4" fill="#B1F256" opacity="0.3" />
            <text x="114" y="82" textAnchor="middle" fill="#B1F256" fontSize="7" fontWeight="700">MKV</text>
            <rect x="100" y="90" width="28" height="14" rx="4" fill="#EFB8C8" opacity="0.3" />
            <text x="114" y="100" textAnchor="middle" fill="#EFB8C8" fontSize="7" fontWeight="700">MP4</text>
          </svg>
        </div>

        <h1
          className="wv-title"
          style={{
            animation: mounted
              ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.2s backwards"
              : "none",
          }}
        >
          Storage
        </h1>

        <p
          className="wv-subtitle"
          style={{
            animation: mounted
              ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.3s backwards"
              : "none",
          }}
        >
          Select where your anime files are stored
        </p>

        {/* File type badges */}
        {!folderSelected && (
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "center",
              animation: mounted
                ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.35s backwards"
                : "none",
            }}
          >
            {FILE_TYPES.map((ft) => (
              <span
                key={ft.ext}
                style={{
                  padding: "3px 10px",
                  borderRadius: 6,
                  background: `${ft.color}18`,
                  border: `1px solid ${ft.color}30`,
                  fontSize: 10,
                  fontWeight: 700,
                  color: ft.color,
                  letterSpacing: "0.03em",
                }}
              >
                .{ft.ext}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            width: "100%",
            maxWidth: 320,
            animation: mounted
              ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.4s backwards"
              : "none",
          }}
        >
          {!folderSelected ? (
            <>
              <button
                className="wv-btn wv-btn--outline wv-btn--sm"
                onClick={handleSelectFolder}
                style={{ width: "100%" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                Select Folder
              </button>
              {/* Folder preview */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginTop: 16,
                  opacity: 0.4,
                }}
              >
                <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 600, textAlign: "left", margin: 0, letterSpacing: "0.03em" }}>
                  EXPECTED FOLDERS
                </p>
                {MOCK_FOLDERS.slice(0, 4).map((folder) => (
                  <div
                    key={folder.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 10px",
                      borderRadius: 8,
                      background: "var(--color-surface-variant-alpha-40)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                      <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{folder.name}</span>
                    </div>
                    <span style={{ fontSize: 10, color: "var(--color-text-subtle)" }}>{folder.count}</span>
                  </div>
                ))}
              </div>
            </>
          ) : scanning ? (
            /* Scanning animation */
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
              {/* Selected folder */}
              <div className="wv-file-card" style={{ animation: "wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) backwards" }}>
                <div className="wv-file-card__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="wv-file-card__info">
                  <p className="wv-file-card__name">Anime</p>
                  <p className="wv-file-card__detail">{folderPath}</p>
                </div>
              </div>

              {/* Progress */}
              <div style={{
                padding: "var(--sp-3)",
                borderRadius: 12,
                background: "var(--color-primary-alpha-12)",
                animation: "wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-primary)" }}>Scanning files...</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-primary)" }}>{Math.min(Math.round(scanProgress), 100)}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: "var(--color-surface-4)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 2,
                      width: `${Math.min(scanProgress, 100)}%`,
                      background: "var(--color-primary)",
                      transition: "width 0.2s linear",
                      boxShadow: "0 0 8px var(--color-primary-alpha-40)",
                    }}
                  />
                </div>
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{discoveredFiles} files found</span>
                  <div className="wv-dots" style={{ gap: 3 }}>
                    <span style={{ width: 4, height: 4 }} /><span style={{ width: 4, height: 4 }} /><span style={{ width: 4, height: 4 }} />
                  </div>
                </div>
              </div>

              {/* Scanning folders list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 120, overflow: "hidden" }}>
                {MOCK_FOLDERS.map((folder, i) => (
                  <div
                    key={folder.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "5px 10px",
                      borderRadius: 8,
                      background: scanProgress > (i + 1) * 14 ? "var(--color-primary-alpha-12)" : "var(--color-surface-variant-alpha-40)",
                      transition: "background 0.3s var(--ease-emphasized)",
                      animation: `wvFadeInUp 0.2s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.2 + i * 0.06}s backwards`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {scanProgress > (i + 1) * 14 ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "wvPulse 1s ease-in-out infinite" }}>
                          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                      )}
                      <span style={{ fontSize: 11, color: "var(--color-text)", fontWeight: 500 }}>{folder.name}</span>
                    </div>
                    <span style={{ fontSize: 10, color: "var(--color-primary)", fontWeight: 700 }}>{folder.count} eps</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
