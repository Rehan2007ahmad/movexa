"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Ticket,
  Play,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface HeroMovie {
  id: string;
  tag: string;
  title: string;
  rating: string;
  genres: string;
  duration: string;
  synopsis: string;
  image: string;
}

const HERO_MOVIES: HeroMovie[] = [
  {
    id: "dune-2",
    tag: "NOW SHOWING",
    title: "Dune: Part Two",
    rating: "8.8",
    genres: "Action • Adventure • Drama",
    duration: "2h 46m",
    synopsis:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    image: "/images/dune-hero.jpg",
  },
  {
    id: "astral-horizon",
    tag: "PREMIERE",
    title: "Astral Horizon",
    rating: "8.9",
    genres: "Sci-Fi • Space Exploration",
    duration: "2h 48m",
    synopsis:
      "A deep-space reconnaissance crew encounters an unprecedented gravitational rift along Saturn’s outer rings, challenging the limits of physics.",
    image: "/images/hero-banner.jpg",
  },
  {
    id: "silent-frequency",
    tag: "NOW SHOWING",
    title: "Silent Frequency",
    rating: "9.1",
    genres: "Neo-Noir • Mystery • Thriller",
    duration: "2h 16m",
    synopsis:
      "An audio forensics investigator in a rain-soaked metropolis uncovers a secret broadcast hidden within city ambient frequencies.",
    image: "/images/poster-noir.jpg",
  },
  {
    id: "oppenheimer",
    tag: "SPECIAL SCREENING",
    title: "Oppenheimer",
    rating: "8.6",
    genres: "Biography • Drama • History",
    duration: "3h 00m",
    synopsis:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    image: "/images/cinema-auth.jpg",
  },
];

interface MovieCard {
  id: string;
  title: string;
  genre: string;
  rating: string;
  image: string;
}

const POPULAR_MOVIES: MovieCard[] = [
  {
    id: "pop-1",
    title: "Dune: Part Two",
    genre: "Action • Adventure • Drama",
    rating: "8.8",
    image: "/images/dune-hero.jpg",
  },
  {
    id: "pop-2",
    title: "Oppenheimer",
    genre: "Drama • History",
    rating: "8.6",
    image: "/images/cinema-auth.jpg",
  },
  {
    id: "pop-3",
    title: "Silent Frequency",
    genre: "Neo-Noir • Thriller",
    rating: "9.1",
    image: "/images/poster-noir.jpg",
  },
  {
    id: "pop-4",
    title: "Astral Horizon",
    genre: "Sci-Fi • Space Epic",
    rating: "8.9",
    image: "/images/hero-banner.jpg",
  },
  {
    id: "pop-5",
    title: "Interstellar",
    genre: "Sci-Fi • Drama",
    rating: "8.7",
    image: "/images/login-bg.jpg",
  },
  {
    id: "pop-6",
    title: "The Batman",
    genre: "Action • Crime • Drama",
    rating: "7.8",
    image: "/images/register-bg.jpg",
  },
];

const NOW_SHOWING_MOVIES: MovieCard[] = [
  {
    id: "now-1",
    title: "Dune: Part Two",
    genre: "Action • Adventure • Drama",
    rating: "8.8",
    image: "/images/dune-hero.jpg",
  },
  {
    id: "now-2",
    title: "Silent Frequency",
    genre: "Mystery • Crime • Drama",
    rating: "9.1",
    image: "/images/poster-noir.jpg",
  },
  {
    id: "now-3",
    title: "Astral Horizon",
    genre: "Sci-Fi • Adventure",
    rating: "8.9",
    image: "/images/hero-banner.jpg",
  },
  {
    id: "now-4",
    title: "Chroma Requiem",
    genre: "Drama • Mystery",
    rating: "8.2",
    image: "/images/cinema-auth.jpg",
  },
  {
    id: "now-5",
    title: "Solaris Echo",
    genre: "Action • Sci-Fi",
    rating: "7.6",
    image: "/images/login-bg.jpg",
  },
  {
    id: "now-6",
    title: "The Nomad Protocol",
    genre: "Action • Adventure",
    rating: "7.8",
    image: "/images/register-bg.jpg",
  },
];

