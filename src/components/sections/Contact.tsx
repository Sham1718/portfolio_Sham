"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { contactData } from "@/data/contact";

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
  const terminalRef = useRef<HTMLDivElement>(null);

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
      aria-labelledby="contact-heading"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-between py-20 sm:py-28"
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

      <div className="relative z-10 w-full border-y border-border/70 py-10 sm:py-14 lg:py-16">
        {/* Section header */}
        <div className="max-w-2xl">
          <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs">
            {tag}
          </p>
          <h2
            id="contact-heading"
            className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]"
          >
            {headingLine1}
            <br />
            <span className="text-accent">{headingLine2}</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {paragraph}
          </p>
        </div>

        {/* Terminal window — same chrome as the boot sequence, wide pane */}
        <div className="mt-10 sm:mt-14">
          <TerminalWindow label="shyam@portfolio:~/contact" size="lg">
            <div
              ref={terminalRef}
              className="space-y-7 p-4 font-mono text-xs leading-[1.6] text-muted sm:p-5 sm:text-sm"
            >
              <RevealBlock revealed={revealed} delay={0}>
                <div className="space-y-1.5">
                  <p className="break-words">
                    <span className="text-accent">&gt; </span>whoami
                  </p>
                  <p className="text-foreground">
                    Shyam Bharaskar — Computer Engineering student · backend
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
                        <span
                          className={
                            item.status === "CLOSED"
                              ? "text-muted/70"
                              : "text-status"
                          }
                        >
                          [{item.status}]
                        </span>
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
