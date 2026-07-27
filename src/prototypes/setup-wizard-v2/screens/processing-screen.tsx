"use client";

/**
 * ProcessingScreen — Animated linking/processing screen.
 * Shows a beautiful multi-phase animation: scanning, linking, finalizing.
 */

import { useEffect, useState } from "react";

interface ProcessingScreenProps {
  active: boolean;
  onNext: () => void;
}

type Phase = "scanning" | "linking" | "finalizing" | "complete";

const PHASE_CONFIG: Record<Phase, { label: string; sub: string; icon: string }> = {
  scanning: { label: "Scanning Library", sub: "Analyzing your anime collection...", icon: "scan" },
  linking: { label: "Linking Anime", sub: "Matching entries to AniList database...", icon: "link" },
  finalizing: { label: "Finalizing", sub: "Saving linked data to your library...", icon: "final" },
  complete: { label: "Complete", sub: "All done! Your library is ready.", icon: "done" },
};

const PHASE_ORDER: Phase[] = ["scanning", "linking", "finalizing", "complete"];

export function ProcessingScreen({ active, onNext }: ProcessingScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentPhase = PHASE_ORDER[Math.min(phaseIndex, PHASE_ORDER.length - 1)];
  const phaseConfig = PHASE_CONFIG[currentPhase];

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  // Progress animation
  useEffect(() => {
    if (!active || phaseIndex >= PHASE_ORDER.length - 1) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 4 + 2;
        if (next >= 100) {
          clearInterval(interval);
          // Move to next phase after a brief delay
          setTimeout(() => {
            setPhaseIndex((pi) => pi + 1);
            setProgress(0);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [active, phaseIndex]);

  // Auto-advance after complete phase
  useEffect(() => {
    if (currentPhase === "complete" && active) {
      const t = setTimeout(() => {
        onNext();
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [currentPhase, active, onNext]);

  const overallProgress = ((phaseIndex + Math.min(progress, 100) / 100) / PHASE_ORDER.length) * 100;

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`} style={{ overflow: "hidden" }}>
      <div className="wv-content" style={{ gap: "var(--sp-5)", paddingTop: "var(--sp-10)" }}>
        {/* Animated illustration */}
        <div
          style={{
            width: 160,
            height: 160,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: mounted ? "wvScaleIn 0.6s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
          }}
        >
          {/* Outer glow */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--color-primary-alpha-12) 0%, transparent 70%)",
          }} />

          {/* Spinning rings */}
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute", inset: 0 }}>
            <circle
              cx="80" cy="80" r="70"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="15 30"
              opacity="0.25"
              style={{ animation: "wvRotate 4s linear infinite" }}
            />
            <circle
              cx="80" cy="80" r="58"
              stroke="var(--color-secondary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="10 20"
              opacity="0.15"
              style={{ animation: "wvRotate 6s linear infinite reverse" }}
            />
          </svg>

          {/* Center icon */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "var(--color-primary-alpha-12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            animation: currentPhase === "complete" ? "wvScaleIn 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) backwards" : "wvPulse 2s ease-in-out infinite",
          }}>
            {currentPhase === "complete" ? (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: "wvCheckDraw 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) forwards" }} />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            )}
          </div>

          {/* Orbiting particles */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i === 1 ? "var(--color-secondary)" : "var(--color-primary)",
                opacity: 0.5,
                animation: `wvOrbit ${2.5 + i * 0.8}s linear infinite`,
                animationDelay: `${i * 0.8}s`,
                transformOrigin: "80px 80px",
              }}
            />
          ))}
        </div>

        {/* Phase label */}
        <div style={{ textAlign: "center", animation: mounted ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.3s backwards" : "none" }}>
          <h2 style={{
            fontSize: 20,
            fontWeight: 800,
            color: "var(--color-text)",
            margin: "0 0 var(--sp-1)",
            transition: "opacity 0.3s var(--ease-emphasized)",
          }}>
            {phaseConfig.label}
          </h2>
          <p style={{
            fontSize: 13,
            color: "var(--color-text-muted)",
            margin: 0,
            lineHeight: 1.5,
            transition: "opacity 0.3s var(--ease-emphasized)",
          }}>
            {phaseConfig.sub}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          width: "100%",
          maxWidth: 260,
          animation: mounted ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.4s backwards" : "none",
        }}>
          {/* Phase indicators */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            {PHASE_ORDER.map((phase, i) => (
              <div key={phase} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {i < phaseIndex ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : i === phaseIndex ? (
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: "2px solid var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--color-primary)",
                      animation: "wvPulse 1s ease-in-out infinite",
                    }} />
                  </div>
                ) : (
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: "2px solid var(--color-outline-variant)",
                  }} />
                )}
                <span style={{
                  fontSize: 10,
                  fontWeight: i === phaseIndex ? 700 : 500,
                  color: i <= phaseIndex ? "var(--color-primary)" : "var(--color-text-subtle)",
                  textTransform: "capitalize",
                }}>
                  {phase}
                </span>
              </div>
            ))}
          </div>

          {/* Overall progress track */}
          <div style={{
            height: 4,
            borderRadius: 2,
            background: "var(--color-surface-4)",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              borderRadius: 2,
              width: `${Math.min(overallProgress, 100)}%`,
              background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
              transition: "width 0.15s linear",
              boxShadow: "0 0 10px var(--color-primary-alpha-40)",
            }} />
          </div>
          <div style={{ textAlign: "right", marginTop: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "var(--color-primary)", fontVariantNumeric: "tabular-nums" }}>
              {Math.min(Math.round(overallProgress), 100)}%
            </span>
          </div>
        </div>

        {/* Loading pill */}
        {currentPhase !== "complete" && (
          <div
            className="wv-loading-pill"
            style={{
              animation: mounted ? "wvSlideUp 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.5s backwards" : "none",
            }}
          >
            <span className="wv-dots"><span /><span /><span /></span>
            Processing
          </div>
        )}
      </div>
    </div>
  );
}
