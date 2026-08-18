"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { contactData } from "@/data/contact";

gsap.registerPlugin(ScrollTrigger);

/** One command block that fades in once when the section is first scrolled into view. */
function RevealBlock({
  revealed,
  delay,
  children,
}: {
  revealed: boolean;
  delay: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      } motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
      style={{ transitionDelay: revealed ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function Contact() {
  const { tag, heading, paragraph, links, systemStatus, terminalPrompt } =
    contactData;

  const [headingLine1, headingLine2] = heading.split("\n");
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalWrapRef = useRef<HTMLDivElement>(null);

  // Header scroll-reveal — label → heading → paragraph, matching the other sections.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [
      labelRef.current,
      headingRef.current,
      paragraphRef.current,
    ].filter(Boolean);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
      },
    });
    tl.fromTo(
      targets,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.09 },
    );

    // Terminal wrapper — simple fade+translate when it enters.
    const termWrap = terminalWrapRef.current;
    let termTween: gsap.core.Tween | null = null;
    if (termWrap) {
      gsap.set(termWrap, { opacity: 0, y: 20 });
      termTween = gsap.to(termWrap, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: termWrap,
          start: "top 85%",
          once: true,
        },
      });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      termTween?.scrollTrigger?.kill();
      termTween?.kill();
    };
  }, []);

  // One-time reveal when the terminal scrolls into view — no replay on re-entry.
  useEffect(() => {
    const node = terminalRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const emailLink = links.find((link) => link.type === "email");

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative mx-auto w-full max-w-6xl py-10 sm:py-12 lg:py-14"
    >
      {/* Subtle Background Circuit Closed Pipeline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
          className="hidden h-full w-full opacity-15 sm:block"
        >
          <path
            d="M840 80V300L800 450V650"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle cx="840" cy="80" r="2.5" fill="var(--accent)" opacity="0.6" />
          <circle cx="840" cy="300" r="2.5" fill="var(--accent)" opacity="0.6" />
          <circle cx="800" cy="450" r="2.5" fill="var(--accent)" opacity="0.6" />
          <circle cx="800" cy="650" r="3" fill="var(--accent)" opacity="0.4" />
        </svg>
      </div>

      <div className="relative z-10 w-full border-y border-border/70 py-6 sm:py-8 lg:py-10">
        {/* Section header */}
        <div className="max-w-2xl">
          <p ref={labelRef} className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs">
            {tag}
          </p>
          <h2
            id="contact-heading"
            ref={headingRef}
            className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]"
          >
            {headingLine1}
            <br />
            <span className="text-accent">{headingLine2}</span>
          </h2>
          <p ref={paragraphRef} className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {paragraph}
          </p>
        </div>

        {/* Terminal window — same chrome as the boot sequence, wide pane.
            Moderate spacing from the heading: the terminal is the main
            visual, but the gap shouldn't create a dead zone. */}
        <div ref={terminalWrapRef} className="mt-8 sm:mt-10">
          <TerminalWindow label="shyam@portfolio:~/contact" size="lg">
            <div
              ref={terminalRef}
              className="space-y-5 p-4 font-mono text-xs leading-[1.6] text-muted sm:p-5 sm:text-sm"
            >
              <RevealBlock revealed={revealed} delay={0}>
                <div className="space-y-1.5">
                  <p className="break-words">
                    <span className="text-accent">&gt; </span>whoami
                  </p>
                  <p className="text-foreground">
                    Shyam Bharaskar — Computer Engineering graduate · backend
                    development
                  </p>
                </div>
              </RevealBlock>

              <RevealBlock revealed={revealed} delay={120}>
                <div className="space-y-1.5">
                  <p className="break-words">
                    <span className="text-accent">&gt; </span>cat contact.txt
                  </p>
                  <div className="space-y-1">
                    {links.map((link) => (
                      <p
                        key={link.label}
                        className="flex flex-wrap items-baseline break-words"
                      >
                        <span className="w-[9ch] shrink-0 text-muted/70">
                          {link.label.toLowerCase()}:
                        </span>
                        <a
                          href={link.href}
                          target={link.type === "email" ? undefined : "_blank"}
                          rel={
                            link.type === "email"
                              ? undefined
                              : "noopener noreferrer"
                          }
                          className="min-w-0 break-words text-accent underline-offset-4 decoration-accent/70 transition-colors duration-150 hover:underline hover:decoration-accent focus-visible:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent"
                        >
                          {link.href}
                        </a>
                        {link.note && (
                          <span className="ml-3 text-muted/60">
                            # {link.note}
                          </span>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              <RevealBlock revealed={revealed} delay={240}>
                <div className="space-y-1.5">
                  <p className="break-words">
                    <span className="text-accent">&gt; </span>./send_message.sh
                  </p>
                  {emailLink?.href ? (
                    <p className="break-words">
                      <a
                        href={emailLink.href}
                        className="font-semibold text-accent underline-offset-4 decoration-accent/70 transition-colors duration-150 hover:underline hover:decoration-accent focus-visible:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent"
                      >
                        compose email →
                      </a>
                      <span className="text-muted/60">
                        {"  // opens your mail client"}
                      </span>
                    </p>
                  ) : (
                    <p className="text-muted/70">
                      send_message: command not found
                    </p>
                  )}
                </div>
              </RevealBlock>

              <RevealBlock revealed={revealed} delay={360}>
                <div className="space-y-1.5">
                  <p className="break-words">
                    <span className="text-accent">&gt; </span>status
                  </p>
                  <div className="space-y-1">
                    {systemStatus.map((item) => (
                      <p key={item.code} className="break-words">
                        <span className="text-muted/70">{item.code} </span>
                        {item.label}{" "}
                        <span className="text-status">[{item.status}]</span>
                      </p>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              <RevealBlock revealed={revealed} delay={480}>
                <p className="break-words">
                  <span className="text-accent">&gt; </span>
                  {terminalPrompt}
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-4 w-1.5 translate-y-0.5 bg-accent motion-safe:animate-[cursor-blink_1s_steps(1)_infinite]"
                  />
                </p>
              </RevealBlock>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
