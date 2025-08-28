"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);

  // Hide Navbar for /auth and /admin routes
  if (pathname.startsWith("/auth") || pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <nav
      className="w-full px-6 py-4 flex items-center justify-between fixed top-0 z-50"
      style={{ backgroundColor: "#a50303" }}
    >
      <div className="flex items-center space-x-4">
        <Link href="/" passHref>
          <Image
            src="/logo.png"
            alt="Alumni Logo"
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

      <ul className="flex space-x-6">
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
        <li>
          <Link
            href="/members"
            className="text-white hover:text-yellow-300 transition"
          >
            Members
          </Link>
        </li>
        <li>
          <Link
            href="/events"
            className="text-white hover:text-yellow-300 transition"
          >
            Events
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
        <li>
          <Link
            href="/newsletter"
            className="text-white hover:text-yellow-300 transition"
          >
            Newsletter
          </Link>
        </li>
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
            <ul className="absolute right-0 mt-2 bg-[#a50303] rounded shadow-lg min-w-max z-10">
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
    </nav>
  );
};

export default Navbar;
