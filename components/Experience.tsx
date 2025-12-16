"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  companyUrl?: string | null;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

interface SiteSettings {
  experienceTitle?: string | null;
  experienceDescription?: string | null;
}

interface ExperienceProps {
  experiences: ExperienceItem[];
  settings?: SiteSettings | null;
}

export default function Experience({ experiences, settings }: ExperienceProps) {
  const experienceTitle = settings?.experienceTitle || "Experience";
  const experienceDescription = settings?.experienceDescription || "My professional journey and key achievements";
  
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {experienceTitle}
          </h2>
          <p className="text-lg sm:text-xl text-white/60">
            {experienceDescription}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 w-3 h-3 -translate-x-1/2 bg-blue-500 rounded-full border-4 border-[#0a0a0a]" />

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:border-blue-500/30 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {exp.title}
                      </h3>
                      <p className="text-blue-400 font-medium">
                        {exp.companyUrl ? (
                          <a 
                            href={exp.companyUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                        <span className="text-white/40 mx-2">•</span>
                        <span className="text-white/60">{exp.location}</span>
                      </p>
                    </div>
                    <span className="text-white/50 text-sm mt-2 md:mt-0 px-3 py-1 bg-white/5 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-white/70 mb-4">{exp.description}</p>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-3 text-white/60">
                        <svg 
                          className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
