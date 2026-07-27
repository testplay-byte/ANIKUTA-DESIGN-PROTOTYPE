import type { Metadata } from "next";
import "../../../src/proto-kit/tokens/tokens.css";
import "../../../src/prototypes/setup-wizard-v2/setup-wizard-v2.css";

export const metadata: Metadata = {
  title: "Setup Wizard v2 — ANIKUTA-DESIGN-PROTOTYPE",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
