"use client";

/**
 * anikuta / screens / extensions-screen — anime/manga sources.
 *
 * Layout:
 *   - Anime / Manga toggle at top
 *   - Trusted Sources (max 2) — installed + trusted
 *   - Installed — installed but not trusted
 *   - Available — not installed
 *
 * Each extension: squircle icon + name + lang/version + action button
 * (Install / Trust / Delete).
 */
import { useState } from "react";
import { CollapsingHeader } from "../components/collapsing-header";
import { SectionHeader } from "../components/section-header";
import { SegmentedToggle } from "../components/segmented-toggle";
import { useCollapsingHeader } from "../hooks/use-collapsing-header";
import { EXTENSIONS } from "../lib/mock-data";
import type { Extension, ExtType } from "../lib/types";

interface ExtensionsScreenProps {
  active: boolean;
  onBack: () => void;
}

export function ExtensionsScreen({ active, onBack }: ExtensionsScreenProps) {
  const { contentRef, collapsed } = useCollapsingHeader();
  const [type, setType] = useState<ExtType>("anime");
  const [exts, setExts] = useState<Extension[]>(EXTENSIONS);

  const filtered = exts.filter((e) => e.type === type);
  const trusted = filtered.filter((e) => e.isTrustedSource);
  const installed = filtered.filter((e) => e.installed && !e.isTrustedSource);
  const available = filtered.filter((e) => !e.installed);

  function install(id: string) {
    setExts((prev) =>
      prev.map((e) => (e.id === id ? { ...e, installed: true } : e)),
    );
  }

  function uninstall(id: string) {
    setExts((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, installed: false, trusted: false } : e,
      ),
    );
  }

  function trust(id: string) {
    setExts((prev) =>
      prev.map((e) => (e.id === id ? { ...e, trusted: !e.trusted } : e)),
    );
  }

  function renderAction(ext: Extension) {
    if (!ext.installed) {
      return (
        <button
          type="button"
          className="an-ext__action an-ext__action--install"
          onClick={() => install(ext.id)}
        >
          Install
        </button>
      );
    }
    // Installed
    if (ext.isTrustedSource) {
      return (
        <span className="an-ext__action an-ext__action--trusted">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Trusted
        </span>
      );
    }
    return (
      <div style={{ display: "flex", gap: 6 }}>
        <button
          type="button"
          className={`an-ext__action ${ext.trusted ? "an-ext__action--trusted" : "an-ext__action--trust"}`}
          onClick={() => trust(ext.id)}
        >
          {ext.trusted ? "Trusted" : "Trust"}
        </button>
        <button
          type="button"
          className="an-ext__action an-ext__action--delete"
          onClick={() => uninstall(ext.id)}
          aria-label="Delete"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>
    );
  }

  function renderExt(ext: Extension) {
    return (
      <div key={ext.id} className="an-ext__ext">
        <div className="an-ext__icon" style={{ background: ext.iconGrad }}>
          <div className="an-ext__icon-art" />
          <span className="an-ext__icon-letter">{ext.iconLetter}</span>
        </div>
        <div className="an-ext__info">
          <h4 className="an-ext__name">{ext.name}</h4>
          <span className="an-ext__sub">
            {ext.lang.toUpperCase()} · v{ext.version}
          </span>
        </div>
        {renderAction(ext)}
      </div>
    );
  }

  return (
    <section
      className={`view ${active ? "view--active" : ""}`}
      data-view="extensions"
      data-push="true"
      aria-label="Extensions"
      aria-hidden={!active}
    >
      <CollapsingHeader title="Extensions" collapsed={collapsed}>
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
        {/* Anime / Manga toggle */}
        <div style={{ padding: "0 var(--sp-4) var(--sp-3)" }}>
          <SegmentedToggle
            options={[
              { value: "anime", label: "Anime" },
              { value: "manga", label: "Manga" },
            ]}
            value={type}
            onChange={(v) => setType(v as ExtType)}
          />
        </div>

        {/* Trusted Sources (max 2) */}
        <div className="an-ext__cat-label">
          Trusted Sources
          <span className="an-ext__cat-count">{trusted.length}/2</span>
        </div>
        <div className="an-more__group" style={{ margin: "0 var(--sp-4) var(--sp-4)" }}>
          {trusted.length === 0 ? (
            <div style={{ padding: "var(--sp-4)", color: "var(--color-text-muted)", fontSize: 12, fontWeight: 700, textAlign: "center" }}>
              No trusted sources. Trust up to 2 sources for tighter security.
            </div>
          ) : (
            trusted.map(renderExt)
          )}
        </div>

        {/* Installed */}
        {installed.length > 0 && (
          <>
            <div className="an-ext__cat-label">
              Installed
              <span className="an-ext__cat-count">{installed.length}</span>
            </div>
            <div className="an-more__group" style={{ margin: "0 var(--sp-4) var(--sp-4)" }}>
              {installed.map(renderExt)}
            </div>
          </>
        )}

        {/* Available */}
        {available.length > 0 && (
          <>
            <div className="an-ext__cat-label">
              Available
              <span className="an-ext__cat-count">{available.length}</span>
            </div>
            <div className="an-more__group" style={{ margin: "0 var(--sp-4) var(--sp-4)" }}>
              {available.map(renderExt)}
            </div>
          </>
        )}

        <div className="an-bottom-pad" />
      </div>
    </section>
  );
}
