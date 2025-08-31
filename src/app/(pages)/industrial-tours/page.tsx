"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ChevronLeft, ChevronRight, X } from "lucide-react";

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

export default function IndustrialToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    fetch("/api/admin/industrial")
      .then((res) => res.json())
      .then((data: Tour[]) => {
        setTours(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openModal = (tour: Tour) => {
    setSelectedTour(tour);
    setCurrentPhoto(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTour(null);
  };

  const nextPhoto = () => {
    if (selectedTour) {
      setCurrentPhoto((prev) =>
        prev === selectedTour.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedTour) {
      setCurrentPhoto((prev) =>
        prev === 0 ? selectedTour.photos.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f8fa] px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a50303] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading tours...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8fa] px-4 py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#a50303] mb-4 flex items-center justify-center gap-2">
            <MapPin className="w-8 h-8" /> Industrial Tours
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our industrial tours and see the experiences our students have had.
          </p>
        </header>

        {tours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tours available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <motion.section
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-[#eaeaea] p-4 shadow hover:shadow-lg transition"
              >
                {/* Tour Header: Name - Year */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#a50303]">
                    {tour.title}
                  </h2>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{tour.year}</span>
                  </div>
                </div>

                {/* Cover Image */}
                {tour.coverImage && (
                  <img
                    src={tour.coverImage}
                    alt={tour.title}
                    className="w-full h-40 object-cover rounded-lg border border-[#eaeaea] shadow mb-4"
                  />
                )}

                {/* Tiny Photo Previews */}
                {tour.photos.length > 0 && (
                  <div className="flex gap-1 overflow-hidden">
                    {tour.photos.slice(0, 5).map((photo, idx) => (
                      <div
                        key={idx}
                        className="relative w-12 h-12 rounded overflow-hidden border border-[#eaeaea] cursor-pointer hover:opacity-80 transition"
                        onClick={() => openModal(tour)}
                      >
                        <img
                          src={photo.imageUrl}
                          alt={photo.caption || ""}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {tour.photos.length > 5 && (
                      <div
                        className="w-12 h-12 rounded border border-[#eaeaea] bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
                        onClick={() => openModal(tour)}
                      >
                        <span className="text-[#a50303] text-xs font-semibold">
                          +{tour.photos.length - 5}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        )}
      </motion.div>

      {/* Modal for Photo Carousel */}
      <AnimatePresence>
        {modalOpen && selectedTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-4xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-[#a50303] hover:text-[#c70c0c] transition"
                onClick={closeModal}
                aria-label="Close Modal"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold text-[#a50303] mb-4 text-center">
                {selectedTour.title} Photos
              </h3>
              <div className="relative">
                <img
                  src={selectedTour.photos[currentPhoto].imageUrl}
                  alt={selectedTour.photos[currentPhoto].caption || ""}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {selectedTour.photos[currentPhoto].caption && (
                  <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 text-center text-sm text-[#a50303] px-4 py-2 rounded-b-lg">
                    {selectedTour.photos[currentPhoto].caption}
                  </div>
                )}
                {selectedTour.photos.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-[#f8eaea] transition"
                      onClick={prevPhoto}
                      aria-label="Previous Photo"
                    >
                      <ChevronLeft className="w-6 h-6 text-[#a50303]" />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-[#f8eaea] transition"
                      onClick={nextPhoto}
                      aria-label="Next Photo"
                    >
                      <ChevronRight className="w-6 h-6 text-[#a50303]" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {selectedTour.photos.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentPhoto ? "bg-[#a50303]" : "bg-[#eaeaea]"
                    }`}
                    onClick={() => setCurrentPhoto(idx)}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
     </AnimatePresence>
    </main>
  );
}