import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE_CONFIG } from "@/data/siteConfig";
import {
  Globe2,
  Package,
  Layers,
  FileText,
  Users,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Anchor,
  Plane,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Export Capabilities | Indian Dehydrated Food Ingredients",
  description:
    "Discover ATHANG IMPEX's export capabilities: product sourcing, customized export packaging, documentation coordination, and global buyer communication.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/export-capabilities`,
  },
};

export default function ExportCapabilitiesPage() {
  const salesMsg = encodeURIComponent(
    "Hello ATHANG IMPEX,\n\nI visited your Export Capabilities page and would like to discuss international trade terms and consignment requirements."
  );
  const salesLink = `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${salesMsg}`;

  const capabilities = [
    {
      title: "1. Product Sourcing",
      desc: "Direct access to Indian processing centers with established sorting, cleaning, slicing, and dehydration equipment for onions, tomatoes, and ginger.",
      icon: Layers,
    },
    {
      title: "2. Dehydrated Portfolio",
      desc: "Focused range of high-demand ingredients: Dehydrated Onion Powder, Dehydrated Onion Flakes (kibbled), Dehydrated Tomato Powder, and Dehydrated Ginger Powder.",
      icon: Package,
    },
    {
      title: "3. Packaging Coordination",
      desc: "Flexible packing options including 20kg/25kg multi-wall paper bags, heat-sealed poly liners, corrugated cartons, and palletized containerized consignments.",
      icon: ShieldCheck,
    },
    {
      title: "4. Export Documentation",
      desc: "Coordination of Certificate of Origin, Phytosanitary Certificates, commercial invoices, packing lists, and bill of lading documents per buyer instructions.",
      icon: FileText,
    },
    {
      title: "5. Buyer Communication",
      desc: "Responsive interaction across international time zones with clear commercial clarity regarding FOB/CIF terms, payment arrangements, and sampling.",
      icon: Users,
    },
    {
      title: "6. International Trade Enquiries",
      desc: "Dedicated handling of queries from importers, commodity traders, seasoning blenders, and institutional food manufacturers across the globe.",
      icon: Globe2,
    },
  ];

  return (
    <div className="bg-ivory py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Export Capabilities" }]} />

        {/* Page Header */}
        <div className="mt-6 mb-16 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
            Global Trade Operations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest mt-3 tracking-tight">
            Your Gateway to Indian Food Ingredients
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-light leading-relaxed">
            ATHANG IMPEX works with international buyers seeking dependable sourcing of Indian dehydrated food ingredients. We focus on understanding product specifications, packaging requirements, and export-related business needs.
          </p>
        </div>

        {/* Hero Visual & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16 border-b border-charcoal-border/70">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              Structured International Merchant Exporting
            </h2>
            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
              International B2B food trade demands careful alignment between buyer specifications, Indian processor output, protective packaging, and accurate export documentation.
            </p>
            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
              We coordinate every step of the transaction—from specification validation and packing inspections to export clearance—giving overseas importers a professional, reliable partner in India.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded border border-charcoal-border/80">
                <div className="flex items-center gap-2 text-forest font-semibold text-xs uppercase tracking-wider">
                  <Anchor className="w-4 h-4 text-gold" />
                  <span>Sea Freight</span>
                </div>
                <p className="text-[11px] text-charcoal-muted mt-1">
                  Full container load (FCL) & consolidated shipments from major Indian ports.
                </p>
              </div>

              <div className="p-4 bg-white rounded border border-charcoal-border/80">
                <div className="flex items-center gap-2 text-forest font-semibold text-xs uppercase tracking-wider">
                  <Plane className="w-4 h-4 text-gold" />
                  <span>Air Freight</span>
                </div>
                <p className="text-[11px] text-charcoal-muted mt-1">
                  Expedited air cargo coordination for urgent production schedules and sampling.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-charcoal-border shadow-md bg-forest-900">
              <Image
                src="/images/about/export-logistics.jpg"
                alt="ATHANG IMPEX - Global Export Capabilities and Ocean Shipping"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="py-16 space-y-12 border-b border-charcoal-border/70">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Core Capabilities
            </span>
            <h2 className="font-serif text-3xl font-bold text-forest mt-2">
              Comprehensive Export Services
            </h2>
            <p className="text-sm text-charcoal-muted mt-2">
              Built to simplify procurement of Indian food ingredients for overseas businesses:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg border border-charcoal-border/80 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-forest-50 text-forest flex items-center justify-center border border-forest/10">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-forest">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Enquiry Form Section */}
        <div className="py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
                Direct Inquiry Form
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-2">
                Initiate an Export Enquiry
              </h2>
              <p className="text-sm text-charcoal-muted mt-2 max-w-xl mx-auto">
                Share your product requirements below. Your enquiry will be validated and can be dispatched directly to our Sales Desk via WhatsApp or Email.
              </p>
            </div>

            <EnquiryForm sourcePage="Export Capabilities Page" />
          </div>
        </div>
      </div>
    </div>
  );
}
