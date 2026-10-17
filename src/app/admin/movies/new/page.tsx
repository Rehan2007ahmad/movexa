"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Film,
  ArrowLeft,
  UploadCloud,
  Check,
  X,
  Plus,
  Loader2,
  AlertCircle,
  Clock,
  Calendar,
  Sparkles,
  Link as LinkIcon,
  Star,
  Layers,
  Info,
} from "lucide-react";

const GENRE_PRESETS = [
  "Action",
  "Sci-Fi",
  "Drama",
  "Thriller",
  "Adventure",
  "Horror",
  "IMAX",
  "Animation",
  "Comedy",
  "Crime",
  "Romance",
  "Mystery",
];

const LANGUAGE_PRESETS = [
  "English",
  "Spanish",
  "French",
  "Hindi",
  "Japanese",
  "Korean",
  "German",
  "Italian",
  "Mandarin",
];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewMoviePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [genres, setGenres] = useState<string[]>(["Action", "Sci-Fi"]);
  const [customGenre, setCustomGenre] = useState("");
  const [language, setLanguage] = useState("English");
  const [duration, setDuration] = useState<number | "">(120);
  const [releaseDate, setReleaseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState<string[]>([]);
  const [castInput, setCastInput] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [status, setStatus] = useState<"now_showing" | "coming_soon" | "ended">(
    "coming_soon"
  );

  // Thumbnail upload states
  const [thumbnail, setThumbnail] = useState<{
    url: string;
    publicId: string;
  } | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Title change handler with auto-slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isSlugManual) {
      setSlug(generateSlug(val));
    }
  };

  // Thumbnail file upload handler
  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setImageUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "movexa/movies");

      const res = await fetch("/api/uploads/image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload image to Cloudinary");
      }

      setThumbnail({
        url: data.data.url,
        publicId: data.data.publicId,
      });
    } catch (err: unknown) {
      console.error(err);
      setImageUploadError(
        err instanceof Error ? err.message : "Error uploading image"
      );
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Cast management
  const handleAddCast = () => {
    const trimmed = castInput.trim();
    if (trimmed && !cast.includes(trimmed)) {
      setCast([...cast, trimmed]);
      setCastInput("");
    }
  };

  const handleRemoveCast = (actor: string) => {
    setCast(cast.filter((c) => c !== actor));
  };

  // Genre management
  const toggleGenre = (genre: string) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };

  const handleAddCustomGenre = () => {
    const trimmed = customGenre.trim();
    if (trimmed && !genres.includes(trimmed)) {
      setGenres([...genres, trimmed]);
      setCustomGenre("");
    }
  };

  // Duration formatted helper
  const formattedDuration =
    typeof duration === "number" && duration > 0
      ? `${Math.floor(duration / 60)}h ${duration % 60}m`
      : "";

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);
    setFieldErrors({});

    // Client-side quick checks
    if (!thumbnail) {
      setErrorBanner("Please upload a movie poster thumbnail first.");
      return;
    }

    if (genres.length === 0) {
      setErrorBanner("At least one movie genre is required.");
      return;
    }

    if (cast.length === 0) {
      setErrorBanner("Please add at least one cast member.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        shortDescription: shortDescription.trim(),
        longDescription: longDescription.trim(),
        thumbnail,
        trailerUrl: trailerUrl.trim() || undefined,
        genre: genres,
        language: language.trim(),
        duration: Number(duration),
        releaseDate: new Date(releaseDate).toISOString(),
        director: director.trim() || undefined,
        cast,
        rating: rating !== "" ? Number(rating) : undefined,
        status,
      };

      const res = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
          setErrorBanner("Please correct the errors highlighted below.");
        } else {
          setErrorBanner(data.message || "Failed to create movie.");
        }
        setIsSubmitting(false);
        return;
      }

      setSuccessBanner("Movie published successfully! Redirecting...");
      setTimeout(() => {
        router.push("/admin/movies");
      }, 1200);
    } catch (err: unknown) {
      console.error(err);
      setErrorBanner(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <Link
            href="/admin/movies"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Movies</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <span>Upload New Movie</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 font-normal">
              IMAX & 2D Cinema
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Fill in the movie details, synopsis, screening attributes, and poster media.
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/movies"
            className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl transition-colors"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isUploadingImage}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-black bg-white hover:bg-neutral-200 disabled:opacity-50 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Check size={15} />
                <span>Publish Movie</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successBanner && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-2.5 animate-in fade-in">
          <Check size={16} />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Error Banner */}
      {errorBanner && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorBanner}</span>
        </div>
      )}

      {/* Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* =========================================================================
            LEFT COLUMN: Details, Synopses, Cast, Trailer (7 cols)
           ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Basic Information */}
          <div className="bg-[#121216] border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2 text-neutral-300 font-semibold text-sm border-b border-neutral-800 pb-3">
              <Film size={16} className="text-white" />
              <span>Movie Title & Slug</span>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dune: Part Two"
                value={title}
                onChange={handleTitleChange}
                className="w-full bg-[#18181d] border border-neutral-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              {fieldErrors.title && (
                <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.title[0]}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  URL Slug <span className="text-rose-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsSlugManual(false);
                    setSlug(generateSlug(title));
                  }}
                  className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles size={11} />
                  <span>Auto-generate</span>
                </button>
              </div>
              <div className="flex items-center bg-[#18181d] border border-neutral-700/80 rounded-xl px-3.5 py-2 focus-within:border-white transition-colors">
                <span className="text-neutral-500 text-xs select-none pr-1">/movies/</span>
                <input
                  type="text"
                  required
                  placeholder="dune-part-two"
                  value={slug}
                  onChange={(e) => {
                    setIsSlugManual(true);
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none font-mono"
                />
              </div>
              {fieldErrors.slug && (
                <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.slug[0]}</p>
              )}
            </div>

            {/* Short Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Short Description <span className="text-rose-400">*</span>
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    shortDescription.length < 20 || shortDescription.length > 200
                      ? "text-neutral-500"
                      : "text-emerald-400"
                  }`}
                >
                  {shortDescription.length}/200 chars (min 20)
                </span>
              </div>
              <textarea
                rows={2}
                required
                placeholder="Brief logline shown on movie cards and banners (20 - 200 chars)..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full bg-[#18181d] border border-neutral-700/80 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors resize-none"
              />
              {fieldErrors.shortDescription && (
                <p className="text-[11px] text-rose-400 mt-1">
                  {fieldErrors.shortDescription[0]}
                </p>
              )}
            </div>

            {/* Long Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Long Synopsis <span className="text-rose-400">*</span>
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    longDescription.length < 50 || longDescription.length > 1000
                      ? "text-neutral-500"
                      : "text-emerald-400"
                  }`}
                >
                  {longDescription.length}/1000 chars (min 50)
                </span>
              </div>
              <textarea
                rows={4}
                required
                placeholder="Comprehensive cinema synopsis, story overview, and background details (50 - 1000 chars)..."
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="w-full bg-[#18181d] border border-neutral-700/80 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              {fieldErrors.longDescription && (
                <p className="text-[11px] text-rose-400 mt-1">
                  {fieldErrors.longDescription[0]}
                </p>
              )}
            </div>
          </div>

          {/* Card 2: Cast & Director */}
          <div className="bg-[#121216] border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2 text-neutral-300 font-semibold text-sm border-b border-neutral-800 pb-3">
              <Layers size={16} className="text-white" />
              <span>Credits & Cast</span>
            </div>

            {/* Director */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Director <span className="text-neutral-500 text-[11px]">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Denis Villeneuve"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="w-full bg-[#18181d] border border-neutral-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Cast Members */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Cast Members <span className="text-rose-400">*</span>
              </label>
              <div className="flex gap-2 mb-2.5">
                <input
                  type="text"
                  placeholder="e.g. Timothée Chalamet, Zendaya..."
                  value={castInput}
                  onChange={(e) => setCastInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCast();
                    }
                  }}
                  className="flex-1 bg-[#18181d] border border-neutral-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
                <button
                  type="button"
                  onClick={handleAddCast}
                  className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add</span>
                </button>
              </div>

              {/* Cast Chips */}
              <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-[#18181d]/50 border border-neutral-800/80 rounded-xl">
                {cast.length === 0 ? (
                  <span className="text-neutral-500 text-xs italic p-1">
                    No actors added yet. Type actor name and press Enter.
                  </span>
                ) : (
                  cast.map((actor) => (
                    <span
                      key={actor}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-200 text-xs border border-neutral-700/60"
                    >
                      <span>{actor}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCast(actor)}
                        className="text-neutral-400 hover:text-rose-400 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>
              {fieldErrors.cast && (
                <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.cast[0]}</p>
              )}
            </div>

            {/* Trailer URL */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Official Trailer URL <span className="text-neutral-500 text-[11px]">(Optional)</span>
              </label>
              <div className="relative">
                <LinkIcon
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
                />
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={trailerUrl}
                  onChange={(e) => setTrailerUrl(e.target.value)}
                  className="w-full bg-[#18181d] border border-neutral-700/80 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              {fieldErrors.trailerUrl && (
                <p className="text-[11px] text-rose-400 mt-1">
                  {fieldErrors.trailerUrl[0]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Poster Upload, Status, Genres, Duration, Date, Rating (5 cols)
           ========================================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 3: Cloudinary Poster Upload */}
          <div className="bg-[#121216] border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="text-neutral-300 font-semibold text-sm flex items-center gap-2">
                <UploadCloud size={16} className="text-white" />
                <span>Poster Thumbnail</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                Cloudinary
              </span>
            </div>

            {/* Hidden native input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleImageFileChange}
              className="hidden"
            />

            {/* Poster Upload Box / Preview */}
            {thumbnail ? (
              <div className="relative rounded-xl overflow-hidden border border-neutral-700 group bg-black">
                <div className="relative aspect-2/3 w-full">
                  <Image
                    src={thumbnail.url}
                    alt="Uploaded movie poster"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-white text-black rounded-lg text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setThumbnail(null)}
                    className="px-3.5 py-1.5 bg-rose-600/80 text-white rounded-lg text-xs font-semibold hover:bg-rose-600 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <div className="p-2.5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="truncate font-mono">{thumbnail.publicId}</span>
                  <span className="text-emerald-400 flex items-center gap-1 shrink-0">
                    <Check size={12} /> Ready
                  </span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
                  isUploadingImage
                    ? "border-neutral-700 bg-neutral-900/40 pointer-events-none"
                    : "border-neutral-700/80 hover:border-white bg-[#18181d]/40 hover:bg-[#18181d]"
                }`}
              >
                {isUploadingImage ? (
                  <div className="py-8 flex flex-col items-center gap-3">
                    <Loader2 size={32} className="animate-spin text-white" />
                    <p className="text-xs text-neutral-400 font-medium">
                      Uploading to Cloudinary...
                    </p>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-neutral-800 text-neutral-300 flex items-center justify-center">
                      <UploadCloud size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        Click to upload poster image
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        PNG, JPG, WEBP, or AVIF (Recommended 2:3 ratio)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {imageUploadError && (
              <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5">
                <AlertCircle size={13} />
                <span>{imageUploadError}</span>
              </p>
            )}
            {fieldErrors["thumbnail.url"] && (
              <p className="text-xs text-rose-400 mt-1">
                {fieldErrors["thumbnail.url"][0]}
              </p>
            )}
          </div>

          {/* Card 4: Screening Attributes */}
          <div className="bg-[#121216] border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2 text-neutral-300 font-semibold text-sm border-b border-neutral-800 pb-3">
              <Info size={16} className="text-white" />
              <span>Status & Details</span>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Release Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "now_showing", label: "Now Showing", color: "border-emerald-500 text-emerald-400" },
                  { id: "coming_soon", label: "Coming Soon", color: "border-amber-500 text-amber-400" },
                  { id: "ended", label: "Ended", color: "border-neutral-600 text-neutral-400" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStatus(s.id as "now_showing" | "coming_soon" | "ended")}
                    className={`py-2 px-1 text-center text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                      status === s.id
                        ? `bg-neutral-800/80 ${s.color} font-semibold shadow-xs`
                        : "bg-[#18181d] border-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Genres */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Genres <span className="text-rose-400">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {GENRE_PRESETS.map((g) => {
                  const isSelected = genres.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGenre(g)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-white text-black border-white"
                          : "bg-[#18181d] border-neutral-700/80 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>

              {/* Custom Genre Adder */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Other genre..."
                  value={customGenre}
                  onChange={(e) => setCustomGenre(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomGenre();
                    }
                  }}
                  className="flex-1 bg-[#18181d] border border-neutral-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
                <button
                  type="button"
                  onClick={handleAddCustomGenre}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
              {fieldErrors.genre && (
                <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.genre[0]}</p>
              )}
            </div>

            {/* Language & Duration in 2 cols */}
            <div className="grid grid-cols-2 gap-3">
              {/* Language */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Language <span className="text-rose-400">*</span>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-[#18181d] border border-neutral-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                >
                  {LANGUAGE_PRESETS.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Duration (min) <span className="text-rose-400">*</span>
                  </label>
                  {formattedDuration && (
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {formattedDuration}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Clock
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  />
                  <input
                    type="number"
                    min={1}
                    required
                    placeholder="120"
                    value={duration}
                    onChange={(e) =>
                      setDuration(e.target.value ? parseInt(e.target.value) : "")
                    }
                    className="w-full bg-[#18181d] border border-neutral-700/80 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
                {fieldErrors.duration && (
                  <p className="text-[11px] text-rose-400 mt-1">
                    {fieldErrors.duration[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Release Date & Rating in 2 cols */}
            <div className="grid grid-cols-2 gap-3">
              {/* Release Date */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Release Date <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Calendar
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
                  />
                  <input
                    type="date"
                    required
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="w-full bg-[#18181d] border border-neutral-700/80 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
                {fieldErrors.releaseDate && (
                  <p className="text-[11px] text-rose-400 mt-1">
                    {fieldErrors.releaseDate[0]}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Rating <span className="text-neutral-500 text-[11px]">(0-10)</span>
                </label>
                <div className="relative">
                  <Star
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"
                  />
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    max={10}
                    placeholder="8.5"
                    value={rating}
                    onChange={(e) =>
                      setRating(e.target.value ? parseFloat(e.target.value) : "")
                    }
                    className="w-full bg-[#18181d] border border-neutral-700/80 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
                {fieldErrors.rating && (
                  <p className="text-[11px] text-rose-400 mt-1">
                    {fieldErrors.rating[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Submit Button Card */}
          <button
            type="submit"
            disabled={isSubmitting || isUploadingImage}
            className="w-full py-3.5 px-4 bg-white hover:bg-neutral-200 text-black font-bold text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Publishing to Box Office...</span>
              </>
            ) : (
              <>
                <Check size={16} />
                <span>Publish Movie</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
