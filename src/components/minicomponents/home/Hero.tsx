"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../Layout/Navbar";

const Hero: React.FC = () => {
  // Array of background images
  const images = [
    "/Bu3.jpg",
    "/assets/events/past4.jpg", // Add your additional image paths here
    "/assets/alumini/inner-page.jpg",
    "/assets/events/IMG.jpg",
    "/assets/I_love_odisha.jpg",
    "/assets/National-Flag-1.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setImageOpacity(0);
      // After fade out, change image and fade in
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setImageOpacity(1);
      }, 500); // Half of transition time
    }, 9000); // Change image every 9 seconds

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

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content moved to bottom right */}
      <div className="relative z-10 flex flex-1 items-end justify-end text-right px-8 pb-12">
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            AFTER THE HILLTOP
          </h1>
          <p className="text-lg md:text-2xl text-white mb-4 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            BU alumni are changing the world or, at least, making it a little bit better, one graduate at a time.<br />
            <span className="underline text-blue-200 cursor-pointer hover:text-blue-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            
            </span> Explore how life unfolds beyond the Hilltop.
          </p>
        </div>
      </div>
      <Navbar />
    </section>
  );
};

export default Hero;