"use client";

import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

const Hero: React.FC = () => {
  const images = [
    "/Bu3.jpg",
    "/assets/events/past4.jpg",
    "/assets/alumini/inner-page.jpg",
    "/assets/events/IMG.jpg",
    "/assets/I_love_odisha.jpg",
    "/assets/National-Flag-1.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [isLineAnimating, setIsLineAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start line animation
      setIsLineAnimating(true);
      
      // Fade out current image
      setImageOpacity(0);
      
      // After fade out, change image and fade in
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setImageOpacity(1);
        // Reset line animation
        setIsLineAnimating(false);
      }, 500);
    }, 9000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full h-screen flex flex-col">
      {/* Background Image with Smooth Transition */}
      <div className="absolute inset-0">
        <img
          src={images[currentImageIndex]}
          alt="Hero Background"
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: imageOpacity }}
        />
      </div>

      {/* Clean Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Animated Top Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500"
          initial={{ x: "-100%" }}
          animate={{ x: isLineAnimating ? "100%" : "-100%" }}
          transition={{
            duration: 9,
            ease: "linear",
          }}
        />
      </div>

      {/* Content with Clean Styling */}
      <div className="relative z-10 flex flex-1 items-end justify-end text-right px-8 pb-12">
        <div className="max-w-2xl">
          {/* Simple Accent Line */}
          <div className="w-20 h-0.5 bg-yellow-500 mb-6 ml-auto" />
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            AFTER THE HILLTOP
          </h1>
          
          {/* Clean Description */}
          <div className="space-y-3">
            <p className="text-lg md:text-2xl text-white mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              BU alumni are changing the world or, at least, making it a little bit better, one graduate at a time.
            </p>
            <p className="text-lg md:text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Explore how life unfolds beyond the Hilltop.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500"
          initial={{ x: "-100%" }}
          animate={{ x: isLineAnimating ? "100%" : "-100%" }}
          transition={{
            duration: 9,
            ease: "linear",
          }}
        />
      </div>

   
    </section>
  );
};

export default Hero;