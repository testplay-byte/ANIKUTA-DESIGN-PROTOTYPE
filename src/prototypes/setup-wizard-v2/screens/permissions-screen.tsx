"use client";

import { useEffect, useState } from "react";
import type { PermissionsState } from "../hooks/use-wizard-state";

interface PermissionsScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  permissions: PermissionsState;
  togglePermission: (key: keyof PermissionsState) => void;
}

const PERMISSIONS: { key: keyof PermissionsState; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    key: "notifications", title: "Notifications", desc: "Get notified about new episodes and updates",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
  },
  {
    key: "storage", title: "Storage", desc: "Access and manage your anime file library",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
  },
  {
    key: "batteryOptimization", title: "Battery Optimization", desc: "Allow background playback and downloads",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2" /><line x1="22" y1="11" x2="22" y2="13" /></svg>,
  },
  {
    key: "installApps", title: "Install Packages", desc: "Install video player and extension packages",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
  },
];

export function PermissionsScreen({ active, onNext, onBack, permissions, togglePermission }: PermissionsScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [active]);

  const allGranted = Object.values(permissions).every(Boolean);

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-scroll">
        {/* Big bold heading */}
        <h1
          style={{
            fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em",
            color: "var(--color-text)", margin: 0, lineHeight: 1.15,
            animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.06s backwards" : "none",
          }}
        >
          Permissions
        </h1>

        {/* Shield animation */}
        <div style={{
          display: "flex", justifyContent: "center", padding: "var(--sp-2) 0",
          animation: mounted ? "wvScaleIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1) 0.1s backwards" : "none",
        }}>
          <div style={{ width: 140, height: 140 }}>
            <svg viewBox="0 0 200 200" fill="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              <defs>
                <radialGradient id="ps-glow" cx="50%" cy="50%" r="40%">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="60" fill="url(#ps-glow)" />
              {/* Rotating dashed rings */}
              <circle cx="100" cy="100" r="78" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.25"
                style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvRotate 14s linear infinite" }} />
              <circle cx="100" cy="100" r="68" fill="none" stroke="var(--color-tertiary)" strokeWidth="1" strokeDasharray="2 6" opacity="0.3"
                style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvRotate 20s linear infinite reverse" }} />
              {/* Ripple rings */}
              {[0, 0.9, 1.8].map((d, i) => (
                <circle key={i} cx="100" cy="100" r="48" fill="none" stroke="var(--color-primary)" strokeWidth="2" opacity="0.4"
                  style={{ transformBox: "fill-box", transformOrigin: "center", animation: `wvPulse 2.8s ease-out infinite ${d}s` }} />
              ))}
              {/* Shield */}
              <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "wvFloat 3.4s ease-in-out infinite" }}>
                <path d="M100 56 L138 70 L138 104 Q138 134 100 150 Q62 134 62 104 L62 70 Z"
                  fill="var(--color-primary-container)" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M100 62 L132 74 L132 104 Q132 129 100 143 Q68 129 68 104 L68 74 Z"
                  fill="none" stroke="var(--color-primary)" strokeWidth="1" opacity="0.3" />
                <path d="M84 100 L95 112 L118 88" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  style={{ strokeDasharray: 60, strokeDashoffset: 60, animation: "wvCheckDraw 2.4s ease-in-out infinite" }} />
              </g>
              {/* Floating particles */}
              {[[40, 60], [160, 50], [170, 140], [34, 150]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={2} fill="var(--color-primary)" opacity="0.3"
                  style={{ animation: `wvPulse 2s ease-in-out infinite ${i * 0.5}s` }} />
              ))}
            </svg>
          </div>
        </div>

        {/* Grant Permissions heading */}
        <p
          style={{
            fontSize: 18, fontWeight: 700, color: "var(--color-text)", margin: 0,
            textAlign: "center",
            animation: mounted ? "wvSlideUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.2s backwards" : "none",
          }}
        >
          Grant Permissions
        </p>
        <p
          style={{
            fontSize: 12, color: "var(--color-text-muted)", margin: "0 0 var(--sp-3)", fontStyle: "italic",
            textAlign: "center",
            animation: mounted ? "wvSlideUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.25s backwards" : "none",
          }}
        >
          Optional — you can skip this
        </p>

        {/* Enable All */}
        <div style={{
          display: "flex", justifyContent: "center",
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.3s backwards" : "none",
        }}>
          <button type="button" className="wv-enable-all" onClick={() => {
            if (allGranted) return;
            (Object.keys(permissions) as Array<keyof PermissionsState>).forEach((k) => {
              if (!permissions[k]) togglePermission(k);
            });
          }} disabled={allGranted} style={{ opacity: allGranted ? 0.5 : 1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {allGranted ? "All Permissions Granted" : "Enable All Permissions"}
          </button>
        </div>

        {/* Permission rows */}
        <div className="wv-card" style={{
          animation: mounted ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.35s backwards" : "none",
        }}>
          {PERMISSIONS.map((perm, i) => (
            <div key={perm.key} className="wv-perm" style={{
              animation: mounted ? `wvFadeInUp 0.3s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.4 + i * 0.07}s backwards` : "none",
            }}>
              <div className="wv-perm__icon" style={{
                background: permissions[perm.key] ? "var(--color-primary-alpha-20)" : "var(--color-surface-variant-alpha-40)",
                boxShadow: permissions[perm.key] ? "0 0 16px var(--color-primary-alpha-30)" : "none",
                color: permissions[perm.key] ? "var(--color-primary)" : "var(--color-text-muted)",
                transition: "background 0.3s var(--ease-emphasized), box-shadow 0.3s var(--ease-emphasized), color 0.3s var(--ease-emphasized)",
              }}>
                {perm.icon}
              </div>
              <div className="wv-perm__info">
                <p className="wv-perm__title">{perm.title}</p>
                <p className="wv-perm__desc">{perm.desc}</p>
              </div>
              <button type="button" className={`wv-toggle ${permissions[perm.key] ? "wv-toggle--on" : ""}`}
                onClick={() => togglePermission(perm.key)} role="switch" aria-checked={permissions[perm.key]} aria-label={perm.title} />
            </div>
          ))}
        </div>
      </div>

      <div className="wv-actions">
        <button className="wv-btn wv-btn--ghost" onClick={onBack}>Back</button>
        <button className="wv-btn wv-btn--primary" onClick={onNext}>Continue</button>
      </div>
    </div>
  );
}
