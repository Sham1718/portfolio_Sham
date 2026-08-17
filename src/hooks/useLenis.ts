"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/**
 * Accessor for the site-wide Lenis instance created by useLenis (the only
 * consumer is ScrollArchitectureController, so this is a single instance).
 * Returns null while Lenis is disabled (e.g. under prefers-reduced-motion)
 * or not yet mounted — callers should fall back to native scrolling then.
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Smoothly scrolls to a top-level section by id via the site-wide Lenis
 * instance (the same scroll-to behavior the navigation rail uses). Falls
 * back to a native instant jump when Lenis is disabled (e.g. under
 * prefers-reduced-motion) or not yet mounted.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    // Lenis intercepts scroll; native calls would fight it.
    lenis.scrollTo(el);
  } else {
    // Lenis is disabled under prefers-reduced-motion — native, instant jump.
    el.scrollIntoView();
  }
}

export function useLenis(disabled: boolean) {
  useEffect(() => {
    if (disabled) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoResize: true,
    });
    lenisInstance = lenis;

    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger and resize Lenis once layout settles
    const timer = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 500);

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(update);
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, [disabled]);
}
