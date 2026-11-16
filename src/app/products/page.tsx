import React from "react";
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getLiveProducts } from "@/lib/data/liveData";
import { SITE_CONFIG } from "@/data/siteConfig";
import { Phone, ArrowRight, ShieldCheck, Layers, CheckCircle2 } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Dehydrated Food Products Catalogue",
  description:
    "Explore ATHANG IMPEX's export range of dehydrated onion powder, dehydrated onion flakes, dehydrated tomato powder, and dehydrated ginger powder.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/products`,
  },
};

export default async function ProductsPage() {
  const products = await getLiveProducts();

  const salesMsg = encodeURIComponent(
    "Hello ATHANG IMPEX,\n\nI am reviewing your product catalogue and would like to request product information, specifications, and commercial details."
  );
  const salesLink = `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${salesMsg}`;

  return (
    <div className="bg-ivory py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Products" }]} />

        {/* Page Header */}
        <div className="mt-6 mb-12 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
            Export Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest mt-3 tracking-tight">
            Our Dehydrated Food Products
          </h1>
          <p className="mt-4 text-base text-charcoal-light leading-relaxed">
            Explore our range of dehydrated food ingredients, developed for commercial food applications and international business requirements.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </div>

        {/* Specifications & Commercial Details Overview Banner */}
        <div className="mt-16 bg-white p-8 sm:p-10 rounded-xl border border-charcoal-border/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Commercial Inquiries
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                Specifications & Commercial Details
              </h2>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Product specifications, packaging options, minimum order quantities, and commercial terms can be discussed according to buyer requirements.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-charcoal-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>Custom Export Packing Available</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>Direct Sales Desk Communication</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>International Ocean & Air Freight</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <a
                href={salesLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-forest hover:bg-forest-700 text-white font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Request Product Information</span>
              </a>
              <p className="text-[11px] text-charcoal-muted mt-2">
                Sales Desk: {SITE_CONFIG.salesWhatsApp.number}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
