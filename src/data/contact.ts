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
    status: "READY" | "STABLE" | "OPEN";
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
      href: "https://github.com/Sham1718",
      note: "Code repositories",
    },
    {
      label: "LINKEDIN",
      type: "linkedin",
      href: "https://www.linkedin.com/in/shyambharaskar",
      note: "Professional profile",
    },
    {
      label: "EMAIL",
      type: "email",
      href: "mailto:sbharaskar8485@gmail.com",
      note: "Direct communication",
    },
    {
      label: "RESUME",
      type: "resume",
      href: "/resume/Shyam-Bharaskar.pdf",
      note: "CV & credentials",
    },
  ],
  systemStatus: [
    { code: "01", label: "REQUEST READY", status: "READY" },
    { code: "02", label: "SERVICES STABLE", status: "STABLE" },
    { code: "03", label: "CONNECTION OPEN", status: "OPEN" },
  ],
  terminalPrompt: "system idle_",
};
