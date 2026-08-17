import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiGithub,
  SiHibernate,
  SiIntellijidea,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiOpenjdk,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiSpringsecurity,
  SiTailwindcss,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export interface TechIconEntry {
  /** Icon component, or null when the technology has no verified icon. */
  icon: IconType | null;
  /** Short badge label used when `icon` is null. */
  badge?: string;
}

/**
 * Maps every technology name in data/tech-stack.ts to a verified
 * react-icons export. Entries without a real icon (icon: null) render as a
 * monospace abbreviation badge in the orbit instead.
 */
export const techIcons: Record<string, TechIconEntry> = {
  Java: { icon: SiOpenjdk },
  "Spring Boot": { icon: SiSpringboot },
  "Spring Security": { icon: SiSpringsecurity },
  "Spring Data JPA": { icon: SiHibernate },
  Hibernate: { icon: SiHibernate },
  "REST APIs": { icon: null, badge: "REST" },
  MySQL: { icon: SiMysql },
  MongoDB: { icon: SiMongodb },
  Redis: { icon: SiRedis },
  Python: { icon: SiPython },
  FastAPI: { icon: SiFastapi },
  FAISS: { icon: null, badge: "FAISS" },
  RAG: { icon: null, badge: "RAG" },
  SentenceTransformers: { icon: null, badge: "SBERT" },
  T5: { icon: null, badge: "T5" },
  TextRank: { icon: null, badge: "TextRank" },
  React: { icon: SiReact },
  "Next.js": { icon: SiNextdotjs },
  "Tailwind CSS": { icon: SiTailwindcss },
  Git: { icon: SiGit },
  GitHub: { icon: SiGithub },
  Docker: { icon: SiDocker },
  Postman: { icon: SiPostman },
  "IntelliJ IDEA": { icon: SiIntellijidea },
  "VS Code": { icon: VscVscode },
};
