"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

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
              MOVEXA REGISTRATION
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-black uppercase font-sans">
            Create Account
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed font-light">
            Register to reserve recliners in advance and access your digital movie tickets.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-[11px] uppercase tracking-[0.12em] font-semibold text-neutral-800 mb-1.5"
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
              placeholder="e.g. Alexander Reed"
              className="w-full px-3.5 py-3 text-sm border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors text-black placeholder:text-neutral-400 bg-white"
            />
          </div>

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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-3 text-sm border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors text-black placeholder:text-neutral-400 bg-white"
            />
            <span className="block mt-1 text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
              Minimum 8 characters
            </span>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-[11px] uppercase tracking-[0.12em] font-semibold text-neutral-800 mb-1.5"
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
              placeholder="••••••••"
              className="w-full px-3.5 py-3 text-sm border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors text-black placeholder:text-neutral-400 bg-white"
            />
          </div>

          {/* Terms Agreement */}
          <div className="pt-1.5">
            <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-neutral-600 leading-snug">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-3.5 h-3.5 mt-0.5 border-neutral-300 accent-black cursor-pointer rounded-none"
              />
              <span>
                I agree to the{" "}
                <Link href="/" className="text-black underline underline-offset-2 hover:text-neutral-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/" className="text-black underline underline-offset-2 hover:text-neutral-700">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-black text-white hover:bg-neutral-800 active:scale-[0.99] text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-150 cursor-pointer mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-black hover:underline underline-offset-4"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}