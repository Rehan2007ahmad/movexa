"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-black uppercase">
            MOVEXA
          </span>
          <span className="w-1.5 h-1.5 bg-black"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-neutral-600">
          <Link href="/" className="hover:text-black transition-colors">
            Movies
          </Link>
          <Link href="/" className="hover:text-black transition-colors">
            Cinemas
          </Link>
          <Link href="/" className="hover:text-black transition-colors">
            Experiences
          </Link>
        </nav>

        {/* Auth CTA */}
        <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider">
          <Link
            href="/login"
            className="text-neutral-700 hover:text-black transition-colors font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-black text-white px-4 py-2 hover:bg-neutral-800 transition-colors font-medium"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-black hover:bg-neutral-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-xs uppercase tracking-widest font-medium text-neutral-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Movies
            </Link>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Cinemas
            </Link>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Experiences
            </Link>
          </nav>
          <div className="pt-4 border-t border-neutral-200 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 border border-black text-xs uppercase tracking-wider font-medium text-black hover:bg-neutral-50"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
