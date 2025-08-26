"use client";

import React, { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const carouselImages = [
  { src: "/assets/events/past2.jpg", alt: "Event 1" },
  { src: "/assets/events/past3.jpg", alt: "Event 2" },
  { src: "/assets/events/past4.jpg", alt: "Event 3" },
];

const eventNotifications = [
  {
    title: "Alumni Meet Registration Opens",
    date: "2025-08-01",
    download: "/downloads/alumni-meet-details.pdf",
  },
  {
    title: "Webinar: Career Guidance",
    date: "2025-07-25",
    download: "/downloads/webinar-details.pdf",
  },
  {
    title: "Call for Alumni Stories",
    date: "2025-07-15",
    download: "/downloads/alumni-stories.pdf",
  },
  {
    title: "Placement Drive Notification",
    date: "2025-07-10",
    download: "/downloads/placement-drive.pdf",
  },
  {
    title: "Newsletter July 2025 Released",
    date: "2025-07-05",
    download: "/downloads/newsletter-july2025.pdf",
  },
  {
    title: "Mentorship Program Launch",
    date: "2025-06-30",
    download: "/downloads/mentorship-program.pdf",
  },
];

const bannerImages = [
  {
    src: "/assets/events/past2.jpg",
    style: "top-6 left-8 w-48 h-32 rounded-xl shadow-lg",
  },
  {
    src: "/assets/events/past3.jpg",
    style: "top-20 left-56 w-40 h-28 rounded-xl shadow-lg",
  },
];

const upcomingEvents = [
  {
    title: "Annual Alumni Meet 2025",
    date: "October 12, 2025",
    location: "University Auditorium",
    description:
      "Reconnect with fellow alumni, faculty, and students. Enjoy cultural programs, networking, and dinner.",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Career Guidance Webinar",
    date: "September 5, 2025",
    location: "Online (Zoom)",
    description:
      "Industry leaders and alumni share career tips and opportunities for current students and graduates.",
    image:
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Entrepreneurship Panel",
    date: "August 28, 2025",
    location: "Innovation Hall",
    description:
      "Alumni entrepreneurs discuss their journeys and answer questions from aspiring founders.",
    image:
      "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Tech Networking Night",
    date: "September 20, 2025",
    location: "Tech Park Lounge",
    description:
      "Connect with alumni working in the tech industry. Share ideas, opportunities, and build your network.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
  },
];

// Pagination logic
const PAGE_SIZE = 10;
function usePaginatedData<T>(data: T[]) {
  const [page, setPage] = React.useState(1);
  const maxPage = Math.ceil(data.length / PAGE_SIZE);
  const paginated = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return { paginated, page, setPage, maxPage };
}

export default function EventsPage() {
  const { paginated, page, setPage, maxPage } =
    usePaginatedData(eventNotifications);
  const carouselApiRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselApiRef.current) {
        carouselApiRef.current.scrollNext();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <main className="max-w-8xl mx-auto px-0 py-19">
      {/* Banner Section */}
      <section className="relative w-full h-[320px] mb-8 overflow-hidden">
        {/* Main background image */}
        <img
          src="/assets/events/past4.jpg"
          alt="Banner Background"
          className="w-full h-full object-cover"
        />
        {/* Overlayed small images */}
        {bannerImages.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={`Banner Overlay ${idx + 1}`}
            className={`absolute ${img.style} object-cover border-4 border-white`}
            style={{ zIndex: 2 }}
          />
        ))}
        {/* Gradient overlay with heading and breadcrumb */}
        <div
          className="absolute bottom-0 left-0 w-full py-2 px-8 flex flex-col"
          style={{
            zIndex: 3,
            background:
              "linear-gradient(180deg, rgba(144, 122, 122, 0.25) 0%, rgba(114, 83, 83, 0.85) 90%)",
          }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
            EVENTS
          </h1>
          <div className="text-white text-sm font-medium">HOME / Events</div>
          <p className="text-white text-base mt-2 max-w-2xl">
            Discover upcoming and past alumni events, reunions, webinars, and
            more. Stay connected and celebrate our vibrant alumni community!
          </p>
        </div>
      </section>

      {/* Event Notifications Table */}
      <section className="mb-10">
        <div className="flex items-center mb-4 px-30">
          <div className="h-10 w-2 rounded-full bg-gradient-to-b from-[#a50303] to-[#d32f2f] mr-3 shadow-md"></div>
          <h2 className="text-3xl font-bold text-[#a50303] drop-shadow-sm tracking-tight">
            Event Notifications
          </h2>
        </div>
        <div className="w-full flex justify-center">
          <div className="max-w-7xl w-full overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl shadow-lg text-left border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-[#a50303] to-[#d32f2f] text-white rounded-t-2xl">
                  <th className="py-4 px-5 font-semibold rounded-tl-2xl">
                    Sl No
                  </th>
                  <th className="py-4 px-5 font-semibold">Title</th>
                  <th className="py-4 px-5 font-semibold">Date</th>
                  <th className="py-4 px-5 font-semibold rounded-tr-2xl">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((notif, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-b-0 hover:bg-[#fbeaea] transition-colors duration-200"
                  >
                    <td className="py-3 px-5">
                      {(page - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="py-3 px-5">{notif.title}</td>
                    <td className="py-3 px-5">{notif.date}</td>
                    <td className="py-3 px-5">
                      <a
                        href={notif.download}
                        className="text-[#a50303] underline hover:text-[#d32f2f] transition-colors"
                        download
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-end items-center mt-4 space-x-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span>
            Page {page} of {maxPage}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            disabled={page === maxPage}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </section>

      {/* Upcoming Events */}
        <section className="mb-10">
        <div className="flex items-center mb-4 px-20">
          <div className="h-8 w-2 rounded-full bg-gradient-to-b from-[#a50303] to-[#d32f2f] mr-3 shadow-md"></div>
          <h2 className="text-2xl font-bold text-[#a50303] drop-shadow-sm tracking-tight">
            Upcoming Events
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-20">
          {upcomingEvents.map((event, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col hover:scale-[1.02] hover:shadow-lg transition-transform duration-200"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-32 object-cover rounded-t-xl"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#a50303] mb-1">
                  {event.title}
                </h3>
                <div className="text-xs text-gray-600 mb-1">
                  <span className="font-semibold">Date:</span> {event.date}
                </div>
                <div className="text-xs text-gray-600 mb-1">
                  <span className="font-semibold">Location:</span> {event.location}
                </div>
                <p className="mt-1 text-sm text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
