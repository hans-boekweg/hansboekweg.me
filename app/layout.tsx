import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Alex Johnson | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, and Node.js. Building scalable web applications and delightful user experiences.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "TypeScript", "Web Developer", "Software Engineer"],
  authors: [{ name: "Alex Johnson" }],
  openGraph: {
    title: "Alex Johnson | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and Node.js. Building scalable web applications and delightful user experiences.",
    type: "website",
  },
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
        <Navbar />
      </body>
    </html>
  );
}
