"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, easeInOut, easeIn } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const [showMembersMenu, setShowMembersMenu] = useState(false);
  const [showEventsMenu, setShowEventsMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const membersMenuRef = useRef<HTMLDivElement>(null);
  const registerMenuRef = useRef<HTMLDivElement>(null);
  const eventsMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        membersMenuRef.current &&
        !membersMenuRef.current.contains(event.target as Node)
      ) {
        setShowMembersMenu(false);
      }
      if (
        registerMenuRef.current &&
        !registerMenuRef.current.contains(event.target as Node)
      ) {
        setShowRegisterMenu(false);
      }
      if (
        eventsMenuRef.current &&
        !eventsMenuRef.current.contains(event.target as Node)
      ) {
        setShowEventsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hide Navbar for /auth and /admin routes
  if (pathname.startsWith("/auth") || pathname.startsWith("/admin")) {
    return null;
  }

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      y: -15, 
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: easeInOut
      }
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      scale: 0.95,
      filter: "blur(10px)",
      transition: {
        duration: 0.2,
        ease: easeIn
      }
    }
  };

  return (
    <nav className={`w-full px-6 py-2 flex items-center justify-between fixed top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100" 
        : "bg-gradient-to-r from-red-800 via-red-700 to-red-800 shadow-lg"
    }`}>
      {/* Left section: BU Logo and Brand */}
      <div className="flex items-center space-x-4">
        <Link href="/" passHref className="group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300"
          >
            <Image
              src="/logo.png"
              alt="BU Logo"
              className={`h-12 w-auto drop-shadow-lg transition-all duration-300 ${
                scrolled ? "filter brightness-110" : ""
              }`}
              width={48}
              height={48}
            />
          </motion.div>
        </Link>
        
        <div className="flex flex-col space-y-1">
          <motion.span 
            className={`text-base font-bold leading-tight drop-shadow-sm transition-colors duration-300 ${
              scrolled ? "text-red-800" : "text-yellow-300"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Alumni Association
          </motion.span>
          <motion.span 
            className={`text-sm font-semibold leading-tight drop-shadow-sm transition-colors duration-300 ${
              scrolled ? "text-red-700" : "text-yellow-300"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Department of Business Administration(AADBA)
          </motion.span>
          <motion.span 
            className={`text-xs leading-tight drop-shadow-sm transition-colors duration-300 ${
              scrolled ? "text-red-600" : "text-yellow-200"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            BERHAMPUR UNIVERSITY
          </motion.span>
        </div>
      </div>

      {/* Center section: Navigation links */}
      <div className="flex-1 flex justify-center">
        <ul className="flex space-x-8">
          <li>
            <Link
              href="/"
              className={`transition-all duration-300 font-medium relative group ${
                scrolled ? "text-gray-800 hover:text-red-700" : "text-white hover:text-yellow-300"
              }`}
            >
              <span className="relative">
                Home
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-red-700" : "bg-yellow-300"
                }`}></span>
              </span>
            </Link>
          </li>
          
          <li>
            <Link
              href="/about"
              className={`transition-all duration-300 font-medium relative group ${
                scrolled ? "text-gray-800 hover:text-red-700" : "text-white hover:text-yellow-300"
              }`}
            >
              <span className="relative">
                About Us
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-red-700" : "bg-yellow-300"
                }`}></span>
              </span>
            </Link>
          </li>
          
          {/* Faculty Members Dropdown */}
          <li className="relative">
            <motion.span
              className={`transition-all duration-300 cursor-pointer font-medium relative group flex items-center space-x-1 ${
                scrolled ? "text-gray-800 hover:text-red-700" : "text-white hover:text-yellow-300"
              }`}
              onClick={() => setShowMembersMenu((s) => !s)}
              role="button"
              tabIndex={0}
              whileHover={{ scale: 1.02 }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setShowMembersMenu((s) => !s);
                }
              }}
            >
              <span className="relative">
                Faculty Members
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-red-700" : "bg-yellow-300"
                }`}></span>
              </span>
              <motion.div
                animate={{ rotate: showMembersMenu ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.span>
            
           <AnimatePresence>
  {showMembersMenu && (
    <motion.div
      ref={membersMenuRef}
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute right-0 mt-2 w-56 bg-white backdrop-blur-xl rounded-xl border border-white/20 shadow-xl overflow-hidden"
    >
      <div className="p-1.5">
        <Link
          href="/faculty-members/existing"
          className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200"
          onClick={() => setShowMembersMenu(false)}
        >
          Existing Members
        </Link>
        <Link
          href="/faculty-members/former"
          className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200"
          onClick={() => setShowMembersMenu(false)}
        >
          Former Members
        </Link>
      </div>
    </motion.div>
  )}
</AnimatePresence>

          </li>
          
          {/* Events Dropdown */}
          <li className="relative">
            <motion.span
              className={`transition-all duration-300 cursor-pointer font-medium relative group flex items-center space-x-1 ${
                scrolled ? "text-gray-800 hover:text-red-700" : "text-white hover:text-yellow-300"
              }`}
              onClick={() => setShowEventsMenu((s) => !s)}
              role="button"
              tabIndex={0}
              whileHover={{ scale: 1.02 }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setShowEventsMenu((s) => !s);
                }
              }}
            >
              <span className="relative">
                Events
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-red-700" : "bg-yellow-300"
                }`}></span>
              </span>
              <motion.div
                animate={{ rotate: showEventsMenu ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.span>
            
           <AnimatePresence>
  {showEventsMenu && (
    <motion.div
      ref={eventsMenuRef}
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl overflow-hidden"
    >
      <div className="p-1.5 space-y-0.5">
        <Link
          href="/newsletter"
          className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200"
          onClick={() => setShowEventsMenu(false)}
        >
          Newsletter
        </Link>
        <Link
          href="/events/seminar-conference"
          className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200"
          onClick={() => setShowEventsMenu(false)}
        >
          Seminar/Conference
        </Link>
        <Link
          href="/events/placement-brochure"
          className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200"
          onClick={() => setShowEventsMenu(false)}
        >
          Placement Brochure
        </Link>
        <Link
          href="/events/magazine"
          className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200"
          onClick={() => setShowEventsMenu(false)}
        >
          Magazine
        </Link>
        <Link
          href="/events/annual-events"
          className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200"
          onClick={() => setShowEventsMenu(false)}
        >
          Annual Events
        </Link>
        <Link
          href="/events/other-events"
          className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200"
          onClick={() => setShowEventsMenu(false)}
        >
          Other Events
        </Link>
      </div>
    </motion.div>
  )}
</AnimatePresence>
          </li>
          
          <li>
            <Link
              href="/visitors"
              className={`transition-all duration-300 font-medium relative group ${
                scrolled ? "text-gray-800 hover:text-red-700" : "text-white hover:text-yellow-300"
              }`}
            >
              <span className="relative">
                Visitors
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-red-700" : "bg-yellow-300"
                }`}></span>
              </span>
            </Link>
          </li>
          
          <li>
            <Link
              href="/gallery"
              className={`transition-all duration-300 font-medium relative group ${
                scrolled ? "text-gray-800 hover:text-red-700" : "text-white hover:text-yellow-300"
              }`}
            >
              <span className="relative">
                Gallery
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-red-700" : "bg-yellow-300"
                }`}></span>
              </span>
            </Link>
          </li>

          {/* Register Dropdown */}
          <li className="relative">
            <motion.span
              className={`transition-all duration-300 cursor-pointer font-medium relative group flex items-center space-x-1 ${
                scrolled ? "text-gray-800 hover:text-red-700" : "text-white hover:text-yellow-300"
              }`}
              onClick={() => setShowRegisterMenu((prev) => !prev)}
              whileHover={{ scale: 1.02 }}
            >
              <span className="relative">
                Register
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-red-700" : "bg-yellow-300"
                }`}></span>
              </span>
              <motion.div
                animate={{ rotate: showRegisterMenu ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.span>
            
          <AnimatePresence>
  {showRegisterMenu && (
    <motion.div
      ref={registerMenuRef}
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl overflow-hidden"
    >
      <div className="p-1.5">
        <Link
          href="/auth/login"
          className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200"
          onClick={() => setShowRegisterMenu(false)}
        >
          Already Member
        </Link>
        <Link
          href="/auth/register"
          className="block px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200"
          onClick={() => setShowRegisterMenu(false)}
        >
          New Registration
        </Link>
      </div>
    </motion.div>
  )}
</AnimatePresence>
          </li>
        </ul>
      </div>

      {/* Right section: AADBA Logo */}
      <div className="flex items-center">
        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="transition-all duration-300"
        >
          <Image
            src="/logo.jpeg"
            alt="AADBA Logo"
            className={`h-12 w-auto rounded-lg shadow-lg transition-all duration-300 ${
              scrolled ? "filter brightness-110" : ""
            }`}
            width={48}
            height={48}
          />
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;