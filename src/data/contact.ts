export interface ContactLink {
  label: string;
  href?: string;
  type: "email" | "github" | "linkedin" | "resume";
  note?: string;
}

export interface ContactData {
  tag: string;
  heading: string;
  paragraph: string;
  links: ContactLink[];
  systemStatus: {
    code: string;
    label: string;
    status: "COMPLETE" | "STABLE" | "CLOSED";
  }[];
  terminalPrompt: string;
}

export const contactData: ContactData = {
  tag: "System / 07 — Contact",
  heading: "LET'S BUILD\nSOMETHING.",
  paragraph:
    "Currently interested in backend and software engineering opportunities.",
  links: [
    {
      label: "GITHUB",
      type: "github",
      href: "https://github.com",
      note: "Code repositories",
    },
    {
      label: "LINKEDIN",
      type: "linkedin",
      href: "https://linkedin.com",
      note: "Professional profile",
    },
    {
      label: "EMAIL",
      type: "email",
      href: "mailto:shyam.bharaskar@example.com",
      note: "Direct communication",
    },
    {
      label: "RESUME",
      type: "resume",
      href: "/resume",
      note: "CV & credentials",
    },
  ],
  systemStatus: [
    { code: "01", label: "REQUEST COMPLETE", status: "COMPLETE" },
    { code: "02", label: "SERVICES STABLE", status: "STABLE" },
    { code: "03", label: "CONNECTIONS CLOSED", status: "CLOSED" },
  ],
  terminalPrompt: "system idle_",
};
