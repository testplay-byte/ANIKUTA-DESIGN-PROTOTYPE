"use client";

/**
 * anikuta / components / section-header — the signature ANIKUTA accent-colored
 * left-aligned uppercase section header.
 *
 * Optional "See all" / action button on the right.
 */
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export function SectionHeader({ title, action, onAction, children }: SectionHeaderProps) {
  return (
    <div className="an-section-head">
      <h2 className="an-section-head__title">{title}</h2>
      {action && (
        <button
          type="button"
          className="an-section-head__action"
          onClick={onAction}
        >
          {action}
        </button>
      )}
      {children}
    </div>
  );
}
