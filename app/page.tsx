import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Lazy load below-the-fold components for better initial load
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Education = dynamic(() => import("@/components/Education"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="min-h-[400px]" />,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}
