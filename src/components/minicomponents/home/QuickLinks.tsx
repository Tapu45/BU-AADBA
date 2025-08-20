"use client"

import React from "react";
import { Users, CalendarDays, HeartHandshake, BookOpen } from "lucide-react";

const links = [
  {
    title: "Membership",
    icon: <Users size={32} className="text-[#a50303]" />,
    href: "/membership",
    desc: "Become a member and enjoy exclusive alumni benefits.",
  },
  {
    title: "Events",
    icon: <CalendarDays size={32} className="text-[#a50303]" />,
    href: "/events",
    desc: "Stay updated with upcoming alumni events and reunions.",
  },
  {
    title: "Donate",
    icon: <HeartHandshake size={32} className="text-[#a50303]" />,
    href: "/donate",
    desc: "Support your alma mater and make a difference.",
  },
  {
    title: "Alumni Directory",
    icon: <BookOpen size={32} className="text-[#a50303]" />,
    href: "/directory",
    desc: "Connect with fellow alumni through our directory.",
  },
];

const noiseBg = "/no.png";

const QuickLinks: React.FC = () => (
  <section
    className="w-full py-6 px-4 flex flex-col items-center" // reduced py-12 to py-6
    style={{
      backgroundColor: "#fff",
      backgroundImage: `url(${noiseBg})`,
      backgroundRepeat: "repeat",
      backgroundSize: "auto",
    }}
  >
    <h2 className="text-3xl md:text-4xl font-bold text-[#a50303] mb-6 text-center"> {/* reduced mb-8 to mb-6 */}
      Quick Links
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl"> {/* reduced gap-8 to gap-6 */}
      {links.map((link) => (
        <a
          key={link.title}
          href={link.href}
          className="bg- rounded-xl  p-6 flex flex-col items-center " // reduced p-8 to p-6
        >
          {link.icon}
          <span className="text-[#a50303] font-bold text-lg mt-3 mb-2">{link.title}</span> {/* reduced mt-4 to mt-3 */}
          <p className="text-gray-700 text-center">{link.desc}</p>
        </a>
      ))}
    </div>
  </section>
);

export default QuickLinks;
