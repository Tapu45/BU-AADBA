"use client"

import React, { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const publications = [
  {
    title: "Alumni Magazine 2025",
    date: "August 2025",
    summary: "Explore inspiring alumni stories, university updates, and expert columns in our annual magazine.",
    link: "/publications/alumni-magazine-2025",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Research Digest",
    date: "July 2025",
    summary: "Discover groundbreaking research and innovations from our alumni and faculty.",
    link: "/publications/research-digest-2025",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Placement Brochure",
    date: "June 2025",
    summary: "See placement highlights, recruiter lists, and student achievements in our latest brochure.",
    link: "/publications/placement-brochure-2025",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Summer Newsletter",
    date: "May 2025",
    summary: "Catch up on campus news, alumni events, and upcoming opportunities in our newsletter.",
    link: "/publications/summer-newsletter-2025",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Alumni Impact Report",
    date: "April 2025",
    summary: "Read about the positive impact our alumni have made in various fields and communities.",
    link: "/publications/alumni-impact-report-2025",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Global Alumni Connect",
    date: "March 2025",
    summary: "Connect with alumni across the globe and share your journey in our new global edition.",
    link: "/publications/global-alumni-connect-2025",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
  },
];

const getVisible = (centerIdx: number) => {
  // Show two left, center, two right (with wrap-around)
  const total = publications.length;
  const idxs = [];
  for (let i = -2; i <= 2; i++) {
    idxs.push((centerIdx + i + total) % total);
  }
  return idxs;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "static",
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    position: "absolute",
  }),
};

const LatestPublications: React.FC = () => {
  const [centerIdx, setCenterIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const visibleIdxs = getVisible(centerIdx);

  const handlePrev = () => {
    setDirection(-1);
    setCenterIdx((i) => (i - 1 + publications.length) % publications.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCenterIdx((i) => (i + 1) % publications.length);
  };

  return (
    <section className="w-full py-6 px-2 bg-white flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#a50303] mb-6 flex items-center gap-2">
        <BookOpen size={28} className="text-[#a50303]" />
        Latest Publications
      </h2>
      <div className="relative w-full flex justify-center items-center mb-4">
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#a50303] text-white rounded-full p-2 shadow hover:bg-[#fbeaea] hover:text-[#a50303] transition"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        {/* Carousel */}
        <div className="flex items-center justify-center gap-3 w-full max-w-5xl relative min-h-[220px]">
          <AnimatePresence initial={false} custom={direction}>
            {visibleIdxs.map((idx, pos) => {
              const pub = publications[idx];
              // Center publication
              if (pos === 2) {
                return (
                  <motion.div
                    key={pub.title}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-white rounded-xl shadow-2xl border-2 border-[#a50303] flex flex-col items-center min-w-[220px] max-w-[260px] scale-105 z-10 transition-all"
                    style={{ boxShadow: "0 8px 32px rgba(165,3,3,0.10)" }}
                  >
                    <img
                      src={pub.image}
                      alt={pub.title}
                      className="w-full h-36 object-cover rounded-t-xl"
                    />
                    <div className="p-4 flex flex-col flex-1 items-center">
                      <h3 className="text-base font-bold text-[#a50303] mb-1 text-center">{pub.title}</h3>
                      <p className="text-[#a50303] text-xs mb-1">{pub.date}</p>
                      <p className="text-gray-700 mb-2 text-center text-sm">{pub.summary}</p>
                      <a
                        href={pub.link}
                        className="mt-auto inline-block bg-[#a50303] text-white px-3 py-1 rounded-lg font-semibold shadow hover:bg-white hover:text-[#a50303] border-2 border-[#a50303] transition text-sm"
                      >
                        Read More
                      </a>
                    </div>
                  </motion.div>
                );
              }
              // Side publications
              return (
                <motion.div
                  key={pub.title}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`bg-white rounded-xl shadow-lg border border-[#fbeaea] flex flex-col items-center min-w-[110px] max-w-[130px] scale-90 opacity-70 transition-all ${
                    pos === 0 || pos === 4 ? "" : ""
                  }`}
                >
                  <img
                    src={pub.image}
                    alt={pub.title}
                    className="w-full h-16 object-cover rounded-t-xl"
                  />
                  <div className="p-2 flex flex-col flex-1 items-center">
                    <h3 className="text-xs font-semibold text-[#a50303] mb-1 text-center">{pub.title}</h3>
                    <p className="text-[#a50303] text-xs mb-1">{pub.date}</p>
                    <a
                      href={pub.link}
                      className="mt-auto inline-block bg-[#a50303] text-white px-2 py-1 rounded font-semibold shadow hover:bg-white hover:text-[#a50303] border border-[#a50303] transition text-xs"
                    >
                      Read More
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#a50303] text-white rounded-full p-2 shadow hover:bg-[#fbeaea] hover:text-[#a50303] transition"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <a
        href="/publications"
        className="mt-2 inline-block bg-[#a50303] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-white hover:text-[#a50303] border-2 border-[#a50303] transition text-sm"
      >
        View More
      </a>
    </section>
  );
};

export default LatestPublications;