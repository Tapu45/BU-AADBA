"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const [showMembersMenu, setShowMembersMenu] = useState(false);
  const [showEventsMenu, setShowEventsMenu] = useState(false);

  const membersMenuRef = useRef<HTMLUListElement>(null);
  const registerMenuRef = useRef<HTMLUListElement>(null);
  const eventsMenuRef = useRef<HTMLUListElement>(null);

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
 return (
  <nav
    className="w-full px-6 py-4 flex items-center justify-between fixed top-0 z-50"
    style={{ backgroundColor: "#a50303" }}
  >
    {/* Left section: BU Logo, Alumni Association, Berhampur University */}
    <div className="flex items-center space-x-4">
      <Link href="/" passHref>
        <Image
          src="/logo.png"
          alt="BU Logo"
          className="h-10 w-auto"
          width={40}
          height={40}
        />
      </Link>
      <div className="flex flex-col">
        <span className="text-yellow-300 text-base font-bold leading-tight">
          Alumni Association
        </span>
        <span className="text-yellow-300 text-sm font-semibold leading-tight">
          Department of Business Administration(AADBA)
        </span>
        <span className="text-yellow-200 text-xs leading-tight">
          BERHAMPUR UNIVERSITY
        </span>
      </div>
    </div>

    {/* Center section: Navigation links */}
    <div className="flex-1 flex justify-center">
      <ul className="flex space-x-6 ">
        <li>
          <Link
            href="/"
            className="text-white hover:text-yellow-300 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-white hover:text-yellow-300 transition"
          >
            About Us
          </Link>
        </li>
        {/* <li>
          <Link href="/executive-committee" className="text-white hover:text-yellow-300 transition">Executive Committee</Link>
        </li> */}
        <li className="relative">
          <span
            className="text-white hover:text-yellow-300 transition cursor-pointer"
            onClick={() => setShowMembersMenu((s) => !s)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowMembersMenu((s) => !s);
              }
            }}
          >
            Faculty Members
          </span>
          {showMembersMenu && (
            <ul
              ref={membersMenuRef}
              className="absolute right-0 mt-2 bg-[#a50303] rounded shadow-lg min-w-max z-60"
            >
              <li>
                <Link
                  href="/faculty-members/existing"
                  className="block px-4 py-2 text-white hover:text-yellow-300"
                  onClick={() => setShowMembersMenu(false)}
                >
                  Existing
                </Link>
              </li>
              <li>
                <Link
                  href="/faculty-members/former"
                  className="block px-4 py-2 text-white hover:text-yellow-300"
                  onClick={() => setShowMembersMenu(false)}
                >
                  Former
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="relative">
          <span
            className="text-white hover:text-yellow-300 transition cursor-pointer"
            onClick={() => setShowEventsMenu((s) => !s)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowEventsMenu((s) => !s);
              }
            }}
          >
            Events
          </span>
          {showEventsMenu && (
            <ul
              ref={eventsMenuRef}
              className="absolute right-0 mt-2 bg-[#a50303] rounded shadow-lg min-w-max z-60"
            >
              <li>
                <Link
                  href="/newsletter"
                  className="block px-4 py-2 text-white hover:text-yellow-300"
                  onClick={() => setShowEventsMenu(false)}
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="/events/seminar-conference"
                  className="block px-4 py-2 text-white hover:text-yellow-300"
                  onClick={() => setShowEventsMenu(false)}
                >
                  Seminar/Conference
                </Link>
              </li>
              <li>
                <Link
                  href="/events/placement-brochure"
                  className="block px-4 py-2 text-white hover:text-yellow-300"
                  onClick={() => setShowEventsMenu(false)}
                >
                  Placement Brochure
                </Link>
              </li>
              <li>
                <Link
                  href="/events/magazine"
                  className="block px-4 py-2 text-white hover:text-yellow-300"
                  onClick={() => setShowEventsMenu(false)}
                >
                  Magazine
                </Link>
              </li>
              <li>
                <Link
                  href="/events/annual-events"
                  className="block px-4 py-2 text-white hover:text-yellow-300"
                  onClick={() => setShowEventsMenu(false)}
                >
                  Annual Events
                </Link>
              </li>
              <li>
                <Link
                  href="/events/other-events"
                  className="block px-4 py-2 text-white hover:text-yellow-300"
                  onClick={() => setShowEventsMenu(false)}
                >
                  Other Events
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            href="/visitors"
            className="text-white hover:text-yellow-300 transition"
          >
            Visitors
          </Link>
        </li>
        <li>
          <Link
            href="/gallery"
            className="text-white hover:text-yellow-300 transition"
          >
            Gallery
          </Link>
        </li>
        {/* <li>
          <Link
            href="/newsletter"
            className="text-white hover:text-yellow-300 transition"
          >
            Newsletter
          </Link>
        </li> */}
        {/* <li>
          <Link href="/notable-alumni" className="text-white hover:text-yellow-300 transition">Notable Alumni</Link>
        </li> */}

        <li className="relative">
          <span
            className="text-white hover:text-yellow-300 transition cursor-pointer"
            onClick={() => setShowRegisterMenu((prev) => !prev)}
          >
            Register
          </span>
          {showRegisterMenu && (
            <ul
              ref={registerMenuRef}
              className="absolute right-0 mt-2 bg-[#a50303] rounded shadow-lg min-w-max z-60"
            >
              <li>
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 text-white hover:text-yellow-300"
                  onClick={() => setShowRegisterMenu(false)}
                >
                  Already Member
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="block px-4 py-2 text-white hover:text-yellow-300"
                  onClick={() => setShowRegisterMenu(false)}
                >
                  New Registration
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>

    {/* Right section: Department text, AADBA Logo */}
    <div className="flex items-center">
      <Image
        src="/logo.jpeg"
        alt="AADBA Logo"
        className="h-10 w-auto rounded"
        width={40}
        height={40}
      />
    </div>
  </nav>
);
}

export default Navbar;