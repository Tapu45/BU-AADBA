"use client";

import React, { useEffect, useState } from "react";
import { FileText, Image, Loader2 } from "lucide-react";

type Conference = {
  id: string;
  name: string;
  cover?: string;
  file?: string;
};

const fetchConferences = async (): Promise<Conference[]> => {
  const res = await fetch("/api/admin/confress");
  if (!res.ok) return [];
  return await res.json();
};

export default function ConferencesPage() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setConferences(await fetchConferences());
      setLoading(false);
    })();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f8fa] px-4 py-26">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#a50303] mb-2">Conferences</h1>
          <p className="text-lg text-zinc-600">
            Explore our conferences, their fliers, and downloadable files.
          </p>
        </header>
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin w-10 h-10 text-[#a50303]" />
          </div>
        ) : conferences.length === 0 ? (
          <div className="text-center text-zinc-500 py-24">No conferences found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {conferences.map((conf) => (
              <div
                key={conf.id}
                className="bg-white rounded-xl shadow border border-[#eaeaea] p-6 flex flex-col items-center"
              >
                {conf.cover ? (
                  <img
                    src={conf.cover}
                    alt="Conference Cover"
                    className="w-40 h-28 object-cover rounded-lg border mb-4"
                  />
                ) : (
                  <div className="w-40 h-28 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
                    <Image className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-xl font-semibold text-[#a50303] mb-1">{conf.name}</div>
                  {conf.file && (
                    <a
                      href={conf.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 underline text-sm mt-2"
                    >
                      <FileText className="w-4 h-4" />
                      Download File
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}