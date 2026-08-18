export interface EngineeringPrinciple {
  number: string;
  name: string;
  description: string;
}

export interface EngineeringData {
  tag: string;
  /** Newline-separated lines — rendered as the dominant editorial statement. */
  heading: string;
  paragraph: string;
  principles: EngineeringPrinciple[];
}

export const engineeringData: EngineeringData = {
  tag: "03 / Engineering",
  heading: "Engineering\nis about\nmaking good\ndecisions.",
  paragraph:
    "I focus on keeping systems understandable, APIs predictable, responsibilities clear, and implementation practical.",
  principles: [
    {
      number: "01",
      name: "Simplicity",
      description: "Reduce unnecessary complexity.",
    },
    {
      number: "02",
      name: "Clear Boundaries",
      description: "Keep responsibilities separated and understandable.",
    },
    {
      number: "03",
      name: "Predictable APIs",
      description: "Design explicit contracts between components and services.",
    },
    {
      number: "04",
      name: "Failure Handling",
      description: "Design for errors instead of assuming everything works.",
    },
    {
      number: "05",
      name: "Change",
      description: "Build software that can evolve without becoming fragile.",
    },
  ],
};
