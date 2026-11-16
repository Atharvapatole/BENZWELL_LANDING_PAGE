-- 010_row_level_security.sql
-- Row Level Security (RLS) Configuration Across All Tables

-- 1. Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 2. admin_users policies
-- Admins can read admin profiles
CREATE POLICY "Admins can view admin_users"
    ON public.admin_users FOR SELECT
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Only Super Admins can insert/update/delete admin accounts
CREATE POLICY "Super Admins can manage admin_users"
    ON public.admin_users FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()))
    WITH CHECK (public.is_super_admin(auth.uid()));

-- 3. products policies
-- Public can read published products
CREATE POLICY "Public can view published products"
    ON public.products FOR SELECT
    USING (is_published = true);

-- Admins can view and manage all products
CREATE POLICY "Admins full access on products"
    ON public.products FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

-- 4. categories policies
-- Public can view active categories
CREATE POLICY "Public can view active categories"
    ON public.categories FOR SELECT
    USING (is_active = true);

-- Admins can view and manage all categories
CREATE POLICY "Admins full access on categories"
    ON public.categories FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

-- 5. website_content policies
-- Public can view published content
CREATE POLICY "Public can view published website_content"
    ON public.website_content FOR SELECT
    USING (is_published = true);

-- Admins can manage website_content
CREATE POLICY "Admins full access on website_content"
    ON public.website_content FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

-- 6. enquiries policies
-- Public can submit new enquiries
CREATE POLICY "Public can submit enquiries"
    ON public.enquiries FOR INSERT
    WITH CHECK (true);

-- Admins can view and manage enquiries
CREATE POLICY "Admins full access on enquiries"
    ON public.enquiries FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

-- 7. customers policies
-- Only Admins can view and manage customers
CREATE POLICY "Admins full access on customers"
    ON public.customers FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

-- 8. chatbot_knowledge policies
-- Public can view published knowledge
CREATE POLICY "Public can view published chatbot_knowledge"
    ON public.chatbot_knowledge FOR SELECT
    USING (is_published = true);

-- Admins can manage chatbot_knowledge
CREATE POLICY "Admins full access on chatbot_knowledge"
    ON public.chatbot_knowledge FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

-- 9. website_settings policies
-- Public can read public settings
CREATE POLICY "Public can view website_settings"
    ON public.website_settings FOR SELECT
    USING (true);

-- Admins can manage website_settings
CREATE POLICY "Admins full access on website_settings"
    ON public.website_settings FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

-- 10. activity_logs policies
-- Only Admins can view activity logs
CREATE POLICY "Admins can view activity_logs"
    ON public.activity_logs FOR SELECT
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Admins can insert activity logs
CREATE POLICY "Admins can insert activity_logs"
    ON public.activity_logs FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin(auth.uid()));
