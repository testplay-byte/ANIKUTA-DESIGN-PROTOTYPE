"use client";

import { useEffect, useState } from "react";
import { MOCK_BACKUP } from "../hooks/use-wizard-state";

type RestoreState = "idle" | "restoring" | "successful";

interface RestoreSummaryScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function RestoreSummaryScreen({ active, onNext, onBack }: RestoreSummaryScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<RestoreState>("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
      setState("idle");
      setProgress(0);
    }
  }, [active]);

  useEffect(() => {
    if (state !== "restoring") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 5 + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setState("successful"), 400);
          return 100;
        }
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [state]);

  if (state === "restoring") {
    return (
      <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
        <div className="wv-content" style={{ gap: "var(--sp-5)" }}>
          {/* Spinning animation */}
          <div style={{
            width: 120, height: 120, position: "relative",
            animation: mounted ? "wvScaleIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
          }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ animation: "wvRotate 1.5s linear infinite" }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round"
                strokeDasharray="80 40" opacity="0.3" />
              <circle cx="60" cy="60" r="40" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round"
                strokeDasharray="30 90" opacity="0.6" />
            </svg>
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "var(--color-primary)", fontVariantNumeric: "tabular-nums" }}>
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </div>
          <h2 style={{
            fontSize: 20, fontWeight: 800, color: "var(--color-text)", margin: 0,
            animation: mounted ? "wvSlideUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.2s backwards" : "none",
          }}>
            Restoring your data...
          </h2>
          <div className="wv-loading-pill" style={{
            animation: mounted ? "wvSlideUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.3s backwards" : "none",
          }}>
            <span className="wv-dots"><span /><span /><span /></span>
            Please wait
          </div>
        </div>
      </div>
    );
  }

  if (state === "successful") {
    return (
      <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
        <div className="wv-content" style={{ gap: "var(--sp-4)" }}>
          {/* Success animation */}
          <div style={{
            width: 140, height: 140,
            animation: mounted ? "wvScaleIn 0.6s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
          }}>
            <svg viewBox="0 0 140 140" fill="none" style={{ width: "100%", height: "100%" }}>
              <defs>
                <radialGradient id="rs-ok-glow" cx="50%" cy="50%" r="45%">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="70" cy="70" r="65" fill="url(#rs-ok-glow)" />
              <circle cx="70" cy="70" r="50" fill="none" stroke="var(--color-primary)" strokeWidth="4"
                style={{ strokeDasharray: 120, strokeDashoffset: 120, animation: "wvCheckDraw 0.6s cubic-bezier(0.05, 0.7, 0.1, 1) 0.2s forwards" }} />
              <path d="M50 72 L62 84 L92 54" stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"
                style={{ strokeDasharray: 50, strokeDashoffset: 50, animation: "wvCheckDraw 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.6s forwards" }} />
            </svg>
          </div>
          <h1 className="wv-title wv-title--xl" style={{
            animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.4s backwards" : "none",
          }}>
            Restore Successful!
          </h1>
          <p className="wv-subtitle" style={{
            animation: mounted ? "wvSlideUp 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) 0.5s backwards" : "none",
          }}>
            Your data has been restored successfully
          </p>
          <div className="wv-actions" style={{ justifyContent: "center" }}>
            <button className="wv-btn wv-btn--primary" onClick={onNext} style={{ maxWidth: 280, width: "100%" }}>
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-scroll">
        <h1 className="wv-title wv-title--page" style={{
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.06s backwards" : "none",
        }}>
          Restore Summary
        </h1>
        <p style={{ fontSize: "var(--fs-body-l)", color: "var(--color-text-muted)", margin: "0 0 var(--sp-3)", lineHeight: 1.5,
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
        }}>
          Review your restored data
        </p>

        {/* Stats */}
        <div className="wv-stats-grid" style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.15s backwards" : "none",
        }}>
          {[
            { value: MOCK_BACKUP.totalItems, label: "Total Items", color: "var(--color-primary)" },
            { value: MOCK_BACKUP.categories.length, label: "Categories", color: "var(--color-secondary)" },
            { value: 16, label: "Unlinked", color: "#E6912C" },
          ].map((s, i) => (
            <div key={s.label} className="wv-stat" style={{
              animation: `wvStatIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.2 + i * 0.1}s backwards`,
            }}>
              <span className="wv-stat__value" style={{ color: s.color }}>{s.value}</span>
              <span className="wv-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="wv-card" style={{
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.35s backwards" : "none",
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Categories
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)", marginTop: "var(--sp-2)" }}>
            {MOCK_BACKUP.categories.map((cat, i) => (
              <div key={cat.name} className="wv-category" style={{
                animation: mounted ? `wvFadeInUp 0.25s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.4 + i * 0.05}s backwards` : "none",
              }}>
                <span className="wv-category__name">{cat.name}</span>
                <span className="wv-category__count">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Manga disclaimer */}
        <div className="wv-manga-disclaimer" style={{
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.6s backwards" : "none",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: "#E6912C18",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E6912C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#E6912C", margin: 0 }}>Manga Disclaimer</p>
            <p style={{ fontSize: 11, color: "var(--color-text-muted)", margin: "2px 0 0", lineHeight: 1.5 }}>
              Mangas were not included in this backup. If you had manga data previously, it will need to be re-imported separately.
            </p>
          </div>
        </div>

        {/* Restore prompt */}
        <div style={{
          textAlign: "center", padding: "var(--sp-3) 0",
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.7s backwards" : "none",
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text)", margin: "0 0 var(--sp-2)" }}>
            Do you want to restore?
          </h2>
        </div>
      </div>

      <div className="wv-actions">
        <button className="wv-btn wv-btn--ghost" onClick={onBack}>Back</button>
        <button className="wv-btn wv-btn--primary" onClick={() => setState("restoring")}>
          Restore
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
