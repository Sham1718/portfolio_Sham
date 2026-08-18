export interface JourneyEducation {
  label: string;
  title: string;
  degree: string;
  /** Compact verified academic-result line (rendered under the degree). */
  academics?: string;
}

export interface JourneyInternship {
  label: string;
  title: string;
  /** One-line verified description. */
  description: string;
  /** Verified company name, if known. */
  company?: string;
  /** Verified period, e.g. "Jun 2024 – Aug 2024", if known. */
  period?: string;
}

export interface JourneyCurrent {
  label: string;
  title: string;
  stack: string[];
}

export interface JourneyData {
  tag: string;
  heading: string;
  paragraph: string;
  education: JourneyEducation;
  /**
   * No verified internship details exist in the repository — intentionally
   * left null so the timeline renders only verified stops. Fill this in
   * (role / company / one line / period) once real details are available.
   */
  internship: JourneyInternship | null;
  current: JourneyCurrent;
}

export const journeyData: JourneyData = {
  tag: "05 / Journey",
  heading: "WHERE IT STARTED.",
  paragraph:
    "It started with Computer Engineering — the foundation everything else is built on.",
  education: {
    label: "Education",
    title: "Computer Engineering",
    degree: "B.Tech / Computer Engineering",
    academics: "CGPA 8.17 / 10 · First Class with Distinction",
  },
  internship: null,
  current: {
    label: "Currently",
    title: "Backend Engineering",
    stack: ["Java", "Spring Boot", "APIs", "Databases", "System Design"],
  },
};
