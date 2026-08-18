"use client";

import { useEffect, useState, type ReactNode } from "react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

type BootState = "booting" | "completed" | "exiting" | "hidden";

interface BootSequenceProps {
  children: ReactNode;
}

// Boot content — the exact terminal lines shown during initialization.
// Each line pads with dots to the same 28-char column so the percentage
// values right-align (rendered in a fixed 4ch box below).
const bootLines = [
  "initializing backend........",
  "loading services............",
  "establishing runtime.......",
  "rendering interface........",
  "finalizing system..........",
] as const;

const SYSTEM_ONLINE_LINE = "system online................";

// Real progress counting: each stage animates its own percentage 1 → 100 over
// STAGE_MS (about 1s). Five stages ≈ 5.0s of counting, then "system online…
// 100%" holds for 300ms, then the overlay fades out over 300ms. Total ≈ 5.6s.
const STAGE_MS = 1000;
const HOLD_MS = 300;
const FADE_MS = 300;
const TOTAL_COUNT_MS = STAGE_MS * bootLines.length;

export function BootSequence({ children }: BootSequenceProps) {
  const [bootState, setBootState] = useState<BootState>("booting");
  // Index of the currently-counting stage (completed stages are 0..index-1).
  const [stageIndex, setStageIndex] = useState(0);
  // Live progress of the active stage (1–100).
  const [progress, setProgress] = useState(1);
  const [systemOnline, setSystemOnline] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (callback: () => void, delay: number) => {
      timeouts.push(setTimeout(callback, delay));
    };

    // Reduced motion: skip the counting entirely — every stage at 100% and
    // "system online… 100%" immediately (deferred a frame to stay async),
    // then a quick exit to Hero.
    if (prefersReducedMotion) {
      schedule(() => {
        setStageIndex(bootLines.length);
        setProgress(100);
        setSystemOnline(true);
        setBootState("completed");
      }, 0);
      schedule(() => setBootState("exiting"), 250);
      schedule(() => setBootState("hidden"), 400);
      return () => timeouts.forEach(clearTimeout);
    }

    // Real animated counter: one rAF loop, one shared elapsed clock. Each
    // stage owns its slice of the timeline (1s each) and counts 1 → 100;
    // completed stages stay pinned at 100.
    let rafId = 0;
    let cancelled = false;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;
      const stage = Math.min(
        Math.floor(elapsed / STAGE_MS),
        bootLines.length - 1,
      );
      const stageProgress = Math.min(
        1,
        (elapsed - stage * STAGE_MS) / STAGE_MS,
      );
      setStageIndex(stage);
      setProgress(Math.max(1, Math.round(stageProgress * 100)));

      if (elapsed >= TOTAL_COUNT_MS) {
        setSystemOnline(true);
        setBootState("completed");
        return;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Hold "system online… 100%", then fade the overlay into Hero.
    schedule(() => setBootState("exiting"), TOTAL_COUNT_MS + HOLD_MS);
    schedule(
      () => setBootState("hidden"),
      TOTAL_COUNT_MS + HOLD_MS + FADE_MS,
    );

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <div
        className={`transition-all duration-300 ${
          bootState === "hidden"
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0"
        }`}
      >
        {children}
      </div>
      {bootState !== "hidden" && (
        <section
          aria-label="System initialization"
          className={`fixed inset-0 z-10 flex items-center px-6 transition-all duration-300 sm:px-10 lg:px-16 ${
            bootState === "exiting"
              ? "translate-y-1 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <TerminalWindow label="shyam@portfolio:~" size="sm">
            {/* Boot log body — completed stages stay at 100%, only the active
                stage's percentage ticks up; "system online… 100%" is the
                distinct completion stage below the count. */}
            <div className="p-5 font-mono text-xs leading-[1.6] text-muted sm:p-6 sm:text-sm">
              {bootLines.map((line, i) => {
                if (i > stageIndex) return null;
                const isActive = i === stageIndex && !systemOnline;
                const value = isActive ? progress : 100;
                return (
                  <p key={line} className="break-words">
                    <span className="text-accent">&gt; </span>
                    {line}{" "}
                    <span className="inline-block w-[4ch] text-right text-status">
                      {value}%
                    </span>
                  </p>
                );
              })}
              {systemOnline && (
                <p className="mt-6 text-foreground">
                  <span className="text-accent">&gt; </span>
                  {SYSTEM_ONLINE_LINE}{" "}
                  <span className="inline-block w-[4ch] text-right text-status">
                    100%
                  </span>
                </p>
              )}
              <span
                aria-hidden="true"
                className="inline-block h-4 w-1.5 translate-y-0.5 bg-accent motion-safe:animate-[cursor-blink_1s_steps(1)_infinite]"
              />
            </div>
          </TerminalWindow>
        </section>
      )}
    </>
  );
}
