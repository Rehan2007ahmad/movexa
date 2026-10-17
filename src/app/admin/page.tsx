"use client";

import React from "react";
import Link from "next/link";
import { LayoutDashboard, Plus, Film, Ticket, Users } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-[#64748b] mt-1">
            Real-time overview of ticket reservations, active movies, and box office analytics.
          </p>
        </div>

        <Link
          href="/admin/movies/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff5500] hover:bg-[#e64d00] text-white font-semibold text-xs rounded-lg transition-colors shadow-sm cursor-pointer w-fit"
        >
          <Plus size={15} />
          <span>Add New Movie</span>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-[#e8ecf2] rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Movies</span>
            <div className="w-9 h-9 rounded-lg bg-[#fff4ed] text-[#ff5500] flex items-center justify-center">
              <Film size={18} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#0f172a] mt-3">24</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span>+3 new this week</span>
          </p>
        </div>

        <div className="bg-white border border-[#e8ecf2] rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today&apos;s Bookings</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Ticket size={18} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#0f172a] mt-3">382</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span>+18% vs yesterday</span>
          </p>
        </div>

        <div className="bg-white border border-[#e8ecf2] rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Audience</span>
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#0f172a] mt-3">1,420</p>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Verified customers</p>
        </div>
      </div>

      {/* Main Dashboard Card Placeholder */}
      <div className="rounded-xl border border-[#e8ecf2] bg-white p-10 text-center shadow-2xs">
        <div className="mx-auto w-12 h-12 rounded-xl bg-[#fff4ed] text-[#ff5500] flex items-center justify-center mb-3.5">
          <LayoutDashboard size={24} />
        </div>
        <h3 className="text-base font-bold text-[#0f172a]">Cinema Analytics Overview</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
          Comprehensive box office metrics, admission reporting, and screening schedule insights.
        </p>
      </div>
    </div>
  );
}
