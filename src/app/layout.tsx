import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Camrova - Every Moment Deserves a Lens",
  description:
    "Find talented photographers in Delhi. Or get discovered as one.",
  keywords: [
    "photographer",
    "student photographer",
    "Delhi",
    "portfolio",
    "photography",
    "Camrova",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
