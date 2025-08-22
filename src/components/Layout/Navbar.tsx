import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => (
   <nav
    className="w-full px-6 py-4 flex items-center justify-between sticky top-0 z-50"
    style={{ backgroundColor: "#a50303" }}
  >
    <div className="flex items-center space-x-4">
      <Link href="/" passHref>
        <Image src="/logo.png" alt="Alumni Logo" className="h-10 w-auto" width={40} height={40} />
      </Link>
      <div className="flex flex-col">
        <span className="text-white text-base font-semibold leading-tight">ବ୍ରହ୍ମପୁର ବିଶ୍ୱବିଦ୍ୟାଳୟ</span>
        <span className="text-white text-lg font-bold leading-tight">BERHAMPUR UNIVERSITY</span>
       <span className="text-yellow-200 text-xs leading-tight">
          Accredited by NAAC <span className="font-bold text-yellow-300">A Grade</span>
        </span>
      </div>
    </div>
  
    <ul className="flex space-x-6">
      <li>
        <Link href="/" className="text-white hover:text-yellow-300 transition">Home</Link>
      </li>
      <li>
        <Link href="/about" className="text-white hover:text-yellow-300 transition">About Us</Link>
      </li>
      {/* <li>
        <Link href="/executive-committee" className="text-white hover:text-yellow-300 transition">Executive Committee</Link>
      </li> */}
      <li>
        <Link href="/members" className="text-white hover:text-yellow-300 transition">Members</Link>
      </li>
      <li>
        <Link href="/events" className="text-white hover:text-yellow-300 transition">Events</Link>
      </li>
      <li>
        <Link href="/gallery" className="text-white hover:text-yellow-300 transition">Gallery</Link>
      </li>
      <li>
        <Link href="/newsletter" className="text-white hover:text-yellow-300 transition">Newsletter</Link>
      </li>
      {/* <li>
        <Link href="/notable-alumni" className="text-white hover:text-yellow-300 transition">Notable Alumni</Link>
      </li> */}
      <li className="relative group">
        <span className="text-white hover:text-yellow-300 transition cursor-pointer">Engage</span>
        <ul className="absolute left-0 mt-2 bg-[#a50303] rounded shadow-lg hidden group-hover:block min-w-max z-10">
          <li>
            <Link href="/engage/achievements" className="block px-4 py-2 text-white hover:text-yellow-300">Share Achievements</Link>
          </li>
          <li>
            <Link href="/engage/opportunities" className="block px-4 py-2 text-white hover:text-yellow-300">Share Opportunities</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link href="/contact" className="text-white hover:text-yellow-300 transition">Contact Us</Link>
      </li>
    </ul>

  </nav>
);

export default Navbar;