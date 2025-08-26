"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

type Newsletter = {
  id: string;
  title: string;
  coverImage?: string;
  fileUrl: string;
};

const CARD_HEIGHT = "320px";

const News: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((res) => res.json())
      .then((data) => {
        setNewsletters(data.newsletters || []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full py-12 px-4 bg-gradient-to-b from-white to-[#fbeaea] flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#a50303] mb-8 flex items-center gap-2">
        <Newspaper size={32} className="text-[#a50303]" />
        Latest E-Newsletters
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg flex flex-col border border-[#fbeaea] animate-pulse w-[370px]"
              style={{ minHeight: CARD_HEIGHT }}
            >
              <div className="w-full h-[220px] bg-gray-200 rounded-t-xl" />
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div className="h-6 bg-gray-200 rounded mb-0 w-2/3" />
                <div className="h-10 bg-gray-200 rounded w-1/2 mt-4" />
              </div>
            </div>
          ))
        ) : newsletters.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500">
            No newsletters found.
          </div>
        ) : (
          newsletters.slice(0, 4).map((item) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-lg flex flex-col border border-[#fbeaea] hover:shadow-xl transition w-[370px]"
              style={{ minHeight: CARD_HEIGHT }}
            >
              <img
                src={
                  item.coverImage ||
                  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                }
                alt={item.title}
                className="w-full h-[220px] object-cover rounded-t-xl"
              />
              <div className="p-6 flex flex-col flex-1 justify-between">
                <h3 className="text-xl font-semibold text-[#a50303] mb-0 text-center">
                  {item.title}
                </h3>
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-[#a50303] text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-white hover:text-[#a50303] border-2 border-[#a50303] transition text-center"
                >
                  View PDF
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>
      <a
        href="/newsletter"
        className="inline-block bg-[#a50303] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-white hover:text-[#a50303] border-2 border-[#a50303] transition"
      >
        View More
      </a>
    </section>
  );
};

export default News;