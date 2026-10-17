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
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now Showing
          </span>
        );
      case "coming_soon":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Coming Soon
          </span>
        );
      case "ended":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
            Ended
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
            <Film size={15} />
            <span className="text-[11px] font-mono uppercase tracking-wider">Catalog</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-sans">
            Movies
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage movie listings, show statuses, and screening metadata.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchMovies}
            title="Refresh"
            className="p-2 text-neutral-500 hover:text-neutral-900 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-md transition-colors cursor-pointer shadow-2xs"
          >
            <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
          </button>
          <Link
            href="/admin/movies/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs rounded-md transition-colors shadow-2xs cursor-pointer"
          >
            <Plus size={15} />
            <span>Upload Movie</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-neutral-200 p-2.5 rounded-lg shadow-2xs">
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
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-neutral-900 text-white font-medium shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
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
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder="Search title, genre, director..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-3.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="rounded-lg border border-neutral-200 bg-white p-14 text-center shadow-2xs">
          <Loader2 size={26} className="animate-spin text-orange-600 mx-auto mb-2.5" />
          <p className="text-xs text-neutral-500 font-mono">Loading movie catalog...</p>
        </div>
      ) : movies.length === 0 ? (
        /* Empty State */
        <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center shadow-2xs">
          <div className="mx-auto w-11 h-11 rounded-md bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 mb-3.5">
            <Film size={22} />
          </div>
          <h3 className="text-sm font-bold text-neutral-900">No Movies Found</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
            {searchQuery || statusFilter !== "all"
              ? "No titles matched your search query. Try clearing your filters."
              : "Get started by uploading your first movie release to the catalog."}
          </p>
          <div className="mt-4">
            <Link
              href="/admin/movies/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs rounded-md transition-colors shadow-2xs cursor-pointer"
            >
              <Plus size={14} />
              <span>Upload Your First Movie</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Movies Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="group bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-lg overflow-hidden transition-all shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Poster and Badges */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100">
                  {movie.thumbnail?.url ? (
                    <Image
                      src={movie.thumbnail.url}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                      <Film size={32} />
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-2.5 left-2.5">
                    {getStatusBadge(movie.status)}
                  </div>

                  {/* Rating badge */}
                  {typeof movie.rating === "number" && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-amber-400 text-[11px] font-bold border border-amber-400/20">
                      <Star size={11} className="fill-amber-400" />
                      <span>{movie.rating.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Title overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h3 className="text-sm font-bold text-white truncate drop-shadow-xs">
                      {movie.title}
                    </h3>
                    <p className="text-[10px] text-neutral-300 font-mono truncate">
                      /{movie.slug}
                    </p>
                  </div>
                </div>

                {/* Movie Details Body */}
                <div className="p-3.5 space-y-2.5">
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {movie.shortDescription}
                  </p>

                  {/* Attributes */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      <span>{movie.duration} min</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                    </span>
                    <span>•</span>
                    <span className="uppercase">{movie.language}</span>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {movie.genre?.slice(0, 3).map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded-md bg-neutral-100 text-[10px] text-neutral-700 font-medium"
                      >
                        {g}
                      </span>
                    ))}
                    {movie.genre?.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-neutral-50 text-[10px] text-neutral-500 border border-neutral-200">
                        +{movie.genre.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-2.5 bg-neutral-50/70 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-neutral-500 truncate max-w-[170px]">
                  {movie.director ? `Dir: ${movie.director}` : "Movexa Cinema"}
                </span>
                <span className="text-orange-600 hover:text-orange-700 font-semibold text-xs flex items-center gap-1">
                  <span>View Details</span>
                  <ExternalLink size={11} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
