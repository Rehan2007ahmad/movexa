import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 text-neutral-600">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="text-lg font-bold tracking-tighter text-black uppercase">
                MOVEXA
              </span>
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
              Curated theatrical screenings, reserved seating, and premier cinema formats.
            </p>
          </div>

          {/* Films */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-black mb-3">
              Films
            </span>
            <ul className="space-y-2 text-xs">
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
                  IMAX 70mm
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Dolby Cinema
                </Link>
              </li>
            </ul>
          </div>

          {/* Theaters */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-black mb-3">
              Theaters
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Find Cinema
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Recliner Auditoriums
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Private Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Help */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-black mb-3">
              Account
            </span>
            <ul className="space-y-2 text-xs">
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
                  Ticket Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Movexa. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-black transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
