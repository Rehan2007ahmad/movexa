"use client";

import React from "react";
import { Ticket } from "lucide-react";

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
          <Ticket size={15} />
          <span className="text-[11px] font-mono uppercase tracking-wider">Reservations</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-sans">
          Bookings
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Monitor ticket reservations, QR passes, and seat allocations.
        </p>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white p-8 sm:p-12 text-center shadow-2xs">
        <div className="mx-auto w-11 h-11 rounded-md bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 mb-3.5">
          <Ticket size={22} />
        </div>
        <h3 className="text-sm font-semibold text-neutral-900">Ticket Bookings</h3>
        <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1 leading-relaxed">
          Search reservations by booking reference, view ticket details, and verify admissions.
        </p>
      </div>
    </div>
  );
}
