import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import MessageActions from "@/components/admin/MessageActions";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: Date;
}

export default async function MessagesPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/admin/login");
  }

  const messages = await prisma.contactSubmission.findMany({
    where: { archived: false },
    orderBy: { createdAt: "desc" },
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
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <span className="text-gray-500">({messages.length})</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
              <span className="text-3xl">📭</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No messages yet</h2>
            <p className="text-gray-400">When visitors submit the contact form, messages will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message: ContactMessage) => (
              <div
                key={message.id}
                className={`p-6 rounded-2xl border transition-colors ${
                  message.read
                    ? "bg-white/5 border-white/10"
                    : "bg-blue-500/10 border-blue-500/20"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                      {!message.read && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-blue-400 text-sm">{message.email}</p>
                    {message.subject && (
                      <p className="text-gray-400 text-sm mt-1">Subject: {message.subject}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">
                      {new Date(message.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <MessageActions id={message.id} read={message.read} />
                  </div>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
                <div className="mt-4 pt-4 border-t border-white/10 flex gap-4">
                  <a
                    href={`mailto:${message.email}?subject=Re: ${message.subject || "Your message"}`}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Reply via Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
