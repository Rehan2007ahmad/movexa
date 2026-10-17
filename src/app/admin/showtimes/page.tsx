"use client";

import React from "react";
import { Calendar } from "lucide-react";

export default function AdminShowtimesPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-neutral-400 mb-1">
          <Calendar size={18} />
          <span className="text-xs font-mono uppercase tracking-wider">Schedule</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
          Showtimes
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Configure screen schedules, show timings, and hall assignments.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#121216] p-8 sm:p-12 text-center">
        <div className="mx-auto w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300 mb-4">
          <Calendar size={24} />
        </div>
        <h3 className="text-base font-semibold text-white">Showtimes & Schedules</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1.5 leading-relaxed">
          Manage theater halls, date slots, IMAX & Dolby projection schedules.
        </p>
      </div>
    </div>
  );
}
