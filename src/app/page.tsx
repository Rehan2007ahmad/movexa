import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-64px)] flex items-end">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Astral Horizon Film Still"
            fill
            priority
            className="object-cover object-center brightness-90 contrast-105"
          />
          {/* Subtle architectural vignette overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-16 pt-32">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs uppercase tracking-[0.25em] text-neutral-300 font-medium">
              Now Showing in IMAX® 70mm
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase font-sans">
              Astral Horizon
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light max-w-xl">
              A deep-space reconnaissance crew encounters an unprecedented gravitational rift along Saturn’s outer ring system, challenging the limits of physics and human endurance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="bg-white text-black hover:bg-neutral-200 px-7 py-3 text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Book Tickets
              </Link>
              <button
                type="button"
                className="border border-white/60 text-white hover:bg-white hover:text-black px-7 py-3 text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
