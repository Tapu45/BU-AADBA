"use client";

import React, { useState } from "react";
import LatestPublications from "./Latest-Publications";
import UpcomingEvent from "./Upcoming-event";
import News from "./News";

const tabs = [
  { label: "Upcoming Events", component: <UpcomingEvent /> },
  { label: "News", component: <News /> },
  { label: "Latest Publications", component: <LatestPublications /> },
];

const tabDesc = [
  "Read our latest magazines, newsletters, and research digests.",
  "Stay updated with upcoming alumni events and reunions.",
  "Catch up on campus news, alumni achievements, and more.",
];

const Highlights: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full flex flex-col items-center py-6">
      <h2 className="text-3xl md:text-4xl font-bold text-[#a50303] mt-2 mb-2 text-center">
        Highlights
      </h2>
      <p className="text-gray-700 mb-6 text-center max-w-xl">
        {tabDesc[activeTab]}
      </p>
      <div className="flex justify-center gap-4 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 transition
              ${
                activeTab === idx
                  ? "bg-[#a50303] text-white border-[#a50303]"
                  : "bg-white text-[#a50303] border-transparent hover:bg-[#fbeaea]"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full">{tabs[activeTab].component}</div>
    </section>
  );
};

export default Highlights;
