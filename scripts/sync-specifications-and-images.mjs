import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export const VERIFIED_SPECIFICATIONS = {
  "dehydrated-onion-flakes": [
    { parameter: "Product Name", value: "Dehydrated Onion Flakes" },
    { parameter: "Botanical Name", value: "Allium cepa" },
    { parameter: "Origin", value: "India" },
    { parameter: "Form", value: "Flakes" },
    { parameter: "Color", value: "White to Off-White / Light Cream" },
    { parameter: "Taste", value: "Typical Fresh Onion Taste" },
    { parameter: "Aroma", value: "Strong Characteristic Onion Aroma" },
    { parameter: "Flake Size", value: "8–25 mm (Custom Sizes Available)" },
    { parameter: "Moisture", value: "Maximum 6%" },
    { parameter: "Total Ash", value: "Maximum 4%" },
    { parameter: "Acid Insoluble Ash", value: "Maximum 0.5%" },
    { parameter: "Foreign Matter", value: "Nil" },
    { parameter: "Extraneous Matter", value: "Nil" },
    { parameter: "Purity", value: "100% Natural" },
    { parameter: "Additives", value: "None" },
    { parameter: "GMO Status", value: "Non-GMO" },
    { parameter: "Shelf Life", value: "24 Months" },
    { parameter: "Storage", value: "Store in a Cool, Dry & Hygienic Place" },
  ],
  "dehydrated-onion-powder": [
    { parameter: "Product Name", value: "Dehydrated Onion Powder" },
    { parameter: "Botanical Name", value: "Allium cepa" },
    { parameter: "Origin", value: "India" },
    { parameter: "Form", value: "Fine Free-Flowing Powder" },
    { parameter: "Color", value: "Off-White to Pale Cream" },
    { parameter: "Taste", value: "Characteristic Pungent Onion Flavor" },
    { parameter: "Aroma", value: "Strong Characteristic Savory Onion Aroma" },
    { parameter: "Particle Size / Mesh", value: "Available Upon Request" },
    { parameter: "Moisture", value: "Available Upon Request" },
    { parameter: "Total Ash", value: "Available Upon Request" },
    { parameter: "Foreign Matter", value: "Nil" },
    { parameter: "Purity", value: "100% Natural Onion" },
    { parameter: "Additives", value: "None" },
    { parameter: "GMO Status", value: "Non-GMO" },
    { parameter: "Shelf Life", value: "Available Upon Request" },
    { parameter: "Storage", value: "Store in a Cool, Dry & Hygienic Place" },
  ],
  "dehydrated-tomato-powder": [
    { parameter: "Product Name", value: "Dehydrated Tomato Powder" },
    { parameter: "Botanical Name", value: "Solanum lycopersicum" },
    { parameter: "Origin", value: "India" },
    { parameter: "Form", value: "Fine Powder" },
    { parameter: "Color", value: "Rich Natural Red / Reddish-Orange" },
    { parameter: "Taste", value: "Characteristic Tangy Natural Tomato Taste" },
    { parameter: "Aroma", value: "Typical Ripe Tomato Aroma" },
    { parameter: "Particle Size / Mesh", value: "Available Upon Request" },
    { parameter: "Moisture", value: "Available Upon Request" },
    { parameter: "Total Ash", value: "Available Upon Request" },
    { parameter: "Foreign Matter", value: "Nil" },
    { parameter: "Purity", value: "100% Tomato Origin" },
    { parameter: "Additives", value: "None" },
    { parameter: "GMO Status", value: "Non-GMO" },
    { parameter: "Shelf Life", value: "Available Upon Request" },
    { parameter: "Storage", value: "Store in a Cool, Dry & Hygienic Place" },
  ],
  "dehydrated-ginger-powder": [
    { parameter: "Product Name", value: "Dehydrated Ginger Powder" },
    { parameter: "Botanical Name", value: "Zingiber officinale" },
    { parameter: "Origin", value: "India" },
    { parameter: "Form", value: "Fine Free-Flowing Powder" },
    { parameter: "Color", value: "Light Yellowish-Beige to Natural Warm Cream" },
    { parameter: "Taste", value: "Characteristic Pungent, Warm Spicy Ginger" },
    { parameter: "Aroma", value: "Strong Aromatic Spicy Ginger Aroma" },
    { parameter: "Particle Size / Mesh", value: "Available Upon Request" },
    { parameter: "Moisture", value: "Available Upon Request" },
    { parameter: "Total Ash", value: "Available Upon Request" },
    { parameter: "Foreign Matter", value: "Nil" },
    { parameter: "Purity", value: "100% Ginger Origin" },
    { parameter: "Additives", value: "None" },
    { parameter: "GMO Status", value: "Non-GMO" },
    { parameter: "Shelf Life", value: "Available Upon Request" },
    { parameter: "Storage", value: "Store in a Cool, Dry & Hygienic Place" },
  ],
};

