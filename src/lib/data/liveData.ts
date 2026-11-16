import { createClient } from "@/lib/supabase/server";
import { PRODUCTS, Product, ProductSpecification } from "@/data/products";
import { DbProduct, DbWebsiteContent, DbWebsiteSetting } from "@/types/database";

export function mapDbProductToProduct(db: DbProduct): Product {
  const fallback = PRODUCTS.find((p) => p.slug === db.slug);

  let specs: ProductSpecification[] | undefined = db.specifications;
  if (!specs || !Array.isArray(specs) || specs.length === 0) {
    if (
      typeof db.specifications_notes === "string" &&
      db.specifications_notes.trim().startsWith("[")
    ) {
      try {
        specs = JSON.parse(db.specifications_notes);
      } catch {
        specs = fallback?.specifications;
      }
    } else {
      specs = fallback?.specifications;
    }
  }

  return {
    id: db.id,
    slug: db.slug,
    name: db.name,
    tagline: db.tagline || fallback?.tagline || "",
    shortDescription: db.short_description || fallback?.shortDescription || "",
    fullDescription: db.full_description || fallback?.fullDescription || "",
    image: db.image || fallback?.image || "/images/hero/hero-container-ship.jpg",
    galleryImages:
      db.gallery_images && db.gallery_images.length > 0
        ? db.gallery_images
        : fallback?.galleryImages || [db.image || "/images/hero/hero-container-ship.jpg"],
    keyCharacteristics:
      db.key_characteristics && db.key_characteristics.length > 0
        ? db.key_characteristics
        : fallback?.keyCharacteristics || [],
    commonApplications:
      db.common_applications && db.common_applications.length > 0
        ? db.common_applications
        : fallback?.commonApplications || [],
    packagingOptionsGeneric:
      db.packaging_options && db.packaging_options.length > 0
        ? db.packaging_options
        : fallback?.packagingOptionsGeneric || [],
    features:
      db.features && db.features.length > 0
        ? db.features
        : fallback?.features || [],
    specifications: specs || fallback?.specifications || [],
  };
}

export async function getLiveProducts(): Promise<Product[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      return PRODUCTS;
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return PRODUCTS;
    }
    return (data as DbProduct[]).map(mapDbProductToProduct);
  } catch (e) {
    return PRODUCTS;
  }
}

export async function getLiveProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      return PRODUCTS.find((p) => p.slug === slug);
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) {
      return PRODUCTS.find((p) => p.slug === slug);
    }
    return mapDbProductToProduct(data as DbProduct);
  } catch (e) {
    return PRODUCTS.find((p) => p.slug === slug);
  }
}

export async function getLiveWebsiteContent(pageSlug: string): Promise<Record<string, any> | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      return null;
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("website_content")
      .select("content, is_published")
      .or(`section_key.eq.${pageSlug}_data,page_name.eq.${pageSlug}`)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) return null;
    return (data as DbWebsiteContent).content;
  } catch (e) {
    return null;
  }
}

export async function getLiveWebsiteSettings(): Promise<Record<string, any>> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      return {};
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("website_settings")
      .select("key, value");

    if (error || !data) return {};
    const settingsMap: Record<string, any> = {};
    (data as DbWebsiteSetting[]).forEach((item) => {
      settingsMap[item.key] = item.value;
    });
    return settingsMap;
  } catch (e) {
    return {};
  }
}
