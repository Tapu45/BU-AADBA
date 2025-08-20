"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, ShieldCheck } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const features = [
  {
    icon: <Users size={32} className="text-white mb-2" />,
    title: "Connect & Collaborate",
    desc: "Join a thriving network of alumni, students, and faculty to share ideas and opportunities.",
  },
  {
    icon: <BookOpen size={32} className="text-white mb-2" />,
    title: "Grow & Inspire",
    desc: "Access exclusive resources, mentorship, and events to fuel your personal and professional growth.",
  },
  {
    icon: <ShieldCheck size={32} className="text-white mb-2" />,
    title: "Support & Celebrate",
    desc: "We champion your achievements and provide support every step of your journey.",
  },
];

const AboutusPreview: React.FC = () => (
  <section className="w-full py-16 px-4 flex flex-col items-center bg-gradient-to-b from-white to-[#fbeaea]">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      className="max-w-3xl text-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#a50303] mb-6 drop-shadow">
        Welcome to Our Alumni Family
      </h2>
      <p className="text-lg md:text-xl text-gray-700 mb-10">
        Our Alumni Association is more than a network—it&apos;s a vibrant
        community where lifelong friendships are forged, careers are nurtured,
        and every achievement is celebrated. Together, we empower each other to
        reach new heights.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
        {features.map((feature, idx) => (
          <div
            key={feature.title}
            className="flex-1 bg-[#a50303] rounded-xl shadow-lg px-6 py-8 flex flex-col items-center transition hover:scale-105"
          >
            {feature.icon}
            <span className="text-white font-semibold text-lg mb-2">
              {feature.title}
            </span>
            <p className="text-white text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
      <a
        href="/about"
        className="inline-block bg-white text-[#a50303] border-2 border-[#a50303] px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#a50303] hover:text-white transition"
      >
        Discover More
      </a>
    </motion.div>
  </section>
);

export default AboutusPreview;
