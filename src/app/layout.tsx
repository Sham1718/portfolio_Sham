import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shyam Bharaskar — Backend Engineer",
  description: "Portfolio of Shyam Bharaskar, a backend engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full overflow-x-hidden">{children}</body>
    </html>
  );
}
