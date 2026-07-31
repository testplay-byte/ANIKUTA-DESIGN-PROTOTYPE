"use client";

/**
 * anikuta / components / collapsing-header — the top bar with a title that
 * shrinks when the content is scrolled.
 *
 * Wraps the an-topbar styles from anikuta.css. Pass `collapsed` from
 * useCollapsingHeader() and the title. Optional icon buttons can be added
 * as children (rendered on the right side).
 */
import type { ReactNode } from "react";

interface CollapsingHeaderProps {
  title: string;
  collapsed: boolean;
  children?: ReactNode;
}

export function CollapsingHeader({ title, collapsed, children }: CollapsingHeaderProps) {
  return (
    <div className={`an-topbar ${collapsed ? "an-topbar--collapsed" : ""}`}>
      <h1 className="an-topbar__title">{title}</h1>
      {children}
    </div>
  );
}
