"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Plus, Pencil, CheckCircle, XCircle } from "lucide-react";

type MembershipTier = {
  id: string;
  name: string;
  description: string;
  fee: number;
  durationMonths: number;
  benefits: string;
  isActive: boolean;
};

type MembershipTierForm = {
  name: string;
  description: string;
  fee: string;
  durationMonths: string;
  benefits: string;
  isActive: boolean;
};

type ApiResponse<T = any> = {
  error?: string;
  success?: boolean;
  tier?: MembershipTier;
  tiers?: MembershipTier[];
};

const RED = "#a50303";

export default function MembershipTierAdminPage() {
  const [tiers, setTiers] = useState<MembershipTier[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<MembershipTierForm>({
    name: "",
    description: "",
    fee: "",
    durationMonths: "",
    benefits: "",
    isActive: true,
  });
  const [editId, setEditId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  // Fetch membership tiers
  const fetchTiers = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/membership");
    const data: ApiResponse = await res.json();
    setTiers(data.tiers || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTiers();
  }, []);

  // Handle form change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Create new tier
  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const res = await fetch("/api/admin/membership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        fee: Number(form.fee),
        durationMonths: Number(form.durationMonths),
      }),
    });
    const data: ApiResponse = await res.json();
    if (!res.ok) setError(data.error || "Failed to create");
    else {
      setSuccess("Created successfully");
      setForm({
        name: "",
        description: "",
        fee: "",
        durationMonths: "",
        benefits: "",
        isActive: true,
      });
      setShowForm(false);
      fetchTiers();
    }
    setLoading(false);
  };

  // Edit tier
  const handleEdit = (tier: MembershipTier) => {
    setEditId(tier.id);
    setForm({
      name: tier.name,
      description: tier.description,
      fee: tier.fee.toString(),
      durationMonths: tier.durationMonths.toString(),
      benefits: tier.benefits,
      isActive: tier.isActive,
    });
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Update tier
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const res = await fetch("/api/admin/membership", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editId,
        ...form,
        fee: Number(form.fee),
        durationMonths: Number(form.durationMonths),
      }),
    });
    const data: ApiResponse = await res.json();
    if (!res.ok) setError(data.error || "Failed to update");
    else {
      setSuccess("Updated successfully");
      setEditId("");
      setForm({
        name: "",
        description: "",
        fee: "",
        durationMonths: "",
        benefits: "",
        isActive: true,
      });
      setShowForm(false);
      fetchTiers();
    }
    setLoading(false);
  };

  // Cancel form
  const handleCancel = () => {
    setEditId("");
    setForm({
      name: "",
      description: "",
      fee: "",
      durationMonths: "",
      benefits: "",
      isActive: true,
    });
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          <CheckCircle size={28} className="text-[color:#a50303]" />
          Membership Tiers
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-white border border-[#a50303] text-[#a50303] hover:bg-[#a50303] hover:text-white px-4 py-2 rounded shadow transition cursor-pointer"
          >
            <Plus size={20} />
            Create New
          </button>
        )}
      </div>

      {error && (
        <div className="text-red-600 mb-2 flex items-center gap-2">
          <XCircle size={18} />
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-600 mb-2 flex items-center gap-2">
          <CheckCircle size={18} />
          {success}
        </div>
      )}

      {showForm ? (
        <form
          onSubmit={editId ? handleUpdate : handleCreate}
          className="bg-white rounded-lg shadow p-6 mb-8 border border-gray-200 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              required
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#a50303]/40 text-gray-900"
            />
            <input
              name="fee"
              required
              type="number"
              placeholder="Fee"
              value={form.fee}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#a50303]/40 text-gray-900"
            />
            <input
              name="durationMonths"
              required
              type="number"
              placeholder="Duration (months)"
              value={form.durationMonths}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#a50303]/40 text-gray-900"
            />
            <input
              name="benefits"
              required
              placeholder="Benefits"
              value={form.benefits}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#a50303]/40 text-gray-900"
            />
          </div>
          <textarea
            name="description"
            required
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange(e as any)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#a50303]/40 text-gray-900"
            rows={2}
          />
          <label className="flex items-center gap-2">
            <input
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
              className="accent-[#a50303] h-4 w-4"
            />
            <span className="text-gray-700 font-medium">Active</span>
          </label>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#a50303] hover:bg-[#880202] text-white px-4 py-2 rounded shadow transition cursor-pointer"
            >
              {editId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow bg-white table-fixed">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="p-3 border-b text-left font-semibold w-1/5">Name</th>
              <th className="p-3 border-b text-left font-semibold w-1/6">Fee</th>
              <th className="p-3 border-b text-left font-semibold w-1/6">Duration</th>
              <th className="p-3 border-b text-left font-semibold w-1/6">Active</th>
              <th className="p-3 border-b text-left font-semibold w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr key={tier.id} className="hover:bg-[#a50303]/5 transition">
                <td className="p-3 border-b text-left font-medium text-gray-900">{tier.name}</td>
                <td className="p-3 border-b text-left text-gray-700">₹{tier.fee}</td>
                <td className="p-3 border-b text-left text-gray-700">{tier.durationMonths} mo</td>
                <td className="p-3 border-b text-left">
                  {tier.isActive ? (
                    <CheckCircle size={18} className="text-green-600 inline" />
                  ) : (
                    <XCircle size={18} className="text-red-500 inline" />
                  )}
                </td>
                <td className="p-3 border-b text-left">
                  <button
                    onClick={() => handleEdit(tier)}
                    className="flex items-center gap-1 px-3 py-1 bg-white border border-[#a50303] text-[#a50303] hover:bg-[#a50303] hover:text-white rounded transition cursor-pointer"
                  >
                    <Pencil size={16} />
                    Update
                  </button>
                </td>
              </tr>
            ))}
            {tiers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  No membership tiers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
