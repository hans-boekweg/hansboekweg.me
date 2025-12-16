"use client";

import { motion } from "framer-motion";

interface FocusArea {
  text: string;
  color: string;
}

interface Stat {
  value: string;
  label: string;
  color: string;
}

interface SiteSettings {
  aboutText?: string | null;
  aboutTitle?: string | null;
  focusAreas?: string | null;
  stats?: string | null;
}

interface AboutProps {
  settings: SiteSettings | null;
}

export default function About({ settings }: AboutProps) {
  // Default about text if none provided
  const defaultAboutText = `I'm a results-driven business leader with extensive experience in strategic planning, operations management, and driving organizational growth. I excel at translating complex business challenges into actionable strategies that deliver measurable outcomes.

My core strengths include strategic planning, business development, and operational excellence. I thrive in dynamic environments where I can lead cross-functional teams and drive transformative initiatives.

What drives me? I'm passionate about building high-performing teams, optimizing business processes, and creating sustainable competitive advantages. Outside of work, I enjoy staying current with industry trends and mentoring emerging leaders.`;

  const defaultFocusAreas: FocusArea[] = [
    { text: "Strategic Planning", color: "blue" },
    { text: "Business Development", color: "purple" },
    { text: "Operations Management", color: "green" },
    { text: "Digital Transformation", color: "orange" },
  ];

  const defaultStats: Stat[] = [
    { value: "10+", label: "Years Exp.", color: "blue" },
    { value: "€50M+", label: "Revenue Impact", color: "purple" },
    { value: "30+", label: "Teams Led", color: "green" },
    { value: "15+", label: "Countries", color: "orange" },
  ];

  const aboutText = settings?.aboutText || defaultAboutText;
  const aboutTitle = settings?.aboutTitle || "About Me";
  const paragraphs = aboutText.split('\n\n').filter(Boolean);
  
  // Parse focus areas and stats from JSON
  const focusAreas: FocusArea[] = settings?.focusAreas 
    ? JSON.parse(settings.focusAreas) 
    : defaultFocusAreas;
  
  const stats: Stat[] = settings?.stats 
    ? JSON.parse(settings.stats) 
    : defaultStats;

  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-400", text: "text-blue-400" },
    purple: { bg: "bg-purple-400", text: "text-purple-400" },
    green: { bg: "bg-green-400", text: "text-green-400" },
    orange: { bg: "bg-orange-400", text: "text-orange-400" },
    red: { bg: "bg-red-400", text: "text-red-400" },
    yellow: { bg: "bg-yellow-400", text: "text-yellow-400" },
    pink: { bg: "bg-pink-400", text: "text-pink-400" },
    cyan: { bg: "bg-cyan-400", text: "text-cyan-400" },
  };

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
            {aboutTitle}
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
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={`text-lg text-white/80 leading-relaxed ${index < paragraphs.length - 1 ? 'mb-6' : ''}`}>
                  {paragraph}
                </p>
              ))}
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
                {focusAreas.map((area, index) => (
                  <li key={index} className="text-white/80 flex items-center gap-2">
                    <span className={`w-2 h-2 ${colorClasses[area.color]?.bg || "bg-blue-400"} rounded-full`} />
                    {area.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <p className={`text-3xl font-bold ${colorClasses[stat.color]?.text || "text-blue-400"}`}>{stat.value}</p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
