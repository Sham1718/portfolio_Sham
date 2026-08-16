import Link from "next/link";
import { ArchitectureScene } from "@/components/background/ArchitectureScene";
import { ProjectArchitectureDiagram } from "@/components/projects/ProjectArchitectureDiagram";
import { projectsData } from "@/data/projects";
import { architectures } from "@/data/architectures";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative mx-auto min-h-[100svh] w-full max-w-6xl py-20 sm:py-28"
    >
      {/* Background architecture scene — reuses microservices as the closest conceptual match */}
      <ArchitectureScene architecture={architectures.microservices} />

      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="border-b border-border/70 pb-10 sm:pb-14">
          <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs">
            System / 04 — Projects
          </p>
          <h2
            id="projects-heading"
            className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
          >
            Systems built from the ground up.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Each project focuses on a specific engineering challenge — from
            distributed systems to AI pipelines.
          </p>
        </div>

        {/* Projects List */}
        <div className="divide-y divide-border/70">
          {projectsData.map((project) => (
            <article
              key={project.id}
              className="group py-10 sm:py-12"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Left: Metadata + narrative */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.7rem] font-semibold tracking-[0.18em] text-accent/60">
                        {project.number}
                      </span>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                        {project.title}
                      </h3>
                    </div>

                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                      {project.shortDescription}
                    </p>

                    {/* Technologies */}
                    <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[0.65rem] tracking-[0.1em] text-foreground/60 uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details */}
                  <div className="mt-8">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/link inline-flex items-center gap-2 border border-border/70 bg-surface/70 px-4 py-2.5 font-mono text-xs tracking-[0.12em] text-foreground/80 uppercase transition-all duration-150 hover:border-accent/50 hover:bg-surface hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                      aria-label={`View details for ${project.title}`}
                    >
                      View Details
                      <span
                        aria-hidden="true"
                        className="translate-x-0 transition-transform duration-150 group-hover/link:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right: Compact architecture diagram */}
                <div className="flex items-start lg:col-span-5">
                  <div className="w-full border border-border/50 bg-surface/40 p-4">
                    <p className="mb-3 font-mono text-[0.6rem] tracking-[0.16em] text-accent/50 uppercase">
                      Architecture
                    </p>
                    <div className="flex justify-center">
                      <div className="w-full max-w-[160px]">
                        <ProjectArchitectureDiagram
                          steps={project.architectureFlow}
                          compact
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
