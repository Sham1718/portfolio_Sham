export type ArchitectureState =
  | "hero"
  | "about"
  | "engineering"
  | "legal-ai"
  | "microservices";

export type ArchitectureNodeType =
  | "client"
  | "gateway"
  | "service"
  | "database"
  | "cache"
  | "external";

export interface ArchitecturePosition {
  x: number;
  y: number;
  depth: "far" | "mid" | "near";
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: ArchitectureNodeType;
  position: ArchitecturePosition;
  status: "healthy" | "idle";
}

export interface ArchitectureConnection {
  id: string;
  from: string;
  to: string;
}

export interface ArchitecturePacket {
  id: string;
  route: readonly string[];
}

export interface ArchitectureModel {
  state: ArchitectureState;
  nodes: readonly ArchitectureNode[];
  connections: readonly ArchitectureConnection[];
  packets: readonly ArchitecturePacket[];
}

export interface ArchitectureScrollUpdate {
  state: ArchitectureState;
  progress: number;
}
