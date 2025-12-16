"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SkillCategory {
  id: string;
  title: string;
  color: string;
  skills: string[];
  order: number;
}

const colorOptions = [
  { value: "blue", label: "Blue", bg: "bg-blue-500/20", text: "text-blue-400" },
  { value: "purple", label: "Purple", bg: "bg-purple-500/20", text: "text-purple-400" },
  { value: "green", label: "Green", bg: "bg-green-500/20", text: "text-green-400" },
  { value: "red", label: "Red", bg: "bg-red-500/20", text: "text-red-400" },
  { value: "yellow", label: "Yellow", bg: "bg-yellow-500/20", text: "text-yellow-400" },
  { value: "pink", label: "Pink", bg: "bg-pink-500/20", text: "text-pink-400" },
  { value: "cyan", label: "Cyan", bg: "bg-cyan-500/20", text: "text-cyan-400" },
  { value: "orange", label: "Orange", bg: "bg-orange-500/20", text: "text-orange-400" },
];

export default function SkillsAdminPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Section settings
  const [skillsTitle, setSkillsTitle] = useState("");
  const [skillsDescription, setSkillsDescription] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  
  // Edit modal state
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  
  // Form state for modal
  const [formTitle, setFormTitle] = useState("");
  const [formColor, setFormColor] = useState("blue");
  const [formSkills, setFormSkills] = useState("");
  const [formOrder, setFormOrder] = useState(0);

  useEffect(() => {
    fetchCategories();
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSkillsTitle(data.skillsTitle || "");
        setSkillsDescription(data.skillsDescription || "");
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    }
  }

  async function saveSettings() {
    setSavingSettings(true);
    setError("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillsTitle, skillsDescription }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSuccess("Section settings saved!");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSavingSettings(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/skill-categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to load skill categories:", err);
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setModalMode("add");
    setFormTitle("");
    setFormColor("blue");
    setFormSkills("");
    setFormOrder(categories.length);
    setEditingCategory(null);
    setShowModal(true);
  };

  const openEditModal = (category: SkillCategory) => {
    setModalMode("edit");
    setFormTitle(category.title);
    setFormColor(category.color);
    setFormSkills(category.skills.join("\n"));
    setFormOrder(category.order);
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const skillsArray = formSkills
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const body = {
        title: formTitle,
        color: formColor,
        skills: skillsArray,
        order: formOrder,
      };

      const url = modalMode === "add" 
        ? "/api/skill-categories" 
        : `/api/skill-categories/${editingCategory?.id}`;
      
      const method = modalMode === "add" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to save skill category");
      }

      setSuccess(modalMode === "add" ? "Category added!" : "Category updated!");
      setShowModal(false);
      fetchCategories();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill category?")) {
      return;
    }

    try {
      const res = await fetch(`/api/skill-categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setSuccess("Category deleted!");
      fetchCategories();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const getColorClasses = (color: string) => {
    const option = colorOptions.find((c) => c.value === color);
    return option || colorOptions[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-400 hover:text-white">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">Manage Skills</h1>
            </div>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              + Add Category
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
            {success}
          </div>
        )}

        {/* Section Settings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Section Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={skillsTitle}
                onChange={(e) => setSkillsTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Skills"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Section Description
              </label>
              <input
                type="text"
                value={skillsDescription}
                onChange={(e) => setSkillsDescription(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Technologies and expertise I bring to the table"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={saveSettings}
              disabled={savingSettings}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors"
            >
              {savingSettings ? "Saving..." : "Save Section Settings"}
            </button>
          </div>
        </div>

        {/* Skill Categories */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Skill Categories</h2>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
          >
            + Add Category
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No skill categories yet.</p>
            <button
              onClick={openAddModal}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add Your First Category
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {categories.map((category) => {
              const colorClass = getColorClasses(category.color);
              return (
                <div
                  key={category.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorClass.bg}`}>
                        <span className={colorClass.text}>●</span>
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${colorClass.text}`}>
                          {category.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {category.skills.length} skills • Order: {category.order}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 text-sm rounded-full border ${colorClass.bg} ${colorClass.text} border-current/30`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">
              {modalMode === "add" ? "Add Skill Category" : "Edit Skill Category"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category Title
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Frontend Development"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormColor(color.value)}
                      className={`px-3 py-2 rounded-lg border transition-all ${
                        formColor === color.value
                          ? `${color.bg} ${color.text} border-current`
                          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {color.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skills (one per line)
                </label>
                <textarea
                  rows={8}
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                  placeholder="React&#10;TypeScript&#10;Next.js&#10;Tailwind CSS"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formOrder}
                  onChange={(e) => setFormOrder(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !formTitle}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
