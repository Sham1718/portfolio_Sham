import type {
  ArchitectureConnection,
  ArchitectureModel,
  ArchitectureNode,
  ArchitectureState,
} from "@/types/architecture";

const node = (
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

const links = (...pairs: Array<readonly [string, string]>): ArchitectureConnection[] =>
  pairs.map(([from, to], index) => ({ id: `link-${index + 1}`, from, to }));

const packetRoutes = (route: readonly string[]) => [
  { id: "request", route },
  { id: "response", route: [...route].reverse() },
];

export const architectures: Record<ArchitectureState, ArchitectureModel> = {
  hero: {
    state: "hero",
    nodes: [
      node("node-1", "CLIENT", 1050, 105, "far"),
      node("node-2", "API_GATEWAY", 920, 245),
      node("node-3", "AUTH_SERVICE", 155, 545, "far"),
      node("node-4", "PROJECT_SERVICE", 980, 470, "near"),
      node("node-5", "USER_SERVICE", 720, 635),
      node("node-6", "DATABASE", 1040, 660, "near"),
    ],
    connections: links(
      ["node-1", "node-2"],
      ["node-2", "node-3"],
      ["node-2", "node-4"],
      ["node-2", "node-5"],
      ["node-3", "node-6"],
      ["node-4", "node-6"],
      ["node-5", "node-6"],
    ),
    packets: packetRoutes(["node-1", "node-2", "node-4", "node-6"]),
  },
  about: {
    state: "about",
    nodes: [
      node("node-1", "REQUEST", 920, 115, "far"),
      node("node-2", "CONTROLLER", 860, 235),
      node("node-3", "SERVICE", 800, 355),
      node("node-4", "REPOSITORY", 740, 475, "near"),
      node("node-5", "DATABASE", 680, 595, "near"),
      node("node-6", "RESPONSE", 1010, 500, "far"),
    ],
    connections: links(
      ["node-1", "node-2"],
      ["node-2", "node-3"],
      ["node-3", "node-4"],
      ["node-4", "node-5"],
      ["node-3", "node-6"],
    ),
    packets: packetRoutes(["node-1", "node-2", "node-3", "node-4", "node-5"]),
  },
  engineering: {
    state: "engineering",
    nodes: [
      node("node-1", "CLIENT", 980, 100, "far"),
      node("node-2", "RATE_LIMITER", 900, 220),
      node("node-3", "CACHE", 820, 340),
      node("node-4", "AUTH", 740, 460, "near"),
      node("node-5", "SERVICE", 660, 580, "near"),
      node("node-6", "DATABASE", 580, 690, "mid"),
    ],
    connections: links(
      ["node-1", "node-2"],
      ["node-2", "node-3"],
      ["node-3", "node-4"],
      ["node-4", "node-5"],
      ["node-5", "node-6"],
    ),
    packets: packetRoutes(["node-1", "node-2", "node-3", "node-4", "node-5", "node-6"]),
  },
  "legal-ai": {
    state: "legal-ai",
    nodes: [
      node("node-1", "DOCUMENT", 1020, 110, "far"),
      node("node-2", "CHUNKING", 920, 225),
      node("node-3", "EMBEDDINGS", 820, 340),
      node("node-4", "FAISS", 720, 455, "near"),
      node("node-5", "RAG", 620, 570, "near"),
      node("node-6", "MODEL", 520, 675, "mid"),
    ],
    connections: links(
      ["node-1", "node-2"],
      ["node-2", "node-3"],
      ["node-3", "node-4"],
      ["node-4", "node-5"],
      ["node-5", "node-6"],
    ),
    packets: packetRoutes(["node-1", "node-2", "node-3", "node-4", "node-5", "node-6"]),
  },
  microservices: {
    state: "microservices",
    nodes: [
      node("node-1", "CLIENT", 1000, 105, "far"),
      node("node-2", "API_GATEWAY", 920, 230),
      node("node-3", "AUTH_SERVICE", 650, 390),
      node("node-4", "PROJECT_SERVICE", 930, 430, "near"),
      node("node-5", "ISSUE_SERVICE", 1110, 555, "mid"),
      node("node-6", "NOTIFICATION_SERVICE", 770, 650, "near"),
    ],
    connections: links(
      ["node-1", "node-2"],
      ["node-2", "node-3"],
      ["node-2", "node-4"],
      ["node-2", "node-5"],
      ["node-2", "node-6"],
      ["node-4", "node-5"],
    ),
    packets: packetRoutes(["node-1", "node-2", "node-4", "node-5"]),
  },
};

export const heroArchitecture = architectures.hero;
