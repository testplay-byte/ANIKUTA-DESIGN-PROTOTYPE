"use client";

/**
 * anikuta / screens / settings-subpage-screen — generic settings page for
 * the More-menu items that don't have a dedicated screen (Appearance,
 * Display, Data, About, Trackers, Details Settings).
 *
 * Each settings type gets a small set of realistic mock rows + toggles.
 */
import { useState } from "react";
import { SectionHeader } from "../components/section-header";
import { SegmentedToggle, Toggle } from "../components/segmented-toggle";

interface SettingsSubpageScreenProps {
  active: boolean;
  section: string;
  onBack: () => void;
}

/** Title-case the section id into a readable page title. */
function titleFor(section: string): string {
  const map: Record<string, string> = {
    appearance: "Appearance",
    display: "Display",
    data: "Data & Storage",
    about: "About ANIKUTA",
    trackers: "Trackers",
    details: "Details Settings",
  };
  return map[section] ?? section;
}

export function SettingsSubpageScreen({
  active,
  section,
  onBack,
}: SettingsSubpageScreenProps) {
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("lime");
  const [boldText, setBoldText] = useState(true);
  const [cardDensity, setCardDensity] = useState("default");
  const [posterStyle, setPosterStyle] = useState("rounded");
  const [animSpeed, setAnimSpeed] = useState("normal");
  const [singleLineTitles, setSingleLineTitles] = useState(true);
  const [autoCache, setAutoCache] = useState(true);
  const [loadImages, setLoadImages] = useState(true);
  const [anilistConnected, setAnilistConnected] = useState(true);
  const [malConnected, setMalConnected] = useState(false);
  const [showEpCount, setShowEpCount] = useState(true);
  const [showSubDub, setShowSubDub] = useState(true);
  const [expandSynopsis, setExpandSynopsis] = useState(false);

  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view={`settings-${section}`}
      data-push="true"
      aria-label={titleFor(section)}
      aria-hidden={!active}
    >
      <div className="an-topbar">
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
        <h1 className="an-topbar__title" style={{ fontSize: "var(--fs-h3)" }}>
          {titleFor(section)}
        </h1>
      </div>

      <div className="an-content">
        {section === "appearance" && (
          <>
            <div style={{ marginTop: "var(--sp-4)" }}>
              <SectionHeader title="Theme" />
              <div className="an-settings__group">
                <div className="an-settings__row">
                  <span className="an-settings__row-label">Mode</span>
                  <div style={{ flex: "0 0 auto", minWidth: 180 }}>
                    <SegmentedToggle
                      options={[
                        { value: "light", label: "Light" },
                        { value: "dark", label: "Dark" },
                        { value: "system", label: "Auto" },
                      ]}
                      value={theme}
                      onChange={setTheme}
                    />
                  </div>
                </div>
                <div className="an-settings__row">
                  <span className="an-settings__row-label">Accent color</span>
                  <div style={{ flex: "0 0 auto", minWidth: 180 }}>
                    <SegmentedToggle
                      options={[
                        { value: "lime", label: "Lime" },
                        { value: "purple", label: "Purple" },
                        { value: "peach", label: "Peach" },
                      ]}
                      value={accent}
                      onChange={setAccent}
                    />
                  </div>
                </div>
                <div className="an-settings__row">
                  <div>
                    <span className="an-settings__row-label">Bold text</span>
                    <div className="an-settings__row-sub">Render all text bold (ANIKUTA style)</div>
                  </div>
                  <Toggle on={boldText} onChange={setBoldText} aria-label="Bold text" />
                </div>
              </div>
            </div>
          </>
        )}

        {section === "display" && (
          <>
            <div style={{ marginTop: "var(--sp-4)" }}>
              <SectionHeader title="Cards" />
              <div className="an-settings__group">
                <div className="an-settings__row">
                  <span className="an-settings__row-label">Card density</span>
                  <div style={{ flex: "0 0 auto", minWidth: 180 }}>
                    <SegmentedToggle
                      options={[
                        { value: "compact", label: "Compact" },
                        { value: "default", label: "Default" },
                        { value: "comfortable", label: "Comfy" },
                      ]}
                      value={cardDensity}
                      onChange={setCardDensity}
                    />
                  </div>
                </div>
                <div className="an-settings__row">
                  <span className="an-settings__row-label">Poster style</span>
                  <div style={{ flex: "0 0 auto", minWidth: 180 }}>
                    <SegmentedToggle
                      options={[
                        { value: "rounded", label: "Rounded" },
                        { value: "soft", label: "Soft" },
                        { value: "sharp", label: "Sharp" },
                      ]}
                      value={posterStyle}
                      onChange={setPosterStyle}
                    />
                  </div>
                </div>
                <div className="an-settings__row">
                  <div>
                    <span className="an-settings__row-label">Single-line titles</span>
                    <div className="an-settings__row-sub">Truncate long titles to one line</div>
                  </div>
                  <Toggle on={singleLineTitles} onChange={setSingleLineTitles} aria-label="Single line titles" />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "var(--sp-5)" }}>
              <SectionHeader title="Animation" />
              <div className="an-settings__group">
                <div className="an-settings__row">
                  <span className="an-settings__row-label">Animation speed</span>
                  <div style={{ flex: "0 0 auto", minWidth: 180 }}>
                    <SegmentedToggle
                      options={[
                        { value: "fast", label: "Fast" },
                        { value: "normal", label: "Normal" },
                        { value: "slow", label: "Slow" },
                      ]}
                      value={animSpeed}
                      onChange={setAnimSpeed}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {section === "data" && (
          <>
            <div style={{ marginTop: "var(--sp-4)" }}>
              <SectionHeader title="Cache" />
              <div className="an-settings__group">
                <div className="an-settings__row">
                  <div>
                    <span className="an-settings__row-label">Auto-clear cache</span>
                    <div className="an-settings__row-sub">Free up space weekly</div>
                  </div>
                  <Toggle on={autoCache} onChange={setAutoCache} aria-label="Auto cache" />
                </div>
                <div className="an-settings__row">
                  <div>
                    <span className="an-settings__row-label">Load cover images</span>
                    <div className="an-settings__row-sub">Show anime covers in lists</div>
                  </div>
                  <Toggle on={loadImages} onChange={setLoadImages} aria-label="Load images" />
                </div>
                <button type="button" className="an-settings__row" style={{ cursor: "pointer", width: "100%", background: "none", border: "none", textAlign: "left" }}>
                  <span className="an-settings__row-label">Clear cache now</span>
                  <span className="an-settings__row-value">42.8 MB</span>
                </button>
              </div>
            </div>
          </>
        )}

        {section === "about" && (
          <>
            <div className="an-settings__about" style={{ marginTop: "var(--sp-6)" }}>
              <div className="an-settings__about-logo">A</div>
              <h2 className="an-settings__about-name">ANIKUTA</h2>
              <span className="an-settings__about-ver">Version 1.0.0 · Build 1</span>
            </div>
            <div style={{ marginTop: "var(--sp-4)" }}>
              <SectionHeader title="Info" />
              <div className="an-settings__group">
                <div className="an-settings__row">
                  <span className="an-settings__row-label">Source</span>
                  <span className="an-settings__row-value">GitHub</span>
                </div>
                <div className="an-settings__row">
                  <span className="an-settings__row-label">License</span>
                  <span className="an-settings__row-value">MIT</span>
                </div>
                <div className="an-settings__row">
                  <span className="an-settings__row-label">Anime data</span>
                  <span className="an-settings__row-value">AniList</span>
                </div>
                <div className="an-settings__row">
                  <span className="an-settings__row-label">Made with</span>
                  <span className="an-settings__row-value">♥ + React</span>
                </div>
              </div>
            </div>
          </>
        )}

        {section === "trackers" && (
          <>
            <div style={{ marginTop: "var(--sp-4)" }}>
              <SectionHeader title="Connected Trackers" />
              <div className="an-settings__group">
                <div className="an-settings__row">
                  <div>
                    <span className="an-settings__row-label">AniList</span>
                    <div className="an-settings__row-sub">@anikuta_user · 248 anime</div>
                  </div>
                  <Toggle on={anilistConnected} onChange={setAnilistConnected} aria-label="AniList" />
                </div>
                <div className="an-settings__row">
                  <div>
                    <span className="an-settings__row-label">MyAnimeList</span>
                    <div className="an-settings__row-sub">Not connected</div>
                  </div>
                  <Toggle on={malConnected} onChange={setMalConnected} aria-label="MyAnimeList" />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "var(--sp-5)" }}>
              <SectionHeader title="Sync" />
              <div className="an-settings__group">
                <div className="an-settings__row">
                  <span className="an-settings__row-label">Auto-sync library</span>
                  <Toggle on onChange={() => {}} aria-label="Auto sync" />
                </div>
                <div className="an-settings__row">
                  <span className="an-settings__row-label">Sync on Wi-Fi only</span>
                  <Toggle on onChange={() => {}} aria-label="Wifi sync" />
                </div>
              </div>
            </div>
          </>
        )}

        {section === "details" && (
          <>
            <div style={{ marginTop: "var(--sp-4)" }}>
              <SectionHeader title="Episode List" />
              <div className="an-settings__group">
                <div className="an-settings__row">
                  <div>
                    <span className="an-settings__row-label">Show episode count</span>
                    <div className="an-settings__row-sub">Display "EP 1" badge on thumbnails</div>
                  </div>
                  <Toggle on={showEpCount} onChange={setShowEpCount} aria-label="Episode count" />
                </div>
                <div className="an-settings__row">
                  <div>
                    <span className="an-settings__row-label">Show SUB/DUB badge</span>
                    <div className="an-settings__row-sub">Indicate available audio tracks</div>
                  </div>
                  <Toggle on={showSubDub} onChange={setShowSubDub} aria-label="Sub dub" />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "var(--sp-5)" }}>
              <SectionHeader title="Synopsis" />
              <div className="an-settings__group">
                <div className="an-settings__row">
                  <div>
                    <span className="an-settings__row-label">Auto-expand synopsis</span>
                    <div className="an-settings__row-sub">Show full text without "Read more"</div>
                  </div>
                  <Toggle on={expandSynopsis} onChange={setExpandSynopsis} aria-label="Expand synopsis" />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="an-bottom-pad" />
      </div>
    </section>
  );
}
