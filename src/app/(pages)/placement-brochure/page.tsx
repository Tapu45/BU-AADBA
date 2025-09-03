"use client";

import React, { useEffect, useState } from "react";
import { FileText, Image, Loader2 } from "lucide-react";

type PlacementBrochure = {
  id: string;
  name: string;
  year: number;
  cover?: string;
  file?: string;
};

const fetchBrochures = async (): Promise<PlacementBrochure[]> => {
  const res = await fetch("/api/admin/placement");
  if (!res.ok) return [];
  return await res.json();
};

export default function PlacementBrochuresPage() {
  const [brochures, setBrochures] = useState<PlacementBrochure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setBrochures(await fetchBrochures());
      setLoading(false);
    })();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f8fa] px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#a50303] mb-2">Placement Brochures</h1>
          <p className="text-lg text-zinc-600">
            Explore our placement brochures, their covers, and downloadable files.
          </p>
        </header>
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin w-10 h-10 text-[#a50303]" />
          </div>
        ) : brochures.length === 0 ? (
          <div className="text-center text-zinc-500 py-24">No placement brochures found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brochures.map((brochure) => (
              <div
                key={brochure.id}
                className="bg-white rounded-xl shadow border border-[#eaeaea] p-6 flex flex-col items-center"
              >
             {brochure.cover ? (
                  <img
                    src={brochure.cover}
                    alt="Brochure Cover"
                    className="w-40 h-28 object-cover rounded-lg border mb-4"
                  />
                ) : (
                  <div className="w-40 h-28 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
                    <Image className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-xl font-semibold text-[#a50303] mb-1">{brochure.name}</div>
                  <div className="text-sm text-zinc-600 mb-2">Year: {brochure.year}</div>
                  {brochure.file && (
                    <a
                      href={brochure.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 underline text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      Download Brochure
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