"use client";

/**
 * setup-wizard / screens / permissions-screen — Step 3 (#permissions).
 *
 * v2.2: "Permissions" big bold green heading at top-left. Subtitle changed to
 * just "Optional: you can skip these".
 */
import type { ThemePalette } from "../lib/themes";
import type { Permissions } from "../hooks/use-wizard-state";
import { PermissionsVisual } from "../components/visuals";

interface PermissionsScreenProps {
  active: boolean;
  onNext: () => void;
  onBack: () => void;
  permissions: Permissions;
  togglePermission: (key: keyof Permissions) => void;
  palette: ThemePalette;
}

const PERM_ROWS: {
  key: keyof Permissions;
  title: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "installApps",
    title: "Install apps",
    desc: "Allow installing anime extensions",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>),
  },
  {
    key: "notifications",
    title: "Notifications",
    desc: "Get notified about new episodes",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>),
  },
  {
    key: "battery",
    title: "Battery",
    desc: "Allow background sync for updates",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" /><path d="M22 11v2" /></svg>),
  },
  {
    key: "allFilesAccess",
    title: "All files access",
    desc: "Access all files on your device",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>),
  },
];

export function PermissionsScreen({ active, onNext, onBack, permissions, togglePermission, palette }: PermissionsScreenProps) {
  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <h1 className="wizard-page-heading">Permissions</h1>

        <div className="wizard-visual" key={active ? "on" : "off"}>
          <PermissionsVisual />
        </div>

        <div className="wizard-heading" style={{ alignItems: "center", textAlign: "center" }}>
          <h2 className="wizard-descriptive-title">Grant permissions</h2>
          <p className="wizard-screen-sub" style={{ alignSelf: "center", textAlign: "center" }}>Optional: you can skip these</p>
        </div>

        <div className="wizard-body">
          {PERM_ROWS.map((row, i) => {
            const isOn = permissions[row.key];
            return (
              <div
                key={row.key}
                className="perm-row perm-row--v2"
                style={{ animation: `slideInLeft 0.4s var(--ease-emphasized-decel) ${0.1 * i + 0.15}s backwards` }}
              >
                <div className="perm-icon" style={isOn ? { background: palette.primary, color: palette.onPrimary } : undefined}>
                  {row.icon}
                </div>
                <div className="perm-info">
                  <p className="perm-title">{row.title}</p>
                  <p className="perm-desc">{row.desc}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={isOn}
                  aria-label={`Toggle ${row.title}`}
                  className={`perm-toggle ${isOn ? "perm-toggle--on" : ""}`}
                  onClick={() => togglePermission(row.key)}
                  style={isOn ? { background: palette.primary } : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="wizard-actions">
        <button className="wizard-btn wizard-btn--secondary" onClick={onBack} style={{ fontWeight: 800 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button className="wizard-btn wizard-btn--primary" onClick={onNext} style={{ background: palette.primary, color: palette.onPrimary, fontWeight: 800 }}>
          Continue
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
