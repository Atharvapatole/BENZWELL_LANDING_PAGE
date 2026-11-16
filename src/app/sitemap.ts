import { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core static pages
  const staticPages = [
    "",
    "/about",
    "/products",
    "/quality-and-sourcing",
    "/export-capabilities",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${SITE_CONFIG.baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route === "/products" ? 0.9 : 0.8,
  }));

  // Dynamic Product Pages
  const productPages = PRODUCTS.map((product) => ({
    url: `${SITE_CONFIG.baseUrl}/products/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...productPages];
}
