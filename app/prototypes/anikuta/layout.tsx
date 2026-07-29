import type { Metadata } from "next";
import "../../../src/proto-kit/tokens/tokens.css";
import "../../../src/prototypes/anikuta/anikuta.css";

export const metadata: Metadata = {
  title: "ANIKUTA — ANIKUTA-DESIGN-PROTOTYPE",
};

/**
 * Layout for the ANIKUTA prototype route.
 *
 * Thin pass-through: the page.tsx (client) renders the full
 * Stage + DeviceFrame + DeviceThemeProvider shell.
 */
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
