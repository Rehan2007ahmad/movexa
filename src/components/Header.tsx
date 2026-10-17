"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, Menu, X, ChevronDown, LogOut, Ticket } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
    router.push("/");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/#movies" },
    { label: "Cinemas", href: "/#cinemas" },
    { label: "My Bookings", href: user ? "/#bookings" : "/login" },
  ];

  if (pathname?.startsWith("/admin")) {
    return null;
  }

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

          {/* User Button: Shows Name when logged in, or "Login / Sign Up" */}
          {isLoading ? (
            <div className="w-28 h-8 rounded-full bg-neutral-100 animate-pulse" />
          ) : user ? (
            /* Logged in state with User Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 text-xs font-semibold text-neutral-900 transition-colors cursor-pointer shrink-0"
                aria-expanded={userDropdownOpen}
              >
                <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] uppercase font-bold">
                  {user.name ? user.name.charAt(0) : "U"}
                </div>
                <span className="max-w-[120px] truncate">{user.name}</span>
                <ChevronDown
                  size={13}
                  className={`text-neutral-400 transition-transform duration-150 ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2.5 border-b border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/#bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2.5 transition-colors"
                    >
                      <Ticket size={14} className="text-neutral-500" />
                      <span>My Bookings</span>
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2.5 transition-colors font-medium text-amber-700"
                      >
                        <User size={14} className="text-amber-600" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-neutral-100 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors font-medium cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged out state */
            <Link
              href="/login"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition-colors shrink-0"
            >
              <User size={15} className="text-neutral-600" />
              <span className="hidden sm:inline">Login / Sign Up</span>
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
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

          <div className="pt-3 border-t border-neutral-100">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">{user.name}</p>
                    <p className="text-[11px] text-neutral-500">{user.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 text-xs font-semibold text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-full hover:bg-neutral-800"
              >
                <User size={14} />
                <span>Login / Sign Up</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
