"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  CalendarDays,
  HeartHandshake,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const links = [
  {
    title: "Membership",
    icon: <Users size={32} className="text-[#a50303]" />,
    href: "/membership",
    desc: "Become a member and enjoy exclusive alumni benefits.",
  },
  {
    title: "Events",
    icon: <CalendarDays size={32} className="text-[#a50303]" />,
    href: "/events",
    desc: "Stay updated with upcoming alumni events and reunions.",
  },
  {
    title: "Donate",
    icon: <HeartHandshake size={32} className="text-[#a50303]" />,
    href: "/donate",
    desc: "Support your alma mater and make a difference.",
  },
  {
    title: "Alumni Directory",
    icon: <BookOpen size={32} className="text-[#a50303]" />,
    href: "/directory",
    desc: "Connect with fellow alumni through our directory.",
  },
];

const noiseBg = "/no.png";

type NewspaperClipping = {
  id: string;
  title: string;
  imageUrl: string;
};

const QuickLinks: React.FC = () => {
  const [clippings, setClippings] = useState<NewspaperClipping[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch clippings
    const fetchClippings = async () => {
      try {
        const res = await fetch("/api/newspapper");
        const data = await res.json();
        if (Array.isArray(data)) {
          setClippings(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchClippings();
  }, []);

  useEffect(() => {
    if (clippings.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clippings.length);
    }, 5000); // 5 seconds interval
    return () => clearInterval(interval);
  }, [clippings.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % clippings.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + clippings.length) % clippings.length);
  };

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <section
      className="w-full py-6 px-4"
      style={{
        backgroundColor: "#fff",
        backgroundImage: `url(${noiseBg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Removed single top title and placed titles inside each column to align tops */}
        <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
          {/* Left: Quick Links Column */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#a50303] mb-6">
              Quick Links
            </h2>

            <div className="transform -translate-x-1 lg:-translate-x-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {links.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center hover:shadow-md transition"
                  >
                    {link.icon}
                    <span className="text-[#a50303] font-bold text-lg mt-3 mb-2">
                      {link.title}
                    </span>
                    <p className="text-gray-700 text-center">{link.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Newspaper Slideshow Column */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#a50303] mb-6">
              Newspaper Clippings
            </h2>

            <div className="flex flex-col items-center">
              {clippings.length > 0 ? (
                <div className="relative w-full max-w-3xl">
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={clippings[currentIndex].imageUrl}
                      alt={clippings[currentIndex].title}
                      className="w-full h-80 md:h-96 object-cover cursor-pointer"
                      onClick={() =>
                        openModal(clippings[currentIndex].imageUrl)
                      }
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                      <p className="text-sm md:text-base font-medium">
                        {clippings[currentIndex].title}
                      </p>
                    </div>
                  </div>

                  {/* Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-[#a50303] text-white rounded-full p-2 hover:bg-[#c70c0c] transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#a50303] text-white rounded-full p-2 hover:bg-[#c70c0c] transition"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Indicators */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {clippings.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentIndex
                            ? "bg-[#a50303]"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-3xl h-80 md:h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">No clippings available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Full Image */}
      {showModal && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-auto">
            <img
              src={selectedImage}
              alt="Newspaper Clipping"
              className="w-full max-h-[70vh] rounded-lg object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-[#a50303] text-white rounded-full p-2 hover:bg-[#c70c0c] transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuickLinks;
