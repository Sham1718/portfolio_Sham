import { ArchitectureScene } from "@/components/background/ArchitectureScene";
import { engineeringData } from "@/data/engineering";
import { architectures } from "@/data/architectures";

export function Engineering() {
  const { tag, heading, paragraph, principles } = engineeringData;

  const [headingLine1, headingLine2] = heading.split("\n");

  return (
    <section
      id="engineering"
      aria-labelledby="engineering-heading"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-center py-20 sm:py-28"
    >
      {/* Background Architecture Scene */}
      <ArchitectureScene architecture={architectures.engineering} />

      {/* Foreground Content */}
      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="border-b border-border/70 pb-10 sm:pb-14">
          <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs">
            {tag}
          </p>
          <h2
            id="engineering-heading"
            className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
          >
            {headingLine1}
            <br />
            <span className="text-muted">{headingLine2}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
            {paragraph}
          </p>
        </div>

        {/* Engineering Principles Grid */}
        <div className="pt-10 sm:pt-14">
          <div className="flex items-center justify-between pb-5">
            <span className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
              Engineering Principles
            </span>
            <span className="font-mono text-[0.7rem] tracking-wider text-muted">
              SYSTEM / 03
            </span>
          </div>

          <div className="grid grid-cols-1 gap-px border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="group flex flex-col bg-background p-5 transition-colors duration-200 hover:bg-surface/80 sm:p-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-accent/60 transition-colors duration-200 group-hover:text-accent">
                    {principle.number}
                  </span>
                  <h3 className="font-mono text-xs font-semibold tracking-[0.08em] text-foreground/80 transition-colors duration-200 group-hover:text-foreground">
                    {principle.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted/70 transition-colors duration-200 group-hover:text-muted">
                  {principle.description}
                </p>
                {/* Subtle accent bar that reveals on hover */}
                <div
                  aria-hidden="true"
                  className="mt-auto pt-4"
                >
                  <div className="h-px w-0 bg-accent/50 transition-all duration-300 ease-out group-hover:w-8" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
