"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - ready for API hookup
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#f5f6f8]">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Side: Cinematic Visual */}
        <div className="relative hidden lg:flex lg:col-span-5 bg-neutral-950 text-white flex-col justify-between p-10 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/login-bg.jpg"
              alt="Movexa Cinema"
              fill
              priority
              className="object-cover object-center filter contrast-110 brightness-95"
            />
            {/* Dark vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
          </div>

          {/* Top Brand */}
          <div className="relative z-10">
            <span className="text-sm font-bold tracking-[0.35em] text-white uppercase font-sans">
              MOVEXA
            </span>
          </div>

          {/* Bottom Heading & Description */}
          <div className="relative z-10 space-y-3">
            <div className="w-10 h-0.5 bg-white/80" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight font-sans">
              More Movies. More Moments.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm font-light">
              Your favorite movies, just a click away. Book tickets, explore cinemas, and enjoy the big screen experience.
            </p>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
          <div>
            {/* Top Right Tagline */}
            <div className="flex items-center justify-between sm:justify-end mb-6 text-xs text-neutral-400 font-medium">
              <span className="lg:hidden text-xs font-bold tracking-[0.2em] text-black uppercase">
                MOVEXA
              </span>
              <span>Your Cinema, Your Seat</span>
            </div>

            {/* Header Titles */}
            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-sans flex items-center gap-2">
                <span>Welcome Back</span>
                <span className="inline-block animate-wiggle">👋</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Login to your Movexa account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-neutral-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-neutral-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-700 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="text-neutral-700 hover:text-black font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-[#111827] hover:bg-black text-white text-sm font-semibold rounded-lg shadow-xs hover:shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Login</span>
                <ArrowRight size={15} />
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-neutral-400">or</span>
              </div>
            </div>

            {/* Social Button (Google) */}
            <button
              type="button"
              className="w-full py-2.5 px-4 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 rounded-lg text-xs sm:text-sm font-medium text-neutral-700 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Switch to Register */}
          <div className="pt-6 mt-6 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-neutral-900 hover:underline underline-offset-4"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}