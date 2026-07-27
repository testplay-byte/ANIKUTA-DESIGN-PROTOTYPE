"use client";

/**
 * BackupRestoreScreen — Create backup or restore from file.
 * Two action cards with processing animation and stats summary.
 */

import { useEffect, useState } from "react";
import { MOCK_BACKUP } from "../hooks/use-wizard-state";

interface BackupRestoreScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  backupSelected: boolean;
  restoreComplete: boolean;
  setBackupSelected: (s: boolean) => void;
  setRestoreComplete: (c: boolean) => void;
}

export function BackupRestoreScreen({
  active,
  onNext,
  onSkip,
  backupSelected,
  restoreComplete,
  setBackupSelected,
  setRestoreComplete,
}: BackupRestoreScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  const handleBackup = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setBackupSelected(true);
      setRestoreComplete(true);
    }, 2000);
  };

  const handleRestore = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setBackupSelected(true);
      setRestoreComplete(true);
    }, 2000);
  };

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-scroll">
        <div style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.06s backwards" : "none" }}>
          <div className="wv-section-header" style={{ padding: 0 }}>Backup & Restore</div>
          <p style={{ fontSize: "var(--fs-body)", color: "var(--color-text-muted)", margin: "0 0 var(--sp-1)", lineHeight: 1.5 }}>
            Create a backup or restore from a previous one
          </p>
        </div>

        {processing ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "var(--sp-8) 0", gap: "var(--sp-4)", animation: "wvScaleIn 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) backwards" }}>
            <div style={{ width: 56, height: 56, position: "relative" }}>
              <svg width="56" height="56" viewBox="0 0 56 56" style={{ animation: "wvRotate 1.2s linear infinite", transformOrigin: "center center" }}>
                <circle cx="28" cy="28" r="24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeDasharray="100 50" opacity="0.3" />
                <circle cx="28" cy="28" r="24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeDasharray="30 120" />
              </svg>
            </div>
            <div className="wv-loading-pill">
              <span className="wv-dots"><span /><span /><span /></span>
              Processing backup
            </div>
          </div>
        ) : restoreComplete ? (
          <>
            <div className="wv-stats-grid" style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.12s backwards" : "none" }}>
              <div className="wv-stat" style={{ animation: "wvStatIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.15s backwards" }}>
                <span className="wv-stat__value">{MOCK_BACKUP.totalItems}</span>
                <span className="wv-stat__label">Total Items</span>
              </div>
              <div className="wv-stat" style={{ animation: "wvStatIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s backwards" }}>
                <span className="wv-stat__value">{MOCK_BACKUP.categories.length}</span>
                <span className="wv-stat__label">Categories</span>
              </div>
            </div>
            <div className="wv-card" style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.3s backwards" : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
                {MOCK_BACKUP.categories.map((cat, i) => (
                  <div key={cat.name} className="wv-category" style={{ animation: `wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.4 + i * 0.06}s backwards` }}>
                    <span className="wv-category__name">{cat.name}</span>
                    <span className="wv-category__count">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="wv-file-card" style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.5s backwards" : "none" }}>
              <div className="wv-file-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div className="wv-file-card__info">
                <p className="wv-file-card__name">{MOCK_BACKUP.fileName}</p>
                <p className="wv-file-card__detail">{MOCK_BACKUP.date}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="wv-card" style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.15s backwards" : "none" }}>
              <div className="wv-card__header">
                <div className="wv-card__icon">
                  <div className="wv-card__icon-bg">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 16 4 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="wv-card__title">Create Backup</h3>
                  <p className="wv-card__desc">Save your library, history, and settings</p>
                </div>
              </div>
              <button className="wv-btn wv-btn--primary wv-btn--sm" onClick={handleBackup} style={{ width: "100%" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Backup
              </button>
            </div>
            <div className="wv-card" style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s backwards" : "none" }}>
              <div className="wv-card__header">
                <div className="wv-card__icon">
                  <div className="wv-card__icon-bg">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="wv-card__title">Restore from File</h3>
                  <p className="wv-card__desc">Import a previous ANIKUTA backup</p>
                </div>
              </div>
              <button className="wv-btn wv-btn--outline wv-btn--sm" onClick={handleRestore} style={{ width: "100%" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Restore from File
              </button>
            </div>
          </>
        )}
      </div>

      {!processing && (
        <div className="wv-actions">
          <button className="wv-btn wv-btn--ghost" onClick={onSkip}>Skip</button>
          <button className="wv-btn wv-btn--primary" onClick={onNext} disabled={!restoreComplete}>Continue</button>
        </div>
      )}
    </div>
  );
}
