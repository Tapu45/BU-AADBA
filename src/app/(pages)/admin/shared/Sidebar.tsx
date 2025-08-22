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
} from "lucide-react";

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const links = [
  { name: "Requests", href: "/admin/requests", icon: <Mail size={22} /> },
  { name: "Membership", href: "/admin/membership", icon: <Ticket size={22} /> },
  {
    name: "Newsletters",
    href: "/admin/newsletters",
    icon: <Newspaper size={22} />,
  },
  { name: "Events", href: "/admin/events", icon: <Calendar size={22} /> },
  {
    name: "Donations",
    href: "/admin/donations",
    icon: <HandCoins size={22} />,
  },
  { name: "Gallery", href: "/admin/gallery", icon: <Image size={22} /> },
];

export default function Sidebar() {
  return (
   <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className={cn(
        'h-screen w-64 shadow-lg flex flex-col py-8 px-4 border-r border-[#a50303]/20 relative',
      )}
      style={{
        background: `
          radial-gradient(circle at 1px 1px, #ececec 1px, transparent 1px),
          #fff
        `,
        backgroundSize: '20px 20px',
        color: '#a50303',
      }}
    >
      <div className="mb-10 flex items-center gap-3 px-2">
        <span className="bg-[#a50303] rounded-full p-3 shadow text-white">
          <ShieldCheck size={12} />
        </span>
        <span className="font-extrabold text-2xl tracking-wide text-[#a50303] leading-tight">
          Admin Panel
        </span>
      </div>
      
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-lg',
              'hover:bg-[#a50303]/10 hover:text-[#a50303] active:bg-[#a50303]/20'
            )}
            style={{ color: '#a50303' }}
          >
            <span className="text-2xl">{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </nav>
     
    </motion.aside>
  );
}
