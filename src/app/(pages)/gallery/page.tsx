"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Photo = {
  id: string;
  imageUrl: string;
  caption?: string;
  uploadDate: string;
  uploadedBy?: string;
  albumTitle?: string;
};

type Album = {
  id: string;
  title: string;
  description?: string;
  albumDate: string;
  coverImage?: string;
  photos: Photo[];
};

const fetchGallery = async (): Promise<Album[]> => {
  const res = await fetch("/api/admin/gallery", { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  // Focus trap for modal accessibility
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const albums = await fetchGallery();
      // Flatten all photos from all albums
      const allPhotos = albums.flatMap((album) =>
        album.photos.map((photo) => ({
          ...photo,
          albumTitle: album.title,
        }))
      );
      setPhotos(allPhotos);
      setLoading(false);
    })();
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    if (modalIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalIdx(null);
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const openModal = (idx: number) => setModalIdx(idx);
  const closeModal = () => setModalIdx(null);

  const prevPhoto = () => {
    if (modalIdx === null) return;
    if (modalIdx > 0) setModalIdx(modalIdx - 1);
  };

  const nextPhoto = () => {
    if (modalIdx === null) return;
    if (modalIdx < photos.length - 1) setModalIdx(modalIdx + 1);
  };

  // Focus trap for modal
  useEffect(() => {
    if (modalIdx !== null && modalRef.current) {
      modalRef.current.focus();
    }
  }, [modalIdx]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f8fa] to-[#f3e9ee] px-4 py-22">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <header className="mb-12 flex flex-col gap-2 items-center">
          <h1 className="text-3xl md:text-3xl font-extrabold text-[#a50303] tracking-tight drop-shadow-sm">
            Alumni Photo Gallery
          </h1>
          <p className="text-lg text-muted-foreground font-medium text-center max-w-2xl">
            Explore memorable moments from alumni events, reunions, and celebrations.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[#a50303] text-xl font-semibold"
            >
              Loading gallery...
            </motion.div>
          </div>
        ) : photos.length === 0 ? (
          <div className="py-32 text-center text-muted-foreground text-lg">
            No photos found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {photos.map((photo, idx) => (
              <motion.button
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 4px 24px #a5030333",
                }}
                className="relative group focus:outline-none bg-white rounded-2xl shadow-lg border border-[#eaeaea] overflow-hidden transition-all"
                aria-label={`View photo: ${photo.caption || photo.albumTitle || "Alumni Photo"}`}
                onClick={() => openModal(idx)}
                style={{ transition: "box-shadow 0.2s" }}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.caption || photo.albumTitle || "Alumni Photo"}
                  className="w-full h-48 object-cover rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                  {/* <div className="text-white text-sm font-medium truncate">
                    {photo.caption || photo.albumTitle}
                  </div> */}
                  {/* <div className="text-xs text-white/80">
                    {photo.uploadedBy && <>By {photo.uploadedBy} · </>}
                    {new Date(photo.uploadDate).toLocaleDateString()}
                  </div> */}
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Photo Modal */}
        <AnimatePresence>
          {modalIdx !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-modal="true"
              role="dialog"
              tabIndex={-1}
              ref={modalRef}
              onClick={closeModal}
              onKeyDown={(e) => {
                if (e.key === "Escape") closeModal();
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative  rounded-3xl   p-6 max-w-2xl w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
                tabIndex={0}
                aria-label="Photo viewer"
              >
                <button
                  className="absolute top-4 right-4 text-[#a50303] hover:bg-[#f8eaea] rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-[#a50303]"
                  onClick={closeModal}
                  aria-label="Close photo viewer"
                >
                  <X size={28} />
                </button>
                <div className="flex items-center gap-4 w-full justify-center">
                  <button
                    className="text-[#a50303] hover:bg-[#f8eaea] rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-[#a50303] disabled:opacity-40"
                    onClick={prevPhoto}
                    aria-label="Previous photo"
                    disabled={modalIdx === 0}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <img
                    src={photos[modalIdx].imageUrl}
                    alt={photos[modalIdx].caption || photos[modalIdx].albumTitle || "Alumni Photo"}
                    className="max-h-[60vh] max-w-[70vw] rounded-2xl border border-[#eaeaea] shadow-lg object-contain"
                    loading="eager"
                  />
                  <button
                    className="text-[#a50303] hover:bg-[#f8eaea] rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-[#a50303] disabled:opacity-40"
                    onClick={nextPhoto}
                    aria-label="Next photo"
                    disabled={modalIdx === photos.length - 1}
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
                <div className="mt-4 text-center w-full">
                  {/* <div className="text-lg font-semibold text-[#a50303]">
                    {photos[modalIdx].caption || photos[modalIdx].albumTitle}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {photos[modalIdx].uploadedBy && <>By {photos[modalIdx].uploadedBy} · </>}
                    Uploaded on {new Date(photos[modalIdx].uploadDate).toLocaleDateString()}
                  </div> */}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}