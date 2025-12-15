import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Hans Boekweg | Business Strategy & Operations Leader",
  description: "Business Strategy & Operations Leader driving growth through strategic planning, operational excellence, and data-driven decision making.",
  keywords: ["Business Strategy", "Operations Management", "Strategic Planning", "Business Development", "Leadership", "Consulting", "Digital Transformation"],
  authors: [{ name: "Hans Boekweg" }],
  openGraph: {
    title: "Hans Boekweg | Business Strategy & Operations Leader",
    description: "Business Strategy & Operations Leader driving growth through strategic planning, operational excellence, and data-driven decision making.",
    type: "website",
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
