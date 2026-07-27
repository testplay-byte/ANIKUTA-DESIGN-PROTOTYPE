"use client";

/**
 * PermissionsScreen — Request critical Android permissions.
 * Four permission rows with inline SVG icons and toggle switches.
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
    title: "Install Apps",
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

        {/* Permissions card */}
        <div
          className="wv-card"
          style={{
            animation: mounted
              ? "wvFadeInUp 0.4s cubic-bezier(0.05, 0.7, 0.1, 1) 0.16s backwards"
              : "none",
          }}
        >
          {PERMISSIONS_LIST.map((perm, i) => (
            <div
              key={perm.key}
              className="wv-perm"
              style={{
                animation: mounted
                  ? `wvFadeInUp 0.35s cubic-bezier(0.05, 0.7, 0.1, 1) ${0.22 + i * 0.07}s backwards`
                  : "none",
              }}
            >
              <div className="wv-perm__icon">{perm.icon}</div>
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
