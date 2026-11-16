-- 012_seed_initial_data.sql
-- Seed Initial Data for ATHANG IMPEX (Safe to re-run multiple times)

-- 1. Initial Category: Dehydrated Products
INSERT INTO public.categories (id, slug, name, description, display_order, is_active)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'dehydrated-products',
    'Dehydrated Products',
    'Premium Indian dehydrated food ingredients processed for food manufacturers, spice blenders, and institutional buyers.',
    1,
    true
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    is_active = EXCLUDED.is_active;

-- 2. Four Initial Products
-- Product 1: Dehydrated Onion Powder
INSERT INTO public.products (
    slug, name, tagline, short_description, full_description, image, gallery_images,
    category_id, category_name, key_characteristics, common_applications, packaging_options,
    features, is_published, is_featured, display_order, seo_title, seo_description
)
VALUES (
    'dehydrated-onion-powder',
    'Dehydrated Onion Powder',
    'Fine dehydrated onion powder for global food processing and seasoning blends.',
    'Finely processed dehydrated onion powder suitable for food processing, seasoning blends, sauces, and various culinary applications.',
    'ATHANG IMPEX supplies dehydrated onion powder sourced to meet the exacting standards of food manufacturers, commercial kitchens, and spice blenders worldwide. Produced through controlled drying and uniform pulverization of selected Indian onions, it delivers distinct aromatic pungency, natural sweetness, and immediate dispersibility without lump formation. It serves as a foundational ingredient in dry rubs, snack seasonings, ready-to-eat gravies, soups, and dehydrated meal formulations.',
    '/images/products/onion-powder.svg',
    ARRAY['/images/products/onion-powder.svg', '/images/products/onion-powder-detail.svg', '/images/products/onion-powder-field.svg'],
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Dehydrated Products',
    ARRAY[
        'Fine free-flowing dehydrated powder',
        'Characteristic pungent aroma and savory onion profile',
        'Uniform color and rapid reconstitution in liquid matrices',
        'No artificial fillers, starch additives, or synthetic coloring',
        'Consistent batch-to-batch dispersibility',
        'Produced from selected sound Indian field onions'
    ],
    ARRAY[
        'Industrial Food Processing & Canned Foods',
        'Spice Blends, Dry Rubs & Curry Powders',
        'Snack Seasonings, Extruded Snacks & Chips',
        'Sauces, Dips, Dressings & Marinades',
        'Instant Soups, Bouillons & Ready Meals',
        'Bakery & Savory Dough Formulations'
    ],
    ARRAY[
        'Multi-wall food-grade paper bags with inner polyethylene liner',
        'Corrugated cartons with heat-sealed poly liners',
        'Custom bulk export packaging coordinated to buyer requirements'
    ],
    ARRAY['100% Pure Onion Origin', 'High Dispersibility', 'Convenient Storage & Handling', 'International Export Standard Packing'],
    true, true, 1,
    'Dehydrated Onion Powder Exporter India | ATHANG IMPEX',
    'Finely processed dehydrated onion powder from India for commercial food processing and seasonings.'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    image = EXCLUDED.image,
    gallery_images = EXCLUDED.gallery_images,
    category_id = EXCLUDED.category_id,
    key_characteristics = EXCLUDED.key_characteristics,
    common_applications = EXCLUDED.common_applications,
    packaging_options = EXCLUDED.packaging_options,
    features = EXCLUDED.features,
    is_published = EXCLUDED.is_published,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order;

-- Product 2: Dehydrated Onion Flakes
INSERT INTO public.products (
    slug, name, tagline, short_description, full_description, image, gallery_images,
    category_id, category_name, key_characteristics, common_applications, packaging_options,
    features, is_published, is_featured, display_order, seo_title, seo_description
)
VALUES (
    'dehydrated-onion-flakes',
    'Dehydrated Onion Flakes',
    'Crisp dehydrated onion flakes for commercial food preparation and seasonings.',
    'Dehydrated onion flakes designed for food manufacturers, seasoning applications, and commercial food preparation.',
    'ATHANG IMPEX supplies premium dehydrated onion flakes (kibbled onion) crafted from carefully harvested and sliced Indian fresh onions. Dehydrated using temperature-regulated hot air circulation, our onion flakes retain visual texture, clean aromatic pungency, and authentic culinary bite upon rehydration. Widely utilized by canned food producers, meat processors, pizza topping manufacturers, and instant noodle seasonings.',
    '/images/products/onion-flakes.svg',
    ARRAY['/images/products/onion-flakes.svg', '/images/products/onion-flakes-detail.svg', '/images/products/onion-flakes-prep.svg'],
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Dehydrated Products',
    ARRAY[
        'Distinct flake/kibbled texture with authentic onion structure',
        'Rich aromatic pungency and natural savory depth',
        'Excellent rehydration ratio for texture in wet culinary dishes',
        'Clean visual appeal suitable for visible ingredient toppings',
        'Sourced from mature, carefully cured Indian onions',
        'Free from synthetic preservatives and colorants'
    ],
    ARRAY[
        'Instant Noodles, Ramen Broths & Seasoning Sachets',
        'Pizza Sauces, Prepared Meals & Toppings',
        'Meat, Poultry, & Plant-based Protein Processing',
        'Commercial Casseroles, Curries & Stews',
        'Dry Soup Mixes & Dehydrated Meal Kits',
        'B2B Foodservice & Commercial Kitchen Blends'
    ],
    ARRAY[
        'Heavy-duty corrugated master cartons with sealed moisture-barrier poly liner',
        'Reinforced kraft paper sacks with airtight inner liner',
        'Palletized and shrink-wrapped export consignments upon request'
    ],
    ARRAY['Consistent Flake Sizing', 'Natural Onion Texture', 'Rapid Moisture Absorption', 'Export Grade Protection'],
    true, true, 2,
    'Dehydrated Onion Flakes Supplier India | ATHANG IMPEX',
    'Kibbled dehydrated onion flakes from India for food manufacturers and commercial kitchens.'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    image = EXCLUDED.image,
    gallery_images = EXCLUDED.gallery_images,
    category_id = EXCLUDED.category_id,
    key_characteristics = EXCLUDED.key_characteristics,
    common_applications = EXCLUDED.common_applications,
    packaging_options = EXCLUDED.packaging_options,
    features = EXCLUDED.features,
    is_published = EXCLUDED.is_published,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order;

-- Product 3: Dehydrated Tomato Powder
INSERT INTO public.products (
    slug, name, tagline, short_description, full_description, image, gallery_images,
    category_id, category_name, key_characteristics, common_applications, packaging_options,
    features, is_published, is_featured, display_order, seo_title, seo_description
)
VALUES (
    'dehydrated-tomato-powder',
    'Dehydrated Tomato Powder',
    'Natural dehydrated tomato powder for soups, sauces, extruded snacks, and seasonings.',
    'Versatile dehydrated tomato powder suitable for soups, sauces, seasonings, instant foods, and food manufacturing.',
    'ATHANG IMPEX provides dehydrated tomato powder produced from vine-ripened Indian tomatoes. Through hygienic processing and gentle dehydration, this versatile ingredient captures the characteristic deep red hue, tanginess, and natural umami notes of real tomatoes. It offers food formulators a clean, shelf-stable, and consistent alternative to tomato paste or puree, eliminating the logistical overhead of shipping high water content.',
    '/images/products/tomato-powder.svg',
    ARRAY['/images/products/tomato-powder.svg', '/images/products/tomato-powder-detail.svg', '/images/products/tomato-powder-field.svg'],
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Dehydrated Products',
    ARRAY[
        'Vibrant natural reddish-orange tone derived from ripe tomatoes',
        'Balanced sweetness and natural tomato acidity',
        'High solubility and smooth mouthfeel in liquid formulations',
        'Pure fruit solids without added coloring agents',
        'Convenient ambient storage and reduced freight footprint',
        'Sourced from selected Indian farm harvests'
    ],
    ARRAY[
        'Instant Soup Blends, Broths & Gazpacho Bases',
        'Pasta Sauces, Pizza Sauces, Ketchup & Barbecue Glazes',
        'Extruded Snack Coatings & Savory Seasoning Powders',
        'Ready-to-Cook Rice Meals & Instant Premixes',
        'Dipping Sauces, Dressings & Dry Marinades',
        'Plant-Based Savory Flavor Enhancement'
    ],
    ARRAY[
        'Multi-barrier moisture-proof foil or poly-lined cartons',
        'Food-grade fibre drums with hermetic liners',
        'Custom bulk export packing specified by importing destination'
    ],
    ARRAY['Natural Ripe Color', 'Clean Tangy Flavor', 'Highly Soluble Formulation', 'Logistically Efficient'],
    true, true, 3,
    'Dehydrated Tomato Powder Exporter | ATHANG IMPEX',
    'Pure dehydrated tomato powder from India for soups, sauces, and seasonings.'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    image = EXCLUDED.image,
    gallery_images = EXCLUDED.gallery_images,
    category_id = EXCLUDED.category_id,
    key_characteristics = EXCLUDED.key_characteristics,
    common_applications = EXCLUDED.common_applications,
    packaging_options = EXCLUDED.packaging_options,
    features = EXCLUDED.features,
    is_published = EXCLUDED.is_published,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order;

-- Product 4: Dehydrated Ginger Powder
INSERT INTO public.products (
    slug, name, tagline, short_description, full_description, image, gallery_images,
    category_id, category_name, key_characteristics, common_applications, packaging_options,
    features, is_published, is_featured, display_order, seo_title, seo_description
)
VALUES (
    'dehydrated-ginger-powder',
    'Dehydrated Ginger Powder',
    'Aromatic dehydrated ginger powder for spice blends, functional foods, and food processing.',
    'Convenient dehydrated ginger powder suitable for spice blends, food processing, seasoning applications, and commercial culinary use.',
    'ATHANG IMPEX offers dehydrated ginger powder pulverized from prime dried ginger rhizomes grown in India''s renowned spice-growing belts. Known for its warm, sharp pungency, woody undertones, and zesty aromatic finish, our dehydrated ginger powder is an essential component for commercial bakery products, confectionery, curry powders, beverage premixes, and Asian culinary bases.',
    '/images/products/ginger-powder.svg',
    ARRAY['/images/products/ginger-powder.svg', '/images/products/ginger-powder-detail.svg', '/images/products/ginger-powder-root.svg'],
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Dehydrated Products',
    ARRAY[
        'Finely milled powder with warm pale-yellow to buff hue',
        'Distinct spicy, pungent zing and aromatic warmth',
        'Clean aroma indicative of well-cured dried ginger rhizomes',
        'Smooth dispersibility in both dry blends and liquid formulations',
        '100% natural ginger without artificial anti-caking agents',
        'Sourced through responsible grower and processor networks'
    ],
    ARRAY[
        'Curry Powders, Garam Masala & Global Spice Blends',
        'Bakery Formulations (Gingerbread, Biscuits & Spiced Cakes)',
        'Confectionery, Lozenges & Hard Candies',
        'Ready-to-Drink Teas, Chai Premixes & Herbal Beverages',
        'Savory Marinades, Teriyaki Glazes & Stir-Fry Seasonings',
        'Pickling Brines & Specialty Condiment Production'
    ],
    ARRAY[
        'Polyethylene-lined kraft multi-wall paper bags',
        'Corrugated cartons with heat-sealed food-grade poly bags',
        'Custom batch packaging suited for international ocean freight'
    ],
    ARRAY['Strong Pungency Profile', 'Even Milling Consistency', 'Authentic Indian Spice Heritage', 'Export Ready Packaging'],
    true, true, 4,
    'Dehydrated Ginger Powder Exporter India | ATHANG IMPEX',
    'High pungency dehydrated ginger powder from India for food processors and spice blenders.'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    image = EXCLUDED.image,
    gallery_images = EXCLUDED.gallery_images,
    category_id = EXCLUDED.category_id,
    key_characteristics = EXCLUDED.key_characteristics,
    common_applications = EXCLUDED.common_applications,
    packaging_options = EXCLUDED.packaging_options,
    features = EXCLUDED.features,
    is_published = EXCLUDED.is_published,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order;

-- 3. Initial Website Settings
INSERT INTO public.website_settings (key, category, value, description)
VALUES 
    ('company', 'general', jsonb_build_object(
        'name', 'ATHANG IMPEX',
        'legal_name', 'ATHANG IMPEX',
        'tagline', 'Your Trusted Partner for Quality Food Ingredients.',
        'business_type', 'Indian Merchant Exporter',
        'primary_industry', 'Food Ingredients and Dehydrated Food Products',
        'domain', 'athangimpex.in',
        'base_url', 'https://athangimpex.in',
        'email', 'info@athangimpex.in',
        'country', 'India'
    ), 'Core company profile parameters'),
    ('whatsapp', 'communication', jsonb_build_object(
        'sales_number', '+91 9923407176',
        'sales_clean', '919923407176',
        'chatbot_number', '+1 7111647464',
        'chatbot_clean', '17111647464',
        'sales_prefill', 'Hello ATHANG IMPEX,\n\nI visited your website and would like to discuss your dehydrated food products.\n\nPlease share further information about your products and business.',
        'chatbot_prefill', 'Hello ATHANG IMPEX AI Assistant. I would like to learn more about your company and products.',
        'show_widget', true
    ), 'Official WhatsApp numbers and pre-filled message templates'),
    ('branding', 'design', jsonb_build_object(
        'primary_color', '#123D2A',
        'secondary_color', '#1B5138',
        'accent_color', '#C6A15B',
        'background_color', '#F8F7F2',
        'logo_url', '/images/logo.svg',
        'favicon_url', '/icon.svg'
    ), 'Visual brand colors and logo assets'),
    ('general', 'system', jsonb_build_object(
        'maintenance_mode', false,
        'announcement_bar', jsonb_build_object(
            'enabled', false,
            'message', '',
            'link', ''
        )
    ), 'Global website state, announcement banner, and maintenance mode')
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value,
    description = EXCLUDED.description;

-- 4. Initial Chatbot Knowledge Articles
INSERT INTO public.chatbot_knowledge (slug, title, category, summary, content, tags, is_published, display_order)
VALUES 
    (
        'about-athang-impex',
        'About ATHANG IMPEX',
        'Company Information',
        'Overview of ATHANG IMPEX as an Indian merchant exporter of dehydrated food ingredients.',
        'ATHANG IMPEX is an Indian merchant export company focused on sourcing and supplying quality dehydrated food ingredients to international markets. Our positioning is "Your Trusted Partner for Quality Food Ingredients." We operate transparently, connecting global food manufacturers, blenders, and distributors with dependable Indian agricultural processors.',
        ARRAY['company', 'about', 'merchant exporter', 'india'],
        true, 1
    ),
    (
        'pricing-and-quotations-guideline',
        'Pricing, MOQ and Commercial Quotation Rules',
        'Frequently Asked Questions',
        'Commercial policy: Quotations, MOQs, and pricing are handled directly by the Owner / Sales Desk.',
        'IMPORTANT: The ATHANG IMPEX AI Assistant does NOT provide direct MOQ commitments, actual product prices, quotations, or negotiate commercial terms. For all commercial discussions, container pricing, specifications, and minimum order quantities, please contact our official Sales WhatsApp at +91 9923407176 (https://wa.me/919923407176).',
        ARRAY['pricing', 'moq', 'quotations', 'sales', 'commercial'],
        true, 2
    ),
    (
        'dehydrated-onion-powder-info',
        'Dehydrated Onion Powder Information',
        'Dehydrated Onion Powder',
        'Product details, applications, and sensory profile for dehydrated onion powder.',
        'ATHANG IMPEX exports fine dehydrated onion powder produced from sound Indian field onions. It features a characteristic pungent aroma, savory profile, uniform color, and rapid reconstitution without clumping. Common applications include seasoning blends, dry rubs, extruded snacks, canned foods, instant soups, and sauces. Available in export multi-wall paper bags with sealed poly liners.',
        ARRAY['onion powder', 'dehydrated', 'seasonings', 'sauces'],
        true, 3
    ),
    (
        'dehydrated-onion-flakes-info',
        'Dehydrated Onion Flakes (Kibbled) Information',
        'Dehydrated Onion Flakes',
        'Product details and applications for dehydrated onion flakes.',
        'ATHANG IMPEX exports kibbled dehydrated onion flakes made from sliced Indian onions. Dehydrated with temperature-controlled air circulation, the flakes retain crisp texture and authentic onion bite upon rehydration. Widely used in instant noodle broths, pizza toppings, canned casseroles, meat processing, and food service kits.',
        ARRAY['onion flakes', 'kibbled', 'instant foods', 'pizza toppings'],
        true, 4
    ),
    (
        'dehydrated-tomato-powder-info',
        'Dehydrated Tomato Powder Information',
        'Dehydrated Tomato Powder',
        'Product details, solubility, and applications for dehydrated tomato powder.',
        'ATHANG IMPEX supplies dehydrated tomato powder produced from vine-ripened Indian tomatoes. It captures a vibrant natural reddish-orange hue, balanced sweet-tangy acidity, and rich umami notes. It replaces tomato paste or puree in instant soups, pasta sauces, snack coatings, and marinades with high solubility and reduced shipping volume.',
        ARRAY['tomato powder', 'soups', 'ketchup', 'snacks'],
        true, 5
    ),
    (
        'dehydrated-ginger-powder-info',
        'Dehydrated Ginger Powder Information',
        'Dehydrated Ginger Powder',
        'Product details, pungency, and applications for dehydrated ginger powder.',
        'ATHANG IMPEX provides dehydrated ginger powder pulverized from dried Indian ginger rhizomes. Known for its warm, sharp pungency, woody undertones, and zesty aroma. Ideal for curry powders, gingerbread, spice premixes, confectionery, and functional beverage blends.',
        ARRAY['ginger powder', 'pungency', 'spice blends', 'bakery'],
        true, 6
    ),
    (
        'export-capabilities-and-packaging',
        'Export Capabilities & Packaging Coordination',
        'Export Capabilities',
        'Logistics, ocean freight, air cargo, and export packing options.',
        'ATHANG IMPEX coordinates ocean freight (FCL and consolidated consignments) and air cargo from major Indian ports to global destinations. Standard packing includes 20kg to 25kg multi-wall paper bags with polyethylene liners, heavy-duty corrugated cartons, or customized palletized shipping suited for international ocean freight.',
        ARRAY['export', 'shipping', 'packaging', 'logistics'],
        true, 7
    )
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    summary = EXCLUDED.summary,
    content = EXCLUDED.content,
    tags = EXCLUDED.tags,
    is_published = EXCLUDED.is_published,
    display_order = EXCLUDED.display_order;
