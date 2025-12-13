"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main About Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                I&apos;m a passionate Full Stack Developer with 5+ years of experience building 
                web applications that solve real-world problems. I specialize in creating 
                performant, accessible, and beautifully designed digital experiences using 
                modern technologies.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                My core strengths include <span className="text-blue-400">frontend architecture</span>, 
                {" "}<span className="text-blue-400">API design</span>, and 
                {" "}<span className="text-blue-400">cloud infrastructure</span>. I thrive in 
                collaborative environments where I can contribute to both technical decisions 
                and product strategy.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                What drives me? I love tackling complex problems that require creative solutions, 
                especially those that improve how people interact with technology. When I&apos;m not 
                coding, you&apos;ll find me contributing to open source, writing technical articles, 
                or exploring hiking trails.
              </p>
            </div>
          </motion.div>

          {/* Quick Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                Focus Areas
              </h3>
              <ul className="space-y-2">
                <li className="text-white/80 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  Web Applications
                </li>
                <li className="text-white/80 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full" />
                  SaaS Products
                </li>
                <li className="text-white/80 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Developer Tools
                </li>
                <li className="text-white/80 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full" />
                  API Integration
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold text-blue-400">5+</p>
                  <p className="text-sm text-white/60">Years Exp.</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-400">50+</p>
                  <p className="text-sm text-white/60">Projects</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-400">20+</p>
                  <p className="text-sm text-white/60">Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-400">10k+</p>
                  <p className="text-sm text-white/60">GitHub Stars</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
