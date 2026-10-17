"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Ticket,
  Play,
  Star,
  Clock,
  Calendar,
  MapPin,
  ChevronRight,
  Sparkles,
  Volume2,
  Film,
  Info,
  CheckCircle2,
  SlidersHorizontal,
  Bookmark,
} from "lucide-react";

interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  format: string[];
  description: string;
  director: string;
  image: string;
  showtimes: string[];
}

const FEATURED_MOVIES: Movie[] = [
  {
    id: "astral-horizon",
    title: "ASTRAL HORIZON",
    genre: "Sci-Fi / Space Epic",
    duration: "2h 48m",
    rating: "8.9",
    format: ["IMAX® 70MM", "Dolby Atmos", "4K Laser"],
    description:
      "When a deep-space exploration vessel discovers a silent gravitational rift near the outer planetary rings, the crew must choose between self-preservation and unlocking humanity's next cosmic leap.",
    director: "Elias Vance",
    image: "/images/hero-banner.jpg",
    showtimes: ["11:30 AM", "2:45 PM", "6:15 PM (IMAX)", "9:45 PM (Dolby)"],
  },
  {
    id: "silent-frequency",
    title: "SILENT FREQUENCY",
    genre: "Neo-Noir / Mystery Thriller",
    duration: "2h 16m",
    rating: "9.2",
    format: ["35mm Film Print", "Dolby Cinema"],
    description:
      "In a perpetual rain-drenched metropolis, an audio forensics investigator stumbles onto a clandestine radio transmission encoded within ambient city noise, unraveling a high-stakes conspiracy.",
    director: "Marcus Lin",
    image: "/images/poster-noir.jpg",
    showtimes: ["1:00 PM", "4:15 PM", "7:30 PM", "10:15 PM (Late)"],
  },
  {
    id: "chroma-requiem",
    title: "CHROMA REQUIEM",
    genre: "Psychological Drama",
    duration: "1h 58m",
    rating: "8.6",
    format: ["4K Digital", "Dolby Atmos"],
    description:
      "A renowned concert pianist loses her sight after an accident, only to discover synesthesia allowing her to visually sculpt sound in extraordinary ways that bend reality itself.",
    director: "Clara Desjardins",
    image: "/images/cinema-auth.jpg",
    showtimes: ["12:15 PM", "3:45 PM", "6:50 PM", "9:30 PM"],
  },
];

