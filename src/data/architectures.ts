import type {
  ArchitectureConnection,
  ArchitectureModel,
  ArchitectureNode,
  ArchitectureState,
} from "@/types/architecture";

const createNode = (
  id: string,
  label: string,
  x: number,
  y: number,
  depth: ArchitectureNode["position"]["depth"] = "mid",
): ArchitectureNode => ({
  id,
  label,
  type: "service",
  position: { x, y, depth },
  status: "healthy",
});

const createLinks = (
  ...pairs: Array<readonly [string, string]>
): ArchitectureConnection[] =>
  pairs.map(([from, to], index) => ({ id: `link-${index + 1}`, from, to }));

const createPacketRoutes = (
  requestRoute: readonly string[],
  responseRoute?: readonly string[],
) => [
  { id: "request", route: requestRoute },
  { id: "response", route: responseRoute ?? [...requestRoute].reverse() },
];

export const architectures: Record<ArchitectureState, ArchitectureModel> = {
  // 1. HERO: Central Gateway Fan-Out / Diamond Topology
  hero: {
    state: "hero",
    nodes: [
      createNode("hero-client", "CLIENT", 740, 90, "far"),
      createNode("hero-gw", "API_GATEWAY", 740, 200, "near"),
      createNode("hero-auth", "AUTH_SERVICE", 570, 340, "far"),
      createNode("hero-proj", "PROJECT_SERVICE", 740, 340, "near"),
      createNode("hero-user", "USER_SERVICE", 910, 340, "mid"),
      createNode("hero-db", "DATABASE", 740, 520, "near"),
    ],
    connections: createLinks(
      ["hero-client", "hero-gw"],
      ["hero-gw", "hero-auth"],
      ["hero-gw", "hero-proj"],
      ["hero-gw", "hero-user"],
      ["hero-auth", "hero-db"],
      ["hero-proj", "hero-db"],
      ["hero-user", "hero-db"],
    ),
    packets: createPacketRoutes(["hero-client", "hero-gw", "hero-proj", "hero-db"]),
  },

  // 2. ABOUT: Stepped Diagonal Waterfall (Upper-Right to Lower-Left)
  about: {
    state: "about",
    nodes: [
      createNode("about-req", "REQUEST", 880, 100, "far"),
      createNode("about-ctrl", "CONTROLLER", 810, 200, "mid"),
      createNode("about-svc", "SERVICE", 740, 305, "near"),
      createNode("about-repo", "REPOSITORY", 670, 410, "mid"),
      createNode("about-db", "DATABASE", 600, 515, "near"),
    ],
    connections: createLinks(
      ["about-req", "about-ctrl"],
      ["about-ctrl", "about-svc"],
      ["about-svc", "about-repo"],
      ["about-repo", "about-db"],
    ),
    packets: createPacketRoutes([
      "about-req",
      "about-ctrl",
      "about-svc",
      "about-repo",
      "about-db",
    ]),
  },

  // 3. ENGINEERING: Hexagonal Parallel Fork-and-Join (Cache vs Auth)
  engineering: {
    state: "engineering",
    nodes: [
      createNode("eng-client", "CLIENT", 740, 85, "far"),
      createNode("eng-rl", "RATE_LIMITER", 740, 180, "near"),
      createNode("eng-cache", "CACHE", 590, 290, "mid"),
      createNode("eng-auth", "AUTH", 890, 290, "near"),
      createNode("eng-svc", "SERVICE", 740, 415, "near"),
      createNode("eng-db", "DATABASE", 740, 545, "near"),
    ],
    connections: createLinks(
      ["eng-client", "eng-rl"],
      ["eng-rl", "eng-cache"],
      ["eng-rl", "eng-auth"],
      ["eng-cache", "eng-svc"],
      ["eng-auth", "eng-svc"],
      ["eng-svc", "eng-db"],
    ),
    packets: createPacketRoutes([
      "eng-client",
      "eng-rl",
      "eng-cache",
      "eng-svc",
      "eng-db",
    ]),
  },

  // 4. LEGAL AI: Dual-Column Pillars (Ingestion Left, RAG Loop Right)
  "legal-ai": {
    state: "legal-ai",
    nodes: [
      createNode("legal-doc", "DOCUMENT", 580, 110, "far"),
      createNode("legal-chunk", "CHUNKING", 580, 225, "mid"),
      createNode("legal-embed", "EMBEDDINGS", 580, 345, "near"),
      createNode("legal-faiss", "FAISS", 580, 470, "near"),
      createNode("legal-retrieval", "RETRIEVAL", 870, 110, "mid"),
      createNode("legal-rag", "RAG", 870, 225, "near"),
      createNode("legal-model", "MODEL", 870, 345, "near"),
      createNode("legal-resp", "RESPONSE", 870, 470, "far"),
    ],
    connections: createLinks(
      ["legal-doc", "legal-chunk"],
      ["legal-chunk", "legal-embed"],
      ["legal-embed", "legal-faiss"],
      ["legal-faiss", "legal-retrieval"],
      ["legal-retrieval", "legal-rag"],
      ["legal-rag", "legal-model"],
      ["legal-model", "legal-resp"],
    ),
    packets: createPacketRoutes([
      "legal-doc",
      "legal-chunk",
      "legal-embed",
      "legal-faiss",
      "legal-retrieval",
      "legal-rag",
      "legal-model",
      "legal-resp",
    ]),
  },

  // 5. RATE LIMITER: Linear Request Flow with a Rejection Branch
  // (matches the actual project: CLIENT → HTTP_FILTER → REQUEST_COUNTER →
  // CONTROLLER → SERVICE; requests over the limit branch to a 429 rejection.
  // No Redis — the project tracks counters in-process.)
  "rate-limiter": {
    state: "rate-limiter",
    nodes: [
      createNode("rl-client", "CLIENT", 740, 85, "far"),
      createNode("rl-filter", "HTTP_FILTER", 740, 190, "near"),
      createNode("rl-counter", "REQUEST_COUNTER", 590, 320, "mid"),
      createNode("rl-reject", "REJECTED_429", 890, 320, "far"),
      createNode("rl-controller", "CONTROLLER", 740, 455, "near"),
      createNode("rl-service", "SERVICE", 740, 570, "near"),
    ],
    connections: createLinks(
      ["rl-client", "rl-filter"],
      ["rl-filter", "rl-counter"],
      ["rl-counter", "rl-controller"],
      ["rl-counter", "rl-reject"],
      ["rl-controller", "rl-service"],
    ),
    packets: createPacketRoutes([
      "rl-client",
      "rl-filter",
      "rl-counter",
      "rl-controller",
      "rl-service",
    ]),
  },

  // 6. MICROSERVICES: Asymmetric Tree Branching & Event Bus
  microservices: {
    state: "microservices",
    nodes: [
      createNode("ms-client", "CLIENT", 580, 110, "far"),
      createNode("ms-gw", "API_GATEWAY", 580, 240, "near"),
      createNode("ms-auth", "AUTH_SERVICE", 860, 130, "mid"),
      createNode("ms-proj", "PROJECT_SERVICE", 860, 240, "near"),
      createNode("ms-issue", "ISSUE_SERVICE", 860, 350, "mid"),
      createNode("ms-notify", "NOTIFICATION_SERVICE", 720, 480, "near"),
    ],
    connections: createLinks(
      ["ms-client", "ms-gw"],
      ["ms-gw", "ms-auth"],
      ["ms-gw", "ms-proj"],
      ["ms-gw", "ms-issue"],
      ["ms-proj", "ms-notify"],
      ["ms-issue", "ms-notify"],
    ),
    packets: createPacketRoutes(
      ["ms-client", "ms-gw", "ms-proj", "ms-notify"],
      ["ms-gw", "ms-auth"],
    ),
  },
};

