import Link from "next/link";
import { projectsData } from "@/data/projects";

/**
 * 04 / PROJECTS — the overview answers "what did I build?" as a clean,
 * numbered editorial list. Deliberately NO architecture here: diagrams live
 * only inside each project's deep-dive, so the overview stays quick to scan.
 */
export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative mx-auto w-full max-w-6xl py-20 sm:py-28"
    >
      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="border-b border-border/70 pb-10 sm:pb-14">
          <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase sm:text-xs">
            04 / Projects
          </p>
          <h2
            id="projects-heading"
            className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-foreground uppercase sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
          >
            Selected Work
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Three systems built from the ground up — each focused on a specific
            engineering challenge. Open one for the full deep-dive.
          </p>
        </div>

        {/* Projects List */}
        <div className="divide-y divide-border/70">
          {projectsData.map((project) => (
            <article
              key={project.id}
              className="group relative border-l-2 border-accent/25 py-10 pl-5 transition-colors duration-200 hover:border-accent/60 sm:py-12 sm:pl-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-accent/60 transition-colors duration-200 group-hover:text-accent">
                    {project.number}
                  </span>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                    {project.title}
                  </h3>
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="group/link inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.12em] text-accent uppercase transition-colors duration-150 hover:text-accent/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  aria-label={`View details for ${project.title}`}
                >
                  View Details
                  <span
                    aria-hidden="true"
                    className="translate-x-0 transition-transform duration-150 group-hover/link:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {project.shortDescription}
              </p>

              {/* Technologies as pill chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="border border-border/60 px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.1em] text-foreground/60 uppercase transition-colors duration-150 group-hover:border-accent/30 group-hover:text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
