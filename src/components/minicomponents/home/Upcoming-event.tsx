"use client"

import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";

const events = [
  {
    title: "Alumni Meet 2025",
    date: "Aug 15, 2025",
    location: "University Auditorium",
    description: "Annual alumni reunion with networking, keynote talks, and celebrations. This year’s event features inspiring speakers, interactive workshops, and a special awards ceremony to honor outstanding alumni. Don’t miss this opportunity to reconnect and celebrate our legacy together.",
    link: "/events/alumni-meet-2025",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Career Webinar: Industry Trends",
    date: "Sep 5, 2025",
    location: "Online (Zoom)",
    description: "Join experts for insights on current industry trends and career opportunities. Learn from alumni leaders and industry professionals about the latest developments and how to position yourself for success.",
    link: "/events/career-webinar-2025",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Departmental Reunion",
    date: "Oct 10, 2025",
    location: "Department Seminar Hall",
    description: "Reconnect with batchmates and faculty in your department’s annual gathering. Share memories, network, and explore new collaborations within your academic community.",
    link: "/events/departmental-reunion-2025",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Alumni Startup Success",
    date: "Nov 2, 2025",
    location: "Main Campus",
    description: "Our alumni-founded startup was featured in national media for innovation and impact. Learn how a team of graduates turned their ideas into a thriving business, creating jobs and driving change in the industry.",
    link: "/events/alumni-startup-success",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Sports Meet 2025",
    date: "Dec 12, 2025",
    location: "Sports Ground",
    description: "Cheer for your favorite teams and reconnect with fellow alumni at our annual sports meet. Enjoy a day of fun, competition, and camaraderie.",
    link: "/events/sports-meet-2025",
    image: "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5?auto=format&fit=crop&w=600&q=80",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const UpcomingEvent: React.FC = () => (
  <section className="w-full py-12 px-4 bg-white flex flex-col items-center">
    <h2 className="text-3xl md:text-4xl font-bold text-[#a50303] mb-8 flex items-center gap-2">
      <CalendarDays size={32} className="text-[#a50303]" />
      Upcoming Events
    </h2>
    <div className="w-full flex flex-col md:flex-row gap-0 max-w-7xl">
      {/* Featured Event (left) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        className="bg-white rounded-xl shadow-lg flex flex-col md:w-2/5 w-full min-h-[420px] border border-[#fbeaea] md:mr-4 overflow-hidden"
      >
        <img
          src={events[0].image}
          alt={events[0].title}
          className="w-full h-56 object-cover"
        />
        <div className="p-8 flex flex-col flex-1 justify-between">
          <h3 className="text-2xl font-bold text-[#a50303] mb-2">{events[0].title}</h3>
          <p className="text-[#a50303] text-base mb-1">{events[0].date} &bull; {events[0].location}</p>
          <p className="text-gray-700 mb-4">{events[0].description}</p>
          <a
            href={events[0].link}
            className="mt-auto inline-flex items-center gap-2 bg-[#a50303] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-white hover:text-[#a50303] border-2 border-[#a50303] transition"
          >
            View Details <ArrowRight size={18} />
          </a>
        </div>
      </motion.div>
      {/* Other Events (right) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:w-3/5 w-full">
        {events.slice(1, 5).map((event) => (
          <motion.div
            key={event.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-lg flex flex-col min-h-[210px] border border-[#fbeaea] overflow-hidden"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-6 flex flex-col flex-1 justify-between">
              <h3 className="text-lg font-semibold text-[#a50303] mb-1">{event.title}</h3>
              <p className="text-[#a50303] text-sm mb-1">{event.date} &bull; {event.location}</p>
              <p className="text-gray-700 mb-3">{event.description}</p>
              <a
                href={event.link}
                className="mt-auto inline-flex items-center gap-2 bg-[#a50303] text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-white hover:text-[#a50303] border-2 border-[#a50303] transition"
              >
                View Details <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UpcomingEvent;