"use client";

/**
 * anikuta / screens / history-screen — continue watching carousel + day groups.
 *
 * Layout:
 *   - "Continue Watching" horizontal carousel at top
 *   - Day-grouped sections (Today, Yesterday, This Week, Earlier)
 *   - Each row: thumb + title + episode title + relative time
 */
import { CollapsingHeader } from "../components/collapsing-header";
import { SectionHeader } from "../components/section-header";
import { useCollapsingHeader } from "../hooks/use-collapsing-header";
import {
  CONTINUE_WATCHING,
  HISTORY,
  groupHistory,
} from "../lib/mock-data";

interface HistoryScreenProps {
  active: boolean;
  onOpenAnime: (id: number) => void;
  onOpenWatch: (id: number) => void;
  onBack: () => void;
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

export function HistoryScreen({
  active,
  onOpenAnime,
  onOpenWatch,
  onBack,
}: HistoryScreenProps) {
  const { contentRef, collapsed } = useCollapsingHeader();
  const groups = groupHistory(HISTORY);

  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view="history"
      data-push="true"
      aria-label="History"
      aria-hidden={!active}
    >
      <CollapsingHeader title="History" collapsed={collapsed}>
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
      </CollapsingHeader>

      <div ref={contentRef} className="an-content">
        {/* Continue Watching carousel */}
        {CONTINUE_WATCHING.length > 0 && (
          <div style={{ marginBottom: "var(--sp-4)" }}>
            <SectionHeader title="Continue Watching" />
            <div className="an-hscroll">
              {CONTINUE_WATCHING.map((item) => (
                <div
                  key={item.animeId}
                  className="an-cw-card"
                  onClick={() => onOpenWatch(item.animeId)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="an-cw-card__thumb">
                    <div
                      className="an-cw-card__thumb-art"
                      style={{ background: item.bannerGrad }}
                    />
                    <div className="an-cw-card__play">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="an-cw-card__ep">EP {item.episode}</span>
                    <div className="an-cw-card__progress">
                      <div
                        className="an-cw-card__progress-fill"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                  <h3 className="an-cw-card__title">{item.title}</h3>
                  <span className="an-cw-card__sub">
                    Ep {item.episode} / {item.totalEpisodes} · {item.progress}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Day-grouped sections */}
        {groups.map((group) => (
          <div key={group.label} className="an-history__group">
            <h3 className="an-history__group-label">{group.label}</h3>
            {group.items.map((entry, i) => (
              <div
                key={`${entry.animeId}-${entry.episode}-${i}`}
                className="an-history__row"
                onClick={() => onOpenWatch(entry.animeId)}
                role="button"
                tabIndex={0}
              >
                <div className="an-history__row-thumb">
                  <div
                    className="an-history__row-thumb-art"
                    style={{ background: entry.thumbGrad }}
                  />
                  <span className="an-history__row-ep">EP {entry.episode}</span>
                </div>
                <div className="an-history__row-info">
                  <h4 className="an-history__row-title">{entry.title}</h4>
                  <span className="an-history__row-sub">{entry.episodeTitle}</span>
                  <span className="an-history__row-time">
                    {relativeTime(entry.viewedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="an-bottom-pad" />
      </div>
    </section>
  );
}
