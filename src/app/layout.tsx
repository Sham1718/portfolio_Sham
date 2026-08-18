import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ScrollProgressRail } from "@/components/navigation/ScrollProgressRail";
import { CommandPalette } from "@/components/palette/CommandPalette";

export const metadata: Metadata = {
  title: "Shyam Bharaskar — Backend Engineer",
  description: "Portfolio of Shyam Bharaskar, a backend engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
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
