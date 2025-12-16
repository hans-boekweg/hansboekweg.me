"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FocusArea {
  text: string;
  color: string;
}

interface Stat {
  value: string;
  label: string;
  color: string;
}

const colorOptions = [
  { value: "blue", label: "Blue", class: "bg-blue-400" },
  { value: "purple", label: "Purple", class: "bg-purple-400" },
  { value: "green", label: "Green", class: "bg-green-400" },
  { value: "orange", label: "Orange", class: "bg-orange-400" },
  { value: "pink", label: "Pink", class: "bg-pink-400" },
  { value: "cyan", label: "Cyan", class: "bg-cyan-400" },
  { value: "red", label: "Red", class: "bg-red-400" },
  { value: "yellow", label: "Yellow", class: "bg-yellow-400" },
];

const defaultFocusAreas: FocusArea[] = [
  { text: "Strategic Planning", color: "blue" },
  { text: "Business Development", color: "purple" },
  { text: "Operations Management", color: "green" },
  { text: "Digital Transformation", color: "orange" },
];

const defaultStats: Stat[] = [
  { value: "10+", label: "Years Exp.", color: "blue" },
  { value: "€50M+", label: "Revenue Impact", color: "purple" },
  { value: "30+", label: "Teams Led", color: "green" },
  { value: "15+", label: "Countries", color: "orange" },
];

export default function AboutAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [aboutTitle, setAboutTitle] = useState("About Me");
  const [aboutText, setAboutText] = useState("");
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>(defaultFocusAreas);
  const [stats, setStats] = useState<Stat[]>(defaultStats);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setAboutTitle(data.aboutTitle || "About Me");
        setAboutText(data.aboutText || "");
        if (data.focusAreas) {
          try {
            setFocusAreas(JSON.parse(data.focusAreas));
          } catch {
            setFocusAreas(defaultFocusAreas);
          }
        }
        if (data.stats) {
          try {
            setStats(JSON.parse(data.stats));
          } catch {
            setStats(defaultStats);
          }
        }
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aboutTitle,
          aboutText,
          focusAreas: JSON.stringify(focusAreas),
          stats: JSON.stringify(stats),
        }),
      });

      if (!res.ok) throw new Error("Failed to save");
      setSuccess("About section saved successfully!");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  // Focus Areas handlers
  const addFocusArea = () => {
    setFocusAreas([...focusAreas, { text: "", color: "blue" }]);
  };

  const updateFocusArea = (index: number, field: keyof FocusArea, value: string) => {
    const updated = [...focusAreas];
    updated[index] = { ...updated[index], [field]: value };
    setFocusAreas(updated);
  };

  const removeFocusArea = (index: number) => {
    setFocusAreas(focusAreas.filter((_, i) => i !== index));
  };

  // Stats handlers
  const addStat = () => {
    setStats([...stats, { value: "", label: "", color: "blue" }]);
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const getColorClass = (color: string) => {
    const option = colorOptions.find((c) => c.value === color);
    return option?.class || "bg-blue-400";
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-400 hover:text-white">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">Manage About Section</h1>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Section Title */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Section Title</h2>
          <input
            type="text"
            value={aboutTitle}
            onChange={(e) => setAboutTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="About Me"
          />
        </div>

        {/* About Text */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">About Me Text</h2>
          <textarea
            rows={10}
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write about yourself... Use blank lines to separate paragraphs."
          />
          <p className="text-gray-500 text-xs mt-2">
            Separate paragraphs with blank lines. Each paragraph will be displayed separately.
          </p>
        </div>

        {/* Focus Areas */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Focus Areas</h2>
            <button
              onClick={addFocusArea}
              className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
            >
              + Add Area
            </button>
          </div>
          <div className="space-y-3">
            {focusAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getColorClass(area.color)}`} />
                <input
                  type="text"
                  value={area.text}
                  onChange={(e) => updateFocusArea(index, "text", e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Focus area..."
                />
                <select
                  value={area.color}
                  onChange={(e) => updateFocusArea(index, "color", e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {colorOptions.map((color) => (
                    <option key={color.value} value={color.value} className="bg-gray-800">
                      {color.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeFocusArea(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Quick Stats</h2>
            <button
              onClick={addStat}
              className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
            >
              + Add Stat
            </button>
          </div>
          <div className="space-y-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                  className="w-24 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-bold"
                  placeholder="10+"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Years Experience"
                />
                <select
                  value={stat.color}
                  onChange={(e) => updateStat(index, "color", e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {colorOptions.map((color) => (
                    <option key={color.value} value={color.value} className="bg-gray-800">
                      {color.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeStat(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Stats are displayed in a 2x2 grid. Values can include symbols like +, €, % etc.
          </p>
        </div>

        {/* Save Button (bottom) */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors font-medium"
          >
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </main>
    </div>
  );
}
