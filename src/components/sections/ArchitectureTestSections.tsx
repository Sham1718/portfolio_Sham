import { ArchitectureScene } from "@/components/background/ArchitectureScene";
import { architectures } from "@/data/architectures";
import type { ArchitectureState } from "@/types/architecture";

const sections: {
  number: string;
  title: string;
  description: string;
  id: string;
  state: ArchitectureState;
}[] = [
  {
    number: "04",
    title: "LEGAL AI",
    description: "Document ingestion, embeddings, FAISS & RAG model pipeline",
    id: "legal-ai",
    state: "legal-ai",
  },
  {
    number: "05",
    title: "MICROSERVICES",
    description: "API Gateway, domain services & notification broker",
    id: "microservices",
    state: "microservices",
  },
];

export function ArchitectureTestSections() {
  return (
    <div>
      {sections.map(({ number, title, description, id, state }) => (
        <section
          key={id}
          id={id}
          className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-center py-20"
        >
          <ArchitectureScene architecture={architectures[state]} />
          <div className="relative z-10 border-l border-border/70 pl-5 sm:pl-7">
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
