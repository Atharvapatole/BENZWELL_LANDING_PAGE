import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ivory px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-xl border border-charcoal-border text-center shadow-xs">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
          Page Not Found
        </span>
        <h1 className="font-serif text-5xl font-bold text-forest mt-4">
          404
        </h1>
        <p className="mt-3 text-sm text-charcoal-muted leading-relaxed">
          The export page or product resource you are searching for might have been updated or moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 bg-forest hover:bg-forest-700 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-xs"
          >
            <Home className="w-4 h-4 text-gold" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 bg-ivory-100 hover:bg-ivory-200 text-charcoal border border-charcoal-border text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
