"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI state only — ready for API integration
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-16 px-6 bg-[#fafafa]">
      <div className="w-full max-w-md bg-white border border-neutral-200 p-8 sm:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-black" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 font-mono">
              MOVEXA ACCESS
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-black uppercase font-sans">
            Sign In
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed font-light">
            Enter your email and password to manage your tickets and reserved seats.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-[11px] uppercase tracking-[0.12em] font-semibold text-neutral-800 mb-1.5"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              spellCheck={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full px-3.5 py-3 text-sm border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors text-black placeholder:text-neutral-400 bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-[11px] uppercase tracking-[0.12em] font-semibold text-neutral-800"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 hover:text-black font-mono transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
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
              className="w-full px-3.5 py-3 text-sm border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors text-black placeholder:text-neutral-400 bg-white"
            />
          </div>

          {/* Remember me & Recovery */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 border-neutral-300 accent-black cursor-pointer rounded-none"
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

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-black text-white hover:bg-neutral-800 active:scale-[0.99] text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-150 cursor-pointer mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Switch to Register */}
        <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-black hover:underline underline-offset-4"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}