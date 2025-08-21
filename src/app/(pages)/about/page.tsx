"use client";

import { motion } from "framer-motion";
import { SetStateAction, useState } from "react";
import {
  Users,
  BookOpen,
  Target,
  ShieldCheck,
  Crown,
  Image as ImageIcon,
} from "lucide-react";

const carouselImages = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
  "/images/photo4.jpg",
  "/images/photo5.jpg",
  "/images/photo6.jpg",
  "/images/photo7.jpg",
  "/images/photo8.jpg",
  "/images/photo9.jpg",
  "/images/photo10.jpg",
  "/images/photo11.jpg",
];

const executiveBody = [
  {
    role: "President",
    name: "Dr. Priya Sharma",
    bio: "Leading the alumni association with a vision for growth and engagement.",
    img: "/images/president.jpg",
  },
  {
    role: "Secretary",
    name: "Mr. Rahul Verma",
    bio: "Ensuring smooth operations and communication among alumni.",
    img: "/images/secretary.jpg",
  },
  {
    role: "Committee Member",
    name: "Ms. Anjali Das",
    bio: "Driving initiatives and supporting alumni activities.",
    img: "/images/committee1.jpg",
  },
];

const departments = [
  {
    name: "Computer Science",
    hod: "Dr. S. Kumar",
    message: "Empowering students with cutting-edge technology and research.",
  },
  {
    name: "Mechanical Engineering",
    hod: "Prof. R. Singh",
    message: "Fostering innovation and practical skills for future engineers.",
  },
];

const sidebarLinks = [
  { id: "vision", label: "VISION", icon: ShieldCheck },
  { id: "aims", label: "Aims and Objective", icon: Target },
  { id: "certificate", label: "Certificate of Registration", icon: BookOpen },
  { id: "constitution", label: "AABU Constitution 2025", icon: BookOpen },
  { id: "officebearers", label: "Office bearers", icon: Crown },
  { id: "executive", label: "Executive body members", icon: Users },
  { id: "lifemembers", label: "List of Life Members", icon: Users },
  { id: "minutes", label: "Minutes", icon: BookOpen },
  { id: "enews", label: "E-News Letters", icon: ImageIcon },
  { id: "souvenir", label: "Souvenir 2025", icon: ImageIcon },
  { id: "registration", label: "Registration", icon: ShieldCheck },
];

