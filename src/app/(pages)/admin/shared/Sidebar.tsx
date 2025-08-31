"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Ticket,
  Newspaper,
  Calendar,
  HandCoins,
  Image,
  ShieldCheck,
  Building2,
  MemoryStick,
  PersonStanding,
  User,
  Gift,
} from "lucide-react";

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const links = [
  { name: "Requests", href: "/admin/requests", icon: <Mail size={22} /> },
  { name: "Membership", href: "/admin/membership", icon: <Ticket size={22} /> },
  {
    name: "Newsletters",
    href: "/admin/newsletter",
    icon: <Newspaper size={22} />,
  },
  { name: "Events", href: "/admin/events", icon: <Calendar size={22} /> },
  {
    name: "Industrial tours",
    href: "/admin/industrial-tour",
    icon: <Building2 size={22} />,
  },
  { name: "Gallery", href: "/admin/gallery", icon: <Image size={22} /> },
  { name: "Faculty Members", href: "/admin/faculty-members", icon: <User size={22} /> },
  { name: "Newspaper Clippings", href: "/admin/newspapper-clippings", icon: <Newspaper size={22} /> },
  { name: "Notable Alumini", href: "/admin/notable-alumini", icon: <Gift size={22} /> },
  { name: "Visitors", href: "/admin/visitor", icon: <PersonStanding size={22} /> },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={cn(
        "h-screen w-72 shadow-xl flex flex-col py-8 px-6 border-r border-[#a50303]/20 relative bg-white",
        "rounded-r-3xl overflow-y-auto"
      )}
      style={{
        background: `
          radial-gradient(circle at 1px 1px, #ececec 1px, transparent 1px),
          #fff
        `,
        backgroundSize: "20px 20px",
        color: "#a50303",
      }}
      aria-label="Admin sidebar navigation"
    >
      <div className="mb-12 flex items-center gap-4 px-2">
        <span
          className="bg-[#a50303] rounded-full p-3 shadow text-white flex items-center justify-center"
          aria-label="Admin shield"
        >
          <ShieldCheck size={16} aria-hidden="true" />
        </span>
        <span className="font-extrabold text-2xl tracking-wide text-[#a50303] leading-tight">
          Admin Panel
        </span>
      </div>

      <nav className="flex flex-col gap-3" aria-label="Sidebar main navigation">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "group flex items-center gap-4 px-5 py-3 rounded-xl transition-all font-semibold text-lg outline-none",
              "hover:bg-[#a50303]/10 hover:text-[#a50303] focus:bg-[#a50303]/20 focus:ring-2 focus:ring-[#a50303]/40",
              "active:bg-[#a50303]/20",
              "text-[#a50303]",
              "duration-150"
            )}
            style={{ color: "#a50303" }}
            tabIndex={0}
            aria-label={link.name}
          >
            <span className="text-2xl transition-transform group-hover:scale-110 group-focus:scale-110 group-active:scale-95">
              {link.icon}
            </span>
            <span className="truncate">{link.name}</span>
          </Link>
        ))}
      </nav>

   
    </motion.aside>
  );
}

