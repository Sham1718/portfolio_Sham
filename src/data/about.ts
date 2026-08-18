export interface AboutData {
  tag: string;
  heading: string;
  paragraph: string;
  education: {
    degree: string;
    field: string;
  };
  /** Optional compact academic-result line rendered under the education row. */
  academics?: string;
  /** Decorative technical trace items, rendered as JAVA → SPRING BOOT → … */
  trace: string[];
}

export const aboutData: AboutData = {
  tag: "02 / About",
  heading: "I build backend systems with structure and purpose.",
  paragraph:
    "I'm a Computer Engineering graduate focused on backend development, building APIs and systems with Java, Spring Boot, databases and practical software architecture.",
  education: {
    degree: "B.Tech",
    field: "Computer Engineering",
  },
  academics: "CGPA 8.17 / 10 · First Class with Distinction",
  trace: ["Java", "Spring Boot", "APIs", "Databases", "System Design"],
};
