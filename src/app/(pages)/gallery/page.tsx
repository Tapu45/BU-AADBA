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
    <main className="min-h-screen bg-[#f8f8f8] px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#a50303] tracking-tight">
            <span className="relative inline-block">
              Alumni Gallery
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#a50303] opacity-20"></span>
            </span>
          </h1>
          <p className="text-lg text-zinc-600 mt-4 max-w-2xl mx-auto">
            Explore memorable moments from our alumni community
          </p>
        </motion.header>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 border-4 border-[#a50303]/20 rounded-full"></div>
              <motion.div 
                className="absolute inset-0 border-4 border-transparent border-t-[#a50303] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              ></motion.div>
            </div>
          </div>
        ) : photos.length === 0 ? (
          <div className="py-32 text-center text-zinc-500 text-lg">
            No photos found.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {photos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="aspect-[4/5] relative"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-full focus:outline-none group"
                  onClick={() => openModal(idx)}
                  aria-label={`View photo: ${photo.caption || "Alumni Photo"}`}
                >
                  <div className="absolute inset-0 bg-black/5 rounded-lg transform group-hover:bg-black/0 transition-all duration-300"></div>
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || "Alumni Photo"}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                    loading="lazy"
                    style={{
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    }}
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-black/5 transform group-hover:ring-[#a50303]/40 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent rounded-b-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Photo Modal */}
        <AnimatePresence>
          {modalIdx !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative p-6 max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
                tabIndex={0}
                aria-label="Photo viewer"
              >
                <button
                  className="absolute top-2 right-2 z-50 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                  onClick={closeModal}
                  aria-label="Close photo viewer"
                >
                  <X size={24} />
                </button>
                
                <div className="flex items-center justify-between w-full h-full">
                  <button
                    className="text-white hover:text-[#a50303] bg-black/30 hover:bg-white/90 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-30 transition-all duration-200 transform hover:scale-110"
                    onClick={prevPhoto}
                    aria-label="Previous photo"
                    disabled={modalIdx === 0}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  
                  <div className="mx-4 flex-1 flex justify-center">
                    <img
                      src={photos[modalIdx].imageUrl}
                      alt={photos[modalIdx].caption || "Alumni Photo"}
                      className="max-h-[80vh] max-w-full object-contain rounded-md shadow-2xl"
                      loading="eager"
                    />
                  </div>
                  
                  <button
                    className="text-white hover:text-[#a50303] bg-black/30 hover:bg-white/90 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-30 transition-all duration-200 transform hover:scale-110"
                    onClick={nextPhoto}
                    aria-label="Next photo"
                    disabled={modalIdx === photos.length - 1}
                  >
                    <ChevronRight size={28} />
                  </button>
                </div>
                
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <div className="flex space-x-1.5 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full">
                    {photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalIdx(idx);
                        }}
                        className={`w-2 h-2 rounded-full ${
                          modalIdx === idx ? "bg-white" : "bg-white/40 hover:bg-white/70"
                        } transition-all duration-200`}
                        aria-label={`Go to photo ${idx + 1}`}
                        aria-current={modalIdx === idx}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}