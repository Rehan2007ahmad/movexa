import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-black text-white">
      {/* Editorial Cinema Hero */}
      <section className="relative w-full min-h-[calc(100vh-64px)] flex items-end">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Astral Horizon Cinematic Still"
            fill
            priority
            className="object-cover object-center brightness-[0.88] contrast-[1.08]"
          />
          {/* Natural cinematic dark gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-transparent hidden md:block" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-16 lg:pb-20 pt-36">
          <div className="max-w-2xl space-y-5">
            {/* Metadata Label */}
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-neutral-300 font-mono">
              <span className="w-1.5 h-1.5 bg-white inline-block" />
              <span>IMAX® 70mm Special Presentation</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] uppercase font-sans leading-[0.95]">
                Astral Horizon
              </h1>
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-400 mt-3 font-mono">
                Directed by Elias Vance • 2h 48m • Sci-Fi Epic
              </p>
            </div>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light max-w-xl">
              When a deep-space reconnaissance crew encounters an unprecedented gravitational rift along Saturn’s outer ring system, they must navigate the limits of physics and human endurance.
            </p>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="bg-white text-black hover:bg-neutral-200 active:scale-[0.99] px-8 py-3.5 text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-150 inline-block text-center"
              >
                Book Tickets
              </Link>
              <button
                type="button"
                className="border border-white/60 text-white hover:bg-white hover:text-black active:scale-[0.99] px-7 py-3.5 text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-150 cursor-pointer"
              >
                Watch Teaser
              </button>
            </div>

            {/* Technical Format Strip */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-neutral-400 font-mono">
              <span>Aspect Ratio: 1.43:1</span>
              <span className="text-white/20">|</span>
              <span>Audio: Dolby Atmos 128ch</span>
              <span className="text-white/20">|</span>
              <span>Laser 4K Projection</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
