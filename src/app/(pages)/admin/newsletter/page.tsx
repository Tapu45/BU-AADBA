"use client"

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

interface Newsletter {
  id: string;
  title: string;
  description?: string;
  publicationDate: string;
  coverImage?: string;
  fileUrl: string;
  author?: string;
  editor?: string;
  volume?: number;
  issue?: number;
  createdBy: string;
  isPublic: boolean;
  pageCount?: number;
}

const initialForm = {
  title: "",
  description: "",
  coverImage: "",
  fileUrl: "",
  author: "",
  editor: "",
  volume: 1,
  issue: 1,
};

const page: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const res = await fetch("/api/admin/newsletter");
      const data = await res.json();
      setNewsletters(data.newsletters || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.data?.secure_url) {
        setForm((prev) => ({ ...prev, coverImage: data.data.secure_url }));
      } else {
        alert("Cover image upload failed");
      }
    } catch (err) {
      alert("Cover image upload error");
    } finally {
      setCoverUploading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.data?.secure_url) {
        setForm((prev) => ({ ...prev, fileUrl: data.data.secure_url }));
      } else {
        alert("File upload failed");
      }
    } catch (err) {
      alert("File upload error");
    } finally {
      setFileUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const payload = editingId
        ? { ...form, id: editingId, publicationDate: new Date().toISOString() }
        : { ...form, publicationDate: new Date().toISOString() };
      const res = await fetch("/api/admin/newsletter", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Something went wrong");
      } else {
        await fetchNewsletters();
        resetForm();
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Newsletter) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description || "",
      coverImage: item.coverImage || "",
      fileUrl: item.fileUrl,
      author: item.author || "",
      editor: item.editor || "",
      volume: item.volume ?? 1,
      issue: item.issue ?? 1,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
    if (coverInputRef.current) coverInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen px-4 py-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BookOpen size={40} className="text-[#a50303]" />
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Newsletter
          </h1>
        </div>
        <Button
          className="bg-[#a50303] text-white hover:bg-black transition"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          {editingId ? "Edit Newsletter" : "Create Newsletter"}
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="mb-10 bg-black/5 rounded-xl p-6 border border-[#a50303] shadow-lg max-w-4xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-black font-semibold mb-1">Title</label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-black font-semibold mb-1">Description</label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              <div>
                <label className="block text-black font-semibold mb-1">Cover Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  ref={coverInputRef}
                  onChange={handleCoverUpload}
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                  disabled={coverUploading}
                />
                {coverUploading && (
                  <span className="text-xs text-[#a50303]">Uploading...</span>
                )}
                {form.coverImage && (
                  <img
                    src={form.coverImage}
                    alt="Cover"
                    className="mt-2 rounded shadow h-16"
                  />
                )}
              </div>
              <div>
                <label className="block text-black font-semibold mb-1">File</label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                  disabled={fileUploading}
                />
                {fileUploading && (
                  <span className="text-xs text-[#a50303]">Uploading...</span>
                )}
                {form.fileUrl && (
                  <a
                    href={form.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-[#a50303] underline"
                  >
                    View File
                  </a>
                )}
              </div>
              <div>
                <label className="block text-black font-semibold mb-1">Author</label>
                <Input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              <div>
                <label className="block text-black font-semibold mb-1">Editor</label>
                <Input
                  name="editor"
                  value={form.editor}
                  onChange={handleChange}
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              <div>
                <label className="block text-black font-semibold mb-1">Volume</label>
                <Input
                  type="number"
                  name="volume"
                  value={form.volume}
                  onChange={handleChange}
                  min={1}
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              <div>
                <label className="block text-black font-semibold mb-1">Issue</label>
                <Input
                  type="number"
                  name="issue"
                  value={form.issue}
                  onChange={handleChange}
                  min={1}
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
           
              <div className="col-span-2 flex justify-end gap-4 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#a50303] text-black hover:bg-[#a50303] hover:text-white"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#a50303] text-white hover:bg-black"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-black mb-4">Existing Newsletters</h2>
        <Table className="rounded-xl overflow-hidden border border-[#a50303] shadow">
          <TableHeader className="bg-[#a50303] text-white">
            <TableRow>
              <TableCell className="font-bold">Title</TableCell>
              <TableCell className="font-bold">Date</TableCell>
              <TableCell className="font-bold">Author</TableCell>
              <TableCell className="font-bold">Public</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsletters.map((n) => (
              <TableRow key={n.id} className="hover:bg-black/5 transition">
                <TableCell className="text-black">{n.title}</TableCell>
                <TableCell className="text-black">
                  {new Date(n.publicationDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-black">{n.author}</TableCell>
                <TableCell className="text-black">
                  {n.isPublic ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    className="bg-[#a50303] text-white hover:bg-black"
                    onClick={() => handleEdit(n)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {newsletters.length === 0 && (
          <p className="text-black mt-6 text-center">No newsletters found.</p>
        )}
      </div>
    </div>
  );
}

export default page;