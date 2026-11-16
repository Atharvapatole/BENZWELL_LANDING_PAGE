-- 005_website_content.sql
-- Website Content Management (CMS) Table

CREATE TABLE IF NOT EXISTS public.website_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key TEXT NOT NULL UNIQUE, -- e.g. 'homepage_hero', 'homepage_intro', 'about_story', 'quality_workflow', etc.
    page_name TEXT NOT NULL, -- e.g. 'homepage', 'about', 'quality', 'export', 'contact'
    title TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_website_content_updated_at ON public.website_content;
CREATE TRIGGER trigger_website_content_updated_at
    BEFORE UPDATE ON public.website_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
