"use client";

import React, { useEffect, useState } from "react";

const events = [
  {
    image: "/assets/flyers/1.jpeg",
    caption: "",
  },
  {
    image: "/assets/flyers/2.jpeg",
    caption: "",
  },
  {
    image: "/assets/flyers/image.png",
    caption: "",
  },
 
 
];

const AUTO_SLIDE_INTERVAL = 4000;

const PastEvents: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section className="w-full py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
            Past Events
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Relive some of our most memorable alumni gatherings, sports days, and
            cultural celebrations that have shaped our community.
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative">
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-xl">
            <img
              src={events[index].image}
              alt={events[index].caption}
              className="w-full h-full object-cover transition-all duration-1000 ease-out"
            />
            
            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20 pb-6 px-8">
              <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight">
                {events[index].caption}
              </h3>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {events.map((_, i) => (
              <button
                key={i}
                className={`transition-all duration-300 ${
                  i === index 
                    ? "w-8 h-3 bg-red-800 rounded-full" 
                    : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400"
                }`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-red-800 h-1 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${((index + 1) / events.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Event Counter */}
        <div className="text-center mt-8">
          <span className="text-sm text-gray-500 font-medium">
            {index + 1} of {events.length} events
          </span>
        </div>
      </div>
    </section>
  );
};

export default PastEvents;