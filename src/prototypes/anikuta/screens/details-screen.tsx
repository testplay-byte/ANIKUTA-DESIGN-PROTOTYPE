"use client";

/**
 * anikuta / screens / details-screen — pushed anime detail view.
 *
 * Layout:
 *   - Blurred cover header (gradient banner, blurred + gradient overlay)
 *   - Back button + Save/Share action buttons (top)
 *   - Cover thumbnail (100x150) + title + meta pills (score, status, eps, format)
 *   - CTA: "Add to Library" / "Start Watching"
 *   - Genre chips
 *   - Synopsis (expandable)
 *   - Episode list (watched = grayscale + blur effect)
 */
import { useMemo, useState } from "react";
import { EpisodeRow } from "../components/episode-row";
import { SectionHeader } from "../components/section-header";
import { getAnime, getEpisodes } from "../lib/mock-data";
import { fmtScore, formatLabel, statusLabel } from "../lib/format";

interface DetailsScreenProps {
  active: boolean;
  animeId: number | null;
  onBack: () => void;
  onWatch: (id: number, ep?: number) => void;
}

export function DetailsScreen({ active, animeId, onBack, onWatch }: DetailsScreenProps) {
  const anime = getAnime(animeId);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  const episodes = useMemo(() => (anime ? getEpisodes(anime) : []), [anime]);

  if (!anime) {
    return (
      <section
        className={`view ${active ? "view--active" : ""}`}
        data-view="details"
        data-push="true"
        aria-label="Anime details"
        aria-hidden={!active}
      >
        <div className="an-detail__content">
          <div className="an-lib__empty" style={{ marginTop: 80 }}>
            <h3 className="an-lib__empty-title">Select an anime</h3>
            <p className="an-lib__empty-desc">Tap any card to view details.</p>
          </div>
        </div>
      </section>
    );
  }

  // Reset state when anime changes (via key on the section)
  const metaPills: { label: string; type?: "score" | "primary" }[] = [];
  metaPills.push({ label: `★ ${fmtScore(anime.averageScore)}`, type: "score" });
  metaPills.push({ label: statusLabel(anime.status) });
  if (anime.episodes) metaPills.push({ label: `${anime.episodes} ep` });
  metaPills.push({ label: formatLabel(anime.format), type: "primary" });

  const continueEp = (anime.watchedEpisodes ?? 0) + 1;

  return (
    <section
      key={anime.id}
      className={`view ${active ? "view--active" : ""}`}
      data-view="details"
      data-push="true"
      aria-label="Anime details"
      aria-hidden={!active}
    >
      <div className="an-detail__content">
        {/* Banner with blurred cover header effect */}
        <div className="an-detail__banner">
          <div
            className="an-detail__banner-blur"
            style={{ background: anime.bannerGrad }}
          />
          <div
            className="an-detail__banner-art"
            style={{ background: anime.bannerGrad }}
          />
        </div>

        {/* Back button */}
        <button
          type="button"
          className="an-detail__back"
          onClick={onBack}
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Save / Share buttons */}
        <div className="an-detail__actions-top">
          <button
            type="button"
            className={`an-detail__action-btn ${saved ? "an-detail__action-btn--saved" : ""}`}
            onClick={() => setSaved((v) => !v)}
            aria-label={saved ? "Saved" : "Save"}
            title={saved ? "Saved to library" : "Save to library"}
          >
            {saved ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="an-detail__action-btn"
            aria-label="Share"
            title="Share"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>

        {/* Header: cover thumbnail + title + meta */}
        <div className="an-detail__header">
          <div className="an-detail__cover">
            <div className="an-detail__cover-art" style={{ background: anime.coverGrad }} />
            <span
              style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 36, fontWeight: 900, color: "rgba(255,255,255,0.92)",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              }}
              aria-hidden="true"
            >
              {anime.letter}
            </span>
          </div>
          <div className="an-detail__info">
            <h1 className="an-detail__title">{anime.title}</h1>
            {anime.titleEnglish && anime.titleEnglish !== anime.title && (
              <span className="an-detail__subtitle">{anime.titleEnglish}</span>
            )}
            <div className="an-detail__meta">
              {metaPills.map((p, i) => (
                <span
                  key={i}
                  className={`an-detail__meta-pill ${
                    p.type === "score" ? "an-detail__meta-pill--score" :
                    p.type === "primary" ? "an-detail__meta-pill--primary" : ""
                  }`}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="an-detail__cta">
          <button
            type="button"
            className="an-btn an-btn--filled"
            onClick={() => onWatch(anime.id, continueEp <= anime.episodes ? continueEp : 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            {(anime.watchedEpisodes ?? 0) > 0 ? `Continue Ep ${continueEp}` : "Start Watching"}
          </button>
          <button
            type="button"
            className="an-btn an-btn--outlined"
            onClick={() => setSaved((v) => !v)}
          >
            {saved ? "In Library" : "+ Add"}
          </button>
        </div>

        {/* Body */}
        <div className="an-detail__body">
          {/* Genres */}
          <div>
            <SectionHeader title="Genres" />
            <div className="an-detail__genres">
              {anime.genres.map((g) => (
                <span key={g} className="an-detail__genre">{g}</span>
              ))}
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <SectionHeader title="Synopsis" />
            <p className={`an-detail__synopsis ${synopsisExpanded ? "an-detail__synopsis--expanded" : ""}`}>
              {anime.synopsis}
            </p>
            <button
              type="button"
              className="an-detail__expand"
              onClick={() => setSynopsisExpanded((v) => !v)}
            >
              {synopsisExpanded ? "Show less" : "Read more"}
            </button>
          </div>

          {/* Episodes */}
          {episodes.length > 0 && (
            <div>
              <SectionHeader
                title="Episodes"
                action={`${anime.episodes} total`}
              />
              <div className="an-detail__ep-list">
                {episodes.map((ep) => (
                  <EpisodeRow
                    key={ep.number}
                    episode={ep}
                    onClick={() => onWatch(anime.id, ep.number)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
