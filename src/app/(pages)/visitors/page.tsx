"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Visitor = {
  id: string;
  name: string;
  designation: string;
  photoUrl: string;
  type: string;
};

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await fetch("/api/admin/visitor");
      if (response.ok) {
        const data = await response.json();
        setVisitors(data);
      } else {
        console.error("Failed to fetch visitors");
      }
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };

  // Filter visitors with photos
  const nationalVisitors = visitors.filter(
    (v) => v.type === "NATIONAL" && v.photoUrl
  );
  const internationalVisitors = visitors.filter(
    (v) => v.type === "INTERNATIONAL" && v.photoUrl
  );

  return (
    <main className="min-h-screen bg-[#f8f8fa] px-4 py-25">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-[#a50303] mb-2">
            Our Visitors
          </h1>
          <p className="text-lg text-muted-foreground">
            Meet our esteemed national and international visitors.
          </p>
        </header>

        {/* National Section */}
        {nationalVisitors.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#a50303] mb-6">National Visitors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {nationalVisitors.map((visitor) => (
                <motion.div
                  key={visitor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl border border-[#eaeaea] p-4 shadow hover:shadow-lg transition"
                >
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={visitor.photoUrl}
                      alt={visitor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center">{visitor.name}</h3>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* International Section */}
        {internationalVisitors.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#a50303] mb-6">International Visitors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {internationalVisitors.map((visitor) => (
                <motion.div
                  key={visitor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl border border-[#eaeaea] p-4 shadow hover:shadow-lg transition"
                >
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={visitor.photoUrl}
                      alt={visitor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center">{visitor.name}</h3>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {nationalVisitors.length === 0 && internationalVisitors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No visitors to display yet.</p>
          </div>
        )}
      </motion.div>
    </main>
  );
}