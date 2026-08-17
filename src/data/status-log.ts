export interface StatusLogEntry {
  method: string;
  path: string;
  status: number;
  statusText: string;
  ms: number;
}

/**
 * Fixed, preset "request log" lines for the decorative status strip. Pure
 * data — no randomization, no time-based values — so the first render is
 * deterministic on both server and client. Paths roughly mirror the site's
 * real sections and routes (home "/", the section slugs, and the project
 * pages at /projects/[slug]).
 */
export const statusLog: StatusLogEntry[] = [
  { method: "GET", path: "/", status: 200, statusText: "OK", ms: 14 },
  { method: "GET", path: "/about", status: 200, statusText: "OK", ms: 8 },
  { method: "GET", path: "/engineering", status: 200, statusText: "OK", ms: 12 },
  { method: "GET", path: "/projects", status: 200, statusText: "OK", ms: 21 },
  { method: "GET", path: "/projects/jira", status: 200, statusText: "OK", ms: 18 },
  { method: "GET", path: "/journey", status: 200, statusText: "OK", ms: 7 },
  { method: "GET", path: "/tech-stack", status: 200, statusText: "OK", ms: 11 },
  { method: "GET", path: "/contact", status: 200, statusText: "OK", ms: 6 },
];
