"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface MessageActionsProps {
  id: string;
  read: boolean;
}

export default function MessageActions({ id, read }: MessageActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const markAsRead = async () => {
    setLoading(true);
    await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    router.refresh();
    setLoading(false);
  };

  const archive = async () => {
    setLoading(true);
    await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: true }),
    });
    router.refresh();
    setLoading(false);
  };

  const deleteMessage = async () => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setLoading(true);
    await fetch(`/api/contact/${id}`, {
      method: "DELETE",
    });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex gap-2 mt-2">
      {!read && (
        <button
          onClick={markAsRead}
          disabled={loading}
          className="text-xs text-gray-400 hover:text-white disabled:opacity-50"
        >
          Mark as read
        </button>
      )}
      <button
        onClick={archive}
        disabled={loading}
        className="text-xs text-gray-400 hover:text-white disabled:opacity-50"
      >
        Archive
      </button>
      <button
        onClick={deleteMessage}
        disabled={loading}
        className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
