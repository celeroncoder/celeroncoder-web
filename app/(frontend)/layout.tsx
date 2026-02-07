import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import { GeistPixelSquare } from "geist/font/pixel";

export const metadata: Metadata = {
  title: "Khushal Bhardwaj",
  description: "Full-stack Software Engineer",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistPixelSquare.variable}`}>
      <body className="scroll-smooth min-h-screen bg-black">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
