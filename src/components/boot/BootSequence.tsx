"use client";

import { useEffect, useState, type ReactNode } from "react";

type BootState = "booting" | "completed" | "exiting" | "hidden";

interface BootSequenceProps {
  children: ReactNode;
}

const bootLines = [
  "initializing backend........",
  "loading services............",
  "establishing connection....",
  "mounting portfolio..........",
  "system ready................",
] as const;

const lineDelays = [0, 700, 1250, 1650, 2050] as const;
const accessGrantedAt = 2350;
const exitAt = 2450;
const hiddenAt = 2750;

export function BootSequence({ children }: BootSequenceProps) {
  const [bootState, setBootState] = useState<BootState>("booting");
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (callback: () => void, delay: number) => {
      timeouts.push(setTimeout(callback, delay));
    };

    if (prefersReducedMotion) {
      schedule(() => {
        setVisibleLineCount(bootLines.length);
        setAccessGranted(true);
        setBootState("completed");
      }, 0);
      schedule(() => setBootState("exiting"), 250);
      schedule(() => {
        setBootState("hidden");
      }, 400);
    } else {
      bootLines.forEach((_, index) => {
        schedule(() => setVisibleLineCount(index + 1), lineDelays[index]);
      });
      schedule(() => {
        setAccessGranted(true);
        setBootState("completed");
      }, accessGrantedAt);
      schedule(() => setBootState("exiting"), exitAt);
      schedule(() => {
        setBootState("hidden");
      }, hiddenAt);
    }

    return () => timeouts.forEach(clearTimeout);
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
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-xl border-l border-border pl-4 font-mono text-xs leading-7 text-muted sm:pl-5 sm:text-sm sm:leading-8">
              {bootLines.slice(0, visibleLineCount).map((line) => (
                <p key={line} className="break-words">
                  <span className="text-accent">&gt; </span>
                  {line} <span className="text-status">[OK]</span>
                </p>
              ))}
              {accessGranted && (
                <p className="mt-2 text-foreground">
                  <span className="text-accent">&gt; </span>
                  access granted.
                </p>
              )}
              <span
                aria-hidden="true"
                className="inline-block h-4 w-1.5 translate-y-0.5 bg-accent motion-safe:animate-pulse"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
