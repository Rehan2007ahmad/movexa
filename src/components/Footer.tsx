"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Film,
  Send,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Globe,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-neutral-50 text-neutral-600 border-t border-neutral-200 transition-colors">
      {/* Newsletter & Club Section */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-900 border border-neutral-200 mb-3">
              MOVEXA CLUB PERKS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
              Never miss a premiere. Get notified first.
            </h3>
            <p className="text-sm text-neutral-600 mt-1.5">
              Subscribe for exclusive advance ticket drops, secret film screenings, and member-only cinema discounts.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-950 text-white hover:bg-neutral-800 text-sm font-semibold rounded-lg shadow-xs hover:shadow-sm active:scale-[0.98] transition-all cursor-pointer shrink-0"
              >
                <span>Subscribe</span>
                <Send size={14} />
              </button>
            </form>
            {subscribed && (
              <p className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-2">
                <CheckCircle2 size={13} />
                Thank you! You are now subscribed to Movexa cinema updates.
              </p>
            )}
            <p className="text-[11px] text-neutral-600 mt-2 text-center lg:text-left">
              No spam. Unsubscribe at any time. Read our{" "}
              <Link href="/#privacy" className="underline underline-offset-2 hover:text-neutral-900">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white flex items-center justify-center shadow-xs">
                <Film size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-950 font-sans">
                MOVEXA
              </span>
            </Link>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-sm mb-6">
              Movexa brings you modern cinema ticketing. Enjoy guaranteed reserved seating, crystal clear IMAX® 70mm, Dolby Atmos sound, and premium craft refreshments.
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-600">
              <div className="flex items-center gap-1">
                <ShieldCheck size={16} className="text-neutral-700" />
                <span>Verified Ticketing</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <CreditCard size={16} className="text-neutral-700" />
                <span>Encrypted Checkout</span>
              </div>
            </div>
          </div>

          {/* Column: Movies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 mb-4">
              Movies
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#now-showing" className="hover:text-neutral-950 transition-colors">
                  Now Showing
                </Link>
              </li>
              <li>
                <Link href="/#coming-soon" className="hover:text-neutral-950 transition-colors">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-neutral-950 transition-colors">
                  IMAX® 70mm
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-neutral-950 transition-colors">
                  Dolby Cinema
                </Link>
              </li>
              <li>
                <Link href="/#now-showing" className="hover:text-neutral-950 transition-colors flex items-center gap-1">
                  Film Festivals
                  <ArrowUpRight size={12} className="text-neutral-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Theaters & Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 mb-4">
              Cinemas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#theaters" className="hover:text-neutral-950 transition-colors">
                  Find a Theater
                </Link>
              </li>
              <li>
                <Link href="/#theaters" className="hover:text-neutral-950 transition-colors">
                  VIP Recliner Lounges
                </Link>
              </li>
              <li>
                <Link href="/#theaters" className="hover:text-neutral-950 transition-colors">
                  Private Screenings
                </Link>
              </li>
              <li>
                <Link href="/#theaters" className="hover:text-neutral-950 transition-colors">
                  Food & Craft Beverage
                </Link>
              </li>
              <li>
                <Link href="/#theaters" className="hover:text-neutral-950 transition-colors">
                  Accessibility & Assistive
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Perks & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 mb-4">
              Account & Help
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/login" className="hover:text-neutral-950 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-neutral-950 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/#offers" className="hover:text-neutral-950 transition-colors">
                  Movexa Rewards Pass
                </Link>
              </li>
              <li>
                <Link href="/#help" className="hover:text-neutral-950 transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/#help" className="hover:text-neutral-950 transition-colors">
                  Help Center & FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Legal & Badges */}
      <div className="border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-center md:text-left">
            <span>© {new Date().getFullYear()} Movexa Cinema Systems, Inc.</span>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <Link href="/#privacy" className="hover:text-neutral-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/#terms" className="hover:text-neutral-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/#cookies" className="hover:text-neutral-900 transition-colors">
              Cookie Preferences
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-neutral-500">
              <Globe size={13} />
              <span>English (US)</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400">
              <span className="px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-50">VISA</span>
              <span className="px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-50">MC</span>
              <span className="px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-50">AMEX</span>
              <span className="px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-50">APPLE PAY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
