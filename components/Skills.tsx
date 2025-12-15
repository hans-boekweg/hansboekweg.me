"use client";

import { motion } from "framer-motion";

interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Strategic & Business Skills",
    color: "blue",
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
    title: "Leadership & Management",
    color: "purple",
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
    title: "Operations & Analytics",
    color: "green",
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
    default:
      return "text-white";
  }
};

export default function Skills() {
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
            Skills
          </h2>
          <p className="text-lg sm:text-xl text-white/60">
            Technologies and expertise I bring to the table
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
