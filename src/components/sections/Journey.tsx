import { journeyData } from "@/data/journey";

export function Journey() {
  const { tag, heading, paragraph, systemMeta, milestones } = journeyData;

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative mx-auto min-h-[100svh] w-full max-w-6xl py-20 sm:py-28"
    >
      {/* Background Subtle System Progression Pipeline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <svg
          viewBox="0 0 1000 900"
          preserveAspectRatio="xMidYMid slice"
          className="hidden h-full w-full opacity-25 sm:block"
        >
          {/* Faint vertical pipeline trace */}
          <line
            x1="920"
            y1="80"
            x2="920"
            y2="820"
            stroke="var(--accent)"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {[120, 240, 360, 480, 600, 720, 840].map((y, idx) => (
            <g key={idx} transform={`translate(920 ${y})`}>
              <circle r="3" fill="var(--accent)" opacity="0.4" />
              <line
                x1="0"
                y1="0"
                x2="-30"
                y2="0"
                stroke="var(--accent)"
                strokeOpacity="0.15"
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 w-full border-y border-border/70 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Sticky Editorial Heading & System Trace Status */}
          <div className="flex flex-col justify-between space-y-8 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <div>
              <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs">
                {tag}
              </p>
              <h2
                id="journey-heading"
                className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
              >
                {heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            </div>

            {/* System Log Metadata readout */}
            <div className="glass-panel p-4 font-mono text-[0.7rem]">
              <p className="mb-2.5 text-[0.65rem] font-semibold tracking-[0.16em] text-accent/70 uppercase">
                {"// System Trace Log"}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">STATUS:</span>
                  <span className="flex items-center gap-1.5 font-semibold text-status">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-status motion-safe:animate-pulse"
                    />
                    {systemMeta.logStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">FOCUS:</span>
                  <span className="text-foreground">{systemMeta.currentFocus}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">TARGET:</span>
                  <span className="text-accent">{systemMeta.trajectory}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Continuous System Development Timeline */}
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center justify-between border-b border-border/70 pb-3">
              <span className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
                System Development Log
              </span>
              <span className="font-mono text-[0.7rem] tracking-wider text-muted">
                CHRONO_INDEX / 01–07
              </span>
            </div>

            <div className="relative border-l border-border/70 pl-6 sm:pl-8">
              <div className="space-y-8 sm:space-y-10">
                {milestones.map((milestone) => {
                  const isActive = milestone.status === "ACTIVE";
                  const isUpcoming = milestone.status === "UPCOMING";

                  return (
                    <article
                      key={milestone.id}
                      className={`group relative glass-panel p-5 transition-all duration-200 sm:p-6 ${
                        isActive ? "shadow-[0_0_24px_rgba(181,101,74,0.06)]" : ""
                      } ${
                        !isActive && !isUpcoming ? "hover:border-border/90" : ""
                      }`}
                    >
                      {/* Spine Node Dot */}
                      <div
                        aria-hidden="true"
                        className={`absolute -left-[31px] top-6 h-3.5 w-3.5 -translate-x-1/2 border sm:-left-[39px] ${
                          isActive
                            ? "border-accent bg-background"
                            : isUpcoming
                              ? "border-dashed border-muted/50 bg-background"
                              : "border-status/70 bg-status/20"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute inset-0.5 bg-accent motion-safe:animate-pulse" />
                        )}
                        {!isActive && !isUpcoming && (
                          <div className="absolute inset-1 bg-status" />
                        )}
                      </div>

                      {/* Milestone Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs font-bold tracking-[0.16em] ${
                              isActive
                                ? "text-accent"
                                : isUpcoming
                                  ? "text-muted/60"
                                  : "text-status"
                            }`}
                          >
                            STEP {milestone.step}
                          </span>
                          <span className="font-mono text-[0.65rem] tracking-[0.12em] text-muted uppercase">
                            {"// "}{milestone.phase}
                          </span>
                        </div>

                        <span
                          className={`font-mono text-[0.65rem] font-medium tracking-[0.1em] px-2 py-0.5 border ${
                            isActive
                              ? "border-accent/50 text-accent bg-accent/10"
                              : isUpcoming
                                ? "border-border text-muted/60 bg-surface"
                                : "border-status/40 text-status bg-status/10"
                          }`}
                        >
                          {milestone.status}
                        </span>
                      </div>

                      {/* Milestone Content */}
                      <div className="mt-4">
                        <h3
                          className={`text-lg font-semibold tracking-[-0.02em] sm:text-xl ${
                            isActive
                              ? "text-foreground"
                              : isUpcoming
                                ? "text-muted"
                                : "text-foreground/90"
                          }`}
                        >
                          {milestone.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                          {milestone.summary}
                        </p>

                        {milestone.details && (
                          <p className="mt-2 font-mono text-xs text-muted/70">
                            {milestone.details}
                          </p>
                        )}

                        {/* Technical Tags */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {milestone.tags.map((tagItem) => (
                            <span
                              key={tagItem}
                              className={`font-mono text-[0.65rem] tracking-[0.08em] px-2 py-0.5 uppercase border ${
                                isActive
                                  ? "border-accent/30 text-accent/90 bg-accent/5"
                                  : "border-border/60 text-foreground/60 bg-background/50"
                              }`}
                            >
                              {tagItem}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
