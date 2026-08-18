import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureScene } from "@/components/background/ArchitectureScene";
import { projectsData } from "@/data/projects";
import { architectures } from "@/data/architectures";
import type { ArchitectureState } from "@/types/architecture";

/** Map each project to its real system architecture state. */
const ARCHITECTURE_BY_PROJECT: Record<string, ArchitectureState> = {
  jira: "microservices",
  "rate-limiter": "rate-limiter",
  "legal-ai": "legal-ai",
};

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
              04 / Projects
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

        {/* Hero image / screenshot area — real image when set, else an
            intentional placeholder (never a broken image or empty gap). */}
        <div className="mt-10">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              width={1280}
              height={720}
              priority
              className="h-auto w-full rounded-md border border-border/60"
            />
          ) : (
            <div className="glass-panel flex h-48 items-center justify-center rounded-md sm:h-64">
              <span className="font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase">
                Preview coming soon
              </span>
            </div>
          )}
        </div>

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

        {/* Architecture — the real system diagram via the shared engine */}
        <Section title="ARCHITECTURE">
          {/* The scene needs a real <section> ancestor for its own
              ScrollTrigger visibility gating; the frame has no background so
              the diagram renders against the page surface. */}
          <section
            aria-label={`${project.title} system architecture`}
            className="relative h-[420px] w-full overflow-hidden rounded-md border border-border/50 sm:h-[520px]"
          >
            <ArchitectureScene
              architecture={
                architectures[ARCHITECTURE_BY_PROJECT[project.id]]
              }
            />
            <div className="pointer-events-none absolute top-3 left-4 z-10 font-mono text-[0.6rem] tracking-[0.16em] text-accent/70 uppercase">
              System / 04 — Architecture
            </div>
            <div className="pointer-events-none absolute right-4 bottom-3 z-10 font-mono text-[0.6rem] tracking-[0.16em] text-muted uppercase">
              {project.number} / Live
            </div>
          </section>
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

        {/* GitHub + demo actions — only rendered when a URL actually exists;
            a missing demo shows an explicit unavailable state, never a fake
            link. Projects with neither URL show no row at all. */}
        {(project.github || project.demo) && (
          <div className="mt-14 border-t border-border/70 pt-10">
            <div className="flex flex-wrap items-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-accent/60 px-5 py-2.5 font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase transition-colors duration-150 hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-accent/60 px-5 py-2.5 font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase transition-colors duration-150 hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  Live Demo <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="font-mono text-xs tracking-[0.12em] text-muted/60 uppercase">
                  Demo unavailable
                </span>
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
