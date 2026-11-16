-- 013_fix_admin_authentication.sql
-- Hardened Administrator Authentication & RLS Integrity Migration
-- Safe to execute repeatedly (idempotent)

-- 1. Ensure admin_role_type enum exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_role_type') THEN
        CREATE TYPE admin_role_type AS ENUM ('super_admin', 'editor', 'sales');
    END IF;
END $$;

-- 2. Ensure admin_users table exists with foreign key to auth.users
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL DEFAULT '',
    role admin_role_type NOT NULL DEFAULT 'editor',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

-- 3. Hardened Security Definer Functions with search_path protection
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = user_id AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_super_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = user_id AND is_active = true AND role = 'super_admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.get_admin_role(user_id UUID)
RETURNS admin_role_type AS $$
DECLARE
    user_role admin_role_type;
BEGIN
    SELECT role INTO user_role FROM public.admin_users
    WHERE id = user_id AND is_active = true;
    RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Re-verify and Harden Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop prior versions of policies to ensure clean state
DROP POLICY IF EXISTS "Admins can view admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Super Admins can manage admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Users can view their own admin profile" ON public.admin_users;

-- Policy A: An authenticated user can ALWAYS read their own admin_users profile
-- This is critical so login flow can verify role without circular dependencies.
CREATE POLICY "Users can view their own admin profile"
    ON public.admin_users FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Policy B: Authorized admins can view all admin user records
CREATE POLICY "Admins can view admin_users"
    ON public.admin_users FOR SELECT
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Policy C: Only Super Admins can insert, update, or delete admin accounts
CREATE POLICY "Super Admins can manage admin_users"
    ON public.admin_users FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()))
    WITH CHECK (public.is_super_admin(auth.uid()));

-- 5. Indexes for fast authentication and role lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role_active ON public.admin_users(role, is_active);
