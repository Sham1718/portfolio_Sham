import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ScrollProgressRail } from "@/components/navigation/ScrollProgressRail";
import { CommandPalette } from "@/components/palette/CommandPalette";

export const metadata: Metadata = {
  title: "Shyam Bharaskar — Backend Engineer",
  description: "Portfolio of Shyam Bharaskar, a backend engineer.",
};

/*
 * Real webfonts via next/font/google (self-hosted at build time, no external
 * requests). JetBrains Mono backs every font-mono utility across the site
 * (labels, terminal content, badges, nav); Instrument Sans replaces the
 * never-loaded Inter as the default sans for body + headings. The variables
 * are exposed as --font-mono / --font-sans and remapped in @theme inline so
 * Tailwind's font-mono / font-sans utilities resolve to them automatically.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`antialiased ${jetbrainsMono.variable} ${instrumentSans.variable}`}
    >
      <body className="min-h-screen [overflow-x:clip]">
        {/* Site-wide client chrome — mounted directly in the root layout so
            it exists on EVERY route (the home page's ScrollArchitecture
            Controller only renders on "/"). All three portal/fixed
            elements to document.body, so they stay viewport-pinned. */}
        <CustomCursor />
        <ScrollProgressRail />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
