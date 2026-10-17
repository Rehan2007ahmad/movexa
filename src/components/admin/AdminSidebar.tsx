"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Calendar,
  Ticket,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
import { AuthUser } from "@/context/AuthContext";

export interface NavSection {
  group: string | null;
  items: {
    id: string;
    label: string;
    icon: React.ElementType;
    href: string;
  }[];
}

export const ADMIN_NAV_SECTIONS: NavSection[] = [
  {
    group: null,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    ],
  },
  {
    group: "MOVIES & THEATERS",
    items: [
      { id: "movies", label: "Movies", icon: Film, href: "/admin/movies" },
      { id: "showtimes", label: "Showtimes", icon: Calendar, href: "/admin/showtimes" },
      { id: "bookings", label: "Bookings", icon: Ticket, href: "/admin/bookings" },
      { id: "customers", label: "Customers", icon: Users, href: "/admin/customers" },
    ],
  },
  {
    group: "SYSTEM",
    items: [
      { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
    ],
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  user: AuthUser;
  onLogout: () => void;
}

export default function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  user,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* =========================================================================
          DESKTOP SIDEBAR (Solid Black, Clean Minimal)
         ========================================================================= */}
      <aside
        className={`hidden lg:flex flex-col justify-between bg-black text-neutral-400 h-screen sticky top-0 border-r border-neutral-800 transition-all duration-200 ease-in-out shrink-0 z-30 ${
          isCollapsed ? "w-16 p-2.5" : "w-60 p-4"
        }`}
      >
        <div className="space-y-6 overflow-y-auto overflow-x-hidden no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Header Brand & Collapse Toggle */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } py-1`}
          >
            <Link
              href="/admin"
              className="flex items-center gap-2.5 group overflow-hidden"
              title="Movexa Admin"
            >
              <div className="w-7 h-7 rounded-md bg-orange-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                M
              </div>
              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold tracking-tight text-white uppercase truncate font-sans">
                    Movexa
                  </span>
                  <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-mono">
                    Admin
                  </span>
                </div>
              )}
            </Link>

            {!isCollapsed && (
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Collapse sidebar"
                className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
            )}
          </div>

          {/* Collapsed Re-expand Button */}
          {isCollapsed && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                title="Expand sidebar"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-4">
            {ADMIN_NAV_SECTIONS.map((section, idx) => (
              <div key={idx} className="space-y-1">
                {section.group && !isCollapsed && (
                  <p className="px-2.5 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase truncate">
                    {section.group}
                  </p>
                )}

                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isLinkActive(item.href);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      title={isCollapsed ? item.label : undefined}
                      className={`group relative flex items-center rounded-md text-xs font-medium transition-colors ${
                        isCollapsed
                          ? "justify-center p-2 mx-auto w-10 h-10"
                          : "gap-2.5 px-2.5 py-2 w-full"
                      } ${
                        active
                          ? "bg-neutral-900 text-white font-semibold border-l-2 border-orange-500"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                      }`}
                    >
                      <Icon
                        size={16}
                        className={`shrink-0 transition-colors ${
                          active ? "text-orange-500" : "text-neutral-400 group-hover:text-white"
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{item.label}</span>
                      )}

                      {/* Tooltip on collapsed state hover */}
                      {isCollapsed && (
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-[11px] font-medium rounded-md shadow-md border border-neutral-800 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="pt-3 border-t border-neutral-800">
          <div
            className={`flex items-center rounded-md bg-neutral-950 border border-neutral-800/80 p-2 ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div
                className="w-7 h-7 rounded-md bg-orange-600 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0"
                title={user.name}
              >
                {user.name ? user.name.charAt(0) : "A"}
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-neutral-400 truncate">Admin</p>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                type="button"
                onClick={onLogout}
                title="Log Out"
                className="text-neutral-400 hover:text-rose-400 p-1 transition-colors cursor-pointer rounded-md hover:bg-neutral-900"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MOBILE DRAWER SIDEBAR (Solid Black, Clean Minimal)
         ========================================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-60 bg-black text-neutral-400 h-full p-4 flex flex-col justify-between z-10 shadow-xl border-r border-neutral-800 animate-in slide-in-from-left duration-200">
            <div className="space-y-6 overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Drawer Top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-orange-600 text-white flex items-center justify-center font-black text-xs">
                    M
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold tracking-tight text-white uppercase">
                      Movexa
                    </span>
                    <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-mono">
                      Admin
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-900"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-4">
                {ADMIN_NAV_SECTIONS.map((section, idx) => (
                  <div key={idx} className="space-y-1">
                    {section.group && (
                      <p className="px-2.5 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                        {section.group}
                      </p>
                    )}
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = isLinkActive(item.href);

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
                            active
                              ? "bg-neutral-900 text-white font-semibold border-l-2 border-orange-500"
                              : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                          }`}
                        >
                          <Icon size={16} className={active ? "text-orange-500" : ""} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            {/* Mobile Footer */}
            <div className="pt-3 border-t border-neutral-800">
              <div className="flex items-center justify-between p-2 rounded-md bg-neutral-950 border border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-orange-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.name ? user.name.charAt(0) : "A"}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{user.name}</p>
                    <p className="text-[10px] text-neutral-400">Admin</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onLogout();
                  }}
                  className="text-neutral-400 hover:text-rose-400 p-1 rounded-md"
                >
                  <LogOut size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
