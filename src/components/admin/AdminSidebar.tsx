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
  CreditCard,
  DollarSign,
  Tag,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
  ExternalLink,
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
    group: "BOX OFFICE & FINANCE",
    items: [
      { id: "payments", label: "Payments", icon: CreditCard, href: "/admin/payments" },
      { id: "pricing", label: "Formats & Pricing", icon: DollarSign, href: "/admin/pricing" },
    ],
  },
  {
    group: "MARKETING",
    items: [
      { id: "coupons", label: "Coupons & Passes", icon: Tag, href: "/admin/coupons" },
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
          DESKTOP SIDEBAR (Collapsible)
         ========================================================================= */}
      <aside
        className={`hidden lg:flex flex-col justify-between bg-[#0e0e11] text-neutral-400 h-screen sticky top-0 border-r border-neutral-800/80 transition-all duration-300 ease-in-out shrink-0 z-30 ${
          isCollapsed ? "w-20 p-3" : "w-64 p-4"
        }`}
      >
        <div className="space-y-6 overflow-y-auto overflow-x-hidden pr-0.5">
          {/* Header Brand & Collapse Toggle */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between px-2"
            } py-2`}
          >
            <Link
              href="/admin"
              className="flex items-center gap-2.5 group overflow-hidden"
              title="Movexa Admin"
            >
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                M
              </div>
              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="text-base font-bold tracking-tight text-white uppercase truncate font-sans">
                    Movexa
                  </span>
                  <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-mono">
                    Admin Portal
                  </span>
                </div>
              )}
            </Link>

            {!isCollapsed && (
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Collapse sidebar"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800/60 rounded-md transition-colors cursor-pointer"
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
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 rounded-lg transition-colors cursor-pointer"
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
                  <p className="px-3 text-[10px] font-bold tracking-[0.14em] text-neutral-500 uppercase truncate">
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
                      className={`group relative flex items-center rounded-xl text-xs font-medium transition-colors ${
                        isCollapsed
                          ? "justify-center p-2.5 mx-auto w-11 h-11"
                          : "gap-3 px-3 py-2.5 w-full"
                      } ${
                        active
                          ? "bg-[#222227] text-white font-semibold shadow-xs"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                      }`}
                    >
                      <Icon
                        size={17}
                        className={`shrink-0 transition-colors ${
                          active ? "text-white" : "text-neutral-400 group-hover:text-white"
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{item.label}</span>
                      )}

                      {/* Tooltip on collapsed state hover */}
                      {isCollapsed && (
                        <span className="absolute left-full ml-3 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-medium rounded-md shadow-lg border border-neutral-800 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
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
        <div className="pt-3 border-t border-neutral-800/80">
          <div
            className={`flex items-center rounded-xl bg-neutral-900/40 border border-neutral-800/40 p-2 ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs uppercase shrink-0"
                title={user.name}
              >
                {user.name ? user.name.charAt(0) : "A"}
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-neutral-400 truncate">Administrator</p>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                type="button"
                onClick={onLogout}
                title="Log Out"
                className="text-neutral-400 hover:text-rose-400 p-1.5 transition-colors cursor-pointer rounded-lg hover:bg-neutral-800/40"
              >
                <LogOut size={15} />
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
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-64 bg-[#0e0e11] text-neutral-400 h-full p-4 flex flex-col justify-between z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="space-y-6 overflow-y-auto">
              {/* Drawer Top */}
              <div className="flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-extrabold text-sm">
                    M
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold tracking-tight text-white uppercase">
                      Movexa
                    </span>
                    <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-mono">
                      Admin Portal
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-4">
                {ADMIN_NAV_SECTIONS.map((section, idx) => (
                  <div key={idx} className="space-y-1">
                    {section.group && (
                      <p className="px-3 text-[10px] font-bold tracking-[0.14em] text-neutral-500 uppercase">
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
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                            active
                              ? "bg-[#222227] text-white font-semibold"
                              : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                          }`}
                        >
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            {/* Mobile Footer */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs uppercase">
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
                  className="text-neutral-400 hover:text-rose-400 p-1.5"
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
