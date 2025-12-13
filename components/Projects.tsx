"use client";

import { motion, Variants } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tags: string[];
  size: "small" | "medium" | "large";
}

const projects: Project[] = [
  {
    title: "AI-Powered Analytics",
    description: "Real-time data visualization platform with machine learning insights",
    tags: ["Next.js", "TypeScript", "TensorFlow"],
    size: "large",
  },
  {
    title: "E-Commerce Platform",
    description: "Modern shopping experience with seamless checkout",
    tags: ["React", "Node.js", "Stripe"],
    size: "medium",
  },
  {
    title: "Mobile App",
    description: "Cross-platform productivity tool",
    tags: ["React Native", "Firebase"],
    size: "small",
  },
  {
    title: "Design System",
    description: "Comprehensive component library and style guide",
    tags: ["Storybook", "Tailwind"],
    size: "small",
  },
  {
    title: "SaaS Dashboard",
    description: "Enterprise-grade admin panel with advanced features",
    tags: ["Vue.js", "PostgreSQL", "Redis"],
    size: "medium",
  },
  {
    title: "Social Network",
    description: "Community platform with real-time messaging",
    tags: ["GraphQL", "WebSocket", "MongoDB"],
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
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base mb-4">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-full text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
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
