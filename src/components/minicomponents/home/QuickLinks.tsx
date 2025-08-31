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
  ArrowRight,
} from "lucide-react";

const links = [
  {
    title: "Membership",
    icon: <Users size={28} className="text-red-800" />,
    href: "/membership",
    desc: "Become a member and enjoy exclusive alumni benefits.",
    color: "from-red-800 to-red-700",
  },
  {
    title: "Events",
    icon: <CalendarDays size={28} className="text-red-800" />,
    href: "/events",
    desc: "Stay updated with upcoming alumni events and reunions.",
    color: "from-red-800 to-red-700",
  },
  {
    title: "Donate",
    icon: <HeartHandshake size={28} className="text-red-800" />,
    href: "/donate",
    desc: "Support your alma mater and make a difference.",
    color: "from-red-800 to-red-700",
  },
  {
    title: "Alumni Directory",
    icon: <BookOpen size={28} className="text-red-800" />,
    href: "/directory",
    desc: "Connect with fellow alumni through our directory.",
    color: "from-red-800 to-red-700",
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
    }, 5000);
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
    className="w-full py-8 px-6 relative overflow-hidden"
    style={{
      backgroundColor: "#fff",
      backgroundImage: `url(${noiseBg})`,
      backgroundRepeat: "repeat",
      backgroundSize: "auto",
    }}
  >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Quick Links
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 w-full items-start">
          {/* Left: Quick Links Column */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {links.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="group relative  rounded-xl  p-8 hover:shadow-xl hover:border-yellow-200 transition-all duration-300 "
                >
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-red-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors duration-300">
                      {React.cloneElement(link.icon, {
                        className: "text-white",
                      })}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-800 transition-colors duration-300">
                      {link.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {link.desc}
                    </p>

                    {/* Arrow Icon */}
                    <div className="flex items-center text-red-800 font-medium text-sm group-hover:text-red-700 transition-colors duration-300">
                      Learn More
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Newspaper Slideshow Column */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Media Coverage
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 bg-gray-100 hover:bg-red-800 hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 bg-gray-100 hover:bg-red-800 hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {clippings.length > 0 ? (
                <div className="relative">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={clippings[currentIndex].imageUrl}
                      alt={clippings[currentIndex].title}
                      className="w-full h-80 object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                      onClick={() =>
                        openModal(clippings[currentIndex].imageUrl)
                      }
                    />

                    {/* Overlay with title */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                      <h4 className="text-white font-semibold text-lg">
                        {clippings[currentIndex].title}
                      </h4>
                    </div>
                  </div>

                  {/* Indicators */}
                  <div className="flex justify-center mt-6 space-x-3">
                    {clippings.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? "bg-red-800 w-8"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen
                      size={48}
                      className="text-gray-400 mx-auto mb-4"
                    />
                    <p className="text-gray-500 font-medium">
                      No media coverage available
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Newspaper Clipping"
              className="w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
            />
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 w-12 h-12 bg-red-800 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg"
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
