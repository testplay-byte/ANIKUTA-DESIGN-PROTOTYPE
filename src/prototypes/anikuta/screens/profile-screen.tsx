"use client";

/**
 * anikuta / screens / profile-screen — "My" stats page.
 *
 * Sections:
 *   - Stats hero (avatar + name + total anime/episodes)
 *   - Genre distribution chart (horizontal bars)
 *   - Format distribution (TV / Movie / OVA / ONA)
 *   - Status breakdown (Releasing / Finished)
 *   - Score distribution (90+ / 80-89 / 70-79 / <70)
 *   - Country distribution (Japan / Korea / ...)
 *   - Recently watched row (horizontal)
 */
import { CollapsingHeader } from "../components/collapsing-header";
import { SectionHeader } from "../components/section-header";
import { useCollapsingHeader } from "../hooks/use-collapsing-header";
import { ANIME, HISTORY } from "../lib/mock-data";
import {
  getCountryDistribution,
  getFormatDistribution,
  getGenreDistribution,
  getScoreDistribution,
  getStatusDistribution,
} from "../lib/mock-data";
import { fmtScore } from "../lib/format";

interface ProfileScreenProps {
  active: boolean;
  onOpenAnime: (id: number) => void;
  onOpenWatch: (id: number) => void;
  onBack: () => void;
}

export function ProfileScreen({
  active,
  onOpenAnime,
  onOpenWatch,
  onBack,
}: ProfileScreenProps) {
  const { contentRef, collapsed } = useCollapsingHeader();
  const genreDist = getGenreDistribution();
  const formatDist = getFormatDistribution();
  const statusDist = getStatusDistribution();
  const scoreDist = getScoreDistribution();
  const countryDist = getCountryDistribution();

  const totalAnime = ANIME.length;
  const totalEps = ANIME.reduce((sum, a) => sum + (a.watchedEpisodes ?? 0), 0);
  const totalHours = Math.round((totalEps * 24) / 60);

  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view="profile"
      data-push="true"
      aria-label="My Profile"
      aria-hidden={!active}
    >
      <CollapsingHeader title="My" collapsed={collapsed}>
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
        {/* Stats hero */}
        <div className="an-profile__stats-hero">
          <div className="an-profile__avatar">A</div>
          <div className="an-profile__stats-hero-info">
            <h2 className="an-profile__stats-hero-name">Anime Fan</h2>
            <span className="an-profile__stats-hero-sub">
              {totalAnime} anime · {totalEps} episodes · {totalHours}h watched
            </span>
          </div>
        </div>

        {/* Genre distribution */}
        <div className="an-profile__section">
          <SectionHeader title="Genre Distribution" />
          <div className="an-profile__dist">
            {genreDist.map((d) => (
              <div key={d.label} className="an-profile__dist-row">
                <span className="an-profile__dist-label">{d.label}</span>
                <div className="an-profile__dist-track">
                  <div
                    className="an-profile__dist-fill"
                    style={{ width: `${d.count}%`, background: d.color }}
                  />
                </div>
                <span className="an-profile__dist-num">{d.count}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Format distribution */}
        <div className="an-profile__section">
          <SectionHeader title="Format Distribution" />
          <div className="an-profile__dist">
            {formatDist.map((d) => {
              const max = Math.max(...formatDist.map((x) => x.count));
              return (
                <div key={d.label} className="an-profile__dist-row">
                  <span className="an-profile__dist-label">{d.label}</span>
                  <div className="an-profile__dist-track">
                    <div
                      className="an-profile__dist-fill"
                      style={{
                        width: `${(d.count / max) * 100}%`,
                        background: d.color,
                      }}
                    />
                  </div>
                  <span className="an-profile__dist-num">{d.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status breakdown */}
        <div className="an-profile__section">
          <SectionHeader title="Status Breakdown" />
          <div className="an-profile__dist">
            {statusDist.map((d) => {
              const max = Math.max(...statusDist.map((x) => x.count));
              return (
                <div key={d.label} className="an-profile__dist-row">
                  <span className="an-profile__dist-label">{d.label}</span>
                  <div className="an-profile__dist-track">
                    <div
                      className="an-profile__dist-fill"
                      style={{
                        width: `${(d.count / max) * 100}%`,
                        background: d.color,
                      }}
                    />
                  </div>
                  <span className="an-profile__dist-num">{d.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Score distribution */}
        <div className="an-profile__section">
          <SectionHeader title="Score Distribution" />
          <div className="an-profile__dist">
            {scoreDist.map((d) => {
              const max = Math.max(...scoreDist.map((x) => x.count));
              return (
                <div key={d.label} className="an-profile__dist-row">
                  <span className="an-profile__dist-label">{d.label}</span>
                  <div className="an-profile__dist-track">
                    <div
                      className="an-profile__dist-fill"
                      style={{
                        width: `${(d.count / max) * 100}%`,
                        background: d.color,
                      }}
                    />
                  </div>
                  <span className="an-profile__dist-num">{d.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Country distribution */}
        <div className="an-profile__section">
          <SectionHeader title="Country Distribution" />
          <div className="an-profile__dist">
            {countryDist.map((d) => {
              const max = Math.max(...countryDist.map((x) => x.count));
              return (
                <div key={d.label} className="an-profile__dist-row">
                  <span className="an-profile__dist-label">{d.label}</span>
                  <div className="an-profile__dist-track">
                    <div
                      className="an-profile__dist-fill"
                      style={{
                        width: `${(d.count / max) * 100}%`,
                        background: d.color,
                      }}
                    />
                  </div>
                  <span className="an-profile__dist-num">{d.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recently watched row */}
        <div className="an-profile__section an-bottom-pad">
          <SectionHeader title="Recently Watched" action="See all" onAction={() => {}} />
          <div className="an-hscroll">
            {HISTORY.slice(0, 6).map((h, i) => {
              const anime = ANIME.find((a) => a.id === h.animeId);
              return (
                <div
                  key={`${h.animeId}-${i}`}
                  className="an-card"
                  style={{ width: 110, animationDelay: `${i * 40}ms` }}
                  onClick={() => anime && onOpenAnime(anime.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="an-card__cover">
                    <div className="an-card__cover-art" style={{ background: h.coverGrad }} />
                    <span className="an-card__cover-letter" aria-hidden="true">
                      {h.letter}
                    </span>
                    {anime && (
                      <span className="an-card__score">
                        <span className="an-card__score-star">★</span>
                        {fmtScore(anime.averageScore)}
                      </span>
                    )}
                  </div>
                  <h3 className="an-card__title" style={{ fontSize: 11 }}>
                    EP {h.episode}
                  </h3>
                  <span className="an-card__meta">{h.title.slice(0, 14)}…</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
