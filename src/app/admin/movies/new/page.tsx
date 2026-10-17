"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  UploadCloud,
  Check,
  X,
  Plus,
  Loader2,
  AlertCircle,
  Calendar as CalendarIcon,
  Sparkles,
  Send,
  FileText,
  Clapperboard,
  Image as ImageIcon,
  Users,
  CheckCircle2,
} from "lucide-react";

const GENRE_PRESETS = [
  "Sci-Fi",
  "Drama",
  "Adventure",
  "Action",
  "Thriller",
  "Horror",
  "IMAX",
  "Animation",
  "Comedy",
  "Crime",
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

  // Form states matching ui.png presets
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [genres, setGenres] = useState<string[]>(["Sci-Fi", "Drama", "Adventure"]);
  const [isAddingGenre, setIsAddingGenre] = useState(false);
  const [newGenreInput, setNewGenreInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [duration, setDuration] = useState<number | "">(169);
  const [releaseDate, setReleaseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState<string[]>([
    "Matthew McConaughey",
    "Anne Hathaway",
    "Zendaya",
  ]);
  const [isAddingCast, setIsAddingCast] = useState(false);
  const [newCastInput, setNewCastInput] = useState("");
  const [rating] = useState<number | "">(8.5);
  const [status, setStatus] = useState<"now_showing" | "coming_soon" | "ended">(
    "now_showing"
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

  // Title change with auto-slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(generateSlug(val));
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
    const trimmed = newCastInput.trim();
    if (trimmed && !cast.includes(trimmed)) {
      setCast([...cast, trimmed]);
      setNewCastInput("");
      setIsAddingCast(false);
    }
  };

  const handleRemoveCast = (actor: string) => {
    setCast(cast.filter((c) => c !== actor));
  };

  // Genre management
  const handleAddGenre = () => {
    const trimmed = newGenreInput.trim();
    if (trimmed && !genres.includes(trimmed)) {
      setGenres([...genres, trimmed]);
      setNewGenreInput("");
      setIsAddingGenre(false);
    }
  };

  const handleRemoveGenre = (genre: string) => {
    setGenres(genres.filter((g) => g !== genre));
  };

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
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* Top Breadcrumb Link matching ui.png */}
      <div>
        <Link
          href="/admin/movies"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Movies</span>
        </Link>
      </div>

      {/* Page Header Row with Save Draft & Publish Movie matching ui.png */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Add New Movie
          </h1>
          <p className="text-xs text-[#64748b] mt-1">
            Create a movie entry for your cinema catalog. Fill in all the details to get started.
          </p>
        </div>

        {/* Action Buttons matching ui.png */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg border border-[#e2e8f0] shadow-2xs transition-colors cursor-pointer"
          >
            <FileText size={14} className="text-slate-500" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isUploadingImage}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#ff5500] hover:bg-[#e64d00] disabled:opacity-50 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Send size={13} className="rotate-45 -translate-y-0.5" />
                <span>Publish Movie</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <Check size={16} />
          <span>{successBanner}</span>
        </div>
      )}

      {errorBanner && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorBanner}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* =========================================================================
            CARD 1: Movie Information matching ui.png
           ========================================================================= */}
        <div className="bg-white border border-[#e8ecf2] rounded-xl p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 text-[#0f172a] font-bold text-sm border-b border-[#f1f5f9] pb-3">
            <Clapperboard size={17} className="text-[#0f172a]" />
            <span>Movie Information</span>
          </div>

          {/* Row 1: Title and URL Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dune: Part Two"
                value={title}
                onChange={handleTitleChange}
                className="w-full bg-white border border-[#e2e8f0] rounded-lg px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff5500] transition-colors"
              />
              {fieldErrors.title && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.title[0]}</p>
              )}
            </div>

            {/* URL Slug with Available check & Auto-generate button */}
            <div>
              <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                URL Slug <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center bg-white border border-[#e2e8f0] rounded-lg px-3 py-1.5 focus-within:border-[#ff5500] transition-colors">
                <input
                  type="text"
                  required
                  placeholder="dune-part-two"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-mono"
                />

                {/* Available badge */}
                {slug.length > 0 && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 px-2 shrink-0 select-none">
                    <CheckCircle2 size={13} className="text-emerald-500" />
                    <span>Available</span>
                  </span>
                )}

                {/* Auto-generate button */}
                <button
                  type="button"
                  onClick={() => setSlug(generateSlug(title))}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-[#e2e8f0] px-2.5 py-1 rounded-md transition-colors shrink-0 shadow-2xs cursor-pointer ml-1"
                >
                  <Sparkles size={11} className="text-[#ff5500]" />
                  <span>Auto-generate</span>
                </button>
              </div>
              {fieldErrors.slug && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.slug[0]}</p>
              )}
            </div>
          </div>

          {/* Row 2: Short Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#1e293b]">
                Short Description <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                {shortDescription.length}/200
              </span>
            </div>
            <textarea
              rows={2}
              required
              placeholder="Brief tagline shown on movie cards and banners (20 - 200 chars)..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full bg-white border border-[#e2e8f0] rounded-lg p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff5500] transition-colors resize-none"
            />
            {fieldErrors.shortDescription && (
              <p className="text-[11px] text-rose-600 mt-1">
                {fieldErrors.shortDescription[0]}
              </p>
            )}
          </div>

          {/* Row 3: Long Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#1e293b]">
                Long Description <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                {longDescription.length}/1000
              </span>
            </div>
            <textarea
              rows={3}
              required
              placeholder="Comprehensive cinema synopsis, story overview, and background (50 - 1000 chars)..."
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              className="w-full bg-white border border-[#e2e8f0] rounded-lg p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff5500] transition-colors resize-none"
            />
            {fieldErrors.longDescription && (
              <p className="text-[11px] text-rose-600 mt-1">
                {fieldErrors.longDescription[0]}
              </p>
            )}
          </div>
        </div>

        {/* =========================================================================
            ROW 2: Poster (left) and Movie Details (right) matching ui.png
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Poster Box (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#e8ecf2] rounded-xl p-6 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#0f172a] font-bold text-sm border-b border-[#f1f5f9] pb-3">
                <ImageIcon size={17} className="text-[#0f172a]" />
                <span>Poster</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Upload a high-quality movie poster (JPG, PNG or WEBP).
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleImageFileChange}
              className="hidden"
            />

            {/* Poster Upload Frame - Strictly Fixed 2:3 Ratio */}
            <div className="relative w-full aspect-[2/3] max-w-[300px] mx-auto rounded-xl overflow-hidden border border-[#e2e8f0] bg-[#fbfcfd] mt-2">
              {thumbnail ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={thumbnail.url}
                    alt="Uploaded movie poster"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority
                  />
                  {/* Hover Overlay with Change / Remove actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 z-10">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer shadow-md"
                    >
                      Change Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setThumbnail(null)}
                      className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition-colors cursor-pointer shadow-md"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Ready Badge overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/75 backdrop-blur-xs border border-white/20 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[11px] text-white z-10">
                    <span className="truncate font-mono text-[10px] text-slate-300 max-w-[140px]">
                      {thumbnail.publicId}
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1 shrink-0 text-[10px]">
                      <Check size={11} /> 2:3 Ready
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full h-full border-2 border-dashed border-[#d8e0ec] hover:border-[#ff5500] rounded-xl p-6 text-center flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isUploadingImage ? "opacity-60 pointer-events-none" : ""
                  }`}
                >
                  {isUploadingImage ? (
                    <div className="flex flex-col items-center gap-2.5">
                      <Loader2 size={32} className="animate-spin text-[#ff5500]" />
                      <p className="text-xs text-slate-600 font-medium">Uploading to Cloudinary...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      {/* Orange round cloud upload icon */}
                      <div className="w-12 h-12 rounded-full bg-[#fff4ed] text-[#ff5500] flex items-center justify-center mx-auto mb-3 shadow-2xs">
                        <UploadCloud size={24} />
                      </div>
                      <p className="text-xs font-bold text-[#0f172a]">
                        Click to upload poster image
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1 mb-1">
                        JPG, PNG or WEBP · Max 5MB
                      </p>
                      <span className="inline-block text-[10px] font-mono font-semibold text-[#ff5500] bg-[#fff4ed] px-2 py-0.5 rounded-md mb-4">
                        800 × 1200 px (2:3)
                      </span>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#334155] hover:text-black border border-[#e2e8f0] rounded-lg text-xs font-semibold shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <UploadCloud size={13} />
                        <span>Choose File</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

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

          {/* Right: Movie Details Box (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#e8ecf2] rounded-xl p-6 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 text-[#0f172a] font-bold text-sm border-b border-[#f1f5f9] pb-3">
              <Clapperboard size={17} className="text-[#0f172a]" />
              <span>Movie Details</span>
            </div>

            {/* Row 1: Genre & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
              {/* Genre (7 cols) */}
              <div className="sm:col-span-7">
                <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                  Genre <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-1.5">
                  {genres.map((g) => (
                    <span
                      key={g}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f1f5f9] text-[#334155] text-xs font-medium rounded-lg"
                    >
                      <span>{g}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGenre(g)}
                        className="text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}

                  {/* Add genre input/button */}
                  {isAddingGenre ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Genre..."
                        value={newGenreInput}
                        onChange={(e) => setNewGenreInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddGenre();
                          }
                        }}
                        className="w-24 bg-white border border-[#e2e8f0] rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#ff5500]"
                      />
                      <button
                        type="button"
                        onClick={handleAddGenre}
                        className="p-1 bg-[#ff5500] text-white rounded-md hover:bg-[#e64d00]"
                      >
                        <Check size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingGenre(false)}
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingGenre(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 border border-[#e2e8f0] text-slate-600 text-xs font-medium rounded-lg transition-colors shadow-2xs"
                    >
                      <Plus size={13} />
                      <span>Add genre</span>
                    </button>
                  )}
                </div>
                {fieldErrors.genre && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.genre[0]}</p>
                )}
              </div>

              {/* Language (5 cols) */}
              <div className="sm:col-span-5">
                <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                  Language <span className="text-rose-500">*</span>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5500] cursor-pointer"
                >
                  {LANGUAGE_PRESETS.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                {fieldErrors.language && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.language[0]}</p>
                )}
              </div>
            </div>

            {/* Row 2: Duration & Release Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Duration with min addon */}
              <div>
                <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                  Duration <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center border border-[#e2e8f0] rounded-lg overflow-hidden bg-white focus-within:border-[#ff5500] transition-colors">
                  <input
                    type="number"
                    min={1}
                    required
                    placeholder="e.g. 169"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value ? parseInt(e.target.value) : "")}
                    className="w-full px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                  <span className="px-3 py-2 text-xs text-slate-500 bg-[#f8fafc] border-l border-[#e2e8f0] select-none font-medium">
                    min
                  </span>
                </div>
                {fieldErrors.duration && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.duration[0]}</p>
                )}
              </div>

              {/* Release Date with calendar icon */}
              <div>
                <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                  Release Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <CalendarIcon
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                  <input
                    type="date"
                    required
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="w-full bg-white border border-[#e2e8f0] rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                {fieldErrors.releaseDate && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.releaseDate[0]}</p>
                )}
              </div>
            </div>

            {/* Row 3: Status 3 Radio-buttons matching ui.png */}
            <div>
              <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                Status <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {/* Now Showing */}
                <button
                  type="button"
                  onClick={() => setStatus("now_showing")}
                  className={`py-2 px-3 text-center text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    status === "now_showing"
                      ? "border-emerald-500 bg-[#f0fdf4] text-emerald-800 shadow-2xs"
                      : "border-[#e2e8f0] bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Now Showing</span>
                </button>

                {/* Coming Soon */}
                <button
                  type="button"
                  onClick={() => setStatus("coming_soon")}
                  className={`py-2 px-3 text-center text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    status === "coming_soon"
                      ? "border-amber-500 bg-[#fffbeb] text-amber-800 shadow-2xs"
                      : "border-[#e2e8f0] bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Coming Soon</span>
                </button>

                {/* Ended */}
                <button
                  type="button"
                  onClick={() => setStatus("ended")}
                  className={`py-2 px-3 text-center text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    status === "ended"
                      ? "border-slate-400 bg-slate-100 text-slate-800 shadow-2xs"
                      : "border-[#e2e8f0] bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>Ended</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CARD 3: Cast & Crew matching ui.png
           ========================================================================= */}
        <div className="bg-white border border-[#e8ecf2] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-[#0f172a] font-bold text-sm border-b border-[#f1f5f9] pb-3">
            <Users size={17} className="text-[#0f172a]" />
            <span>Cast & Crew</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Director (5 cols) */}
            <div className="md:col-span-5">
              <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                Director
              </label>
              <input
                type="text"
                placeholder="e.g. Christopher Nolan"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="w-full bg-white border border-[#e2e8f0] rounded-lg px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ff5500] transition-colors"
              />
            </div>

            {/* Cast (7 cols) */}
            <div className="md:col-span-7">
              <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                Cast <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {cast.map((actor) => (
                  <span
                    key={actor}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f1f5f9] text-[#334155] text-xs font-medium rounded-lg"
                  >
                    <span>{actor}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCast(actor)}
                      className="text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {/* Add Cast Member */}
                {isAddingCast ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Actor name..."
                      value={newCastInput}
                      onChange={(e) => setNewCastInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCast();
                        }
                      }}
                      className="w-36 bg-white border border-[#e2e8f0] rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#ff5500]"
                    />
                    <button
                      type="button"
                      onClick={handleAddCast}
                      className="p-1 bg-[#ff5500] text-white rounded-md hover:bg-[#e64d00]"
                    >
                      <Check size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingCast(false)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingCast(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 border border-[#e2e8f0] text-slate-600 text-xs font-medium rounded-lg transition-colors shadow-2xs"
                  >
                    <Plus size={13} />
                    <span>Add cast member</span>
                  </button>
                )}
              </div>
              {fieldErrors.cast && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.cast[0]}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
