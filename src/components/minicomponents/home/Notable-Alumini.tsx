"use client";

const notableAlumini = [
  {
    name: "Prof. Siba Prasad Adhikary",
    title: "Ex. Vice-Chancellor, F.M.University, Odisha",
    img: "/assets/notable/siba_prasad.png",
  },
  {
    name: "Dr.( Mrs.) Sanghamitra Pati",
    title: "Director, ICMR-RMRC, Bhubaneswar",
    img: "/assets/notable/sanghamitra_pati.png",
  },
  {
    name: "Satya S Tripathi",
    title:
      "Secretary-General, Global Alliance for a Sustainable Planet. Water Unite. New York, New York, United States.",
    img: "/assets/notable/satytripathy.jpg",
  },
  {
    name: "Prof. Aparajita Chowdhury",
    title:
      "Vice-Chancellor, Rama Devi Women's University Vidya Vihar, Bhubaneswar - 751022",
    img: "/assets/notable/aparajita.jpg",
  },
];

const glanceStats = [
  { label: "Postgraduate Students", value: 2000 },
  { label: "Faculty", value: 124 },
  { label: "Patents", value: 10 },
  { label: "Staff", value: 414 },
];

export default function NotableAlumini() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#800000] mb-8 text-center">
        Notable Alumni
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {notableAlumini.map((alum, idx) => (
          <div
            key={alum.name}
            className="flex flex-col items-center bg-white rounded-xl shadow border border-gray-100 p-4"
          >
            <img
              src={alum.img}
              alt={alum.name}
              className="w-28 h-28 object-cover rounded-full border-2 border-[#800000] mb-3"
            />
            <h3 className="text-lg font-semibold text-[#800000] text-center mb-1">
              {alum.name}
            </h3>
            <p className="text-xs text-gray-700 text-center">{alum.title}</p>
          </div>
        ))}
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
  )
}