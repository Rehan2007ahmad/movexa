"use client";

import React from "react";
import { Film } from "lucide-react";

export default function AdminMoviesPage() {
  return (
    <div className="space-y-6">
      {/* Page Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2 text-neutral-400 mb-1">
          <Film size={18} />
          <span className="text-xs font-mono uppercase tracking-wider">Catalog</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
          Movies
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Manage cinema catalog, screenings, posters, and details.
        </p>
      </div>

      {/* Content Placeholder */}
      <div className="rounded-2xl border border-neutral-800 bg-[#121216] p-8 sm:p-12 text-center">
        <div className="mx-auto w-12 h-12 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300 mb-4">
          <Film size={24} />
        </div>
        <h3 className="text-base font-semibold text-white">Movie Management</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1.5 leading-relaxed">
          Movie listings, add new releases, edit runtimes, genres, and ratings.
        </p>
      </div>
    </div>
  );
}
