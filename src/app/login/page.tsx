"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Film,
  Sparkles,
  Ticket,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [simulatedStatus, setSimulatedStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setSimulatedStatus("Please fill in both email and password.");
      return;
    }
    // Pure UI simulation (No backend API call)
    setSimulatedStatus(
      `UI verified! Ready to connect to POST /api/auth/login with { email: "${email}", password: "•••" }`
    );
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-neutral-50/50">
      <div className="w-full max-w-5xl bg-white border border-neutral-200 rounded-2xl shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Login Form */}
        <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Header / Brand */}
            <div className="flex items-center justify-between mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
                <Ticket size={13} className="text-neutral-700" />
                <span>Movexa Member Access</span>
              </div>
              <Link
                href="/"
                className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                ← Back to home
              </Link>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 font-sans">
                Sign in to your account
              </h1>
              <p className="text-sm text-neutral-500 mt-2">
                Access your movie tickets, reserved recliners, and Movexa VIP rewards.
              </p>
            </div>

            {/* Simulated UI Feedback message if triggered */}
            {simulatedStatus && (
              <div className="mb-6 p-3.5 bg-neutral-100 border border-neutral-300 rounded-lg text-xs text-neutral-800 flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 size={16} className="text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-neutral-900">
                    UI Interaction Feedback
                  </span>
                  <span>{simulatedStatus}</span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Mail size={16} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-700"
                  >
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Forgot password flow will be hooked to auth service.");
                    }}
                    className="text-xs text-neutral-600 hover:text-neutral-950 font-medium transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock size={16} />
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
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950 cursor-pointer accent-neutral-950"
                  />
                  <span className="text-xs text-neutral-600">
                    Remember me on this browser
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-neutral-950 text-white hover:bg-neutral-800 text-sm font-semibold rounded-lg shadow-xs hover:shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight size={15} />
              </button>
            </form>

            {/* Social Auth Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-neutral-500 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => alert("Google OAuth flow can be connected.")}
                  className="w-full py-2.5 px-3 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 rounded-lg text-xs font-semibold text-neutral-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert("Apple ID flow can be connected.")}
                  className="w-full py-2.5 px-3 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 rounded-lg text-xs font-semibold text-neutral-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.94-14.31-7.07-10.74-12.7-22.97-16.89-36.68-4.19-13.71-6.29-26.47-6.29-38.29 0-14.88 3.73-27.53 11.2-37.95 7.47-10.42 16.9-15.74 28.3-15.96 4.99 0 10.5 1.25 16.54 3.76 6.03 2.5 10.23 3.81 12.59 3.93 1.96 0 6.44-1.48 13.43-4.44 6.99-2.97 12.92-4.22 17.79-3.77 13.68 1.19 24.38 6.57 32.1 16.14-11.96 7.27-17.83 17.2-17.61 29.77.22 9.87 4.07 18.06 11.55 24.58 7.48 6.51 16.32 10.15 26.52 10.92-2.39 7.4-5.38 15.11-8.98 23.15zM119.22 33.35c0-7.27 2.66-14.28 7.97-21.03 5.31-6.75 11.95-11.19 19.92-13.32.22 1.3.33 2.5.33 3.59 0 7.05-2.82 14.07-8.47 21.06-5.65 6.99-12.22 11.21-19.75 12.67-.11-.98-.22-1.96-.22-2.97z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Switch Link */}
          <div className="pt-8 mt-6 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-600">
              Don&apos;t have a Movexa account?{" "}
              <Link
                href="/register"
                className="font-bold text-neutral-950 hover:underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column: High Quality Cinema Visual & Testimonial */}
        <div className="relative hidden lg:flex lg:col-span-5 bg-neutral-950 text-white flex-col justify-between p-10 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/cinema-auth.jpg"
              alt="Luxury Cinema Theater"
              fill
              className="object-cover opacity-45 mix-blend-luminosity filter contrast-125"
              priority
            />
            {/* Pure dark gradient vignette for readable text */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white text-neutral-950 flex items-center justify-center">
              <Film size={16} />
            </div>
            <span className="font-bold tracking-tight text-sm">MOVEXA ELITE</span>
          </div>

          {/* Bottom Content / Cinema Experience Note */}
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-white border border-white/20">
              <Sparkles size={11} className="text-amber-300" />
              <span>THE ULTIMATE SCREENING</span>
            </div>

            <blockquote className="text-lg font-medium text-neutral-100 leading-snug">
              &ldquo;Cinema is a mirror that reflects the universe back to us in light and shadow.&rdquo;
            </blockquote>

            <div className="pt-4 border-t border-white/15 space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-white" />
                <span>Instant paperless mobile boarding</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket size={14} className="text-white" />
                <span>Guaranteed best-seat reservation engine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}