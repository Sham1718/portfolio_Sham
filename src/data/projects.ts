export interface ProjectArchitectureNode {
  label: string;
  children?: ProjectArchitectureNode[];
}

export interface ProjectArchitectureStep {
  label: string;
  note?: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  problem: string;
  approach: string;
  implementation: string[];
  decisions: string[];
  challenges: string[];
  result: string;
  github?: string;
  demo?: string;
  architectureFlow: ProjectArchitectureStep[];
}

export const projectsData: ProjectData[] = [
  {
    id: "jira",
    slug: "jira",
    number: "01",
    title: "Jira-like Issue Management",
    shortDescription:
      "A microservices-based issue and project management platform with authentication, project tracking, issue management, comments and notifications.",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "MySQL",
      "React",
      "Microservices",
    ],
    problem:
      "Team-based software projects need structured ways to create projects, assign issues, track progress, and send notifications. Monolithic architectures make these concerns hard to evolve independently.",
    approach:
      "Decomposed the system into independent microservices — each owning a specific domain. An API Gateway routes requests after JWT authentication; individual services handle their own data stores and communicate through defined contracts.",
    implementation: [
      "API Gateway authenticates each request via JWT before routing to the appropriate microservice.",
      "Auth Service issues and validates tokens and manages user credentials.",
      "Project Service handles project creation, membership and role management.",
      "Issue Service manages issue lifecycle: creation, assignment, status and comments.",
      "Notification Service delivers updates triggered by issue and project events.",
    ],
    decisions: [
      "Microservices over monolith: each service can be developed, deployed and scaled independently.",
      "JWT for stateless authentication: no server-side session storage, compatible with distributed services.",
      "MySQL per service: each service owns its own schema, avoiding cross-service data coupling.",
    ],
    challenges: [
      "Coordinating authentication across services without duplicating security logic.",
      "Maintaining consistent data references across independently deployed services.",
      "Managing the additional operational complexity of running multiple services during development.",
    ],
    result:
      "A functional microservices platform implementing the core workflows of a project management tool: user registration, project creation, issue tracking, and notifications.",
    architectureFlow: [
      { label: "CLIENT" },
      { label: "API_GATEWAY", note: "Auth, routing" },
      { label: "AUTH_SERVICE", note: "JWT validation" },
      { label: "PROJECT_SERVICE", note: "Projects & roles" },
      { label: "ISSUE_SERVICE", note: "Issues & comments" },
      { label: "NOTIFICATION_SERVICE", note: "Event delivery" },
    ],
  },
  {
    id: "rate-limiter",
    slug: "rate-limiter",
    number: "02",
    title: "Rate Limiter",
    shortDescription:
      "A backend rate-limiting middleware system designed to control API traffic and protect services from excessive or abusive request patterns.",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "HTTP Filters",
      "REST API",
    ],
    problem:
      "APIs exposed to external clients need protection from excessive request volumes that can degrade service quality or represent abuse. Without rate limiting, a single client can overwhelm backend resources.",
    approach:
      "Implemented a request-counting filter that intercepts incoming HTTP requests, identifies the client, tracks request counts within a defined time window, and rejects requests exceeding the configured limit with a 429 response.",
    implementation: [
      "A Spring MVC filter intercepts all incoming requests before they reach controllers.",
      "Each client is identified by IP address or API key extracted from the request.",
      "Request counts are tracked per client within a rolling time window.",
      "Requests exceeding the configured limit receive HTTP 429 Too Many Requests responses.",
      "Rate limit state resets after the time window expires.",
    ],
    decisions: [
      "In-process tracking: suitable for single-instance deployments and straightforward to implement without external dependencies.",
      "Filter-based interception: rate limiting applied uniformly before any business logic executes.",
      "Configurable limits and window: thresholds can be adjusted without code changes.",
    ],
    challenges: [
      "Ensuring the counter and window logic handles edge cases at window boundaries accurately.",
      "Designing the response to be informative — returning appropriate headers indicating limit and reset time.",
    ],
    result:
      "A working rate-limiting filter integrated into a Spring Boot application, demonstrating how traffic control can be applied at the middleware layer to protect API endpoints.",
    architectureFlow: [
      { label: "CLIENT" },
      { label: "HTTP_FILTER", note: "Rate check" },
      { label: "REQUEST_COUNTER", note: "Per-client tracking" },
      { label: "CONTROLLER", note: "Business logic" },
      { label: "SERVICE" },
    ],
  },
  {
    id: "legal-ai",
    slug: "legal-ai",
    number: "03",
    title: "Legal Document Intelligence",
    shortDescription:
      "A legal document analysis system combining extractive summarization, vector embeddings, FAISS retrieval and RAG-based question answering over legal text.",
    technologies: [
      "Spring Boot",
      "FastAPI",
      "Python",
      "T5",
      "TextRank",
      "SentenceTransformers",
      "FAISS",
      "RAG",
      "React",
    ],
    problem:
      "Legal documents are long, dense and difficult to navigate. Practitioners need both concise summaries and the ability to ask specific questions without reading the entire document. Standard keyword search cannot reason over legal language.",
    approach:
      "Built a two-capability system: (1) extractive summarization using TextRank and abstractive refinement via T5, and (2) a RAG pipeline that embeds document chunks with SentenceTransformers, indexes them in FAISS for fast retrieval, and feeds retrieved context to a language model to answer questions.",
    implementation: [
      "Documents are uploaded through the Spring Boot API layer, which coordinates between the frontend and the Python backend.",
      "FastAPI exposes the summarization and question-answering endpoints.",
      "The document is chunked and each chunk is embedded into dense vectors using SentenceTransformers.",
      "FAISS indexes the embeddings for fast nearest-neighbor retrieval.",
      "On a user query, the most relevant chunks are retrieved and passed with the query to the T5 model via a RAG prompt.",
      "The model generates a grounded answer based on the retrieved legal context.",
    ],
    decisions: [
      "Dual summarization (TextRank + T5): extractive summarization preserves important sentences; T5 produces a more fluent abstract.",
      "FAISS for retrieval: efficient dense vector search without requiring a hosted vector database.",
      "Spring Boot as the integration layer: separates API coordination from the Python ML stack, keeping the two concerns decoupled.",
    ],
    challenges: [
      "Legal language is highly domain-specific; generic models can produce confident but imprecise answers that require careful evaluation.",
      "Chunk size tuning significantly affects retrieval quality — too small loses context, too large reduces precision.",
      "Latency from embedding and retrieval must be managed to keep the user experience acceptable.",
    ],
    result:
      "A working system that accepts legal documents, produces structured summaries, and answers specific questions grounded in the document content using a FAISS-backed RAG pipeline.",
    architectureFlow: [
      { label: "DOCUMENT", note: "Upload" },
      { label: "CHUNKING", note: "Text segmentation" },
      { label: "EMBEDDINGS", note: "SentenceTransformers" },
      { label: "FAISS", note: "Vector index" },
      { label: "RETRIEVAL", note: "Nearest neighbours" },
      { label: "RAG", note: "Context assembly" },
      { label: "MODEL", note: "T5 generation" },
      { label: "RESPONSE", note: "Answer" },
    ],
  },
];
