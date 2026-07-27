"use client";

/**
 * RestoreSummaryScreen — Shows backup restore stats with manga disclaimer.
 * Categories breakdown, file info, and prominent manga warning.
 */

import { useEffect, useState } from "react";
import { MOCK_BACKUP } from "../hooks/use-wizard-state";

interface RestoreSummaryScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function RestoreSummaryScreen({ active, onNext, onBack }: RestoreSummaryScreenProps) {
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
      <div className="wv-scroll">
        {/* Header */}
        <div style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.06s backwards" : "none" }}>
          <div className="wv-section-header" style={{ padding: 0 }}>Restore Summary</div>
          <p style={{ fontSize: "var(--fs-body)", color: "var(--color-text-muted)", margin: "0 0 var(--sp-1)", lineHeight: 1.5 }}>
            Review your restored data
          </p>
        </div>

        {/* Stats grid */}
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

        {/* Category breakdown */}
        <div className="wv-card" style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.3s backwards" : "none" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Categories
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)", marginTop: "var(--sp-2)" }}>
            {MOCK_BACKUP.categories.map((cat, i) => (
              <div key={cat.name} className="wv-category" style={{ animation: `wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.4 + i * 0.06}s backwards` }}>
                <span className="wv-category__name">{cat.name}</span>
                <span className="wv-category__count">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Backup file info */}
        <div className="wv-file-card" style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.6s backwards" : "none" }}>
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

        {/* Manga disclaimer */}
        <div
          className="wv-manga-disclaimer"
          style={{
            animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.7s backwards" : "none",
          }}
        >
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "#E6912C18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E6912C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#E6912C", margin: 0 }}>
              Manga Disclaimer
            </p>
            <p style={{ fontSize: 11, color: "var(--color-text-muted)", margin: "2px 0 0", lineHeight: 1.5 }}>
              Mangas were not included in this backup. If you had manga data previously, it will need to be re-imported separately.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="wv-actions">
        <button className="wv-btn wv-btn--ghost" onClick={onBack}>
          Back
        </button>
        <button className="wv-btn wv-btn--primary" onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
}
