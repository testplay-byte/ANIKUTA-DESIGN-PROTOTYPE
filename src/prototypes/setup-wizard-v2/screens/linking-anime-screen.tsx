"use client";

import { useEffect, useState, useRef } from "react";
import { MOCK_LINKING_ENTRIES } from "../hooks/use-wizard-state";

interface LinkingAnimeScreenProps {
  active: boolean;
  onNext: () => void;
}

export function LinkingAnimeScreen({ active, onNext }: LinkingAnimeScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [linkedCount, setLinkedCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalAnime = MOCK_LINKING_ENTRIES.length;
  const unlinkedCount = totalAnime - linkedCount;

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
      setVisibleCount(0);
      setLinkedCount(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [active]);

  useEffect(() => {
    if (!mounted) return;
    timerRef.current = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= totalAnime) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(() => onNext(), 1500);
          return prev;
        }
        const next = prev + 1;
        if (MOCK_LINKING_ENTRIES[prev].status === "linked") {
          setLinkedCount((l) => l + 1);
        }
        return next;
      });
    }, 500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [mounted, onNext, totalAnime]);

  const linkRate = totalAnime > 0 ? Math.round((linkedCount / totalAnime) * 100) : 0;

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-scroll">
        <h1 className="wv-title wv-title--page" style={{
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.06s backwards" : "none",
        }}>
          Linking Anime
        </h1>
        <p style={{ fontSize: "var(--fs-body-l)", color: "var(--color-text-muted)", margin: "0 0 var(--sp-3)", lineHeight: 1.5,
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
        }}>
          Matching your library entries to AniList
        </p>

        {/* Stats */}
        <div className="wv-stats-grid" style={{
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.15s backwards" : "none",
        }}>
          <div className="wv-stat">
            <span className="wv-stat__value">{totalAnime}</span>
            <span className="wv-stat__label">Total</span>
          </div>
          <div className="wv-stat">
            <span className="wv-stat__value" style={{ color: "var(--color-primary)" }}>{linkedCount}</span>
            <span className="wv-stat__label">Linked</span>
          </div>
          <div className="wv-stat">
            <span className="wv-stat__value" style={{ color: "#E6912C" }}>{unlinkedCount}</span>
            <span className="wv-stat__label">Unlinked</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          padding: "var(--sp-3) 0", animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.2s backwards" : "none",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Progress</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-primary)", fontVariantNumeric: "tabular-nums" }}>{linkRate}%</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: "var(--color-surface-4)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2,
              width: `${linkRate}%`,
              background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
              transition: "width 0.3s var(--ease-emphasized)",
              boxShadow: "0 0 8px var(--color-primary-alpha-40)",
            }} />
          </div>
        </div>

        {/* Anime entries */}
        <div style={{
          display: "flex", flexDirection: "column", gap: "var(--sp-2)",
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s backwards" : "none",
        }}>
          {MOCK_LINKING_ENTRIES.slice(0, visibleCount).map((entry, i) => (
            <div key={entry.title} style={{
              display: "flex", alignItems: "center", gap: "var(--sp-3)",
              padding: "var(--sp-2) var(--sp-3)", borderRadius: 12,
              background: entry.status === "linked" ? "var(--color-primary-alpha-08)" : "#E6912C08",
              border: `1px solid ${entry.status === "linked" ? "var(--color-outline-variant)" : "#E6912C20"}`,
              animation: "wvFadeInUp 0.25s cubic-bezier(0.05, 0.7, 0.1, 1) backwards",
            }}>
              {/* Cover image placeholder */}
              <div style={{
                width: 48, height: 64, borderRadius: 6, flexShrink: 0,
                background: `linear-gradient(135deg, ${entry.coverGradient[0]}, ${entry.coverGradient[1]})`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }} />
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)", margin: 0,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {entry.title}
                </p>
                <p style={{ fontSize: 11, color: "var(--color-text-muted)", margin: "2px 0 0" }}>
                  {entry.episodes > 0 ? `${entry.episodes} episodes · ${entry.source}` : "Not matched"}
                </p>
              </div>
              {/* Status */}
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: entry.status === "linked" ? "var(--color-primary-alpha-12)" : "#E6912C18",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {entry.status === "linked" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E6912C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
