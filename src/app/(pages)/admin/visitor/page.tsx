"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Edit, Trash2, X } from "lucide-react";

type Visitor = {
  id: string;
  name: string;
  designation: string;
  photoUrl: string;
  type: string;
};

function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <button
      {...props}
      className={`transition focus:outline-none focus:ring-2 focus:ring-[#a50303] font-medium ${className}`}
    >
      {children}
    </button>
  );
}

export default function VisitorPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState<Visitor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    photoUrl: "",
    type: "",
  });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await fetch("/api/admin/visitor");
      if (response.ok) {
        const data = await response.json();
        setVisitors(data);
      } else {
        console.error("Failed to fetch visitors");
      }
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };

  const handleCreate = () => {
    setEditingVisitor(null);
    setFormData({ name: "", designation: "", photoUrl: "", type: "" });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (visitor: Visitor) => {
    setEditingVisitor(visitor);
    setFormData({
      name: visitor.name,
      designation: visitor.designation,
      photoUrl: visitor.photoUrl,
      type: visitor.type,
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this visitor?")) {
      try {
        const response = await fetch("/api/admin/visitor", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          fetchVisitors();
        } else {
          console.error("Failed to delete visitor");
        }
      } catch (error) {
        console.error("Error deleting visitor:", error);
      }
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let photoUrl = formData.photoUrl;

    // Upload photo if a new file is selected
    if (selectedFile) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", selectedFile);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.success) {
        photoUrl = data.data.secure_url;
      }
    }

    try {
      const method = editingVisitor ? "PUT" : "POST";
      const body = editingVisitor
        ? { id: editingVisitor.id, ...formData, photoUrl }
        : { ...formData, photoUrl };
      const response = await fetch("/api/admin/visitor", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        fetchVisitors();
        setIsModalOpen(false);
        setSelectedFile(null);
      } else {
        console.error("Failed to save visitor");
      }
    } catch (error) {
      console.error("Error saving visitor:", error);
    }
    setUploading(false);
  };

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
              <Users className="w-8 h-8" /> Visitor Management
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Manage visitors — add names, designations, photos, and types.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] shadow text-white px-5 py-2 flex items-center gap-2"
              onClick={handleCreate}
              aria-label="Create Visitor"
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
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visitors.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      No visitors yet.
                    </td>
                  </tr>
                ) : (
                  visitors.map((visitor, index) => (
                    <tr key={visitor.id} className="border-t border-[#f0f0f0]">
                      <td className="px-4 py-3 align-middle">{index + 1}</td>
                      <td className="px-4 py-3 align-middle">
                        <div className="w-20 h-20 rounded overflow-hidden border border-[#eaeaea] bg-[#f8f8fa]">
                          <img
                            src={visitor.photoUrl}
                            alt={visitor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <div className="font-medium">{visitor.name}</div>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        {visitor.designation}
                      </td>
                      <td className="px-4 py-3 align-middle">{visitor.type}</td>
                      <td className="px-4 py-3 align-middle text-right">
                        <div className="inline-flex items-center gap-2">
                          <Button
                            className="rounded-full border border-[#a50303] text-[#a50303] p-2 hover:bg-[#f8eaea]"
                            onClick={() => handleEdit(visitor)}
                            aria-label="Edit visitor"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            className="rounded-full border border-[#a50303] text-[#a50303] p-2 hover:bg-[#f8eaea]"
                            onClick={() => handleDelete(visitor.id)}
                            aria-label="Delete visitor"
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
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            onClick={() => setIsModalOpen(false)}
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
                  <Users className="w-5 h-5" />{" "}
                  {editingVisitor ? "Edit" : "Create"} Visitor
                </h2>
                <button
                  aria-label="Close"
                  className="rounded-full p-2 hover:bg-[#f8eaea]"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                />

                <label className="text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                />

                <label className="text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition bg-white"
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="NATIONAL">National</option>
                  <option value="INTERNATIONAL">International</option>
                </select>

                <label className="text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="flex items-center gap-3">
                  <div
                    className="w-full border-2 border-dashed border-[#a50303]/40 rounded-lg p-3 flex items-center gap-3 bg-[#f8eaea] cursor-pointer"
                    onClick={() =>
                      document.getElementById("visitor-photo-input")?.click()
                    }
                  >
                    <Plus className="w-5 h-5 text-[#a50303]" />
                    <div className="text-sm text-[#a50303]">
                      {selectedFile || formData.photoUrl
                        ? "Change photo"
                        : "Click to select photo"}
                    </div>
                    <input
                      id="visitor-photo-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) handleFileSelect(e.target.files[0]);
                      }}
                    />
                  </div>

                  {(selectedFile || formData.photoUrl) && (
                    <div className="w-16 h-16 rounded overflow-hidden border border-[#eaeaea]">
                      <img
                        src={
                          selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : formData.photoUrl
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
                      setIsModalOpen(false);
                      setEditingVisitor(null);
                      setFormData({
                        name: "",
                        designation: "",
                        photoUrl: "",
                        type: "",
                      });
                      setSelectedFile(null);
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
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-25"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                   {uploading
                      ? "Saving..."
                      : editingVisitor
                      ? "Update"
                      : "Create"}
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