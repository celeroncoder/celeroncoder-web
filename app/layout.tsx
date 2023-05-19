import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "celeroncoder",
  description: "Khushal Bhardwaj's Personal Portfolio",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={inter.style}
        className="p-4 dark select-none min-h-screen bg-background font-sans antialiased flex items-center flex-col w-full"
      >
        {children}
      </body>
    </html>
  );
}
