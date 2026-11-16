"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, ShieldAlert, Phone, Sparkles, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const salesEncodedMsg = encodeURIComponent(SITE_CONFIG.salesWhatsApp.defaultMessage);
  const salesLink = `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${salesEncodedMsg}`;

  const aiEncodedMsg = encodeURIComponent(SITE_CONFIG.chatbotWhatsApp.defaultMessage);
  const aiLink = `https://wa.me/${SITE_CONFIG.chatbotWhatsApp.cleanNumber}?text=${aiEncodedMsg}`;

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-[340px] sm:w-[380px] bg-white rounded-lg shadow-2xl border border-charcoal-border overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-4">
          {/* Card Header */}
          <div className="bg-forest p-4 text-white flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  ATHANG IMPEX
                </h3>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                Select the right channel for your inquiry
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white p-1 rounded focus:outline-none"
              aria-label="Close WhatsApp options"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Options Container */}
          <div className="p-4 space-y-3.5 bg-ivory-50">
            {/* OPTION 1: SALES & COMMERCIAL */}
            <div className="p-3.5 bg-white rounded-md border border-forest/30 shadow-xs hover:border-forest transition-colors">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-forest bg-forest-50 px-2.5 py-1 rounded">
                  <Phone className="w-3 h-3 text-gold" />
                  <span>Sales & Commercial</span>
                </span>
                <span className="text-[11px] font-mono text-charcoal-muted">
                  +91 9923407176
                </span>
              </div>
              <p className="text-xs text-charcoal mt-2 leading-relaxed">
                Connect directly for <strong>product pricing, MOQ commitments, quotations,</strong> bulk orders, and commercial terms.
              </p>
              <a
                href={salesLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-forest hover:bg-forest-700 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
              >
                <span>Chat with Sales Team</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>

            {/* OPTION 2: AI INFORMATION ASSISTANT */}
            <div className="p-3.5 bg-white rounded-md border border-charcoal-border hover:border-gold transition-colors">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>AI Company Assistant</span>
                </span>
                <span className="text-[11px] font-mono text-charcoal-muted">
                  +1 7111647464
                </span>
              </div>
              <p className="text-xs text-charcoal mt-2 leading-relaxed">
                Explore company capabilities, product information, and export overview.
              </p>
              <p className="text-[10px] text-charcoal-muted mt-1 italic">
                *Does not provide quotes or negotiate commercial terms.
              </p>
              <a
                href={aiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-medium rounded transition-colors"
              >
                <span>Explore With AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5 text-charcoal-muted" />
              </a>
            </div>
          </div>

          {/* Footer note */}
          <div className="p-3 bg-white border-t border-charcoal-border/70 text-[11px] text-charcoal-muted text-center">
            Official Indian Merchant Exporter • WhatsApp Verification
          </div>
        </div>
      )}

      {/* Floating Toggle Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 py-3 px-4 bg-forest hover:bg-forest-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
        aria-label="Open WhatsApp communication options"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
          <MessageCircle className="w-4 h-4 fill-white" />
        </div>
        <span className="text-xs font-semibold tracking-wide pr-1">
          {isOpen ? "Close Options" : "Connect on WhatsApp"}
        </span>
        <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
      </button>
    </div>
  );
}
