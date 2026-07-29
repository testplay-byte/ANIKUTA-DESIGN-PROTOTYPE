"use client";

/**
 * anikuta / screens / more-screen — settings hub.
 *
 * Sections (groups):
 *   - Account: My / Profile
 *   - General: Appearance, Display, Data
 *   - Library & Sources: Extensions, Trackers, Details Settings
 *   - Storage: Backup & Restore, Downloads
 *   - About: About ANIKUTA
 *
 * Each item is a button. The interactive ones navigate to a sub-screen;
 * the others navigate to a generic settings subpage.
 */
import { CollapsingHeader } from "../components/collapsing-header";
import { useCollapsingHeader } from "../hooks/use-collapsing-header";

interface MoreScreenProps {
  active: boolean;
  onNavigate: (route: string) => void;
}

interface MoreItem {
  id: string;
  title: string;
  sub: string;
  icon: React.ReactNode;
  value?: string;
}

interface MoreGroup {
  label: string;
  items: MoreItem[];
}

const ICONS = {
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  palette: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  display: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  data: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  ),
  extension: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  backup: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  download: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  trackers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" />
      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
    </svg>
  ),
  details: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  about: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const GROUPS: MoreGroup[] = [
  {
    label: "Account",
    items: [
      { id: "my", title: "My Profile", sub: "Stats, distributions, history", icon: ICONS.user },
    ],
  },
  {
    label: "General",
    items: [
      { id: "appearance", title: "Appearance", sub: "Theme, dark mode, accent", icon: ICONS.palette, value: "Dark" },
      { id: "display", title: "Display", sub: "Card density, posters, animations", icon: ICONS.display },
      { id: "data", title: "Data & Storage", sub: "Cache, image loading, sync", icon: ICONS.data },
    ],
  },
  {
    label: "Library & Sources",
    items: [
      { id: "extensions", title: "Extensions", sub: "Anime + manga sources", icon: ICONS.extension, value: "6 installed" },
      { id: "trackers", title: "Trackers", sub: "AniList, MyAnimeList, Shikimori", icon: ICONS.trackers },
      { id: "details", title: "Details Settings", sub: "Episode list, synopsis, display", icon: ICONS.details },
    ],
  },
  {
    label: "Storage",
    items: [
      { id: "backup", title: "Backup & Restore", sub: "Auto-backup, restore from file", icon: ICONS.backup, value: "2 backups" },
      { id: "downloads", title: "Downloads", sub: "Queue, downloaded episodes", icon: ICONS.download, value: "4 files" },
    ],
  },
  {
    label: "About",
    items: [
      { id: "about", title: "About ANIKUTA", sub: "Version, credits, licenses", icon: ICONS.about, value: "v1.0.0" },
    ],
  },
];

export function MoreScreen({ active, onNavigate }: MoreScreenProps) {
  const { contentRef, collapsed } = useCollapsingHeader();

  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view="more"
      aria-label="More"
      aria-hidden={!active}
    >
      <CollapsingHeader title="More" collapsed={collapsed} />

      <div ref={contentRef} className="an-content">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <h3 className="an-more__group-label">{group.label}</h3>
            <div className="an-more__group">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="an-more__item"
                  onClick={() => onNavigate(item.id)}
                >
                  <span className="an-more__item-icon">{item.icon}</span>
                  <span className="an-more__item-text">
                    <span className="an-more__item-title">{item.title}</span>
                    <span className="an-more__item-sub">{item.sub}</span>
                  </span>
                  {item.value && <span className="an-more__item-value">{item.value}</span>}
                  <span className="an-more__item-chevron">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="an-bottom-pad" />

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "var(--sp-4)", color: "var(--color-text-subtle)", fontSize: 11, fontWeight: 700 }}>
          ANIKUTA · v1.0.0 · Made with ♥
        </div>
      </div>
    </section>
  );
}
