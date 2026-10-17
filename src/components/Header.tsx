"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/#movies" },
    { label: "Cinemas", href: "/#cinemas" },
    { label: "My Bookings", href: "/login" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-extrabold tracking-tight text-neutral-950 font-sans uppercase">
            MOVEXA
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? "text-neutral-950 font-semibold"
                    : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-950" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Search & Profile CTA */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="hidden sm:flex items-center relative w-56 lg:w-72">
            <Search
              size={15}
              className="absolute left-3.5 text-neutral-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-neutral-100/80 hover:bg-neutral-100 focus:bg-white text-neutral-900 placeholder:text-neutral-400 border border-transparent focus:border-neutral-300 rounded-full outline-none transition-all"
            />
          </div>

          {/* User Profile / Login Button */}
          <Link
            href="/login"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition-colors shrink-0"
          >
            <User size={15} className="text-neutral-600" />
            <span className="hidden sm:inline">Login / Sign Up</span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-100 text-neutral-900 placeholder:text-neutral-400 rounded-full border border-neutral-200 focus:outline-none"
            />
          </div>

          <nav className="flex flex-col space-y-2 text-sm font-medium text-neutral-700">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-neutral-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
