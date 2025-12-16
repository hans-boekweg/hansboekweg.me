"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  year: string;
  honors: string | null;
  coursework: string | null;
  order: number;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  order: number;
}

interface Achievement {
  id: string;
  text: string;
  order: number;
}

export default function EducationAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<"education" | "certifications" | "achievements">("education");

  // Section settings
  const [sectionTitle, setSectionTitle] = useState("Education & Achievements");
  const [sectionDescription, setSectionDescription] = useState("Academic background and professional certifications");

  // Data
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Edit states
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  // New item forms
  const [newEducation, setNewEducation] = useState({
    degree: "",
    field: "",
    institution: "",
    year: "",
    honors: "",
    coursework: [] as string[],
  });
  const [newCoursework, setNewCoursework] = useState("");

  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    year: "",
  });

  const [newAchievement, setNewAchievement] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const [settingsRes, educationRes, certRes, achieveRes] = await Promise.all([
        fetch("/api/settings"),
        fetch("/api/education"),
        fetch("/api/certifications"),
        fetch("/api/achievements"),
      ]);

      if (settingsRes.ok) {
        const settings = await settingsRes.json();
        setSectionTitle(settings.educationTitle || "Education & Achievements");
        setSectionDescription(settings.educationDescription || "Academic background and professional certifications");
      }

      if (educationRes.ok) {
        const data = await educationRes.json();
        setEducationList(data);
      }

      if (certRes.ok) {
        const data = await certRes.json();
        setCertifications(data);
      }

      if (achieveRes.ok) {
        const data = await achieveRes.json();
        setAchievements(data);
      }
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          educationTitle: sectionTitle,
          educationDescription: sectionDescription,
        }),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      setSuccess("Section settings saved!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  // Education CRUD
  async function addEducation() {
    if (!newEducation.degree || !newEducation.field || !newEducation.institution || !newEducation.year) {
      setError("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newEducation,
          order: educationList.length,
        }),
      });

      if (!res.ok) throw new Error("Failed to add education");
      
      const created = await res.json();
      setEducationList([...educationList, created]);
      setNewEducation({ degree: "", field: "", institution: "", year: "", honors: "", coursework: [] });
      setSuccess("Education added!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to add education");
    } finally {
      setSaving(false);
    }
  }

  async function updateEducation(edu: Education) {
    setSaving(true);
    try {
      const coursework = edu.coursework ? JSON.parse(edu.coursework) : [];
      const res = await fetch(`/api/education/${edu.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          degree: edu.degree,
          field: edu.field,
          institution: edu.institution,
          year: edu.year,
          honors: edu.honors,
          coursework,
          order: edu.order,
        }),
      });

      if (!res.ok) throw new Error("Failed to update education");
      
      const updated = await res.json();
      setEducationList(educationList.map((e) => (e.id === updated.id ? updated : e)));
      setEditingEducation(null);
      setSuccess("Education updated!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update education");
    } finally {
      setSaving(false);
    }
  }

  async function deleteEducation(id: string) {
    if (!confirm("Are you sure you want to delete this education entry?")) return;

    try {
      const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete education");
      
      setEducationList(educationList.filter((e) => e.id !== id));
      setSuccess("Education deleted!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete education");
    }
  }

  // Certification CRUD
  async function addCertification() {
    if (!newCertification.name || !newCertification.issuer || !newCertification.year) {
      setError("Please fill in all fields");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newCertification,
          order: certifications.length,
        }),
      });

      if (!res.ok) throw new Error("Failed to add certification");
      
      const created = await res.json();
      setCertifications([...certifications, created]);
      setNewCertification({ name: "", issuer: "", year: "" });
      setSuccess("Certification added!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to add certification");
    } finally {
      setSaving(false);
    }
  }

  async function updateCertification(cert: Certification) {
    setSaving(true);
    try {
      const res = await fetch(`/api/certifications/${cert.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cert),
      });

      if (!res.ok) throw new Error("Failed to update certification");
      
      const updated = await res.json();
      setCertifications(certifications.map((c) => (c.id === updated.id ? updated : c)));
      setEditingCertification(null);
      setSuccess("Certification updated!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update certification");
    } finally {
      setSaving(false);
    }
  }

  async function deleteCertification(id: string) {
    if (!confirm("Are you sure you want to delete this certification?")) return;

    try {
      const res = await fetch(`/api/certifications/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete certification");
      
      setCertifications(certifications.filter((c) => c.id !== id));
      setSuccess("Certification deleted!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete certification");
    }
  }

  // Achievement CRUD
  async function addAchievement() {
    if (!newAchievement.trim()) {
      setError("Please enter an achievement");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newAchievement,
          order: achievements.length,
        }),
      });

      if (!res.ok) throw new Error("Failed to add achievement");
      
      const created = await res.json();
      setAchievements([...achievements, created]);
      setNewAchievement("");
      setSuccess("Achievement added!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to add achievement");
    } finally {
      setSaving(false);
    }
  }

  async function updateAchievement(achieve: Achievement) {
    setSaving(true);
    try {
      const res = await fetch(`/api/achievements/${achieve.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achieve),
      });

      if (!res.ok) throw new Error("Failed to update achievement");
      
      const updated = await res.json();
      setAchievements(achievements.map((a) => (a.id === updated.id ? updated : a)));
      setEditingAchievement(null);
      setSuccess("Achievement updated!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update achievement");
    } finally {
      setSaving(false);
    }
  }

  async function deleteAchievement(id: string) {
    if (!confirm("Are you sure you want to delete this achievement?")) return;

    try {
      const res = await fetch(`/api/achievements/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete achievement");
      
      setAchievements(achievements.filter((a) => a.id !== id));
      setSuccess("Achievement deleted!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete achievement");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Education Management</h1>
            <p className="text-gray-400 text-sm">Manage your education, certifications, and achievements</p>
          </div>
          <Link
            href="/admin"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
            {success}
          </div>
        )}

        {/* Section Settings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Section Settings</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Section Description</label>
              <input
                type="text"
                value={sectionDescription}
                onChange={(e) => setSectionDescription(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Section Settings"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("education")}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === "education"
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            Education ({educationList.length})
          </button>
          <button
            onClick={() => setActiveTab("certifications")}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === "certifications"
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            Certifications ({certifications.length})
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === "achievements"
                ? "bg-yellow-600 text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            Achievements ({achievements.length})
          </button>
        </div>

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="space-y-6">
            {/* Add New Education */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Add Education</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Degree *</label>
                  <input
                    type="text"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    placeholder="e.g., Master of Business Administration"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Field of Study *</label>
                  <input
                    type="text"
                    value={newEducation.field}
                    onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                    placeholder="e.g., Strategy & Finance"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Institution *</label>
                  <input
                    type="text"
                    value={newEducation.institution}
                    onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                    placeholder="e.g., INSEAD Business School"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year *</label>
                  <input
                    type="text"
                    value={newEducation.year}
                    onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                    placeholder="e.g., 2013"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Honors (optional)</label>
                  <input
                    type="text"
                    value={newEducation.honors}
                    onChange={(e) => setNewEducation({ ...newEducation, honors: e.target.value })}
                    placeholder="e.g., Dean's List • Graduated with Distinction"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Relevant Coursework</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newCoursework}
                      onChange={(e) => setNewCoursework(e.target.value)}
                      placeholder="Add a course"
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newCoursework.trim()) {
                          e.preventDefault();
                          setNewEducation({
                            ...newEducation,
                            coursework: [...newEducation.coursework, newCoursework.trim()],
                          });
                          setNewCoursework("");
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newCoursework.trim()) {
                          setNewEducation({
                            ...newEducation,
                            coursework: [...newEducation.coursework, newCoursework.trim()],
                          });
                          setNewCoursework("");
                        }
                      }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newEducation.coursework.map((course, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2"
                      >
                        {course}
                        <button
                          onClick={() => {
                            setNewEducation({
                              ...newEducation,
                              coursework: newEducation.coursework.filter((_, idx) => idx !== i),
                            });
                          }}
                          className="hover:text-red-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={addEducation}
                disabled={saving}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                {saving ? "Adding..." : "Add Education"}
              </button>
            </div>

            {/* Education List */}
            <div className="space-y-4">
              {educationList.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
                  No education entries yet. Add one above!
                </div>
              ) : (
                educationList.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6"
                  >
                    {editingEducation?.id === edu.id ? (
                      <EducationEditForm
                        education={editingEducation}
                        setEducation={setEditingEducation}
                        onSave={() => updateEducation(editingEducation)}
                        onCancel={() => setEditingEducation(null)}
                        saving={saving}
                      />
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold text-white">
                            {edu.degree} in {edu.field}
                          </h4>
                          <p className="text-white/70">{edu.institution}</p>
                          <p className="text-white/50 text-sm">{edu.year}</p>
                          {edu.honors && <p className="text-green-400 text-sm mt-1">{edu.honors}</p>}
                          {edu.coursework && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {JSON.parse(edu.coursework).map((course: string, i: number) => (
                                <span key={i} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-white/60">
                                  {course}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingEducation(edu)}
                            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteEducation(edu.id)}
                            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === "certifications" && (
          <div className="space-y-6">
            {/* Add New Certification */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Add Certification</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    value={newCertification.name}
                    onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                    placeholder="e.g., Lean Six Sigma Black Belt"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Issuer *</label>
                  <input
                    type="text"
                    value={newCertification.issuer}
                    onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                    placeholder="e.g., ASQ"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year *</label>
                  <input
                    type="text"
                    value={newCertification.year}
                    onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                    placeholder="e.g., 2022"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={addCertification}
                disabled={saving}
                className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                {saving ? "Adding..." : "Add Certification"}
              </button>
            </div>

            {/* Certifications List */}
            <div className="space-y-4">
              {certifications.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
                  No certifications yet. Add one above!
                </div>
              ) : (
                certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center"
                  >
                    {editingCertification?.id === cert.id ? (
                      <div className="flex-1 grid md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          value={editingCertification.name}
                          onChange={(e) => setEditingCertification({ ...editingCertification, name: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                        />
                        <input
                          type="text"
                          value={editingCertification.issuer}
                          onChange={(e) => setEditingCertification({ ...editingCertification, issuer: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingCertification.year}
                            onChange={(e) => setEditingCertification({ ...editingCertification, year: e.target.value })}
                            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                          />
                          <button
                            onClick={() => updateCertification(editingCertification)}
                            disabled={saving}
                            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCertification(null)}
                            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h4 className="font-medium text-white">{cert.name}</h4>
                          <p className="text-white/50 text-sm">{cert.issuer} • {cert.year}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingCertification(cert)}
                            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCertification(cert.id)}
                            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            {/* Add New Achievement */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Add Achievement</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="e.g., Featured in Forbes 30 Under 30 - Business Leaders (2019)"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addAchievement();
                    }
                  }}
                />
                <button
                  onClick={addAchievement}
                  disabled={saving}
                  className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition-colors disabled:opacity-50"
                >
                  {saving ? "Adding..." : "Add"}
                </button>
              </div>
            </div>

            {/* Achievements List */}
            <div className="space-y-4">
              {achievements.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
                  No achievements yet. Add one above!
                </div>
              ) : (
                achievements.map((achieve) => (
                  <div
                    key={achieve.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center"
                  >
                    {editingAchievement?.id === achieve.id ? (
                      <div className="flex-1 flex gap-4">
                        <input
                          type="text"
                          value={editingAchievement.text}
                          onChange={(e) => setEditingAchievement({ ...editingAchievement, text: e.target.value })}
                          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                        />
                        <button
                          onClick={() => updateAchievement(editingAchievement)}
                          disabled={saving}
                          className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingAchievement(null)}
                          className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-white/80">{achieve.text}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingAchievement(achieve)}
                            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteAchievement(achieve.id)}
                            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Education Edit Form Component
function EducationEditForm({
  education,
  setEducation,
  onSave,
  onCancel,
  saving,
}: {
  education: Education;
  setEducation: (edu: Education) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [newCourse, setNewCourse] = useState("");
  const coursework = education.coursework ? JSON.parse(education.coursework) : [];

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Degree</label>
          <input
            type="text"
            value={education.degree}
            onChange={(e) => setEducation({ ...education, degree: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Field of Study</label>
          <input
            type="text"
            value={education.field}
            onChange={(e) => setEducation({ ...education, field: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
          <input
            type="text"
            value={education.institution}
            onChange={(e) => setEducation({ ...education, institution: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
          <input
            type="text"
            value={education.year}
            onChange={(e) => setEducation({ ...education, year: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Honors</label>
          <input
            type="text"
            value={education.honors || ""}
            onChange={(e) => setEducation({ ...education, honors: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Coursework</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              placeholder="Add a course"
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter" && newCourse.trim()) {
                  e.preventDefault();
                  setEducation({
                    ...education,
                    coursework: JSON.stringify([...coursework, newCourse.trim()]),
                  });
                  setNewCourse("");
                }
              }}
            />
            <button
              onClick={() => {
                if (newCourse.trim()) {
                  setEducation({
                    ...education,
                    coursework: JSON.stringify([...coursework, newCourse.trim()]),
                  });
                  setNewCourse("");
                }
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {coursework.map((course: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2"
              >
                {course}
                <button
                  onClick={() => {
                    const updated = coursework.filter((_: string, idx: number) => idx !== i);
                    setEducation({ ...education, coursework: JSON.stringify(updated) });
                  }}
                  className="hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
