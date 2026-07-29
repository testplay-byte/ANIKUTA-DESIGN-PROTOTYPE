"use client";

/**
 * setup-wizard / screens / backup-summary-screen — Step 7 (#summary).
 *
 * v2 redesign:
 *  - Full UI redesign as a LIST VIEW ("what will be restored" manifest).
 *  - Replaced the statistical bar-chart visual with a calm clipboard/manifest
 *    animation.
 *  - Manga warning integrated as a list row (red), not a separate ugly box.
 *  - Flexible layout (easy to add more rows).
 *  - Cancel button → goes to #format (NOT #processing) per user request.
 */
import type { ThemePalette } from "../lib/themes";
import { SummaryVisual } from "../components/visuals";

interface BackupSummaryScreenProps {
  active: boolean;
  onNext: () => void;
  /** Cancel → goes to #format (per user request, NOT back to #processing). */
  onCancel: () => void;
  onBack: () => void;
  palette: ThemePalette;
}

interface SummaryItem {
  icon: React.ReactNode;
  label: string;
  meta: string;
  value: string;
  warn?: boolean;
}

const AnimeIcon = (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="14" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></svg>);
const CategoryIcon = (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h12" /></svg>);
const EpisodeIcon = (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9M14 17H5M17 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>);
const HistoryIcon = (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>);
const SettingsIcon = (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>);
const MangaIcon = (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>);

const SUMMARY_ITEMS: SummaryItem[] = [
  { icon: AnimeIcon, label: "Anime detected", meta: "Ready to restore", value: "247" },
  { icon: CategoryIcon, label: "Categories", meta: "Watching, Completed, Plan…", value: "12" },
  { icon: EpisodeIcon, label: "Episodes tracked", meta: "Progress + timestamps", value: "1,432" },
  { icon: HistoryIcon, label: "Watch history", meta: "Recently viewed", value: "89" },
  { icon: SettingsIcon, label: "Settings", meta: "Theme, display, data", value: "—" },
  { icon: MangaIcon, label: "Manga entries", meta: "Not supported — will be skipped", value: "12", warn: true },
];

export function BackupSummaryScreen({ active, onNext, onCancel, onBack, palette }: BackupSummaryScreenProps) {
  // onBack is provided for consistency (browser back) but Cancel uses onCancel → #format.
  void onBack;
  return (
    <div className={`wizard-step wizard-step--v2 ${active ? "wizard-step--active" : ""}`}>
      <div className="wizard-content">
        <div className="wizard-heading">
          <p className="wizard-screen-eyebrow">Restore</p>
          <h1 className="wizard-screen-title">Backup summary</h1>
          <p className="wizard-screen-sub">Here&apos;s what we found in your backup. Review before restoring.</p>
        </div>

        <div className="wizard-visual" key={active ? "on" : "off"} style={{ width: 160, height: 160 }}>
          <SummaryVisual />
        </div>

        <div className="wizard-body">
          <ul className="summary-list">
            {SUMMARY_ITEMS.map((item, i) => (
              <li
                key={item.label}
                className={`summary-list__row ${item.warn ? "summary-list__row--warn" : ""}`}
                style={{ animationDelay: `${0.08 * i + 0.15}s` }}
              >
                <span className="summary-list__icon">{item.icon}</span>
                <span className="summary-list__text">
                  <span className="summary-list__label">{item.label}</span>
                  <span className="summary-list__meta">{item.meta}</span>
                </span>
                <span className="summary-list__value">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wizard-actions">
        <button className="wizard-btn wizard-btn--secondary" onClick={onCancel} style={{ fontWeight: 800 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Cancel
        </button>
        <button className="wizard-btn wizard-btn--primary" onClick={onNext} style={{ background: palette.primary, color: palette.onPrimary, fontWeight: 800 }}>
          Restore
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
