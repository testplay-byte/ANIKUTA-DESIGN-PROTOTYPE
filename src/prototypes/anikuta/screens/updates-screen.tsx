"use client";

/**
 * anikuta / screens / updates-screen — new episodes + schedule.
 *
 * Layout:
 *   - Tab strip (Updates | Schedule)
 *   - Pull-to-refresh visual + list of new episodes with SUB/DUB badges
 *   - Schedule tab: day-grouped airing schedule with time blocks
 */
import { useState } from "react";
import { CollapsingHeader } from "../components/collapsing-header";
import { SectionHeader } from "../components/section-header";
import { useCollapsingHeader } from "../hooks/use-collapsing-header";
import { UPDATES, SCHEDULE, groupSchedule } from "../lib/mock-data";
import type { UpdatesTab } from "../lib/types";

interface UpdatesScreenProps {
  active: boolean;
  onOpenAnime: (id: number) => void;
}

export function UpdatesScreen({ active, onOpenAnime }: UpdatesScreenProps) {
  const { contentRef, collapsed } = useCollapsingHeader();
  const [tab, setTab] = useState<UpdatesTab>("updates");
  const [refreshing, setRefreshing] = useState(false);

  const scheduleGroups = groupSchedule(SCHEDULE);

  function refresh() {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1400);
  }

  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view="updates"
      aria-label="Updates"
      aria-hidden={!active}
    >
      <CollapsingHeader title="Updates" collapsed={collapsed} />

      <div ref={contentRef} className="an-content">
        {/* Tab strip */}
        <div className="an-updates__tabs">
          <button
            type="button"
            className={`an-updates__tab ${tab === "updates" ? "an-updates__tab--active" : ""}`}
            onClick={() => setTab("updates")}
          >
            Updates
          </button>
          <button
            type="button"
            className={`an-updates__tab ${tab === "schedule" ? "an-updates__tab--active" : ""}`}
            onClick={() => setTab("schedule")}
          >
            Schedule
          </button>
        </div>

        {/* Pull-to-refresh visual */}
        <div className={`an-ptr ${refreshing ? "an-ptr--show" : ""}`}>
          {refreshing ? (
            <>
              <span className="an-ptr__spinner" />
              Refreshing…
            </>
          ) : (
            "Pull down to refresh"
          )}
        </div>

        {tab === "updates" ? (
          <div className="an-bottom-pad">
            <SectionHeader
              title="New Episodes"
              action="Refresh"
              onAction={refresh}
            />
            {UPDATES.map((u, i) => (
              <div
                key={`${u.animeId}-${u.episode}-${i}`}
                className="an-updates__item"
                onClick={() => onOpenAnime(u.animeId)}
                role="button"
                tabIndex={0}
              >
                <div className="an-updates__item-cover">
                  <div
                    className="an-updates__item-cover-art"
                    style={{ background: u.coverGrad }}
                  />
                  <span
                    style={{
                      position: "absolute", inset: 0, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 18, fontWeight: 900, color: "rgba(255,255,255,0.92)",
                      textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                    }}
                    aria-hidden="true"
                  >
                    {u.letter}
                  </span>
                </div>
                <div className="an-updates__item-info">
                  <h4 className="an-updates__item-title">{u.title}</h4>
                  <span className="an-updates__item-ep">
                    Episode {u.episode} · {u.episodeTitle}
                  </span>
                  <div className="an-updates__item-badges">
                    {u.subAvailable && <span className="an-updates__badge an-updates__badge--sub">SUB</span>}
                    {u.dubAvailable && <span className="an-updates__badge an-updates__badge--dub">DUB</span>}
                    {u.isNew && <span className="an-updates__badge an-updates__badge--new">NEW</span>}
                  </div>
                </div>
                <span className="an-updates__time">{u.timeAgo}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="an-bottom-pad">
            <SectionHeader title="Weekly Schedule" />
            {scheduleGroups.map((group) => (
              <div key={group.day} className="an-sched__day">
                <h3 className="an-sched__day-label">{group.day}</h3>
                {group.items.map((s, i) => (
                  <div
                    key={`${s.animeId}-${s.episode}-${i}`}
                    className="an-sched__row"
                    onClick={() => onOpenAnime(s.animeId)}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="an-sched__time">{s.time}</span>
                    <div className="an-sched__row-info">
                      <h4 className="an-sched__row-title">{s.title}</h4>
                      <span className="an-sched__row-ep">Episode {s.episode}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
