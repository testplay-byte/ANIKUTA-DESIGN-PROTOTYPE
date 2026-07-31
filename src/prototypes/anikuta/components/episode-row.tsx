"use client";

/**
 * anikuta / components / episode-row — a single episode list entry.
 *
 * Layout: thumbnail (with EP# badge) + title + meta (date, sub/dub) + desc.
 *
 * Watched episodes get the `.an-ep--watched` class which applies
 * grayscale + blur to the thumbnail (the signature ANIKUTA effect).
 */
import type { Episode } from "../lib/types";

interface EpisodeRowProps {
  episode: Episode;
  onClick?: () => void;
}

export function EpisodeRow({ episode, onClick }: EpisodeRowProps) {
  const parts: string[] = [];
  if (episode.subAvailable) parts.push("SUB");
  if (episode.dubAvailable) parts.push("DUB");
  const subDubLabel = parts.join("•") || "SUB";

  return (
    <div
      className={`an-ep ${episode.watched ? "an-ep--watched" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="an-ep__thumb">
        <div
          className="an-ep__thumb-art"
          style={{ background: episode.thumbGrad }}
        />
        <span className="an-ep__thumb-letter" aria-hidden="true">
          {episode.thumbLetter}
        </span>
        <span className="an-ep__num">EP {episode.number}</span>
        <span className="an-ep__watched-badge">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          WATCHED
        </span>
      </div>
      <div className="an-ep__body">
        <p className="an-ep__title">{episode.title}</p>
        <div className="an-ep__meta">
          <span className="an-ep__date">{episode.releaseDate}</span>
          <span className="an-ep__subdub">{subDubLabel}</span>
        </div>
        <p className="an-ep__desc">{episode.description}</p>
      </div>
    </div>
  );
}
