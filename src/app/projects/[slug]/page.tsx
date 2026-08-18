import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";

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

        {/* Problem — the header flows directly here; the preview/hero image
            rendering is intentionally removed until final preview images are
            provided (project.image stays in the data for re-enabling). */}
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

        {/* Architecture — asset-ready: a real diagram image when provided,
            else an intentional placeholder (never a broken image or an empty
            window). Add the image via project.architectureImage — no code
            changes needed. */}
        <Section title="ARCHITECTURE">
          <div
            aria-label={`${project.title} system architecture`}
            className="relative h-[420px] w-full overflow-hidden rounded-md border border-border/60 bg-surface/20 sm:h-[520px]"
          >
            {project.architectureImage ? (
              <Image
                src={project.architectureImage}
                alt={`${project.title} system architecture`}
                width={1280}
                height={720}
                className="h-full w-full object-contain"
              />
            ) : (
              <ArchitecturePlaceholder />
            )}
            <div className="pointer-events-none absolute top-3 left-4 z-10 font-mono text-[0.6rem] tracking-[0.16em] text-accent/70 uppercase">
              System / 04 — Architecture
            </div>
            <div className="pointer-events-none absolute right-4 bottom-3 z-10 font-mono text-[0.6rem] tracking-[0.16em] text-muted uppercase">
              {project.number} / Diagram
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

        {/* GitHub + demo actions — always visible so the actions are never
            hidden, but honest: real buttons only when a URL exists in the
            project data; muted pending states when it does not (no fake or
            placeholder URLs). */}
        <div className="mt-14 border-t border-border/70 pt-10">
          <p className="mb-5 font-mono text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            Repository & Deployment
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-accent/60 px-5 py-2.5 font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase transition-colors duration-150 hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 border border-border/60 px-5 py-2.5 font-mono text-xs tracking-[0.12em] text-muted/60 uppercase">
                GitHub — URL pending
              </span>
            )}
            {/* Live Demo — only rendered when a verified URL exists; no dead
                buttons, no fake links. None of the projects have one yet. */}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-accent/60 px-5 py-2.5 font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase transition-colors duration-150 hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                Live Demo <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

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

/** Intentional architecture placeholder — shown until the project's real
    architecture image is added (data/projects.ts → architectureImage).
    Technical/editorial styling, no fake diagram, no broken image. */
function ArchitecturePlaceholder() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(181,101,74,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(181,101,74,0.08)_1px,transparent_1px)] [background-size:3rem_3rem]"
      />
      <p className="relative font-mono text-[0.7rem] font-semibold tracking-[0.2em] text-accent uppercase">
        Architecture
      </p>
      <p className="relative font-mono text-sm tracking-[0.14em] text-foreground/70 uppercase">
        System architecture visualization
      </p>
      <p className="relative font-mono text-xs tracking-[0.08em] text-muted">
        Architecture diagram will be displayed here.
      </p>
      <p className="relative mt-2 font-mono text-[0.6rem] tracking-[0.16em] text-muted/60 uppercase">
        {"// Awaiting asset"}
      </p>
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
