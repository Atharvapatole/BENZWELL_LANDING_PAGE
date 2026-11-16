import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/data/siteConfig";
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Package,
  Layers,
  ArrowRight,
  Phone,
  FileText,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quality & Sourcing | Food Ingredients Integrity",
  description:
    "Explore ATHANG IMPEX's sourcing approach: supplier coordination, specification alignment, packaging coordination, and transparent buyer communication.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/quality-and-sourcing`,
  },
};

export default function QualityAndSourcingPage() {
  const salesMsg = encodeURIComponent(
    "Hello ATHANG IMPEX,\n\nI reviewed your Quality & Sourcing page and would like to discuss product specifications and quality parameters for dehydrated ingredients."
  );
  const salesLink = `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${salesMsg}`;

  const steps = [
    {
      title: "1. Supplier & Manufacturer Coordination",
      desc: "We work directly with established processing facilities situated in India's prime agricultural belts (Gujarat, Maharashtra, and Central India). Facilities are selected based on processing hygiene, drying infrastructure, and ingredient consistency.",
      icon: Layers,
    },
    {
      title: "2. Product Requirement Discussions",
      desc: "Every food manufacturer or distributor operates with unique culinary applications. We begin with a thorough discussion of the intended recipe, mesh size, rehydration behavior, and sensory standards.",
      icon: CheckCircle2,
    },
    {
      title: "3. Specification Alignment",
      desc: "Prior to order finalization, specifications are confirmed against available processor batches. We ensure clarity on physical color, aroma, particle uniformity, and culinary behavior.",
      icon: ShieldCheck,
    },
    {
      title: "4. Packaging Requirement Coordination",
      desc: "Dehydrated products are hygroscopic. We coordinate export packing using high-barrier multi-wall paper bags, food-grade polyethylene liners, and corrugated export cartons to protect integrity throughout ocean transit.",
      icon: Package,
    },
    {
      title: "5. Documentation Coordination",
      desc: "We coordinate standard export documentation including Certificate of Origin, Commercial Invoice, Packing List, and product-specific supplier analyses tailored to the destination country's import customs.",
      icon: FileCheck2,
    },
    {
      title: "6. Transparent Buyer Communication",
      desc: "Clear, factual, and proactive updates are provided at each milestone from consignment packing to dispatch and container dispatch.",
      icon: FileText,
    },
  ];

  return (
    <div className="bg-ivory py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Quality & Sourcing" }]} />

        {/* Page Header */}
        <div className="mt-6 mb-16 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
            Sourcing Discipline
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest mt-3 tracking-tight">
            Quality Begins with Responsible Sourcing
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-light leading-relaxed">
            As an Indian merchant exporter, ATHANG IMPEX focuses on bridging global food manufacturers with reliable processors across India through meticulous requirement coordination and specification alignment.
          </p>
        </div>

        {/* Feature Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16 border-b border-charcoal-border/70">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              Alignment Over Assumption
            </h2>
            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
              International trade in dehydrated agricultural products demands absolute transparency. Rather than offering generic promises, ATHANG IMPEX works closely with buyers to understand exact culinary application needs and aligns with processor capability.
            </p>
            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
              Actual product specifications, moisture behavior, mesh parameters, and regulatory documentation depend on the specific product, supplier batch, and importing market transaction.
            </p>

            <div className="p-4 bg-white rounded-lg border border-charcoal-border/80 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-xs text-charcoal-muted leading-relaxed">
                <strong className="text-forest">Verified Sourcing Policy:</strong> We do not publish unverified certification logos or generic claims. Verified quality certificates, laboratory tests, and facility audit records are shared on an inquiry-specific basis according to actual buyer and consignment requirements.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-charcoal-border shadow-md bg-forest">
              <Image
                src="/images/about/quality-inspection.jpg"
                alt="ATHANG IMPEX - Quality Specification & Alignment"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Sourcing & Quality Process (6 Steps) */}
        <div className="py-16 space-y-12 border-b border-charcoal-border/70">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Step-by-Step Workflow
            </span>
            <h2 className="font-serif text-3xl font-bold text-forest mt-2">
              Our Sourcing & Verification Workflow
            </h2>
            <p className="text-sm text-charcoal-muted mt-2">
              How ATHANG IMPEX safeguards consistency from Indian fields to global ports:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((st, i) => {
              const Icon = st.icon;
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
                      {st.title}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated Verified Certifications Section (Prepared for Real Documents) */}
        <div className="py-16">
          <div className="bg-white p-8 sm:p-10 rounded-xl border border-charcoal-border/80">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
                Documentation Standards
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                Certifications & Compliance Documentation
              </h2>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Depending on destination country regulations (such as FSSAI, US FDA registration, Phytosanitary certification, or specific food safety test certificates), ATHANG IMPEX coordinates transaction-specific documentation alongside each consignment.
              </p>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                As real export transactions are initiated, relevant certificates and batch test results will be verified and made available to authorized buyers.
              </p>

              <div className="pt-4">
                <a
                  href={salesLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-forest hover:bg-forest-700 text-white font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  <span>Request Documentation Details ({SITE_CONFIG.salesWhatsApp.number})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
