"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchitectureScene } from "@/components/background/ArchitectureScene";
import { engineeringData } from "@/data/engineering";
import { architectures } from "@/data/architectures";

gsap.registerPlugin(ScrollTrigger);

/**
 * 03 / ENGINEERING — an engineering manifesto, not a dashboard. The dominant
 * statement occupies the left ~55%; the five principles read as a dense
 * editorial list on the right (numbers + thin rules, no boxes). The
 * architecture background stays as a subtle living layer, masked under the
 * statement column so the foreground stays dominant. One restrained GSAP
 * reveal on entry, instant under prefers-reduced-motion.
 */
export function Engineering() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion: everything stays visible, nothing animates.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [
      labelRef.current,
      headingRef.current,
      paragraphRef.current,
      principlesRef.current,
    ].filter(Boolean);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
      },
    });
    timeline.fromTo(
      targets,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.09 },
    );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  const { tag, heading, paragraph, principles } = engineeringData;
  const headingLines = heading.split("\n");

  return (
    <section
      id="engineering"
      ref={sectionRef}
      aria-labelledby="engineering-heading"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-center py-20 sm:py-28"
    >
      {/* Background architecture — subtle living layer, masked under the
          statement column so the foreground stays dominant. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 sm:opacity-60"
      >
        <ArchitectureScene architecture={architectures.engineering} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--background)_0%,color-mix(in_srgb,var(--background)_55%,transparent)_45%,transparent_78%)]"
      />

      <div className="relative z-10 w-full border-y border-border/70 py-12 sm:py-16 lg:py-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-x-20">
          {/* Left — the statement */}
          <div>
            <p
              ref={labelRef}
              className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs"
            >
              {tag}
            </p>

            <h2
              id="engineering-heading"
              ref={headingRef}
              className="mt-6 text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-foreground uppercase sm:text-5xl sm:leading-[1.06] lg:text-[3.5rem] lg:leading-[1.04]"
            >
              {headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p
              ref={paragraphRef}
              className="mt-8 max-w-[520px] text-base leading-7 text-muted sm:text-lg sm:leading-8"
            >
              {paragraph}
            </p>
          </div>

          {/* Right — principles as a dense editorial list (no boxes) */}
          <div ref={principlesRef} className="mt-14 lg:mt-2">
            <div className="flex items-baseline justify-between border-b border-border/40 pb-4">
              <span className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
                Principles
              </span>
              <span className="font-mono text-[0.7rem] tracking-wider text-muted">
                {principles.length.toString().padStart(2, "0")} / System
              </span>
            </div>

            <ul className="mt-2">
              {principles.map((principle) => (
                <li
                  key={principle.number}
                  className="border-b border-border/30 py-5 last:border-b-0"
                >
                  <div className="flex gap-5">
                    <span className="pt-1 font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-accent">
                      {principle.number}
                    </span>
                    <div>
                      <h3
                        className={
                          principle.number === "03"
                            ? "font-mono text-xs font-semibold tracking-[0.08em] text-accent uppercase"
                            : "font-mono text-xs font-semibold tracking-[0.08em] text-foreground/85 uppercase"
                        }
                      >
                        {principle.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
