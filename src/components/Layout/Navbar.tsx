import React from "react";

const Navbar: React.FC = () => (
  <nav
    className="w-full px-6 py-4 flex items-center justify-between"
    style={{ backgroundColor: "#a50303" }}
  >
    <div className="flex items-center space-x-4">
      <a href="/">
        <img src="/logo.png" alt="Alumni Logo" className="h-10 w-auto" />
      </a>
      <div className="flex flex-col">
        <span className="text-white text-base font-semibold leading-tight">ବ୍ରହ୍ମପୁର ବିଶ୍ୱବିଦ୍ୟାଳୟ</span>
        <span className="text-white text-lg font-bold leading-tight">BERHAMPUR UNIVERSITY</span>
        <span className="text-yellow-200 text-xs leading-tight">Accredited by NAAC</span>
      </div>
    </div>
    <ul className="flex space-x-6">
      <li>
        <a href="/" className="text-white hover:text-yellow-300 transition">Home</a>
      </li>
      <li>
        <a href="/stories" className="text-white hover:text-yellow-300 transition">Stories</a>
      </li>
      <li>
        <a href="/events" className="text-white hover:text-yellow-300 transition">Events</a>
      </li>
      <li>
        <a href="/contact" className="text-white hover:text-yellow-300 transition">Contact</a>
      </li>
    </ul>
  </nav>
);

export default Navbar;