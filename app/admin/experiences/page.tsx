import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import ExperienceActions from "@/components/admin/ExperienceActions";

interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl: string | null;
  location: string;
  period: string;
  description: string;
  achievements: string;
  order: number;
  createdAt: Date;
}

export default async function ExperiencesPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/admin/login");
  }

  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-400 hover:text-white">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">Experience</h1>
              <span className="text-gray-500">({experiences.length})</span>
            </div>
            <Link
              href="/admin/experiences/new"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              + Add Experience
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {experiences.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
              <span className="text-3xl">💼</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No experience entries yet</h2>
            <p className="text-gray-400 mb-4">Add your work experience to showcase your career.</p>
            <Link
              href="/admin/experiences/new"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add Experience
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp: Experience) => {
              const achievements = JSON.parse(exp.achievements);
              return (
                <div
                  key={exp.id}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                        <span className="text-gray-500">•</span>
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <span className="text-gray-400">{exp.company}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span>{exp.location}</span>
                        <span>•</span>
                        <span>{exp.period}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{exp.description}</p>
                      {achievements.length > 0 && (
                        <ul className="space-y-1">
                          {achievements.slice(0, 3).map((a: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-500 flex items-start gap-2">
                              <span className="text-blue-400">•</span>
                              <span className="line-clamp-1">{a}</span>
                            </li>
                          ))}
                          {achievements.length > 3 && (
                            <li className="text-sm text-gray-600">
                              +{achievements.length - 3} more achievements
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-gray-500 text-sm mb-2">Order: {exp.order}</p>
                      <ExperienceActions id={exp.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
