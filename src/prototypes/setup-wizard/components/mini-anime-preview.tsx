"use client";

/**
 * setup-wizard / components / mini-anime-preview — a mini live preview of an
 * anime app that auto-cycles through its screens (home, library, search,
 * settings, detail, player), used as the hero animation on the Choose Theme
 * screen.
 *
 * The preview is a small phone-shaped frame whose inner screen crossfades
 * between stylized representations of each app screen every ~2.6s. It uses
 * only CSS tokens so it adapts to the active palette automatically.
 */
import { useEffect, useState } from "react";

type View = "home" | "library" | "search" | "settings" | "detail" | "player";

const VIEWS: { id: View; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "library", label: "Library" },
  { id: "search", label: "Search" },
  { id: "settings", label: "Settings" },
  { id: "detail", label: "Detail" },
  { id: "player", label: "Player" },
];

export function MiniAnimePreview() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % VIEWS.length);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const current = VIEWS[idx];

  return (
    <div className="mini-preview" role="img" aria-label={`Mini preview: ${current.label} screen`}>
      <span className="mini-preview__notch" />
      <div className="mini-preview__screen">
        {/* Home */}
        <div className={`mini-preview__view ${current.id === "home" ? "mini-preview__view--active" : ""}`}>
          <span className="mp-banner" />
          <span className="mp-bar mp-bar--p" />
          <span className="mp-bar mp-bar--short" />
          <div className="mp-grid">
            <span /><span /><span />
            <span /><span /><span />
          </div>
        </div>
        {/* Library */}
        <div className={`mini-preview__view ${current.id === "library" ? "mini-preview__view--active" : ""}`}>
          <span className="mp-bar mp-bar--p mp-bar--short" />
          <div className="mp-grid">
            <span /><span /><span />
            <span /><span /><span />
            <span /><span /><span />
          </div>
        </div>
        {/* Search */}
        <div className={`mini-preview__view ${current.id === "search" ? "mini-preview__view--active" : ""}`}>
          <div className="mp-search">
            <span className="mp-search__dot" />
            <span className="mp-bar mp-bar--short" style={{ height: 6 }} />
          </div>
          <div className="mp-toggle">
            <span /><span />
          </div>
          <div className="mp-grid">
            <span /><span /><span />
          </div>
        </div>
        {/* Settings */}
        <div className={`mini-preview__view ${current.id === "settings" ? "mini-preview__view--active" : ""}`}>
          <span className="mp-bar mp-bar--p mp-bar--short" />
          <div className="mp-toggle-pill mp-toggle-pill--on" />
          <div className="mp-toggle-pill" />
          <div className="mp-toggle-pill mp-toggle-pill--on" />
          <div className="mp-toggle-pill" />
        </div>
        {/* Detail */}
        <div className={`mini-preview__view ${current.id === "detail" ? "mini-preview__view--active" : ""}`}>
          <span className="mp-detail-banner" />
          <span className="mp-bar mp-bar--p" />
          <span className="mp-bar" />
          <span className="mp-bar mp-bar--short" />
          <div className="mp-row">
            <span className="mp-row__poster" />
            <span className="mp-row__lines">
              <span className="mp-bar" style={{ height: 5 }} />
              <span className="mp-bar mp-bar--short" style={{ height: 5 }} />
            </span>
          </div>
        </div>
        {/* Player */}
        <div className={`mini-preview__view ${current.id === "player" ? "mini-preview__view--active" : ""}`}>
          <div className="mp-player">
            <span className="mp-player__play" />
            <span className="mp-player__bar" />
          </div>
        </div>

        <span className="mini-preview__label">{current.label}</span>
      </div>
    </div>
  );
}
