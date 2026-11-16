export type AdminRole = "super_admin" | "editor" | "sales";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login_at?: string | null;
}

export interface DbCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductSpecification {
  parameter: string;
  value: string;
}

export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  short_description: string;
  full_description: string;
  image: string;
  gallery_images: string[];
  category_id?: string | null;
  category_name?: string;
  key_characteristics: string[];
  common_applications: string[];
  packaging_options: string[];
  features: string[];
  specifications_notes: string;
  specifications?: ProductSpecification[];
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  og_image: string;
  is_published: boolean;
  is_featured: boolean;
  display_order: number;
  scheduled_at?: string | null;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export type EnquiryStatus =
  | "new"
  | "contacted"
  | "interested"
  | "negotiation"
  | "converted"
  | "closed"
  | "spam";

export interface DbEnquiry {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone_number: string;
  country: string;
  product_interest: string;
  product_id?: string | null;
  customer_id?: string | null;
  message: string;
  source: string;
  status: EnquiryStatus;
  internal_notes: string;
  assigned_admin?: string | null;
  ip_address?: string;
  created_at: string;
  updated_at: string;
}

export interface DbCustomer {
  id: string;
  customer_name: string;
  company: string;
  country: string;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface DbChatbotKnowledge {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string;
  summary: string;
  tags: string[];
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbWebsiteContent {
  id: string;
  section_key: string;
  page_name: string;
  title: string;
  content: Record<string, any>;
  draft_content?: Record<string, any> | null;
  is_published: boolean;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbWebsiteSetting {
  key: string;
  value: Record<string, any>;
  category: string;
  description: string;
  updated_by?: string | null;
  updated_at: string;
}

export interface DbActivityLog {
  id: string;
  user_id?: string | null;
  user_email: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details: Record<string, any>;
  ip_address?: string;
  created_at: string;
}
