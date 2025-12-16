"use client";

import { motion } from "framer-motion";

interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
  color: string;
  order: number;
}

interface SiteSettings {
  skillsTitle?: string | null;
  skillsDescription?: string | null;
}

interface SkillsProps {
  settings?: SiteSettings | null;
  categories?: SkillCategory[];
}

// Default categories for fallback
const defaultCategories: SkillCategory[] = [
  {
    id: "1",
    title: "Strategic & Business Skills",
    color: "blue",
    order: 0,
    skills: [
      "Strategic Planning",
      "Business Development",
      "Market Analysis",
      "P&L Management",
      "Mergers & Acquisitions",
      "Go-to-Market Strategy",
      "Competitive Intelligence",
      "Risk Management",
      "Stakeholder Management",
      "Board Presentations",
    ],
  },
  {
    id: "2",
    title: "Leadership & Management",
    color: "purple",
    order: 1,
    skills: [
      "Executive Leadership",
      "Team Building",
      "Change Management",
      "Cross-functional Collaboration",
      "Performance Management",
      "Talent Development",
      "Organizational Design",
      "Conflict Resolution",
    ],
  },
  {
    id: "3",
    title: "Operations & Analytics",
    color: "green",
    order: 2,
    skills: [
      "Process Optimization",
      "KPI Development",
      "Financial Modeling",
      "Data-Driven Decision Making",
      "Supply Chain Management",
      "Digital Transformation",
    ],
  },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "blue":
      return "border-blue-500/30 bg-blue-500/10 text-blue-300";
    case "purple":
      return "border-purple-500/30 bg-purple-500/10 text-purple-300";
    case "green":
      return "border-green-500/30 bg-green-500/10 text-green-300";
    case "red":
      return "border-red-500/30 bg-red-500/10 text-red-300";
    case "yellow":
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
    case "pink":
      return "border-pink-500/30 bg-pink-500/10 text-pink-300";
    case "cyan":
      return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
    case "orange":
      return "border-orange-500/30 bg-orange-500/10 text-orange-300";
    default:
      return "border-white/20 bg-white/5 text-white/70";
  }
};

const getHeaderColorClasses = (color: string) => {
  switch (color) {
    case "blue":
      return "text-blue-400";
    case "purple":
      return "text-purple-400";
    case "green":
      return "text-green-400";
    case "red":
      return "text-red-400";
    case "yellow":
      return "text-yellow-400";
    case "pink":
      return "text-pink-400";
    case "cyan":
      return "text-cyan-400";
    case "orange":
      return "text-orange-400";
    default:
      return "text-white";
  }
};

export default function Skills({ settings, categories }: SkillsProps) {
  const skillsTitle = settings?.skillsTitle || "Skills";
  const skillsDescription = settings?.skillsDescription || "Technologies and expertise I bring to the table";
  
  // Use provided categories or fall back to defaults
  const skillCategories = categories && categories.length > 0 ? categories : defaultCategories;
  
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {skillsTitle}
          </h2>
          <p className="text-lg sm:text-xl text-white/60">
            {skillsDescription}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <h3 className={`text-xl font-bold mb-6 ${getHeaderColorClasses(category.color)}`}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    className={`px-3 py-1.5 text-sm border rounded-lg ${getColorClasses(category.color)}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
