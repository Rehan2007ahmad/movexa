"use client";

import React from "react";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-neutral-400 mb-1">
          <Settings size={18} />
          <span className="text-xs font-mono uppercase tracking-wider">Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Cinema operating parameters, email notifications, and admin preferences.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#121216] p-8 sm:p-12 text-center">
        <div className="mx-auto w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300 mb-4">
          <Settings size={24} />
        </div>
        <h3 className="text-base font-semibold text-white">System Settings</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1.5 leading-relaxed">
          Cinema branding, booking cutoff windows, security keys, and administrator management.
        </p>
      </div>
    </div>
  );
}
