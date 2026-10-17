"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Loader2,
  ShieldAlert,
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Helper for initials (e.g. "Rehan Ahmad" -> "RA")
  const getUserInitials = (name?: string) => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-neutral-900">
        <Loader2 size={28} className="animate-spin text-[#ff5500] mb-3" />
        <p className="text-xs uppercase tracking-wider text-neutral-500 font-mono">
          Verifying administrator session...
        </p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f8fafc]">
        <div className="max-w-md w-full bg-white border border-[#e2e8f0] rounded-xl p-8 text-center text-neutral-900 shadow-sm">
          <div className="w-11 h-11 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={22} />
          </div>
          <h1 className="text-lg font-bold mb-2">Access Denied</h1>
          <p className="text-xs text-neutral-600 leading-relaxed mb-6">
            You do not have administrative privileges to access the Movexa management dashboard.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Login</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white text-neutral-900 font-sans selection:bg-[#ff5500] selection:text-white">
      {/* Deep Charcoal Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area: Soft off-white canvas matching ui.png */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
        {/* Top Navbar matching ui.png */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-[#eef0f4] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              title="Open menu"
            >
              <Menu size={18} />
            </button>

            {/* Desktop collapse toggle */}
            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="hidden lg:flex p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
            </button>

            {/* Pill Search Input matching ui.png */}
            <div className="relative hidden sm:flex items-center">
              <Search
                size={14}
                className="absolute left-3.5 text-neutral-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search movies, cinemas, shows..."
                className="w-72 sm:w-84 bg-[#f4f6fa] rounded-full pl-9 pr-4 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300 transition-all border-none"
              />
            </div>
          </div>

          {/* Right Header: Notification Bell & User Profile matching ui.png */}
          <div className="flex items-center gap-4">
            {/* Notification Bell with red dot */}
            <button
              type="button"
              className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* User Profile matching ui.png */}
            <div className="flex items-center gap-2.5 pl-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-[#0b0f17] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {getUserInitials(user.name)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-neutral-900 leading-tight">
                  {user.name || "Rehan Ahmad"}
                </span>
                <span className="text-[10px] text-neutral-400 font-medium leading-tight">
                  Admin
                </span>
              </div>
              <ChevronDown size={14} className="text-neutral-400 group-hover:text-neutral-700 transition-colors hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-5 sm:p-7 lg:p-9">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
