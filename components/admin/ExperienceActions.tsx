"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ExperienceActionsProps {
  id: string;
}

export default function ExperienceActions({ id }: ExperienceActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    setLoading(true);
    await fetch(`/api/experiences/${id}`, {
      method: "DELETE",
    });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(`/admin/experiences/${id}/edit`)}
        disabled={loading}
        className="text-sm text-blue-400 hover:text-blue-300 disabled:opacity-50"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
