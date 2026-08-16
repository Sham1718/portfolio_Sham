export interface AboutData {
  tag: string;
  heading: string;
  paragraphs: string[];
  capabilities: {
    name: string;
    description: string;
  }[];
  education: {
    degree: string;
    field: string;
  };
  metadata: {
    key: string;
    value: string;
    highlight?: boolean;
  }[];
}

export const aboutData: AboutData = {
  tag: "System / 02 — About",
  heading: "I build backend systems with structure and purpose.",
  paragraphs: [
    "I am a Computer Engineering student focused on backend development and building practical software systems. My primary direction centers on Java and Spring Boot, alongside hands-on experience in REST APIs, relational databases, secure authentication, microservices architecture, Python, and AI/RAG workflows.",
    "I focus on understanding how distributed systems operate internally—designing applications that are structurally clean, maintainable, resilient, and built to scale.",
  ],
  capabilities: [
    {
      name: "BACKEND DEVELOPMENT",
      description: "Java, Spring Boot, architecture patterns & server-side logic",
    },
    {
      name: "API DESIGN & INTEGRATION",
      description: "RESTful endpoints, request lifecycle, validation & serialization",
    },
    {
      name: "DATABASE SYSTEMS",
      description: "Relational schema design, queries, transactions & indexing",
    },
    {
      name: "AUTHENTICATION & SECURITY",
      description: "JWT, role-based access control, encryption & session safety",
    },
    {
      name: "MICROSERVICES & ARCHITECTURE",
      description: "Modular services, gateways, event flows & decoupled design",
    },
    {
      name: "AI & RAG PIPELINES",
      description: "Document chunking, vector embeddings, FAISS & model integration",
    },
  ],
  education: {
    degree: "B.Tech",
    field: "Computer Engineering",
  },
  metadata: [
    { key: "PROFILE_STATUS", value: "ACTIVE", highlight: true },
    { key: "FOCUS", value: "BACKEND ENGINEERING" },
    { key: "PRIMARY_STACK", value: "JAVA / SPRING BOOT" },
    { key: "DOMAIN", value: "APIs / DBs / SYSTEM DESIGN" },
  ],
};
