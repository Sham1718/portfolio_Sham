import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shyam Bharaskar — Backend Engineer",
  description: "Portfolio of Shyam Bharaskar, a backend engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen [overflow-x:clip]">{children}</body>
    </html>
  );
}
