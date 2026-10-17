"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Clock,
  Calendar,
  Star,
  ExternalLink,
  Loader2,
  AlertCircle,
  RefreshCw,
  Clapperboard,
} from "lucide-react";

interface MovieItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail: {
    url: string;
    publicId: string;
  };
  genre: string[];
  language: string;
  duration: number;
  releaseDate: string;
  director?: string;
  cast: string[];
  rating?: number;
  status: "now_showing" | "coming_soon" | "ended";
  createdAt: string;
}

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (searchQuery.trim()) params.set("query", searchQuery.trim());

      const res = await fetch(`/api/movies?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load movies");
      }

      setMovies(data.movies || []);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error loading movies");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchMovies]);

  const getStatusBadge = (status: MovieItem["status"]) => {
    switch (status) {
      case "now_showing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#f0fdf4] text-emerald-800 border border-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now Showing
          </span>
        );
      case "coming_soon":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#fffbeb] text-amber-800 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Coming Soon
          </span>
        );
      case "ended":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            Ended
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Movies
          </h1>
          <p className="text-xs text-[#64748b] mt-1">
            Manage movie listings, release statuses, and cinema screening details.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchMovies}
            title="Refresh"
            className="p-2 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 border border-[#e2e8f0] rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
          </button>
          <Link
            href="/admin/movies/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff5500] hover:bg-[#e64d00] text-white font-semibold text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={15} />
            <span>Add New Movie</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#e8ecf2] p-3 rounded-xl shadow-2xs">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: "all", label: "All Movies" },
            { id: "now_showing", label: "Now Showing" },
            { id: "coming_soon", label: "Coming Soon" },
            { id: "ended", label: "Ended" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-[#0f172a] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search title, genre, director..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#ff5500] transition-all"
          />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="rounded-xl border border-[#e8ecf2] bg-white p-14 text-center shadow-2xs">
          <Loader2 size={28} className="animate-spin text-[#ff5500] mx-auto mb-2.5" />
          <p className="text-xs text-slate-500 font-mono">Loading movie catalog...</p>
        </div>
      ) : movies.length === 0 ? (
        /* Empty State */
        <div className="rounded-xl border border-[#e8ecf2] bg-white p-12 text-center shadow-2xs">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#fff4ed] text-[#ff5500] flex items-center justify-center mb-3.5">
            <Clapperboard size={24} />
          </div>
          <h3 className="text-base font-bold text-[#0f172a]">No Movies Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
            {searchQuery || statusFilter !== "all"
              ? "No titles matched your search filters. Try clearing your search query."
              : "Get started by adding your first movie entry to the catalog."}
          </p>
          <div className="mt-5">
            <Link
              href="/admin/movies/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff5500] hover:bg-[#e64d00] text-white font-semibold text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={14} />
              <span>Add New Movie</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Movies Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="group bg-white border border-[#e8ecf2] hover:border-slate-300 rounded-xl overflow-hidden transition-all shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Poster and Badges */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                  {movie.thumbnail?.url ? (
                    <Image
                      src={movie.thumbnail.url}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <Clapperboard size={32} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(movie.status)}
                  </div>

                  {/* Rating badge */}
                  {typeof movie.rating === "number" && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-amber-400 text-xs font-bold border border-amber-400/20">
                      <Star size={11} className="fill-amber-400" />
                      <span>{movie.rating.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-bold text-white truncate drop-shadow-xs">
                      {movie.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 font-mono truncate">
                      /{movie.slug}
                    </p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {movie.shortDescription}
                  </p>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{movie.duration} min</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                    </span>
                    <span>•</span>
                    <span className="uppercase">{movie.language}</span>
                  </div>

                  {/* Genre tags */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {movie.genre?.slice(0, 3).map((g) => (
                      <span
                        key={g}
                        className="px-2.5 py-0.5 rounded-md bg-[#f1f5f9] text-[11px] text-slate-700 font-medium"
                      >
                        {g}
                      </span>
                    ))}
                    {movie.genre?.length > 3 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-50 text-[11px] text-slate-500 border border-slate-200">
                        +{movie.genre.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3 bg-[#fbfcfd] border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 truncate max-w-[170px]">
                  {movie.director ? `Dir: ${movie.director}` : "Movexa Cinema"}
                </span>
                <span className="text-[#ff5500] hover:text-[#d94800] font-semibold text-xs flex items-center gap-1">
                  <span>View Details</span>
                  <ExternalLink size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
