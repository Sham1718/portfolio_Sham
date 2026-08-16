export interface TechnologyItem {
  name: string;
  role: string;
}

export interface TechCategory {
  id: string;
  category: string;
  tag: string;
  description: string;
  technologies: TechnologyItem[];
}

export interface TechStackData {
  tag: string;
  heading: string;
  paragraph: string;
  systemMeta: {
    stackStatus: string;
    primaryRuntime: string;
    architectureType: string;
  };
  categories: TechCategory[];
}

export const techStackData: TechStackData = {
  tag: "System / 06 — Tech Stack",
  heading: "Tools I use to build the system.",
  paragraph:
    "Technologies are tools. I choose them based on the problem, the system requirements, and the trade-offs involved.",
  systemMeta: {
    stackStatus: "VERIFIED_ACTIVE",
    primaryRuntime: "JAVA / SPRING / PYTHON",
    architectureType: "MODULAR & SERVICE-ORIENTED",
  },
  categories: [
    {
      id: "backend",
      category: "BACKEND",
      tag: "CORE_SYSTEMS",
      description: "Server-side logic, API design, security, and persistence frameworks",
      technologies: [
        { name: "Java", role: "Core backend language" },
        { name: "Spring Boot", role: "Application framework" },
        { name: "Spring Security", role: "Authentication & JWT" },
        { name: "Spring Data JPA", role: "Persistence layer" },
        { name: "Hibernate", role: "ORM & relational mapping" },
        { name: "REST APIs", role: "Service endpoints & contracts" },
      ],
    },
    {
      id: "databases",
      category: "DATABASES",
      tag: "PERSISTENCE",
      description: "Structured storage, caching, and query optimization",
      technologies: [
        { name: "MySQL", role: "Relational persistence" },
        { name: "MongoDB", role: "Document store" },
        { name: "Redis", role: "In-memory caching & state" },
      ],
    },
    {
      id: "ai-ml",
      category: "AI / ML PIPELINES",
      tag: "INTELLIGENCE",
      description: "NLP processing, semantic search, vector indexing, and generative inference",
      technologies: [
        { name: "Python", role: "ML service implementation" },
        { name: "FastAPI", role: "High-performance inference API" },
        { name: "FAISS", role: "Vector similarity search" },
        { name: "RAG", role: "Context retrieval pipeline" },
        { name: "SentenceTransformers", role: "Dense semantic embeddings" },
        { name: "T5", role: "Text-to-text generation" },
        { name: "TextRank", role: "Extractive summarization" },
      ],
    },
    {
      id: "frontend",
      category: "FRONTEND",
      tag: "CLIENT_INTERFACES",
      description: "Interactive user interfaces and client-side rendering",
      technologies: [
        { name: "React", role: "Component UI library" },
        { name: "Next.js", role: "Portfolio & App Router runtime" },
        { name: "Tailwind CSS", role: "Utility styling system" },
      ],
    },
    {
      id: "tools",
      category: "TOOLS / WORKFLOW",
      tag: "TOOLING",
      description: "Version control, containerization, and API development workflow",
      technologies: [
        { name: "Git", role: "Version control" },
        { name: "GitHub", role: "Repository & collaboration" },
        { name: "Docker", role: "Containerized environments" },
        { name: "Postman", role: "API contract testing" },
        { name: "IntelliJ IDEA", role: "Java & Spring development" },
        { name: "VS Code", role: "Frontend & Python workflow" },
      ],
    },
  ],
};
