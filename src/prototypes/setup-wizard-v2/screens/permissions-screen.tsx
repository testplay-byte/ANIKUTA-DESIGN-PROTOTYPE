"use client";

/**
 * PermissionsScreen — Request critical Android permissions.
 * Enhanced with staggered entry animations, enable-all toggle,
 * and smooth transitions when toggling individual permissions.
 */

import { useEffect, useState } from "react";
import type { PermissionsState } from "../hooks/use-wizard-state";

interface PermissionsScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  permissions: PermissionsState;
  togglePermission: (key: keyof PermissionsState) => void;
}

interface PermissionItem {
  key: keyof PermissionsState;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PERMISSIONS_LIST: PermissionItem[] = [
  {
    key: "notifications",
    title: "Notifications",
    description: "Get notified about new episodes and updates",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    key: "storage",
    title: "Storage",
    description: "Access and manage your anime file library",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    key: "batteryOptimization",
    title: "Battery Optimization",
    description: "Allow background playback and downloads",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
        <line x1="6" y1="11" x2="6" y2="11.01" />
        <line x1="10" y1="11" x2="10" y2="11.01" />
      </svg>
    ),
  },
  {
    key: "installApps",
    title: "Install Packages",
    description: "Install video player and extension packages",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

export function PermissionsScreen({
  active,
  onNext,
  onBack,
  permissions,
  togglePermission,
}: PermissionsScreenProps) {
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

  const handleEnableAll = () => {
    const allOn = Object.values(permissions).every(Boolean);
    if (allOn) return;
    (Object.keys(permissions) as Array<keyof PermissionsState>).forEach((key) => {
      if (!permissions[key]) togglePermission(key);
    });
  };

  return (
    <div className={`wv-step ${active ? "wv-step--active" : ""}`}>
      <div className="wv-scroll">
        {/* Header */}
        <div
          style={{
            animation: mounted
              ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.06s backwards"
              : "none",
          }}
        >
          <div className="wv-section-header" style={{ padding: 0 }}>
            Permissions
          </div>
          <p
            style={{
              fontSize: "var(--fs-body)",
              color: "var(--color-text-muted)",
              margin: "0 0 var(--sp-1)",
              lineHeight: 1.5,
            }}
          >
            Allow permissions for the best experience
          </p>
        </div>

        {/* Enable All chip */}
        <div
          style={{
            animation: mounted
              ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.12s backwards"
              : "none",
          }}
        >
          <button
            type="button"
            className="wv-enable-all"
            onClick={handleEnableAll}
            disabled={allGranted}
            style={{ opacity: allGranted ? 0.5 : 1 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {allGranted ? "All Permissions Granted" : "Enable All Permissions"}
            {allGranted && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Permissions card */}
        <div
          className="wv-card"
          style={{
            animation: mounted
              ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.18s backwards"
              : "none",
          }}
        >
          {PERMISSIONS_LIST.map((perm, i) => (
            <div
              key={perm.key}
              className="wv-perm"
              style={{
                animation: mounted
                  ? `wvFadeInUp 0.35s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.24 + i * 0.08}s backwards`
                  : "none",
              }}
            >
              <div className="wv-perm__icon" style={{
                transition: "background 0.3s var(--ease-emphasized), box-shadow 0.3s var(--ease-emphasized)",
                background: permissions[perm.key] ? "var(--color-primary-alpha-12)" : "var(--color-surface-variant-alpha-40)",
                boxShadow: permissions[perm.key] ? "0 0 12px var(--color-primary-alpha-16)" : "none",
              }}>
                {perm.icon}
              </div>
              <div className="wv-perm__info">
                <p className="wv-perm__title">{perm.title}</p>
                <p className="wv-perm__desc">{perm.description}</p>
              </div>
              <button
                type="button"
                className={`wv-toggle ${permissions[perm.key] ? "wv-toggle--on" : ""}`}
                onClick={() => togglePermission(perm.key)}
                role="switch"
                aria-checked={permissions[perm.key]}
                aria-label={perm.title}
              />
            </div>
          ))}
        </div>

        {/* Permission status summary */}
        <div
          className="wv-perm-summary"
          style={{
            animation: mounted
              ? `wvFadeInUp 0.35s cubic-bezier(0.05, 0.7, 0.1, 1) 0.60s backwards`
              : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)" }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: allGranted ? "var(--color-primary-alpha-12)" : "var(--color-surface-variant-alpha-40)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.3s var(--ease-emphasized)",
            }}>
              {allGranted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span style={{ fontSize: 12, fontWeight: 800, color: "var(--color-text-muted)" }}>
                  {Object.values(permissions).filter(Boolean).length}
                </span>
              )}
            </div>
            <span style={{ fontSize: 12, color: "var(--color-text-muted)", fontWeight: 500 }}>
              {allGranted ? "All permissions enabled" : `${Object.values(permissions).filter(Boolean).length} of ${Object.keys(permissions).length} permissions granted`}
            </span>
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
