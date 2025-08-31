"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function IndustrialTourHome() {
  const [recentTour, setRecentTour] = useState<Tour | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/admin/industrial")
      .then((res) => res.json())
      .then((tours: Tour[]) => {
        if (tours && tours.length > 0) {
          setRecentTour(tours[0]);
        }
      });
  }, []);

  const photos = recentTour?.photos || [];
  const showArrows = photos.length > 1;

  // Auto-slide logic
  useEffect(() => {
    if (photos.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentPhoto((prev) =>
          prev === photos.length - 1 ? 0 : prev + 1
        );
      }, 3500); // Change slide every 3.5 seconds
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [photos.length]);

  // Manual controls reset auto-slide timer
  const goToPhoto = (idx: number) => {
    setCurrentPhoto(idx);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentPhoto((prev) =>
          prev === photos.length - 1 ? 0 : prev + 1
        );
      }, 3500);
    }
  };

  if (!recentTour) return null;

  return (
    <section className="bg-white rounded-xl p-6 py-8 mb-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-[#a50303] text-center mb-2">
        {recentTour.title} - {recentTour.year}
      </h2>
      <div className="text-center text-gray-500 font-medium mb-4">
        Catch moments of our latest industrial tour.
      </div>
      <div className="relative flex items-center justify-center mb-4">
        {photos.length > 0 ? (
          <div className="w-full max-w-7xl mx-auto">
            <div className="relative">
              <img
                src={photos[currentPhoto].imageUrl}
                alt={photos[currentPhoto].caption || ""}
                className="rounded-xl object-cover w-full h-100 border border-[#eaeaea] shadow"
              />
              {photos[currentPhoto].caption && (
                <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-80 text-center text-sm text-[#a50303] px-2 py-1 rounded-b-xl">
                  {photos[currentPhoto].caption}
                </div>
              )}
              {showArrows && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-[#f8eaea] transition"
                    onClick={() =>
                      goToPhoto(currentPhoto === 0 ? photos.length - 1 : currentPhoto - 1)
                    }
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#a50303]" />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-[#f8eaea] transition"
                    onClick={() =>
                      goToPhoto(currentPhoto === photos.length - 1 ? 0 : currentPhoto + 1)
                    }
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-5 h-5 text-[#a50303]" />
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-center gap-2 mt-2">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentPhoto
                      ? "bg-[#a50303]"
                      : "bg-[#eaeaea]"
                  }`}
                  onClick={() => goToPhoto(idx)}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground text-center py-12">
            No photos available.
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <a
          href="/industrial-tours"
          className="rounded-full bg-[#a50303] text-white px-6 py-2 font-semibold hover:bg-[#c70c0c] transition"
        >
          View All
        </a>
      </div>
    </section>
  );
}