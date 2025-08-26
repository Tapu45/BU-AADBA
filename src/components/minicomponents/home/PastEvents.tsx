"use client";

import React, { useEffect, useState } from "react";

const events = [
  {
    image: "/assets/alumini/alumini1.jpeg",
    caption: "Alumni Meet – Cherished moments and reunions.",
  },
  {
    image: "/assets/alumini/alumini2.jpeg",
    caption: "Networking Session – Building connections for the future.",
  },
  {
    image: "/assets/alumini/alumini3.jpeg",
    caption: "Panel Discussion – Alumni sharing their experiences.",
  },
  {
    image: "/assets/alumini/alumini4.jpeg",
    caption: "Group Photo – Celebrating togetherness.",
  },
  {
    image: "/assets/alumini/alumini5.jpg",
    caption: "Sports Event – Alumni and students in action.",
  },
  {
    image: "/assets/alumini/alumini6.jpeg",
    caption: "Cultural Fest – Showcasing talent and heritage.",
  },
  {
    image: "/assets/alumini/alumini7.jpeg",
    caption: "Mentorship Program – Guiding the next generation.",
  },
  {
    image: "/assets/alumini/alumini8.jpeg",
    caption: "Award Ceremony – Honoring achievements.",
  },
  {
    image: "/assets/alumini/alumini9.jpeg",
    caption: "Interactive Workshop – Learning and growing together.",
  },
  {
    image: "/assets/alumini/alumini10.jpeg",
    caption: "Farewell Event – Memories to last a lifetime.",
  },
];

const AUTO_SLIDE_INTERVAL = 3500;

const PastEvents: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section className="max-w-10xl py-8 px-0 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#a50303] mb-2 text-center">
        Past Events
      </h2>
      <p className="text-gray-700 text-center mb-6 max-w-2xl">
        Relive some of our most memorable alumni gatherings, sports days, and
        cultural celebrations.
      </p>
     <div className="relative w-full max-w-7xl h-[340px] md:h-[420px] mx-auto overflow-hidden rounded-xl shadow-lg">
        <img
          src={events[index].image}
          alt={events[index].caption}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 z-10"
        />
        {/* Caption Layer - always visible for current image */}
        <div
          className="absolute bottom-0 left-0 w-full px-6 py-4 text-white text-lg font-semibold rounded-b-xl pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.3) 100%)",
          }}
        >
          {events[index].caption}
        </div>
        {/* Dots navigation */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {events.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full border border-white ${
                i === index ? "bg-[#a50303]" : "bg-white/60"
              }`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEvents;