export default function Home() {
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  const prevHero = () => {
    setCurrentHeroIdx((prev) =>
      prev === 0 ? HERO_MOVIES.length - 1 : prev - 1
    );
  };

  const nextHero = () => {
    setCurrentHeroIdx((prev) =>
      prev === HERO_MOVIES.length - 1 ? 0 : prev + 1
    );
  };

  const current = HERO_MOVIES[currentHeroIdx];

  return (
    <div className="w-full bg-[#fafafa] text-neutral-900 pb-20">
      {/* =========================================================================
          HERO BANNER (Matches movexa Movie Streaming Homepage.png)
         ========================================================================= */}
      <section className="relative w-full bg-neutral-950 text-white overflow-hidden min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={current.image}
            alt={current.title}
            fill
            priority
            className="object-cover object-center brightness-90 filter contrast-110 transition-all duration-700"
          />
          {/* Subtle natural dark gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 py-16 sm:py-20 flex flex-col justify-center">
          <div className="max-w-xl space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-300">
              {current.tag}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
              {current.title}
            </h1>

            {/* Meta Row */}
            <div className="flex items-center gap-3 text-xs text-neutral-300 font-medium">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star size={14} className="fill-amber-400 stroke-amber-400" />
                {current.rating}
              </span>
              <span className="text-neutral-500">|</span>
              <span>{current.genres}</span>
              <span className="text-neutral-500">|</span>
              <span>{current.duration}</span>
            </div>

            {/* Synopsis */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light line-clamp-3">
              {current.synopsis}
            </p>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/login"
                className="bg-[#e11d48] hover:bg-[#be123c] text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Book Tickets</span>
                <Ticket size={16} />
              </Link>

              <button
                type="button"
                onClick={() => alert(`Playing trailer for ${current.title}`)}
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-neutral-200 transition-colors cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                  <Play size={13} className="fill-white translate-x-0.5" />
                </div>
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Bottom-Right */}
        <div className="absolute bottom-6 right-6 lg:right-12 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white">
          <button
            type="button"
            onClick={prevHero}
            className="p-1 hover:text-amber-400 transition-colors cursor-pointer"
            aria-label="Previous movie"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-mono text-[11px] px-1">
            {currentHeroIdx + 1} / {HERO_MOVIES.length}
          </span>
          <button
            type="button"
            onClick={nextHero}
            className="p-1 hover:text-amber-400 transition-colors cursor-pointer"
            aria-label="Next movie"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* =========================================================================
          POPULAR MOVIES SECTION
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 sm:pt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 font-sans">
            Popular Movies
          </h2>
          <Link
            href="/#all"
            className="text-xs sm:text-sm font-semibold text-neutral-600 hover:text-black flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Movie Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {POPULAR_MOVIES.map((movie) => (
            <div
              key={movie.id}
              className="group cursor-pointer flex flex-col justify-between"
              onClick={() => alert(`Selected ${movie.title} to book tickets`)}
            >
              <div>
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900 shadow-sm border border-neutral-200 group-hover:shadow-md transition-all">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="pt-2.5">
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 truncate group-hover:text-black">
                    {movie.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {movie.genre}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-neutral-800 mt-1">
                <Star size={12} className="fill-amber-400 stroke-amber-400" />
                <span>{movie.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          NOW SHOWING SECTION
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 sm:pt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 font-sans">
            Now Showing
          </h2>
          <Link
            href="/#all"
            className="text-xs sm:text-sm font-semibold text-neutral-600 hover:text-black flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Movie Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {NOW_SHOWING_MOVIES.map((movie) => (
            <div
              key={movie.id}
              className="group cursor-pointer flex flex-col justify-between"
              onClick={() => alert(`Selected ${movie.title} to book tickets`)}
            >
              <div>
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900 shadow-sm border border-neutral-200 group-hover:shadow-md transition-all">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="pt-2.5">
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 truncate group-hover:text-black">
                    {movie.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {movie.genre}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-neutral-800 mt-1">
                <Star size={12} className="fill-amber-400 stroke-amber-400" />
                <span>{movie.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
