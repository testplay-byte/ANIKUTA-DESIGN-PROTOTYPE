"use client";

/**
 * LinkingSummaryScreen — Shows the results of the linking process.
 * Total anime, linked count, unlinked count, and a list of entries.
 */

import { useEffect, useState } from "react";
import { MOCK_LINKING } from "../hooks/use-wizard-state";

interface LinkingSummaryScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function LinkingSummaryScreen({ active, onNext, onBack }: LinkingSummaryScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  const linkRate = Math.round((MOCK_LINKING.linked / MOCK_LINKING.totalAnime) * 100);

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-scroll">
        {/* Header */}
        <div style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.06s backwards" : "none" }}>
          <div className="wv-section-header" style={{ padding: 0 }}>Linking Summary</div>
          <p style={{ fontSize: "var(--fs-body)", color: "var(--color-text-muted)", margin: "0 0 var(--sp-1)", lineHeight: 1.5 }}>
            Your anime library has been processed
          </p>
        </div>

        {/* Stats */}
        <div className="wv-stats-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.12s backwards" : "none" }}>
          <div className="wv-stat" style={{ animation: "wvStatIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.15s backwards" }}>
            <span className="wv-stat__value">{MOCK_LINKING.totalAnime}</span>
            <span className="wv-stat__label">Total</span>
          </div>
          <div className="wv-stat" style={{ animation: "wvStatIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s backwards" }}>
            <span className="wv-stat__value" style={{ color: "var(--color-primary)" }}>{MOCK_LINKING.linked}</span>
            <span className="wv-stat__label">Linked</span>
          </div>
          <div className="wv-stat" style={{ animation: "wvStatIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.35s backwards" }}>
            <span className="wv-stat__value" style={{ color: "#E6912C" }}>{MOCK_LINKING.unlinked}</span>
            <span className="wv-stat__label">Unlinked</span>
          </div>
        </div>

        {/* Link rate bar */}
        <div
          className="wv-card"
          style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.3s backwards" : "none" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--sp-2)" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Link Rate</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: "var(--color-primary)" }}>{linkRate}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "var(--color-surface-4)", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                borderRadius: 3,
                width: `${linkRate}%`,
                background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
                animation: mounted ? "wvBarGrow 0.8s cubic-bezier(0.05, 0.7, 0.1, 1) 0.5s backwards" : "none",
                boxShadow: "0 0 8px var(--color-primary-alpha-40)",
              }}
            />
          </div>
        </div>

        {/* Anime entries list */}
        <div
          className="wv-card"
          style={{ animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.4s backwards" : "none" }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Anime Entries
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-1)", marginTop: "var(--sp-2)" }}>
            {MOCK_LINKING.entries.map((entry, i) => (
              <div
                key={entry.title}
                className="wv-link-entry"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--sp-3)",
                  padding: "var(--sp-2) var(--sp-3)",
                  borderRadius: 10,
                  background: entry.status === "linked" ? "var(--color-primary-alpha-08)" : "#E6912C10",
                  border: `1px solid ${entry.status === "linked" ? "var(--color-outline-variant)" : "#E6912C25"}`,
                  animation: mounted
                    ? `wvFadeInUp 0.25s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.5 + i * 0.04}s backwards`
                    : "none",
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: entry.status === "linked" ? "var(--color-primary-alpha-12)" : "#E6912C18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "0 0 auto",
                }}>
                  {entry.status === "linked" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E6912C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--color-text)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {entry.title}
                  </p>
                  <p style={{ fontSize: 10, color: "var(--color-text-muted)", margin: "1px 0 0" }}>
                    {entry.episodes > 0 ? `${entry.episodes} episodes · ${entry.source}` : "Not matched"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unlinked notice */}
        {MOCK_LINKING.unlinked > 0 && (
          <div
            className="wv-manga-disclaimer"
            style={{
              animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.9s backwards" : "none",
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#E6912C", margin: 0 }}>
                {MOCK_LINKING.unlinked} Anime Not Linked
              </p>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)", margin: "2px 0 0", lineHeight: 1.5 }}>
                These entries couldn&apos;t be matched. You can link them manually later in Settings → Library Management.
              </p>
            </div>
          </div>
        )}
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
