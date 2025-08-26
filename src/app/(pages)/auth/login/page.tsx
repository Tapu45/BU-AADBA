"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      if (data.error === "Your registration is not approved yet.") {
        setError(
          "Your alumni profile is not accepted yet. Please wait for admin approval."
        );
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
      return;
    }

    if (email === "admin.bu@email.com") {
      window.location.href = "/admin/requests";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-[#a50303]">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-[#a50303] text-white"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        {error && (
          <div className="mt-2 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
