"use client";

import React, { useEffect, useState, useRef } from "react";
import { X, Trash2, Pencil, Loader2, Plus } from "lucide-react";

type Conference = {
  id: string;
  name: string;
  cover?: string;
  file?: string;
};

const fetchConferences = async (): Promise<Conference[]> => {
  const res = await fetch("/api/admin/confress");
  if (!res.ok) return [];
  return await res.json();
};

const ConferenceAdminPage = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({  name: "", cover: "", file: "" });
  const [submitting, setSubmitting] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setConferences(await fetchConferences());
      setLoading(false);
    })();
  }, []);

  const openModal = (conf?: Conference) => {
    if (conf) {
      setEditId(conf.id);
      setForm({
        name: conf.name,
        cover: conf.cover || "",
        file: conf.file || "",
      });
    } else {
      setEditId(null);
      setForm({  name: "", cover: "", file: "" });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm({ name: "", cover: "", file: "" });
    if (coverInputRef.current) coverInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "file"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setForm((prev) => ({
      ...prev,
      [type]: data.data.secure_url,
    }));
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const method = editId ? "PUT" : "POST";
    const body = editId
      ? { id: editId, ...form }
      : { ...form };
    await fetch("/api/admin/confress", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setConferences(await fetchConferences());
    setSubmitting(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this conference?")) return;
    await fetch("/api/admin/confress", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setConferences(await fetchConferences());
  };

  return (
    <main className="min-h-screen bg-[#f8f8fa] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#a50303]">Manage Conferences</h1>
          <button
            className="bg-[#a50303] text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold hover:bg-[#c70c0c] transition"
            onClick={() => openModal()}
          >
            <Plus className="w-5 h-5" /> Add Conference
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin w-8 h-8 text-[#a50303]" />
          </div>
        ) : conferences.length === 0 ? (
          <div className="text-center text-zinc-500 py-16">No conferences found.</div>
        ) : (
          <div className="space-y-6">
            {conferences.map((conf) => (
              <div
                key={conf.id}
                className="bg-white rounded-xl shadow border border-[#eaeaea] p-5 flex flex-col md:flex-row items-center gap-4"
              >
                <div className="flex-1">
                 
                  <div className="text-sm text-zinc-700">{conf.name}</div>
                  {conf.cover && (
                    <img
                      src={conf.cover}
                      alt="Cover"
                      className="mt-2 w-32 h-20 object-cover rounded border"
                    />
                  )}
                  {conf.file && (
                    <a
                      href={conf.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-blue-600 underline text-sm"
                    >
                      Download File
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-full p-2 border border-[#a50303] text-[#a50303] hover:bg-[#f8eaea] transition"
                    onClick={() => openModal(conf)}
                    aria-label="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    className="rounded-full p-2 border border-red-500 text-red-500 hover:bg-red-50 transition"
                    onClick={() => handleDelete(conf.id)}
                    aria-label="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-2xl border border-[#eaeaea] p-8 w-full max-w-md relative"
            >
              <button
                type="button"
                className="absolute top-3 right-3 rounded-full p-2 hover:bg-[#f8eaea] transition"
                onClick={closeModal}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-[#a50303] mb-6">
                {editId ? "Edit Conference" : "Add Conference"}
              </h2>
              <div className="flex flex-col gap-4">
               
                <input
                  type="text"
                  name="name"
                  placeholder="Conference Name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "cover")}
                    className="block w-full text-sm border border-[#eaeaea] rounded-lg px-3 py-2"
                  />
                  {form.cover && (
                    <img
                      src={form.cover}
                      alt="Cover Preview"
                      className="mt-2 w-32 h-20 object-cover rounded border"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File (PDF/Doc)</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, "file")}
                    className="block w-full text-sm border border-[#eaeaea] rounded-lg px-3 py-2"
                  />
                  {form.file && (
                    <a
                      href={form.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-blue-600 underline text-sm"
                    >
                      Download File
                    </a>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] transition-colors flex items-center justify-center gap-2 text-white py-2 mt-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                    </>
                  ) : editId ? (
                    <>Update Conference</>
                  ) : (
                    <>Create Conference</>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

export default ConferenceAdminPage;