"use client";

/**
 * anikuta / screens / downloads-screen — queue + downloaded files.
 *
 * Two sections:
 *   1. Download Queue (active downloads with progress bars)
 *   2. Downloaded Files (completed downloads with size + play)
 */
import { SectionHeader } from "../components/section-header";
import { DOWNLOADS, DOWNLOADED_FILES } from "../lib/mock-data";

interface DownloadsScreenProps {
  active: boolean;
  onBack: () => void;
  onOpenWatch: (id: number) => void;
}

export function DownloadsScreen({ active, onBack, onOpenWatch }: DownloadsScreenProps) {
  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view="downloads"
      data-push="true"
      aria-label="Downloads"
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
          Downloads
        </h1>
      </div>

      <div className="an-content">
        {/* Download Queue */}
        <div style={{ marginTop: "var(--sp-4)" }}>
          <SectionHeader
            title="Download Queue"
            action={`${DOWNLOADS.length} active`}
          />
          {DOWNLOADS.length === 0 ? (
            <div className="an-lib__empty" style={{ padding: "var(--sp-6)" }}>
              <div className="an-lib__empty-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <h3 className="an-lib__empty-title">Queue is empty</h3>
              <p className="an-lib__empty-desc">
                Episodes you download will appear here.
              </p>
            </div>
          ) : (
            DOWNLOADS.map((d, i) => (
              <div
                key={d.id}
                className="an-dl__queue-item"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="an-dl__queue-cover">
                  <div className="an-dl__queue-cover-art" style={{ background: d.coverGrad }} />
                  <span
                    style={{
                      position: "absolute", inset: 0, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 900, color: "rgba(255,255,255,0.92)",
                      textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                    }}
                    aria-hidden="true"
                  >
                    {d.letter}
                  </span>
                </div>
                <div className="an-dl__queue-info">
                  <h4 className="an-dl__queue-title">{d.title}</h4>
                  <span className="an-dl__queue-sub">
                    Episode {d.episode} ·{" "}
                    {d.status === "downloading" ? "Downloading" : "Queued"}
                  </span>
                  <div className="an-dl__queue-progress">
                    <div
                      className="an-dl__queue-progress-fill"
                      style={{ width: `${d.progress}%` }}
                    />
                  </div>
                </div>
                <span className="an-dl__queue-pct">{d.progress}%</span>
              </div>
            ))
          )}
        </div>

        {/* Downloaded Files */}
        <div style={{ marginTop: "var(--sp-5)" }}>
          <SectionHeader
            title="Downloaded"
            action={`${DOWNLOADED_FILES.length} files`}
          />
          {DOWNLOADED_FILES.map((d, i) => (
            <div
              key={d.id}
              className="an-dl__file"
              style={{ animationDelay: `${i * 40}ms` }}
              onClick={() => onOpenWatch(d.animeId)}
              role="button"
              tabIndex={0}
            >
              <div className="an-dl__file-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                </svg>
              </div>
              <div className="an-dl__file-info">
                <h4 className="an-dl__file-title">
                  {d.title} · EP {d.episode}
                </h4>
                <span className="an-dl__file-sub">Downloaded · 1080p · SUB</span>
              </div>
              <span className="an-dl__file-size">{d.size}</span>
            </div>
          ))}
        </div>

        <div className="an-bottom-pad" />
      </div>
    </section>
  );
}
