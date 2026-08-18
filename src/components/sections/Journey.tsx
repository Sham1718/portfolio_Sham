"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyData } from "@/data/journey";

gsap.registerPlugin(ScrollTrigger);

/**
 * 05 / JOURNEY — a calm, minimal editorial timeline answering only "where did
 * it start?". Two zones on desktop (identity left, timeline right), one thin
 * spine with dot markers, no cards, no background architecture — a visual
 * break after the technical Projects section. Only verified stops render
 * (currently Education → Current State; the internship field is a documented
 * hook until real details exist). One subtle GSAP reveal on entry, instant
 * under prefers-reduced-motion.
 */
export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLLIElement>(null);
  const currentRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion: everything stays visible, nothing animates.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [
      labelRef.current,
      headingRef.current,
      paragraphRef.current,
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

    // The spine draws down from the first stop to the last.
    if (spineRef.current) {
      timeline.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.7,
          ease: "power2.out",
          transformOrigin: "top center",
        },
        "-=0.25",
      );
    }

    timeline.fromTo(
      [educationRef.current, currentRef.current].filter(Boolean),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.12 },
      "-=0.35",
    );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  const { tag, heading, paragraph, education, internship, current } =
    journeyData;

  return (
    <section
      id="journey"
      ref={sectionRef}
      aria-labelledby="journey-heading"
      className="relative mx-auto w-full max-w-6xl py-10 sm:py-12 lg:py-14"
    >
      <div className="relative z-10 w-full border-y border-border/70 py-6 sm:py-8 lg:py-10">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-20">
          {/* Left — section identity */}
          <div>
            <p
              ref={labelRef}
              className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs"
            >
              {tag}
            </p>

            <h2
              id="journey-heading"
              ref={headingRef}
              className="mt-6 text-4xl leading-[1.06] font-semibold tracking-[-0.03em] text-foreground uppercase sm:text-5xl sm:leading-[1.04] lg:text-[3.25rem]"
            >
              {heading}
            </h2>

            <p
              ref={paragraphRef}
              className="mt-6 max-w-[440px] text-base leading-7 text-muted sm:text-lg sm:leading-8"
            >
              {paragraph}
            </p>
          </div>

          {/* Right — minimal editorial timeline */}
          <div className="mt-14 lg:mt-1">
            <ul className="relative">
              {/* Spine */}
              <div
                ref={spineRef}
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-0 w-px bg-border/50"
              />

              {/* EDUCATION */}
              <li ref={educationRef} className="relative pl-10 pb-16">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent/80 bg-background"
                />
                <p className="font-mono text-[0.7rem] font-semibold tracking-[0.18em] text-accent uppercase">
                  {education.label}
                </p>
                <h3 className="mt-3 font-mono text-sm font-semibold tracking-[0.06em] text-foreground uppercase">
                  {education.title}
                </h3>
                <p className="mt-1.5 font-mono text-sm text-muted">
                  {education.degree}
                </p>
                {education.academics && (
                  <p className="mt-1 font-mono text-xs text-accent">
                    {education.academics}
                  </p>
                )}
              </li>

              {/* INTERNSHIP — only renders once verified details exist */}
              {internship && (
                <li className="relative pl-10 pb-16">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent/80 bg-background"
                  />
                  <p className="font-mono text-[0.7rem] font-semibold tracking-[0.18em] text-accent uppercase">
                    {internship.label}
                  </p>
                  <h3 className="mt-3 font-mono text-sm font-semibold tracking-[0.06em] text-foreground uppercase">
                    {internship.title}
                  </h3>
                  {internship.company && (
                    <p className="mt-1.5 font-mono text-sm text-muted">
                      {internship.company}
                    </p>
                  )}
                  <p className="mt-1 font-mono text-xs leading-relaxed text-muted">
                    {internship.description}
                  </p>
                  {internship.period && (
                    <p className="mt-1 font-mono text-xs text-muted/70">
                      {internship.period}
                    </p>
                  )}
                </li>
              )}

              {/* CURRENTLY — the natural conclusion */}
              <li ref={currentRef} className="relative pl-10">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent"
                />
                <p className="font-mono text-[0.7rem] font-semibold tracking-[0.18em] text-accent uppercase">
                  {current.label}
                </p>
                <h3 className="mt-3 font-mono text-sm font-semibold tracking-[0.06em] text-accent uppercase">
                  {current.title}
                </h3>
                <p className="mt-1.5 flex flex-wrap gap-x-2 font-mono text-sm text-foreground/80">
                  {current.stack.map((item, i) => (
                    <span key={item} className="flex items-center gap-2">
                      {i > 0 && (
                        <span aria-hidden="true" className="text-muted/50">
                          ·
                        </span>
                      )}
                      {item}
                    </span>
                  ))}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
