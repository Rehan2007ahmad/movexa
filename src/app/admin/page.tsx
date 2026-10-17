"use client";

import React from "react";
import { LayoutDashboard } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
          <LayoutDashboard size={15} />
          <span className="text-[11px] font-mono uppercase tracking-wider">Overview</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-sans">
          Dashboard
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Real-time metrics, ticket sales, and cinema performance.
        </p>
      </div>

      {/* Content Placeholder */}
      <div className="rounded-lg border border-neutral-200 bg-white p-8 sm:p-12 text-center shadow-2xs">
        <div className="mx-auto w-11 h-11 rounded-md bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 mb-3.5">
          <LayoutDashboard size={22} />
        </div>
        <h3 className="text-sm font-semibold text-neutral-900">Dashboard Overview</h3>
        <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1 leading-relaxed">
          Dashboard metrics, charts, and activity feeds will be configured here.
        </p>
      </div>
    </div>
  );
}
