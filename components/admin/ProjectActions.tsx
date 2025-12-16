"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectActionsProps {
  id: string;
}

export default function ProjectActions({ id }: ProjectActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);
    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(`/admin/projects/${id}/edit`)}
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
