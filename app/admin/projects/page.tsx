import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import ProjectActions from "@/components/admin/ProjectActions";

interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  tags: string;
  size: string;
  featured: boolean;
  order: number;
  demoUrl: string | null;
  githubUrl: string | null;
  createdAt: Date;
}

export default async function ProjectsPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({
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
              <h1 className="text-2xl font-bold text-white">Projects</h1>
              <span className="text-gray-500">({projects.length})</span>
            </div>
            <Link
              href="/admin/projects/new"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              + Add Project
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
              <span className="text-3xl">📁</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No projects yet</h2>
            <p className="text-gray-400 mb-4">Add your first project to showcase your work.</p>
            <Link
              href="/admin/projects/new"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add Project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project: Project) => {
              const tags = JSON.parse(project.tags);
              return (
                <div
                  key={project.id}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        {project.featured && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                        <span className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded-full">
                          {project.size}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{project.role}</p>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-gray-500 text-sm mb-2">Order: {project.order}</p>
                      <ProjectActions id={project.id} />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex gap-4 text-sm">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Demo →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                      >
                        GitHub →
                      </a>
                    )}
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
