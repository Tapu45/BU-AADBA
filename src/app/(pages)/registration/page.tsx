"use client";

import { useState } from "react";

export default function RegistrationPage() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#800000] mb-2 text-center">
          ALUMNI ASSOCIATION OF BERHAMPUR UNIVERSITY
        </h1>
        <p className="text-sm text-gray-700 text-center mb-4">
          (Regd. No.- GJM No. 9120-10)
        </p>
        <h2 className="text-lg font-semibold text-[#800000] mb-2 text-center">
          APPLICATION FOR REGISTRATION / LIFE MEMBERSHIP
        </h2>
        <p className="text-sm text-gray-700 mb-4 text-center">
          To<br />
          The General Secretary,<br />
          Alumni Association of Berhampur University.
        </p>
        <div className="bg-[#800000]/5 rounded p-3 mb-4 text-sm">
          <div className="mb-2 font-semibold text-[#800000]">Membership Fees:</div>
          <ul className="list-disc ml-5 mb-2">
            <li>Annual Fee: <span className="font-bold">INR 500/-</span></li>
            <li>Life Membership Fee: <span className="font-bold">INR 2000/-</span></li>
          </ul>
          <div className="mb-1 font-semibold text-[#800000]">Bank Details:</div>
          <div className="text-xs text-gray-800">
            Account No.: <span className="font-bold">6371101000777</span><br />
            Name: ALUMNI ASSOCIATION OF BERHAMPUR UNIVERSITY<br />
            Branch: Canara Bank, Berhampur University Campus, Bhanja Bihar, Odisha, 760007.<br />
            IFSC Code: <span className="font-bold">CNRB0006371</span><br />
            MICR Code: <span className="font-bold">760015007</span>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label className="font-semibold text-[#800000]">Email<span className="text-red-500">*</span></label>
            <input type="email" required className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Name<span className="text-red-500">*</span></label>
            <input type="text" required className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Name of the Department where studied<span className="text-red-500">*</span></label>
            <input type="text" required className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Degree<span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-3 mt-1">
              {["PG", "M.Phil", "Ph.D", "D.Sc./D.Lit", "Other"].map((deg) => (
                <label key={deg} className="flex items-center gap-1">
                  <input type="checkbox" name="degree" value={deg} className="accent-[#800000]" />
                  <span>{deg}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Pass out year (For Students)</label>
            <input type="text" className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Present Address<span className="text-red-500">*</span></label>
            <textarea required className="w-full mt-1 px-3 py-2 border rounded" rows={2} />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Present Occupation / Affiliation:</label>
            <input type="text" className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Year of Joining (for BU Employees who are not students of BU):</label>
            <input type="text" className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Mobile Number<span className="text-red-500">*</span></label>
            <input type="text" required className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Alternate E-Mail ID:</label>
            <input type="email" className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Your suggestions (if any) for the development of the Alumni Association:</label>
            <textarea className="w-full mt-1 px-3 py-2 border rounded" rows={2} />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Please, mention how you can contribute to the activities and growth of the alumni association:</label>
            <textarea className="w-full mt-1 px-3 py-2 border rounded" rows={2} />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Transaction ID and date of payment (If registration/life membership fee is paid):</label>
            <input type="text" className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="font-semibold text-[#800000]">Attach payment receipt (up to 5 files, PDF, document or image, max 10MB each):</label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="w-full mt-1"
              onChange={e => {
                if (e.target.files) {
                  setFiles(Array.from(e.target.files).slice(0, 5));
                }
              }}
            />
            <div className="text-xs text-gray-500 mt-1">
              Supported files: PDF, document or image. Max 10 MB per file.
            </div>
            {files.length > 0 && (
              <ul className="mt-2 text-xs text-gray-700">
                {files.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#800000] text-white px-6 py-2 rounded font-semibold shadow hover:bg-[#800000]/90 transition w-full mt-4"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};