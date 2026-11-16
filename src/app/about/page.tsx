import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/data/siteConfig";
import {
  Globe2,
  CheckCircle2,
  Target,
  Compass,
  Handshake,
  ShieldCheck,
  ArrowRight,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Indian Merchant Exporter",
  description:
    "Learn about ATHANG IMPEX, an India-based merchant export company focused on sourcing and exporting quality dehydrated food ingredients worldwide.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/about`,
  },
};

export default function AboutPage() {
  const salesMsg = encodeURIComponent(
    "Hello ATHANG IMPEX,\n\nI reviewed your About page and would like to connect regarding food ingredient sourcing and export cooperation."
  );
  const salesLink = `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${salesMsg}`;

  return (
    <div className="bg-ivory py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "About Us" }]} />

        {/* Hero Banner */}
        <div className="mt-6 mb-16 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
            Company Overview
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest mt-3 tracking-tight">
            About ATHANG IMPEX
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-light leading-relaxed">
            ATHANG IMPEX is an India-based merchant export company focused on connecting quality food ingredients with businesses around the world.
          </p>
        </div>

        {/* Core Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16 border-b border-charcoal-border/70">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              Who We Are & What We Do
            </h2>

            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
              Our business approach is built around product sourcing, understanding buyer requirements, professional communication, and developing long-term relationships.
            </p>

            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
              With a focus on dehydrated food ingredients, we aim to make sourcing from India a professional and straightforward experience for international buyers.
            </p>

            <div className="p-5 bg-white rounded-lg border-l-4 border-gold shadow-xs space-y-2">
              <h4 className="font-serif text-base font-bold text-forest">
                Positioning Statement
              </h4>
              <p className="text-sm text-charcoal italic">
                "{SITE_CONFIG.tagline}"
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-charcoal-border shadow-md bg-forest">
              <Image
                src="/images/about/sourcing-agriculture.jpg"
                alt="ATHANG IMPEX - Indian Agricultural Sourcing"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-charcoal-border/70">
          {/* Vision */}
          <div className="bg-white p-8 rounded-xl border border-charcoal-border/70 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-forest-50 text-forest flex items-center justify-center border border-forest/10">
                <Compass className="w-6 h-6 text-gold" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Our Long-Term Horizon
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest">
                Our Vision
              </h3>
              <p className="text-base text-charcoal leading-relaxed font-medium">
                "To establish ATHANG IMPEX as a trusted name in international food ingredient trading."
              </p>
            </div>
            <p className="text-xs text-charcoal-muted mt-6 pt-4 border-t border-charcoal-border/40">
              Anchored on steady supplier alignment and dependable export practices.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-xl border border-charcoal-border/70 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-forest-50 text-forest flex items-center justify-center border border-forest/10">
                <Target className="w-6 h-6 text-gold" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Our Everyday Focus
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest">
                Our Mission
              </h3>
              <p className="text-base text-charcoal leading-relaxed font-medium">
                "To connect businesses with quality food ingredients through responsible sourcing, professional communication, and customer-focused business relationships."
              </p>
            </div>
            <p className="text-xs text-charcoal-muted mt-6 pt-4 border-t border-charcoal-border/40">
              Delivering clarity on specifications, packaging, and commercial terms.
            </p>
          </div>
        </div>

        {/* Business Approach & Commitment */}
        <div className="py-16 space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Working Principles
            </span>
            <h2 className="font-serif text-3xl font-bold text-forest mt-2">
              Our Business Approach & Commitment
            </h2>
            <p className="text-sm text-charcoal-muted mt-2">
              How we coordinate each stage of the merchant export journey:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-charcoal-border/70 space-y-3">
              <h4 className="font-serif text-lg font-bold text-forest flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Responsible Sourcing</span>
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Partnering with verified processors in key Indian agricultural clusters with rigorous review of ingredient soundess and processing hygiene.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-charcoal-border/70 space-y-3">
              <h4 className="font-serif text-lg font-bold text-forest flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Specification Discipline</span>
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Clear alignment on physical attributes, mesh particle sizes, reconstitution properties, and packaging standards prior to quotation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-charcoal-border/70 space-y-3">
              <h4 className="font-serif text-lg font-bold text-forest flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Responsive Execution</span>
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Maintaining prompt, transparent communication through dedicated sales desks and transparent transaction coordination.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Contact CTA */}
        <div className="bg-forest text-white p-8 sm:p-12 rounded-xl text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Connect With Our Management
          </h3>
          <p className="text-sm text-gray-200 max-w-xl mx-auto">
            Discuss your market requirements or initiate a dialogue regarding Indian food ingredients with ATHANG IMPEX.
          </p>
          <div className="pt-2">
            <a
              href={salesLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold hover:bg-gold-light text-forest-900 font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Sales ({SITE_CONFIG.salesWhatsApp.number})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
