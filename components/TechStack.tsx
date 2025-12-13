"use client";

import { motion } from "framer-motion";

interface Tech {
  name: string;
  icon: string;
}

const technologies: Tech[] = [
  { name: "Next.js", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Framer Motion", icon: "🎭" },
  { name: "Node.js", icon: "🟢" },
  { name: "GraphQL", icon: "🔷" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Docker", icon: "🐋" },
  { name: "AWS", icon: "☁️" },
  { name: "Git", icon: "🔀" },
];

// Duplicate the array for seamless loop
const duplicatedTechnologies = [...technologies, ...technologies];

export default function TechStack() {
  return (
    <section id="tech" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-lg sm:text-xl text-white/60">
            Technologies I work with daily
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        {/* Scrolling marquee */}
        <motion.div
          className="flex gap-8"
          animate={{
            x: [0, -50 * technologies.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedTechnologies.map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm"
            >
              <span className="text-3xl">{tech.icon}</span>
              <span className="text-lg font-semibold text-white whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
