"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchitectureScene } from "@/components/background/ArchitectureScene";
import { aboutData } from "@/data/about";
import { architectures } from "@/data/architectures";

gsap.registerPlugin(ScrollTrigger);

/**
 * 02 / ABOUT — a short, editorial identity statement. Content occupies the
 * left ~55–60% of the section; the About architecture (REQUEST → CONTROLLER →
 * SERVICE → REPOSITORY → DATABASE) reads as a recognizable technical layer on
 * the right, masked out under the text column so labels never collide with
 * foreground. One subtle GSAP reveal on entry, instant under
 * prefers-reduced-motion.
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLAnchorElement>(null);
  const traceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion: everything stays visible, nothing animates.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [
      labelRef.current,
      headingRef.current,
      paragraphRef.current,
      educationRef.current,
      resumeRef.current,
      traceRef.current,
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

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative mx-auto w-full max-w-6xl py-10 sm:py-12 lg:py-14"
    >
      {/* Background architecture — full-bleed behind the content, clearly
          visible on desktop (70%) but masked under the text column so the
          foreground stays dominant. Fainter on mobile (40%). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 sm:opacity-70"
      >
        <ArchitectureScene architecture={architectures.about} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--background)_0%,color-mix(in_srgb,var(--background)_55%,transparent)_40%,transparent_72%)]"
      />

      <div className="relative z-10 w-full border-y border-border/70 py-6 sm:py-8 lg:py-10">
        <div className="w-full max-w-[640px]">
          <p
            ref={labelRef}
            className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs"
          >
            {aboutData.tag}
          </p>

          <h2
            id="about-heading"
            ref={headingRef}
            className="mt-6 max-w-[620px] text-3xl leading-[1.12] font-semibold tracking-[-0.03em] text-foreground uppercase sm:text-4xl sm:leading-[1.1] lg:text-[2.75rem] lg:leading-[1.08]"
          >
            {aboutData.heading}
          </h2>

          <p
            ref={paragraphRef}
            className="mt-7 max-w-[600px] text-base leading-7 text-muted sm:text-lg sm:leading-8"
          >
            {aboutData.paragraph}
          </p>

          {/* Education — a compact editorial block, not a card */}
          <div
            ref={educationRef}
            className="mt-12 border-t border-border/40 pt-8"
          >
            <p className="font-mono text-[0.7rem] font-semibold tracking-[0.16em] text-foreground uppercase">
              {aboutData.education.field}
            </p>
            <p className="mt-2 font-mono text-sm text-muted">
              {aboutData.education.degree} / {aboutData.education.field}
            </p>
            {aboutData.academics && (
              <p className="mt-1 font-mono text-xs text-accent">
                {aboutData.academics}
              </p>
            )}

            {/* Resume action — downloads the real PDF, secondary to the heading */}
            <a
              ref={resumeRef}
              href="/resume/Shyam-Bharaskar.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 border border-border px-3.5 py-2 font-mono text-[0.7rem] tracking-[0.16em] text-foreground uppercase transition-colors duration-150 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span aria-hidden="true" className="text-accent">
                ↓
              </span>
              Download Resume
            </a>
          </div>

          {/* Technical trace — subtle signature, sits naturally below education */}
          <div
            ref={traceRef}
            aria-hidden="true"
            className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-2 font-mono text-[0.65rem] tracking-[0.14em] text-muted uppercase"
          >
            {aboutData.trace.map((item, i) => (
              <span key={item} className="flex items-center gap-2.5">
                {i > 0 && <span className="text-accent/60">→</span>}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
