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
 *
 * The hook writes `--blur-opacity` directly on the topbar element so that the
 * `.topbarBlur` gradient overlay can read it without extra React state.
 *
 * The scroll progress uses a smoothstep curve for an ultra-smooth fade:
 *   - Barely visible in the first 20% of scroll (only ~10% opacity)
 *   - Gradually builds through the middle (50% at halfway)
 *   - Reaches full opacity smoothly near the end
 *
 * This eliminates any visible "breaking point" or "pop" effect.
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
export function useCollapsingHeader(collapseThreshold = 20, blurMax = 100) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const topbarRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const uid = useId();

  /**
   * Smoothstep easing curve: t² × (3 − 2t)
   * Maps linear t ∈ [0,1] → eased output ∈ [0,1].
   *
   * Unlike easeOutCubic (which reaches 49% at just 20% of scroll — too fast),
   * smoothstep is symmetrical and very gentle at the extremes:
   *
   *   t=0.00 → 0.000   (no scroll — invisible)
   *   t=0.10 → 0.028   (10% of scroll — barely 3%, imperceptible)
   *   t=0.20 → 0.104   (20% of scroll — only 10%)
   *   t=0.30 → 0.216   (30% of scroll — still subtle)
   *   t=0.40 → 0.352
   *   t=0.50 → 0.500   (halfway — 50%, the midpoint)
   *   t=0.60 → 0.648
   *   t=0.70 → 0.784
   *   t=0.80 → 0.896
   *   t=0.90 → 0.972
   *   t=1.00 → 1.000
   *
   * This gives a very smooth, imperceptible onset with no sudden jumps.
   */
  const smoothstep = useCallback((t: number): number => {
    return t * t * (3 - 2 * t);
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    const topbar = topbarRef.current;
    if (!el || !topbar) return;

    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const st = el.scrollTop;

        // Collapse toggle
        if (st > collapseThreshold && !collapsed) setCollapsed(true);
        else if (st <= collapseThreshold && collapsed) setCollapsed(false);

        // Blur progress: 0 → 1 over [0, blurMax] px of scroll
        // Apply smoothstep for imperceptible onset
        const linear = Math.min(st / blurMax, 1);
        const progress = smoothstep(linear);
        topbar.style.setProperty("--blur-opacity", String(progress));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [collapsed, collapseThreshold, blurMax, uid, smoothstep]);

  return { contentRef, topbarRef, collapsed };
}
