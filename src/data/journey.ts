export interface JourneyMilestone {
  id: string;
  step: string;
  title: string;
  phase: string;
  status: "COMPLETED" | "ACTIVE" | "UPCOMING";
  summary: string;
  details?: string;
  tags: string[];
}

export interface JourneyData {
  tag: string;
  heading: string;
  paragraph: string;
  systemMeta: {
    logStatus: string;
    currentFocus: string;
    trajectory: string;
  };
  milestones: JourneyMilestone[];
}

export const journeyData: JourneyData = {
  tag: "System / 05 — Journey",
  heading: "Built one system at a time.",
  paragraph:
    "From learning the fundamentals to building backend systems, my path has been driven by turning concepts into working software.",
  systemMeta: {
    logStatus: "ACTIVE_TRACE",
    currentFocus: "BACKEND & DISTRIBUTED SYSTEMS",
    trajectory: "SOFTWARE ENGINEERING",
  },
  milestones: [
    {
      id: "comp-eng",
      step: "01",
      title: "COMPUTER ENGINEERING",
      phase: "ACADEMIC FOUNDATION",
      status: "COMPLETED",
      summary:
        "Started with the core principles of computer science, algorithmic thinking, and computational foundations.",
      details: "B.Tech in Computer Engineering curriculum covering core CS disciplines.",
      tags: ["CS FUNDAMENTALS", "ALGORITHMS", "SYSTEM ARCHITECTURE"],
    },
    {
      id: "foundations",
      step: "02",
      title: "CORE FOUNDATIONS",
      phase: "SYSTEM FUNDAMENTALS",
      status: "COMPLETED",
      summary:
        "Deep dive into object-oriented programming, relational databases, data structures, and computer networking protocols.",
      details:
        "Mastered object-oriented design patterns, database normalization, relational querying, and networking fundamentals.",
      tags: ["JAVA", "OOP", "DBMS", "NETWORKS", "DATA STRUCTURES"],
    },
    {
      id: "projects",
      step: "03",
      title: "BUILDING PROJECTS",
      phase: "PRACTICAL IMPLEMENTATION",
      status: "COMPLETED",
      summary:
        "Turned theoretical concepts into functioning full-stack and backend applications with structured API layers.",
      details:
        "Engineered RESTful services and interactive client interfaces backed by relational data persistence.",
      tags: ["SPRING BOOT", "REST APIs", "MYSQL", "REACT"],
    },
    {
      id: "real-world",
      step: "04",
      title: "REAL-WORLD DEVELOPMENT",
      phase: "ENGINEERING PRACTICES",
      status: "COMPLETED",
      summary:
        "Transitioned from academic exercises to production-oriented engineering: version control, modular code, and clean architecture.",
      details:
        "Adopted industry practices including Git workflows, clean separation of concerns, and defensive API validation.",
      tags: ["CLEAN CODE", "MODULAR ARCHITECTURE", "GIT", "API CONTRACTS"],
    },
    {
      id: "fyp",
      step: "05",
      title: "FINAL YEAR PROJECT",
      phase: "AI & RAG PIPELINES",
      status: "COMPLETED",
      summary:
        "Built Legal Document Intelligence — combining NLP summarization, dense vector embeddings, FAISS indexing, and RAG question answering.",
      details:
        "Integrated Python/FastAPI ML services with Spring Boot API gateways for domain-specific document processing.",
      tags: ["RAG PIPELINE", "FAISS", "T5 MODEL", "FASTAPI", "SPRING BOOT"],
    },
    {
      id: "backend-eng",
      step: "06",
      title: "BACKEND ENGINEERING",
      phase: "CURRENT FOCUS",
      status: "ACTIVE",
      summary:
        "Specializing in Java and Spring Boot ecosystems, robust authentication, database optimization, and microservice decoupling.",
      details:
        "Designing scalable backend architectures with stateless security, efficient data flows, and service modularity.",
      tags: [
        "JAVA",
        "SPRING BOOT",
        "JWT SECURITY",
        "MICROSERVICES",
        "SYSTEM DESIGN",
      ],
    },
    {
      id: "next",
      step: "07",
      title: "NEXT HORIZON",
      phase: "FORWARD TRAJECTORY",
      status: "UPCOMING",
      summary:
        "Continuing to build distributed systems, deepen system design expertise, and advance toward impactful backend engineering roles.",
      details:
        "Scaling architectural breadth, exploring event-driven architectures, and shipping resilient backend infrastructure.",
      tags: ["DISTRIBUTED SYSTEMS", "SCALABILITY", "BACKEND ROLES"],
    },
  ],
};
