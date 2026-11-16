"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import CommandPalette from "@/components/admin/CommandPalette";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [newEnquiriesCount, setNewEnquiriesCount] = useState(0);

  // Fetch new enquiries count for sidebar badge
  useEffect(() => {
    if (isLoginPage) return;

    async function fetchNewEnquiries() {
      try {
        const supabase = createClient();
        const { count, error } = await supabase
          .from("enquiries")
          .select("*", { count: "exact", head: true })
          .eq("status", "new");

        if (!error && typeof count === "number") {
          setNewEnquiriesCount(count);
        }
      } catch {
        // Ignored if table not populated
      }
    }
    fetchNewEnquiries();
  }, [isLoginPage, pathname]);

  // If on login page, don't show the dashboard shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        newEnquiriesCount={newEnquiriesCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <AdminHeader
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
