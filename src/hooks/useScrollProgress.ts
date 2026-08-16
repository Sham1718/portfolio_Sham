"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type {
  ArchitectureScrollUpdate,
  ArchitectureState,
} from "@/types/architecture";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollSection {
  id: string;
  state: ArchitectureState;
}

interface UseScrollProgressOptions {
  sections: readonly ScrollSection[];
  onProgress: (update: ArchitectureScrollUpdate) => void;
}

export function useScrollProgress({
  sections,
  onProgress,
}: UseScrollProgressOptions) {
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Create transitions between consecutive sections
    for (let i = 0; i < sections.length - 1; i++) {
      const current = sections[i];
      const next = sections[i + 1];
      const nextElement = document.getElementById(next.id);

      if (!nextElement) continue;

      const trigger = ScrollTrigger.create({
        trigger: nextElement,
        start: "top 92%",
        end: "top 28%",
        onUpdate: (self) => {
          onProgress({
            currentState: current.state,
            nextState: next.state,
            transitionProgress: self.progress,
            state: self.progress >= 0.5 ? next.state : current.state,
            progress: self.progress,
          });
        },
        onLeaveBack: () => {
          onProgress({
            currentState: current.state,
            transitionProgress: 0,
            state: current.state,
            progress: 0,
          });
        },
        onEnter: () => {
          onProgress({
            currentState: current.state,
            nextState: next.state,
            transitionProgress: 0,
            state: current.state,
            progress: 0,
          });
        },
        onLeave: () => {
          onProgress({
            currentState: next.state,
            transitionProgress: 0,
            state: next.state,
            progress: 0,
          });
        },
        onEnterBack: () => {
          onProgress({
            currentState: current.state,
            nextState: next.state,
            transitionProgress: 1,
            state: next.state,
            progress: 1,
          });
        },
      });

      triggers.push(trigger);
    }

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [onProgress, sections]);
}
