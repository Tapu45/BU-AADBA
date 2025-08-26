"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays } from "lucide-react";

type Event = {
  id: string;
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location?: string;
  venue?: string;
  isOnline?: boolean;
  meetingLink?: string;
  meetingPassword?: string;
  capacity?: number;
  registrationFee?: number;
  registrationStartDate?: string;
  registrationEndDate?: string;
  isFeatured?: boolean;
  coverImage?: string;
  createdBy?: string;
  albumId?: string;
  isPublished?: boolean;
};

const initialForm: Partial<Event> = {
  title: "",
  description: "",
  eventType: "",
  startDate: "",
  endDate: "",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Event>>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/event");
    const data = await res.json();
    setEvents(data.events || []);
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const payload = editingId ? { ...form, id: editingId } : form;
    const res = await fetch("/api/admin/event", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!res.ok) {
      alert(result.error || "Something went wrong");
    } else {
      await fetchEvents();
      resetForm();
      setShowForm(false);
    }
  };

  const handleEdit = (ev: Event) => {
    setEditingId(ev.id);
    setForm({
      title: ev.title,
      description: ev.description,
      eventType: ev.eventType,
      startDate: ev.startDate,
      endDate: ev.endDate,
      location: ev.location,
      venue: ev.venue,
      isOnline: ev.isOnline,
      meetingLink: ev.meetingLink,
      meetingPassword: ev.meetingPassword,
      capacity: ev.capacity,
      registrationFee: ev.registrationFee,
      registrationStartDate: ev.registrationStartDate,
      registrationEndDate: ev.registrationEndDate,
      isFeatured: ev.isFeatured,
      coverImage: ev.coverImage,
      createdBy: ev.createdBy,
      albumId: ev.albumId,
      isPublished: ev.isPublished,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  // Group events
  const now = new Date();
  const upcomingEvents = events.filter((ev) => new Date(ev.startDate) > now);
  const pastEvents = events.filter((ev) => new Date(ev.endDate) < now);

  return (
    <div className="min-h-screen px-4 py-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <CalendarDays size={40} className="text-[#a50303]" />
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Events
          </h1>
        </div>
        <Button
          className="bg-[#a50303] text-white hover:bg-black transition"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          {editingId ? "Edit Event" : "Create Event"}
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="mb-10 bg-black/5 rounded-xl p-6 border border-[#a50303] shadow-lg max-w-4xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-black font-semibold mb-1">
                  Title
                </label>
                <Input
                  name="title"
                  value={form.title || ""}
                  onChange={handleChange}
                  required
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-black font-semibold mb-1">
                  Description
                </label>
                <Textarea
                  name="description"
                  value={form.description || ""}
                  onChange={handleChange}
                  required
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              <div>
                <label className="block text-black font-semibold mb-1">
                  Event Type
                </label>
                <Input
                  name="eventType"
                  value={form.eventType || ""}
                  onChange={handleChange}
                  required
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              <div>
                <label className="block text-black font-semibold mb-1">
                  Location
                </label>
                <Input
                  name="location"
                  value={form.location || ""}
                  onChange={handleChange}
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              <div>
                <label className="block text-black font-semibold mb-1">
                  Start Date
                </label>
                <Input
                  name="startDate"
                  type="datetime-local"
                  value={form.startDate || ""}
                  onChange={handleChange}
                  required
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              <div>
                <label className="block text-black font-semibold mb-1">
                  End Date
                </label>
                <Input
                  name="endDate"
                  type="datetime-local"
                  value={form.endDate || ""}
                  onChange={handleChange}
                  required
                  className="bg-white text-black border-[#a50303] focus:ring-[#a50303]"
                />
              </div>
              {/* Add more fields as needed */}
              <div className="col-span-2 flex justify-end gap-4 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#a50303] text-black hover:bg-[#a50303] hover:text-white"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#a50303] text-white hover:bg-black"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Upcoming Events Table */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-black mb-4">
            Upcoming Events
          </h2>
          <div className="max-h-[400px] overflow-y-auto border rounded-xl shadow">
            <Table className="rounded-xl overflow-hidden">
              <TableHeader className="bg-[#a50303] text-white">
                <TableRow>
                  <TableCell className="font-bold">Title</TableCell>
                  <TableCell className="font-bold">Type</TableCell>
                  <TableCell className="font-bold">Start Date</TableCell>
                  <TableCell className="font-bold">End Date</TableCell>
                  <TableCell className="font-bold">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingEvents.map((ev) => (
                  <TableRow key={ev.id} className="hover:bg-black/5 transition">
                    <TableCell className="text-black">{ev.title}</TableCell>
                    <TableCell className="text-black">{ev.eventType}</TableCell>
                    <TableCell className="text-black">
                      {new Date(ev.startDate).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-black">
                      {new Date(ev.endDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-[#a50303] text-white hover:bg-black"
                        onClick={() => handleEdit(ev)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {upcomingEvents.length === 0 && (
              <p className="text-black mt-6 text-center">No upcoming events.</p>
            )}
          </div>
        </div>
        {/* Past Events Table */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-black mb-4">Past Events</h2>
          <div className="max-h-[400px] overflow-y-auto border rounded-xl shadow">
            <Table className="rounded-xl overflow-hidden">
              <TableHeader className="bg-[#a50303] text-white">
                <TableRow>
                  <TableCell className="font-bold">Title</TableCell>
                  <TableCell className="font-bold">Type</TableCell>
                  <TableCell className="font-bold">Start Date</TableCell>
                  <TableCell className="font-bold">End Date</TableCell>
                  <TableCell className="font-bold">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastEvents.map((ev) => (
                  <TableRow key={ev.id} className="hover:bg-black/5 transition">
                    <TableCell className="text-black">{ev.title}</TableCell>
                    <TableCell className="text-black">{ev.eventType}</TableCell>
                    <TableCell className="text-black">
                      {new Date(ev.startDate).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-black">
                      {new Date(ev.endDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-[#a50303] text-white hover:bg-black"
                        onClick={() =>
                          (window.location.href = `/admin/events/${ev.id}/media`)
                        }
                      >
                        Manage Media
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {pastEvents.length === 0 && (
              <p className="text-black mt-6 text-center">No past events.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
