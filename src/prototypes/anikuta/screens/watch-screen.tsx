"use client";

/**
 * anikuta / screens / watch-screen — pushed watch page.
 *
 * Layout:
 *   - Mini-player (16:9 black box with blurred art + play button) at top
 *   - Maximize button on player
 *   - Player progress bar with current time / duration
 *   - Episode title + description below
 *   - Episode list below that (current episode highlighted, watched = grayscale+blur)
 */
import { useMemo, useState } from "react";
import { EpisodeRow } from "../components/episode-row";
import { SectionHeader } from "../components/section-header";
import { getAnime, getEpisodes } from "../lib/mock-data";

interface WatchScreenProps {
  active: boolean;
  animeId: number | null;
  episodeNumber: number | null;
  onBack: () => void;
  onEpisodeChange: (animeId: number, ep: number) => void;
}

export function WatchScreen({
  active,
  animeId,
  episodeNumber,
  onBack,
  onEpisodeChange,
}: WatchScreenProps) {
  const anime = getAnime(animeId);
  const [maximized, setMaximized] = useState(false);
  const [playing, setPlaying] = useState(false);

  const allEpisodes = useMemo(() => (anime ? getEpisodes(anime) : []), [anime]);

  if (!anime) {
    return (
      <section
        className={`view ${active ? "view--active" : ""}`}
        data-view="watch"
        data-push="true"
        aria-label="Watch"
        aria-hidden={!active}
      >
        <div className="an-lib__empty" style={{ marginTop: 80 }}>
          <h3 className="an-lib__empty-title">No episode selected</h3>
        </div>
      </section>
    );
  }

  const epNum = episodeNumber ?? 1;
  const currentEp = allEpisodes.find((e) => e.number === epNum) ?? allEpisodes[0];

  return (
    <section
      key={`${anime.id}-${epNum}`}
      className={`view ${active ? "view--active" : ""}`}
      data-view="watch"
      data-push="true"
      aria-label="Watch"
      aria-hidden={!active}
    >
      {/* Mini-player */}
      <div className="an-watch__player">
        <div className="an-watch__player-art" style={{ background: anime.bannerGrad }} />
        <button
          type="button"
          className="an-watch__play"
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="an-watch__maximize"
          onClick={() => setMaximized((v) => !v)}
          aria-label={maximized ? "Minimize" : "Maximize"}
        >
          {maximized ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3" />
              <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
              <path d="M3 16h3a2 2 0 0 1 2 2v3" />
              <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8V5a2 2 0 0 1 2-2h3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
            </svg>
          )}
        </button>
        <div className="an-watch__player-bar">
          <span className="an-watch__time">04:32</span>
          <div className="an-watch__progress-track">
            <div className="an-watch__progress-fill" style={{ width: "23%" }} />
          </div>
          <span className="an-watch__time">19:48</span>
        </div>
      </div>

      <div className="an-detail__back" style={{ top: 8, left: 8, background: "rgba(0,0,0,0.6)" }} onClick={onBack} aria-label="Back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>

      <div ref={null} className="an-content">
        {/* Episode title + description */}
        <div className="an-watch__info">
          <span className="an-watch__ep-num">
            {anime.title} · Episode {currentEp.number}
          </span>
          <h1 className="an-watch__ep-title">{currentEp.title}</h1>
          <p className="an-watch__ep-desc">{currentEp.description}</p>
          <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
            <span className="an-ep__date">{currentEp.releaseDate}</span>
            <span className="an-ep__subdub">
              {currentEp.subAvailable && "SUB"}
              {currentEp.subAvailable && currentEp.dubAvailable && "•"}
              {currentEp.dubAvailable && "DUB"}
            </span>
          </div>
        </div>

        {/* Episode list */}
        <div style={{ paddingBottom: 110 }}>
          <SectionHeader title="All Episodes" action={`${anime.episodes} total`} />
          <div className="an-detail__ep-list">
            {allEpisodes.map((ep) => {
              // Mark current episode as current; override watched state for display
              const isCurrent = ep.number === currentEp.number;
              return (
                <div
                  key={ep.number}
                  style={{
                    outline: isCurrent ? "2px solid var(--color-primary)" : "none",
                    outlineOffset: -2,
                    borderRadius: 14,
                  }}
                >
                  <EpisodeRow
                    episode={ep}
                    onClick={() => onEpisodeChange(anime.id, ep.number)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
