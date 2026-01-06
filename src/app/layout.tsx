import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Primary font for body text - clean and readable
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Monospace font for code snippets
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO metadata for the entire site
export const metadata: Metadata = {
  title: {
    default: "Jordan Hindo | AI Engineer & Founder",
    template: "%s | Jordan Hindo",
  },
  description:
    "Portfolio of Jordan Hindo (zenchantlive) - AI Engineer & Founder building Asset Hatch, Catwalk Live, and more. Ship fast. Learn faster. Document everything.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "Vercel AI SDK",
    "MCP Servers",
  ],
  authors: [{ name: "Jordan Hindo", url: "https://jordanhindo.dev" }],
  creator: "Jordan Hindo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jordanhindo.dev",
    siteName: "Jordan Hindo",
    title: "Jordan Hindo | AI Engineer & Founder",
    description:
      "Portfolio of Jordan Hindo - Building AI-first applications with hybrid architectures.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordan Hindo | AI Engineer & Founder",
    description:
      "Portfolio of Jordan Hindo - Building AI-first applications with hybrid architectures.",
    creator: "@zenchantlive",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root layout component - wraps all pages
 * Provides font variables and base styling
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
