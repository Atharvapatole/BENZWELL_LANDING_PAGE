-- 014_product_specifications_and_cms_drafts.sql
-- Product Technical Specifications and CMS Content Draft Management

-- 1. Add specifications JSONB column to products table if not exists
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '[]'::jsonb;

-- 2. Add draft_content JSONB column to website_content table if not exists
ALTER TABLE public.website_content 
ADD COLUMN IF NOT EXISTS draft_content JSONB DEFAULT NULL;

-- 3. Update existing 4 products with real photography and specifications

-- A. Dehydrated Onion Flakes
UPDATE public.products
SET 
    image = '/images/products/dehydrated-onion-flakes.jpg',
    gallery_images = ARRAY[
        '/images/products/dehydrated-onion-flakes.jpg',
        '/images/products/dehydrated-onion-powder.jpg'
    ],
    specifications = '[
        {"parameter": "Product Name", "value": "Dehydrated Onion Flakes"},
        {"parameter": "Botanical Name", "value": "Allium cepa"},
        {"parameter": "Origin", "value": "India"},
        {"parameter": "Form", "value": "Flakes"},
        {"parameter": "Color", "value": "White to Off-White / Light Cream"},
        {"parameter": "Taste", "value": "Typical Fresh Onion Taste"},
        {"parameter": "Aroma", "value": "Strong Characteristic Onion Aroma"},
        {"parameter": "Flake Size", "value": "8–25 mm (Custom Sizes Available)"},
        {"parameter": "Moisture", "value": "Maximum 6%"},
        {"parameter": "Total Ash", "value": "Maximum 4%"},
        {"parameter": "Acid Insoluble Ash", "value": "Maximum 0.5%"},
        {"parameter": "Foreign Matter", "value": "Nil"},
        {"parameter": "Extraneous Matter", "value": "Nil"},
        {"parameter": "Purity", "value": "100% Natural"},
        {"parameter": "Additives", "value": "None"},
        {"parameter": "GMO Status", "value": "Non-GMO"},
        {"parameter": "Shelf Life", "value": "24 Months"},
        {"parameter": "Storage", "value": "Store in a Cool, Dry & Hygienic Place"}
    ]'::jsonb,
    updated_at = NOW()
WHERE slug = 'dehydrated-onion-flakes';

-- B. Dehydrated Onion Powder
UPDATE public.products
SET 
    image = '/images/products/dehydrated-onion-powder.jpg',
    gallery_images = ARRAY[
        '/images/products/dehydrated-onion-powder.jpg',
        '/images/products/dehydrated-onion-flakes.jpg'
    ],
    specifications = '[
        {"parameter": "Product Name", "value": "Dehydrated Onion Powder"},
        {"parameter": "Botanical Name", "value": "Allium cepa"},
        {"parameter": "Origin", "value": "India"},
        {"parameter": "Form", "value": "Fine Free-Flowing Powder"},
        {"parameter": "Color", "value": "Off-White to Pale Cream"},
        {"parameter": "Taste", "value": "Characteristic Pungent Onion Flavor"},
        {"parameter": "Aroma", "value": "Strong Characteristic Savory Onion Aroma"},
        {"parameter": "Particle Size / Mesh", "value": "Available Upon Request"},
        {"parameter": "Moisture", "value": "Available Upon Request"},
        {"parameter": "Total Ash", "value": "Available Upon Request"},
        {"parameter": "Foreign Matter", "value": "Nil"},
        {"parameter": "Purity", "value": "100% Natural Onion"},
        {"parameter": "Additives", "value": "None"},
        {"parameter": "GMO Status", "value": "Non-GMO"},
        {"parameter": "Shelf Life", "value": "Available Upon Request"},
        {"parameter": "Storage", "value": "Store in a Cool, Dry & Hygienic Place"}
    ]'::jsonb,
    updated_at = NOW()
WHERE slug = 'dehydrated-onion-powder';

