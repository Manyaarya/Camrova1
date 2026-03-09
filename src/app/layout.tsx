import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Camrova - Book a Lens. Build a Brand.",
  description:
    "Delhi's photographers on demand. By the hour. Book verified photographers for reels, portraits and brand shoots. Starting ₹1000. No agencies. No minimums.",
  keywords: [
    "photographer",
    "Delhi",
    "content creator",
    "reels",
    "portraits",
    "brand shoots",
    "Camrova",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-background text-foreground font-body">
        {children}
      </body>
    </html>
  );
}
