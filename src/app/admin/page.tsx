"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ShieldCheck,
  Film,
  Calendar,
  Users,
  Ticket,
  LogOut,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  // Route security: redirect unauthorized users to login
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6 bg-[#fafafa]">
        <Loader2 size={32} className="animate-spin text-neutral-900 mb-3" />
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
          Verifying administrator session...
        </p>
      </div>
    );
  }

  // Unauthorized access guard
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6 bg-[#fafafa]">
        <div className="max-w-md w-full bg-white border border-rose-200 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={24} />
          </div>
          <h1 className="text-xl font-bold text-neutral-900 mb-2">Access Denied</h1>
          <p className="text-xs text-neutral-600 leading-relaxed mb-6">
            You do not have administrative privileges to access the Movexa management dashboard.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Login</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#f8f9fa] py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header / Greeting Banner */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                <ShieldCheck size={12} className="text-amber-700" />
                ADMINISTRATOR
              </span>
              <span className="text-xs text-neutral-400 font-mono">• Movexa Console</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-sans">
              Hello, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium">
              Logged in as admin ({user.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors"
            >
              View Public Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
              <Film size={20} />
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Active Movies
            </p>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-neutral-900">12</span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                +2 this week
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
              <Calendar size={20} />
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Scheduled Showtimes
            </p>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-neutral-900">48</span>
              <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                Today
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
              <Ticket size={20} />
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Tickets Sold
            </p>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-neutral-900">1,240</span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                94% capacity
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
              <Users size={20} />
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Registered Users
            </p>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-neutral-900">3,892</span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Management Quick Actions */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-neutral-900 uppercase tracking-wider text-xs">
            Admin Management Modules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border border-neutral-200 rounded-xl hover:border-neutral-400 transition-colors cursor-pointer">
              <h3 className="text-sm font-bold text-neutral-900 mb-1">Manage Movies</h3>
              <p className="text-xs text-neutral-500">
                Add, edit, or archive movies, descriptions, posters, and trailers.
              </p>
            </div>
            <div className="p-4 border border-neutral-200 rounded-xl hover:border-neutral-400 transition-colors cursor-pointer">
              <h3 className="text-sm font-bold text-neutral-900 mb-1">Showtime Schedules</h3>
              <p className="text-xs text-neutral-500">
                Configure auditoriums, dates, times, and IMAX/Dolby formats.
              </p>
            </div>
            <div className="p-4 border border-neutral-200 rounded-xl hover:border-neutral-400 transition-colors cursor-pointer">
              <h3 className="text-sm font-bold text-neutral-900 mb-1">Bookings & Refunds</h3>
              <p className="text-xs text-neutral-500">
                View real-time seat reservations, verify tickets, and issue refunds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
