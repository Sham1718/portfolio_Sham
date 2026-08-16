import { contactData } from "@/data/contact";

export function Contact() {
  const { tag, heading, paragraph, links, systemStatus, terminalPrompt } =
    contactData;

  const [headingLine1, headingLine2] = heading.split("\n");

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
            stroke="#67e8f9"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle cx="840" cy="80" r="2.5" fill="#6ee7b7" opacity="0.6" />
          <circle cx="840" cy="300" r="2.5" fill="#6ee7b7" opacity="0.6" />
          <circle cx="800" cy="450" r="2.5" fill="#67e8f9" opacity="0.6" />
          <circle cx="800" cy="650" r="3" fill="#67e8f9" opacity="0.4" />
        </svg>
      </div>

      <div className="relative z-10 w-full border-y border-border/70 py-10 sm:py-14 lg:py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading & Narrative */}
          <div className="flex flex-col justify-between space-y-8 lg:col-span-6">
            <div>
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

            {/* Final Terminal Moment */}
            <div className="border border-border/60 bg-surface/50 p-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-muted">
                <span className="text-accent">&gt;</span>
                <span className="text-foreground/90">{terminalPrompt}</span>
                <span
                  aria-hidden="true"
                  className="inline-block h-3.5 w-1.5 bg-accent motion-safe:animate-pulse"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Links & System Status */}
          <div className="flex flex-col justify-between space-y-8 lg:col-span-6">
            {/* Contact Action Links */}
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-2.5">
                <span className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
                  Direct Channels
                </span>
                <span className="font-mono text-[0.65rem] tracking-wider text-muted">
                  CONNECT // 01–04
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.type === "email" ? undefined : "_blank"}
                    rel={link.type === "email" ? undefined : "noopener noreferrer"}
                    className="group border border-border/70 bg-surface/75 p-4 transition-all duration-150 hover:border-accent/50 hover:bg-surface focus-visible:border-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold tracking-[0.1em] text-foreground transition-colors duration-150 group-hover:text-accent">
                        {link.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-accent"
                      >
                        →
                      </span>
                    </div>
                    {link.note && (
                      <p className="mt-1 font-mono text-[0.7rem] text-muted">
                        {link.note}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* System Termination Status */}
            <div className="border border-border/70 bg-surface/70 p-4 font-mono text-[0.7rem]">
              <div className="mb-3 flex items-center justify-between border-b border-border/50 pb-2">
                <span className="font-semibold tracking-[0.14em] text-accent/80 uppercase">
                  {"// System Status"}
                </span>
                <span className="text-[0.65rem] text-muted">PORTFOLIO_CORE</span>
              </div>

              <div className="space-y-2">
                {systemStatus.map((item) => (
                  <div
                    key={item.code}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-muted/60">{item.code}</span>
                      <span className="text-muted">{item.label}</span>
                    </div>
                    <span
                      className={`text-[0.65rem] font-semibold px-1.5 py-0.5 border ${
                        item.status === "COMPLETE"
                          ? "border-status/40 text-status bg-status/10"
                          : item.status === "STABLE"
                            ? "border-accent/40 text-accent bg-accent/10"
                            : "border-border text-muted bg-surface"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
