"use client";

import { memo } from "react";
import { motion, Variants } from "framer-motion";

interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroLocation?: string | null;
  resumeUrl?: string | null;
  github?: string | null;
}

interface HeroProps {
  settings: SiteSettings | null;
}

// Memoize variants outside component to prevent recreation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function Hero({ settings }: HeroProps) {
  const title = settings?.heroTitle || "Hans Boekweg";
  const subtitle = settings?.heroSubtitle || "Business Strategy & Operations Leader";
  const description = settings?.heroDescription || "Driving business growth through strategic planning, operational excellence, and data-driven decision making.";
  const location = settings?.heroLocation || "Netherlands • Open to Global Opportunities";

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" data-animate>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full text-center"
      >
        {/* Name */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-blue-400 font-medium mb-4"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4"
        >
          {title}
        </motion.h1>

        {/* Role */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {subtitle}
          </span>
        </motion.h2>
        
        {/* Value Proposition */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-white/70 mb-4 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        {/* Location */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-white/50 mb-8 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="/resume.pdf"
            download
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Résumé
          </a>
          <a
            href="#projects"
            className="px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-full font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-full font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(Hero);
