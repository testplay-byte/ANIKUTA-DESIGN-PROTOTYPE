"use client";

/**
 * anikuta / screens / home-screen — landing screen.
 *
 * Sections:
 *   1. Trending hero card (featured anime)
 *   2. Continue Watching (horizontal row with progress)
 *   3. Popular This Season (3-col grid)
 *   4. Top Rated (3-col grid)
 *
 * CollapsingHeader "Home" with search + history icons.
 * Pull-to-refresh visual at the top.
 */
import { useState } from "react";
import { CollapsingHeader } from "../components/collapsing-header";
import { SectionHeader } from "../components/section-header";
import { AnimeCard } from "../components/anime-card";
import { useCollapsingHeader } from "../hooks/use-collapsing-header";
import {
  TRENDING,
  POPULAR_THIS_SEASON,
  TOP_RATED,
  CONTINUE_WATCHING,
} from "../lib/mock-data";
import { fmtScore } from "../lib/format";

interface HomeScreenProps {
  active: boolean;
  onOpenAnime: (id: number) => void;
  onOpenSearch: () => void;
  onOpenHistory: () => void;
  onOpenWatch: (id: number) => void;
}

export function HomeScreen({
  active,
  onOpenAnime,
  onOpenSearch,
  onOpenHistory,
  onOpenWatch,
}: HomeScreenProps) {
  const { contentRef, collapsed } = useCollapsingHeader();
  const [refreshing, setRefreshing] = useState(false);
  const hero = TRENDING[0];

  function refresh() {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1400);
  }

  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view="home"
      aria-label="Home"
      aria-hidden={!active}
    >
      <CollapsingHeader title="Home" collapsed={collapsed}>
        <button
          type="button"
          className="an-topbar__iconbtn"
          onClick={onOpenSearch}
          aria-label="Search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        <button
          type="button"
          className="an-topbar__iconbtn"
          onClick={onOpenHistory}
          aria-label="History"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M12 7v5l4 2" />
          </svg>
        </button>
      </CollapsingHeader>

      <div
        ref={contentRef}
        className="an-content"
        onTouchStart={(e) => {
          // Pull-to-refresh: if at top and pulled down, show refreshing
          if (contentRef.current && contentRef.current.scrollTop === 0 && e.touches[0].clientY > 0) {
            // simple visual trigger on touch start at top
          }
        }}
      >
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

        {/* Hero / Trending */}
        <div className="an-home__hero" onClick={() => onOpenAnime(hero.id)}>
          <div className="an-home__hero-art" style={{ background: hero.bannerGrad }} />
          <div className="an-home__hero-content">
            <span className="an-home__hero-badge">★ Trending #{hero.id}</span>
            <h2 className="an-home__hero-title">{hero.title}</h2>
            <div className="an-home__hero-meta">
              <span>★ {fmtScore(hero.averageScore)}</span>
              <span>·</span>
              <span>{hero.format}</span>
              <span>·</span>
              <span>{hero.episodes} ep</span>
            </div>
          </div>
        </div>

        {/* Continue Watching */}
        {CONTINUE_WATCHING.length > 0 && (
          <div className="an-home__section">
            <SectionHeader title="Continue Watching" action="See all" onAction={onOpenHistory} />
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
                    <div className="an-cw-card__thumb-art" style={{ background: item.bannerGrad }} />
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

        {/* Popular This Season */}
        <div className="an-home__section">
          <SectionHeader title="Popular This Season" action="See all" onAction={refresh} />
          <div className="an-grid-3">
            {POPULAR_THIS_SEASON.map((a, i) => (
              <AnimeCard key={a.id} anime={a} index={i} onClick={onOpenAnime} />
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div className="an-home__section an-bottom-pad">
          <SectionHeader title="Top Rated" action="See all" onAction={refresh} />
          <div className="an-grid-3">
            {TOP_RATED.map((a, i) => (
              <AnimeCard key={a.id} anime={a} index={i} onClick={onOpenAnime} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
