import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Hans Boekweg | Business Strategy & Operations Leader",
  description: "Business Strategy & Operations Leader driving growth through strategic planning, operational excellence, and data-driven decision making.",
  keywords: ["Business Strategy", "Operations Management", "Strategic Planning", "Business Development", "Leadership", "Consulting", "Digital Transformation"],
  authors: [{ name: "Hans Boekweg" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Hans Boekweg | Business Strategy & Operations Leader",
    description: "Business Strategy & Operations Leader driving growth through strategic planning, operational excellence, and data-driven decision making.",
    type: "website",
    locale: "en_US",
    siteName: "Hans Boekweg Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hans Boekweg | Business Strategy & Operations Leader",
    description: "Business Strategy & Operations Leader driving growth through strategic planning, operational excellence, and data-driven decision making.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Navbar />
      </body>
    </html>
  );
}
