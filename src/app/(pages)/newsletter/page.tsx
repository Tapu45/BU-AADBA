"use client";

export default function NewsLetterPage() {
  const newsletters = [
    {
      title: "Alumni E-Newsletter - January 2025",
      description: "Highlights from the 54th Foundation Day, alumni achievements, and upcoming events.",
      link: "https://buodisha.edu.in/wp-content/uploads/2025/01/Alumni-E-Newsletter-Jan-2025.pdf",
      date: "Jan 2025",
    },
    {
      title: "Alumni E-Newsletter - August 2024",
      description: "Coverage of alumni meet, new initiatives, and university updates.",
      link: "https://buodisha.edu.in/wp-content/uploads/2024/08/Alumni-E-Newsletter-Aug-2024.pdf",
      date: "Aug 2024",
    },
    {
      title: "Alumni E-Newsletter - March 2024",
      description: "Alumni spotlights, research highlights, and campus news.",
      link: "https://buodisha.edu.in/wp-content/uploads/2024/03/Alumni-E-Newsletter-Mar-2024.pdf",
      date: "Mar 2024",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <img src="/assets/alumini/alumini1.jpeg" alt="Newsletter" className="w-12 h-12 rounded-full object-cover" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#800000] tracking-tight drop-shadow">
          Alumni E-Newsletters
        </h1>
      </div>
      <div className="space-y-6">
        {newsletters.map((nl, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow p-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#800000] mb-1">{nl.title}</h2>
              <p className="text-gray-700 mb-2">{nl.description}</p>
              <span className="text-xs text-gray-500">{nl.date}</span>
            </div>
            <a
              href={nl.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#800000] text-white px-5 py-2 rounded font-semibold shadow hover:bg-[#800000]/90 transition"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}