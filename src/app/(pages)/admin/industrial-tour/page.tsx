"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, ImagePlus, Trash2, X } from "lucide-react";

type Photo = {
  id: string;
  imageUrl: string;
  caption?: string;
};

type Tour = {
  id: string;
  title: string;
  year: number;
  description?: string;
  coverImage?: string;
  photoAlbums: {
    album: {
      id: string;
      title: string;
      photos: Photo[];
    };
  }[];
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
  const [loading, setLoading] = useState(false);

  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [albumName, setAlbumName] = useState("");
  const [albumPhotos, setAlbumPhotos] = useState<File[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  useEffect(() => {
    fetchTours();
  }, []);

  async function fetchTours() {
    const res = await fetch("/api/admin/industrial");
    const data = await res.json();
    setTours(data);
  }

  // Create new tour
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

    await fetch("/api/admin/industrial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        year: Number(form.year),
        coverImage: coverImageUrl,
      }),
    });
    setForm({ title: "", year: "", description: "" });
    setCoverImage(null);
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

  // Create album and link to tour
  async function handleCreateAlbum(e: React.FormEvent) {
    e.preventDefault();
    setUploadingPhotos(true);

    // 1. Create album
    const albumRes = await fetch("/api/admin/album", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: albumName }),
    });
    const album = await albumRes.json();

    // 2. Link album to tour
    await fetch(`/api/admin/industrial/${selectedTour?.id}/album`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ albumId: album.id }),
    });

    // 3. Upload photos to album
    for (const photo of albumPhotos) {
      const formData = new FormData();
      formData.append("file", photo);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      await fetch(`/api/admin/album/${album.id}/photo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: uploadData.data.secure_url }),
      });
    }

    setAlbumName("");
    setAlbumPhotos([]);
    setShowAlbumModal(false);
    await fetchTours();
    setUploadingPhotos(false);
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
            Manage your industrial tours and their albums/photos
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
                className="bg-white rounded-2xl shadow-2xl border border-[#eaeaea] p-8 w-full max-w-md"
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
                  <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                    aria-label="Description"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                    aria-label="Cover Image"
                  />
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

        {/* Album Modal */}
        <AnimatePresence>
          {showAlbumModal && selectedTour && (
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
                className="bg-white rounded-2xl shadow-2xl border border-[#eaeaea] p-8 w-full max-w-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#a50303] flex items-center gap-2">
                    <ImagePlus className="w-6 h-6" /> New Album for{" "}
                    {selectedTour.title}
                  </h2>
                  <button
                    aria-label="Close"
                    className="rounded-full p-2 hover:bg-[#f8eaea] transition"
                    onClick={() => setShowAlbumModal(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form
                  onSubmit={handleCreateAlbum}
                  className="flex flex-col gap-4"
                >
                  <div className="font-bold text-lg text-[#a50303] mb-2">
                    {selectedTour?.title} - {selectedTour?.year}
                  </div>

                  <input
                    type="text"
                    placeholder="Album Name"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    required
                    className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                    aria-label="Album Name"
                  />

                  {/* Upload Zone */}
                  <div
                    className="border-2 border-dashed border-[#a50303] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-[#f8eaea] hover:bg-[#fbeaea] transition"
                    onClick={() =>
                      document.getElementById("album-photo-input")?.click()
                    }
                    style={{ minHeight: 100 }}
                  >
                    <UploadCloud className="w-8 h-8 text-[#a50303] mb-2" />
                    <span className="text-[#a50303] font-medium">
                      Click or drag to upload photos
                    </span>
                    <input
                      id="album-photo-input"
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setAlbumPhotos((prev) => [
                          ...prev,
                          ...(e.target.files ? Array.from(e.target.files) : []),
                        ]);
                      }}
                    />
                  </div>

                  {/* Photo Preview Grid */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {albumPhotos.map((file, idx) => (
                      <div
                        key={idx}
                        className="relative w-16 h-16 rounded overflow-hidden border border-[#eaeaea] bg-white flex items-center justify-center"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-[#fff] rounded-bl px-1 py-0.5 text-[#a50303] hover:text-[#c70c0c] text-xs"
                          onClick={() =>
                            setAlbumPhotos(
                              albumPhotos.filter((_, i) => i !== idx)
                            )
                          }
                          aria-label="Remove Photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] transition-colors flex items-center justify-center gap-2 text-white mt-2"
                    disabled={uploadingPhotos}
                    aria-label="Create Album & Upload Photos"
                  >
                    {uploadingPhotos ? (
                      <Spinner />
                    ) : (
                      <UploadCloud className="w-5 h-5" />
                    )}
                    {uploadingPhotos
                      ? "Uploading..."
                      : "Create Album & Upload Photos"}
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
                   <div className="mt-4">
                    <Button
                      className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] transition-colors flex items-center gap-2 text-white px-4 py-2"
                      onClick={() => {
                        setSelectedTour(tour);
                        setShowAlbumModal(true);
                      }}
                      aria-label="Add Album"
                    >
                      <UploadCloud className="w-5 h-5" /> Add Album
                    </Button>

                    {/* improved albums list */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <b className="text-[#a50303]">Albums</b>
                        <span className="text-sm text-muted-foreground">
                          {tour.photoAlbums.length} album
                          {tour.photoAlbums.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {tour.photoAlbums.length === 0 ? (
                        <div className="text-muted-foreground text-sm">No albums yet.</div>
                      ) : (
                        <div className="space-y-3">
                          {tour.photoAlbums.map((pa) => {
                            const photos = pa.album.photos || [];
                            const visible = photos.slice(0, 6); // show up to 6 thumbs
                            const extra = photos.length - visible.length;
                            return (
                              <div
                                key={pa.album.id}
                                className="bg-[#f8f8fa] rounded-lg border border-[#eaeaea] p-3"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-medium text-[#a50303]">
                                    {pa.album.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {photos.length} photo{photos.length !== 1 ? "s" : ""}
                                  </div>
                                </div>

                                {photos.length === 0 ? (
                                  <div className="text-xs text-muted-foreground italic">No photos</div>
                                ) : (
                                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                    {visible.map((photo, idx) => {
                                      const isLastOverlay = idx === visible.length - 1 && extra > 0;
                                      return (
                                        <div
                                          key={photo.id}
                                          className="relative rounded overflow-hidden border border-[#eaeaea] bg-white h-20"
                                        >
                                          <img
                                            src={photo.imageUrl}
                                            alt={photo.caption || ""}
                                            className="object-cover w-full h-full"
                                          />
                                          {isLastOverlay && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium">
                                              +{extra}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
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
