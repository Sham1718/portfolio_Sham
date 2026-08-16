export interface Role {
  company: string;
  title: string;
  period: string;
  description?: string;
}

export interface Project {
  name: string;
  summary: string;
  technologies: readonly string[];
  href?: string;
}

export interface Skill {
  name: string;
  category?: string;
}
