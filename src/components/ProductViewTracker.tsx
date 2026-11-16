"use client";

import { useEffect } from "react";

export default function ProductViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;
    try {
      fetch(`/api/products/${slug}/view`, { method: "POST" }).catch(() => {});
    } catch (e) {
      // ignore silently
    }
  }, [slug]);

  return null;
}
