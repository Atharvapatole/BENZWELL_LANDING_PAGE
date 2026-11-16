import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showSubtitle?: boolean;
}

export default function Logo({
  className = "",
  variant = "light",
  showSubtitle = true,
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm ${className}`}
      aria-label="ATHANG IMPEX - Food Ingredients Exporter"
    >
      {/* Brand Emblem */}
      <div className="relative flex-shrink-0 w-11 h-11 rounded-full bg-forest border border-gold/70 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 100 100"
          className="w-8 h-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Inner circle accent */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#C6A15B"
            strokeWidth="1.2"
            strokeDasharray="3 2"
            opacity="0.6"
          />
          {/* Globe coordinates */}
          <ellipse
            cx="50"
            cy="50"
            rx="36"
            ry="16"
            stroke="#C6A15B"
            strokeWidth="1"
            opacity="0.4"
            transform="rotate(-25 50 50)"
          />
          {/* Stylized Grain / Ingredient Leaf */}
          <path
            d="M50 20 C62 34 68 54 50 78 C32 54 38 34 50 20 Z"
            fill="#C6A15B"
          />
          {/* Leaf vein */}
          <path
            d="M50 24 L50 74"
            stroke="#123D2A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M50 42 Q58 45 62 49"
            stroke="#123D2A"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M50 52 Q42 55 38 59"
            stroke="#123D2A"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="50" cy="83" r="2.5" fill="#E5C77A" />
        </svg>
      </div>

      {/* Wordmark & Subtitle */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-serif text-xl sm:text-2xl font-bold tracking-wider ${
              isLight ? "text-forest" : "text-white"
            }`}
          >
            ATHANG
          </span>
          <span className="font-serif text-xl sm:text-2xl font-normal tracking-wider text-gold">
            IMPEX
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] uppercase mt-1 ${
              isLight ? "text-charcoal-muted" : "text-gray-300"
            }`}
          >
            Food Ingredients Exporter
          </span>
        )}
      </div>
    </Link>
  );
}
