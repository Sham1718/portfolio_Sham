"use client";

import { useEffect, useState } from "react";

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Live "session uptime" counter — time elapsed since the page mounted,
 * ticking once per second as HH:MM:SS.
 *
 * SSR-safe: the server and the client's first render both show the static
 * "00:00:00" (elapsed starts at 0, no Date.now() read in the render body or
 * a lazy initializer). The real clock only starts inside an effect after
 * hydration, so the two trees can never mismatch — the same default-then-
 * effect pattern used by CustomCursor and ScrollProgressRail. Elapsed is
 * always computed from actual timestamps (Date.now() - start), so interval
 * drift never accumulates.
 */
export function UptimeClock() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = () => setElapsed(Date.now() - start);
    // First paint lands on ~0:00:00, then ticks every second.
    const frame = window.requestAnimationFrame(tick);
    const interval = setInterval(tick, 1000);
    return () => {
      window.cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  return (
    <p className="font-mono text-[0.7rem] tracking-[0.16em] text-muted">
      UPTIME{" "}
      {/* The ticking value is decorative for screen readers — it would be
          read aloud every second as a live region. The static sr-only label
          below carries the meaning once instead. */}
      <span aria-hidden="true" className="text-foreground">
        {formatElapsed(elapsed)}
      </span>
      <span className="sr-only">Session timer</span>
    </p>
  );
}
