"use client";

/**
 * anikuta / components / anime-card — grid tile (cover + title + score).
 *
 * The cover is a CSS gradient placeholder with a large first-letter overlay
 * (no real image URLs). Used in: home, search results, library grid.
 *
 * Staggered fade-in driven by `index` via inline `animationDelay`.
 */
import type { Anime } from "../lib/types";
import { fmtScore } from "../lib/format";

interface AnimeCardProps {
  anime: Anime;
  index: number;
  onClick: (id: number) => void;
}

export function AnimeCard({ anime, index, onClick }: AnimeCardProps) {
  return (
    <div
      className="an-card"
      style={{ animationDelay: `${index * 35}ms` }}
      onClick={() => onClick(anime.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(anime.id);
        }
      }}
    >
      <div className="an-card__cover">
        <div
          className="an-card__cover-art"
          style={{ background: anime.coverGrad }}
        />
        <span className="an-card__cover-letter" aria-hidden="true">
          {anime.letter}
        </span>
        {anime.averageScore ? (
          <span className="an-card__score">
            <span className="an-card__score-star">★</span>
            {fmtScore(anime.averageScore)}
          </span>
        ) : null}
      </div>
      <h3 className="an-card__title">{anime.title}</h3>
      <span className="an-card__meta">
        {anime.format} · {anime.seasonYear}
      </span>
    </div>
  );
}
