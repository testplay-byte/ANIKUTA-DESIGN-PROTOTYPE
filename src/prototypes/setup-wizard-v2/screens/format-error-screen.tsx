"use client";

import { useEffect, useState } from "react";

interface FormatErrorScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function FormatErrorScreen({ active, onNext, onBack }: FormatErrorScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-content" style={{ paddingTop: "var(--sp-6)", gap: "var(--sp-4)" }}>
        {/* Error triangle animation */}
        <div style={{
          width: 100, height: 100, position: "relative",
          animation: mounted ? "wvScaleIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
        }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle, #E6912C20 0%, transparent 70%)",
          }} />
          <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
            <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvPulse 2s ease-in-out infinite" }}>
              <path d="M50 15 L88 78 L12 78 Z" fill="#E6912C18" stroke="#E6912C" strokeWidth="2.5" strokeLinejoin="round" />
              <line x1="50" y1="38" x2="50" y2="55" stroke="#E6912C" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="65" r="2" fill="#E6912C" />
            </g>
          </svg>
        </div>

        <h1 className="wv-title" style={{
          color: "#E6912C",
          animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s backwards" : "none",
        }}>
          Format Not Supported
        </h1>

        <p className="wv-subtitle" style={{
          animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.35s backwards" : "none",
        }}>
          The selected backup file format is not recognized
        </p>

        {/* File details card */}
        <div className="wv-card" style={{
          maxWidth: 300, width: "100%",
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.45s backwards" : "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", marginBottom: "var(--sp-3)" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "#E6912C18", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E6912C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text)", margin: 0 }}>anikuta_backup_2025-07-27.abk</p>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)", margin: "2px 0 0" }}>ANIKUTA Backup File</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
            {[
              { label: "File Size", value: "24.7 MB" },
              { label: "File Type", value: ".abk (ANIKUTA Backup)" },
              { label: "File Number", value: "1 of 1" },
            ].map((row) => (
              <div key={row.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "var(--sp-2) 0",
                borderTop: "1px solid var(--color-outline-variant)",
              }}>
                <span style={{ fontSize: 12, color: "var(--color-text-muted)", fontWeight: 500 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: "var(--color-text)", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning disclaimer */}
        <div className="wv-manga-disclaimer" style={{
          maxWidth: 300, width: "100%",
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.55s backwards" : "none",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: "#E6912C18", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E6912C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#E6912C", margin: 0 }}>Warning</p>
            <p style={{ fontSize: 11, color: "var(--color-text-muted)", margin: "2px 0 0", lineHeight: 1.5 }}>
              This file may be from a newer version of ANIKUTA. Attempting to restore may cause data loss.
            </p>
          </div>
        </div>
      </div>

      <div className="wv-actions">
        <button className="wv-btn wv-btn--ghost" onClick={onBack}>Back</button>
        <button className="wv-btn wv-btn--primary" onClick={onNext} style={{ background: "#E6912C", color: "#FFF", boxShadow: "0 4px 20px rgba(230, 145, 44, 0.3)" }}>
          Try to Restore It
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
