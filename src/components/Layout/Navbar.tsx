import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => (
  <nav
    className="w-full px-6 py-4 flex items-center justify-between"
    style={{ backgroundColor: "#a50303" }}
  >
    <div className="flex items-center space-x-4">
      <Link href="/" passHref>
        <Image src="/logo.png" alt="Alumni Logo" className="h-10 w-auto" width={40} height={40} />
      </Link>
      <div className="flex flex-col">
        <span className="text-white text-base font-semibold leading-tight">ବ୍ରହ୍ମପୁର ବିଶ୍ୱବିଦ୍ୟାଳୟ</span>
        <span className="text-white text-lg font-bold leading-tight">BERHAMPUR UNIVERSITY</span>
        <span className="text-yellow-200 text-xs leading-tight">Accredited by NAAC</span>
      </div>
    </div>
    <ul className="flex space-x-6">
      <li>
        <Link href="/" className="text-white hover:text-yellow-300 transition">Home</Link>
      </li>
      <li>
        <Link href="/stories" className="text-white hover:text-yellow-300 transition">Stories</Link>
      </li>
      <li>
        <Link href="/events" className="text-white hover:text-yellow-300 transition">Events</Link>
      </li>
      <li>
        <Link href="/contact" className="text-white hover:text-yellow-300 transition">Contact</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;