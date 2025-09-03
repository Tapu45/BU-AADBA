"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle2 } from "lucide-react"; // Import profile icon

const messages = [
  {
    name: "Dr. Nihar Ranjan Mishra",
    title:
      "President, Alumni Association, Department of Business Administration (Batch: 1988-90)",
    intro:
      "Message from the President, Alumni Association, Department of Business Administration (AADBA)",
    message: `Dear Alumni,
It is with immense pride and joy that I connect with you through this platform. Each one of you is an integral part of the journey and success of our Department of Business Administration. Our alumni are not just former students—they are ambassadors of our values, our culture, and our commitment to excellence.

The Alumni Association is more than a network; it is a family that celebrates our shared memories, fosters lifelong bonds, and opens doors to new opportunities. Together, we can inspire current students, guide future leaders, and create a strong ecosystem of support and collaboration.

I encourage you to remain engaged, reconnect with old friends, and contribute your time, knowledge, and experiences. Every interaction, no matter how small, strengthens the chain that binds us together and creates ripples of inspiration for the next generation.

Let us dream bigger, achieve more, and carry forward the legacy of our department with pride. With your enthusiasm and commitment, I am confident that our Alumni Association will continue to grow as a vibrant and impactful community.

Stay connected. Stay inspired. Stay proud.

With warm regards,

Dr. Nihar Ranjan Mishra
President
Alumni Association
Department of Business Administration
Batch: 1988-90`,
    image: "/assets/leaders/image.png",
    isIcon: false,
  },
  {
    name: "Dr. Jitendra Kumar Sahu",
    title:
      "Secretary, Alumni Association, Department of Business Administration",
    intro:
      "Message from the Secretary, Alumni Association, Department of Business Administration",
    message: `It gives me immense pleasure to extend my warm greetings to all members of the Alumni Association of the Department of Business Administration. Our alumni community is a true reflection of the strength and legacy of this department, carrying forward the values of knowledge, leadership, and integrity into diverse fields across the globe.

The Alumni Association serves as a bridge between past and present, uniting graduates across generations and creating opportunities for meaningful collaboration. Together, we aspire to build a vibrant network that not only celebrates our shared heritage but also contributes to the academic, professional, and social development of our alma mater and its students.

I sincerely believe that active alumni engagement can inspire current students, strengthen industry–academia linkages, and enhance the visibility of our department in today’s competitive world. Let us work collectively to nurture this spirit of belongingness and take our association to greater heights.

I invite each one of you to stay connected, share your achievements, and participate in the activities of the Alumni Association. Your contributions—whether through mentorship, knowledge sharing, or institutional support—will undoubtedly make a lasting impact.

With warm regards,

Secretary
Alumni Association
Department of Business Administration`,
    image: "/assets/executive/jitendra.jpeg", // No image
    isIcon: false, // Use icon
  },
  {
    name: "Dr Sunil Kumar Pradhan",
    title:
      "Coordinator of the Department, Department of Business Administration",
    intro:
      "Message from the Coordinator of the Department, Department of Business Administration",
    message: `Dear Alumni,
It gives me great pleasure to reach out to you through our Alumni Association platform. Over the years, the Department of Business Administration has grown into a vibrant hub of learning, innovation, and leadership—thanks not only to the dedication of our faculty and students but also to the continued support and achievements of our alumni.

You are the true strength and pride of this department. Your accomplishments in diverse fields, your entrepreneurial spirit, and your commitment to excellence continue to inspire our current students and motivate us to strive for higher standards of teaching and research.

The Alumni Association provides a wonderful opportunity to reconnect, to share experiences, and to give back to the community that shaped you. I warmly invite each of you to engage actively—through mentorship, industry collaborations, guest lectures, and by simply being present for your alma mater. Your contributions will help us build stronger bridges between academia and industry and create pathways for our students to excel in their professional journeys.

As we look ahead, I envision a strong and dynamic alumni network that not only celebrates our shared past but also shapes the future of the department. Together, we can create a legacy of knowledge, innovation, and leadership that will stand the test of time.

With warm regards,

Dr Sunil Kumar Pradhan
Coordinator of the Department
Department of Business Administration`,
    image: "/assets/leaders/image copy.png",
    isIcon: false,
  },
];

const slideVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
};

const AUTO_SLIDE_INTERVAL = 4000;

const Messages: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearTimeout(timer);
  }, [index, paused]);

  return (
    <section className="w-full py-14 px-4 bg-white flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#a50303] mb-10 text-center drop-shadow">
        Messages from Our Leadership
      </h2>
      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
        <div
          className="w-full relative min-h-[400px] flex flex-col md:flex-row gap-8 items-stretch justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={messages[index].name}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col md:w-1/3 w-full items-center md:items-start"
            >
              {messages[index].isIcon ? (
                <UserCircle2
                  size={128}
                  className="mb-4 text-[#a50303]/70"
                  strokeWidth={1.5}
                />
              ) : (
                <img
                  src={messages[index].image}
                  alt={messages[index].name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#a50303]/40 shadow-lg"
                />
              )}
              <h3 className="text-xl font-bold text-[#a50303] mb-1 text-center md:text-left">
                {messages[index].name}
              </h3>
              <p className="text-[#a50303] font-medium mb-2 text-center md:text-left">
                {messages[index].title}
              </p>
              <p className="text-gray-700 mb-4 text-center md:text-left">
                {messages[index].intro}
              </p>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={messages[index].message}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white/90 rounded-xl px-8 py-6 shadow text-left md:w-2/3 w-full overflow-y-auto"
              style={{ maxHeight: "340px" }}
            >
              <p className="text-gray-700 whitespace-pre-line">
                {messages[index].message}
              </p>
            </motion.div>
          </AnimatePresence>
          {/* Dots navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {messages.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full border border-[#a50303] ${
                  i === index ? "bg-[#a50303]" : "bg-white"
                }`}
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
