"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Quality & Sourcing", href: "/quality-and-sourcing" },
  { name: "Export Capabilities", href: "/export-capabilities" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Prevent public header from rendering inside admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-sm py-2.5 border-b border-charcoal-border/50"
            : "bg-ivory/80 backdrop-blur-sm py-4 border-b border-charcoal-border/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-sm ${
                      isActive
                        ? "text-forest font-semibold"
                        : "text-charcoal-light hover:text-forest"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: CTAs */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/products"
                className="text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold px-3.5 py-2.5 rounded transition-colors"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-forest hover:bg-forest-700 text-white px-4 py-2.5 rounded transition-all shadow-sm hover:shadow"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              </Link>
            </div>

            {/* Mobile: Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link
                href="/contact"
                className="text-xs font-semibold uppercase tracking-wider bg-forest text-white px-3 py-2 rounded"
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal hover:text-forest focus:outline-none focus:ring-2 focus:ring-gold rounded"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer Sheet */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-ivory shadow-2xl p-6 lg:hidden flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Drawer Top */}
          <div className="flex items-center justify-between pb-5 border-b border-charcoal-border">
            <Logo showSubtitle={false} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-charcoal hover:text-forest focus:outline-none rounded"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="mt-6 flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between py-3 px-3 rounded text-base ${
                    isActive
                      ? "text-forest font-semibold bg-forest-50 border-l-2 border-gold"
                      : "text-charcoal hover:text-forest hover:bg-forest-50/50"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                </Link>
              );
            })}
          </nav>

          {/* Quick Product Access Links */}
          <div className="mt-6 pt-5 border-t border-charcoal-border/70">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted mb-3 px-3">
              Export Products
            </p>
            <div className="space-y-1">
              <Link
                href="/products/dehydrated-onion-powder"
                className="block py-1.5 px-3 text-sm text-charcoal-light hover:text-forest"
              >
                • Dehydrated Onion Powder
              </Link>
              <Link
                href="/products/dehydrated-onion-flakes"
                className="block py-1.5 px-3 text-sm text-charcoal-light hover:text-forest"
              >
                • Dehydrated Onion Flakes
              </Link>
              <Link
                href="/products/dehydrated-tomato-powder"
                className="block py-1.5 px-3 text-sm text-charcoal-light hover:text-forest"
              >
                • Dehydrated Tomato Powder
              </Link>
              <Link
                href="/products/dehydrated-ginger-powder"
                className="block py-1.5 px-3 text-sm text-charcoal-light hover:text-forest"
              >
                • Dehydrated Ginger Powder
              </Link>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="pt-6 border-t border-charcoal-border space-y-3">
          <a
            href={SITE_CONFIG.salesWhatsApp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-forest text-white rounded text-sm font-semibold tracking-wide hover:bg-forest-700 transition-colors shadow"
          >
            <Phone className="w-4 h-4 text-gold" />
            <span>Sales WhatsApp ({SITE_CONFIG.salesWhatsApp.number})</span>
          </a>

          <a
            href={SITE_CONFIG.chatbotWhatsApp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-charcoal-border text-charcoal rounded text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-gold" />
            <span>AI Information Assistant</span>
          </a>
        </div>
      </div>
    </>
  );
}