export const mobilePipelines: Record<
  ArchitectureState,
  { path: string; nodes: [number, number, string][] }
> = {
  hero: {
    path: "M220 90V200L160 310V420",
    nodes: [
      [220, 90, "CLIENT"],
      [220, 200, "API_GATEWAY"],
      [160, 310, "SERVICES"],
      [160, 420, "DATABASE"],
    ],
  },
  about: {
    path: "M220 100L190 200L160 300L130 410",
    nodes: [
      [220, 100, "REQUEST"],
      [190, 200, "CONTROLLER"],
      [160, 300, "SERVICE"],
      [130, 410, "DATABASE"],
    ],
  },
  engineering: {
    path: "M170 90V180L130 280L170 380M170 180L210 280L170 380",
    nodes: [
      [170, 90, "CLIENT"],
      [170, 180, "RATE_LIMITER"],
      [130, 280, "CACHE"],
      [210, 280, "AUTH"],
      [170, 380, "SERVICE"],
    ],
  },
  "legal-ai": {
    path: "M120 120V300H220V120",
    nodes: [
      [120, 120, "DOCUMENT"],
      [120, 300, "FAISS"],
      [220, 300, "MODEL"],
      [220, 120, "RETRIEVAL"],
    ],
  },
  microservices: {
    path: "M120 110V220H220M220 220L170 380",
    nodes: [
      [120, 110, "CLIENT"],
      [120, 220, "GATEWAY"],
      [220, 220, "SERVICES"],
      [170, 380, "NOTIFICATION"],
    ],
  },
  "rate-limiter": {
    path: "M170 90V180L120 290L170 410M170 180L220 290L170 410",
    nodes: [
      [170, 90, "CLIENT"],
      [170, 180, "HTTP_FILTER"],
      [120, 290, "COUNTER"],
      [220, 290, "429"],
      [170, 410, "SERVICE"],
    ],
  },
};

