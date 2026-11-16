"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Menu,
  Search,
  Plus,
  ExternalLink,
  User,
  ShieldCheck,
  LogOut,
  Bell,
  Command,
  ChevronDown,
} from "lucide-react";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  onOpenCommandPalette: () => void;
}

export default function AdminHeader({
  onToggleSidebar,
  onOpenCommandPalette,
}: AdminHeaderProps) {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{
    email: string;
    role: string;
    full_name: string;
  } | null>(null);

  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data } = await supabase
            .from("admin_users")
            .select("role, full_name, email")
            .eq("id", user.id)
            .single();

          if (data) {
            setAdminUser(data);
          } else {
            setAdminUser({
              email: user.email || "info@athangimpex.in",
              role: "super_admin",
              full_name: "Super Administrator",
            });
          }
        }
      } catch (err) {
        // Fallback default
        setAdminUser({
          email: "info@athangimpex.in",
          role: "super_admin",
          full_name: "Super Administrator",
        });
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin");
      router.refresh();
    } catch {
      router.push("/admin");
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-charcoal-border/70 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left: Mobile hamburger & Global Command Palette Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded text-charcoal hover:text-forest hover:bg-ivory-100 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search / Command Bar Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 bg-ivory-50 hover:bg-ivory-100 border border-charcoal-border/80 rounded-md text-xs text-charcoal-muted transition-colors w-64 md:w-80 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-charcoal-muted" />
            <span>Search admin or press...</span>
          </div>
          <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono bg-white border border-charcoal-border px-1.5 py-0.5 rounded text-charcoal-light shadow-2xs">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right: Quick Action Center + User Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setQuickMenuOpen(!quickMenuOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-gold" />
            <span className="hidden md:inline">Quick Action</span>
            <ChevronDown className="w-3 h-3 text-gold/80" />
          </button>

          {quickMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl border border-charcoal-border py-1.5 text-xs text-charcoal z-50 animate-in fade-in"
              onClick={() => setQuickMenuOpen(false)}
            >
              <Link
                href="/admin/products/new"
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-ivory-100"
              >
                <Plus className="w-3.5 h-3.5 text-forest" />
                <span>Add New Product</span>
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-ivory-100"
              >
                <Plus className="w-3.5 h-3.5 text-forest" />
                <span>Manage Categories</span>
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-ivory-100"
              >
                <Plus className="w-3.5 h-3.5 text-forest" />
                <span>Upload Media</span>
              </Link>
              <Link
                href="/admin/chatbot"
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-ivory-100"
              >
                <Plus className="w-3.5 h-3.5 text-forest" />
                <span>Chatbot Knowledge</span>
              </Link>
              <div className="border-t border-charcoal-border/50 my-1" />
              <Link
                href="/admin/content/homepage"
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-ivory-100 text-charcoal-light"
              >
                <span>Edit Homepage</span>
              </Link>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-charcoal-border/60">
          <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-bold text-xs border border-gold/40">
            {adminUser?.full_name?.charAt(0) || "A"}
          </div>

          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-charcoal line-clamp-1">
              {adminUser?.full_name || "Administrator"}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gold-dark">
              {adminUser?.role?.replace("_", " ") || "Super Admin"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-charcoal-muted hover:text-red-600 rounded hover:bg-red-50 transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
