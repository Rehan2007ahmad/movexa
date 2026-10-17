"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Calendar,
  Ticket,
  Users,
  DollarSign,
  CreditCard,
  Tag,
  Settings,
  Plus,
  ArrowUpRight,
  ChevronDown,
  LogOut,
  Menu,
  X,
  TrendingUp,
  MoreHorizontal,
  Globe,
  Loader2,
  ShieldAlert,
  ArrowLeft,
  ShoppingBag,
  Download,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("Last 7 days");

  // Route security check
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c0c0e] text-white">
        <Loader2 size={32} className="animate-spin text-white mb-3" />
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
          Verifying administrator session...
        </p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0c0c0e]">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center text-white shadow-xl">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={24} />
          </div>
          <h1 className="text-xl font-bold mb-2">Access Denied</h1>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            You do not have administrative privileges to access the Movexa management dashboard.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg text-xs font-semibold hover:bg-neutral-200 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Login</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Nav categories matching the uploaded SellZenX sidebar architecture
  const sidebarNav = [
    {
      group: null,
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
      ],
    },
    {
      group: "MOVIES & THEATERS",
      items: [
        { id: "movies", label: "Movies", icon: Film, href: "#movies" },
        { id: "showtimes", label: "Showtimes", icon: Calendar, href: "#showtimes" },
        { id: "bookings", label: "Bookings", icon: Ticket, href: "#bookings" },
        { id: "customers", label: "Customers", icon: Users, href: "#customers" },
      ],
    },
    {
      group: "BOX OFFICE & FINANCE",
      items: [
        { id: "payments", label: "Payments", icon: CreditCard, href: "#payments" },
        { id: "pricing", label: "Formats & Pricing", icon: DollarSign, href: "#pricing" },
      ],
    },
    {
      group: "MARKETING",
      items: [
        { id: "coupons", label: "Coupons & Passes", icon: Tag, href: "#coupons" },
      ],
    },
    {
      group: "SETTINGS",
      items: [
        { id: "settings", label: "Settings", icon: Settings, href: "#settings" },
      ],
    },
  ];

  const recentOrders = [
    {
      id: "#1024",
      customer: "John Doe",
      movie: "Dune: Part Two",
      amount: "$19.99",
      status: "Paid",
      date: "Sep 25, 2026",
    },
    {
      id: "#1023",
      customer: "Sarah Khan",
      movie: "Astral Horizon",
      amount: "$39.00",
      status: "Paid",
      date: "Sep 24, 2026",
    },
    {
      id: "#1022",
      customer: "Mike Johnson",
      movie: "Silent Frequency",
      amount: "$12.00",
      status: "Paid",
      date: "Sep 24, 2026",
    },
    {
      id: "#1021",
      customer: "Emily Carter",
      movie: "Oppenheimer 70mm",
      amount: "$14.00",
      status: "Pending",
      date: "Sep 23, 2026",
    },
    {
      id: "#1020",
      customer: "David Lee",
      movie: "Dune: Part Two",
      amount: "$19.99",
      status: "Paid",
      date: "Sep 22, 2026",
    },
  ];

  const topMovies = [
    {
      title: "Dune: Part Two",
      sales: "1,280 tickets",
      revenue: "$18,240",
      image: "/images/dune-hero.jpg",
    },
    {
      title: "Astral Horizon",
      sales: "1,130 tickets",
      revenue: "$16,120",
      image: "/images/hero-banner.jpg",
    },
    {
      title: "Silent Frequency",
      sales: "744 tickets",
      revenue: "$10,440",
      image: "/images/poster-noir.jpg",
    },
    {
      title: "Oppenheimer",
      sales: "422 tickets",
      revenue: "$6,308",
      image: "/images/cinema-auth.jpg",
    },
  ];

  // SVG Chart path generation for the 7-day revenue chart
  // Points: Sep 19 ($140), Sep 20 ($180), Sep 21 ($250), Sep 22 ($210), Sep 23 ($320), Sep 24 ($300), Sep 25 ($420)
  // ViewBox: 0 0 600 200 (Y inverted: 0 is $500, 200 is $0)
  const chartPoints = [
    { x: 30, y: 150, label: "Sep 19" },
    { x: 120, y: 130, label: "Sep 20" },
    { x: 210, y: 100, label: "Sep 21" },
    { x: 300, y: 115, label: "Sep 22" },
    { x: 390, y: 70, label: "Sep 23" },
    { x: 480, y: 80, label: "Sep 24" },
    { x: 570, y: 35, label: "Sep 25" },
  ];
  const pathD = "M 30,150 L 120,130 L 210,100 L 300,115 L 390,70 L 480,80 L 570,35";
  const areaD = "M 30,150 L 120,130 L 210,100 L 300,115 L 390,70 L 480,80 L 570,35 L 570,200 L 30,200 Z";

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-neutral-900 flex font-sans antialiased selection:bg-neutral-900 selection:text-white">
      {/* =========================================================================
          DARK RESPONSIVE SIDEBAR (Matches SellZenX Sidebar Architecture)
         ========================================================================= */}
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-[#0e0e11] text-neutral-400 h-screen sticky top-0 p-4 border-r border-neutral-800/80 shrink-0">
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-extrabold text-sm shadow-xs">
              M
            </div>
            <span className="text-lg font-bold tracking-tight text-white uppercase">
              Movexa
            </span>
          </div>

          {/* Navigation Groups */}
          <nav className="space-y-5">
            {sidebarNav.map((section, idx) => (
              <div key={idx} className="space-y-1">
                {section.group && (
                  <p className="px-3 text-[10px] font-bold tracking-[0.14em] text-neutral-500 uppercase">
                    {section.group}
                  </p>
                )}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#222227] text-white font-semibold shadow-xs"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                      }`}
                    >
                      <Icon size={16} className={isActive ? "text-white" : "text-neutral-400"} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="pt-4 border-t border-neutral-800/80">
          <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 transition-colors">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs uppercase shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-neutral-400 truncate">Administrator</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              title="Log Out"
              className="text-neutral-400 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-64 bg-[#0e0e11] text-neutral-400 h-full p-4 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div className="space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-extrabold text-sm">
                    M
                  </div>
                  <span className="text-lg font-bold tracking-tight text-white uppercase">
                    Movexa
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="space-y-5">
                {sidebarNav.map((section, idx) => (
                  <div key={idx} className="space-y-1">
                    {section.group && (
                      <p className="px-3 text-[10px] font-bold tracking-[0.14em] text-neutral-500 uppercase">
                        {section.group}
                      </p>
                    )}
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setActiveTab(item.id);
                            setMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            isActive
                              ? "bg-[#222227] text-white font-semibold"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{user.name}</p>
                    <p className="text-[10px] text-neutral-400">Admin</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-neutral-400 hover:text-rose-400 p-1.5"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MAIN DASHBOARD CONTENT AREA
         ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Header */}
        <header className="lg:hidden bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-sm uppercase tracking-tight">MOVEXA ADMIN</span>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1"
          >
            <Globe size={13} />
            <span>Public Site</span>
          </Link>
        </header>

        {/* Dashboard Body */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl w-full mx-auto">
          {/* Greeting Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 font-serif flex items-center gap-2">
                <span>Welcome back, {user.name}</span>
                <span className="inline-block">👋</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-sans">
                Here&apos;s what&apos;s happening with your cinema box office today.
              </p>
            </div>

            {/* Quick Public Site Switch */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-lg shadow-2xs transition-colors"
              >
                <Globe size={13} />
                <span>Visit Storefront</span>
              </Link>
            </div>
          </div>

          {/* Top 4 Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Metric 1 */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-neutral-600">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <DollarSign size={16} />
                </div>
                <span className="text-xs font-semibold text-neutral-700">Total Revenue</span>
              </div>
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-neutral-950">
                  $14,284.00
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <span className="font-semibold text-neutral-900 flex items-center">
                    ↑ 18.4%
                  </span>
                  <span className="text-neutral-400 text-[11px]">vs. previous 7 days</span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-neutral-600">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <ShoppingBag size={16} />
                </div>
                <span className="text-xs font-semibold text-neutral-700">Total Orders</span>
              </div>
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-neutral-950">
                  842
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <span className="font-semibold text-neutral-900 flex items-center">
                    ↑ 12.0%
                  </span>
                  <span className="text-neutral-400 text-[11px]">vs. previous 7 days</span>
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-neutral-600">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <Users size={16} />
                </div>
                <span className="text-xs font-semibold text-neutral-700">Total Customers</span>
              </div>
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-neutral-950">
                  1,710
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <span className="font-semibold text-neutral-900 flex items-center">
                    ↑ 9.2%
                  </span>
                  <span className="text-neutral-400 text-[11px]">vs. previous 7 days</span>
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 text-neutral-600">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <Ticket size={16} />
                </div>
                <span className="text-xs font-semibold text-neutral-700">Tickets Issued</span>
              </div>
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-neutral-950">
                  3,170
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <span className="font-semibold text-neutral-900 flex items-center">
                    ↑ 21.3%
                  </span>
                  <span className="text-neutral-400 text-[11px]">vs. previous 7 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Revenue Overview Chart + Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Revenue Overview Card with Custom SVG Chart */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-neutral-950 font-sans">
                    Revenue Overview
                  </h2>
                </div>
                {/* Time Range Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setTimeRange(timeRange === "Last 7 days" ? "Last 30 days" : "Last 7 days")
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <span>{timeRange}</span>
                    <ChevronDown size={13} className="text-neutral-400" />
                  </button>
                </div>
              </div>

              {/* Chart Canvas */}
              <div className="relative pt-2">
                {/* Y-Axis Guidelines & Labels */}
                <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[11px] font-mono text-neutral-400 pointer-events-none pb-6">
                  <span>$500</span>
                  <span>$400</span>
                  <span>$300</span>
                  <span>$200</span>
                  <span>$100</span>
                  <span>$0</span>
                </div>

                {/* SVG Area & Line Chart */}
                <div className="pl-10">
                  <svg
                    viewBox="0 0 600 200"
                    className="w-full h-52 overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0.14" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="30" y1="0" x2="570" y2="0" stroke="#f1f2f4" strokeWidth="1" />
                    <line x1="30" y1="40" x2="570" y2="40" stroke="#f1f2f4" strokeWidth="1" />
                    <line x1="30" y1="80" x2="570" y2="80" stroke="#f1f2f4" strokeWidth="1" />
                    <line x1="30" y1="120" x2="570" y2="120" stroke="#f1f2f4" strokeWidth="1" />
                    <line x1="30" y1="160" x2="570" y2="160" stroke="#f1f2f4" strokeWidth="1" />
                    <line x1="30" y1="200" x2="570" y2="200" stroke="#e5e7eb" strokeWidth="1" />

                    {/* Gradient Area Fill */}
                    <path d={areaD} fill="url(#chartGradient)" />

                    {/* Line Stroke */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#111827"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Chart Data Points */}
                    {chartPoints.map((pt, i) => (
                      <circle
                        key={i}
                        cx={pt.x}
                        cy={pt.y}
                        r="4.5"
                        fill="#ffffff"
                        stroke="#111827"
                        strokeWidth="2.5"
                        className="transition-transform hover:scale-125 cursor-pointer"
                      />
                    ))}
                  </svg>

                  {/* X-Axis Date Labels */}
                  <div className="flex justify-between text-[11px] font-mono text-neutral-500 pt-2 px-3">
                    {chartPoints.map((pt, i) => (
                      <span key={i}>{pt.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products / Movies Card */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-neutral-950 font-sans">
                  Top Movies
                </h2>
                <Link
                  href="/admin#movies"
                  className="text-xs font-medium text-neutral-600 hover:text-black flex items-center gap-1"
                >
                  <span>View all</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              <div className="space-y-4">
                {topMovies.map((movie, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-neutral-900 shrink-0 border border-neutral-200">
                        <Image
                          src={movie.image}
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-neutral-900 truncate group-hover:text-black">
                          {movie.title}
                        </p>
                        <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                          {movie.sales}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-neutral-900 font-mono shrink-0">
                      {movie.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row: Recent Orders Table + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Recent Orders Table */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/90 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <h2 className="text-base font-bold text-neutral-950 font-sans">
                  Recent Orders
                </h2>
                <Link
                  href="/admin#orders"
                  className="text-xs font-medium text-neutral-600 hover:text-black flex items-center gap-1"
                >
                  <span>View all</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#fafafa] text-neutral-500 font-semibold border-b border-neutral-100 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-6">#</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-neutral-700">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="py-3.5 px-6 font-mono text-neutral-900 font-medium">
                          {order.id}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-neutral-900">
                          {order.customer}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-600">
                          {order.movie}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-medium text-neutral-900">
                          {order.amount}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              order.status === "Paid"
                                ? "bg-black text-white"
                                : "bg-neutral-200 text-neutral-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-500 font-mono text-[11px]">
                          {order.date}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            className="p-1 text-neutral-400 hover:text-black cursor-pointer"
                          >
                            <MoreHorizontal size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions & Recent Activity (Right Column) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
                <h2 className="text-base font-bold text-neutral-950 font-sans">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => alert("Add Movie modal will open")}
                    className="p-3 border border-neutral-200 hover:border-neutral-400 rounded-xl text-left transition-colors cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-black group-hover:text-white transition-colors mb-2">
                      <Plus size={15} />
                    </div>
                    <p className="text-xs font-bold text-neutral-900">Add Product</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Create new movie</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Orders management")}
                    className="p-3 border border-neutral-200 hover:border-neutral-400 rounded-xl text-left transition-colors cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-black group-hover:text-white transition-colors mb-2">
                      <Ticket size={15} />
                    </div>
                    <p className="text-xs font-bold text-neutral-900">View Orders</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Manage tickets</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Coupon creation")}
                    className="p-3 border border-neutral-200 hover:border-neutral-400 rounded-xl text-left transition-colors cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-black group-hover:text-white transition-colors mb-2">
                      <Tag size={15} />
                    </div>
                    <p className="text-xs font-bold text-neutral-900">Add Coupon</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Create discount</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Customer management")}
                    className="p-3 border border-neutral-200 hover:border-neutral-400 rounded-xl text-left transition-colors cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-black group-hover:text-white transition-colors mb-2">
                      <Users size={15} />
                    </div>
                    <p className="text-xs font-bold text-neutral-900">View Customers</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Manage patrons</p>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-neutral-950 font-sans">
                    Recent Activity
                  </h2>
                  <Link
                    href="/admin#activity"
                    className="text-xs font-medium text-neutral-500 hover:text-black"
                  >
                    View all →
                  </Link>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 mt-0.5">
                      <DollarSign size={14} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-neutral-900 truncate">
                        New order received
                      </p>
                      <p className="text-neutral-500 text-[11px]">#1024 - $19.99</p>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                      2h ago
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 mt-0.5">
                      <Tag size={14} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-neutral-900 truncate">
                        Coupon code created
                      </p>
                      <p className="text-neutral-500 text-[11px]">SAVE20 - 20% OFF</p>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                      5h ago
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 mt-0.5">
                      <Film size={14} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-neutral-900 truncate">
                        Movie schedule published
                      </p>
                      <p className="text-neutral-500 text-[11px]">Astral Horizon IMAX</p>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                      8h ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
