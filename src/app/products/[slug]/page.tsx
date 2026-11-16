import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { getLiveProductBySlug, getLiveProducts } from "@/lib/data/liveData";
import { SITE_CONFIG } from "@/data/siteConfig";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import EnquiryForm from "@/components/EnquiryForm";
import ProductViewTracker from "@/components/ProductViewTracker";
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  Info,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = (await getLiveProductBySlug(params.slug)) || getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: `${product.name} | Indian Food Ingredients Exporter`,
    description: `${product.shortDescription} ATHANG IMPEX exports ${product.name} to international food manufacturers and distributors.`,
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ATHANG IMPEX`,
      description: product.shortDescription,
      url: `${SITE_CONFIG.baseUrl}/products/${product.slug}`,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = (await getLiveProductBySlug(params.slug)) || getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getLiveProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug).slice(0, 3);

  // Construct direct sales WhatsApp message
  const salesMsg = encodeURIComponent(
    `Hello ATHANG IMPEX,\n\nI visited your website and would like to request product information, specifications, and commercial details for ${product.name}.`
  );
  const salesWhatsAppUrl = `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${salesMsg}`;

  // Schema.org Product structured data
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: `${SITE_CONFIG.baseUrl}${product.image}`,
    description: product.fullDescription,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      price: "Contact for Quotation",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
    },
  };

  return (
    <div className="bg-ivory py-10 sm:py-16">
      <ProductViewTracker slug={product.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: product.name },
          ]}
        />

        {/* Product Overview Section */}
        <div className="mt-8 bg-white rounded-xl border border-charcoal-border/70 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-6 sm:p-10 lg:p-12 items-start">
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-charcoal-border bg-ivory-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 text-xs font-bold tracking-widest uppercase bg-forest text-gold px-3 py-1 rounded shadow-xs">
                  Export Grade
                </span>
              </div>

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {product.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] rounded border border-charcoal-border/70 overflow-hidden bg-ivory-50"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} visual ${i + 1}`}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Information Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
                  Dehydrated Ingredients
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-2">
                  {product.name}
                </h1>
                <p className="mt-2 text-sm text-gold-dark font-medium italic">
                  {product.tagline}
                </p>
              </div>

              <div className="prose prose-sm text-charcoal-light leading-relaxed">
                <p>{product.fullDescription}</p>
              </div>

              {/* Quick Feature Badges */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-charcoal-border/50">
                {product.features.map((feat, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-forest bg-forest-50 px-3 py-1 rounded border border-forest/10"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>

              {/* Primary Call to Action */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={salesWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-forest hover:bg-forest-700 text-white font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-md"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  <span>Request Product Information</span>
                </a>

                <a
                  href="#enquiry-section"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-white hover:bg-ivory-50 text-forest border border-charcoal-border font-semibold text-xs uppercase tracking-wider rounded transition-all"
                >
                  <span>Submit Inquiry Form</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <p className="text-[11px] text-charcoal-muted font-mono">
                Direct Sales WhatsApp: {SITE_CONFIG.salesWhatsApp.number}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Key Characteristics & Common Applications */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Characteristics */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-charcoal-border/70 shadow-xs space-y-4">
            <h3 className="font-serif text-2xl font-bold text-forest flex items-center gap-2">
              <Layers className="w-5 h-5 text-gold" />
              <span>Key Characteristics</span>
            </h3>
            <p className="text-xs text-charcoal-muted">
              Standard commercial attributes inherent to our sourced dehydrated ingredient:
            </p>
            <ul className="space-y-3 pt-2">
              {product.keyCharacteristics.map((char, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{char}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Applications */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-charcoal-border/70 shadow-xs space-y-4">
            <h3 className="font-serif text-2xl font-bold text-forest flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span>Common Applications</span>
            </h3>
            <p className="text-xs text-charcoal-muted">
              Formulated for global commercial and industrial food production sectors:
            </p>
            <ul className="space-y-3 pt-2">
              {product.commonApplications.map((app, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SECTION: Professional Technical Product Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mt-14 bg-white rounded-xl border border-charcoal-border/80 shadow-xs overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-charcoal-border/60 bg-stone-50/40">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Technical Data Sheet
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1">
                Product Specifications
              </h2>
              <p className="mt-2 text-sm text-charcoal-muted max-w-2xl">
                Explore the general product characteristics and specifications of our dehydrated food ingredients.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-forest-900 text-ivory text-xs uppercase tracking-wider">
                    <th scope="col" className="py-3.5 px-6 font-semibold w-1/3">
                      Parameter
                    </th>
                    <th scope="col" className="py-3.5 px-6 font-semibold w-2/3">
                      Specification
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-border/40">
                  {product.specifications.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        idx % 2 === 0
                          ? "bg-white"
                          : "bg-stone-50/60 hover:bg-stone-100/40 transition-colors"
                      }
                    >
                      <td className="py-3.5 px-6 font-medium text-forest-900 whitespace-nowrap sm:whitespace-normal">
                        {row.parameter}
                      </td>
                      <td className="py-3.5 px-6 text-charcoal leading-relaxed">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-stone-50/60 border-t border-charcoal-border/40 text-[11px] text-charcoal-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>
                * Custom parameters, cut sizes, and tailored packaging available upon buyer request.
              </span>
              <span className="font-mono text-stone-400">
                ATHANG IMPEX Technical Export Portfolio
              </span>
            </div>
          </div>
        )}

        {/* SECTION: Specifications & Commercial Details (Mandatory exact section) */}
        <div className="mt-12 bg-white p-8 sm:p-10 rounded-xl border-2 border-forest-100 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
              Commercial Governance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              Specifications & Commercial Details
            </h2>
            <p className="text-base text-charcoal leading-relaxed font-medium">
              Product specifications, packaging options, minimum order quantities, and commercial terms can be discussed according to buyer requirements.
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-forest mb-2">
                Typical Packaging Coordination:
              </h4>
              <ul className="space-y-1.5 text-xs text-charcoal-muted">
                {product.packagingOptionsGeneric.map((pkg, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{pkg}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <a
                href={salesWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest hover:bg-forest-700 text-white font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Request Product Information</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION: Dedicated Enquiry Form for this product */}
        <div id="enquiry-section" className="mt-14 scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <EnquiryForm
              defaultProduct={product.name}
              sourcePage={`Product Detail: ${product.name}`}
            />
          </div>
        </div>

        {/* SECTION: Related Products */}
        <div className="mt-20 pt-12 border-t border-charcoal-border/70">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Additional Ingredients
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest mt-1">
                Explore Related Products
              </h3>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold transition-colors inline-flex items-center gap-1"
            >
              <span>All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
