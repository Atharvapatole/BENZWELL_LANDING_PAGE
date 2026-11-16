-- 006_enquiries_and_crm.sql
-- Enquiries and CRM Management Tables

CREATE TYPE enquiry_status_type AS ENUM (
    'new',
    'contacted',
    'interested',
    'negotiation',
    'converted',
    'closed',
    'spam'
);

-- Customers Table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    company TEXT NOT NULL DEFAULT '',
    country TEXT NOT NULL DEFAULT '',
    email TEXT,
    phone TEXT,
    website TEXT,
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for customers updated_at
DROP TRIGGER IF EXISTS trigger_customers_updated_at ON public.customers;
CREATE TRIGGER trigger_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL,
    phone_number TEXT DEFAULT '',
    country TEXT NOT NULL DEFAULT '',
    product_interest TEXT NOT NULL DEFAULT '',
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'Website Form',
    status enquiry_status_type NOT NULL DEFAULT 'new',
    internal_notes TEXT DEFAULT '',
    assigned_admin UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    ip_address TEXT DEFAULT '',
    user_agent TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for enquiries updated_at
DROP TRIGGER IF EXISTS trigger_enquiries_updated_at ON public.enquiries;
CREATE TRIGGER trigger_enquiries_updated_at
    BEFORE UPDATE ON public.enquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
