"use client";

/**
 * BackupRestoreScreen — Restore from file ONLY (no backup button).
 * Beautiful scanning/processing animation with particle effects.
 */

import { useEffect, useState } from "react";

interface BackupRestoreScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  restoreInitiated: boolean;
  restoreComplete: boolean;
  setRestoreInitiated: (s: boolean) => void;
  setRestoreComplete: (c: boolean) => void;
}

export function BackupRestoreScreen({
  active,
  onNext,
  onSkip,
  restoreInitiated,
  restoreComplete,
  setRestoreInitiated,
  setRestoreComplete,
}: BackupRestoreScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [scanPhase, setScanPhase] = useState(0); // 0-3 phases of scanning

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  // Phase animation during processing
  useEffect(() => {
    if (!processing) return;
    const interval = setInterval(() => {
      setScanPhase((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setTimeout(() => {
            setProcessing(false);
            setRestoreInitiated(true);
            setRestoreComplete(true);
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [processing, setRestoreInitiated, setRestoreComplete]);

  const handleRestore = () => {
    setProcessing(true);
    setScanPhase(0);
  };

  const SCAN_LABELS = [
    "Reading backup file...",
    "Validating data integrity...",
    "Processing entries...",
    "Almost done...",
  ];

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-content" style={{ paddingTop: "var(--sp-6)" }}>
        {/* Restore illustration */}
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
              <radialGradient id="rs-glow" cx="50%" cy="50%" r="45%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="rs-ring" x1="0" y1="0" x2="220" y2="220">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            <circle cx="110" cy="110" r="90" fill="url(#rs-glow)" />

            {/* Rotating scan ring */}
            <circle
              cx="110" cy="110" r="80"
              stroke="url(#rs-ring)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="20 40"
              style={{ animation: processing ? "wvRotate 2s linear infinite" : "wvRotate 25s linear infinite" }}
            />

            {/* Inner ring */}
            <circle cx="110" cy="110" r="60" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 8">
              <animateTransform attributeName="transform" type="rotate" from="360 110 110" to="0 110 110" dur="30s" repeatCount="indefinite" />
            </circle>

            {/* Backup file icon */}
            <rect x="85" y="65" width="50" height="65" rx="6" fill="var(--color-surface-3)" stroke="var(--color-primary)" strokeWidth="1.5" />
            <path d="M115 65 L135 85 L115 85 Z" fill="var(--color-surface-3)" stroke="var(--color-primary)" strokeWidth="1.5" />
            <rect x="95" y="85" width="30" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.3" />
            <rect x="95" y="93" width="25" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.2" />
            <rect x="95" y="101" width="20" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.15" />
            <rect x="95" y="115" width="30" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.1" />

            {/* Restore arrow */}
            <g style={{ animation: processing ? "wvPulse 1.2s ease-in-out infinite" : "none" }}>
              <path d="M110 150 L110 165" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
              <polyline points="102 158 110 167 118 158" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Particles */}
            {processing && (
              <>
                <circle cx="155" cy="75" r="3" fill="var(--color-primary)" opacity="0.6" style={{ animation: "wvParticleFade 0.8s ease-in-out infinite" }} />
                <circle cx="65" cy="140" r="2.5" fill="var(--color-primary)" opacity="0.4" style={{ animation: "wvParticleFade 0.8s ease-in-out infinite 0.3s" }} />
                <circle cx="170" cy="130" r="2" fill="var(--color-secondary)" opacity="0.4" style={{ animation: "wvParticleFade 0.8s ease-in-out infinite 0.5s" }} />
                <circle cx="50" cy="85" r="2" fill="var(--color-primary)" opacity="0.3" style={{ animation: "wvParticleFade 0.8s ease-in-out infinite 0.2s" }} />
              </>
            )}

            {/* Orbiting dots */}
            <circle cx="175" cy="60" r="3" fill="var(--color-primary)" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="45" cy="160" r="2.5" fill="var(--color-secondary)" opacity="0.3">
              <animate attributeName="opacity" values="0.15;0.45;0.15" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {!processing && !restoreComplete && (
          <>
            <h1
              className="wv-title"
              style={{
                animation: mounted
                  ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s backwards"
                  : "none",
              }}
            >
              Restore Backup
            </h1>

            <p
              className="wv-subtitle"
              style={{
                animation: mounted
                  ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.35s backwards"
                  : "none",
              }}
            >
              Import a previous ANIKUTA backup to restore your library, history, and settings
            </p>

            {/* File picker card */}
            <div
              className="wv-card"
              style={{
                maxWidth: 300,
                width: "100%",
                animation: mounted
                  ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.45s backwards"
                  : "none",
              }}
            >
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
                  <h3 className="wv-card__title">Select Backup File</h3>
                  <p className="wv-card__desc">Choose an .abk backup file</p>
                </div>
              </div>
              <button className="wv-btn wv-btn--primary wv-btn--sm" onClick={handleRestore} style={{ width: "100%" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                Restore from File
              </button>
            </div>
          </>
        )}

        {processing && (
          <>
            <div
              className="wv-loading-pill"
              style={{
                animation: "wvScaleIn 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) backwards",
              }}
            >
              <span className="wv-dots"><span /><span /><span /></span>
              {SCAN_LABELS[Math.min(scanPhase, SCAN_LABELS.length - 1)]}
            </div>
            {/* Phase progress dots */}
            <div style={{ display: "flex", gap: 8, marginTop: "var(--sp-2)" }}>
              {[0, 1, 2, 3].map((phase) => (
                <div
                  key={phase}
                  style={{
                    width: phase < scanPhase ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: phase < scanPhase ? "var(--color-primary)" : "var(--color-surface-4)",
                    transition: "all 0.3s var(--ease-emphasized)",
                  }}
                />
              ))}
            </div>
          </>
        )}

        {restoreComplete && !processing && (
          <>
            <div
              className="wv-badge"
              style={{
                animation: mounted
                  ? "wvScaleIn 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards"
                  : "none",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Backup Restored
            </div>
            <p
              className="wv-subtitle"
              style={{
                animation: mounted
                  ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.2s backwards"
                  : "none",
              }}
            >
              Your data has been restored successfully
            </p>
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
