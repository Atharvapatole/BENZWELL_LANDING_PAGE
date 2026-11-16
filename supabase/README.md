# ATHANG IMPEX — Supabase Architecture & Database Setup Guide

This folder contains the complete, production-ready PostgreSQL database migrations, Row Level Security (RLS) policies, storage bucket setups, and initial seed datasets for **ATHANG IMPEX**.

---

## 1. Migration Execution Order in Supabase SQL Editor

Open your Supabase Project Dashboard -> **SQL Editor** -> **New query**, and execute the SQL migration files in this **exact order**:

| Step | File Name | Purpose |
| :--- | :--- | :--- |
| **01** | `001_initial_schema.sql` | Enables `uuid-ossp`, `pgcrypto`, and sets up the reusable `update_updated_at_column()` trigger function. |
| **02** | `002_admin_auth_and_roles.sql` | Creates `admin_users` table linked to `auth.users`, role enum (`super_admin`, `editor`, `sales`), and security helper functions. |
| **03** | `003_products.sql` | Creates the `products` table with complete specifications, SEO fields, and view counters. |
| **04** | `004_categories.sql` | Creates `categories` table and binds foreign key relationship to `products`. |
| **05** | `005_website_content.sql` | Creates `website_content` table for structured, safe CMS section editing. |
| **06** | `006_enquiries_and_crm.sql` | Creates `customers` and `enquiries` tables for commercial lead management and CRM tracking. |
| **07** | `007_chatbot_knowledge_base.sql` | Creates `chatbot_knowledge` table to power the AI Assistant (+1 7111647464). |
| **08** | `008_website_settings.sql` | Creates `website_settings` and `activity_logs` tables for audit logging and system settings. |
| **09** | `009_storage_buckets.sql` | Configures Supabase Storage buckets (`products`, `website-assets`, `categories`, `documents`) with file size/MIME limits and RLS policies. |
| **10** | `010_row_level_security.sql` | Implements least-privilege Row Level Security across all 9 public tables. |
| **11** | `011_indexes_and_performance.sql` | Builds B-Tree performance indexes on slugs, published states, categories, and foreign keys. |
| **12** | `012_seed_initial_data.sql` | Seeds initial category ("Dehydrated Products"), all 4 initial products, default settings, and chatbot knowledge articles. |
| **13** | `013_fix_admin_authentication.sql` | Hardened RLS policies on `admin_users`, enabling authenticated users to read their own profile without circular dependencies, and sets `search_path = public` on SECURITY DEFINER functions. |

---

## 2. Environment Configuration

1. In your local workspace, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the required environment variables:
   ```env
   # From Supabase Dashboard -> Project Settings -> API
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-public-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-secret-key>

   # Initial Administrator Provisioning
   ADMIN_BOOTSTRAP_EMAIL=info@athangimpex.in
   ADMIN_BOOTSTRAP_PASSWORD=ChooseAStrongPassword123!

   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

> **SECURITY NOTE**: Never commit `.env.local` to Git. The service role key is strictly for server-side operations and is never bundled in client code.

---

## 3. Administrator Account Provisioning & Synchronization

To provision or re-synchronize the administrator credentials with your environment variables:

```bash
npm run admin:bootstrap
```

This runs `scripts/bootstrap-admin.mjs` directly in a secure server-side Node environment, which:
1. Queries Supabase Auth via `auth.admin.listUsers()`.
2. Creates the `info@athangimpex.in` account in `auth.users` if missing, or synchronizes its password if already existing.
3. Automatically confirms the email address.
4. Creates or updates the corresponding row in `public.admin_users` with role `super_admin` and `is_active = true`.
5. Tests authentication with `signInWithPassword()` to guarantee immediate readiness.

Once provisioned, administrators log in at:
* Local: `http://localhost:3000/admin`
* Production: `https://athangimpex.in/admin`
