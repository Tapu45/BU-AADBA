"use client"

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  {
    name: "Dr. Priya Sharma",
    title: "Alumni Association President",
    message:
      "Welcome to our alumni family! Together, we build bridges between generations and foster lifelong connections.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2",
  },
  {
    name: "Mr. Rajesh Kumar",
    title: "Alumni Association Secretary",
    message:
      "Our mission is to support your growth and celebrate your achievements. Stay engaged and inspire others.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2",
  },
  {
    name: "Prof. Anjali Verma",
    title: "University Vice-Chancellor",
    message:
      "Alumni are the pride of our university. Your success stories motivate our students and faculty every day.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&h=256&facepad=2",
  },
  {
    name: "Dr. Amitabh Singh",
    title: "Dean of Students",
    message:
      "We encourage you to participate in events and contribute to the university’s growth and excellence.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2",
  },
];

const slideVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
};

const AUTO_SLIDE_INTERVAL = 4000;

const quote = `“Alumni are the living ambassadors of our legacy. Every story, every achievement, every connection strengthens our community.”`;

const Messages: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section className="w-full py-14 px-4 bg-white flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#a50303] mb-10 text-center drop-shadow">
        Messages from Our Leadership
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto">
        {/* Quote Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-4 mb-10 md:mb-0">
          <blockquote className="text-2xl md:text-3xl font-semibold text-[#a50303] mb-6 leading-relaxed">
            {quote}
          </blockquote>
          <div className="text-gray-500 text-lg">
            <span>— Alumni Association</span>
          </div>
        </div>
        {/* Carousel Section */}
        <div className="md:w-1/2 w-full relative h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={messages[index].name}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full h-full flex flex-col items-center justify-center"
            >
              <img
                src={messages[index].image}
                alt={messages[index].name}
                className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-[#a50303]/40 shadow-lg"
              />
              <div className="bg-white/90 rounded-xl px-6 py-4 shadow text-center max-w-md">
                <h3 className="text-xl font-bold text-[#a50303] mb-1">{messages[index].name}</h3>
                <p className="text-[#a50303] font-medium mb-2">{messages[index].title}</p>
                <p className="text-gray-700">{messages[index].message}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Dots navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {messages.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full border border-[#a50303] ${i === index ? "bg-[#a50303]" : "bg-white"}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;