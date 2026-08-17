import { ArchitectureScene } from "@/components/background/ArchitectureScene";
import { aboutData } from "@/data/about";
import { architectures } from "@/data/architectures";

export function About() {
  const { tag, heading, paragraphs, capabilities, education, metadata } =
    aboutData;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-center py-20 sm:py-28"
    >
      {/* Background Architecture Scene for About */}
      <ArchitectureScene architecture={architectures.about} />

      {/* Foreground Content */}
      <div className="relative z-10 w-full border-y border-border/70 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Narrative & Educational Background */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs">
                {tag}
              </p>
              <h2
                id="about-heading"
                className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
              >
                {heading}
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Education & Core System Specs */}
            <div className="mt-8 border-t border-border/60 pt-6 sm:mt-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="glass-panel p-4">
                  <p className="font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase">
                    Education
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {education.field}
                  </p>
                  <p className="font-mono text-xs text-accent">
                    {education.degree}
                  </p>
                </div>

                <div className="glass-panel p-4">
                  <p className="font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase">
                    System Trajectory
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    Backend Architecture
                  </p>
                  <p className="font-mono text-xs text-status">
                    Java &bull; Spring Boot &bull; APIs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Capabilities & System Profile */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-border/70 pb-3">
                <span className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
                  Technical Scope
                </span>
                <span className="font-mono text-[0.7rem] tracking-wider text-muted">
                  SYSTEM / 02
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5">
                {capabilities.map((cap) => (
                  <div
                    key={cap.name}
                    className="group glass-panel p-3.5 transition-colors duration-150 hover:border-accent/50"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 bg-accent opacity-75 group-hover:opacity-100"
                      />
                      <h3 className="font-mono text-xs font-semibold tracking-[0.06em] text-foreground">
                        {cap.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-xs leading-normal text-muted">
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status Table */}
            <div className="glass-panel p-3.5 font-mono text-[0.7rem]">
              <div className="space-y-1.5">
                {metadata.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between"
                  >
                    <span className="text-muted">{item.key}:</span>
                    <span
                      className={
                        item.highlight
                          ? "flex items-center gap-1.5 font-semibold text-status"
                          : "text-foreground"
                      }
                    >
                      {item.highlight && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-status motion-safe:animate-pulse"
                        />
                      )}
                      {item.value}
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
