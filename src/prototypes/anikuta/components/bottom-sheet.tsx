"use client";

/**
 * anikuta / components / bottom-sheet — modal bottom sheet with NO drag handle.
 *
 * Dismiss by tapping the scrim or the X button. The parent owns the `open`
 * state and passes `onClose`.
 *
 * Structure:
 *   <BottomSheet open={...} onClose={...} title="...">
 *     <BottomSheet.Section label="...">...</BottomSheet.Section>
 *     <BottomSheet.Row label="...">...</BottomSheet.Row>
 *   </BottomSheet>
 */
import type { ReactNode } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  return (
    <>
      <div
        className={`an-sheet-scrim ${open ? "an-sheet-scrim--open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <div
        className={`an-sheet ${open ? "an-sheet--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
      >
        <div className="an-sheet__head">
          <h2 className="an-sheet__title">{title}</h2>
          <button
            type="button"
            className="an-sheet__close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="an-sheet__body">{children}</div>
      </div>
    </>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="an-sheet__section">
      <span className="an-sheet__label">{label}</span>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="an-sheet__row">
      <span className="an-sheet__row-label">{label}</span>
      {children}
    </div>
  );
}

// Attach sub-components as static properties for ergonomic JSX:
//   <BottomSheet.Section>...</BottomSheet.Section>
BottomSheet.Section = Section;
BottomSheet.Row = Row;
