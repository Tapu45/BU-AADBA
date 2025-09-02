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
};

type Section = {
  id: string;
  title: string;
  description?: string;
  photos: Photo[];
};

const fetchGallery = async (): Promise<Section[]> => {
  const res = await fetch("/api/admin/gallery", { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
};

export default function GalleryPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [modalSectionIdx, setModalSectionIdx] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchGallery();
      setSections(data);
      setLoading(false);
    })();
  }, []);

  const allPhotos = sections.flatMap((section, sectionIdx) =>
    section.photos.map((photo) => ({ ...photo, sectionTitle: section.title, sectionIdx }))
  );

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

  const openModal = (sectionIdx: number, photoIdx: number) => {
    const globalIdx = sections.slice(0, sectionIdx).reduce((acc, s) => acc + s.photos.length, 0) + photoIdx;
    setModalIdx(globalIdx);
    setModalSectionIdx(sectionIdx);
  };
  const closeModal = () => {
    setModalIdx(null);
    setModalSectionIdx(null);
  };

  const prevPhoto = () => {
    if (modalIdx === null) return;
    if (modalIdx > 0) setModalIdx(modalIdx - 1);
  };

  const nextPhoto = () => {
    if (modalIdx === null) return;
    if (modalIdx < allPhotos.length - 1) setModalIdx(modalIdx + 1);
  };

  useEffect(() => {
    if (modalIdx !== null && modalRef.current) {
      modalRef.current.focus();
    }
  }, [modalIdx]);

  return (
    <main className="min-h-screen bg-[#f8f8f8] px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#a50303]">
            Alumni Gallery
          </h1>
          <p className="text-base text-zinc-600 mt-2 max-w-xl mx-auto">
            Explore memorable moments from our alumni community
          </p>
        </motion.header>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 border-4 border-[#a50303]/20 rounded-full"></div>
              <motion.div 
                className="absolute inset-0 border-4 border-transparent border-t-[#a50303] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              ></motion.div>
            </div>
          </div>
        ) : sections.length === 0 ? (
          <div className="py-24 text-center text-zinc-500 text-base">
            No sections found.
          </div>
        ) : (
          <div className="space-y-12">
            {sections.map((section, sectionIdx) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: sectionIdx * 0.05 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h2 className="text-xl md:text-2xl font-bold text-[#a50303]">{section.title}</h2>
                  {section.description && (
                    <p className="text-zinc-600 mt-1 text-sm">{section.description}</p>
                  )}
                </div>
                {section.photos.length === 0 ? (
                  <div className="text-center text-zinc-500 text-sm">No photos in this section.</div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  >
                    {section.photos.map((photo, photoIdx) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: photoIdx * 0.03 }}
                        className="aspect-[3/4] relative"
                      >
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="w-full h-full focus:outline-none group"
                          onClick={() => openModal(sectionIdx, photoIdx)}
                          aria-label={`View photo: ${photo.caption || "Alumni Photo"}`}
                        >
                          <div className="absolute inset-0 bg-black/5 rounded-md transform group-hover:bg-black/0 transition-all duration-300"></div>
                          <img
                            src={photo.imageUrl}
                            alt={photo.caption || "Alumni Photo"}
                            className="w-full h-full object-cover rounded-md shadow-sm"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 rounded-md ring-1 ring-black/5 transform group-hover:ring-[#a50303]/30 transition-all duration-300"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-black/20 to-transparent rounded-b-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.section>
            ))}
          </div>
        )}

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
                className="relative p-4 max-w-6xl w-full max-h-[85vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
                tabIndex={0}
                aria-label="Photo viewer"
              >
                <button
                  className="absolute top-2 right-2 z-50 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                  onClick={closeModal}
                  aria-label="Close photo viewer"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center justify-between w-full h-full">
                  <button
                    className="text-white hover:text-[#a50303] bg-black/30 hover:bg-white/90 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-30 transition-all duration-200 transform hover:scale-105"
                    onClick={prevPhoto}
                    aria-label="Previous photo"
                    disabled={modalIdx === 0}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <div className="mx-3 flex-1 flex justify-center">
                    <img
                      src={allPhotos[modalIdx].imageUrl}
                      alt={allPhotos[modalIdx].caption || "Alumni Photo"}
                      className="max-h-[75vh] max-w-full object-contain rounded-md shadow-xl"
                      loading="eager"
                    />
                    <div className="absolute bottom-3 left-3 text-white bg-black/50 px-2 py-1 rounded text-sm">
                      {allPhotos[modalIdx].sectionTitle}
                    </div>
                  </div>
                  
                  <button
                    className="text-white hover:text-[#a50303] bg-black/30 hover:bg-white/90 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-30 transition-all duration-200 transform hover:scale-105"
                    onClick={nextPhoto}
                    aria-label="Next photo"
                    disabled={modalIdx === allPhotos.length - 1}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="flex space-x-1 px-3 py-1 bg-black/30 backdrop-blur-md rounded-full">
                    {allPhotos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalIdx(idx);
                        }}
                        className={`w-1.5 h-1.5 rounded-full ${
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