"use client";

/**
 * anikuta / screens / backup-screen — Backup & Restore.
 *
 * Section cards:
 *   1. Backup & Restore (Create Backup / Restore buttons, last backup info)
 *   2. Auto-backup (toggle + frequency selector + max backups)
 *   3. Storage (folder selector)
 */
import { useState } from "react";
import { SectionHeader } from "../components/section-header";
import { Toggle } from "../components/segmented-toggle";

interface BackupScreenProps {
  active: boolean;
  onBack: () => void;
}

export function BackupScreen({ active, onBack }: BackupScreenProps) {
  const [autoBackup, setAutoBackup] = useState(true);
  const [frequency, setFrequency] = useState("weekly");
  const [maxBackups, setMaxBackups] = useState("5");
  const [folder] = useState("/storage/emulated/0/ANIKUTA/backups");
  const [creating, setCreating] = useState(false);

  function createBackup() {
    setCreating(true);
    setTimeout(() => setCreating(false), 1800);
  }

  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view="backup"
      data-push="true"
      aria-label="Backup & Restore"
      aria-hidden={!active}
    >
      <div className="an-topbar">
        <button
          type="button"
          className="an-topbar__iconbtn"
          onClick={onBack}
          aria-label="Back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="an-topbar__title" style={{ fontSize: "var(--fs-h3)" }}>
          Backup & Restore
        </h1>
      </div>

      <div className="an-content">
        {/* Section 1: Backup & Restore */}
        <div style={{ marginTop: "var(--sp-4)" }}>
          <SectionHeader title="Backup & Restore" />
          <div className="an-backup__card">
            <h3 className="an-backup__card-title">Manual Backup</h3>
            <p className="an-backup__card-desc">
              Create a full backup of your library, history, settings, and
              downloads. Restore from a backup file anytime.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: "var(--sp-2)" }}>
              <button
                type="button"
                className="an-btn an-btn--filled"
                onClick={createBackup}
                disabled={creating}
                style={creating ? { opacity: 0.6 } : undefined}
              >
                {creating ? (
                  <>
                    <span
                      style={{
                        width: 14, height: 14, border: "2px solid rgba(0,0,0,0.3)",
                        borderTopColor: "var(--color-primary-fg)",
                        borderRadius: "50%", animation: "anSpin 0.8s linear infinite",
                      }}
                    />
                    Creating…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Create Backup
                  </>
                )}
              </button>
              <button type="button" className="an-btn an-btn--outlined">
                Restore
              </button>
            </div>
            <div className="an-backup__last">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Last backup: 2 days ago · 14.2 MB
            </div>
          </div>
        </div>

        {/* Section 2: Auto-backup */}
        <div style={{ marginTop: "var(--sp-5)" }}>
          <SectionHeader title="Auto-backup" />
          <div className="an-backup__card">
            <div className="an-backup__row">
              <div>
                <div className="an-backup__row-label">Enable auto-backup</div>
                <div className="an-backup__row-sub">
                  Automatically back up your data on a schedule.
                </div>
              </div>
              <Toggle on={autoBackup} onChange={setAutoBackup} aria-label="Auto backup" />
            </div>
            {autoBackup && (
              <>
                <div className="an-backup__row">
                  <div>
                    <div className="an-backup__row-label">Frequency</div>
                    <div className="an-backup__row-sub">How often to back up.</div>
                  </div>
                  <select
                    className="an-backup__select"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="an-backup__row">
                  <div>
                    <div className="an-backup__row-label">Max backups</div>
                    <div className="an-backup__row-sub">Older backups are deleted.</div>
                  </div>
                  <select
                    className="an-backup__select"
                    value={maxBackups}
                    onChange={(e) => setMaxBackups(e.target.value)}
                  >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="0">Unlimited</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section 3: Storage */}
        <div style={{ marginTop: "var(--sp-5)" }}>
          <SectionHeader title="Storage" />
          <div className="an-backup__card">
            <div>
              <div className="an-backup__row-label" style={{ marginBottom: 6 }}>
                Backup folder
              </div>
              <div className="an-backup__row-sub" style={{ marginBottom: "var(--sp-3)" }}>
                Where backup files are saved.
              </div>
              <div className="an-backup__folder">
                <span className="an-backup__folder-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <span className="an-backup__folder-path">{folder}</span>
              </div>
            </div>
            <div className="an-backup__last" style={{ marginTop: "var(--sp-2)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v14a9 3 0 0 0 18 0V5" />
              </svg>
              Storage used: 28.4 MB / 2 backups
            </div>
          </div>
        </div>

        <div className="an-bottom-pad" />
      </div>
    </section>
  );
}
