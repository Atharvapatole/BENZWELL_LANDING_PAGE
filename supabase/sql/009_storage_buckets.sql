-- 009_storage_buckets.sql
-- Storage Buckets Configuration for Supabase Storage

-- Insert buckets into storage.buckets if they do not exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('products', 'products', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/avif']),
    ('website-assets', 'website-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/avif']),
    ('categories', 'categories', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
    ('documents', 'documents', false, 20971520, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS Policies
-- Public read for public buckets
CREATE POLICY "Public Read Products Storage"
    ON storage.objects FOR SELECT
    USING (bucket_id IN ('products', 'website-assets', 'categories'));

-- Admin full access on all buckets
CREATE POLICY "Admin All Storage Access"
    ON storage.objects FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));
