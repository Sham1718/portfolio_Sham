"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SystemBackground } from "@/components/background/system-background";
import { SystemStatusPanel } from "@/components/status/SystemStatusPanel";
import { useLenis } from "@/hooks/useLenis";

interface ScrollArchitectureControllerProps {
  children: ReactNode;
}

export function ScrollArchitectureController({
  children,
}: ScrollArchitectureControllerProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

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

  return (
    <main className="relative isolate min-h-screen [overflow-x:clip] px-6 sm:px-10 lg:px-16">
      <SystemBackground />
      {children}

      {/* End-of-page footer — the small system-status panel (uptime clock +
          decorative request-log strip). */}
      <footer className="flex items-center justify-center border-t border-border/40 py-5 sm:py-6">
        <SystemStatusPanel />
      </footer>
    </main>
  );
}
