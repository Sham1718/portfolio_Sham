"use client";

import { useEffect, useRef, useState } from "react";
import { statusLog } from "@/data/status-log";

const ROTATE_MS = 3500;
const FADE_MS = 200;

/**
 * Decorative "request log" line — e.g. `GET /about → 200 OK · 8ms` — that
 * quietly rotates through the preset entries in data/status-log.ts. Fabricated
 * ambiance only; no real telemetry or analytics.
 *
 * SSR-safe: the server and the client's first render both show the FIRST
 * entry, statically (index starts at 0, no random/time-based value in the
 * render body). Rotation starts only inside an effect after hydration. The
 * whole line is aria-hidden — decorative detail, not information a screen
 * reader should announce repeatedly (no live region).
 */
export function StatusLogStrip() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      const timer = setTimeout(() => {
        setIndex((i) => (i + 1) % statusLog.length);
        setFading(false);
      }, FADE_MS);
      timeoutsRef.current.push(timer);
    }, ROTATE_MS);

    return () => {
      clearInterval(interval);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  const entry = statusLog[index];

  return (
    <p
      aria-hidden="true"
      className={`font-mono text-[0.7rem] tracking-[0.16em] transition-opacity duration-200 ease-out ${
        fading ? "opacity-0" : "opacity-100"
      } motion-reduce:transition-none motion-reduce:opacity-100`}
    >
      <span className="text-foreground">
        {entry.method} {entry.path}
      </span>
      <span className="text-accent">
        {" "}→ {entry.status} {entry.statusText} · {entry.ms}ms
      </span>
    </p>
  );
}
