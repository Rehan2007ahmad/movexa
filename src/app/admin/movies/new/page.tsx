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
      }, 1000);
    } catch (err: unknown) {
      console.error(err);
      setErrorBanner(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <Link
            href="/admin/movies"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-1.5 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Movies</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 flex items-center gap-2.5">
            <span>Upload New Movie</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200 font-normal">
              IMAX & 2D Cinema
            </span>
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Fill in the movie details, synopsis, screening attributes, and poster media.
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin/movies"
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-300 rounded-md transition-colors shadow-2xs"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isUploadingImage}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 rounded-md transition-colors shadow-2xs cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Check size={14} />
                <span>Publish Movie</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successBanner && (
        <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <Check size={15} />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Error Banner */}
      {errorBanner && (
        <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <AlertCircle size={15} className="shrink-0" />
          <span>{errorBanner}</span>
        </div>
      )}

      {/* Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* =========================================================================
            LEFT COLUMN: Details, Synopses, Cast, Trailer (7 cols)
           ========================================================================= */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card 1: Basic Information */}
          <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs border-b border-neutral-100 pb-2.5">
              <Film size={15} className="text-orange-600" />
              <span>Movie Title & Slug</span>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dune: Part Two"
                value={title}
                onChange={handleTitleChange}
                className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
              />
              {fieldErrors.title && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.title[0]}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-neutral-700">
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsSlugManual(false);
                    setSlug(generateSlug(title));
                  }}
                  className="text-[11px] text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles size={11} />
                  <span>Auto-generate</span>
                </button>
              </div>
              <div className="flex items-center bg-neutral-50 border border-neutral-300 rounded-md px-3 py-1.5 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500/20 transition-all">
                <span className="text-neutral-400 text-xs select-none pr-1">/movies/</span>
                <input
                  type="text"
                  required
                  placeholder="dune-part-two"
                  value={slug}
                  onChange={(e) => {
                    setIsSlugManual(true);
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  className="w-full bg-transparent text-xs text-neutral-900 focus:outline-none font-mono"
                />
              </div>
              {fieldErrors.slug && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.slug[0]}</p>
              )}
            </div>

            {/* Short Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-neutral-700">
                  Short Description <span className="text-rose-500">*</span>
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    shortDescription.length < 20 || shortDescription.length > 200
                      ? "text-neutral-400"
                      : "text-emerald-600 font-semibold"
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
                className="w-full bg-white border border-neutral-300 rounded-md p-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all resize-none"
              />
              {fieldErrors.shortDescription && (
                <p className="text-[11px] text-rose-600 mt-1">
                  {fieldErrors.shortDescription[0]}
                </p>
              )}
            </div>

            {/* Long Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-neutral-700">
                  Long Synopsis <span className="text-rose-500">*</span>
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    longDescription.length < 50 || longDescription.length > 1000
                      ? "text-neutral-400"
                      : "text-emerald-600 font-semibold"
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
                className="w-full bg-white border border-neutral-300 rounded-md p-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
              />
              {fieldErrors.longDescription && (
                <p className="text-[11px] text-rose-600 mt-1">
                  {fieldErrors.longDescription[0]}
                </p>
              )}
            </div>
          </div>

          {/* Card 2: Cast & Director */}
          <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs border-b border-neutral-100 pb-2.5">
              <Layers size={15} className="text-orange-600" />
              <span>Credits & Cast</span>
            </div>

            {/* Director */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Director <span className="text-neutral-400 text-[11px]">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Denis Villeneuve"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Cast Members */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Cast Members <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-2 mb-2">
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
                  className="flex-1 bg-white border border-neutral-300 rounded-md px-3 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={handleAddCast}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add</span>
                </button>
              </div>

              {/* Cast Chips */}
              <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-neutral-50 border border-neutral-200 rounded-md">
                {cast.length === 0 ? (
                  <span className="text-neutral-400 text-xs italic p-0.5">
                    No actors added yet. Type actor name and press Enter.
                  </span>
                ) : (
                  cast.map((actor) => (
                    <span
                      key={actor}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white text-neutral-800 text-xs border border-neutral-300 shadow-2xs"
                    >
                      <span>{actor}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCast(actor)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))
                )}
              </div>
              {fieldErrors.cast && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.cast[0]}</p>
              )}
            </div>

            {/* Trailer URL */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Official Trailer URL <span className="text-neutral-400 text-[11px]">(Optional)</span>
              </label>
              <div className="relative">
                <LinkIcon
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={trailerUrl}
                  onChange={(e) => setTrailerUrl(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-md pl-8 pr-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                />
              </div>
              {fieldErrors.trailerUrl && (
                <p className="text-[11px] text-rose-600 mt-1">
                  {fieldErrors.trailerUrl[0]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Poster Upload, Status, Genres, Duration, Date, Rating (5 cols)
           ========================================================================= */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card 3: Cloudinary Poster Upload */}
          <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
              <span className="text-neutral-900 font-semibold text-xs flex items-center gap-1.5">
                <UploadCloud size={15} className="text-orange-600" />
                <span>Poster Thumbnail</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                Cloudinary
              </span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleImageFileChange}
              className="hidden"
            />

            {/* Poster Upload Box / Preview */}
            {thumbnail ? (
              <div className="relative rounded-md overflow-hidden border border-neutral-200 group bg-neutral-950">
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
                    className="px-3 py-1.5 bg-white text-neutral-900 rounded-md text-xs font-semibold hover:bg-neutral-100 transition-colors cursor-pointer shadow-xs"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setThumbnail(null)}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-md text-xs font-semibold hover:bg-rose-700 transition-colors cursor-pointer shadow-xs"
                  >
                    Remove
                  </button>
                </div>
                <div className="p-2 bg-white border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-600">
                  <span className="truncate font-mono">{thumbnail.publicId}</span>
                  <span className="text-emerald-600 font-medium flex items-center gap-1 shrink-0">
                    <Check size={12} /> Ready
                  </span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${
                  isUploadingImage
                    ? "border-neutral-300 bg-neutral-50 pointer-events-none"
                    : "border-neutral-300 hover:border-orange-500 bg-neutral-50/50 hover:bg-orange-50/20"
                }`}
              >
                {isUploadingImage ? (
                  <div className="py-7 flex flex-col items-center gap-2.5">
                    <Loader2 size={26} className="animate-spin text-orange-600" />
                    <p className="text-xs text-neutral-600 font-medium">
                      Uploading to Cloudinary...
                    </p>
                  </div>
                ) : (
                  <div className="py-5 flex flex-col items-center gap-2.5">
                    <div className="w-10 h-10 rounded-md bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center">
                      <UploadCloud size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        Click to upload poster image
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        PNG, JPG, WEBP, or AVIF (Recommended 2:3 ratio)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {imageUploadError && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                <span>{imageUploadError}</span>
              </p>
            )}
            {fieldErrors["thumbnail.url"] && (
              <p className="text-xs text-rose-600 mt-1">
                {fieldErrors["thumbnail.url"][0]}
              </p>
            )}
          </div>

          {/* Card 4: Screening Attributes */}
          <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs border-b border-neutral-100 pb-2.5">
              <Info size={15} className="text-orange-600" />
              <span>Status & Details</span>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Release Status
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "now_showing", label: "Now Showing", active: "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold" },
                  { id: "coming_soon", label: "Coming Soon", active: "bg-orange-50 text-orange-800 border-orange-300 font-semibold" },
                  { id: "ended", label: "Ended", active: "bg-neutral-100 text-neutral-800 border-neutral-300 font-semibold" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStatus(s.id as "now_showing" | "coming_soon" | "ended")}
                    className={`py-1.5 px-1 text-center text-xs font-medium rounded-md border transition-all cursor-pointer ${
                      status === s.id
                        ? `${s.active} shadow-2xs`
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Genres */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Genres <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {GENRE_PRESETS.map((g) => {
                  const isSelected = genres.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGenre(g)}
                      className={`px-2 py-0.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-orange-600 text-white border-orange-600"
                          : "bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>

              {/* Custom Genre Adder */}
              <div className="flex gap-1.5">
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
                  className="flex-1 bg-white border border-neutral-300 rounded-md px-2.5 py-1 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomGenre}
                  className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md text-xs font-medium transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
              {fieldErrors.genre && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.genre[0]}</p>
              )}
            </div>

            {/* Language & Duration in 2 cols */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Language */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Language <span className="text-rose-500">*</span>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-md px-2.5 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-orange-500"
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
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-neutral-700">
                    Duration (min) <span className="text-rose-500">*</span>
                  </label>
                  {formattedDuration && (
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {formattedDuration}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Clock
                    size={13}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
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
                    className="w-full bg-white border border-neutral-300 rounded-md pl-7 pr-2.5 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>
                {fieldErrors.duration && (
                  <p className="text-[11px] text-rose-600 mt-1">
                    {fieldErrors.duration[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Release Date & Rating in 2 cols */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Release Date */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Release Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar
                    size={13}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                  <input
                    type="date"
                    required
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-md pl-7 pr-2.5 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
                {fieldErrors.releaseDate && (
                  <p className="text-[11px] text-rose-600 mt-1">
                    {fieldErrors.releaseDate[0]}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Rating <span className="text-neutral-400 text-[11px]">(0-10)</span>
                </label>
                <div className="relative">
                  <Star
                    size={13}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-500"
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
                    className="w-full bg-white border border-neutral-300 rounded-md pl-7 pr-2.5 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>
                {fieldErrors.rating && (
                  <p className="text-[11px] text-rose-600 mt-1">
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
            className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-md transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Publishing to Box Office...</span>
              </>
            ) : (
              <>
                <Check size={15} />
                <span>Publish Movie</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
