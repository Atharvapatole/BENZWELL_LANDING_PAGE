-- 008_website_settings.sql
-- Website Configuration and Activity Audit Logging Tables

CREATE TABLE IF NOT EXISTS public.website_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    description TEXT DEFAULT '',
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audit / Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email TEXT NOT NULL DEFAULT '',
    action TEXT NOT NULL, -- e.g. 'PRODUCT_CREATED', 'SETTINGS_UPDATED', 'ENQUIRY_STATUS_CHANGED'
    resource_type TEXT NOT NULL, -- e.g. 'product', 'setting', 'enquiry', 'content', 'auth'
    resource_id TEXT DEFAULT '',
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
