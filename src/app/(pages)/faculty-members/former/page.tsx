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

export default function FormerFacultyPage() {
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
          setMembers(data.filter((m) => m.status === "FORMER"));
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
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-26">
        {/* Clean Header */}
        <div className="text-center mb-7">
          <h1 className="text-4xl font-bold text-red-800/90 mb-3">
            Former Faculty Members
          </h1>
          <div className="w-16 h-0.5 bg-red-800 mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-red-800 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8">
              <ImagePlus className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No former members found</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.08,
                  ease: "easeOut"
                }}
                className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <ImagePlus className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                {/* Always visible red overlay with names */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-800/90 via-red-800/70 to-transparent p-3">
                  <h3 className="text-white text-sm font-semibold truncate">
                    {member.name}
                  </h3>
                  {member.designation && (
                    <p className="text-white/90 text-xs mt-1 truncate">
                      {member.designation}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}