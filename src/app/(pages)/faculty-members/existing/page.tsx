"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus } from "lucide-react";

type FacultyMember = {
  id: string;
  name: string;
  imageUrl?: string | null;
  designation?: string | null;
  status: "EXISTING" | "FORMER";
  createdAt?: string | null;
};

export default function ExistingFacultyPage() {
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/faculty-members");
        const data = await res.json();
        if (!mounted) return;
        if (Array.isArray(data)) {
          setMembers(data.filter((m) => m.status === "EXISTING"));
        } else {
          setMembers([]);
        }
      } catch (e) {
        console.error(e);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f8fa] px-4 py-28">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36 }}
        className="max-w-6xl mx-auto"
      >
        {/* Beautiful Heading */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#a50303] tracking-tight relative inline-block">
            Existing Members
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[4px] bg-[#a50303] opacity-20 rounded-full"></span>
          </h1>
          <p className="text-lg text-zinc-600 mt-4 max-w-xl mx-auto">
            Meet our currently active faculty members
          </p>
        </header>

        <section>
          {loading ? (
            <div className="py-24 flex items-center justify-center">
              <svg
                className="animate-spin h-8 w-8 text-[#a50303]"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>
          ) : members.length === 0 ? (
            <div className="py-20 text-center">
              <div className="inline-block bg-white rounded-xl border border-[#eaeaea] p-8 shadow-sm">
                <ImagePlus className="w-12 h-12 text-[#a50303] mx-auto opacity-40" />
                <p className="text-lg font-medium text-gray-600 mt-4">
                  No current faculty found.
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Faculty with status "EXISTING" will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.map((m) => (
                <motion.article
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className="bg-white rounded-xl border border-[#eaeaea] overflow-hidden shadow-sm relative h-64"
                  style={{
                    backgroundImage: m.imageUrl ? `url(${m.imageUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Overlay for name and designation at the bottom */}
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#a50303]/80 to-transparent p-4">
    <h3 className="text-lg font-semibold text-white">
      {m.name}
    </h3>
    {m.designation && (
      <p className="text-sm text-white/80 mt-1">
        {m.designation}
      </p>
    )}
  </div>

                  {/* Fallback for no image */}
                  {!m.imageUrl && (
                    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-[#f8eaea] via-[#f8f8fa] to-[#f8eaea]">
                      <ImagePlus className="w-12 h-12 text-[#a50303] opacity-40" />
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </motion.div>
    </main>
  );
}
