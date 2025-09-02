"use client";

import { useEffect, useState, useRef } from "react";

type NotableAlumni = {
  id: string;
  name: string;
  designation: string;
  company: string;
  batch: string;
  imageUrl: string;
};

const glanceStats = [
  { label: "Postgraduate Students", value: 1200 },
  { label: "Faculty", value: 7 },
  { label: "Patents", value: 5 },
  { label: "Staff", value: 3 },
];

export default function NotableAlumini() {
  const [alumni, setAlumni] = useState<NotableAlumni[]>([]);
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/notable-alumini")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) ? setAlumni(data) : setAlumni([]));
  }, []);

  // Duplicate alumni for seamless infinite loop (at least twice)
  const rollerAlumni = [...alumni, ...alumni];

  // Measure the width of the track for smooth animation
  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2); // width of one set
    }
  }, [alumni]);

  // Dynamic animation style
  const duration = Math.max(rollerAlumni.length * 3, 30); // seconds
  const rollerStyles = `
    @keyframes roller {
      0% { transform: translateX(0); }
      100% { transform: translateX(-${trackWidth}px); }
    }
    .roller-container {
      overflow: hidden;
      width: 100%;
      position: relative;
    }
    .roller-track {
      display: flex;
      gap: 2rem;
      animation: roller ${duration}s linear infinite;
      will-change: transform;
    }
    .roller-track:hover {
      animation-play-state: paused;
    }
    .roller-card {
      flex: 0 0 auto;
      width: 220px;
    }
  `;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <style>{rollerStyles}</style>
      <h2 className="text-2xl md:text-3xl font-bold text-[#800000] mb-8 text-center">
        Notable Alumni
      </h2>
      <div className="roller-container mb-10">
        <div className="roller-track" ref={trackRef}>
          {rollerAlumni.map((alum, idx) => (
            <div
              key={alum.id + idx}
              className="roller-card flex flex-col items-center bg-white rounded-xl shadow border border-gray-100 p-4"
            >
              <img
                src={alum.imageUrl}
                alt={alum.name}
                className="w-28 h-28 object-cover rounded-full border-2 border-[#800000] mb-3"
              />
              <h3 className="text-lg font-semibold text-[#800000] text-center mb-1">
                {alum.name}
              </h3>
              <p className="text-xs text-gray-700 text-center">{alum.designation}</p>
              <p className="text-xs text-gray-500 text-center">{alum.company}</p>
              <p className="text-xs text-gray-400 text-center">{alum.batch}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#800000]/5 rounded-xl border border-[#800000]/10 p-6 flex flex-wrap justify-center gap-8">
        {glanceStats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-[#800000]">
              {stat.value}
            </span>
            <span className="text-sm text-gray-700">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}