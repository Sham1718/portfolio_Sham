"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal — a lightweight wrapper that reveals grouped children with a
 * subtle opacity + translateY animation as the element enters the viewport.
 *
 * - Uses the existing GSAP / ScrollTrigger infrastructure.
 * - `once: true` prevents flickering on scroll-back.
 * - Reduced-motion users see content immediately (no animation, no delay).
 * - If JS fails, content is visible by default via the `will-change` style
 *   (no initial `opacity: 0` set in CSS — GSAP sets it inline on mount).
 *
 * Props:
 *   staggerIndex — controls the reveal order within a parent section.
 *                  Multiple ScrollReveal siblings with ascending indices
 *                  will stagger naturally. Defaults to 0.
 *   y            — vertical offset in px (default 20).
 *   duration     — animation duration in seconds (default 0.6).
 *   delay        — base delay before this element reveals (default 0).
 *   className    — passthrough className for layout.
 *   as           — wrapper element tag (default "div").
 */
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  as?: keyof HTMLElementTagNameMap;
}

export function ScrollReveal({
  children,
  className,
  y = 20,
  duration = 0.6,
  delay = 0,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: keep everything visible, skip animation entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Set initial state via GSAP (not CSS) so content is visible if JS fails.
    gsap.set(el, { opacity: 0, y });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, duration, delay]);

  // The `as` prop requires a dynamic tag — use createElement-style via JSX.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Element = Tag as any;

  return (
    <Element ref={ref} className={className}>
      {children}
    </Element>
  );
}
