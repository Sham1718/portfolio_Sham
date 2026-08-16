"use client";

import { useEffect, useState } from "react";
import { heroRoles } from "@/data/roles";

type AnimationPhase = "typing" | "pausing" | "deleting";

export function RoleText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [phase, setPhase] = useState<AnimationPhase>("typing");
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timeout = window.setTimeout(() => setShouldAnimate(!mediaQuery.matches), 0);
    const onChange = () => setShouldAnimate(!mediaQuery.matches);

    mediaQuery.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(timeout);
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    const activeRole = heroRoles[roleIndex];
    const delay =
      phase === "pausing"
        ? 1100
        : phase === "deleting"
          ? characterCount > 0
            ? 45
            : 380
          : 85;
    const timeout = window.setTimeout(() => {
      if (phase === "typing") {
        if (characterCount < activeRole.length) {
          setCharacterCount((count) => count + 1);
        } else {
          setPhase("pausing");
        }
        return;
      }

      if (phase === "pausing") {
        setPhase("deleting");
        return;
      }

      if (characterCount > 0) {
        setCharacterCount((count) => count - 1);
      } else {
        setRoleIndex((index) => (index + 1) % heroRoles.length);
        setPhase("typing");
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [characterCount, phase, roleIndex, shouldAnimate]);

  const activeRole = heroRoles[roleIndex];
  const displayedRole = shouldAnimate
    ? activeRole.slice(0, characterCount)
    : heroRoles[0];

  return (
    <p className="min-h-[2.5rem] font-mono text-2xl font-medium leading-tight text-foreground sm:min-h-[3rem] sm:text-3xl lg:text-4xl">
      <span className="sr-only">Backend Engineer</span>
      <span aria-hidden="true">
        <span className="text-accent">|</span> {displayedRole}
        <span className="ml-1 inline-block h-[0.85em] w-px bg-accent align-[-0.08em] motion-safe:animate-pulse" />
      </span>
    </p>
  );
}
