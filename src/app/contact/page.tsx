import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE_CONFIG } from "@/data/siteConfig";
import {
  Phone,
  MessageSquare,
  Sparkles,
  Globe,
  Mail,
  ArrowRight,
  ShieldAlert,
  Clock,
  Building,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Sales & Commercial Enquiries",
  description:
    "Get in touch with ATHANG IMPEX. Direct sales communication for pricing and quotations (+91 9923407176) and AI Assistant for company exploration (+1 7111647464).",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/contact`,
  },
};

export default function ContactPage() {
  const salesMsg = encodeURIComponent(SITE_CONFIG.salesWhatsApp.defaultMessage);
  const salesLink = `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${salesMsg}`;

  const aiMsg = encodeURIComponent(SITE_CONFIG.chatbotWhatsApp.defaultMessage);
  const aiLink = `https://wa.me/${SITE_CONFIG.chatbotWhatsApp.cleanNumber}?text=${aiMsg}`;

  return (
    <div className="bg-ivory py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Contact Us" }]} />

        {/* Page Header */}
        <div className="mt-6 mb-14 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
            Connect With Us
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest mt-3 tracking-tight">
            Let's Talk Business
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-light leading-relaxed">
            We provide two clear communication channels to ensure you receive the exact assistance you require. Please select the option that best matches your objective:
          </p>
        </div>

        {/* TWO SEPARATE CONTACT CHANNELS (Mandatory distinction) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* OPTION 1: SALES & BUSINESS ENQUIRIES */}
          <div className="bg-white p-8 rounded-xl border-2 border-forest-600 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-forest text-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl">
              Commercial Desk
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-forest-50 text-forest flex items-center justify-center border border-forest/15">
                <Phone className="w-6 h-6 text-gold" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest">
                  OPTION 1 — SALES & BUSINESS ENQUIRIES
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest mt-1">
                  Direct Sales & Business Enquiries
                </h3>
              </div>

              <p className="text-sm text-charcoal-light leading-relaxed">
                Contact our team for pricing, MOQ, product specifications, packaging, availability, and commercial discussions.
              </p>

              <div className="p-4 bg-forest-50 rounded-lg border border-forest/15">
                <p className="text-xs text-charcoal-muted uppercase tracking-wider font-semibold">
                  Sales WhatsApp Number:
                </p>
                <p className="font-mono text-lg font-bold text-forest mt-0.5">
                  {SITE_CONFIG.salesWhatsApp.number}
                </p>
                <p className="text-[11px] text-charcoal-muted mt-1">
                  Owner & Export Sales Management • Commercial Quotes
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={salesLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Chat With Sales Team</span>
              </a>
            </div>
          </div>

          {/* OPTION 2: COMPANY INFORMATION ASSISTANT */}
          <div className="bg-white p-8 rounded-xl border border-charcoal-border shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold-50 text-charcoal-muted text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl border-b border-l border-gold/30">
              Information Desk
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-dark flex items-center justify-center border border-gold/20">
                <Sparkles className="w-6 h-6 text-gold-dark" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
                  OPTION 2 — COMPANY INFORMATION ASSISTANT
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest mt-1">
                  Explore ATHANG IMPEX
                </h3>
              </div>

              <p className="text-sm text-charcoal-light leading-relaxed">
                Chat with our AI assistant to learn about our company, products, and business capabilities.
              </p>

              <div className="p-4 bg-ivory-50 rounded-lg border border-charcoal-border/70">
                <p className="text-xs text-charcoal-muted uppercase tracking-wider font-semibold">
                  AI Assistant WhatsApp Number:
                </p>
                <p className="font-mono text-lg font-bold text-charcoal mt-0.5">
                  {SITE_CONFIG.chatbotWhatsApp.number}
                </p>
                <p className="text-[11px] text-charcoal-muted mt-1">
                  General Company & Product Overview • Non-Commercial
                </p>
              </div>

              <p className="text-xs text-charcoal-muted italic">
                *The AI chatbot is intended for general company exploration only. It does not provide MOQ commitments or pricing.
              </p>
            </div>

            <div className="pt-6">
              <a
                href={aiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-ivory-100 hover:bg-ivory-200 text-charcoal border border-charcoal-border rounded text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                <span>Explore With AI Assistant</span>
              </a>
            </div>
          </div>
        </div>

        {/* Business Enquiry Form + Company Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Form (7 cols) */}
          <div className="lg:col-span-7">
            <EnquiryForm sourcePage="Contact Page Direct Form" />
          </div>

          {/* Right: Company Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-charcoal-border space-y-5">
              <h3 className="font-serif text-xl font-bold text-forest">
                Company Credentials
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
                    Legal Entity
                  </p>
                  <p className="font-semibold text-charcoal mt-0.5">
                    {SITE_CONFIG.name}
                  </p>
                  <p className="text-xs text-charcoal-muted">
                    {SITE_CONFIG.businessType}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
                    Official Website
                  </p>
                  <a
                    href={SITE_CONFIG.baseUrl}
                    className="font-mono text-sm text-forest hover:text-gold transition-colors"
                  >
                    {SITE_CONFIG.domain}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
                    Email Correspondence
                  </p>
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    className="font-mono text-sm text-forest hover:text-gold transition-colors"
                  >
                    {SITE_CONFIG.contactEmail}
                  </a>
                  <p className="text-[11px] text-charcoal-muted mt-0.5">
                    Configurable via NEXT_PUBLIC_CONTACT_EMAIL environment variable
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
                    Country of Origin
                  </p>
                  <p className="font-semibold text-charcoal mt-0.5">
                    India (Merchant Exporter)
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal-border/70 text-xs text-charcoal-muted leading-relaxed">
                ATHANG IMPEX is committed to responsive business communication with international buyers across time zones in North America, Europe, the Middle East, and Asia.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
