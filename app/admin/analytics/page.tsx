import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

interface AnalyticsEntry {
  id: string;
  page: string;
  event: string;
  data: string | null;
  ip: string | null;
  userAgent: string | null;
  createdAt: Date;
}

export default async function AnalyticsPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/admin/login");
  }

  // Get analytics data
  const [totalViews, recentEvents, pageViews] = await Promise.all([
    prisma.analytics.count(),
    prisma.analytics.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
    }),
    prisma.analytics.groupBy({
      by: ["page"],
      _count: { page: true },
      orderBy: { _count: { page: "desc" } },
    }),
  ]);

  // Get unique visitors (by IP)
  const uniqueIPs = await prisma.analytics.findMany({
    distinct: ["ip"],
    select: { ip: true },
    where: { ip: { not: null } },
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-white">Analytics</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Total Page Views</p>
            <p className="text-4xl font-bold text-white">{totalViews}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Unique Visitors</p>
            <p className="text-4xl font-bold text-white">{uniqueIPs.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Pages Tracked</p>
            <p className="text-4xl font-bold text-white">{pageViews.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Page Views by Page */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Top Pages</h2>
            {pageViews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No analytics data yet</p>
            ) : (
              <div className="space-y-3">
                {pageViews.map((pv: { page: string; _count: { page: number } }) => (
                  <div
                    key={pv.page}
                    className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                  >
                    <span className="text-white font-medium">{pv.page}</span>
                    <span className="text-gray-400">{pv._count.page} views</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Events */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Events</h2>
            {recentEvents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No events recorded yet</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {recentEvents.map((event: AnalyticsEntry) => (
                  <div
                    key={event.id}
                    className="p-3 bg-white/5 rounded-lg text-sm"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-white font-medium">{event.event}</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(event.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-400">{event.page}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-blue-400 text-sm">
            <strong>Note:</strong> To start collecting analytics, add the analytics tracking to your pages.
            This is a basic analytics system - for production, consider using a service like Plausible or Umami.
          </p>
        </div>
      </main>
    </div>
  );
}
