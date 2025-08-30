"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, ImagePlus, CheckCircle, X, Trash2 } from "lucide-react";

const fetchAlbums = async () => {
  const res = await fetch("/api/admin/album/");
  const data = await res.json();
  return data.albums || [];
};

const GalleryAdminPage = () => {
  const [albums, setAlbums] = useState<
    { id: string; name: string; description?: string; photos: { id: string; imageUrl: string }[] }[]
  >([]);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [albumDesc, setAlbumDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  useEffect(() => {
    (async () => {
      setAlbums(await fetchAlbums());
    })();
  }, []);

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/album/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: albumName, description: albumDesc }),
      });
      const data = await res.json();
      setAlbums(await fetchAlbums());
      setShowAlbumModal(false);
      setAlbumName("");
      setAlbumDesc("");
    } catch {
      alert("Error creating album");
    }
    setLoading(false);
  };

  const handlePhotoUpload = async () => {
    if (!selectedAlbumId || photos.length === 0) return;
    setUploadingPhotos(true);
    for (const photo of photos) {
      const formData = new FormData();
      formData.append("file", photo);
      const uploadRes = await fetch("/api/upload/", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      const photoUrl = uploadData.data.secure_url;
      await fetch(`/api/admin/album/${selectedAlbumId}/photo/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: photoUrl }),
      });
    }
    setAlbums(await fetchAlbums());
    setPhotos([]);
    setUploadingPhotos(false);
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (!confirm("Delete this album?")) return;
    await fetch(`/api/admin/album/${albumId}/`, {
      method: "DELETE",
    });
    setAlbums(await fetchAlbums());
  };

  const handleDeletePhoto = async (albumId: string, photoId: string) => {
    await fetch(`/api/admin/album/${albumId}/photo/${photoId}/`, {
      method: "DELETE",
    });
    setAlbums(await fetchAlbums());
  };

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
            <ImagePlus className="w-8 h-8" /> Gallery Albums
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Manage your albums and photos
          </p>
          <Button
            className="mt-4 rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] shadow text-white px-6 py-3 flex items-center gap-2"
            onClick={() => setShowAlbumModal(true)}
            aria-label="Create Album"
          >
            <UploadCloud className="w-5 h-5" /> Create Album
          </Button>
        </header>

        <AnimatePresence>
          {showAlbumModal && (
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
                    <ImagePlus className="w-6 h-6" /> New Album
                  </h2>
                  <button
                    aria-label="Close"
                    className="rounded-full p-2 hover:bg-[#f8eaea] transition"
                    onClick={() => setShowAlbumModal(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleCreateAlbum} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Album Name"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    required
                    className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                    aria-label="Album Name"
                  />
                  <textarea
                    placeholder="Album Description"
                    value={albumDesc}
                    onChange={(e) => setAlbumDesc(e.target.value)}
                    className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                    aria-label="Album Description"
                  />
                  <Button
                    type="submit"
                    className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] transition-colors flex items-center justify-center gap-2 text-white"
                    disabled={loading}
                    aria-label="Create Album"
                  >
                    <UploadCloud className="w-5 h-5" /> Create Album
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-8">
          {albums.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-lg">
              No albums yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {albums.map((album) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow border border-[#eaeaea] p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-lg text-[#a50303]">{album.name}</span>
                      <div className="text-sm text-muted-foreground">{album.description}</div>
                    </div>
                    <Button
                      className="rounded-full border border-[#a50303] text-[#a50303] px-3 py-1 hover:bg-[#f8eaea] transition-colors"
                      aria-label="Delete Album"
                      onClick={() => handleDeleteAlbum(album.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          setSelectedAlbumId(album.id);
                          setPhotos(Array.from(e.target.files || []));
                        }}
                        className="rounded-lg border border-[#eaeaea] px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                        aria-label="Select Photos"
                        disabled={uploadingPhotos}
                      />
                      <Button
                        type="button"
                        className={`rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] transition-colors flex items-center gap-2 text-white ${photos.length === 0 || selectedAlbumId !== album.id ? "opacity-60 cursor-not-allowed" : ""}`}
                        onClick={handlePhotoUpload}
                        disabled={uploadingPhotos || photos.length === 0 || selectedAlbumId !== album.id}
                        aria-label="Upload Photos"
                      >
                        <UploadCloud className="w-5 h-5" /> Upload
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4">
                      {album.photos.length === 0 ? (
                        <div className="text-muted-foreground text-sm">No photos yet.</div>
                      ) : (
                        album.photos.map((photo) => (
                          <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                          >
                            <img
                              src={photo.imageUrl}
                              alt="Uploaded"
                              className="w-24 h-24 object-cover rounded-xl border border-[#eaeaea] shadow"
                            />
                            <button
                              aria-label="Delete Photo"
                              className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                              onClick={() => handleDeletePhoto(album.id, photo.id)}
                            >
                              <Trash2 className="w-4 h-4 text-[#a50303]" />
                            </button>
                          </motion.div>
                        ))
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

export default GalleryAdminPage;
