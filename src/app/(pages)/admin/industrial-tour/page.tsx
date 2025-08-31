"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, ImagePlus, Trash2, X } from "lucide-react";

type Photo = {
  imageUrl: string;
  caption?: string;
};

type Tour = {
  id: string;
  title: string;
  year: number;
  description?: string;
  coverImage?: string;
  photos: Photo[];
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

export default function IndustrialTourAdminPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [showTourModal, setShowTourModal] = useState(false);
  const [form, setForm] = useState({ title: "", year: "", description: "" });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoCaptions, setPhotoCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTours();
  }, []);

  async function fetchTours() {
    const res = await fetch("/api/admin/industrial");
    const data = await res.json();
    setTours(data);
  }

  // Create new tour with photos
  async function handleCreateTour(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let coverImageUrl = "";
    if (coverImage) {
      const formData = new FormData();
      formData.append("file", coverImage);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      coverImageUrl = data.data.secure_url;
    }

    // Upload all photos to Cloudinary and collect URLs
    const uploadedPhotos: Photo[] = [];
    for (let i = 0; i < photos.length; i++) {
      const photoFile = photos[i];
      const formData = new FormData();
      formData.append("file", photoFile);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      uploadedPhotos.push({
        imageUrl: data.data.secure_url,
        caption: photoCaptions[i] || "",
      });
    }

    await fetch("/api/admin/industrial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        year: Number(form.year),
        coverImage: coverImageUrl,
        photos: uploadedPhotos,
      }),
    });
    setForm({ title: "", year: "", description: "" });
    setCoverImage(null);
    setPhotos([]);
    setPhotoCaptions([]);
    setShowTourModal(false);
    await fetchTours();
    setLoading(false);
  }

  // Delete tour
  async function handleDeleteTour(id: string) {
    if (!confirm("Delete this tour?")) return;
    setLoading(true);
    await fetch("/api/admin/industrial", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchTours();
    setLoading(false);
  }

  function Spinner() {
    return (
      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8fa] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        <header className="mb-10 flex flex-col gap-2 items-center">
          <h1 className="text-4xl font-extrabold text-[#a50303] flex items-center gap-2">
            <ImagePlus className="w-8 h-8" /> Industrial Tours
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Manage your industrial tours and their photos
          </p>
          <Button
            className="mt-4 rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] shadow text-white px-6 py-3 flex items-center gap-2"
            onClick={() => setShowTourModal(true)}
            aria-label="Create Tour"
          >
            <UploadCloud className="w-5 h-5" /> Create Tour
          </Button>
        </header>

        {/* Tour Modal */}
        <AnimatePresence>
  {showTourModal && (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl border border-[#eaeaea] p-6 w-full max-w-sm"
        style={{ maxHeight: "80vh", overflowY: "auto" }} // Reduced height and scrollable
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#a50303] flex items-center gap-2">
            <ImagePlus className="w-6 h-6" /> New Tour
          </h2>
          <button
            aria-label="Close"
            className="rounded-full p-2 hover:bg-[#f8eaea] transition"
            onClick={() => setShowTourModal(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form
          onSubmit={handleCreateTour}
          className="flex flex-col gap-4"
        >
          <label className="font-medium text-[#a50303] mb-1">
            Tour Title
          </label>
          <input
            type="text"
            placeholder="Tour Title"
            value={form.title}
            onChange={(e) =>
              setForm((f) => ({ ...f, title: e.target.value }))
            }
            required
            className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
            aria-label="Tour Title"
          />

          <label className="font-medium text-[#a50303] mb-1">
            Year
          </label>
          <input
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={(e) =>
              setForm((f) => ({ ...f, year: e.target.value }))
            }
            required
            className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
            aria-label="Year"
          />

          <label className="font-medium text-[#a50303] mb-1">
            Description
          </label>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            className="rounded-lg border border-[#eaeaea] px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
            aria-label="Description"
            rows={2}
            style={{ minHeight: 48, maxHeight: 80 }}
          />

          <label className="font-medium text-[#a50303] mb-1">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            className="rounded-lg border border-[#eaeaea] px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
            aria-label="Cover Image"
          />

          {/* Multiple Photo Upload */}
          <div>
            <label className="block font-medium text-[#a50303] mb-2">
              Tour Photos
            </label>
            <div
              className="border-2 border-dashed border-[#a50303] rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer bg-[#f8eaea] hover:bg-[#fbeaea] transition"
              onClick={() =>
                document.getElementById("tour-photo-input")?.click()
              }
              style={{ minHeight: 80 }}
            >
              <UploadCloud className="w-7 h-7 text-[#a50303] mb-2" />
              <span className="text-[#a50303] font-medium text-sm">
                Click or drag to upload photos
              </span>
              <input
                id="tour-photo-input"
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const files = e.target.files
                    ? Array.from(e.target.files)
                    : [];
                  setPhotos((prev) => [...prev, ...files]);
                  setPhotoCaptions((prev) => [
                    ...prev,
                    ...files.map(() => ""),
                  ]);
                }}
              />
            </div>
            {/* Photo Preview Grid with captions */}
            <div className="flex flex-wrap gap-2 mt-2">
              {photos.map((file, idx) => (
                <div
                  key={idx}
                  className="relative w-16 h-16 rounded overflow-hidden border border-[#eaeaea] bg-white flex flex-col items-center justify-center"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="object-cover w-full h-full"
                  />
                 
                 
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-[#fff] rounded-bl px-1 py-0.5 text-[#a50303] hover:text-[#c70c0c] text-xs"
                    onClick={() => {
                      setPhotos(photos.filter((_, i) => i !== idx));
                      setPhotoCaptions(photoCaptions.filter((_, i) => i !== idx));
                    }}
                    aria-label="Remove Photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] transition-colors flex items-center justify-center gap-2 text-white"
            disabled={loading}
            aria-label="Create Tour"
          >
            {loading ? (
              <Spinner />
            ) : (
              <UploadCloud className="w-5 h-5" />
            )}
            {loading ? "Creating..." : "Create Tour"}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

        <section className="mt-8">
          {tours.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-lg">
              No tours yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tours.map((tour) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow border border-[#eaeaea] p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-lg text-[#a50303]">
                        {tour.title} ({tour.year})
                      </span>
                      <div className="text-sm text-muted-foreground">
                        {tour.description}
                      </div>
                    </div>
                    <Button
                      className="rounded-full border border-[#a50303] text-[#a50303] px-3 py-1 hover:bg-[#f8eaea] transition-colors"
                      aria-label="Delete Tour"
                      onClick={() => handleDeleteTour(tour.id)}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {tour.coverImage && (
                    <img
                      src={tour.coverImage}
                      alt="cover"
                      className="w-32 h-24 object-cover rounded-xl border border-[#eaeaea] shadow mt-2"
                    />
                  )}
                  {/* Show photos */}
                  <div className="mt-4">
                    <b className="text-[#a50303] mb-2 block">Tour Photos</b>
                    {tour.photos.length === 0 ? (
                      <div className="text-muted-foreground text-sm">No photos yet.</div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {tour.photos.map((photo, idx) => (
                          <div
                            key={idx}
                            className="relative rounded overflow-hidden border border-[#eaeaea] bg-white h-20"
                          >
                            <img
                              src={photo.imageUrl}
                              alt={photo.caption || ""}
                              className="object-cover w-full h-full"
                            />
                            {photo.caption && (
                              <div className="absolute bottom-0 left-0 w-full px-1 py-0.5 text-xs bg-white bg-opacity-80 border-t border-[#eaeaea] text-center">
                                {photo.caption}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
      </section>
      </motion.div>
    </main>
  );
}