"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToSection } from "@/hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

/** Top-level section ids, in page order — the same set useActiveSection tracks. */
const SECTION_IDS = [
  "hero",
  "about",
  "engineering",
  "projects",
  "journey",
  "tech-stack",
  "contact",
] as const;

/**
 * Section id → accent variant, mirroring the custom cursor's mapping so the
 * rail and cursor stay color-consistent per section.
 */
const ACCENT_BY_SECTION: Record<string, string> = {
  hero: "var(--accent-1)",
  about: "var(--accent-2)",
  engineering: "var(--accent-3)",
  projects: "var(--accent-4)",
  journey: "var(--accent-5)",
  "tech-stack": "var(--accent-6)",
  contact: "var(--accent-1)",
};

const DISPLAY_NAMES: Record<string, string> = {
  hero: "Hero",
  about: "About",
  engineering: "Engineering",
  projects: "Projects",
  journey: "Journey",
  "tech-stack": "Tech Stack",
  contact: "Contact",
};

/**
 * Site-wide navigation rail. On desktop: a vertically centered rail on the
 * right edge with one tick per top-level section plus a total-page progress
 * line. On mobile: a thin progress line across the top and a single Contact
 * shortcut pill. Total page progress is computed once by a GSAP
 * ScrollTrigger and shared via the --scroll-progress custom property.
 */
export function ScrollProgressRail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection();
  // The portal needs document.body, which doesn't exist during SSR — but
  // reading it (or `typeof document`) synchronously during initial state
  // would make the client's FIRST render differ from the server's, breaking
  // hydration. So `mounted` starts false on BOTH sides and only flips to
  // true inside an effect after mount (default-then-effect pattern, like
  // CustomCursor's enabled gate). The rAF keeps the update async so the
  // update isn't flagged as a synchronous setState-in-effect.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Total page scroll progress (0..1) → --scroll-progress on the wrapper.
  // Standalone trigger with no tween, so scrub has nothing to smooth: the
  // fill just tracks scroll position, which is fine under
  // prefers-reduced-motion (nothing animates). Created once the portaled
  // wrapper exists so the ref is live.
  useEffect(() => {
    if (!mounted) return;
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        rootRef.current?.style.setProperty(
          "--scroll-progress",
          self.progress.toFixed(4),
        );
      },
    });
    return () => trigger.kill();
  }, [mounted]);

  if (!mounted) return null;

  // Render into document.body: the app sits inside BootSequence's wrapper,
  // which always carries a translate-y-* utility — a non-none `translate`
  // creates a containing block, so any fixed element inside it would be
  // pinned to that wrapper (scroll-away) instead of the viewport. Portaling
  // out keeps the fixed rail/line/pill viewport-pinned regardless of where
  // the component is mounted in the React tree.
  return createPortal(
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-40"
    >
      {/* Mobile: thin top progress line filling left → right */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-border/40 md:hidden"
      >
        <div
          className="h-full w-full origin-left"
          style={{
            backgroundColor: "var(--accent)",
            transform: "scaleX(var(--scroll-progress, 0))",
          }}
        />
      </div>

      {/* Mobile: single shortcut to the contact section */}
      <button
        type="button"
        onClick={() => scrollToSection("contact")}
        className="glass-panel pointer-events-auto absolute right-5 bottom-5 rounded-full px-4 py-2 font-mono text-xs tracking-[0.16em] uppercase md:hidden"
        style={{ color: "var(--accent)" }}
      >
        Contact
      </button>

      {/* Desktop: vertical tick rail on the right edge, vertically centered */}
      <nav
        aria-label="Section navigation"
        className="pointer-events-auto absolute top-1/2 right-4 hidden -translate-y-1/2 md:block"
      >
        <div className="glass-panel relative flex flex-col items-center gap-3 rounded-full px-2.5 py-5">
          {/* Total page progress line behind the ticks */}
          <div
            aria-hidden="true"
            className="absolute inset-y-5 left-1/2 w-px -translate-x-1/2 bg-border/60"
          >
            <div
              className="h-full w-full origin-top"
              style={{
                backgroundColor: "var(--accent)",
                transform: "scaleY(var(--scroll-progress, 0))",
              }}
            />
          </div>

          {SECTION_IDS.map((id) => {
            const isActive = activeSection === id;
            const accent = ACCENT_BY_SECTION[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                aria-label={`Jump to ${DISPLAY_NAMES[id]}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative z-10 size-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isActive ? accent : "transparent",
                  border: `1px solid ${
                    isActive
                      ? accent
                      : "color-mix(in srgb, var(--accent) 45%, transparent)"
                  }`,
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                }}
              >
                {/* Visible section-name label for hover/keyboard users —
                    decorative only; the aria-label is the accessible name. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-full mr-2.5 -translate-x-1 -translate-y-1/2 rounded-md glass-panel px-2 py-1 font-mono text-[0.65rem] leading-none whitespace-nowrap text-foreground opacity-0 transition-all duration-150 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
                >
                  {DISPLAY_NAMES[id]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>,
    document.body,
  );
}
