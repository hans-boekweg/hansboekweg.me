import prisma from "@/lib/prisma";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

// Revalidate every 60 seconds to pick up admin changes
export const revalidate = 60;

async function getSiteData() {
  const [settings, projects, experiences, skillCategories, education, certifications, achievements] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "main" } }),
    prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
    }),
    prisma.experience.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.education.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.certification.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.achievement.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return {
    settings,
    projects: projects.map((p) => ({
      ...p,
      tags: JSON.parse(p.tags) as string[],
    })),
    experiences: experiences.map((e) => ({
      ...e,
      achievements: JSON.parse(e.achievements) as string[],
    })),
    skillCategories: skillCategories.map((c) => ({
      ...c,
      skills: JSON.parse(c.skills) as string[],
    })),
    education: education.map((e) => ({
      ...e,
      coursework: e.coursework ? JSON.parse(e.coursework) as string[] : undefined,
    })),
    certifications,
    achievements,
  };
}

export default async function Home() {
  const { settings, projects, experiences, skillCategories, education, certifications, achievements } = await getSiteData();

  return (
    <main className="min-h-screen">
      <Hero settings={settings} />
      <About settings={settings} />
      <Skills settings={settings} categories={skillCategories} />
      <Experience experiences={experiences} settings={settings} />
      <Projects projects={projects} settings={settings} />
      <Education 
        settings={settings} 
        education={education}
        certifications={certifications}
        achievements={achievements}
      />
      <Contact settings={settings} />
    </main>
  );
}
