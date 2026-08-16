const sections = [
  ["02", "ABOUT", "Architecture transition test"],
  ["03", "ENGINEERING", "Architecture transition test"],
  ["04", "LEGAL AI", "Architecture transition test"],
  ["05", "MICROSERVICES", "Architecture transition test"],
] as const;

const ids = ["about", "engineering", "legal-ai", "microservices"] as const;

export function ArchitectureTestSections() {
  return (
    <div>
      {sections.map(([number, title, description], index) => (
        <section
          key={title}
          id={ids[index]}
          className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-center py-20"
        >
          <div className="border-l border-border/70 pl-5 sm:pl-7">
            <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
              Section {number}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl">
              {title}
            </h2>
            <p className="mt-4 font-mono text-sm text-muted">{description}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
