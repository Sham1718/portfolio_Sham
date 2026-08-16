export interface EngineeringPrinciple {
  number: string;
  name: string;
  description: string;
}

export interface EngineeringData {
  tag: string;
  heading: string;
  paragraph: string;
  principles: EngineeringPrinciple[];
}

export const engineeringData: EngineeringData = {
  tag: "System / 03 — Engineering",
  heading: "I don't just build APIs.\nI think about the system behind them.",
  paragraph:
    "Good backend systems are more than endpoints and database queries. I focus on clear API contracts, reliable data flow, security, performance, and architecture that remains understandable as a system grows.",
  principles: [
    {
      number: "01",
      name: "API DESIGN",
      description:
        "Clear contracts, predictable behavior and maintainable interfaces.",
    },
    {
      number: "02",
      name: "DATA & DATABASES",
      description:
        "Structured persistence, efficient queries and deliberate data modeling.",
    },
    {
      number: "03",
      name: "SECURITY",
      description:
        "Authentication, authorization and protected resources.",
    },
    {
      number: "04",
      name: "PERFORMANCE",
      description:
        "Caching, rate limiting and efficient request processing.",
    },
    {
      number: "05",
      name: "ARCHITECTURE",
      description:
        "Separation of responsibilities, clear boundaries and maintainable services.",
    },
    {
      number: "06",
      name: "SCALABILITY",
      description:
        "Designing systems that can grow without becoming unnecessarily complex.",
    },
  ],
};
