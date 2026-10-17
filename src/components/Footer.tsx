import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 text-neutral-600">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 pr-0 md:pr-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-black" aria-hidden="true" />
              <span className="text-base font-bold tracking-[-0.04em] text-black uppercase font-sans">
                MOVEXA
              </span>
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mb-4">
              Next-generation cinema ticketing. Reserved luxury recliners, 70mm analog film prints, and 4K laser projection.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
              <span className="w-1.5 h-1.5 bg-emerald-500 inline-block" />
              <span>Box Office Open • Advance Sales Active</span>
            </div>
          </div>

          {/* Films Column */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-black mb-3">
              Films
            </span>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Now Showing
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  IMAX® 70mm
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Dolby Cinema
                </Link>
              </li>
            </ul>
          </div>

          {/* Theaters Column */}
          <div className="col-span-1 md:col-span-2">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-black mb-3">
              Cinemas
            </span>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Auditorium Tech
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Private Screenings
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Column */}
          <div className="col-span-1 md:col-span-2">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-black mb-3">
              Account
            </span>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li>
                <Link href="/login" className="hover:text-black transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-black transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Booking Support
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Refunds & Exchange
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Legal */}
        <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-mono">
          <div>
            © {new Date().getFullYear()} MOVEXA SYSTEMS INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 font-sans text-xs text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-300">/</span>
            <Link href="/" className="hover:text-black transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
