import { techStackData } from "@/data/tech-stack";

export function TechStack() {
  const { tag, heading, paragraph, systemMeta, categories } = techStackData;

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
            stroke="#67e8f9"
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
              fill="#6ee7b7"
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
            <div className="border border-border/70 bg-surface/70 p-4 font-mono text-[0.7rem] sm:min-w-[280px]">
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

        {/* Categories Stack */}
        <div className="space-y-12 pt-10 sm:space-y-14 sm:pt-14">
          {categories.map((cat) => (
            <div key={cat.id} className="space-y-4">
              {/* Category Subheader */}
              <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-accent" />
                  <h3 className="font-mono text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                    {cat.category}
                  </h3>
                </div>
                <span className="font-mono text-[0.65rem] tracking-wider text-muted">
                  {"// "}{cat.tag}
                </span>
              </div>

              {/* Technologies Grid */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {cat.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    tabIndex={0}
                    className="group border border-border/70 bg-surface/75 p-3.5 transition-all duration-150 hover:border-accent/50 hover:bg-surface focus-visible:border-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-mono text-xs font-semibold tracking-[0.06em] text-foreground/90 transition-colors duration-150 group-hover:text-foreground">
                        {tech.name}
                      </h4>
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-accent/40 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      />
                    </div>
                    <p className="mt-1 text-xs leading-normal text-muted transition-colors duration-150 group-hover:text-muted/90">
                      {tech.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
