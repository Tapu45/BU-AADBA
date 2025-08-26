"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover } from "@headlessui/react";

interface Newsletter {
  id: string;
  title: string;
  description?: string;
  publicationDate: string;
  fileUrl: string;
  coverImage?: string;
}

export default function NewsLetterPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [filtered, setFiltered] = useState<Newsletter[]>([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>();

  useEffect(() => {
    fetchNewsletters();
  }, []);

  useEffect(() => {
    let result = newsletters;
    if (search.trim()) {
      result = result.filter((nl) =>
        nl.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (date) {
      result = result.filter((nl) => {
        const nlDate = new Date(nl.publicationDate);
        const filterDate = new Date(date);
        return (
          nlDate.getFullYear() === filterDate.getFullYear() &&
          nlDate.getMonth() === filterDate.getMonth()
        );
      });
    }
    setFiltered(result);
  }, [search, date, newsletters]);

  const fetchNewsletters = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/newsletter");
      const data = await res.json();
      setNewsletters(data.newsletters || []);
    } catch (err) {
      setNewsletters([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-28">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <Calendar size={48} className="text-[#a50303]" />
        <h1 className="text-4xl font-extrabold text-black tracking-tight">
          E-Newsletters
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <div className="flex-1 flex items-center gap-2">
          <Search className="text-[#a50303]" size={22} />
          <Input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border-[#a50303] text-black focus:ring-[#a50303]"
          />
        </div>
        <div className="flex items-center gap-2 relative">
          <Calendar className="text-[#a50303]" size={22} />
          <Popover className="relative">
            <Popover.Button className="bg-white border border-[#a50303] text-black rounded-md px-3 py-2 text-sm w-[140px] flex items-center justify-between">
              {selectedMonth
                ? selectedMonth.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })
                : "Select month"}
              <span className="ml-2">&#9660;</span>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 mt-2 right-0 w-[200px] bg-white border border-[#a50303] rounded shadow-lg">
              <DayPicker
                mode="single"
                selected={selectedMonth}
                onSelect={(date: Date | undefined) => {
                  setSelectedMonth(date);
                  if (date) {
                    setDate(date.toISOString().slice(0, 7));
                  } else {
                    setDate("");
                  }
                }}
                captionLayout="dropdown"
                fromYear={2020}
                toYear={new Date().getFullYear()}
                showOutsideDays={false}
                className="p-2"
              />
            </Popover.Panel>
          </Popover>
        </div>
      </motion.div>

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-32"
          >
            <span className="text-[#a50303] font-bold text-lg animate-pulse">
              Loading newsletters...
            </span>
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-10"
          >
            <span className="text-black text-lg">No newsletters found.</span>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
          >
            {filtered.map((nl) => (
              <motion.div
                key={nl.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="rounded-lg overflow-hidden shadow border border-[#a50303]/40 bg-white flex flex-col min-h-[340px] max-h-[400px] max-w-xs mx-auto"
              >
                {nl.coverImage && (
                  <img
                    src={nl.coverImage}
                    alt={nl.title}
                    className="w-full h-28 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-lg font-bold text-[#a50303] mb-1">
                    {nl.title}
                  </h2>
                  <span className="text-xs text-[#a50303] mb-1">
                    {new Date(nl.publicationDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <p className="text-gray-700 mb-4 text-sm line-clamp-5">
                    {nl.description}
                  </p>
                  <div className="mt-auto">
                    <a
                      href={nl.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="block w-full text-center bg-[#a50303] text-white font-semibold rounded-md py-2 text-base shadow hover:bg-black transition"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
