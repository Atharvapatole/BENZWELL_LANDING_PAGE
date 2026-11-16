"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { SITE_CONFIG } from "@/data/siteConfig";
import { PRODUCTS } from "@/data/products";
import { ArrowUpRight, Phone, MessageSquare, Globe, ShieldCheck, Mail } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-forest-900 text-ivory border-t border-forest-700/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-forest-700/50">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Logo variant="dark" />
            <p className="text-gray-300 text-sm leading-relaxed max-w-md pt-2">
              ATHANG IMPEX is an Indian merchant exporter focused on sourcing and supplying quality
              dehydrated food ingredients for international food manufacturers, spice blenders, and
              distributors.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold bg-forest-800/80 px-3 py-1.5 rounded border border-gold/30">
                <Globe className="w-3.5 h-3.5" />
                <span>Indian Merchant Exporter</span>
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Official Website:{" "}
              <a
                href={SITE_CONFIG.baseUrl}
                className="text-gold hover:underline font-mono"
              >
                {SITE_CONFIG.domain}
              </a>
            </p>
          </div>

          {/* Col 2: Products (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold">
              Dehydrated Products
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="text-gray-300 hover:text-gold transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{prod.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-gold/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/products"
                  className="text-xs font-semibold uppercase tracking-wider text-gold hover:underline inline-flex items-center gap-1"
                >
                  View All Products &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Governance (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/quality-and-sourcing" className="hover:text-gold transition-colors">
                  Quality & Sourcing
                </Link>
              </li>
              <li>
                <Link href="/export-capabilities" className="hover:text-gold transition-colors">
                  Export Capabilities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Channels (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold">
              Communication
            </h3>

            {/* Sales WhatsApp Box */}
            <div className="p-3 bg-forest-800/80 rounded border border-forest-600/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>Sales / Commercial</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Quotations, MOQs & Orders:
              </p>
              <a
                href={SITE_CONFIG.salesWhatsApp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 text-xs font-semibold text-gold hover:underline"
              >
                {SITE_CONFIG.salesWhatsApp.number}
              </a>
            </div>

            {/* AI Assistant WhatsApp Box */}
            <div className="p-3 bg-forest-800/80 rounded border border-forest-600/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <MessageSquare className="w-3.5 h-3.5 text-gold" />
                <span>AI Assistant (Info)</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Company & Product Exploration:
              </p>
              <a
                href={SITE_CONFIG.chatbotWhatsApp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 text-xs font-medium text-gray-200 hover:text-gold"
              >
                {SITE_CONFIG.chatbotWhatsApp.number}
              </a>
            </div>
          </div>
        </div>

        {/* Middle Note: Commercial Integrity */}
        <div className="py-6 border-b border-forest-700/40 text-xs text-gray-400 leading-relaxed">
          <p>
            <strong className="text-gray-300">Commercial Note:</strong> ATHANG IMPEX operates with full
            transparency as an Indian merchant exporter. Actual product specifications, test analyses,
            minimum order quantities (MOQ), and shipping documents are provided and aligned directly
            with qualified buyers during commercial quotation.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-gold transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gold transition-colors">
              International Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