const PRODUCT_IMAGES = {
  "dehydrated-onion-flakes": "/images/products/dehydrated-onion-flakes.jpg",
  "dehydrated-onion-powder": "/images/products/dehydrated-onion-powder.jpg",
  "dehydrated-tomato-powder": "/images/products/dehydrated-tomato-powder.jpg",
  "dehydrated-ginger-powder": "/images/products/dehydrated-ginger-powder.jpg",
};

async function sync() {
  console.log("=== SYNCING SPECIFICATIONS & REAL IMAGES TO SUPABASE ===");

  // 1. Sync Products (using image, gallery_images, specifications_notes)
  for (const [slug, specs] of Object.entries(VERIFIED_SPECIFICATIONS)) {
    const img = PRODUCT_IMAGES[slug];
    console.log(`Updating product in DB: ${slug}...`);
    const { data, error } = await supabase
      .from("products")
      .update({
        image: img,
        gallery_images: [img],
        specifications_notes: JSON.stringify(specs),
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug)
      .select("id, name, slug");

    if (error) {
      console.error(`Error updating ${slug}:`, error.message);
    } else {
      console.log(`✅ Successfully updated ${slug} in products table (matched: ${data?.length || 0})`);
    }

    // Also persist into website_content under product_specs_${slug} for CMS redundancy
    await supabase.from("website_content").upsert({
      section_key: `product_specs_${slug}`,
      page_name: `product_${slug}`,
      title: `Specifications - ${slug}`,
      content: { specifications: specs },
      is_published: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: "section_key" });
  }

  // 2. Sync Homepage CMS record
  console.log("\nUpserting homepage_data into website_content...");
  const homepageContent = {
    heroHeading: "Quality Food Ingredients.\nConnecting India to the World.",
    heroSubtitle:
      "ATHANG IMPEX is an Indian merchant export company focused on sourcing and supplying quality dehydrated food ingredients for international buyers and businesses.",
    heroTrustLabel: "INDIAN FOOD INGREDIENTS EXPORTER",
    heroPrimaryCtaText: "Explore Our Products",
    heroPrimaryCtaLink: "/products",
    heroSecondaryCtaText: "Discuss Your Requirements",
    heroSecondaryCtaLink: "/contact",
    heroImage: "/images/hero/hero-container-ship.jpg",
    introHeading: "Your Partner in Food Ingredient Exports",
    introBody:
      "At ATHANG IMPEX, we connect global businesses with quality Indian food ingredients. Our focus is on sourcing, product consistency, professional communication, and building long-term international business relationships.",
    bannerHeading: "Looking for a Reliable Food Ingredient Export Partner?",
    bannerBody:
      "Tell us about your product requirements and our team will connect with you.",
    chatbotHeading: "Want to Know More About ATHANG IMPEX?",
    chatbotBody:
      "Meet our AI-powered company assistant. Explore our company, understand our products, and discover our business capabilities through a simple WhatsApp conversation.",
    finalCtaHeading: "Let's Build a Stronger Business Connection.",
    finalCtaBody:
      "Connect with ATHANG IMPEX to discuss your food ingredient sourcing requirements.",
  };

  const { error: cmsError } = await supabase.from("website_content").upsert(
    {
      section_key: "homepage_data",
      page_name: "homepage",
      title: "Homepage Primary Content",
      content: homepageContent,
      is_published: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "section_key" }
  );

  if (cmsError) {
    console.error("CMS error:", cmsError.message);
  } else {
    console.log("✅ Successfully synced homepage_data with real container ship hero background!");
  }

  console.log("=== SYNC COMPLETE ===");
}

sync();
