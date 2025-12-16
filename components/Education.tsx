"use client";

import { motion } from "framer-motion";

interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  year: string;
  honors?: string | null;
  coursework?: string[];
}

interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface AchievementItem {
  id: string;
  text: string;
}

interface SiteSettings {
  educationTitle?: string | null;
  educationDescription?: string | null;
}

interface EducationProps {
  settings?: SiteSettings | null;
  education?: EducationItem[];
  certifications?: CertificationItem[];
  achievements?: AchievementItem[];
}

const defaultEducation: EducationItem[] = [
  {
    id: "default-1",
    degree: "Master of Business Administration",
    field: "Strategy & Finance",
    institution: "INSEAD Business School",
    year: "2013",
    honors: "Dean's List • Graduated with Distinction",
    coursework: [
      "Corporate Strategy",
      "Financial Management",
      "Organizational Behavior",
      "International Business",
    ],
  },
];

const defaultCertifications: CertificationItem[] = [
  {
    id: "cert-1",
    name: "Lean Six Sigma Black Belt",
    issuer: "ASQ",
    year: "2022",
  },
  {
    id: "cert-2",
    name: "Project Management Professional (PMP)",
    issuer: "Project Management Institute",
    year: "2020",
  },
  {
    id: "cert-3",
    name: "Certified M&A Professional",
    issuer: "Mergers & Acquisitions Council",
    year: "2019",
  },
];

const defaultAchievements: AchievementItem[] = [
  { id: "ach-1", text: "Featured in Forbes 30 Under 30 - Business Leaders (2019)" },
  { id: "ach-2", text: "Keynote Speaker at European Business Summit 2023" },
  { id: "ach-3", text: "Board Advisor to 3 high-growth technology startups" },
  { id: "ach-4", text: "Published thought leadership in Harvard Business Review" },
];

export default function Education({ settings, education, certifications, achievements }: EducationProps) {
  const educationTitle = settings?.educationTitle || "Education & Achievements";
  const educationDescription = settings?.educationDescription || "Academic background and professional certifications";
  
  const educationList = education && education.length > 0 ? education : defaultEducation;
  const certificationList = certifications && certifications.length > 0 ? certifications : defaultCertifications;
  const achievementList = achievements && achievements.length > 0 ? achievements : defaultAchievements;
  
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {educationTitle}
          </h2>
          <p className="text-lg sm:text-xl text-white/60">
            {educationDescription}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-400">Education</h3>
            </div>

            {educationList.map((edu) => (
              <div key={edu.id} className="space-y-2">
                <h4 className="text-lg font-semibold text-white">
                  {edu.degree} in {edu.field}
                </h4>
                <p className="text-white/70">{edu.institution}</p>
                <p className="text-white/50 text-sm">{edu.year}</p>
                {edu.honors && (
                  <p className="text-green-400 text-sm">{edu.honors}</p>
                )}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mt-4">
                    <p className="text-white/50 text-sm mb-2">Relevant Coursework:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-white/60"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-purple-400">Certifications</h3>
            </div>

            <ul className="space-y-4">
              {certificationList.map((cert) => (
                <li key={cert.id} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-white font-medium">{cert.name}</p>
                    <p className="text-white/50 text-sm">{cert.issuer} • {cert.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-yellow-400">Achievements</h3>
            </div>

            <ul className="space-y-4">
              {achievementList.map((achievement) => (
                <li key={achievement.id} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-white/70 text-sm">{achievement.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
