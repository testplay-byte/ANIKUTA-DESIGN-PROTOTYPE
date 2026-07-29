"use client";

import { useEffect, useRef, useState } from "react";

/**
 * anikuta / hooks / use-collapsing-header — shrinks the topbar title when the
 * content is scrolled.
 *
 * Returns a ref to attach to the scrollable content element, and a `collapsed`
 * boolean. When the content's scrollTop exceeds `threshold` (default 20px),
 * `collapsed` becomes true — the screen uses this to toggle the
 * `an-topbar--collapsed` class that shrinks the title font + reduces padding.
 */
export function useCollapsingHeader(threshold = 20) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onScroll = () => {
      const st = el.scrollTop;
      if (st > threshold && !collapsed) setCollapsed(true);
      else if (st <= threshold && collapsed) setCollapsed(false);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [collapsed, threshold]);

  return { contentRef, collapsed };
}
