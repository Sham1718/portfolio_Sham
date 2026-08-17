"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the top-level section currently occupying the vertical
 * center of the viewport. Watches every `section[id]` on the page with an
 * IntersectionObserver narrowed to a band around the viewport center, so the
 * winner is deterministic at section boundaries (no jitter).
 *
 * Generic and self-contained — not specific to any consumer — so it can be
 * reused by other UI that needs "which section am I looking at" (e.g. a
 * scroll-progress rail).
 */
export function useActiveSection(): string {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]"),
    );
    if (sections.length === 0) return;

    // A ~20%-tall band around the viewport's vertical center. The section
    // covering the most of this band is the active one.
    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!best ||
              entry.intersectionRect.height > best.intersectionRect.height)
          ) {
            best = entry;
          }
        }
        if (best) {
          setActiveId((best.target as HTMLElement).id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0] },
    );

    // The observer always delivers an initial callback per target shortly
    // after observe(), which sets the starting section. Until then the
    // consumer's "" fallback applies (a frame at most).
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return activeId;
}
