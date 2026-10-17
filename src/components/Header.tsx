"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Films", href: "/" },
    { label: "Theaters", href: "/#theaters" },
    { label: "IMAX® & 70mm", href: "/#formats" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-opacity hover:opacity-80"
        >
          <span className="w-2.5 h-2.5 bg-black" aria-hidden="true" />
          <span className="text-lg font-bold tracking-[-0.04em] text-black uppercase font-sans">
            MOVEXA
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-mono pl-2 border-l border-neutral-300">
            CINEMAS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-9 text-xs uppercase tracking-[0.14em] font-medium text-neutral-600">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-1 text-neutral-600 hover:text-black transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Links */}
        <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.12em]">
          <Link
            href="/login"
            className={`font-medium transition-colors duration-150 ${
              pathname === "/login"
                ? "text-black underline underline-offset-4"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-black text-white px-5 py-2.5 font-medium hover:bg-neutral-800 active:scale-[0.99] transition-all duration-150"
          >
            Create Account
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2 text-black hover:bg-neutral-100 transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-6 space-y-5 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-3 text-xs uppercase tracking-[0.14em] font-medium text-neutral-700">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-2 border-b border-neutral-100 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/login"
              className="text-center py-3 border border-black text-xs uppercase tracking-[0.12em] font-medium text-black hover:bg-neutral-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-center py-3 bg-black text-white text-xs uppercase tracking-[0.12em] font-medium hover:bg-neutral-800 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
