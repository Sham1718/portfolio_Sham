import { techStackData } from "@/data/tech-stack";
import { TechOrbit } from "@/components/techstack/TechOrbit";
import { GithubStats } from "@/components/status/GithubStats";
import { ScrollReveal } from "@/components/scroll/ScrollReveal";

export function TechStack() {
  const { tag, heading, paragraph, systemMeta, categories } = techStackData;

  // Real numbers derived from the data — never hardcoded.
  const totalTechCount = categories.reduce(
    (sum, category) => sum + category.technologies.length,
    0,
  );
  const categoryCount = categories.length;

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="relative mx-auto w-full max-w-6xl py-10 sm:py-12 lg:py-14"
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

      <div className="relative z-10 w-full border-y border-border/70 py-6 sm:py-8 lg:py-10">
        {/* Section Header */}
        <div className="border-b border-border/70 pb-10 sm:pb-14">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <ScrollReveal>
                <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs">
                  {tag}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2
                  id="tech-stack-heading"
                  className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
                >
                  {heading}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              </ScrollReveal>
            </div>

            {/* System Log Metadata readout — glass panel with a crisp,
                warm-rust border so the panel boundary reads as intentional
                instead of blending into the background (the stock glass
                border is 80% --border, too faint here). */}
            <ScrollReveal delay={0.25}>
              <div
                className="glass-panel p-4 font-mono text-[0.7rem] sm:min-w-[280px]"
                style={{
                  borderColor: "color-mix(in srgb, var(--accent) 32%, transparent)",
                }}
              >
                <p className="mb-2.5 text-[0.65rem] font-semibold tracking-[0.16em] text-accent/70 uppercase">
                  {"// Capability Index"}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted">CATALOG:</span>
                    <span className="text-foreground">
                      {totalTechCount} TECHNOLOGIES
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted">DOMAINS:</span>
                    <span className="text-foreground">
                      {categoryCount} CATEGORIES
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
            </ScrollReveal>
          </div>
        </div>

        {/* Tech Orbit — rotating 3D ring of brand icons (static grid on mobile) */}
        <ScrollReveal delay={0.1}>
          <div className="pt-10 sm:pt-14">
            <TechOrbit />
          </div>
        </ScrollReveal>

        {/* Live GitHub stats — real data, server-rendered below the ring */}
        <ScrollReveal delay={0.15}>
          <div className="mt-10 flex justify-center sm:mt-14">
            <GithubStats />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

