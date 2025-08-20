"use client"

import React from "react";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

const newsItems = [
  {
    title: "Alumni Meet 2025 Announced",
    date: "Aug 15, 2025",
    summary: "Join us for the annual alumni reunion with networking, talks, and celebrations. This year’s event will feature keynote speakers, interactive workshops, and a special awards ceremony to honor outstanding alumni contributions. Don’t miss the opportunity to reconnect and celebrate our shared legacy.",
    link: "/events/alumni-meet-2025",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Summer Newsletter Released",
    date: "Jul 30, 2025",
    summary: "Read the latest updates, alumni stories, and university news in our summer edition. Highlights include interviews with distinguished alumni, campus development updates, and upcoming opportunities for mentorship and volunteering. Stay informed and engaged with your alma mater.",
    link: "/publications/newsletter-summer-2025",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Placement Brochure 2025 Published",
    date: "Jul 10, 2025",
    summary: "Download the new placement brochure and see our students' achievements. The brochure showcases top recruiters, placement statistics, and inspiring success stories from recent graduates. Discover how our alumni network continues to support career growth and professional development.",
    link: "/publications/placement-brochure-2025",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Alumni Startup Success",
    date: "Jun 25, 2025",
    summary: "Our alumni-founded startup was featured in national media for innovation and impact. Learn how a team of graduates turned their ideas into a thriving business, creating jobs and driving change in the industry. Their journey is a testament to the power of our alumni community.",
    link: "/news/alumni-startup-success",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", // Updated valid Unsplash image
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const News: React.FC = () => (
  <section className="w-full py-12 px-4 bg-white flex flex-col items-center">
    <h2 className="text-3xl md:text-4xl font-bold text-[#a50303] mb-8 flex items-center gap-2">
      <Newspaper size={32} className="text-[#a50303]" />
      Latest News & Publications
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-8">
      {newsItems.map((item, idx) => (
        <motion.div
          key={item.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg p-0 flex flex-col border border-[#fbeaea] hover:shadow-xl transition"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover rounded-t-xl"
          />
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-semibold text-[#a50303] mb-2">{item.title}</h3>
            <p className="text-[#a50303] text-sm mb-2">{item.date}</p>
            <p className="text-gray-700 mb-4">{item.summary}</p>
            <a
              href={item.link}
              className="mt-auto inline-block bg-[#a50303] text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-white hover:text-[#a50303] border-2 border-[#a50303] transition"
            >
              Read More
            </a>
          </div>
        </motion.div>
      ))}
    </div>
    <a
      href="/news"
      className="inline-block bg-[#a50303] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-white hover:text-[#a50303] border-2 border-[#a50303] transition"
    >
      View More
    </a>
  </section>
);

export default News;