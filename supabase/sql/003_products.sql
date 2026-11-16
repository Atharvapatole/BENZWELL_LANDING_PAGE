-- 003_products.sql
-- Products Table for ATHANG IMPEX Catalog

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT DEFAULT '',
    short_description TEXT NOT NULL DEFAULT '',
    full_description TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    gallery_images TEXT[] DEFAULT ARRAY[]::TEXT[],
    category_id UUID, -- Foreign key linked in 004_categories.sql
    category_name TEXT DEFAULT 'Dehydrated Products',
    key_characteristics TEXT[] DEFAULT ARRAY[]::TEXT[],
    common_applications TEXT[] DEFAULT ARRAY[]::TEXT[],
    packaging_options TEXT[] DEFAULT ARRAY[]::TEXT[],
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    specifications_notes TEXT DEFAULT 'Product specifications, packaging options, minimum order quantities, and commercial terms can be discussed according to buyer requirements.',
    
    -- SEO Fields
    seo_title TEXT DEFAULT '',
    seo_description TEXT DEFAULT '',
    seo_keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
    og_image TEXT DEFAULT '',
    
    -- Publishing & Visibility
    is_published BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    scheduled_at TIMESTAMPTZ,
    views_count BIGINT NOT NULL DEFAULT 0,
    
    -- Audit Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_products_updated_at ON public.products;
CREATE TRIGGER trigger_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
