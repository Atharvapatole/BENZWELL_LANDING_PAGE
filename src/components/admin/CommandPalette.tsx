"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
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
  Plus,
  ArrowRight,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMAND_ACTIONS = [
  { name: "Dashboard Overview", href: "/admin/dashboard", icon: Activity, category: "Navigation" },
  { name: "Products Catalog", href: "/admin/products", icon: Package, category: "Navigation" },
  { name: "Create New Product", href: "/admin/products/new", icon: Plus, category: "Actions" },
  { name: "Categories Manager", href: "/admin/categories", icon: FolderTree, category: "Navigation" },
  { name: "Export Enquiries (CRM)", href: "/admin/enquiries", icon: Inbox, category: "Navigation" },
  { name: "Customer Records", href: "/admin/customers", icon: Users, category: "Navigation" },
  { name: "Edit Homepage CMS", href: "/admin/content/homepage", icon: FileEdit, category: "Content" },
  { name: "Edit About Us CMS", href: "/admin/content/about", icon: FileEdit, category: "Content" },
  { name: "Edit Quality & Sourcing CMS", href: "/admin/content/quality", icon: FileEdit, category: "Content" },
  { name: "Edit Export Capabilities CMS", href: "/admin/content/export", icon: FileEdit, category: "Content" },
  { name: "Media Library & Uploads", href: "/admin/media", icon: ImageIcon, category: "Assets" },
  { name: "SEO & Social Sharing Manager", href: "/admin/seo", icon: SearchCheck, category: "Settings" },
  { name: "Chatbot Knowledge Base (+1 7111647464)", href: "/admin/chatbot", icon: Bot, category: "AI Assistant" },
  { name: "Website & WhatsApp Settings", href: "/admin/settings", icon: Settings, category: "Settings" },
  { name: "Admin User Management & Roles", href: "/admin/users", icon: ShieldAlert, category: "Security" },
  { name: "Activity & Audit Logs", href: "/admin/activity", icon: History, category: "Security" },
  { name: "Database & System Health", href: "/admin/system-health", icon: Activity, category: "System" },
];

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(); // toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = COMMAND_ACTIONS.filter(
    (action) =>
      action.name.toLowerCase().includes(query.toLowerCase()) ||
      action.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-charcoal-border overflow-hidden animate-in fade-in zoom-in-95 duration-150 z-10">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-charcoal-border">
          <Search className="w-4 h-4 text-charcoal-muted mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, pages, and actions (e.g. Products, SEO, Enquiries)..."
            className="w-full text-sm bg-transparent outline-none text-charcoal placeholder:text-charcoal-muted"
          />
          <button
            onClick={onClose}
            className="p-1 text-charcoal-muted hover:text-charcoal rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-charcoal-muted">
              No matching commands or pages found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-ivory-100 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-ivory-200 text-forest flex items-center justify-center group-hover:bg-forest group-hover:text-gold transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-charcoal group-hover:text-forest">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-charcoal-muted">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-charcoal-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-ivory-50 border-t border-charcoal-border/70 flex items-center justify-between text-[11px] text-charcoal-muted">
          <span>Navigate with mouse or touch</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-charcoal-border rounded font-mono text-[10px]">
            ESC to close
          </kbd>
        </div>
      </div>
    </div>
  );
}
