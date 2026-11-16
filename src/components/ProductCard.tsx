import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { SITE_CONFIG } from "@/data/siteConfig";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  // Construct direct sales enquiry link with prefilled product message
  const salesMsg = encodeURIComponent(
    `Hello ATHANG IMPEX,\n\nI visited your website and would like to enquire about ${product.name}.\n\nPlease share product specifications, packaging options, and commercial details.`
  );
  const salesWhatsAppUrl = `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${salesMsg}`;

  return (
    <div className="editorial-card group flex flex-col bg-white rounded-lg border border-charcoal-border/70 overflow-hidden shadow-xs hover:border-gold/80 transition-all duration-300">
      {/* Product Image Frame */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-ivory-100"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-forest/90 backdrop-blur-xs text-gold px-2.5 py-1 rounded">
          Export Grade
        </span>
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-serif text-xl font-bold text-forest group-hover:text-forest-600 transition-colors">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        
        <p className="mt-2.5 text-xs text-charcoal-muted leading-relaxed flex-1 line-clamp-3">
          {product.shortDescription}
        </p>

        {/* Feature Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-charcoal-border/40">
          {product.features.slice(0, 2).map((feat, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium text-charcoal-light bg-ivory-100 px-2 py-0.5 rounded"
            >
              ✓ {feat}
            </span>
          ))}
        </div>

        {/* Card CTAs */}
        <div className="mt-5 pt-4 border-t border-charcoal-border/50 grid grid-cols-2 gap-2">
          {/* Explore Product Button */}
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-forest bg-forest-50 hover:bg-forest-100 rounded transition-colors text-center"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Enquire About Product Button (Opens OWNER WhatsApp) */}
          <a
            href={salesWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-white bg-forest hover:bg-forest-700 rounded transition-colors shadow-xs text-center"
            title="Opens Sales WhatsApp"
          >
            <Phone className="w-3 h-3 text-gold" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
}
