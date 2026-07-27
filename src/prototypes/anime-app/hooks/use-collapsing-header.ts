"use client";

import { useEffect, useRef, useState, useId } from "react";

/**
 * useCollapsingHeader — shrinks the topbar title + reveals a gradient blur
 * overlay when the content is scrolled.
 *
 * Returns:
 *   contentRef — attach to the scrollable content element.
 *   topbarRef  — attach to the topbar container (drives the blur CSS var).
 *   collapsed  — true when scrollTop exceeds collapse threshold (20 px).
 *   scrollProgress — 0-1 value for the blur overlay opacity (full at 48 px).
 *
 * The hook writes `--blur-opacity` directly on the topbar element so that the
 * `.topbarBlur` gradient overlay can read it without extra React state.
 *
 * Usage:
 * ```tsx
 * const { contentRef, topbarRef, collapsed } = useCollapsingHeader();
 * <div ref={topbarRef} className={`topbar ${collapsed ? 'topbar--collapsed' : ''}`}>
 *   <h1>Title</h1>
 *   <div className="topbarBlur" aria-hidden="true" />
 * </div>
 * <div ref={contentRef} className="content">...</div>
 * ```
 */
export function useCollapsingHeader(collapseThreshold = 20, blurMax = 48) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const topbarRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const uid = useId();

  useEffect(() => {
    const el = contentRef.current;
    const topbar = topbarRef.current;
    if (!el || !topbar) return;

    let rafId: number;

    const onScroll = () => {
      // Use rAF so we batch reads + writes together.
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const st = el.scrollTop;

        // Collapse toggle (same threshold as before)
        if (st > collapseThreshold && !collapsed) setCollapsed(true);
        else if (st <= collapseThreshold && collapsed) setCollapsed(false);

        // Blur progress: 0 → 1 over [0, blurMax] px of scroll
        const progress = Math.min(st / blurMax, 1);
        topbar.style.setProperty("--blur-opacity", String(progress));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [collapsed, collapseThreshold, blurMax, uid]);

  return { contentRef, topbarRef, collapsed };
}
