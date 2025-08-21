"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const members = [
  { name: "Dr. Priya Sharma", department: "Physics", designation: "Professor" },
  { name: "Mr. Rahul Verma", department: "Chemistry", designation: "Lecturer" },
  { name: "Ms. Anjali Das", department: "Mathematics", designation: "Research Scholar" },
  { name: "Dr. S. Kumar", department: "Computer Science", designation: "HOD" },
  { name: "Prof. R. Singh", department: "Mechanical Engineering", designation: "Professor" },
  { name: "Dr. Sanghamitra Pati", department: "Biology", designation: "Director" },
  { name: "Prof. Aparajita Chowdhury", department: "English", designation: "Vice-Chancellor" },
  { name: "Satya S Tripathi", department: "Environmental Science", designation: "Secretary-General" },
  { name: "Dr. Siba Prasad Adhikary", department: "Botany", designation: "Ex. Vice-Chancellor" },
  { name: "Mr. Manoj Kumar", department: "Economics", designation: "Lecturer" },
  { name: "Ms. Sunita Rani", department: "History", designation: "Assistant Professor" },
  { name: "Dr. Ramesh Chandra", department: "Political Science", designation: "Professor" },
  { name: "Ms. Pooja Mishra", department: "Sociology", designation: "Lecturer" },
  { name: "Mr. Ajay Patnaik", department: "Commerce", designation: "Assistant Professor" },
  { name: "Dr. Sneha Sahu", department: "Psychology", designation: "Research Scholar" },
  { name: "Ms. Rekha Das", department: "Geography", designation: "Lecturer" },
  { name: "Mr. Suresh Nayak", department: "Law", designation: "Professor" },
  { name: "Dr. Anil Kumar", department: "Statistics", designation: "HOD" },
  { name: "Ms. Meera Mohanty", department: "Education", designation: "Lecturer" },
  { name: "Mr. Prakash Mishra", department: "Library Science", designation: "Assistant Professor" },
];

export default function MembersPage() {
  const [showRegister, setShowRegister] = useState(false);
   const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-8">
        <span className="inline-block w-2 h-10 bg-[#800000] rounded-full"></span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#800000] tracking-tight drop-shadow">
          Alumni Members List
        </h1>
     
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Table Section */}
        <div className="flex-1 overflow-x-auto rounded-lg shadow mb-2">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-[#800000]/10">
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Sl No.</th>
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Name of Alumni</th>
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Department</th>
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Designation</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, idx) => (
                <tr key={idx} className="border-t border-gray-100 hover:bg-[#800000]/5">
                  <td className="py-2 px-4">{idx + 1}</td>
                  <td className="py-2 px-4">{member.name}</td>
                  <td className="py-2 px-4">{member.department}</td>
                  <td className="py-2 px-4">{member.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Register Card Section */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl shadow p-6 sticky top-24">
            <h2 className="text-lg font-bold text-[#800000] mb-2">Become a Member</h2>
            <p className="text-sm text-gray-700 mb-4">
              Join our alumni network to connect, collaborate, and contribute to Berhampur University.
            </p>
            <button
              className="bg-[#800000] text-white px-5 py-2 rounded font-semibold shadow hover:bg-[#800000]/90 transition w-full mb-3 cursor-pointer"
              onClick={() => router.push("/registration")}
            >
              Register Now
            </button>
            {showRegister && (
              <form className="mt-3">
                <input type="text" placeholder="Name" className="w-full mb-2 px-3 py-2 border rounded" />
                <input type="text" placeholder="Department" className="w-full mb-2 px-3 py-2 border rounded" />
                <input type="text" placeholder="Designation" className="w-full mb-2 px-3 py-2 border rounded" />
                <button type="submit" className="bg-[#800000] text-white px-4 py-2 rounded font-semibold w-full mt-2">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}