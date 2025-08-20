import React from "react";

const quickLinks = [
  [
    "RTI", "WebMail", "e-Samarth", "Academic Calendar", "Admission",
    "Research & Development IPR Cell", "ILMS", "Anti – Ragging", "Alumni Donation"
  ],
  [
    "Newsletter", "List of holiday", "IRINS", "Downloads", "Terms & Conditions for Online Payments",
    "R & D Cell", "Women's Cell", "Caste – Discrimination"
  ],
  [
    "Annual Report", "Exam Calendar", "Ambulance", "Online Fees Payment", "Examination",
    "Incubation Facility", "CAS", "How to reach"
  ],
  [
    "Audit Report", "Alumni portal", "NEP 2020", "Seminars / Conference", "IQAC",
    "Useful Links", "Gender Equity", "Nirbhaya Cell"
  ],
  [
    "Contact Us", "Kulsangeet", "Tender", "Donate for BU", "Awards and Donors List",
    "e-Office", "HEPSN Cell", "Telgu Chair"
  ]
];

const importantLinks = [
  "Raj Bhavan", "Mo College", "GOI", "RUSA", "NIEPA", "Resources", "E-Journal", "E-Theses",
  "OSHEC", "Ministry of HRD", "NAAC", "AISHE", "e- Samarth Portal", "E-Learning", "E-Books", "SWAYAM"
];

const Footer: React.FC = () => (
  <footer className="bg-[#4d4d4d] text-white pt-10 pb-4 px-4 md:px-12">
    <div className="max-w-7xl mx-auto">
      {/* Quick Links */}
      <div className="flex flex-col md:flex-row md:justify-between gap-8 pb-8 border-b border-gray-400">
        <div className="w-full md:w-2/3">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickLinks.map((col, i) => (
              <ul key={i} className="space-y-2 text-[16px]">
                {col.map((item, j) => (
                  <li key={j} className="hover:underline cursor-pointer text-gray-100">{item}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        {/* Important Links */}
        <div className="w-full md:w-1/3 md:pl-8">
          <h3 className="text-2xl font-semibold mb-4">Important Links</h3>
          <ul className="space-y-2 text-[16px]">
            {importantLinks.map((item, i) => (
              <li key={i} className="hover:underline cursor-pointer text-gray-100">{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Contact & Map */}
      <div className="flex flex-col md:flex-row md:items-start gap-8 py-8">
        <div className="flex-1">
          <h4 className="text-xl font-semibold mb-2 text-gray-100">Contact us</h4>
          <p className="mb-4 text-gray-200">
            Berhampur University Bhanja Bihar, Berhampur Dist: Ganjam, Odisha-760007
          </p>
          <h4 className="text-xl font-semibold mb-2 text-gray-100">Connect With us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="YouTube" className="hover:text-red-400"><i className="fab fa-youtube"></i></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <iframe
            title="Berhampur University Location"
            src="https://www.google.com/maps?q=Berhampur+University&output=embed"
            width="370"
            height="220"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="pt-4 border-t border-gray-400 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-gray-200 text-sm">
            © 2025 Berhampur University All rights reserved.
          </p>
          <p className="text-gray-300 text-xs mt-2 max-w-3xl">
            This is the official website of Berhampur University. The website is developed and hosted by National Informatics Centre. Berhampur University is the owner of the website. The Site is under development, Please share your valuable suggestions and feedback.
          </p>
        </div>
        <div className="flex items-center justify-end">
          <button className="bg-white text-[#4d4d4d] font-semibold px-4 py-2 rounded shadow">
            VISITORS COUNT - 3701303
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;