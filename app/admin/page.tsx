import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: Date;
}

export default async function AdminDashboard() {
  const session = await getSession();
  
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch dashboard stats
  const [contactCount, projectCount, experienceCount, unreadCount] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.project.count(),
    prisma.experience.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
  ]);

  // Fetch recent contact submissions
  const recentContacts = await prisma.contactSubmission.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back, {session.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              View Site →
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Messages"
            value={contactCount}
            icon="📬"
            href="/admin/messages"
          />
          <StatCard
            title="Unread Messages"
            value={unreadCount}
            icon="🔔"
            href="/admin/messages?unread=true"
            highlight={unreadCount > 0}
          />
          <StatCard
            title="Projects"
            value={projectCount}
            icon="📁"
            href="/admin/projects"
          />
          <StatCard
            title="Experiences"
            value={experienceCount}
            icon="💼"
            href="/admin/experiences"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Messages */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Recent Messages</h2>
              <Link href="/admin/messages" className="text-blue-400 hover:text-blue-300 text-sm">
                View all →
              </Link>
            </div>
            
            {recentContacts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No messages yet</p>
            ) : (
              <div className="space-y-3">
                {recentContacts.map((contact: ContactMessage) => (
                  <div
                    key={contact.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      contact.read
                        ? "bg-white/5 border-white/10"
                        : "bg-blue-500/10 border-blue-500/20"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-white">{contact.name}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">{contact.email}</p>
                    <p className="text-gray-500 text-sm truncate mt-1">{contact.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <ActionButton href="/admin/projects/new" icon="➕" label="Add Project" />
              <ActionButton href="/admin/experiences/new" icon="➕" label="Add Experience" />
              <ActionButton href="/admin/settings" icon="⚙️" label="Site Settings" />
              <ActionButton href="/admin/analytics" icon="📊" label="Analytics" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  href,
  highlight = false,
}: {
  title: string;
  value: number;
  icon: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`p-6 rounded-2xl border transition-all hover:scale-105 ${
        highlight
          ? "bg-blue-500/10 border-blue-500/30"
          : "bg-white/5 border-white/10 hover:border-white/20"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {highlight && (
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-gray-400 text-sm">{title}</p>
    </Link>
  );
}

function ActionButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-center"
    >
      <span className="text-2xl block mb-2">{icon}</span>
      <span className="text-white text-sm">{label}</span>
    </Link>
  );
}
