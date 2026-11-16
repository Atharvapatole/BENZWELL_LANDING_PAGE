"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Inbox,
  Users,
  FileEdit,
  Image as ImageIcon,
  SearchCheck,
  Bot,
  Settings,
  ShieldAlert,
  History,
  Activity,
  ExternalLink,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  newEnquiriesCount?: number;
}

export const ADMIN_NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  {
    name: "Enquiries",
    href: "/admin/enquiries",
    icon: Inbox,
    badgeKey: "enquiries",
  },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Website Content", href: "/admin/content", icon: FileEdit },
  { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  { name: "SEO Manager", href: "/admin/seo", icon: SearchCheck },
  {
    name: "Chatbot Knowledge",
    href: "/admin/chatbot",
    icon: Bot,
  },
  { name: "Website Settings", href: "/admin/settings", icon: Settings },
  { name: "Admin Users", href: "/admin/users", icon: ShieldAlert },
  { name: "Activity Logs", href: "/admin/activity", icon: History },
  {
    name: "System & Health",
    href: "/admin/system-health",
    icon: Activity,
  },
];

export default function AdminSidebar({
  mobileOpen,
  setMobileOpen,
  newEnquiriesCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin");
      router.refresh();
    } catch (e) {
      router.push("/admin");
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-forest-900 text-ivory border-r border-forest-700/60 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="p-5 border-b border-forest-700/60 flex items-center justify-between">
            <Logo variant="dark" />
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-gray-300 hover:text-white p-1 rounded"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-admin-scroll">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold/80">
              Operations & Management
            </div>

            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group ${
                    isActive
                      ? "bg-forest text-white font-semibold shadow-xs border-l-3 border-gold"
                      : "text-gray-300 hover:text-white hover:bg-forest-800/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive ? "text-gold" : "text-gray-400 group-hover:text-gold"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badgeKey === "enquiries" && newEnquiriesCount > 0 && (
                    <span className="text-[10px] font-bold bg-amber-500 text-forest-900 px-1.5 py-0.2 rounded-full">
                      {newEnquiriesCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Footer Utility Actions */}
          <div className="p-3 border-t border-forest-700/60 space-y-1 bg-forest-950/60">
            {/* View Website */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded text-xs text-gray-300 hover:text-gold hover:bg-forest-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
                <span>View Public Website</span>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-red-300 hover:text-red-200 hover:bg-red-950/50 transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
