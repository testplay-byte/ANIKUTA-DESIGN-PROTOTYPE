import type { NextConfig } from "next";

/**
 * Next.js config for ANIKUTA-DESIGN-PROTOTYPE.
 *
 * Deploys as a STATIC EXPORT to GitHub Pages at:
 *   https://testplay-byte.github.io/ANIKUTA-DESIGN-PROTOTYPE/
 *
 * - output: 'export'  → produces static HTML/CSS/JS in ./out (no server needed)
 * - basePath          → the repo is a project page, served under /ANIKUTA-DESIGN-PROTOTYPE
 * - trailingSlash     → directory-style URLs (out/prototypes/x/ → /prototypes/x/)
 * - images.unoptimized → required for static export (no Next image server)
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ANIKUTA-DESIGN-PROTOTYPE",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Fix Turbopack workspace-root detection when multiple lockfiles exist
  // in the parent directory (local dev). On CI there's only one lockfile.
  outputFileTracingRoot: __dirname,
  // Strict type checking enforced
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
