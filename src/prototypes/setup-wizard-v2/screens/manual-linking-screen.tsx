"use client";

import { useEffect, useState } from "react";
import { MOCK_LINKING_ENTRIES, type LinkingEntry } from "../hooks/use-wizard-state";

interface ManualLinkingScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function ManualLinkingScreen({ active, onNext, onBack }: ManualLinkingScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState<LinkingEntry[]>(
    MOCK_LINKING_ENTRIES.filter((e) => e.status === "unlinked")
  );
  const [linkingId, setLinkingId] = useState<string | null>(null);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  const filtered = search.length > 0
    ? entries.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    : entries;

  const handleSearch = (id: string) => {
    setLinkingId(id);
    setTimeout(() => {
      setEntries((prev) => prev.map((e) => ({
        ...e,
        status: e.title === id ? "linked" as const : e.status,
        source: e.title === id ? "AniList" : e.source,
      })));
      setLinkingId(null);
    }, 800);
  };

  const linkedCount = entries.filter((e) => e.status === "linked").length;
  const total = entries.length;

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-scroll">
        <h1 className="wv-title wv-title--page" style={{
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.06s backwards" : "none",
        }}>
          Manual Linking
        </h1>
        <p style={{ fontSize: "var(--fs-body-l)", color: "var(--color-text-muted)", margin: "0 0 var(--sp-3)", lineHeight: 1.5,
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
        }}>
          Link the remaining anime entries manually
        </p>

        {/* Search bar */}
        <div className="wv-search-bar" style={{
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.15s backwards" : "none",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--color-text)", fontSize: 14, padding: 0 }}
          />
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "var(--sp-4)",
          padding: "var(--sp-2) 0",
          animation: mounted ? "wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) 0.2s backwards" : "none",
        }}>
          <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            <b style={{ color: "var(--color-primary)" }}>{linkedCount}</b> of <b>{total}</b> entries linked
          </span>
        </div>

        {/* Unlinked entries */}
        <div style={{
          display: "flex", flexDirection: "column", gap: "var(--sp-2)",
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s backwards" : "none",
        }}>
          {filtered.map((entry, i) => (
            <div key={entry.title} style={{
              display: "flex", alignItems: "center", gap: "var(--sp-3)",
              padding: "var(--sp-3)", borderRadius: 12,
              background: entry.status === "linked" ? "var(--color-primary-alpha-08)" : "var(--color-surface-variant-alpha-40)",
              border: `1px solid ${entry.status === "linked" ? "var(--color-outline-variant)" : "#E6912C20"}`,
              animation: mounted ? `wvFadeInUp 0.25s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.3 + i * 0.05}s backwards` : "none",
              transition: "background 0.3s var(--ease-emphasized), border-color 0.3s var(--ease-emphasized)",
            }}>
              {/* Cover */}
              <div style={{
                width: 44, height: 60, borderRadius: 6, flexShrink: 0,
                background: `linear-gradient(135deg, ${entry.coverGradient[0]}, ${entry.coverGradient[1]})`,
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }} />
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", margin: 0 }}>{entry.title}</p>
                {entry.status === "linked" ? (
                  <p style={{ fontSize: 11, color: "var(--color-primary)", fontWeight: 600, margin: "2px 0 0" }}>Linked via AniList</p>
                ) : (
                  <p style={{ fontSize: 11, color: "#E6912C", margin: "2px 0 0" }}>Not linked</p>
                )}
              </div>
              {/* Action */}
              {entry.status === "unlinked" ? (
                <button
                  onClick={() => handleSearch(entry.title)}
                  disabled={linkingId !== null}
                  style={{
                    padding: "6px 14px", borderRadius: 8,
                    background: "var(--color-primary-alpha-12)", border: "1px solid var(--color-primary-alpha-16)",
                    color: "var(--color-primary)", fontSize: 11, fontWeight: 700, cursor: "pointer",
                    whiteSpace: "nowrap", transition: "opacity 0.2s",
                    opacity: linkingId !== null ? 0.5 : 1,
                  }}
                >
                  {linkingId === entry.title ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span className="wv-dots" style={{ gap: 3 }}><span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor" }} /><span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor" }} /></span>
                      Linking...
                    </span>
                  ) : (
                    "Search AniList"
                  )}
                </button>
              ) : (
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "var(--color-primary-alpha-12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "var(--sp-6) 0", color: "var(--color-text-muted)", fontSize: 13 }}>
              {search ? "No entries found" : "All entries linked!"}
            </div>
          )}
        </div>
      </div>

      <div className="wv-actions">
        <button className="wv-btn wv-btn--ghost" onClick={onBack}>Back</button>
        <button className="wv-btn wv-btn--primary" onClick={onNext}>Continue</button>
      </div>
    </div>
  );
}
