"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useActiveSection } from "@/hooks/useActiveSection";

const CURSOR_SIZE = 20;
const RIPPLE_SIZE = 44;
const COLOR_TRANSITION = "0.3s ease";

/** Section id → accent variant. 7 sections cycle through 6 subtle variants. */
const ACCENT_BY_SECTION: Record<string, string> = {
  hero: "var(--accent-1)",
  about: "var(--accent-2)",
  engineering: "var(--accent-3)",
  projects: "var(--accent-4)",
  journey: "var(--accent-5)",
  "tech-stack": "var(--accent-6)",
  contact: "var(--accent-1)",
};

/**
 * Replaces the OS cursor with a small accent-colored node that trails the
 * pointer. Renders nothing (and leaves the OS cursor untouched) on
 * coarse-pointer/touch devices and under prefers-reduced-motion.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<((value: number) => void) | null>(null);
  const quickY = useRef<((value: number) => void) | null>(null);
  const activeSection = useActiveSection();
  const [enabled, setEnabled] = useState(false);
  // document.body doesn't exist during SSR — only portal into it once we're
  // on the client (enabled also only flips true in an effect, so this can
  // never run during hydration either).
  const [mounted] = useState(() => typeof document !== "undefined");

  // Only mount the replacement (and hide the OS cursor) on fine pointers
  // without reduced motion; everything else keeps the default cursor.
  useEffect(() => {
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!coarseQuery.matches && !motionQuery.matches);
    sync();
    coarseQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    return () => {
      coarseQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;
    if (cursor && !quickX.current) {
      // Smooth trailing via quickTo (retargets mid-flight) rather than
      // writing style.transform on every mousemove.
      quickX.current = gsap.quickTo(cursor, "x", {
        duration: 0.12,
        ease: "power2.out",
      });
      quickY.current = gsap.quickTo(cursor, "y", {
        duration: 0.12,
        ease: "power2.out",
      });
      gsap.set(cursor, { x: -100, y: -100 });
    }

    const onMove = (event: MouseEvent) => {
      quickX.current?.(event.clientX - CURSOR_SIZE / 2);
      quickY.current?.(event.clientY - CURSOR_SIZE / 2);
    };

    const onDown = (event: MouseEvent) => {
      if (cursor) {
        gsap.to(cursor, { scale: 0.7, duration: 0.1, ease: "power2.in" });
      }
      const ripple = rippleRef.current;
      if (ripple) {
        gsap.killTweensOf(ripple);
        gsap.set(ripple, {
          x: event.clientX - RIPPLE_SIZE / 2,
          y: event.clientY - RIPPLE_SIZE / 2,
          scale: 0.55,
          opacity: 0.55,
        });
        gsap.to(ripple, {
          scale: 1.5,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const onUp = () => {
      if (cursor) {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.45)" });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      root.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      quickX.current = null;
      quickY.current = null;
    };
  }, [enabled]);

  if (!enabled || !mounted) return null;

  const accent = ACCENT_BY_SECTION[activeSection] ?? "var(--accent)";

  // Render into document.body so the fixed cursor/ripple are never inside a
  // transformed ancestor (e.g. the Lenis/BootSequence scroll wrapper), which
  // would otherwise turn them into scroll-away "fixed relative to that
  // wrapper" elements instead of viewport-pinned.
  return createPortal(
    <>
      {/* Cursor node: circle + crosshair, stroked with the section accent */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="custom-cursor"
        style={{ width: CURSOR_SIZE, height: CURSOR_SIZE }}
      >
        <svg
          viewBox="0 0 20 20"
          style={{
            stroke: accent,
            fill: accent,
            transition: `stroke ${COLOR_TRANSITION}, fill ${COLOR_TRANSITION}`,
          }}
        >
          <circle
            cx="10"
            cy="10"
            r="6.5"
            fill="none"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />
          <path
            d="M10 2.5V7.5M10 12.5V17.5M2.5 10H7.5M12.5 10H17.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.9"
          />
        </svg>
      </div>

      {/* Click ripple */}
      <div
        ref={rippleRef}
        aria-hidden="true"
        className="custom-cursor-ripple"
        style={{
          width: RIPPLE_SIZE,
          height: RIPPLE_SIZE,
          borderColor: accent,
          transition: `border-color ${COLOR_TRANSITION}`,
        }}
      />

      <style>{`
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          pointer-events: none;
          transform-origin: 50% 50%;
          will-change: transform;
        }

        .custom-cursor svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .custom-cursor-ripple {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9998;
          pointer-events: none;
          border: 1.5px solid var(--accent);
          border-radius: 999px;
          opacity: 0;
          transform-origin: 50% 50%;
          /* Opacity is tweened by GSAP on demand — only hint the transform. */
          will-change: transform;
        }
      `}</style>
    </>,
    document.body,
  );
}
