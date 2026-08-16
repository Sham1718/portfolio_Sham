import type { ArchitectureModel } from "@/types/architecture";

export const heroArchitecture: ArchitectureModel = {
  state: "hero",
  nodes: [
    {
      id: "client",
      label: "CLIENT",
      type: "client",
      position: { x: 1050, y: 105, depth: "far" },
      status: "healthy",
    },
    {
      id: "gateway",
      label: "API_GATEWAY",
      type: "gateway",
      position: { x: 920, y: 245, depth: "mid" },
      status: "healthy",
    },
    {
      id: "auth",
      label: "AUTH_SERVICE",
      type: "service",
      position: { x: 155, y: 545, depth: "far" },
      status: "healthy",
    },
    {
      id: "project",
      label: "PROJECT_SERVICE",
      type: "service",
      position: { x: 980, y: 470, depth: "near" },
      status: "healthy",
    },
    {
      id: "user",
      label: "USER_SERVICE",
      type: "service",
      position: { x: 720, y: 635, depth: "mid" },
      status: "idle",
    },
    {
      id: "database",
      label: "DATABASE",
      type: "database",
      position: { x: 1040, y: 660, depth: "near" },
      status: "healthy",
    },
  ],
  connections: [
    { id: "client-gateway", from: "client", to: "gateway" },
    { id: "gateway-auth", from: "gateway", to: "auth" },
    { id: "gateway-project", from: "gateway", to: "project" },
    { id: "gateway-user", from: "gateway", to: "user" },
    { id: "auth-database", from: "auth", to: "database" },
    { id: "project-database", from: "project", to: "database" },
    { id: "user-database", from: "user", to: "database" },
  ],
  packets: [
    {
      id: "request",
      route: ["client", "gateway", "project", "database"],
    },
    {
      id: "response",
      route: ["database", "project", "gateway", "client"],
    },
  ],
};
