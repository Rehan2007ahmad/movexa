"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Globe,
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

  // Route security check
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Determine current section title from pathname
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

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c0c0e] text-white">
  //       <Loader2 size={32} className="animate-spin text-white mb-3" />
  //       <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
  //         Verifying administrator session...
  //       </p>
  //     </div>
  //   );
  // }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0c0c0e]">
        <div className="max-w-md w-full bg-[#121216] border border-neutral-800 rounded-2xl p-8 text-center text-white shadow-xl">
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

  return (
    <div className="min-h-screen flex bg-[#0c0c0e] text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white">
      {/* Responsive & Collapsible Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 h-16 bg-[#0e0e11]/90 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="Open menu"
            >
              <Menu size={19} />
            </button>

            {/* Desktop collapse toggle */}
            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="hidden lg:flex p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>

            {/* Current route indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-500 font-mono hidden sm:inline">Admin</span>
              <span className="text-neutral-600 hidden sm:inline">/</span>
              <span className="text-neutral-200 font-semibold tracking-wide">
                {getCurrentSectionTitle()}
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors shadow-2xs"
              title="Open public cinema storefront"
            >
              <Globe size={13} />
              <span className="hidden sm:inline">Storefront</span>
            </Link> */}

            <div className="h-4 w-px bg-neutral-800 hidden sm:block" />

            <div className="flex items-center gap-2 pl-1">
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                {user.name ? user.name.charAt(0) : "A"}
              </div>
              <span className="text-xs text-neutral-300 font-medium hidden md:inline truncate max-w-[120px]">
                {user.name}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
