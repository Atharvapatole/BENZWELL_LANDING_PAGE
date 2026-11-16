import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLiveProducts, getLiveWebsiteContent } from "@/lib/data/liveData";
import { SITE_CONFIG } from "@/data/siteConfig";
import ProductCard from "@/components/ProductCard";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  MessageSquare,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Sparkles,
  Layers,
  Scale,
  Users,
  MessageCircle,
  Package,
  FileCheck,
  Building2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, cmsContent] = await Promise.all([
    getLiveProducts(),
    getLiveWebsiteContent("homepage"),
  ]);

  const heroHeading =
    cmsContent?.heroHeading ||
    cmsContent?.hero_heading ||
    "Quality Food Ingredients. Connecting India to the World.";
  const heroSubtitle =
    cmsContent?.heroSubtitle ||
    cmsContent?.hero_paragraph ||
    cmsContent?.hero_subtitle ||
    "ATHANG IMPEX is an Indian merchant export company focused on sourcing and supplying quality dehydrated food ingredients for international buyers and businesses.";
  const heroTrustLabel =
    cmsContent?.heroTrustLabel ||
    cmsContent?.hero_trust_label ||
    "Indian Food Ingredients Exporter";
  const heroPrimaryCtaText =
    cmsContent?.heroPrimaryCtaText ||
    cmsContent?.hero_primary_cta_text ||
    "Explore Our Products";
  const heroPrimaryCtaLink =
    cmsContent?.heroPrimaryCtaLink ||
    cmsContent?.hero_primary_cta_link ||
    "/products";
  const heroSecondaryCtaText =
    cmsContent?.heroSecondaryCtaText ||
    cmsContent?.hero_secondary_cta_text ||
    "Discuss Your Requirements";
  const heroSecondaryCtaLink =
    cmsContent?.heroSecondaryCtaLink ||
    cmsContent?.hero_secondary_cta_link ||
    "/contact";
  const heroImage =
    cmsContent?.heroImage ||
    cmsContent?.hero_image ||
    "/images/hero/hero-container-ship.jpg";

  const introHeading =
    cmsContent?.introHeading ||
    cmsContent?.intro_heading ||
    "Your Partner in Food Ingredient Exports";
  const introBody =
    cmsContent?.introBody ||
    cmsContent?.intro_body ||
    "At ATHANG IMPEX, we connect global businesses with quality Indian food ingredients. Our focus is on sourcing, product consistency, professional communication, and building long-term international business relationships.";

  const productsBadge = cmsContent?.productsBadge || "Product Portfolio";
  const productsHeading = cmsContent?.productsHeading || "Our Product Range";
  const productsSubtitle =
    cmsContent?.productsSubtitle ||
    "Explore our selection of dehydrated food ingredients.";

  const whyChooseBadge = cmsContent?.whyChooseBadge || "Core Principles";
  const whyChooseHeading =
    cmsContent?.whyChooseHeading || "Built Around Quality. Driven by Trust.";
  const whyChooseSubtitle =
    cmsContent?.whyChooseSubtitle ||
    "We operate as a committed merchant exporter focused on transparency, diligence, and long-term trading relationships.";

  const appsBadge = cmsContent?.appsBadge || "Versatile Uses";
  const appsHeading =
    cmsContent?.appsHeading || "Ingredients for Multiple Industries";
  const appsSubtitle =
    cmsContent?.appsSubtitle ||
    "Dehydrated onion, tomato, and ginger powders and flakes are essential across modern industrial and culinary formulations.";

  const exportBadge = cmsContent?.exportBadge || "Global Trade Coordination";
  const exportHeading =
    cmsContent?.exportHeading ||
    "Connecting Quality Products with Global Markets";
  const exportSubtitle =
    cmsContent?.exportSubtitle ||
    "ATHANG IMPEX works with international buyers seeking dependable sourcing of Indian dehydrated food ingredients. We focus on understanding product specifications, packaging requirements, and export-related business needs.";

  const bannerHeading =
    cmsContent?.bannerHeading ||
    cmsContent?.banner_heading ||
    "Looking for a Reliable Food Ingredient Export Partner?";
  const bannerBody =
    cmsContent?.bannerBody ||
    cmsContent?.banner_body ||
    "Tell us about your product requirements and our team will connect with you.";

  const chatbotHeading =
    cmsContent?.chatbotHeading ||
    cmsContent?.chatbot_heading ||
    "Want to Know More About ATHANG IMPEX?";
  const chatbotBody =
    cmsContent?.chatbotBody ||
    cmsContent?.chatbot_body ||
    "Meet our AI-powered company assistant. Explore our company, understand our products, and discover our business capabilities through a simple WhatsApp conversation.";

  const finalCtaHeading =
    cmsContent?.finalCtaHeading ||
    cmsContent?.final_cta_heading ||
    "Let's Build a Stronger Business Connection.";
  const finalCtaBody =
    cmsContent?.finalCtaBody ||
    cmsContent?.final_cta_body ||
    "Connect with ATHANG IMPEX to discuss your food ingredient sourcing requirements.";

  const salesMsg = encodeURIComponent(SITE_CONFIG.salesWhatsApp.defaultMessage);
  const salesLink = `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${salesMsg}`;

  const chatbotMsg = encodeURIComponent(SITE_CONFIG.chatbotWhatsApp.defaultMessage);
  const chatbotLink = `https://wa.me/${SITE_CONFIG.chatbotWhatsApp.cleanNumber}?text=${chatbotMsg}`;

  const industries = [
    {
      title: "Food Processing",
      desc: "Base ingredients for large-scale canned, packaged, and prepared food recipes.",
      image: "/images/industries/food-processing.svg",
    },
    {
      title: "Seasoning Manufacturing",
      desc: "Uniformly dehydrated powders for chips, extruded snacks, and topical rubs.",
      image: "/images/industries/seasoning.svg",
    },
    {
      title: "Spice Blending",
      desc: "Essential aromatic components for commercial curry powders, masalas, and barbecue rubs.",
      image: "/images/industries/spice-blends.svg",
    },
    {
      title: "Sauce Manufacturing",
      desc: "Soluble concentrates for marinades, dips, tomato bases, and dressings.",
      image: "/images/industries/sauces.svg",
    },
    {
      title: "Instant Food Production",
      desc: "Rapid rehydration flakes and flavor bases for noodles, bouillons, and soup premixes.",
      image: "/images/industries/instant-foods.svg",
    },
    {
      title: "Commercial Food Preparation",
      desc: "Reliable bulk culinary supplies for institutional catering and restaurant central kitchens.",
      image: "/images/industries/commercial-culinary.svg",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* SECTION A: HERO */}
      <section className="relative bg-forest text-ivory overflow-hidden min-h-[85vh] lg:min-h-[90vh] flex items-center">
        {/* Editorial Background Art with Real Maritime Container Ship Photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="ATHANG IMPEX - Indian Food Ingredients Exporter & Maritime Cargo Logistics"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 mix-blend-luminosity scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/90 to-forest/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/40" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            {/* Subtle Trust Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-700/80 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span>{heroTrustLabel}</span>
            </div>

            {/* Hero Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] whitespace-pre-line">
              {heroHeading}
            </h1>

            {/* Supporting Paragraph */}
            <p className="mt-6 text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl font-sans">
              {heroSubtitle}
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={heroPrimaryCtaLink}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold hover:bg-gold-light text-forest-900 font-semibold text-sm tracking-wide uppercase rounded transition-all shadow-md hover:shadow-lg"
              >
                <span>{heroPrimaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-forest-900" />
              </Link>

              <Link
                href={heroSecondaryCtaLink}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-forest-800/80 hover:bg-forest-700 text-white border border-ivory/20 font-semibold text-sm tracking-wide uppercase rounded transition-all backdrop-blur-xs"
              >
                <span>{heroSecondaryCtaText}</span>
                <ArrowUpRight className="w-4 h-4 text-gold" />
              </Link>
            </div>

            {/* Subtle Credibility Badges */}
            <div className="mt-12 pt-8 border-t border-forest-600/60 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-gray-300">
              <div>
                <p className="font-semibold text-white">Merchant Exporter</p>
                <p className="text-gray-400 mt-0.5">India to Global Ports</p>
              </div>
              <div>
                <p className="font-semibold text-white">Dehydrated Range</p>
                <p className="text-gray-400 mt-0.5">Onion, Tomato, Ginger</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-semibold text-white">B2B Focused</p>
                <p className="text-gray-400 mt-0.5">Transparent & Responsive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: COMPANY INTRODUCTION */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Left (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-lg overflow-hidden border border-charcoal-border shadow-md bg-forest">
                <Image
                  src="/images/about/sourcing-agriculture.jpg"
                  alt="ATHANG IMPEX - Sourcing Indian agricultural ingredients"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              {/* Floating Decorative Label */}
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-forest text-white p-5 rounded-lg border border-gold/40 shadow-xl max-w-xs">
                <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                  Merchant Exporting
                </p>
                <p className="text-xs text-gray-200 mt-1 leading-snug">
                  Aligning Indian processing strengths with international culinary & manufacturing requirements.
                </p>
              </div>
            </div>

            {/* Text Right (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
                <span>Who We Are</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold text-forest leading-tight">
                {introHeading}
              </h2>

              <p className="text-base text-charcoal-light leading-relaxed whitespace-pre-line">
                {introBody}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded border border-charcoal-border/70">
                  <h4 className="font-semibold text-sm text-forest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Product Consistency</span>
                  </h4>
                  <p className="text-xs text-charcoal-muted mt-1 leading-normal">
                    Careful supplier alignment according to buyer specification parameters.
                  </p>
                </div>

                <div className="p-4 bg-white rounded border border-charcoal-border/70">
                  <h4 className="font-semibold text-sm text-forest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Professional Communication</span>
                  </h4>
                  <p className="text-xs text-charcoal-muted mt-1 leading-normal">
                    Responsive, direct coordination on documentation, packing, and shipment terms.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold border-b-2 border-forest hover:border-gold pb-1 transition-all"
                >
                  <span>Learn More About Our Company</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: FEATURED PRODUCTS */}
      <section className="py-20 lg:py-28 bg-white border-y border-charcoal-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                {productsBadge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-1.5">
                {productsHeading}
              </h2>
              <p className="text-sm text-charcoal-muted mt-2 max-w-xl">
                {productsSubtitle}
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold transition-colors"
              >
                <span>View Complete Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4 Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: WHY CHOOSE ATHANG IMPEX? */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              {whyChooseBadge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-2">
              {whyChooseHeading}
            </h2>
            <p className="text-sm text-charcoal-muted mt-3">
              {whyChooseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Block 1 */}
            <div className="bg-white p-6 rounded-lg border border-charcoal-border/70 hover:border-gold/60 transition-all shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-full bg-forest-50 text-forest flex items-center justify-center mb-5 border border-forest/10">
                <ShieldCheck className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest mb-2">
                Quality-Focused Sourcing
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed flex-1">
                We focus on sourcing food ingredients from manufacturers and suppliers with attention to product specifications and consistency.
              </p>
            </div>

            {/* Block 2 */}
            <div className="bg-white p-6 rounded-lg border border-charcoal-border/70 hover:border-gold/60 transition-all shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-full bg-forest-50 text-forest flex items-center justify-center mb-5 border border-forest/10">
                <Layers className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest mb-2">
                Product-Focused Expertise
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed flex-1">
                Our product portfolio focuses on dehydrated food ingredients for a wide range of commercial applications.
              </p>
            </div>

            {/* Block 3 */}
            <div className="bg-white p-6 rounded-lg border border-charcoal-border/70 hover:border-gold/60 transition-all shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-full bg-forest-50 text-forest flex items-center justify-center mb-5 border border-forest/10">
                <Globe2 className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest mb-2">
                International Business Approach
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed flex-1">
                We aim to establish professional relationships with importers, distributors, wholesalers, and food manufacturers.
              </p>
            </div>

            {/* Block 4 */}
            <div className="bg-white p-6 rounded-lg border border-charcoal-border/70 hover:border-gold/60 transition-all shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-full bg-forest-50 text-forest flex items-center justify-center mb-5 border border-forest/10">
                <Users className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest mb-2">
                Customer-Centric Communication
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed flex-1">
                We believe in clear communication, responsive support, and understanding buyer requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: APPLICATIONS & INDUSTRIES */}
      <section className="py-20 lg:py-28 bg-white border-t border-charcoal-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              {appsBadge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-2">
              {appsHeading}
            </h2>
            <p className="text-sm text-charcoal-muted mt-3">
              {appsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="group relative rounded-lg overflow-hidden border border-charcoal-border/70 bg-forest text-white shadow-xs hover:shadow-md transition-all"
              >
                <div className="relative aspect-[16/10] w-full bg-forest-900">
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/60 to-transparent" />
                </div>
                <div className="p-5 relative -mt-10 bg-forest-900/90 backdrop-blur-xs mx-3 mb-3 rounded border border-forest-700/60">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION F: EXPORT CAPABILITIES */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Left (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
                {exportBadge}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight">
                {exportHeading}
              </h2>

              <p className="text-base text-charcoal-light leading-relaxed">
                {exportSubtitle}
              </p>

              {/* 5 Capability Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-forest">Product Sourcing</h4>
                    <p className="text-xs text-charcoal-muted">Targeted sourcing of sound Indian field harvests and dehydrated processors.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-forest">Buyer Requirement Coordination</h4>
                    <p className="text-xs text-charcoal-muted">Aligning mesh sizing, sensory parameters, and volume expectations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-forest">Packaging Discussions</h4>
                    <p className="text-xs text-charcoal-muted">Options for moisture-barrier kraft paper bags, corrugated cartons, or customized liners.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-forest">Export Documentation Coordination</h4>
                    <p className="text-xs text-charcoal-muted">Coordination of commercial invoices, packing lists, and regulatory paperwork.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-forest">International Business Communication</h4>
                    <p className="text-xs text-charcoal-muted">Professional, English-fluent commercial dialogue tailored for global importers.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/export-capabilities"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-forest hover:bg-forest-700 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
                >
                  <span>Discuss Your Export Requirements</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </Link>
              </div>
            </div>

            {/* Visual Right (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-charcoal-border shadow-md bg-forest-900">
                <Image
                  src="/images/about/export-logistics.jpg"
                  alt="ATHANG IMPEX - Global Export Capabilities and Shipping Coordination"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: BUSINESS ENQUIRY BANNER (Dark Green Full-Width CTA) */}
      <section className="py-16 lg:py-20 bg-forest text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-forest-800 px-3 py-1 rounded border border-gold/30">
            Direct Commercial Line
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold mt-4 text-white leading-tight">
            {bannerHeading}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {bannerBody}
          </p>

          <div className="mt-8">
            <a
              href="https://wa.me/919923407176"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-forest-900 font-bold text-sm uppercase tracking-wider rounded transition-all shadow-lg hover:shadow-xl"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Our Sales Team</span>
            </a>
            <p className="text-xs text-gray-400 mt-3 font-mono">
              Direct Sales WhatsApp: +91 9923407176
            </p>
          </div>
        </div>
      </section>

      {/* SECTION H: CHATBOT PROMOTION (Visually distinct AI assistant section) */}
      <section className="py-16 lg:py-20 bg-ivory-100 border-b border-charcoal-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 bg-white rounded-xl border border-gold/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-forest bg-gold-100 px-3 py-1 rounded border border-gold/40">
                <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                <span>ATHANG IMPEX AI ASSISTANT</span>
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                {chatbotHeading}
              </h3>

              <p className="text-sm text-charcoal-light leading-relaxed">
                {chatbotBody}
              </p>

              <p className="text-xs text-charcoal-muted italic">
                *Note: The AI assistant is designed for general information and product exploration. For formal quotations, minimum order quantities (MOQ), and commercial negotiations, please connect directly with our Sales Team.
              </p>
            </div>

            <div className="flex-shrink-0 text-center w-full md:w-auto">
              <a
                href="https://wa.me/17111647464"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-forest-800 hover:bg-forest text-white font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-md hover:shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                <span>Chat With Our AI Assistant</span>
              </a>
              <p className="text-[11px] text-charcoal-muted mt-2 font-mono">
                AI WhatsApp: +1 7111647464
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION I: FINAL CTA */}
      <section className="py-20 lg:py-24 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            {finalCtaHeading}
          </h2>
          
          <p className="text-base text-charcoal-light max-w-2xl mx-auto leading-relaxed">
            {finalCtaBody}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={salesLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-forest hover:bg-forest-700 text-white font-semibold text-sm uppercase tracking-wider rounded transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Contact Sales</span>
            </a>

            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-ivory-50 text-forest border border-charcoal-border font-semibold text-sm uppercase tracking-wider rounded transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 text-forest" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
