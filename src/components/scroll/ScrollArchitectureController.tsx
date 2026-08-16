"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { SystemBackground } from "@/components/background/system-background";
import { useLenis } from "@/hooks/useLenis";
import { useScrollProgress, type ScrollSection } from "@/hooks/useScrollProgress";
import type { ArchitectureScrollUpdate } from "@/types/architecture";

const sections = [
  { id: "hero", state: "hero" },
  { id: "about", state: "about" },
  { id: "engineering", state: "engineering" },
  { id: "legal-ai", state: "legal-ai" },
  { id: "microservices", state: "microservices" },
] as const satisfies readonly ScrollSection[];

interface ScrollArchitectureControllerProps {
  children: ReactNode;
}

export function ScrollArchitectureController({
  children,
}: ScrollArchitectureControllerProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const onProgress = useCallback((update: ArchitectureScrollUpdate) => {
    window.dispatchEvent(new CustomEvent("architecture-state-change", { detail: update }));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mediaQuery.matches);
    const frame = window.requestAnimationFrame(sync);
    mediaQuery.addEventListener("change", sync);
    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", sync);
    };
  }, []);

  useLenis(reduceMotion);
  useScrollProgress({ sections, onProgress });

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden px-6 sm:px-10 lg:px-16">
      <SystemBackground />
      {children}
    </main>
  );
}