-- C. Dehydrated Tomato Powder
UPDATE public.products
SET 
    image = '/images/products/dehydrated-tomato-powder.jpg',
    gallery_images = ARRAY[
        '/images/products/dehydrated-tomato-powder.jpg'
    ],
    specifications = '[
        {"parameter": "Product Name", "value": "Dehydrated Tomato Powder"},
        {"parameter": "Botanical Name", "value": "Solanum lycopersicum"},
        {"parameter": "Origin", "value": "India"},
        {"parameter": "Form", "value": "Fine Powder"},
        {"parameter": "Color", "value": "Rich Natural Red / Reddish-Orange"},
        {"parameter": "Taste", "value": "Characteristic Tangy Natural Tomato Taste"},
        {"parameter": "Aroma", "value": "Typical Ripe Tomato Aroma"},
        {"parameter": "Particle Size / Mesh", "value": "Available Upon Request"},
        {"parameter": "Moisture", "value": "Available Upon Request"},
        {"parameter": "Total Ash", "value": "Available Upon Request"},
        {"parameter": "Foreign Matter", "value": "Nil"},
        {"parameter": "Purity", "value": "100% Tomato Origin"},
        {"parameter": "Additives", "value": "None"},
        {"parameter": "GMO Status", "value": "Non-GMO"},
        {"parameter": "Shelf Life", "value": "Available Upon Request"},
        {"parameter": "Storage", "value": "Store in a Cool, Dry & Hygienic Place"}
    ]'::jsonb,
    updated_at = NOW()
WHERE slug = 'dehydrated-tomato-powder';

-- D. Dehydrated Ginger Powder
UPDATE public.products
SET 
    image = '/images/products/dehydrated-ginger-powder.jpg',
    gallery_images = ARRAY[
        '/images/products/dehydrated-ginger-powder.jpg'
    ],
    specifications = '[
        {"parameter": "Product Name", "value": "Dehydrated Ginger Powder"},
        {"parameter": "Botanical Name", "value": "Zingiber officinale"},
        {"parameter": "Origin", "value": "India"},
        {"parameter": "Form", "value": "Fine Free-Flowing Powder"},
        {"parameter": "Color", "value": "Light Yellowish-Beige to Natural Warm Cream"},
        {"parameter": "Taste", "value": "Characteristic Pungent, Warm Spicy Ginger"},
        {"parameter": "Aroma", "value": "Strong Aromatic Spicy Ginger Aroma"},
        {"parameter": "Particle Size / Mesh", "value": "Available Upon Request"},
        {"parameter": "Moisture", "value": "Available Upon Request"},
        {"parameter": "Total Ash", "value": "Available Upon Request"},
        {"parameter": "Foreign Matter", "value": "Nil"},
        {"parameter": "Purity", "value": "100% Ginger Origin"},
        {"parameter": "Additives", "value": "None"},
        {"parameter": "GMO Status", "value": "Non-GMO"},
        {"parameter": "Shelf Life", "value": "Available Upon Request"},
        {"parameter": "Storage", "value": "Store in a Cool, Dry & Hygienic Place"}
    ]'::jsonb,
    updated_at = NOW()
WHERE slug = 'dehydrated-ginger-powder';

-- 4. Seed Homepage primary CMS record if not present
INSERT INTO public.website_content (section_key, page_name, title, content, is_published, updated_at)
VALUES (
    'homepage_data',
    'homepage',
    'Homepage Primary Content',
    '{
        "heroHeading": "Quality Food Ingredients.\nConnecting India to the World.",
        "heroSubtitle": "ATHANG IMPEX is an Indian merchant export company focused on sourcing and supplying quality dehydrated food ingredients for international buyers and businesses.",
        "heroTrustLabel": "INDIAN FOOD INGREDIENTS EXPORTER",
        "heroPrimaryCtaText": "Explore Our Products",
        "heroPrimaryCtaLink": "/products",
        "heroSecondaryCtaText": "Discuss Your Requirements",
        "heroSecondaryCtaLink": "/contact",
        "heroImage": "/images/hero/hero-container-ship.jpg",
        "introHeading": "Your Partner in Food Ingredient Exports",
        "introBody": "At ATHANG IMPEX, we connect global businesses with quality Indian food ingredients. Our focus is on sourcing, product consistency, professional communication, and building long-term international business relationships.",
        "bannerHeading": "Looking for a Reliable Food Ingredient Export Partner?",
        "bannerBody": "Tell us about your product requirements and our team will connect with you.",
        "chatbotHeading": "Want to Know More About ATHANG IMPEX?",
        "chatbotBody": "Meet our AI-powered company assistant. Explore our company, understand our products, and discover our business capabilities through a simple WhatsApp conversation.",
        "finalCtaHeading": "Let''s Build a Stronger Business Connection.",
        "finalCtaBody": "Connect with ATHANG IMPEX to discuss your food ingredient sourcing requirements."
    }'::jsonb,
    true,
    NOW()
)
ON CONFLICT (section_key) DO UPDATE SET
    content = EXCLUDED.content,
    updated_at = NOW();
