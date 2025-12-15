"use client";

import { motion, Variants } from "framer-motion";

interface Project {
  title: string;
  description: string;
  role: string;
  challenges: string;
  tags: string[];
  size: "small" | "medium" | "large";
  demoUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "Digital Transformation Initiative",
    description: "Led end-to-end digital transformation for a €500M manufacturing company, modernizing operations across 12 facilities",
    role: "Program Director",
    challenges: "Achieved €15M annual savings and 40% productivity improvement within 18 months.",
    tags: ["Change Management", "Digital Strategy", "Process Optimization", "ERP Implementation"],
    size: "large",
  },
  {
    title: "Market Expansion Strategy",
    description: "Developed and executed market entry strategy for Nordic expansion of fintech platform",
    role: "Strategy Lead",
    challenges: "Captured 12% market share in first year, generating €8M new revenue.",
    tags: ["Market Analysis", "Go-to-Market", "Partnership Development"],
    size: "medium",
    demoUrl: "https://example.com/case-study",
  },
  {
    title: "Post-Merger Integration",
    description: "Managed integration of €75M acquisition, aligning operations and culture",
    role: "Integration Lead",
    challenges: "Retained 95% of key talent and achieved synergy targets 6 months early.",
    tags: ["M&A", "Change Management", "Team Building"],
    size: "small",
  },
  {
    title: "Operational Excellence Program",
    description: "Implemented lean methodology across supply chain operations",
    role: "Program Manager",
    challenges: "Reduced lead times by 35% and inventory costs by €4M.",
    tags: ["Lean Six Sigma", "Supply Chain", "KPI Development"],
    size: "small",
  },
  {
    title: "Strategic Partnership Platform",
    description: "Built B2B partnership ecosystem connecting 200+ enterprise vendors with SMB clients",
    role: "Business Owner",
    challenges: "Generated €20M GMV in first year with 85% partner retention rate.",
    tags: ["Business Development", "Platform Strategy", "Vendor Management", "Revenue Growth"],
    size: "medium",
    demoUrl: "https://example.com/platform",
  },
  {
    title: "Corporate Innovation Lab",
    description: "Established innovation hub to drive new product development and startup partnerships",
    role: "Founding Director",
    challenges: "Launched 5 new product lines and 3 successful startup investments.",
    tags: ["Innovation Strategy", "Venture Building", "R&D Management", "Startup Ecosystem"],
    size: "large",
  },
];

const getSizeClass = (size: string): string => {
  switch (size) {
    case "large":
      return "md:col-span-2 md:row-span-2";
    case "medium":
      return "md:col-span-2";
    default:
      return "md:col-span-1";
  }
};

export default function Projects() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-white/60">
            A collection of my recent work and experiments
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className={`
                ${getSizeClass(project.size)}
                relative group overflow-hidden rounded-2xl 
                bg-gradient-to-br from-white/5 to-white/[0.02]
                border border-white/10
                backdrop-blur-sm
                cursor-pointer
                hover:border-blue-500/50
                transition-all duration-300
              `}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                      {project.role}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm sm:text-base mb-2">
                    {project.description}
                  </p>
                  <p className="text-green-400/80 text-xs sm:text-sm mb-4">
                    {project.challenges}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-full text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/60 hover:text-white flex items-center gap-1 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/60 hover:text-white flex items-center gap-1 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
