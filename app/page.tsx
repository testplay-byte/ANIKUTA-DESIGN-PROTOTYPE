import "../src/dashboard/dashboard.css";
import { ThemeToggle } from "../src/dashboard/theme-toggle";

export default function Page() {
  return (
    <>
      {/* =================== Top navigation (split) =================== */}
      <header className="topnav">
        <div className="topnav__inner">
          <a className="brand" href="./" aria-label="ANIKUTA-DESIGN-PROTOTYPE home">
            <span className="brand__logo" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="2" width="12" height="20" rx="3" />
                <path d="M11 18h2" />
                <path d="M9 6h6" />
              </svg>
            </span>
            <span className="brand__text">
              <span className="brand__name">ANIKUTA-DESIGN-PROTOTYPE</span>
              <span className="brand__sub">mobile UI · prototypes · design</span>
            </span>
          </a>
          <nav className="navpill" aria-label="Site">
            <a
              className="navbtn"
              href="https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="lbl">Repo</span>
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="wrap">
        {/* =================== Hero =================== */}
        <section className="hero" id="top">
          <h1 className="hero__title">Interactive mobile UI prototypes</h1>
          <p className="hero__subtitle">live in your browser.</p>

          {/* 4 stat cards */}
          <div className="stats">
            <div className="stat">
              <div className="stat__head">
                <span className="stat__icon" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="2" width="12" height="20" rx="3" />
                    <path d="M11 18h2" />
                  </svg>
                </span>
                <span className="stat__label">Prototypes</span>
              </div>
              <div className="stat__value">
                <span className="stat__num">3</span>
                <span className="stat__hint">active</span>
              </div>
            </div>
            <div className="stat">
              <div className="stat__head">
                <span className="stat__icon" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </span>
                <span className="stat__label">Screens</span>
              </div>
              <div className="stat__value">
                <span className="stat__num">26</span>
                <span className="stat__hint">total</span>
              </div>
            </div>
            <div className="stat">
              <div className="stat__head">
                <span className="stat__icon" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                    <path d="M12 22V12" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                  </svg>
                </span>
                <span className="stat__label">Components</span>
              </div>
              <div className="stat__value">
                <span className="stat__num">16</span>
                <span className="stat__hint">reusable</span>
              </div>
            </div>
            <div className="stat">
              <div className="stat__head">
                <span className="stat__icon" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M12 7v5l4 2" />
                  </svg>
                </span>
                <span className="stat__label">Last updated</span>
              </div>
              <div className="stat__value">
                <span className="stat__num">2025-07-27</span>
              </div>
            </div>
          </div>

          {/* two-up: screens breakdown + repo file mix */}
          <div className="twoup">
            {/* Bars: screens per prototype */}
            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">Screens per prototype</h2>
                <span className="panel__hint">26 total · hover for detail</span>
              </div>
              <ul className="bars">
                <li
                  className="bar"
                  title="Anime App: Home, Search, Library, History, Schedule, Settings, Detail — 7 screens"
                >
                  <span className="bar__icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="6" y="2" width="12" height="20" rx="3" />
                    </svg>
                  </span>
                  <span className="bar__label">Anime App</span>
                  <span className="bar__track">
                    <span
                      className="bar__fill"
                      style={{ width: "54%", background: "var(--chart-1)" }}
                    />
                  </span>
                  <span className="bar__count">7</span>
                </li>
                <li
                  className="bar"
                  title="Setup Wizard: Welcome, Theme, Folder, Permissions, Restore, Format Not Supported, Processing Backup, Backup Summary, Linking Anime, Manual Linking, Restore Summary, Restore Successful, Finish — 13 screens"
                >
                  <span className="bar__icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 20V10" />
                      <path d="M18 20V4" />
                      <path d="M6 20v-4" />
                    </svg>
                  </span>
                  <span className="bar__label">Setup Wizard</span>
                  <span className="bar__track">
                    <span
                      className="bar__fill"
                      style={{ width: "100%", background: "var(--chart-2)" }}
                    />
                  </span>
                  <span className="bar__count">13</span>
                </li>
                <li
                  className="bar"
                  title="Setup Wizard v2: Welcome, Theme, Permissions, Storage, Backup & Restore, Finish — 6 screens"
                >
                  <span className="bar__icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                  <span className="bar__label">Wizard v2</span>
                  <span className="bar__track">
                    <span
                      className="bar__fill"
                      style={{ width: "46%", background: "var(--chart-3)" }}
                    />
                  </span>
                  <span className="bar__count">6</span>
                </li>
              </ul>
            </div>

            {/* Donut: repo file mix */}
            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">Repository overview</h2>
                <span className="panel__hint">3 prototypes · 2 Android apps</span>
              </div>
              <div className="donut-wrap">
                <div className="donut" role="img" aria-label="Repository distribution">
                  <svg width="180" height="180" viewBox="0 0 180 180">
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="28"
                    />
                    {/* Web prototypes 50% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--chart-1)"
                      strokeWidth="28"
                      strokeDasharray="238.8 477.5"
                      strokeDashoffset="0"
                    />
                    {/* Android apps 35% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--chart-2)"
                      strokeWidth="28"
                      strokeDasharray="167.1 477.5"
                      strokeDashoffset="-238.8"
                    />
                    {/* Documentation 15% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--chart-3)"
                      strokeWidth="28"
                      strokeDasharray="71.6 477.5"
                      strokeDashoffset="-405.9"
                    />
                  </svg>
                  <div className="donut__center">
                    <span className="donut__num">4</span>
                    <span className="donut__cap">projects</span>
                  </div>
                </div>
                <ul className="legend">
                  <li className="legend__row">
                    <span
                      className="legend__dot"
                      style={{ background: "var(--chart-1)" }}
                    />
                    <span className="legend__name">Web prototypes</span>
                    <span className="legend__val">2</span>
                  </li>
                  <li className="legend__row">
                    <span
                      className="legend__dot"
                      style={{ background: "var(--chart-2)" }}
                    />
                    <span className="legend__name">Android apps</span>
                    <span className="legend__val">2</span>
                  </li>
                  <li className="legend__row">
                    <span
                      className="legend__dot"
                      style={{ background: "var(--chart-3)" }}
                    />
                    <span className="legend__name">Documentation</span>
                    <span className="legend__val">27+</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="cta">
            <a className="cta__btn" href="#prototypes">
              Browse prototypes
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <p className="cta__note">
              Open any prototype to see a live, interactive phone-frame UI. Each prototype also has a native Android app.
            </p>
          </div>
        </section>

        {/* =================== Prototypes gallery (GRID) =================== */}
        <section className="section" id="prototypes">
          <div className="section__head">
            <h2 className="section__title">Prototypes</h2>
            <span className="section__hint">live &amp; interactive — click a phone to open</span>
          </div>

          <div className="grid">
            {/* ===== Anime App (Material 3 Expressive, 7 screens) ===== */}
            <article className="gridcard">
              <a
                className="gridcard__phone"
                href="prototypes/anime-app/"
                aria-label="Open Anime App prototype"
                style={{
                  borderColor: "#1f1830",
                  background: "linear-gradient(160deg,#221b38,#2d2649)",
                }}
              >
                <span className="phone__screen" style={{ background: "#16112a" }}>
                  <span
                    className="phone__statusbar"
                    style={{ color: "#ede7f4" }}
                  >
                    <span>9:41</span>
                    <span className="phone__punchhole" />
                    <span>87%</span>
                  </span>
                  <span
                    style={{
                      height: "48px",
                      borderRadius: "6px",
                      background: "linear-gradient(135deg,#6b4ab0,#a78bfa)",
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        flex: "1",
                        height: "7px",
                        borderRadius: "999px",
                        background: "#4a4458",
                      }}
                    />
                    <span
                      style={{
                        height: "7px",
                        width: "7px",
                        borderRadius: "999px",
                        background: "#4a4458",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "4px",
                      marginTop: "2px",
                    }}
                  >
                    <span
                      style={{
                        aspectRatio: "4/5",
                        borderRadius: "4px",
                        background: "#2c2742",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "4/5",
                        borderRadius: "4px",
                        background: "#2c2742",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "4/5",
                        borderRadius: "4px",
                        background: "#2c2742",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "4/5",
                        borderRadius: "4px",
                        background: "#2c2742",
                      }}
                    />
                  </span>
                  <span
                    className="phone__nav"
                    style={{
                      borderTopColor: "#221b38",
                      background: "#221b38",
                    }}
                  >
                    <span style={{ background: "#c8b8ff" }} />
                    <span style={{ background: "#322d48" }} />
                    <span style={{ background: "#322d48" }} />
                    <span style={{ background: "#322d48" }} />
                    <span style={{ background: "#322d48" }} />
                  </span>
                </span>
              </a>
              <div className="gridcard__body">
                <div className="gridcard__tags">
                  <span className="tag tag--status">active</span>
                </div>
                <h3 className="gridcard__name">Anime App</h3>
                <p className="gridcard__desc">
                  A 7-screen Material 3 Expressive anime app with Home, Library, History, Search, Schedule, Settings, and Detail pages. Real AniList data with add-to-library functionality.
                </p>
                <div className="tags">
                  <span className="tag">Material 3</span>
                  <span className="tag">AniList</span>
                  <span className="tag">7 screens</span>
                </div>
                <div className="gridcard__stats">
                  <div className="mini-bars">
                    <div className="mini-bar-row">
                      <span className="mini-bar-label">Screens</span>
                      <div className="mini-bar-track">
                        <div
                          className="mini-bar-fill"
                          style={{ width: "54%", background: "var(--chart-1)" }}
                        />
                      </div>
                    </div>
                    <div className="mini-bar-row">
                      <span className="mini-bar-label">API</span>
                      <div className="mini-bar-track">
                        <div
                          className="mini-bar-fill"
                          style={{ width: "75%", background: "var(--chart-3)" }}
                        />
                      </div>
                    </div>
                    <div className="mini-bar-row">
                      <span className="mini-bar-label">Library</span>
                      <div className="mini-bar-track">
                        <div
                          className="mini-bar-fill"
                          style={{ width: "90%", background: "var(--chart-2)" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gridcard__actions">
                  <a className="gridcard__open" href="prototypes/anime-app/">
                    Open prototype
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    className="gridcard__apk"
                    href="https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE/actions/workflows/build-apk.yml"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Download APK
                  </a>
                </div>
              </div>
            </article>

            {/* ===== Setup Wizard (13-step animated setup wizard) ===== */}
            <article className="gridcard">
              <a
                className="gridcard__phone"
                href="prototypes/setup-wizard/"
                aria-label="Open Setup Wizard prototype"
                style={{
                  borderColor: "#253a25",
                  background: "linear-gradient(160deg, #142214, #1f321f)",
                }}
              >
                <span
                  className="phone__screen"
                  style={{ background: "#0a120a" }}
                >
                  <span
                    className="phone__statusbar"
                    style={{ color: "#e8ffd4" }}
                  >
                    <span>9:41</span>
                    <span className="phone__punchhole" />
                    <span>87%</span>
                  </span>
                  <span
                    style={{
                      height: 60,
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #b3f35a, #8bc34a)",
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                      gap: 4,
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <span
                      style={{
                        flex: 1,
                        height: 8,
                        borderRadius: 999,
                        background: "#253a25",
                      }}
                    />
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: "#b3f35a",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 4,
                      marginTop: 4,
                    }}
                  >
                    <span
                      style={{
                        aspectRatio: "4/3",
                        borderRadius: 6,
                        background: "#1a2a1a",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "4/3",
                        borderRadius: 6,
                        background: "#1a2a1a",
                      }}
                    />
                  </span>
                  <span
                    className="phone__nav"
                    style={{
                      borderTopColor: "#142214",
                      background: "#142214",
                    }}
                  >
                    <span style={{ background: "#b3f35a" }} />
                    <span style={{ background: "#253a25" }} />
                    <span style={{ background: "#253a25" }} />
                  </span>
                </span>
              </a>
              <div className="gridcard__body">
                <div className="gridcard__tags">
                  <span className="tag tag--status">active</span>
                </div>
                <h3 className="gridcard__name">Setup Wizard</h3>
                <p className="gridcard__desc">
                  A 13-step animated setup wizard for an anime app. Material 3 Expressive with 4 color palettes, theme switching, folder selection, permissions, backup restore, and animated Canvas visuals.
                </p>
                <div className="tags">
                  <span className="tag">Material 3</span>
                  <span className="tag">Animated</span>
                  <span className="tag">13 steps</span>
                </div>
                <div className="gridcard__stats">
                  <div className="mini-bars">
                    <div className="mini-bar-row">
                      <span className="mini-bar-label">Steps</span>
                      <div className="mini-bar-track">
                        <div
                          className="mini-bar-fill"
                          style={{ width: "100%", background: "var(--chart-2)" }}
                        />
                      </div>
                    </div>
                    <div className="mini-bar-row">
                      <span className="mini-bar-label">Animations</span>
                      <div className="mini-bar-track">
                        <div
                          className="mini-bar-fill"
                          style={{ width: "90%", background: "var(--chart-3)" }}
                        />
                      </div>
                    </div>
                    <div className="mini-bar-row">
                      <span className="mini-bar-label">Palettes</span>
                      <div className="mini-bar-track">
                        <div
                          className="mini-bar-fill"
                          style={{ width: "60%", background: "var(--chart-1)" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gridcard__actions">
                  <a className="gridcard__open" href="prototypes/setup-wizard/">
                    Open prototype
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    className="gridcard__apk"
                    href="https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE/actions/workflows/build-setup-wizard-apk.yml"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Download APK
                  </a>
                </div>
              </div>
            </article>

            {/* ===== Setup Wizard v2 (ANIKUTA Design Language) ===== */}
            <article className="gridcard">
              <a
                className="gridcard__phone"
                href="prototypes/setup-wizard-v2/"
                aria-label="Open Setup Wizard v2 prototype"
                style={{
                  borderColor: "#3D3656",
                  background: "linear-gradient(160deg, #14111F, #221E33)",
                }}
              >
                <span
                  className="phone__screen"
                  style={{ background: "#14111F" }}
                >
                  <span
                    className="phone__statusbar"
                    style={{ color: "#ECE6F5" }}
                  >
                    <span>9:41</span>
                    <span className="phone__punchhole" />
                    <span>87%</span>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      height: 52,
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #B1F256, #4A6B1A)",
                      margin: "0 8px",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A2E00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#1A2E00", letterSpacing: 1 }}>ANIKUTA</span>
                  </span>
                  <span
                    style={{
                      height: 3,
                      borderRadius: 2,
                      margin: "6px 8px",
                      background: "#3D3656",
                      overflow: "hidden",
                    }}
                  >
                    <span style={{ display: "block", width: "35%", height: "100%", borderRadius: 2, background: "#B1F256" }} />
                  </span>
                  <span
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 4,
                      margin: "0 8px",
                    }}
                  >
                    <span
                      style={{
                        aspectRatio: "4/3",
                        borderRadius: 6,
                        background: "#2A2540",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "4/3",
                        borderRadius: 6,
                        background: "#2A2540",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "4/3",
                        borderRadius: 6,
                        background: "#2A2540",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "4/3",
                        borderRadius: 6,
                        background: "#2A2540",
                      }}
                    />
                  </span>
                  <span
                    className="phone__nav"
                    style={{
                      borderTopColor: "#1B1729",
                      background: "#1B1729",
                    }}
                  >
                    <span style={{ background: "#B1F256" }} />
                    <span style={{ background: "#332D4C" }} />
                    <span style={{ background: "#332D4C" }} />
                  </span>
                </span>
              </a>
              <div className="gridcard__body">
                <div className="gridcard__tags">
                  <span className="tag tag--status" style={{ background: "#B1F256", color: "#1A2E00" }}>new</span>
                </div>
                <h3 className="gridcard__name">Setup Wizard v2</h3>
                <p className="gridcard__desc">
                  A 6-step onboarding wizard built with the ANIKUTA design language. Custom M3-inspired design with Anikuta palette (#B1F256), 5-level surface tiers, segmented toggles, and smooth animations.
                </p>
                <div className="tags">
                  <span className="tag">ANIKUTA</span>
                  <span className="tag">Design Language</span>
                  <span className="tag">6 steps</span>
                </div>
                <div className="gridcard__stats">
                  <div className="mini-bars">
                    <div className="mini-bar-row">
                      <span className="mini-bar-label">Steps</span>
                      <div className="mini-bar-track">
                        <div
                          className="mini-bar-fill"
                          style={{ width: "46%", background: "var(--chart-1)" }}
                        />
                      </div>
                    </div>
                    <div className="mini-bar-row">
                      <span className="mini-bar-label">Palettes</span>
                      <div className="mini-bar-track">
                        <div
                          className="mini-bar-fill"
                          style={{ width: "85%", background: "var(--chart-3)" }}
                        />
                      </div>
                    </div>
                    <div className="mini-bar-row">
                      <span className="mini-bar-label">Modes</span>
                      <div className="mini-bar-track">
                        <div
                          className="mini-bar-fill"
                          style={{ width: "50%", background: "var(--chart-2)" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gridcard__actions">
                  <a className="gridcard__open" href="prototypes/setup-wizard-v2/">
                    Open prototype
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div className="empty" id="emptyNote" hidden>
            No prototypes yet — the first one will appear here once built.
          </div>
        </section>
      </main>
    </>
  );
}
