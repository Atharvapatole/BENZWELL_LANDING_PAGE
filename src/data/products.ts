export interface ProductSpecification {
  parameter: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  galleryImages: string[];
  keyCharacteristics: string[];
  commonApplications: string[];
  packagingOptionsGeneric: string[];
  features: string[];
  specifications?: ProductSpecification[];
}

export const PRODUCTS: Product[] = [
  {
    id: "dehydrated-onion-powder",
    slug: "dehydrated-onion-powder",
    name: "Dehydrated Onion Powder",
    tagline: "Fine dehydrated onion powder for global food processing and seasoning blends.",
    shortDescription:
      "Finely processed dehydrated onion powder suitable for food processing, seasoning blends, sauces, and various culinary applications.",
    fullDescription:
      "ATHANG IMPEX supplies dehydrated onion powder sourced to meet the exacting standards of food manufacturers, commercial kitchens, and spice blenders worldwide. Produced through controlled drying and uniform pulverization of selected Indian onions, it delivers distinct aromatic pungency, natural sweetness, and immediate dispersibility without lump formation. It serves as a foundational ingredient in dry rubs, snack seasonings, ready-to-eat gravies, soups, and dehydrated meal formulations.",
    image: "/images/products/dehydrated-onion-powder.jpg",
    galleryImages: [
      "/images/products/dehydrated-onion-powder.jpg",
      "/images/products/dehydrated-onion-flakes.jpg",
    ],
    keyCharacteristics: [
      "Fine free-flowing dehydrated powder",
      "Characteristic pungent aroma and savory onion profile",
      "Uniform color and rapid reconstitution in liquid matrices",
      "No artificial fillers, starch additives, or synthetic coloring",
      "Consistent batch-to-batch dispersibility",
      "Produced from selected sound Indian field onions",
    ],
    commonApplications: [
      "Industrial Food Processing & Canned Foods",
      "Spice Blends, Dry Rubs & Curry Powders",
      "Snack Seasonings, Extruded Snacks & Chips",
      "Sauces, Dips, Dressings & Marinades",
      "Instant Soups, Bouillons & Ready Meals",
      "Bakery & Savory Dough Formulations",
    ],
    packagingOptionsGeneric: [
      "Multi-wall food-grade paper bags with inner polyethylene liner",
      "Corrugated cartons with heat-sealed poly liners",
      "Custom bulk export packaging coordinated to buyer requirements",
    ],
    features: [
      "100% Pure Onion Origin",
      "High Dispersibility",
      "Convenient Storage & Handling",
      "International Export Standard Packing",
    ],
    specifications: [
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
  },
  {
    id: "dehydrated-onion-flakes",
    slug: "dehydrated-onion-flakes",
    name: "Dehydrated Onion Flakes",
    tagline: "Crisp dehydrated onion flakes for commercial food preparation and seasonings.",
    shortDescription:
      "Dehydrated onion flakes designed for food manufacturers, seasoning applications, and commercial food preparation.",
    fullDescription:
      "ATHANG IMPEX supplies premium dehydrated onion flakes (kibbled onion) crafted from carefully harvested and sliced Indian fresh onions. Dehydrated using temperature-regulated hot air circulation, our onion flakes retain visual texture, clean aromatic pungency, and authentic culinary bite upon rehydration. Widely utilized by canned food producers, meat processors, pizza topping manufacturers, and instant noodle seasonings.",
    image: "/images/products/dehydrated-onion-flakes.jpg",
    galleryImages: [
      "/images/products/dehydrated-onion-flakes.jpg",
      "/images/products/dehydrated-onion-powder.jpg",
    ],
    keyCharacteristics: [
      "Distinct kibbled onion flake structure (8-25mm)",
      "Creamy off-white appearance without scorching",
      "Rapid rehydration with full onion cell restoration",
      "Preserves volatile aromatic sulfur compounds",
      "Free from stems, skins, and extraneous foreign particles",
      "Low moisture content for long export shelf life",
    ],
    commonApplications: [
      "Ready-to-Cook Seasoning Packets & Ramen Noodle Soups",
      "Canned Meat, Stews & Savory Retort Pouches",
      "Pizza Sauces, Salsas & Dehydrated Toppings",
      "Bulk Catering Supplies & Commercial Kitchens",
      "Dry Rubs and Coarse Gourmet Seasoning Blends",
      "Pickled Vegetable Preparations",
    ],
    packagingOptionsGeneric: [
      "Corrugated master cartons with food-grade inner poly bags",
      "Multi-ply kraft paper sacks with airtight moisture seals",
      "Palletized containerized packing as per importer terms",
    ],
    features: [
      "Selected Farm-Fresh Indian Onions",
      "Distinct Visual Flake Texture",
      "Low Rehydration Ratio Requirement",
      "Uniform Piece Size Grading",
    ],
    specifications: [
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
  },
  {
    id: "dehydrated-tomato-powder",
    slug: "dehydrated-tomato-powder",
    name: "Dehydrated Tomato Powder",
    tagline: "Vibrant tomato powder offering rich color and authentic taste for food production.",
    shortDescription:
      "Vibrant dehydrated tomato powder suitable for soup mixes, snack seasonings, sauces, and instant food formulations.",
    fullDescription:
      "ATHANG IMPEX exports dehydrated tomato powder made from ripe, sound Indian tomatoes processed through hygienic concentration and gentle dehydration. Our powder provides vibrant natural red coloration, characteristic acidity, and rich umami depth without relying on added sugars, artificial dyes, or preservatives. It serves as an indispensable natural flavor enhancer and base ingredient across dry soup mixes, extrusion seasonings, pizza sauces, and tomato pastes.",
    image: "/images/products/dehydrated-tomato-powder.jpg",
    galleryImages: [
      "/images/products/dehydrated-tomato-powder.jpg",
    ],
    keyCharacteristics: [
      "Rich natural red to deep reddish-orange color",
      "Fine free-flowing powder with excellent solubility",
      "Balanced natural acidity, sweetness, and umami depth",
      "Zero added colors, monosodium glutamate, or synthetic flavors",
      "Retains natural tomato solids and lycopene content",
      "Hygienically spray or belt dried under controlled temperatures",
    ],
    commonApplications: [
      "Instant Soup Bases, Bouillons & Broths",
      "Snack Food Dusting, Chips & Popcorn Seasonings",
      "Pasta Sauces, Pizza Pastes & Barbecue Marinades",
      "Dry Gravy Premixes & Dehydrated Ready Meals",
      "Dry Marinades, Meat Rubs & Jerky Seasonings",
      "Health Beverage & Nutritional Formulations",
    ],
    packagingOptionsGeneric: [
      "Heavy-duty aluminum barrier foil pouches inside cartons",
      "Multi-wall kraft paper sacks with high-barrier moisture liners",
      "Nitrogen-flushed drums upon buyer request",
    ],
    features: [
      "100% Pure Tomato Solids",
      "Deep Natural Color Intensity",
      "Clean Ingredient Declaration",
      "Extended Ambient Shelf Stability",
    ],
    specifications: [
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
  },
  {
    id: "dehydrated-ginger-powder",
    slug: "dehydrated-ginger-powder",
    name: "Dehydrated Ginger Powder",
    tagline: "Aromatic and pungent ginger powder for spice blends, teas, and food processing.",
    shortDescription:
      "Aromatic dehydrated ginger powder for food processors, bakeries, beverage companies, and seasoning manufacturers.",
    fullDescription:
      "ATHANG IMPEX supplies high-pungency dehydrated ginger powder (Sonth powder) derived from carefully cleaned, peeled, and dried Indian ginger rhizomes. Celebrated worldwide for its intense gingerol warmth, fresh lemony-woody aromatics, and fine consistency, it acts as a premium grade spice for confectioneries, masala blends, herbal teas, marinades, and functional culinary formulations.",
    image: "/images/products/dehydrated-ginger-powder.jpg",
    galleryImages: [
      "/images/products/dehydrated-ginger-powder.jpg",
    ],
    keyCharacteristics: [
      "Potent aroma with sharp, authentic gingerol warmth",
      "Light yellowish-beige color without bleach treatment",
      "Fine pulverization for rapid dissolution in spice blends",
      "Derived from selected mature Indian ginger rhizomes",
      "Low moisture content preventing mold or caking",
      "Unadulterated without spend ginger fiber fillers",
    ],
    commonApplications: [
      "Curry Powders, Garam Masalas & Specialty Spice Mixes",
      "Bakery Goods: Gingerbread, Cookies & Spiced Biscuits",
      "Beverages: Herbal Teas, Spiced Drink Mixes & Ginger Ales",
      "Marinades for Poultry, Fish & Plant-Based Proteins",
      "Ayurvedic and Herbal Wellness Supplements",
      "Sauces, Chutneys & Asian Cuisine Formulations",
    ],
    packagingOptionsGeneric: [
      "Multi-ply paper sacks with polyethylene inner liner",
      "Corrugated cartons with heat-sealed food-grade bags",
      "Custom vacuum export packaging on request",
    ],
    features: [
      "High Gingerol Potency",
      "Authentic Indian Zingiber Origin",
      "Free from Added Fibers or Starch",
      "Strict Micro-Clean Processing",
    ],
    specifications: [
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
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
