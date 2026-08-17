import { techStackData } from "@/data/tech-stack";
import { TechOrbit } from "@/components/techstack/TechOrbit";
import { GithubStats } from "@/components/status/GithubStats";

export function TechStack() {
  const { tag, heading, paragraph, systemMeta } = techStackData;

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="relative mx-auto min-h-[100svh] w-full max-w-6xl py-20 sm:py-28"
    >
      {/* Subtle Background Tooling Flow Pipeline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
          className="hidden h-full w-full opacity-20 sm:block"
        >
          <path
            d="M840 100V300L880 450V700"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          {[100, 300, 450, 700].map((y, idx) => (
            <circle
              key={idx}
              cx={y === 450 || y === 700 ? 880 : 840}
              cy={y}
              r="3"
              fill="var(--accent)"
              opacity="0.5"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 w-full border-y border-border/70 py-10 sm:py-14 lg:py-16">
        {/* Section Header */}
        <div className="border-b border-border/70 pb-10 sm:pb-14">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs">
                {tag}
              </p>
              <h2
                id="tech-stack-heading"
                className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
              >
                {heading}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            </div>

            {/* System Log Metadata readout */}
            <div className="glass-panel p-4 font-mono text-[0.7rem] sm:min-w-[280px]">
              <p className="mb-2.5 text-[0.65rem] font-semibold tracking-[0.16em] text-accent/70 uppercase">
                {"// Capability Index"}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">STATUS:</span>
                  <span className="flex items-center gap-1.5 font-semibold text-status">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-status motion-safe:animate-pulse"
                    />
                    {systemMeta.stackStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">CORE_STACK:</span>
                  <span className="text-foreground">{systemMeta.primaryRuntime}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">PARADIGM:</span>
                  <span className="text-accent">{systemMeta.architectureType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Orbit — rotating 3D ring of brand icons (static grid on mobile) */}
        <div className="pt-10 sm:pt-14">
          <TechOrbit />
        </div>

        {/* Live GitHub stats — real data, server-rendered below the ring */}
        <div className="mt-10 flex justify-center sm:mt-14">
          <GithubStats />
        </div>
      </div>
    </section>
  );
}