export default function Home() {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [selectedCinema, setSelectedCinema] = useState("Movexa Grand IMAX (Lincoln Square)");
  const [selectedDate, setSelectedDate] = useState("Today, Oct 17");
  const [activeTab, setActiveTab] = useState("all");
  const [bookingFeedback, setBookingFeedback] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  const currentMovie = FEATURED_MOVIES[selectedMovieIndex];

  const handleBookingClick = (movieTitle: string, time?: string) => {
    setBookingFeedback(
      `Selected: "${movieTitle}" at ${time || "Next Showtime"} (${selectedCinema}). Ready for seat selection module.`
    );
    setTimeout(() => {
      setBookingFeedback(null);
    }, 6000);
  };

  return (
    <div className="w-full bg-white text-neutral-900 selection:bg-neutral-950 selection:text-white">
      {/* =========================================================================
          HERO SECTION
          Polished, cinematic widescreen banner with subtle photography shading.
          NO tacky multi-color gradients. Pure realistic film aesthetic.
         ========================================================================= */}
      <section className="relative w-full bg-neutral-950 text-white overflow-hidden border-b border-neutral-900">
        {/* Background Image Container with Crisp Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentMovie.image}
            alt={currentMovie.title}
            fill
            priority
            className="object-cover object-center opacity-75 filter contrast-110 brightness-90 transition-all duration-700 ease-in-out scale-100 hover:scale-[1.02]"
          />
          {/* Subtle natural film vignettes (pure neutral black, zero rainbow gradients) */}
          <div className="absolute inset-0 bg-neutral-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-transparent hidden md:block" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 lg:py-32 flex flex-col justify-end min-h-[680px] lg:min-h-[760px]">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            {/* Badges / Pill Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-neutral-950 shadow-xs tracking-wide">
                <Sparkles size={12} className="text-amber-500" />
                FEATURED PREMIERE
              </span>

              {currentMovie.format.map((fmt) => (
                <span
                  key={fmt}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-900/80 backdrop-blur-md text-neutral-200 border border-neutral-700"
                >
                  {fmt}
                </span>
              ))}

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-900/80 backdrop-blur-md text-amber-400 border border-neutral-700">
                <Star size={13} className="fill-amber-400 stroke-amber-400" />
                <span>{currentMovie.rating}</span>
                <span className="text-neutral-400 font-normal">/ 10</span>
              </div>
            </div>

            {/* Movie Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-sans drop-shadow-md">
                {currentMovie.title}
              </h1>
              <p className="text-xs sm:text-sm font-semibold tracking-widest text-neutral-300 uppercase mt-2">
                Directed by {currentMovie.director} • {currentMovie.genre} • {currentMovie.duration}
              </p>
            </div>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed line-clamp-3 md:line-clamp-none max-w-2xl">
              {currentMovie.description}
            </p>

            {/* Showtimes Pill Strip */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                <Clock size={13} />
                <span>Available showtimes for {selectedDate}:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {currentMovie.showtimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleBookingClick(currentMovie.title, time)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white hover:text-neutral-950 text-white border border-white/20 transition-all duration-150 cursor-pointer active:scale-95"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => handleBookingClick(currentMovie.title)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-white text-neutral-950 hover:bg-neutral-200 shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
              >
                <Ticket size={18} />
                <span>Book Tickets</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Playing official trailer for ${currentMovie.title}`)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-neutral-900/90 text-white border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-850 active:scale-[0.98] transition-all cursor-pointer backdrop-blur-sm"
              >
                <Play size={16} className="fill-current" />
                <span>Watch Trailer</span>
              </button>

              <button
                type="button"
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-3.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer backdrop-blur-sm ${
                  bookmarked
                    ? "bg-white text-neutral-950 border-white"
                    : "bg-neutral-900/90 text-neutral-300 border-neutral-700 hover:text-white hover:border-neutral-500"
                }`}
                title="Add to Watchlist"
                aria-label="Save to watchlist"
              >
                <Bookmark size={18} className={bookmarked ? "fill-current" : ""} />
              </button>
            </div>
          </div>

          {/* Hero Movie Switcher / Spotlight Thumbnails */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <Film size={14} />
              <span>Premieres Spotlight</span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {FEATURED_MOVIES.map((movie, idx) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => setSelectedMovieIndex(idx)}
                  className={`text-left px-3.5 py-2 rounded-lg text-xs transition-all shrink-0 cursor-pointer ${
                    selectedMovieIndex === idx
                      ? "bg-white text-neutral-950 font-bold shadow-xs"
                      : "bg-neutral-900/70 text-neutral-300 hover:bg-neutral-800 border border-neutral-800"
                  }`}
                >
                  <span className="block truncate max-w-[140px]">{movie.title}</span>
                  <span className={`text-[10px] block ${selectedMovieIndex === idx ? "text-neutral-700" : "text-neutral-500"}`}>
                    ★ {movie.rating} • {movie.genre.split("/")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE NOTIFICATION FEEDBACK BAR
         ========================================================================= */}
      {bookingFeedback && (
        <div className="bg-neutral-900 text-white px-4 py-3 border-b border-neutral-800 animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>{bookingFeedback}</span>
            </div>
            <button
              onClick={() => setBookingFeedback(null)}
              className="text-neutral-400 hover:text-white text-xs underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          QUICK TICKET FINDER / SHOWTIMES DOCK BAR
          Minimalist, high-contrast tool to pick cinema, date, and movie format.
         ========================================================================= */}
      <section className="relative z-20 -mt-7 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 sm:p-6 transition-all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Cinema Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                1. Select Cinema
              </label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3 top-3 text-neutral-400 pointer-events-none" />
                <select
                  value={selectedCinema}
                  onChange={(e) => setSelectedCinema(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-950 transition-all cursor-pointer appearance-none"
                >
                  <option value="Movexa Grand IMAX (Lincoln Square)">Movexa Grand IMAX (Lincoln Sq)</option>
                  <option value="Movexa Cinema City (Downtown)">Movexa Cinema City (Downtown)</option>
                  <option value="Movexa Dolby Lounge (Midtown)">Movexa Dolby Lounge (Midtown)</option>
                  <option value="Movexa Film Forum (Village)">Movexa Film Forum (Village)</option>
                </select>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                2. Select Date
              </label>
              <div className="relative">
                <Calendar size={15} className="absolute left-3 top-3 text-neutral-400 pointer-events-none" />
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-950 transition-all cursor-pointer appearance-none"
                >
                  <option value="Today, Oct 17">Today, Oct 17</option>
                  <option value="Tomorrow, Oct 18">Tomorrow, Oct 18</option>
                  <option value="Saturday, Oct 19">Saturday, Oct 19</option>
                  <option value="Sunday, Oct 20">Sunday, Oct 20</option>
                  <option value="Monday, Oct 21">Monday, Oct 21</option>
                </select>
              </div>
            </div>

            {/* Movie Title */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                3. Choose Title
              </label>
              <div className="relative">
                <Film size={15} className="absolute left-3 top-3 text-neutral-400 pointer-events-none" />
                <select
                  value={selectedMovieIndex}
                  onChange={(e) => setSelectedMovieIndex(Number(e.target.value))}
                  className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-950 transition-all cursor-pointer appearance-none"
                >
                  {FEATURED_MOVIES.map((movie, idx) => (
                    <option key={movie.id} value={idx}>
                      {movie.title} ({movie.duration})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="pt-1 sm:pt-5">
              <button
                type="button"
                onClick={() =>
                  handleBookingClick(
                    FEATURED_MOVIES[selectedMovieIndex].title,
                    FEATURED_MOVIES[selectedMovieIndex].showtimes[0]
                  )
                }
                className="w-full py-2.5 sm:py-3 px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs hover:shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Find Showtimes</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          NOW SHOWING SECTION
          Curated movie cards with authentic cinema poster art & showtimes.
         ========================================================================= */}
      <section id="now-showing" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200 mb-2">
              <Sparkles size={12} className="text-amber-500" />
              <span>THE REPERTORY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
              Now Showing in Theaters
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Screening daily with laser projection, stadium leather seating, and reserve-ahead tickets.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {["all", "IMAX 70mm", "Thriller", "Sci-Fi"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer shrink-0 ${
                  activeTab === tab
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {tab === "all" ? "All Features" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_MOVIES.map((movie) => (
            <div
              key={movie.id}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-neutral-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Poster Artwork Container */}
                <div className="relative aspect-[16/10] w-full bg-neutral-950 overflow-hidden">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {movie.format.slice(0, 2).map((fmt) => (
                      <span
                        key={fmt}
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-950/85 backdrop-blur-sm text-white border border-neutral-700"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-xs font-bold bg-neutral-950/85 backdrop-blur-sm text-amber-400 border border-neutral-700 flex items-center gap-1">
                    <Star size={11} className="fill-amber-400 stroke-amber-400" />
                    <span>{movie.rating}</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                    <span>{movie.genre}</span>
                    <span>{movie.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-neutral-950 group-hover:text-neutral-700 transition-colors">
                    {movie.title}
                  </h3>

                  <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                    {movie.description}
                  </p>
                </div>
              </div>

              {/* Showtimes & Booking CTA */}
              <div className="p-5 pt-0 border-t border-neutral-100 mt-2">
                <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Select Showtime
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {movie.showtimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleBookingClick(movie.title, time)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-center bg-neutral-50 hover:bg-neutral-950 hover:text-white border border-neutral-200 hover:border-neutral-950 transition-colors cursor-pointer"
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleBookingClick(movie.title)}
                  className="w-full py-2.5 px-4 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Ticket size={14} />
                  <span>Reserve Seats</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          MOVEXA CINEMA EXPERIENCE (WHITE & BLACK AESTHETICS)
          Highlighting IMAX, luxury seating, and member perks.
         ========================================================================= */}
      <section id="experience" className="bg-neutral-50 border-y border-neutral-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-200/80 text-neutral-800 mb-3">
              THE MOVEXA STANDARD
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
              Engineered for Pure Cinematic Immersion
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Every hall is calibrated for unmatched optical sharpness, acoustics, and uncompromising comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-xs hover:border-neutral-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center mb-6">
                <Sparkles size={22} />
              </div>
              <h3 className="text-lg font-bold text-neutral-950 mb-2">
                IMAX® 70mm & 4K Laser
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Dual laser projection delivers breathtaking brightness, deep blacks, and razor-sharp clarity up to 1.43:1 aspect ratio.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-xs hover:border-neutral-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center mb-6">
                <Volume2 size={22} />
              </div>
              <h3 className="text-lg font-bold text-neutral-950 mb-2">
                128-Channel Dolby Atmos
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Precise spatial audio flows all around you—even overhead—placing you at the epicenter of the cinematic universe.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-xs hover:border-neutral-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center mb-6">
                <Ticket size={22} />
              </div>
              <h3 className="text-lg font-bold text-neutral-950 mb-2">
                Reserved Zero-Gravity Recliners
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                100% reserved plush heated leather recliners with personal swivel tables and in-seat craft refreshment ordering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMING SOON / ADVANCE TICKET REGISTRATION
         ========================================================================= */}
      <section id="coming-soon" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
        <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-neutral-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
              <Info size={13} />
              ADVANCE TICKET ALERT
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Get notified when blockbuster tickets drop.
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Create a free Movexa account to receive SMS and email notifications 24 hours prior to public box office releases for Christopher Nolan, Denis Villeneuve, and festival winners.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/register"
                className="px-6 py-3.5 bg-white text-neutral-950 hover:bg-neutral-200 font-bold text-sm rounded-xl transition-all cursor-pointer active:scale-95 shadow-md"
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="px-6 py-3.5 bg-neutral-900 text-white border border-neutral-700 hover:border-neutral-500 font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                Sign In to Member Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
