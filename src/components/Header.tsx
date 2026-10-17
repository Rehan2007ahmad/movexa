"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Film,
  Search,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Ticket,
  User,
  Sparkles,
  Check,
} from "lucide-react";

const CITIES = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Austin, TX",
  "London, UK",
  "Toronto, CA",
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("New York, NY");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setCityDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Now Showing", href: "/#now-showing", highlight: true },
    { name: "Coming Soon", href: "/#coming-soon" },
    { name: "IMAX & Dolby", href: "/#experience" },
    { name: "Cinemas", href: "/#theaters" },
    { name: "Offers", href: "/#offers" },
  ];

  return (
    <>
      {/* Subtle Top Utility Bar */}
      <div className="bg-neutral-950 text-neutral-300 text-xs py-2 px-4 sm:px-8 border-b border-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white border border-white/10">
              <Sparkles size={11} className="text-amber-300" />
              EXCLUSIVE
            </span>
            <span className="hidden sm:inline text-neutral-300">
              Zero booking fees on all IMAX® 70mm screenings this weekend.
            </span>
            <span className="sm:hidden text-neutral-300">
              Zero booking fees on IMAX® 70mm screenings.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Location Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-expanded={cityDropdownOpen}
              >
                <MapPin size={12} className="text-neutral-400" />
                <span className="font-medium">{selectedCity}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    cityDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {cityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-neutral-900 rounded-lg shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Select City
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-neutral-100 transition-colors"
                    >
                      <span className={selectedCity === city ? "font-semibold" : ""}>
                        {city}
                      </span>
                      {selectedCity === city && (
                        <Check size={12} className="text-neutral-900" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-neutral-700 hidden sm:inline">|</span>
            <Link
              href="/#help"
              className="hidden sm:inline hover:text-white transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-200/80"
            : "bg-white border-b border-neutral-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-neutral-950 text-white flex items-center justify-center shadow-xs group-hover:bg-neutral-800 transition-colors">
              <Film size={20} className="stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-neutral-950 font-sans">
                MOVEXA
              </span>
              <span className="text-[9px] font-semibold tracking-widest uppercase -mt-1 text-neutral-600">
                Cinema Booking
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative py-1 hover:text-neutral-950 transition-colors flex items-center gap-1.5 group"
              >
                {link.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-950 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search Box & Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Search Input */}
            <div className="hidden md:flex items-center relative w-56 lg:w-64">
              <Search
                size={15}
                className="absolute left-3 text-neutral-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search movies, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-neutral-100 hover:bg-neutral-100/80 focus:bg-white text-neutral-900 placeholder:text-neutral-400 border border-transparent focus:border-neutral-900 rounded-lg outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Auth Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <User size={14} />
                <span>Sign In</span>
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-neutral-950 text-white hover:bg-neutral-800 rounded-lg shadow-xs hover:shadow-sm active:scale-[0.98] transition-all"
              >
                <Ticket size={14} />
                <span>Get Tickets</span>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 py-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search
                size={16}
                className="absolute left-3 top-2.5 text-neutral-400"
              />
              <input
                type="text"
                placeholder="Search movies, genres, cinemas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-100 text-neutral-900 placeholder:text-neutral-400 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-950"
              />
            </div>

            {/* Mobile Location */}
            <div className="mb-4 pb-3 border-b border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-medium">Location</span>
              <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900">
                <MapPin size={13} className="text-neutral-500" />
                <span>{selectedCity}</span>
              </div>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-2 mb-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {link.highlight && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    )}
                    {link.name}
                  </span>
                  <ChevronDown size={14} className="-rotate-90 text-neutral-400" />
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-neutral-800 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <User size={14} />
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <Ticket size={14} />
                Register
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
