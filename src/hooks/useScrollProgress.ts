"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ArchitectureScrollUpdate, ArchitectureState } from "@/types/architecture";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollSection {
  id: string;
  state: ArchitectureState;
}

interface UseScrollProgressOptions {
  sections: readonly ScrollSection[];
  onProgress: (update: ArchitectureScrollUpdate) => void;
}

export function useScrollProgress({ sections, onProgress }: UseScrollProgressOptions) {
  useEffect(() => {
    const triggers = sections.flatMap(({ id, state }) => {
      const element = document.getElementById(id);
      if (!element) return [];

      return ScrollTrigger.create({
        trigger: element,
        start: "top 62%",
        end: "bottom 38%",
        onEnter: () => onProgress({ state, progress: 0 }),
        onEnterBack: () => onProgress({ state, progress: 0 }),
        onUpdate: (trigger) => onProgress({ state, progress: trigger.progress }),
      });
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [onProgress, sections]);
}
