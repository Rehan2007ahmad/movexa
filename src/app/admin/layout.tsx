"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Loader2,
  ShieldAlert,
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar, { ADMIN_NAV_SECTIONS } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const getCurrentSectionTitle = () => {
    for (const section of ADMIN_NAV_SECTIONS) {
      for (const item of section.items) {
        if (
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname === item.href || pathname.startsWith(item.href + "/")
        ) {
          return item.label;
        }
      }
    }
    return "Admin";
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-neutral-900">
        <Loader2 size={28} className="animate-spin text-orange-600 mb-3" />
        <p className="text-xs uppercase tracking-wider text-neutral-500 font-mono">
          Verifying administrator session...
        </p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-neutral-50">
        <div className="max-w-md w-full bg-white border border-neutral-200 rounded-lg p-8 text-center text-neutral-900 shadow-sm">
          <div className="w-11 h-11 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={22} />
          </div>
          <h1 className="text-lg font-bold mb-2">Access Denied</h1>
          <p className="text-xs text-neutral-600 leading-relaxed mb-6">
            You do not have administrative privileges to access the Movexa management dashboard.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-md text-xs font-semibold hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Login</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white text-neutral-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* Solid Black Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area: Clean Minimal White Background */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#fafafa]">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 h-14 bg-white border-b border-neutral-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
              title="Open menu"
            >
              <Menu size={18} />
            </button>

            {/* Desktop collapse toggle */}
            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="hidden lg:flex p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
            </button>

            {/* Breadcrumb route indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400 font-mono hidden sm:inline">Admin</span>
              <span className="text-neutral-300 hidden sm:inline">/</span>
              <span className="text-neutral-900 font-semibold tracking-tight">
                {getCurrentSectionTitle()}
              </span>
            </div>
          </div>

          {/* Right Header User Avatar */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-600 text-white flex items-center justify-center font-bold text-[11px] shadow-2xs">
              {user.name ? user.name.charAt(0) : "A"}
            </div>
            <span className="text-xs text-neutral-700 font-medium hidden md:inline truncate max-w-[120px]">
              {user.name}
            </span>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
