import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import { ProjectArchitectureDiagram } from "@/components/projects/ProjectArchitectureDiagram";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Shyam Bharaskar`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background px-6 py-16 sm:px-10 lg:px-16">
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-background opacity-[0.18] [background-image:linear-gradient(rgba(181,101,74,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(181,101,74,0.07)_1px,transparent_1px)] [background-size:4rem_4rem]"
      />

      <div className="mx-auto max-w-4xl">
        {/* Back navigation */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-150 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span
              aria-hidden="true"
              className="translate-x-0 transition-transform duration-150 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Back to Projects
          </Link>
        </nav>

        {/* Project Header */}
        <header className="border-b border-border/70 pb-10">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.7rem] font-semibold tracking-[0.18em] text-accent/60">
              {project.number}
            </span>
            <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
              System / 04 — Projects
            </p>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-[2.75rem]">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {project.shortDescription}
          </p>

          {/* Technologies */}
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[0.65rem] tracking-[0.1em] text-foreground/60 uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Problem */}
        <Section title="PROBLEM">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {project.problem}
          </p>
        </Section>

        {/* Approach */}
        <Section title="APPROACH">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {project.approach}
          </p>
        </Section>

        {/* Architecture */}
        <Section title="ARCHITECTURE">
          <div className="flex justify-start">
            <div className="w-full max-w-xs border border-border/50 bg-surface/40 p-5">
              <ProjectArchitectureDiagram
                steps={project.architectureFlow}
                compact={false}
              />
            </div>
          </div>
        </Section>

        {/* Implementation */}
        <Section title="IMPLEMENTATION">
          <ul className="space-y-3">
            {project.implementation.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-base leading-relaxed text-muted sm:text-lg"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.35em] h-1.5 w-1.5 shrink-0 bg-accent/60"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Engineering Decisions */}
        <Section title="ENGINEERING DECISIONS">
          <ul className="space-y-3">
            {project.decisions.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-base leading-relaxed text-muted sm:text-lg"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.35em] h-1.5 w-1.5 shrink-0 bg-status/60"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Challenges */}
        <Section title="CHALLENGES">
          <ul className="space-y-3">
            {project.challenges.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-base leading-relaxed text-muted sm:text-lg"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.35em] h-1.5 w-1.5 shrink-0 bg-accent/40"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Result */}
        <Section title="RESULT">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {project.result}
          </p>
        </Section>

        {/* Links */}
        {(project.github || project.demo) && (
          <div className="mt-10 border-t border-border/70 pt-10">
            <p className="mb-5 font-mono text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              Links
            </p>
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border/70 bg-surface/70 px-5 py-2.5 font-mono text-xs tracking-[0.12em] text-foreground/80 uppercase transition-colors duration-150 hover:border-accent/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  GitHub →
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border/70 bg-surface/70 px-5 py-2.5 font-mono text-xs tracking-[0.12em] text-foreground/80 uppercase transition-colors duration-150 hover:border-accent/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        )}

        {/* Back link at bottom */}
        <div className="mt-16 border-t border-border/70 pt-10">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-150 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span
              aria-hidden="true"
              className="translate-x-0 transition-transform duration-150 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 border-t border-border/70 pt-10">
      <p className="mb-5 font-mono text-xs font-semibold tracking-[0.18em] text-accent uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}
