"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type MembershipTier = {
  id: string;
  name: string;
  fee: number;
  durationMonths?: number;
};

type Membership = {
  id: string;
  membershipNumber: string;
  amountPaid: number;
  paymentStatus: string;
  transactionId?: string;
  tier: MembershipTier;
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  memberships?: Membership[];
};

type AlumniProfile = {
  id: string;
   firstName: string;      
  lastName: string; 
  graduationYear: string;
  department: string;
  degree: string;
  phoneNumber?: string;
  alternateEmail?: string;
  address?: string;
  suggestions?: string;
  contributionNotes?: string;
  yearOfJoining?: string;
  registrationTransactionId?: string;
  registrationPaymentDate?: string;
  membershipTierId?: string;
  status: string;
  location?: string;
  user: User;
};

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/request");
    const data = await res.json();
    setRequests(data.requests || []);
    setLoading(false);
  };

  const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
    setActionLoading(true);
    await fetch("/api/admin/request", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setActionLoading(false);
    setExpandedId(null);
    fetchRequests();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-extrabold mb-6 text-[#a50303]">
        Alumni Registration Requests
      </h1>
      <div className="max-h-[600px] overflow-y-auto border rounded-xl shadow bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#a50303] text-white">
              <th className="py-4 px-6 font-semibold rounded-tl-xl">Name</th>
              <th className="py-4 px-6 font-semibold">Email</th>
              <th className="py-4 px-6 font-semibold">Graduation Year</th>
              <th className="py-4 px-6 font-semibold">Department</th>
              <th className="py-4 px-6 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <React.Fragment key={req.id}>
                <tr
                  className={`hover:bg-[#fbeaea] transition border-b border-[#f3dede]`}
                  style={{ fontSize: "1rem" }}
                >
                  <td className="py-4 px-6 font-medium text-black">
                    {req.firstName} {req.lastName}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{req.user?.email}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {req.graduationYear}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{req.department}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        req.status === "APPROVAL_PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {req.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Button
                      size="sm"
                      variant={expandedId === req.id ? "outline" : "default"}
                      className="flex items-center gap-1"
                      onClick={() =>
                        setExpandedId(expandedId === req.id ? null : req.id)
                      }
                    >
                      {expandedId === req.id ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                      See Details
                    </Button>
                  </td>
                </tr>
                {expandedId === req.id && (
                  <tr>
                    <td
                      colSpan={6}
                      className="bg-[#fbeaea] px-8 py-6 border-b border-[#f3dede]"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-2">
                         <div className="mb-2"><strong>Name:</strong> {req.firstName} {req.lastName}</div>
                          </div>
                          <div className="mb-2">
                            <strong>Email:</strong> {req.user?.email}
                          </div>
                          <div className="mb-2">
                            <strong>Graduation Year:</strong>{" "}
                            {req.graduationYear}
                          </div>
                          <div className="mb-2">
                            <strong>Department:</strong> {req.department}
                          </div>
                          <div className="mb-2">
                            <strong>Degree:</strong> {req.degree}
                          </div>
                          {req.phoneNumber && (
                            <div className="mb-2">
                              <strong>Phone:</strong> {req.phoneNumber}
                            </div>
                          )}
                          {req.alternateEmail && (
                            <div className="mb-2">
                              <strong>Alternate Email:</strong>{" "}
                              {req.alternateEmail}
                            </div>
                          )}
                          {req.address && (
                            <div className="mb-2">
                              <strong>Address:</strong> {req.address}
                            </div>
                          )}
                          {req.location && (
                            <div className="mb-2">
                              <strong>Location:</strong> {req.location}
                            </div>
                          )}
                          {req.suggestions && (
                            <div className="mb-2">
                              <strong>Suggestions:</strong> {req.suggestions}
                            </div>
                          )}
                          {req.contributionNotes && (
                            <div className="mb-2">
                              <strong>Contribution Notes:</strong>{" "}
                              {req.contributionNotes}
                            </div>
                          )}
                          {req.yearOfJoining && (
                            <div className="mb-2">
                              <strong>Year of Joining:</strong>{" "}
                              {req.yearOfJoining}
                            </div>
                          )}
                          {req.registrationTransactionId && (
                            <div className="mb-2">
                              <strong>Transaction ID:</strong>{" "}
                              {req.registrationTransactionId}
                            </div>
                          )}
                          {req.registrationPaymentDate && (
                            <div className="mb-2">
                              <strong>Payment Date:</strong>{" "}
                              {new Date(
                                req.registrationPaymentDate
                              ).toLocaleDateString()}
                            </div>
                          )}
                          {req.membershipTierId && (
                            <div className="mb-2">
                              <strong>Membership Tier:</strong>{" "}
                              {req.membershipTierId}
                            </div>
                          )}
                        </div>
                        <div>
                          {/* Membership Details */}
                          {req.user.memberships &&
                            req.user.memberships.length > 0 && (
                              <div className="mb-2 p-3 border rounded bg-white shadow">
                                <div className="font-semibold mb-2 text-[#a50303]">
                                  Membership Details:
                                </div>
                                {req.user.memberships.map((m) => (
                                  <div key={m.id} className="mb-3">
                                    <div>
                                      <strong>Plan:</strong> {m.tier?.name}
                                    </div>
                                    <div>
                                      <strong>Amount Paid:</strong> ₹
                                      {m.amountPaid}
                                    </div>
                                    <div>
                                      <strong>Transaction ID:</strong>{" "}
                                      {m.transactionId}
                                    </div>
                                    <div>
                                      <strong>Payment Status:</strong>{" "}
                                      {m.paymentStatus}
                                    </div>
                                    <div>
                                      <strong>Membership Number:</strong>{" "}
                                      {m.membershipNumber}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          <div className="mt-4 flex gap-4">
                            <Button
                              variant="outline"
                              disabled={actionLoading}
                              onClick={() => handleAction(req.id, "REJECTED")}
                            >
                              Reject
                            </Button>
                            <Button
                              className="bg-[#a50303] text-white"
                              disabled={actionLoading}
                              onClick={() => handleAction(req.id, "APPROVED")}
                            >
                              Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <p className="text-center py-4">No pending requests.</p>
        )}
      </div>
    </div>
  );
}
