-- 011_indexes_and_performance.sql
-- Database Indexes for Ultra-Fast Query Performance

-- Products
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_published_order ON public.products(is_published, display_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);

-- Categories
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_active ON public.categories(is_active, display_order ASC);

-- Website Content
CREATE INDEX IF NOT EXISTS idx_website_content_section_key ON public.website_content(section_key);
CREATE INDEX IF NOT EXISTS idx_website_content_page ON public.website_content(page_name, is_published);

-- Enquiries & CRM
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON public.enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- Customers
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_company ON public.customers(company);

-- Chatbot Knowledge Base
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_slug ON public.chatbot_knowledge(slug);
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_category ON public.chatbot_knowledge(category, is_published);

-- Activity Logs
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON public.activity_logs(action);
