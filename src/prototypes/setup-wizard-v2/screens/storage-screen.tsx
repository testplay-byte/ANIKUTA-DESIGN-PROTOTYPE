"use client";

/**
 * StorageScreen — Folder selection for anime library.
 * Shows a select-folder button, transitions to a success card,
 * then auto-advances after 1.5s.
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

export function StorageScreen({
  active,
  onNext,
  folderSelected,
  folderPath,
  setFolderSelected,
}: StorageScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  // Auto-advance 1.5s after folder selection
  useEffect(() => {
    if (folderSelected && active) {
      const t = setTimeout(() => {
        setShowSuccess(true);
      }, 200);
      const t2 = setTimeout(() => {
        onNext();
      }, 1700);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }
  }, [folderSelected, active, onNext]);

  const handleSelectFolder = useCallback(() => {
    setFolderSelected(true);
  }, [setFolderSelected]);

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-content">
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
              <linearGradient id="storage-grad" x1="40" y1="30" x2="150" y2="150">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <circle cx="90" cy="90" r="75" fill="url(#storage-grad)" />
            <rect
              x="35" y="65" width="110" height="75" rx="10"
              fill="var(--color-surface-3)"
              stroke="var(--color-primary)" strokeWidth="1.5"
            />
            <path
              d="M50 65 L50 52 Q50 47 55 47 L78 47 Q83 47 85 52 L88 65"
              fill="var(--color-surface-3)"
              stroke="var(--color-primary)" strokeWidth="1.5"
            />
            <line x1="52" y1="88" x2="128" y2="88" stroke="var(--color-primary)" strokeWidth="1" opacity="0.3" />
            <line x1="52" y1="100" x2="110" y2="100" stroke="var(--color-primary)" strokeWidth="1" opacity="0.2" />
            <line x1="52" y1="112" x2="120" y2="112" stroke="var(--color-primary)" strokeWidth="1" opacity="0.15" />
            <polygon
              points="110,78 110,98 126,88"
              fill="var(--color-primary)" opacity="0.6"
            />
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
          ) : (
            <div
              className="wv-file-card"
              style={{
                animation: showSuccess
                  ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) backwards"
                  : "wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) backwards",
              }}
            >
              <div className="wv-file-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="wv-file-card__info">
                <p className="wv-file-card__name">Anime</p>
                <p className="wv-file-card__detail">{folderPath}</p>
              </div>
              <div className="wv-file-card__check">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" style={{
                    strokeDasharray: 30,
                    strokeDashoffset: 30,
                    animation: showSuccess
                      ? "wvCheckDraw 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.2s forwards"
                      : "wvCheckDraw 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) forwards",
                  }} />
                </svg>
              </div>
            </div>
          )}
        </div>

        {folderSelected && (
          <div
            className="wv-actions"
            style={{ justifyContent: "center" }}
          >
            <div className="wv-loading-pill">
              <span className="wv-dots">
                <span /><span /><span />
              </span>
              Proceeding
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
