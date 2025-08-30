"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, UploadCloud, Trash2, X, Plus, Edit } from "lucide-react";

type NewspaperClipping = {
  id: string;
  title: string;
  imageUrl: string;
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

export default function NewspaperClippingsAdminPage() {
  const [clippings, setClippings] = useState<NewspaperClipping[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingClipping, setEditingClipping] = useState<NewspaperClipping | null>(null);
  const [form, setForm] = useState({
    title: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchClippings();
  }, []);

  async function fetchClippings() {
    try {
      const res = await fetch("/api/newspapper");
      const data = await res.json();
      setClippings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreateOrUpdate(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    let imageUrl = editingClipping?.imageUrl || "";
    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      const up = await fetch("/api/upload", { method: "POST", body: fd });
      const upData = await up.json();
      imageUrl = upData?.data?.secure_url || upData?.data?.url || upData?.data?.secureUrl || "";
    }

    try {
      const method = editingClipping ? "PUT" : "POST";
      const body = editingClipping
        ? { id: editingClipping.id, title: form.title, imageUrl }
        : { title: form.title, imageUrl };

      const res = await fetch("/api/newspapper", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        await fetchClippings();
        setShowModal(false);
        setEditingClipping(null);
        setForm({ title: "" });
        setImageFile(null);
      } else {
        console.error("Failed", await res.text());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this clipping?")) return;
    setLoading(true);
    try {
      await fetch("/api/newspapper", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await fetchClippings();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function openModal(clipping?: NewspaperClipping) {
    if (clipping) {
      setEditingClipping(clipping);
      setForm({ title: clipping.title });
      setImageFile(null);
    } else {
      setEditingClipping(null);
      setForm({ title: "" });
      setImageFile(null);
    }
    setShowModal(true);
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
              <ImagePlus className="w-8 h-8" /> Newspaper Clippings
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Manage newspaper clippings — upload images and titles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] shadow text-white px-5 py-2 flex items-center gap-2"
              onClick={() => openModal()}
              aria-label="Create Newspaper Clipping"
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
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clippings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                      No clippings yet.
                    </td>
                  </tr>
                ) : (
                  clippings.map((clipping, index) => (
                    <tr key={clipping.id} className="border-t border-[#f0f0f0]">
                      <td className="px-4 py-3 align-middle">{index + 1}</td>

                      <td className="px-4 py-3 align-middle">
                        <div className="font-medium">{clipping.title}</div>
                        <div className="text-xs text-gray-500">
                          Added {clipping.createdAt ? new Date(clipping.createdAt).toLocaleDateString() : "—"}
                        </div>
                      </td>

                      <td className="px-4 py-3 align-middle">
                        <div className="w-20 h-20 rounded overflow-hidden border border-[#eaeaea] bg-[#f8f8fa]">
                          <img
                            src={clipping.imageUrl}
                            alt={clipping.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      <td className="px-4 py-3 align-middle text-right">
                        <div className="inline-flex items-center gap-2">
                          <Button
                            className="rounded-full border border-[#a50303] text-[#a50303] p-2 hover:bg-[#f8eaea]"
                            onClick={() => openModal(clipping)}
                            aria-label="Edit clipping"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          <Button
                            className="rounded-full border border-[#a50303] text-[#a50303] p-2 hover:bg-[#f8eaea]"
                            onClick={() => handleDelete(clipping.id)}
                            aria-label="Delete clipping"
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

      {/* Create / Edit Modal */}
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
                  <ImagePlus className="w-5 h-5" /> {editingClipping ? "Edit" : "Create"} Clipping
                </h2>
                <button
                  aria-label="Close"
                  className="rounded-full p-2 hover:bg-[#f8eaea]"
                  onClick={() => setShowModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="flex flex-col gap-3" onSubmit={handleCreateOrUpdate}>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                />

                <label className="text-sm font-medium text-gray-700">Image</label>
                <div className="flex items-center gap-3">
                  <div
                    className="w-full border-2 border-dashed border-[#a50303]/40 rounded-lg p-3 flex items-center gap-3 bg-[#f8eaea] cursor-pointer"
                    onClick={() => document.getElementById("clipping-image-input")?.click()}
                  >
                    <UploadCloud className="w-5 h-5 text-[#a50303]" />
                    <div className="text-sm text-[#a50303]">
                      {imageFile ? imageFile.name : editingClipping ? "Change image" : "Click to upload image"}
                    </div>
                    <input
                      id="clipping-image-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  {(imageFile || editingClipping) && (
                    <div className="w-16 h-16 rounded overflow-hidden border border-[#eaeaea]">
                      <img
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile)
                            : editingClipping?.imageUrl
                        }
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 mt-2">
                  <Button
                    type="button"
                    className="rounded-full border border-[#a50303] text-[#a50303] px-4 py-2"
                    onClick={() => {
                      setShowModal(false);
                      setEditingClipping(null);
                      setForm({ title: "" });
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
                    {uploading ? "Saving..." : editingClipping ? "Update" : "Create"}
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