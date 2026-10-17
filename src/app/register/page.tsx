"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no API call
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-16 px-6 bg-white">
      <div className="w-full max-w-md border border-neutral-200 p-8 sm:p-10 bg-white">
        {/* Title */}
        <div className="mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-1">
            Membership
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-black uppercase">
            Create Account
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Register to reserve seats and access your tickets online.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs uppercase tracking-wider font-medium text-neutral-700 mb-1.5"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 focus:border-black outline-none transition-colors text-black placeholder:text-neutral-400 bg-white"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-wider font-medium text-neutral-700 mb-1.5"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 focus:border-black outline-none transition-colors text-black placeholder:text-neutral-400 bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider font-medium text-neutral-700"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-neutral-500 hover:text-black uppercase tracking-wider font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 focus:border-black outline-none transition-colors text-black placeholder:text-neutral-400 bg-white"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs uppercase tracking-wider font-medium text-neutral-700 mb-1.5"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 focus:border-black outline-none transition-colors text-black placeholder:text-neutral-400 bg-white"
            />
          </div>

          {/* Terms */}
          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-neutral-600">
              <input
                type="checkbox"
                required
                className="w-3.5 h-3.5 mt-0.5 border-neutral-300 accent-black cursor-pointer"
              />
              <span>I accept the Terms of Service and Privacy Policy</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Switch Link */}
        <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-black hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}