function PhotoCarousel() {
  return (
    <div className="w-full max-w-full flex overflow-x-auto gap-4 py-4 no-scrollbar">
      {carouselImages.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Alumni event ${idx + 1}`}
          className="h-40 w-64 max-w-xs object-cover rounded-md border border-gray-200 flex-shrink-0 hover:border-[#800000] transition-all duration-200"
          style={{ minWidth: "180px" }}
        />
      ))}
    </div>
  );
}

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("vision");

  const handleSectionChange = (id: SetStateAction<string>) => {
    setActiveSection(id);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "vision":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-semibold text-[#800000] mb-4">VISION</h2>
              <div className="space-y-4 ml-4">
                <div>
                  <p className="text-gray-800 mb-2">1. The Association shall support the university's mission by outreaching to its alumni all over the world.</p>
                  <p className="text-gray-800 mb-4">2. The Association shall provide a platform for interaction among alumni, current students, parents and friends by:</p>
                </div>
                
                <ul className="list-disc space-y-3 ml-8 text-gray-700">
                  <li>partnering, engaging and connecting with alumni in the development and progress of the university.</li>
                  <li>encouraging alumni to contribute to the overall growth of the university through academic, intellectual, research, finance, endowments, scholarships and internships as well as help students in placement for jobs, higher studies etc.</li>
                  <li>providing and promoting opportunities for volunteer engagement, professional association and career development, leadership, and fellowship among alumni and students.</li>
                  <li>making alumni a partner in significant decision making for development of the university.</li>
                  <li>providing opportunities and possible university space, resources and intellect for establishment of joint innovation/incubation centres.</li>
                  <li>promoting/publishing research activities and achievements of the alumni through exhibitions / newsletters etc.</li>
                  <li>promotion of academic or educational activities by organizing or sponsoring seminars, guest lecturers etc.</li>
                  <li>promotion of cultural, recreational and social activities beneficial to the members and to the society at large.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        );
      
      case "aims":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-semibold text-[#800000] mb-4">Aims and Objective</h2>
              <div className="space-y-4 ml-4">
                <ul className="list-disc space-y-3 ml-4 text-gray-700">
                  <li>providing career guidance to the continuing/fresh Post-Graduate students of Berhampur University and in inspiring and motivating students to do well in life.</li>
                  <li>funding to create special centres of Excellence etc., may be to be named as per the alumni's wish.</li>
                  <li>undertaking any other necessary activity that is incidental to or conducive to the attainment of any or all of the abovementioned objectives useful to the members as well as those for enhancing the reputation / image of the university.</li>
                  <li>lending/rendering service to the society through establishment of institutions such as community centres, senior citizen homes or any other organization/activity beneficial to society at large.</li>
                  <li>facilitating formation of chapters of The Association at various locations in the country and overseas.</li>
                  <li>facilitating employment/campus placement for the students graduating from University, through the good offices of the alumni; alumni may also fund a research scholar's education, trips in India and abroad related to academic and research. They may also create specific Professorial Chairs for 1-3 years duration with funding.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        );
      
      case "about":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-[#800000] mb-4">About AABU</h2>
            <p className="text-gray-700 leading-relaxed">
              Creating an engaged, supportive alumni network is crucial to
              an institution's success. Berhampur University (BU) is proud
              to have as its alumni across the globe in the form of social
              scientists, scientists, civil servants, literary critics,
              media experts, foreign language experts, journalists,
              political leaders, social activists, technologists, managers
              and entrepreneurs over the last fifty five years.
            </p>
          </motion.div>
        );
      
      case "history":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-[#800000] mb-4">History & Overview</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Alumni Association of Berhampur University (AABU) aims to
                foster stronger relations between its alumni and others
                connected with the University. Berhampur University recognizes
                its alumni as important stakeholders in its continuing quest
                to provide excellent education. It realizes the enormous
                benefits that can come from the engagement and support of its
                alumni who have considerable expertise in many areas and can
                help identify strategic directions for BU in the 21st century.
              </p>
              <p className="text-gray-700">
                The University had decided to award each year one or more
                proficient Alumni as Distinguished Alumnus of Berhampur
                University on 'Foundation Day' of the University. Sri. Satya
                Sundar Tripathy, UNO Assistant Secretary General, New York,
                USA was conferred with the 1st Distinguished Alumnus Award on
                2nd January, 2020 on the occasion of the 54th Foundation Day
                of the University. Subsequently, Prof. Ashok Kumar Mahapatra
                and Prof. Arun Kumar Pati were conferred with the
                Distinguished Alumnus Award on 2nd January, 2021.
              </p>
            </div>
          </motion.div>
        );
      
      case "photos":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-[#800000] mb-4">Alumni Moments</h2>
            <div className="bg-white rounded-md border border-gray-200 p-4">
              <PhotoCarousel />
            </div>
          </motion.div>
        );
      
      case "departments":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-[#800000] mb-4">Department Profiles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  className="bg-gray-50 rounded-md p-5 border border-gray-200"
                >
                  <h4 className="text-lg font-bold text-[#800000]">
                    {dept.name}
                  </h4>
                  <p className="mt-2 text-[#800000]/80 font-medium">
                    HOD: {dept.hod}
                  </p>
                  <p className="mt-2 text-gray-700">{dept.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "executive":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-[#800000] mb-4">Executive Body</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {executiveBody.map((member) => (
                <div
                  key={member.role}
                  className="bg-white border border-gray-200 rounded-md p-5 flex flex-col items-center text-center"
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
                  <p className="text-sm mt-2 text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
        case "certificate":
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-semibold text-[#800000] mb-4">Certificate of Registration</h2>
      <p className="text-gray-700">Content coming soon.</p>
    </motion.div>
  );
case "constitution":
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-semibold text-[#800000] mb-4">AABU Constitution 2025</h2>
      <p className="text-gray-700">Content coming soon.</p>
    </motion.div>
  );
case "officebearers":
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-semibold text-[#800000] mb-4">Office bearers</h2>
      <p className="text-gray-700">Content coming soon.</p>
    </motion.div>
  );
case "lifemembers":
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-semibold text-[#800000] mb-4">List of Life Members</h2>
      <p className="text-gray-700">Content coming soon.</p>
    </motion.div>
  );
case "minutes":
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-semibold text-[#800000] mb-4">Minutes</h2>
      <p className="text-gray-700">Content coming soon.</p>
    </motion.div>
  );
case "enews":
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-semibold text-[#800000] mb-4">E-News Letters</h2>
      <p className="text-gray-700">Content coming soon.</p>
    </motion.div>
  );
case "souvenir":
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-semibold text-[#800000] mb-4">Souvenir 2025</h2>
      <p className="text-gray-700">Content coming soon.</p>
    </motion.div>
  );
case "registration":
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h2 className="text-2xl font-semibold text-[#800000] mb-4">Registration</h2>
      <p className="text-gray-700">Content coming soon.</p>
    </motion.div>
  );
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Banner */}
      <header className="w-full h-40 md:h-48 bg-[#800000]/10 flex items-center justify-center relative border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#800000]">
            Alumni Association of Berhampur University
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Connecting Alumni, Celebrating Achievements
          </p>
        </div>
      </header>

      {/* Main content area */}
       <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
            <aside className="md:w-72 flex-shrink-0 mb-6 md:mb-0"> {/* Increased width from md:w-64 to md:w-72 */}
            <div className="md:sticky md:top-8 bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="border-b border-gray-200 px-4 py-3">
                <h3 className="font-medium text-[#800000]">VISION</h3>
              </div>
              <nav>
                <ul className="py-2">
                  {sidebarLinks.map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => handleSectionChange(link.id)}
                        className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors duration-150 ${
                          activeSection === link.id 
                            ? "text-[#800000] font-medium bg-[#800000]/5" 
                            : "text-gray-700"
                        }`}
                      >
                        <link.icon size={16} className={activeSection === link.id ? "text-[#800000]" : "text-gray-500"} />
                        <span>{link.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Content */}
         <main className="flex-1 min-h-[600px] bg-white border border-gray-200 rounded-md p-6 md:ml-0"> {/* Removed md:ml-8 */}
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-full shadow-md px-4 py-2 z-50">
        <div className="flex gap-1">
          {sidebarLinks.slice(0, 5).map((link) => (
            <button
              key={link.id}
              onClick={() => handleSectionChange(link.id)}
              className={`p-2 rounded-full ${
                activeSection === link.id
                  ? "bg-[#800000] text-white"
                  : "text-gray-600"
              }`}
            >
              <link.icon size={18} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}