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
  Play,
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
          DESKTOP SIDEBAR (Matches ui.png - Deep Charcoal Obsidian #0b0f17)
         ========================================================================= */}
      <aside
        className={`hidden lg:flex flex-col justify-between bg-[#0b0f17] text-[#8a99ad] h-screen sticky top-0 border-r border-[#1a2230] transition-all duration-200 ease-in-out shrink-0 z-30 ${
          isCollapsed ? "w-18 p-3" : "w-64 p-5"
        }`}
      >
        <div className="space-y-6 overflow-y-auto overflow-x-hidden no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Header Brand Logo matching ui.png */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } py-1`}
          >
            <Link
              href="/admin"
              className="flex items-center gap-3 group overflow-hidden"
              title="Movexa Admin"
            >
              {/* Play symbol orange logo icon */}
              <div className="w-8 h-8 rounded-lg bg-[#ff5500] text-white flex items-center justify-center shrink-0 shadow-md">
                <Play size={16} className="fill-white translate-x-0.5" />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="text-base font-extrabold tracking-wider text-white uppercase font-sans">
                    MOVEXA
                  </span>
                  <span className="text-[11px] font-medium text-[#7a8a9e]">
                    Admin Panel
                  </span>
                </div>
              )}
            </Link>

            {!isCollapsed && (
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Collapse sidebar"
                className="p-1 text-[#6b7c93] hover:text-white hover:bg-[#151c28] rounded-md transition-colors cursor-pointer"
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
                className="p-1.5 text-[#6b7c93] hover:text-white hover:bg-[#151c28] rounded-md transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Navigation Groups */}
          <nav className="space-y-5">
            {ADMIN_NAV_SECTIONS.map((section, idx) => (
              <div key={idx} className="space-y-1">
                {section.group && !isCollapsed && (
                  <p className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-[0.14em] text-[#55657a] uppercase truncate">
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
                      className={`group relative flex items-center rounded-lg text-xs font-medium transition-all ${
                        isCollapsed
                          ? "justify-center p-2.5 mx-auto w-11 h-11"
                          : "gap-3 px-3 py-2.5 w-full"
                      } ${
                        active
                          ? "bg-[#1c1815] text-white font-semibold border-l-2 border-[#ff5500] shadow-xs"
                          : "text-[#8a99ad] hover:text-white hover:bg-[#131924]"
                      }`}
                    >
                      <Icon
                        size={17}
                        className={`shrink-0 transition-colors ${
                          active ? "text-[#ff5500]" : "text-[#7e8f03]/0 text-[#8a99ad] group-hover:text-white"
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{item.label}</span>
                      )}

                      {/* Tooltip on collapsed state hover */}
                      {isCollapsed && (
                        <span className="absolute left-full ml-3 px-2.5 py-1 bg-[#151d2a] text-white text-[11px] font-medium rounded-md shadow-lg border border-[#222e42] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
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
        <div className="pt-3 border-t border-[#1a2230]">
          <div
            className={`flex items-center rounded-lg bg-[#111722] border border-[#1d2636] p-2 ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div
                className="w-7 h-7 rounded-full bg-[#1e2738] text-white flex items-center justify-center font-bold text-xs uppercase shrink-0 border border-[#2a374e]"
                title={user.name}
              >
                {user.name ? user.name.charAt(0) : "A"}
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-[#728399] truncate">Administrator</p>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                type="button"
                onClick={onLogout}
                title="Log Out"
                className="text-[#728399] hover:text-rose-400 p-1.5 transition-colors cursor-pointer rounded-md hover:bg-[#1a2333]"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MOBILE DRAWER SIDEBAR
         ========================================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-64 bg-[#0b0f17] text-[#8a99ad] h-full p-4 flex flex-col justify-between z-10 shadow-2xl border-r border-[#1a2230] animate-in slide-in-from-left duration-200">
            <div className="space-y-6 overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Drawer Top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#ff5500] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Play size={16} className="fill-white translate-x-0.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-extrabold tracking-wider text-white uppercase font-sans">
                      MOVEXA
                    </span>
                    <span className="text-[11px] font-medium text-[#7a8a9e]">
                      Admin Panel
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-[#6b7c93] hover:text-white p-1 rounded-md hover:bg-[#151c28]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-4">
                {ADMIN_NAV_SECTIONS.map((section, idx) => (
                  <div key={idx} className="space-y-1">
                    {section.group && (
                      <p className="px-3 pt-2 text-[10px] font-bold tracking-[0.14em] text-[#55657a] uppercase">
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
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                            active
                              ? "bg-[#1c1815] text-white font-semibold border-l-2 border-[#ff5500]"
                              : "text-[#8a99ad] hover:text-white hover:bg-[#131924]"
                          }`}
                        >
                          <Icon size={16} className={active ? "text-[#ff5500]" : ""} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            {/* Mobile Footer */}
            <div className="pt-3 border-t border-[#1a2230]">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#111722] border border-[#1d2636]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1e2738] text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.name ? user.name.charAt(0) : "A"}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{user.name}</p>
                    <p className="text-[10px] text-[#728399]">Admin</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onLogout();
                  }}
                  className="text-[#728399] hover:text-rose-400 p-1.5"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
