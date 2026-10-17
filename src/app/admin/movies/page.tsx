"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Film,
  Plus,
  Search,
  Clock,
  Calendar,
  Star,
  ExternalLink,
  Loader2,
  AlertCircle,
  RefreshCw,
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Now Showing
          </span>
        );
      case "coming_soon":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Coming Soon
          </span>
        );
      case "ended":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
            Ended
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-neutral-400 mb-1">
            <Film size={18} />
            <span className="text-xs font-mono uppercase tracking-wider">Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Movies
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Manage movie listings, show statuses, and screening metadata.
          </p>
        </div>

        {/* Upload Movie CTA Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchMovies}
            title="Refresh"
            className="p-2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
          <Link
            href="/admin/movies/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-200 text-black font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            <span>Upload Movie</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#121216] border border-neutral-800 p-3 sm:p-4 rounded-2xl">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
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
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-neutral-800 text-white font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />
          <input
            type="text"
            placeholder="Search title, genre, director..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#18181d] border border-neutral-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="rounded-2xl border border-neutral-800 bg-[#121216] p-16 text-center">
          <Loader2 size={32} className="animate-spin text-white mx-auto mb-3" />
          <p className="text-xs text-neutral-400 font-mono">Loading movie catalog...</p>
        </div>
      ) : movies.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-neutral-800 bg-[#121216] p-12 sm:p-16 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-neutral-300 mb-4">
            <Film size={28} />
          </div>
          <h3 className="text-base font-bold text-white">No Movies Found</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1.5 leading-relaxed">
            {searchQuery || statusFilter !== "all"
              ? "No titles matched your filters. Try clearing search query."
              : "Get started by uploading your first movie release with posters and showtime details."}
          </p>
          <div className="mt-5">
            <Link
              href="/admin/movies/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-200 text-black font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Upload Your First Movie</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Movies Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="group bg-[#121216] hover:bg-[#15151b] border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all flex flex-col justify-between"
            >
              <div>
                {/* Poster and Badges */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-black">
                  {movie.thumbnail?.url ? (
                    <Image
                      src={movie.thumbnail.url}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600">
                      <Film size={32} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-black/40" />
                  
                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(movie.status)}
                  </div>

                  {/* Rating badge */}
                  {typeof movie.rating === "number" && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-amber-400 text-xs font-bold border border-amber-500/20">
                      <Star size={12} className="fill-amber-400" />
                      <span>{movie.rating.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-bold text-white truncate drop-shadow-sm">
                      {movie.title}
                    </h3>
                    <p className="text-[11px] text-neutral-300 font-mono truncate">
                      /{movie.slug}
                    </p>
                  </div>
                </div>

                {/* Movie Details Body */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {movie.shortDescription}
                  </p>

                  {/* Attributes Pills */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 font-mono">
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

                  {/* Genres */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {movie.genre?.slice(0, 3).map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded-md bg-neutral-800 text-[10px] text-neutral-300 font-medium"
                      >
                        {g}
                      </span>
                    ))}
                    {movie.genre?.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-neutral-900 text-[10px] text-neutral-500">
                        +{movie.genre.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-3 bg-[#16161c] border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-neutral-500 truncate max-w-[180px]">
                  {movie.director ? `Dir: ${movie.director}` : "Movexa Box Office"}
                </span>
                <Link
                  href={`/admin/movies/new?edit=${movie._id}`}
                  className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1"
                >
                  <span>Details</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
