"use client";

import { useEffect, useRef, useState, useId, useCallback } from "react";

/**
 * useCollapsingHeader — shrinks the topbar title + reveals a gradient blur
 * overlay when the content is scrolled.
 *
 * Returns:
 *   contentRef — attach to the scrollable content element.
 *   topbarRef  — attach to the topbar container (drives the blur CSS var).
 *   collapsed  — true when scrollTop exceeds collapse threshold (20 px).
 *   scrollProgress — 0-1 value for the blur overlay opacity (full at blurMax px).
 *
 * The hook writes `--blur-opacity` directly on the topbar element so that the
 * `.topbarBlur` gradient overlay can read it without extra React state.
 *
 * The scroll progress uses a smooth cubic ease-out curve so the blur fades in
 * gradually rather than appearing abruptly. This avoids the "breaking point"
 * feel that a linear ramp creates.
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
export function useCollapsingHeader(collapseThreshold = 20, blurMax = 80) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const topbarRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const uid = useId();

  /**
   * Smooth ease-out cubic curve.
   * Maps linear t ∈ [0,1] → eased output ∈ [0,1].
   * The curve starts quickly then decelerates, giving a natural "fade in"
   * that feels smooth without a visible breaking point.
   *
   *   t=0.0 → 0.00   (just started scrolling — almost invisible)
   *   t=0.2 → 0.49   (20% of scroll → already at 49% opacity)
   *   t=0.4 → 0.78
   *   t=0.6 → 0.94
   *   t=0.8 → 0.99
   *   t=1.0 → 1.00
   */
  const easeOutCubic = useCallback((t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

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
        // Apply smooth easing so the transition feels natural
        const linear = Math.min(st / blurMax, 1);
        const progress = easeOutCubic(linear);
        topbar.style.setProperty("--blur-opacity", String(progress));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [collapsed, collapseThreshold, blurMax, uid, easeOutCubic]);

  return { contentRef, topbarRef, collapsed };
}
