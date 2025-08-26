"use client";

import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Target,
  ShieldCheck,
  Crown,
} from "lucide-react";
import { useRef, useState } from "react";





export default function AboutPage() {
  // For anchor navigation highlight (optional)
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLDivElement>(null);

  // Section data for anchor navigation
  const sections = [
    { id: "vision", label: "VISION", icon: ShieldCheck },
    { id: "aims", label: "Aims and Objective", icon: Target },
    { id: "executive", label: "Executive Body", icon: Users },
    {
      id: "certificate",
      label: "Certificate of Registration",
      icon: ShieldCheck,
    },
    { id: "constitution", label: "AABU Constitution 2025", icon: BookOpen }
  ];

  

  return (
    <div className="bg-white min-h-screen text-gray-800 py-19">
      {/* Banner */}
      <div className="max-w-8xl mx-auto">
        <header className="w-full h-40 md:h-60 relative border-b border-gray-200 overflow-hidden rounded-md">
          <img
            src="/assets/alumini/inner-page.jpg"
            alt="About Us Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay only at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-16 md:h-20 bg-gradient-to-t from-[#800000]/60 to-transparent flex items-end px-6 pb-4">
            <span className="text-lg md:text-xl font-semibold text-white drop-shadow-lg">
              Home / About Us
            </span>
          </div>
        </header>
      </div>

      {/* Optional: Anchor navigation at top */}
      <nav className="max-w-9xl px-70 mx-auto px-1 py-4 top-0 z-30 flex items-center px-20">
        <div
          ref={navRef}
          className="overflow-x-auto no-scrollbar flex-1 mx-1"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex gap-4 px-4 py-4 w-max bg-transparent">
            {sections.map((section) => (
              <div
                key={section.id}
                className="relative flex flex-col items-center"
              >
                <a
                  href={`#${section.id}`}
                  className="flex flex-col items-center px-4 py-2 transition-all duration-200 text-[#800000]"
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    whiteSpace: "nowrap",
                    background: "none",
                    borderRadius: 0,
                    fontSize: "1.1rem",
                  }}
                >
                  <section.icon size={28} className="font-bold mb-1" />
                  <span className="font-bold text-base">{section.label}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src="/bg1.png"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        {/* Main content area - all sections in scroll */}
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
          {/* VISION */}
          <section id="vision">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative space-y-8"
            >
              {/* Beautiful Heading */}
              <div className="relative flex items-center gap-3 mb-4 z-10">
                <ShieldCheck size={36} className="text-[#800000] drop-shadow" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#800000] tracking-tight">
                  Our Vision
                </h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-[#800000] via-[#800000]/30 to-transparent rounded-full ml-3" />
              </div>
              <div className="relative rounded-xl p-6 z-10">
                <ul className="list-disc space-y-4 ml-8 text-gray-800 text-base leading-relaxed">
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Global Outreach:
                    </span>{" "}
                    The Association shall support the university's mission by
                    outreaching to its alumni all over the world.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Platform for Interaction:
                    </span>{" "}
                    The Association shall provide a platform for interaction
                    among alumni, current students, parents and friends by:
                    <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700 text-base leading-relaxed">
                      <li>
                        Partnering, engaging and connecting with alumni in the
                        development and progress of the university.
                      </li>
                      <li>
                        Encouraging alumni to contribute to the overall growth
                        of the university through academic, intellectual,
                        research, finance, endowments, scholarships and
                        internships as well as help students in placement for
                        jobs, higher studies etc.
                      </li>
                      <li>
                        Providing and promoting opportunities for volunteer
                        engagement, professional association and career
                        development, leadership, and fellowship among alumni and
                        students.
                      </li>
                      <li>
                        Making alumni a partner in significant decision making
                        for development of the university.
                      </li>
                      <li>
                        Providing opportunities and possible university space,
                        resources and intellect for establishment of joint
                        innovation/incubation centres.
                      </li>
                      <li>
                        Promoting/publishing research activities and
                        achievements of the alumni through exhibitions /
                        newsletters etc.
                      </li>
                      <li>
                        Promotion of academic or educational activities by
                        organizing or sponsoring seminars, guest lecturers etc.
                      </li>
                      <li>
                        Promotion of cultural, recreational and social
                        activities beneficial to the members and to the society
                        at large.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </motion.div>
          </section>

          {/* Aims and Objective */}
          <section id="aims">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Beautiful Heading */}
              <div className="flex items-center gap-3 mb-4">
                <Target size={36} className="text-[#800000] drop-shadow" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#800000] tracking-tight">
                  Aims & Objectives
                </h2>
                <div className="flex-1 h-1   rounded-full ml-3" />
              </div>
              <div className=" rounded-xl p-6">
                <ul className="list-disc space-y-4 ml-8 text-gray-800 text-base leading-relaxed">
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Career Guidance:
                    </span>{" "}
                    Providing career guidance to the continuing/fresh
                    Post-Graduate students of Berhampur University and inspiring
                    and motivating students to do well in life.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Funding Excellence:
                    </span>{" "}
                    Funding to create special centres of Excellence etc., may be
                    to be named as per the alumni's wish.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Support Activities:
                    </span>{" "}
                    Undertaking any other necessary activity that is incidental
                    to or conducive to the attainment of any or all of the
                    abovementioned objectives useful to the members as well as
                    those for enhancing the reputation / image of the
                    university.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Service to Society:
                    </span>{" "}
                    Lending/rendering service to the society through
                    establishment of institutions such as community centres,
                    senior citizen homes or any other organization/activity
                    beneficial to society at large.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Formation of Chapters:
                    </span>{" "}
                    Facilitating formation of chapters of The Association at
                    various locations in the country and overseas.
                  </li>
                  <li>
                    <span className="font-semibold text-[#800000]">
                      Employment & Research:
                    </span>{" "}
                    Facilitating employment/campus placement for the students
                    graduating from University, through the good offices of the
                    alumni; alumni may also fund a research scholar's education,
                    trips in India and abroad related to academic and research.
                    They may also create specific Professorial Chairs for 1-3
                    years duration with funding.
                  </li>
                </ul>
              </div>
            </motion.div>
          </section>

          {/* Executive Body */}
          <section id="executive">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Crown size={36} className="text-[#800000] drop-shadow" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#800000] tracking-tight">
                  Executive Body
                </h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-[#800000] via-[#800000]/30 to-transparent rounded-full ml-3" />
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    role: "President",
                    name: "Dr. Nihar Ranjan Misra",
                    years: "1988-1990",
                    img: "https://randomuser.me/api/portraits/men/32.jpg",
                  },
                  {
                    role: "Vice President",
                    name: "M Dhananjaya Reddy",
                    years: "1999-2001",
                    img: "https://randomuser.me/api/portraits/men/33.jpg",
                  },
                  {
                    role: "Secretary",
                    name: "Jitendra Kumar Sahoo",
                    years: "2013-15",
                    img: "https://randomuser.me/api/portraits/men/34.jpg",
                  },
                  {
                    role: "Joint Secretary",
                    name: "Mr. Kiran Patra",
                    years: "2023-25",
                    img: "https://randomuser.me/api/portraits/men/35.jpg",
                  },
                  {
                    role: "Treasurer",
                    name: "Head/Coordinator of the Department of Business Administration",
                    years: "",
                    img: "https://randomuser.me/api/portraits/men/36.jpg",
                  },
                ].map((member) => (
                  <div
                    key={member.role}
                    className="bg-white border border-gray-200 rounded-md p-5 flex flex-col items-center text-center shadow"
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover mb-3 border border-[#800000]"
                    />
                    <h4 className="text-md font-bold text-[#800000]">
                      {member.role}
                    </h4>
                    <p className="font-semibold text-gray-800">{member.name}</p>
                    {member.years && (
                      <p className="text-sm mt-1 text-gray-600">
                        {member.years}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-bold text-[#800000] mb-4">
                Executive Body Members
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Faculty-in-Charge, Placement Cell of the Department",
                    img: "https://randomuser.me/api/portraits/men/37.jpg",
                  },
                  {
                    name: "Dr. Sharada Prasad Sahoo, Faculty Member",
                    img: "https://randomuser.me/api/portraits/men/38.jpg",
                  },
                  {
                    name: "Dr. Biswajit Prasad Chhatoi, Faculty Member",
                    img: "https://randomuser.me/api/portraits/men/39.jpg",
                  },
                  {
                    name: "Dr. Saroj Kumar Dash (2002-04)",
                    img: "https://randomuser.me/api/portraits/men/40.jpg",
                  },
                  {
                    name: "Mr. Nihar Ranjan Nayak (1992-94)",
                    img: "https://randomuser.me/api/portraits/men/41.jpg",
                  },
                  {
                    name: "Mr. Alok Kumar Patra (2003-05)",
                    img: "https://randomuser.me/api/portraits/men/42.jpg",
                  },
                  {
                    name: "Mr. Ashyashree Praharaj (2016-18)",
                    img: "https://randomuser.me/api/portraits/men/43.jpg",
                  },
                  {
                    name: "Dr. Chandra Sekhar Pattanayak (1990-92)",
                    img: "https://randomuser.me/api/portraits/men/44.jpg",
                  },
                  {
                    name: "Dr. Sitanath Raiguru (2007-09)",
                    img: "https://randomuser.me/api/portraits/men/45.jpg",
                  },
                  {
                    name: "Dr. Apoorva Behera (2021)",
                    img: "https://randomuser.me/api/portraits/women/46.jpg",
                  },
                ].map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-md p-4 flex items-center gap-4 shadow"
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover border border-[#800000]"
                    />
                    <span className="font-semibold text-gray-800">
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Certificate of Registration */}
          <section id="certificate">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={32} className="text-[#800000]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#800000]">
                  Certificate of Registration
                </h2>
              </div>
              <p className="text-gray-700 mb-2">
                View the official registration certificate of the Alumni
                Association of Berhampur University:
              </p>
              <a
                href="https://buodisha.edu.in/wp-content/uploads/2023/11/1700046036.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#800000] text-white px-5 py-2 rounded font-semibold shadow hover:bg-[#800000]/90 transition"
              >
                View Certificate (PDF)
              </a>
            </motion.div>
          </section>

          {/* AABU Constitution 2025 */}
          <section id="constitution">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={32} className="text-[#800000]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#800000]">
                  AABU Constitution 2025
                </h2>
              </div>
              <p className="text-gray-700 mb-2">
                View the official AABU Constitution document:
              </p>
              <a
                href="https://buodisha.edu.in/wp-content/uploads/2025/04/Minutes-of-the-General-Body-meeting-held-on-05.01.2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#800000] text-white px-5 py-2 rounded font-semibold shadow hover:bg-[#800000]/90 transition"
              >
                View Constitution (PDF)
              </a>
            </motion.div>
          </section>

        </div>
      </div>
    </div>
  );
}
