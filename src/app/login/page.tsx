"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            Account
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-black uppercase">
            Sign In
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Enter your email and password to access your bookings.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 focus:border-black outline-none transition-colors text-black placeholder:text-neutral-400 bg-white"
            />
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-600">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 border-neutral-300 accent-black cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#forgot"
              onClick={(e) => e.preventDefault()}
              className="text-neutral-500 hover:text-black transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Switch Link */}
        <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-black hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}