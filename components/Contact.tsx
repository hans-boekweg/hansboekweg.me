"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full text-center"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Let&apos;s Build Something
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Amazing Together
          </span>
        </h2>
        
        <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-2xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            href="mailto:hello@example.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
          >
            Send an Email
          </motion.a>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-full font-semibold backdrop-blur-sm transition-all duration-300"
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-full font-semibold backdrop-blur-sm transition-all duration-300"
          >
            LinkedIn
          </motion.a>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm">
            © 2024 Nexus Portfolio. Built with Next.js 15, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
