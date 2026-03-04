import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Camrova - Every Moment Deserves a Lens",
  description:
    "Find affordable student photographers in Delhi. Or get discovered as one.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
