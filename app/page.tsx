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
                <span className="stat__num">1</span>
                <span className="stat__hint">and growing</span>
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
                <span className="stat__num">4</span>
                <span className="stat__hint">in template</span>
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
                <span className="stat__num">12</span>
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
                <span className="stat__num">2025-01-15</span>
              </div>
            </div>
          </div>

          {/* two-up: bars + donut */}
          <div className="twoup">
            {/* Bars: template feature categories */}
            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">Template features by category</h2>
                <span className="panel__hint">21 total · hover for detail</span>
              </div>
              <ul className="bars">
                <li
                  className="bar"
                  title="Status bar: time, punch-hole, signal, Wi-Fi, Bluetooth, battery — 6 features"
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
                      <path d="M2 22h2v-6H2zM6 22h2V10H6zM10 22h2V2h-2zM14 22h2v-9h-2zM18 22h2V6h-2z" />
                    </svg>
                  </span>
                  <span className="bar__label">Status bar</span>
                  <span className="bar__track">
                    <span
                      className="bar__fill"
                      style={{ width: "100%", background: "var(--chart-1)" }}
                    />
                  </span>
                  <span className="bar__count">6</span>
                </li>
                <li
                  className="bar"
                  title="Frame & layout: device shell, status bar, app bar, content, bottom nav — 5 features"
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
                  <span className="bar__label">Frame &amp; layout</span>
                  <span className="bar__track">
                    <span
                      className="bar__fill"
                      style={{ width: "83%", background: "var(--chart-4)" }}
                    />
                  </span>
                  <span className="bar__count">5</span>
                </li>
                <li
                  className="bar"
                  title="Components: button, card, list, badge, appbar, bottomnav — 6 features"
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
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </span>
                  <span className="bar__label">Components</span>
                  <span className="bar__track">
                    <span
                      className="bar__fill"
                      style={{ width: "100%", background: "var(--chart-2)" }}
                    />
                  </span>
                  <span className="bar__count">6</span>
                </li>
                <li
                  className="bar"
                  title="Theming: light/dark tokens, persisted toggle — 2 features"
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
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </span>
                  <span className="bar__label">Theming</span>
                  <span className="bar__track">
                    <span
                      className="bar__fill"
                      style={{ width: "33%", background: "var(--chart-3)" }}
                    />
                  </span>
                  <span className="bar__count">2</span>
                </li>
                <li
                  className="bar"
                  title="Accessibility: semantic HTML, keyboard nav, reduced-motion, ARIA — 2 features"
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
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v6M12 16h.01" />
                    </svg>
                  </span>
                  <span className="bar__label">Accessibility</span>
                  <span className="bar__track">
                    <span
                      className="bar__fill"
                      style={{ width: "33%", background: "var(--chart-5)" }}
                    />
                  </span>
                  <span className="bar__count">2</span>
                </li>
              </ul>
            </div>

            {/* Donut: repo file mix */}
            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">Repository file mix</h2>
                <span className="panel__hint">share of 19 files · hover a slice</span>
              </div>
              <div className="donut-wrap">
                <div className="donut" role="img" aria-label="Repository file distribution">
                  <svg width="180" height="180" viewBox="0 0 180 180">
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="28"
                    />
                    {/* Markdown 12/19 = 63.2% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--chart-1)"
                      strokeWidth="28"
                      strokeDasharray="301.6 477.5"
                      strokeDashoffset="0"
                    />
                    {/* HTML 2/19 = 10.5% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--chart-4)"
                      strokeWidth="28"
                      strokeDasharray="50.3 477.5"
                      strokeDashoffset="-301.6"
                    />
                    {/* CSS 1/19 = 5.3% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--chart-2)"
                      strokeWidth="28"
                      strokeDasharray="25.1 477.5"
                      strokeDashoffset="-351.9"
                    />
                    {/* JS 1/19 = 5.3% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--chart-3)"
                      strokeWidth="28"
                      strokeDasharray="25.1 477.5"
                      strokeDashoffset="-377.0"
                    />
                    {/* YAML 1/19 = 5.3% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--chart-5)"
                      strokeWidth="28"
                      strokeDasharray="25.1 477.5"
                      strokeDashoffset="-402.1"
                    />
                    {/* Other 2/19 = 10.5% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="76"
                      fill="none"
                      stroke="var(--ring)"
                      strokeWidth="28"
                      strokeDasharray="50.3 477.5"
                      strokeDashoffset="-427.2"
                    />
                  </svg>
                  <div className="donut__center">
                    <span className="donut__num">19</span>
                    <span className="donut__cap">files</span>
                  </div>
                </div>
                <ul className="legend">
                  <li className="legend__row">
                    <span
                      className="legend__dot"
                      style={{ background: "var(--chart-1)" }}
                    />
                    <span className="legend__name">Markdown</span>
                    <span className="legend__val">12</span>
                  </li>
                  <li className="legend__row">
                    <span
                      className="legend__dot"
                      style={{ background: "var(--chart-4)" }}
                    />
                    <span className="legend__name">HTML</span>
                    <span className="legend__val">2</span>
                  </li>
                  <li className="legend__row">
                    <span
                      className="legend__dot"
                      style={{ background: "var(--chart-2)" }}
                    />
                    <span className="legend__name">CSS</span>
                    <span className="legend__val">1</span>
                  </li>
                  <li className="legend__row">
                    <span
                      className="legend__dot"
                      style={{ background: "var(--chart-3)" }}
                    />
                    <span className="legend__name">JavaScript</span>
                    <span className="legend__val">1</span>
                  </li>
                  <li className="legend__row">
                    <span
                      className="legend__dot"
                      style={{ background: "var(--chart-5)" }}
                    />
                    <span className="legend__name">YAML config</span>
                    <span className="legend__val">1</span>
                  </li>
                  <li className="legend__row">
                    <span
                      className="legend__dot"
                      style={{ background: "var(--ring)" }}
                    />
                    <span className="legend__name">Other</span>
                    <span className="legend__val">2</span>
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
              Open any prototype to see a live, interactive phone-frame UI. The first real prototype lands here as soon as you send a brief.
            </p>
          </div>
        </section>

        {/* =================== Prototypes gallery =================== */}
        <section className="section" id="prototypes">
          <div className="section__head">
            <h2 className="section__title">Prototypes</h2>
            <span className="section__hint">live &amp; interactive — click a phone to open</span>
          </div>

          <div className="showcase">
            {/*
              PROTOTYPE SHOWCASE CARD
              Layout: [left info] [phone silhouette] [right info]
              To add a prototype, copy this <article> and update the fields.
              Keep in sync with prototypes/navigation.md.
            */}
            <article className="show">
              {/* LEFT info */}
              <div className="show__info show__info--left">
                <span className="tag tag--status">reference</span>
                <h3 className="show__name">Starter Template</h3>
                <p className="show__desc">
                  A real, clickable phone frame with four switchable screens, bottom navigation, dark/light theming, and a live status bar with punch-hole camera.
                </p>
                <div className="tags">
                  <span className="tag">HTML</span>
                  <span className="tag">CSS</span>
                  <span className="tag">JS</span>
                </div>
              </div>

              {/* CENTER phone silhouette (links to the prototype) */}
              <a
                className="phone"
                href="prototypes/_template/"
                aria-label="Open Starter Template prototype"
              >
                <span className="phone__screen">
                  <span className="phone__statusbar">
                    <span>9:41</span>
                    <span className="phone__punchhole" />
                    <span>87%</span>
                  </span>
                  <span className="phone__appbar" />
                  <span className="phone__line phone__line--w70" />
                  <span className="phone__line" />
                  <span className="phone__line phone__line--w50" />
                  <span className="phone__card">
                    <span className="phone__pill" />
                    <span className="phone__line phone__line--w70" />
                    <span className="phone__line phone__line--w50" />
                  </span>
                  <span className="phone__nav">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                </span>
              </a>

              {/* RIGHT info: mini-charts + stats */}
              <div className="show__info show__info--right">
                {/* mini donut: component breakdown */}
                <div className="mini-donut">
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-1)"
                      strokeWidth="6"
                      strokeDasharray="46 138"
                      transform="rotate(-90 28 28)"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-4)"
                      strokeWidth="6"
                      strokeDasharray="35 138"
                      strokeDashoffset="-46"
                      transform="rotate(-90 28 28)"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-2)"
                      strokeWidth="6"
                      strokeDasharray="23 138"
                      strokeDashoffset="-81"
                      transform="rotate(-90 28 28)"
                    />
                  </svg>
                  <span className="mini-donut__num">12</span>
                </div>
                {/* mini bars: interactions per screen */}
                <div className="mini-bars">
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Home</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "90%", background: "var(--chart-1)" }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Search</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "55%", background: "var(--chart-4)" }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Profile</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "70%", background: "var(--chart-2)" }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Settings</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "80%", background: "var(--chart-3)" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="kv">
                  <div className="kv__row">
                    <b>4</b>
                    &nbsp;screens
                  </div>
                  <div className="kv__row">
                    <b>12</b>
                    &nbsp;components
                  </div>
                </div>
                <a className="openlink" href="prototypes/_template/">
                  Open prototype
                  <svg
                    width="14"
                    height="14"
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
              </div>
            </article>

            {/*
              New prototypes go here. Example:
              <article class="show">
                <div class="show__info show__info--left">
                  <span class="tag tag--status">review</span>
                  <h3 class="show__name">Food Delivery Checkout</h3>
                  <p class="show__desc">Cart → address → payment → confirmation flow.</p>
                  <div class="tags"><span class="tag">HTML</span><span class="tag">CSS</span><span class="tag">JS</span></div>
                </div>
                <a class="phone" href="prototypes/food-delivery-checkout/"> … </a>
                <div class="show__info show__info--right"> … </div>
              </article>
            */}

            {/* ===== Search Page (Material 3 Expressive) ===== */}
            <article className="show">
              <div className="show__info show__info--left">
                <span className="tag tag--status">review</span>
                <h3 className="show__name">Search Page</h3>
                <p className="show__desc">
                  A Material 3 Expressive search screen with AniList/Extension source toggle, filter chips, expandable filter panel, and M3 bottom nav with active-pill indicator. Dark purple theme.
                </p>
                <div className="tags">
                  <span className="tag">Material 3</span>
                  <span className="tag">HTML</span>
                  <span className="tag">CSS</span>
                  <span className="tag">JS</span>
                  <span className="tag">AniList</span>
                </div>
              </div>
              <a
                className="phone"
                href="prototypes/search-page/"
                aria-label="Open Search Page prototype"
                style={{
                  borderColor: "#1a1726",
                  background: "linear-gradient(160deg,#1d1a2e,#272339)",
                }}
              >
                <span className="phone__screen" style={{ background: "#14101f" }}>
                  <span
                    className="phone__statusbar"
                    style={{ color: "#ede7f4" }}
                  >
                    <span>9:41</span>
                    <span className="phone__punchhole" />
                    <span>87%</span>
                  </span>
                  <span
                    style={{ display: "flex", gap: "3px", padding: "6px 4px" }}
                  >
                    <span
                      style={{
                        flex: "1",
                        height: "14px",
                        borderRadius: "999px",
                        background: "#4f378b",
                      }}
                    />
                    <span
                      style={{
                        flex: "1",
                        height: "14px",
                        borderRadius: "999px",
                        background: "#272339",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      height: "14px",
                      borderRadius: "999px",
                      background: "#272339",
                      margin: "2px 4px",
                    }}
                  />
                  <span style={{ display: "flex", gap: "3px", padding: "0 4px" }}>
                    <span
                      style={{
                        height: "10px",
                        width: "30px",
                        borderRadius: "999px",
                        background: "#4a4458",
                      }}
                    />
                    <span
                      style={{
                        height: "10px",
                        width: "24px",
                        borderRadius: "999px",
                        background: "#322d48",
                      }}
                    />
                    <span
                      style={{
                        height: "10px",
                        width: "28px",
                        borderRadius: "999px",
                        background: "#322d48",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "3px",
                      marginTop: "4px",
                      padding: "0 4px",
                    }}
                  >
                    <span
                      style={{
                        aspectRatio: "2/3",
                        borderRadius: "4px",
                        background: "#272339",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "2/3",
                        borderRadius: "4px",
                        background: "#272339",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "2/3",
                        borderRadius: "4px",
                        background: "#272339",
                      }}
                    />
                  </span>
                  <span
                    className="phone__nav"
                    style={{
                      borderTopColor: "#1d1a2e",
                      background: "#1d1a2e",
                    }}
                  >
                    <span style={{ background: "#322d48" }} />
                    <span style={{ background: "#322d48" }} />
                    <span style={{ background: "#322d48" }} />
                    <span style={{ background: "#d0bcff" }} />
                    <span style={{ background: "#322d48" }} />
                  </span>
                </span>
              </a>
              <div className="show__info show__info--right">
                <div className="mini-donut">
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-1)"
                      strokeWidth="6"
                      strokeDasharray="50 138"
                      transform="rotate(-90 28 28)"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-3)"
                      strokeWidth="6"
                      strokeDasharray="40 138"
                      strokeDashoffset="-50"
                      transform="rotate(-90 28 28)"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-2)"
                      strokeWidth="6"
                      strokeDasharray="30 138"
                      strokeDashoffset="-90"
                      transform="rotate(-90 28 28)"
                    />
                  </svg>
                  <span className="mini-donut__num">M3</span>
                </div>
                <div className="mini-bars">
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Sources</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "40%", background: "var(--chart-1)" }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Filters</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "100%", background: "var(--chart-3)" }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Nav items</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "83%", background: "var(--chart-2)" }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">API</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "75%", background: "var(--chart-4)" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="kv">
                  <div className="kv__row">
                    <b>1</b>
                    &nbsp;screen
                  </div>
                  <div className="kv__row">
                    <b>Material 3</b>
                    &nbsp;design
                  </div>
                </div>
                <a className="openlink" href="prototypes/search-page/">
                  Open prototype
                  <svg
                    width="14"
                    height="14"
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
              </div>
            </article>

            {/* ===== Anime App (Material 3 Expressive, 6 screens) ===== */}
            <article className="show">
              <div className="show__info show__info--left">
                <a
                  className="apk-download"
                  href="https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE/actions/workflows/build-apk.yml"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Anime App APK (GitHub Actions → Artifacts)"
                  title="APK built by GitHub Actions — open the latest successful run and download the anime-app-apk artifact."
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="M7 10l5 5 5-5" />
                    <path d="M12 15V3" />
                  </svg>
                  <span className="apk-download__label">
                    <b>Download APK</b>
                    <small>Android · GitHub Actions</small>
                  </span>
                </a>
                <span className="tag tag--status">review</span>
                <h3 className="show__name">Anime App</h3>
                <p className="show__desc">
                  A 6-screen Material 3 Expressive anime app with Home, Library, History, Search, Settings, and Detail pages. Real AniList data. Add to library functionality.
                </p>
                <div className="tags">
                  <span className="tag">Material 3</span>
                  <span className="tag">AniList</span>
                  <span className="tag">6 screens</span>
                </div>
              </div>
              <a
                className="phone"
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
              <div className="show__info show__info--right">
                <div className="mini-donut">
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-1)"
                      strokeWidth="6"
                      strokeDasharray="23 138"
                      transform="rotate(-90 28 28)"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-2)"
                      strokeWidth="6"
                      strokeDasharray="23 138"
                      strokeDashoffset="-23"
                      transform="rotate(-90 28 28)"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-3)"
                      strokeWidth="6"
                      strokeDasharray="23 138"
                      strokeDashoffset="-46"
                      transform="rotate(-90 28 28)"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-4)"
                      strokeWidth="6"
                      strokeDasharray="23 138"
                      strokeDashoffset="-69"
                      transform="rotate(-90 28 28)"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-5)"
                      strokeWidth="6"
                      strokeDasharray="23 138"
                      strokeDashoffset="-92"
                      transform="rotate(-90 28 28)"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-1)"
                      strokeWidth="6"
                      strokeDasharray="23 138"
                      strokeDashoffset="-115"
                      transform="rotate(-90 28 28)"
                    />
                  </svg>
                  <span className="mini-donut__num">6</span>
                </div>
                <div className="mini-bars">
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Screens</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "100%", background: "var(--chart-1)" }}
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
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">History</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "60%", background: "var(--chart-4)" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="kv">
                  <div className="kv__row">
                    <b>6</b>
                    &nbsp;screens
                  </div>
                  <div className="kv__row">
                    <b>AniList</b>
                    &nbsp;data
                  </div>
                </div>
                <a className="openlink" href="prototypes/anime-app/">
                  Open prototype
                  <svg
                    width="14"
                    height="14"
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
              </div>
            </article>

            {/* ===== Setup Wizard (animated setup wizard) ===== */}
            <article className="show">
              <div className="show__info show__info--left">
                <a
                  className="apk-download"
                  href="https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE/actions/workflows/build-flutter-apk.yml"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Setup Wizard Flutter APK (GitHub Actions → Artifacts)"
                  title="Flutter APK built by GitHub Actions — open the latest successful run and download the setup-wizard-flutter-apk artifact (debug-signed, sideloadable)."
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="M7 10l5 5 5-5" />
                    <path d="M12 15V3" />
                  </svg>
                  <span className="apk-download__label">
                    <b>Download APK · Flutter</b>
                    <small>Android · GitHub Actions</small>
                  </span>
                </a>
                <a
                  className="apk-download"
                  href="https://github.com/testplay-byte/ANIKUTA-DESIGN-PROTOTYPE/actions/workflows/build-setup-wizard-apk.yml"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Setup Wizard Kotlin APK (GitHub Actions → Artifacts)"
                  title="Kotlin APK built by GitHub Actions — open the latest successful run and download the setup-wizard-apk artifact (native Android Compose build)."
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="M7 10l5 5 5-5" />
                    <path d="M12 15V3" />
                  </svg>
                  <span className="apk-download__label">
                    <b>Download APK · Kotlin</b>
                    <small>Android · GitHub Actions</small>
                  </span>
                </a>
                <span className="tag tag--status">review</span>
                <h3 className="show__name">Setup Wizard</h3>
                <p className="show__desc">
                  An animated setup wizard for an anime app. Material 3
                  Expressive with a lime (#b3f35a) primary color and
                  switchable palettes. Theme selection, folder selection,
                  permissions, a full backup-restore flow with anime linking,
                  an ad-preferences ("Choose Your Poison") step, and a setup
                  complete screen. Each screen has its own hash route
                  (#welcome, #theme, …) like the anime app.
                </p>
                <div className="tags">
                  <span className="tag">Material 3</span>
                  <span className="tag">Animated</span>
                  <span className="tag">Wizard</span>
                </div>
              </div>
              <a
                className="phone"
                href="prototypes/setup-wizard/"
                aria-label="Open Setup Wizard prototype"
                style={{
                  borderColor: "#253a25",
                  background:
                    "linear-gradient(160deg, #142214, #1f321f)",
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
              <div className="show__info show__info--right">
                <div className="mini-donut">
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--chart-2)"
                      strokeWidth="6"
                      strokeDasharray="138 138"
                      transform="rotate(-90 28 28)"
                    />
                  </svg>
                  <span className="mini-donut__num">8</span>
                </div>
                <div className="mini-bars">
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Steps</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{
                          width: "100%",
                          background: "var(--chart-2)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Animations</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{
                          width: "90%",
                          background: "var(--chart-3)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Palettes</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{
                          width: "60%",
                          background: "var(--chart-1)",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="kv">
                  <div className="kv__row">
                    <b>15</b>&nbsp;screens
                  </div>
                  <div className="kv__row">
                    <b>Lime</b>&nbsp;theme
                  </div>
                </div>
                <a className="openlink" href="prototypes/setup-wizard/">
                  Open prototype
                  <svg
                    width="14"
                    height="14"
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
              </div>
            </article>

            {/* ===== ANIKUTA (anime-first app, 12 screens, lime green) ===== */}
            <article className="show">
              <div className="show__info show__info--left">
                <span className="tag tag--status">review</span>
                <h3 className="show__name">ANIKUTA</h3>
                <p className="show__desc">
                  An anime-first app prototype with 12 interactive screens:
                  Home, Library, Search, Anime Details, Watch, History,
                  Updates, Profile/My, More, Backup &amp; Restore, Downloads,
                  and Extensions. Lime green (#B1F256) primary on
                  purple-tinted dark surfaces. Floating pill bottom nav,
                  blurred cover headers, watched-episode grayscale+blur,
                  accent-colored uppercase section headers, 2/3-way
                  segmented toggles, and no-drag-handle bottom sheets. Full
                  hash routing (#home, #library, #search, #animedetails, and
                  #watch, etc.) like the anime-app prototype.
                </p>
                <div className="tags">
                  <span className="tag">Lime</span>
                  <span className="tag">12 screens</span>
                  <span className="tag">Hash routing</span>
                  <span className="tag">Mock data</span>
                </div>
              </div>
              <a
                className="phone"
                href="prototypes/anikuta/"
                aria-label="Open ANIKUTA prototype"
                style={{
                  borderColor: "#1f2a14",
                  background: "linear-gradient(160deg, #14111f, #1f2a14)",
                }}
              >
                <span className="phone__screen" style={{ background: "#14111f" }}>
                  <span
                    className="phone__statusbar"
                    style={{ color: "#ece6f5" }}
                  >
                    <span>9:41</span>
                    <span className="phone__punchhole" />
                    <span>87%</span>
                  </span>
                  {/* Topbar title */}
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 12px 4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#ece6f5",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Home
                    </span>
                    <span style={{ display: "flex", gap: 4 }}>
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "#1b1729",
                          display: "inline-block",
                        }}
                      />
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "#1b1729",
                          display: "inline-block",
                        }}
                      />
                    </span>
                  </span>
                  {/* Hero gradient card */}
                  <span
                    style={{
                      display: "block",
                      margin: "0 12px 8px",
                      height: 56,
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, #344e41, #588157, #a3b18a)",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        bottom: 5,
                        left: 8,
                        fontSize: 8,
                        fontWeight: 800,
                        color: "#14111f",
                        background: "#b1f256",
                        padding: "1px 5px",
                        borderRadius: 999,
                      }}
                    >
                      ★ TRENDING
                    </span>
                  </span>
                  {/* Section header */}
                  <span
                    style={{
                      display: "block",
                      padding: "0 12px 4px",
                      fontSize: 8,
                      fontWeight: 800,
                      color: "#b1f256",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Popular This Season
                  </span>
                  {/* 3-col grid of cover cards */}
                  <span
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 4,
                      padding: "0 12px",
                    }}
                  >
                    <span
                      style={{
                        aspectRatio: "2/3",
                        borderRadius: 6,
                        background:
                          "linear-gradient(135deg, #9d0208, #dc2f02, #f48c06)",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "2/3",
                        borderRadius: 6,
                        background:
                          "linear-gradient(135deg, #03045e, #023e8a, #0077b6)",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "2/3",
                        borderRadius: 6,
                        background:
                          "linear-gradient(135deg, #10002b, #240046, #5a189a)",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "2/3",
                        borderRadius: 6,
                        background:
                          "linear-gradient(135deg, #2d3a1f, #5a6e3a, #9ab87a)",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "2/3",
                        borderRadius: 6,
                        background:
                          "linear-gradient(135deg, #d62828, #f77f00, #fcbf49)",
                      }}
                    />
                    <span
                      style={{
                        aspectRatio: "2/3",
                        borderRadius: 6,
                        background:
                          "linear-gradient(135deg, #6a040f, #9d0208, #e85d04)",
                      }}
                    />
                  </span>
                  {/* Floating pill bottom nav */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 12,
                      right: 12,
                      height: 32,
                      borderRadius: 16,
                      background: "#2a2540",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 6px",
                      gap: 4,
                      boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                    }}
                  >
                    <span
                      style={{
                        height: 22,
                        borderRadius: 999,
                        background: "#b1f256",
                        flex: "0 1 auto",
                        padding: "0 8px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: 7,
                        fontWeight: 800,
                        color: "#14111f",
                      }}
                    >
                      Home
                    </span>
                    <span
                      style={{ flex: 1, height: 18, borderRadius: 999, background: "transparent" }}
                    />
                    <span
                      style={{ flex: 1, height: 18, borderRadius: 999, background: "transparent" }}
                    />
                    <span
                      style={{ flex: 1, height: 18, borderRadius: 999, background: "transparent" }}
                    />
                  </span>
                </span>
              </a>
              <div className="show__info show__info--right">
                <div className="mini-donut">
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="#b1f256"
                      strokeWidth="6"
                      strokeDasharray="120 138"
                      transform="rotate(-90 28 28)"
                    />
                  </svg>
                  <span className="mini-donut__num">12</span>
                </div>
                <div className="mini-bars">
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Screens</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "100%", background: "#b1f256" }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Anime</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "75%", background: "var(--chart-2)" }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Nav items</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "50%", background: "var(--chart-3)" }}
                      />
                    </div>
                  </div>
                  <div className="mini-bar-row">
                    <span className="mini-bar-label">Routes</span>
                    <div className="mini-bar-track">
                      <div
                        className="mini-bar-fill"
                        style={{ width: "90%", background: "var(--chart-4)" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="kv">
                  <div className="kv__row">
                    <b>12</b>
                    &nbsp;screens
                  </div>
                  <div className="kv__row">
                    <b>Lime</b>
                    &nbsp;theme
                  </div>
                </div>
                <a className="openlink" href="prototypes/anikuta/">
                  Open prototype
                  <svg
                    width="14"
                    height="14"
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
              </div>
            </article>
          </div>

          <div className="empty" id="emptyNote" hidden>
            No real prototypes yet — the first one will appear here once built.
          </div>
        </section>
      </main>
    </>
  );
}
