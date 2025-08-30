// ...existing code...
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, UploadCloud, Trash2, X, Plus } from "lucide-react";

type FacultyMember = {
  id: string;
  name: string;
  imageUrl?: string | null;
  designation: string;
  status: "EXISTING" | "FORMER";
  createdAt?: string;
};

function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button
      {...props}
      className={`transition focus:outline-none focus:ring-2 focus:ring-[#a50303] font-medium ${className}`}
    >
      {children}
    </button>
  );
}

export default function FacultyMembersAdminPage() {
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(false);

  // filter state added
  const [statusFilter, setStatusFilter] = useState<"ALL" | "EXISTING" | "FORMER">("ALL");

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    status: "EXISTING",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      const res = await fetch("/api/admin/faculty-members");
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  // filtered view computed client-side
  const filteredMembers = members.filter((m) =>
    statusFilter === "ALL" ? true : m.status === statusFilter
  );

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    let imageUrl = "";
    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      const up = await fetch("/api/upload", { method: "POST", body: fd });
      const upData = await up.json();
      imageUrl =
        upData?.data?.secure_url || upData?.data?.url || upData?.data?.secureUrl || "";
    }

    try {
      const res = await fetch("/api/admin/faculty-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          designation: form.designation,
          status: form.status,
          imageUrl,
        }),
      });
      if (res.ok) {
        await fetchMembers();
        setShowModal(false);
        setForm({ name: "", designation: "", status: "EXISTING" });
        setImageFile(null);
      } else {
        console.error("Create failed", await res.text());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this faculty member?")) return;
    setLoading(true);
    try {
      await fetch("/api/admin/faculty-members", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await fetchMembers();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f8fa] px-4 py-1">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#a50303] flex items-center gap-2">
              <ImagePlus className="w-8 h-8" /> Faculty Members
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Manage faculty members — add profile image, designation and status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] shadow text-white px-5 py-2 flex items-center gap-2"
              onClick={() => setShowModal(true)}
              aria-label="Create Faculty Member"
            >
              <Plus className="w-4 h-4" /> Create New
            </Button>
          </div>
        </header>

      <section className="bg-white rounded-xl border border-[#eaeaea] p-4 shadow">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-4 py-3">SL No</th>
                  <th className="px-4 py-3">Photo</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Designation</th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span>Status</span>
                      <select
                        value={statusFilter}
                        onChange={(e) =>
                          setStatusFilter(e.target.value as "ALL" | "EXISTING" | "FORMER")
                        }
                        className="ml-2 rounded border border-[#eaeaea] px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#a50303]"
                        aria-label="Filter by status"
                      >
                        <option value="ALL">All</option>
                        <option value="EXISTING">Existing</option>
                        <option value="FORMER">Former</option>
                      </select>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      {members.length === 0
                        ? "No faculty members yet."
                        : `No faculty members for "${statusFilter === "ALL" ? "All" : statusFilter}"`}
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((m, index) => (
                    <tr key={m.id} className="border-t border-[#f0f0f0]">
                      <td className="px-4 py-3 align-middle">
                        {/* compute serial relative to filtered list */}
                        {index + 1}
                      </td>

                      <td className="px-4 py-3 align-middle">
                        <div className="w-14 h-14 rounded overflow-hidden border border-[#eaeaea] bg-[#f8f8fa]">
                          {m.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#a50303]">
                              <ImagePlus className="w-6 h-6 opacity-40" />
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3 align-middle">
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-gray-500">Added {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "—"}</div>
                      </td>

                      <td className="px-4 py-3 align-middle">{m.designation}</td>

                      <td className="px-4 py-3 align-middle">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${m.status === "EXISTING" ? "bg-[#f8eaea] text-[#a50303]" : "bg-gray-100 text-gray-700"}`}>
                          {m.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 align-middle text-right">
                        <div className="inline-flex items-center gap-2">
                          <Button
                            className="rounded-full border border-[#a50303] text-[#a50303] p-2 hover:bg-[#f8eaea]"
                            onClick={() => {
                              setForm({ name: m.name, designation: m.designation, status: m.status });
                              setImageFile(null);
                              setShowModal(true);
                            }}
                            aria-label="Edit (prefill) member"
                          >
                            Edit
                          </Button>

                          <Button
                            className="rounded-full border border-[#a50303] text-[#a50303] p-2 hover:bg-[#f8eaea]"
                            onClick={() => handleDelete(m.id)}
                            aria-label="Delete member"
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </motion.div>

      {/* Create / Prefill Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl border border-[#eaeaea] p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#a50303] flex items-center gap-2">
                  <ImagePlus className="w-5 h-5" /> Create Faculty Member
                </h2>
                <button
                  aria-label="Close"
                  className="rounded-full p-2 hover:bg-[#f8eaea]"
                  onClick={() => setShowModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="flex flex-col gap-3" onSubmit={handleCreate}>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                />

                <label className="text-sm font-medium text-gray-700">Designation</label>
                <input
                  type="text"
                  value={form.designation}
                  onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
                  className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                />

                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as any }))}
                  className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                >
                  <option value="EXISTING">EXISTING</option>
                  <option value="FORMER">FORMER</option>
                </select>

                <label className="text-sm font-medium text-gray-700">Profile Image</label>
                <div className="flex items-center gap-3">
                  <div
                    className="w-full border-2 border-dashed border-[#a50303]/40 rounded-lg p-3 flex items-center gap-3 bg-[#f8eaea] cursor-pointer"
                    onClick={() => document.getElementById("faculty-image-input")?.click()}
                  >
                    <UploadCloud className="w-5 h-5 text-[#a50303]" />
                    <div className="text-sm text-[#a50303]">
                      {imageFile ? imageFile.name : "Click to upload image"}
                    </div>
                    <input
                      id="faculty-image-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  {imageFile && (
                    <div className="w-16 h-16 rounded overflow-hidden border border-[#eaeaea]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={URL.createObjectURL(imageFile)} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 mt-2">
                  <Button
                    type="button"
                    className="rounded-full border border-[#a50303] text-[#a50303] px-4 py-2"
                    onClick={() => {
                      setShowModal(false);
                      setForm({ name: "", designation: "", status: "EXISTING" });
                      setImageFile(null);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] text-white px-4 py-2 flex items-center gap-2"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                 {uploading ? "Creating..." : "Create"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}