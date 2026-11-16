"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { DbProduct, DbCategory, ProductSpecification } from "@/types/database";
import { PRODUCTS } from "@/data/products";
import {
  Save,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  Layers,
  Sparkles,
  Package,
  SearchCheck,
  RefreshCw,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Table as TableIcon,
  RotateCcw,
} from "lucide-react";

interface ProductFormProps {
  initialProduct?: DbProduct | null;
  isEditing?: boolean;
}

function getInitialSpecs(initialProduct?: DbProduct | null): ProductSpecification[] {
  if (
    initialProduct?.specifications &&
    Array.isArray(initialProduct.specifications) &&
    initialProduct.specifications.length > 0
  ) {
    return initialProduct.specifications;
  }
  if (
    typeof initialProduct?.specifications_notes === "string" &&
    initialProduct.specifications_notes.trim().startsWith("[")
  ) {
    try {
      const parsed = JSON.parse(initialProduct.specifications_notes);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
  }
  if (initialProduct?.slug) {
    const fallback = PRODUCTS.find((p) => p.slug === initialProduct.slug);
    if (fallback?.specifications && fallback.specifications.length > 0) {
      return fallback.specifications;
    }
  }
  return [
    { parameter: "Product Name", value: initialProduct?.name || "Dehydrated Product" },
    { parameter: "Botanical Name", value: "" },
    { parameter: "Origin", value: "India" },
    { parameter: "Form", value: "Powder / Flakes" },
    { parameter: "Color", value: "" },
    { parameter: "Taste", value: "" },
    { parameter: "Aroma", value: "" },
    { parameter: "Moisture", value: "Available Upon Request" },
    { parameter: "Total Ash", value: "Available Upon Request" },
    { parameter: "Foreign Matter", value: "Nil" },
    { parameter: "Purity", value: "100% Natural" },
    { parameter: "Additives", value: "None" },
    { parameter: "GMO Status", value: "Non-GMO" },
    { parameter: "Shelf Life", value: "24 Months" },
    { parameter: "Storage", value: "Store in a Cool, Dry & Hygienic Place" },
  ];
}

export default function ProductForm({
  initialProduct,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "general" | "media" | "specs_table" | "specs" | "seo"
  >("general");

  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [specifications, setSpecifications] = useState<ProductSpecification[]>(
    () => getInitialSpecs(initialProduct)
  );

  const [formData, setFormData] = useState({
    name: initialProduct?.name || "",
    slug: initialProduct?.slug || "",
    tagline: initialProduct?.tagline || "",
    short_description: initialProduct?.short_description || "",
    full_description: initialProduct?.full_description || "",
    category_id: initialProduct?.category_id || "",
    category_name: initialProduct?.category_name || "Dehydrated Products",
    image: initialProduct?.image || "/images/products/dehydrated-onion-powder.jpg",
    gallery_images: initialProduct?.gallery_images?.join("\n") || "",
    key_characteristics:
      initialProduct?.key_characteristics?.join("\n") || "",
    common_applications:
      initialProduct?.common_applications?.join("\n") || "",
    packaging_options: initialProduct?.packaging_options?.join("\n") || "",
    features: initialProduct?.features?.join("\n") || "",
    specifications_notes:
      initialProduct?.specifications_notes ||
      "Product specifications, packaging options, minimum order quantities, and commercial terms can be discussed according to buyer requirements.",
    seo_title: initialProduct?.seo_title || "",
    seo_description: initialProduct?.seo_description || "",
    seo_keywords: initialProduct?.seo_keywords?.join(", ") || "",
    og_image: initialProduct?.og_image || "",
    is_published: initialProduct ? initialProduct.is_published : true,
    is_featured: initialProduct ? initialProduct.is_featured : false,
    display_order: initialProduct?.display_order || 0,
  });

  // Fetch categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("categories")
          .select("*")
          .order("display_order", { ascending: true });
        if (data) setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    }
    loadCategories();
  }, []);

  // Auto-generate slug from name if not editing
  const handleNameChange = (val: string) => {
    setFormData((prev) => {
      const updated = { ...prev, name: val };
      if (!isEditing && !prev.slug) {
        updated.slug = val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
      }
      return updated;
    });
  };

  // Specification Row Handlers
  const handleAddSpec = () => {
    setSpecifications((prev) => [...prev, { parameter: "", value: "" }]);
  };

  const handleRemoveSpec = (idx: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleMoveSpec = (idx: number, dir: "up" | "down") => {
    if (
      (dir === "up" && idx === 0) ||
      (dir === "down" && idx === specifications.length - 1)
    )
      return;
    const targetIdx = dir === "up" ? idx - 1 : idx + 1;
    setSpecifications((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  const handleSpecChange = (
    idx: number,
    field: "parameter" | "value",
    val: string
  ) => {
    setSpecifications((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleLoadPreset = (slug: string) => {
    const target = PRODUCTS.find((p) => p.slug === slug);
    if (target?.specifications && target.specifications.length > 0) {
      setSpecifications(target.specifications);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.slug.trim()) {
      setErrorMsg("Product name and URL slug are mandatory fields.");
      setActiveTab("general");
      return;
    }

    setSaveStatus("saving");
    setLoading(true);

    try {
      const supabase = createClient();

      const parseLines = (text: string) =>
        text
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);

      const cleanSpecs = specifications.filter(
        (s) => s.parameter.trim() !== "" || s.value.trim() !== ""
      );

      const payload: any = {
        name: formData.name.trim(),
        slug: formData.slug.trim().toLowerCase(),
        tagline: formData.tagline.trim(),
        short_description: formData.short_description.trim(),
        full_description: formData.full_description.trim(),
        category_id: formData.category_id || null,
        category_name: formData.category_name,
        image: formData.image.trim(),
        gallery_images: parseLines(formData.gallery_images),
        key_characteristics: parseLines(formData.key_characteristics),
        common_applications: parseLines(formData.common_applications),
        packaging_options: parseLines(formData.packaging_options),
        features: parseLines(formData.features),
        specifications_notes: JSON.stringify(cleanSpecs),
        specifications: cleanSpecs,
        seo_title: formData.seo_title.trim(),
        seo_description: formData.seo_description.trim(),
        seo_keywords: formData.seo_keywords
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        og_image: formData.og_image.trim(),
        is_published: formData.is_published,
        is_featured: formData.is_featured,
        display_order: Number(formData.display_order) || 0,
        updated_at: new Date().toISOString(),
      };

      if (isEditing && initialProduct) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", initialProduct.id);

        if (error) {
          if (error.message.includes("specifications")) {
            const fallbackPayload = { ...payload };
            delete fallbackPayload.specifications;
            const { error: retryErr } = await supabase
              .from("products")
              .update(fallbackPayload)
              .eq("id", initialProduct.id);
            if (retryErr) throw retryErr;
          } else {
            throw error;
          }
        }

        // Log edit activity
        await supabase.from("activity_logs").insert({
          action: "PRODUCT_UPDATED",
          resource_type: "product",
          resource_id: initialProduct.id,
          details: { name: payload.name, slug: payload.slug },
        });
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert(payload)
          .select()
          .single();

        if (error) {
          if (error.message.includes("specifications")) {
            const fallbackPayload = { ...payload };
            delete fallbackPayload.specifications;
            const { data: retryData, error: retryErr } = await supabase
              .from("products")
              .insert(fallbackPayload)
              .select()
              .single();
            if (retryErr) throw retryErr;
          } else {
            throw error;
          }
        }

        // Log creation activity
        await supabase.from("activity_logs").insert({
          action: "PRODUCT_CREATED",
          resource_type: "product",
          resource_id: data?.id,
          details: { name: payload.name, slug: payload.slug },
        });
      }

      // Sync into website_content for extra CMS redundancy
      await supabase.from("website_content").upsert(
        {
          section_key: `product_specs_${payload.slug}`,
          page_name: `product_${payload.slug}`,
          title: `Specifications - ${payload.name}`,
          content: { specifications: cleanSpecs },
          is_published: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section_key" }
      );

      // Trigger Next.js cache revalidation for this product
      fetch("/api/admin/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: `/products/${payload.slug}` }),
      }).catch(() => {});

      setSaveStatus("saved");
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 500);
    } catch (err: any) {
      setSaveStatus("error");
      setErrorMsg(err.message || "Failed to save product. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal-light hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              {isEditing ? "Edit Product" : "New Product Entry"}
            </span>
            <h1 className="font-serif text-2xl font-bold text-forest">
              {formData.name || "Untitled Product"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus === "saving" && (
            <span className="text-xs text-charcoal-muted flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-gold" />
              <span>Saving...</span>
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Saved!</span>
            </span>
          )}

          {isEditing && formData.slug && (
            <Link
              href={`/products/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-xs font-medium text-charcoal transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-forest" />
              <span>Preview</span>
            </Link>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-gold" />
            <span>{isEditing ? "Save Changes" : "Publish Product"}</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-charcoal-border/70 space-x-2 text-xs font-semibold overflow-x-auto pb-px">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap ${
            activeTab === "general"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          General & Descriptions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("media")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap ${
            activeTab === "media"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          Media & Imagery
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("specs_table")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "specs_table"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          <TableIcon className="w-3.5 h-3.5 text-gold" />
          <span>Product Specifications ({specifications.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap ${
            activeTab === "specs"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          Characteristics & Applications
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap ${
            activeTab === "seo"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          SEO & Social Metadata
        </button>
      </div>

      {/* Tab 1: General */}
      {activeTab === "general" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Dehydrated Onion Powder"
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-xs bg-ivory-100 border border-r-0 border-charcoal-border rounded-l text-charcoal-muted font-mono">
                  /products/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="dehydrated-onion-powder"
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded-r text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Tagline / Subheading
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) =>
                setFormData({ ...formData, tagline: e.target.value })
              }
              placeholder="e.g. Fine dehydrated onion powder for global food processing..."
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => {
                  const sel = categories.find((c) => c.id === e.target.value);
                  setFormData({
                    ...formData,
                    category_id: e.target.value,
                    category_name: sel?.name || "Dehydrated Products",
                  });
                }}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    display_order: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) =>
                    setFormData({ ...formData, is_published: e.target.checked })
                  }
                  className="rounded text-forest"
                />
                <span className="text-xs font-semibold text-forest">
                  Published
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) =>
                    setFormData({ ...formData, is_featured: e.target.checked })
                  }
                  className="rounded text-gold"
                />
                <span className="text-xs font-semibold text-charcoal">
                  Featured
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Short Description (Card Summary)
            </label>
            <textarea
              rows={2}
              value={formData.short_description}
              onChange={(e) =>
                setFormData({ ...formData, short_description: e.target.value })
              }
              placeholder="1-2 sentences for product catalog cards..."
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Full Product Description
            </label>
            <textarea
              rows={6}
              value={formData.full_description}
              onChange={(e) =>
                setFormData({ ...formData, full_description: e.target.value })
              }
              placeholder="Detailed export overview, origin, drying method, and culinary behaviour..."
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Media */}
      {activeTab === "media" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-5">
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Main Product Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="/images/products/onion-powder.svg"
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest font-mono text-xs"
            />
            {formData.image && (
              <div className="mt-3 relative w-32 h-24 rounded border border-charcoal-border overflow-hidden bg-ivory-100">
                <Image
                  src={formData.image}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Additional Gallery Images (One URL per line)
            </label>
            <textarea
              rows={4}
              value={formData.gallery_images}
              onChange={(e) =>
                setFormData({ ...formData, gallery_images: e.target.value })
              }
              placeholder="/images/products/onion-powder-detail.svg&#10;/images/products/onion-powder-field.svg"
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest font-mono text-xs"
            />
            <p className="text-[11px] text-charcoal-muted mt-1">
              You can also upload images directly in the Media Library tab and paste URLs here.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Dedicated Product Technical Specifications Table */}
      {activeTab === "specs_table" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/50 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  Technical Data Sheet Editor
                </span>
                <h3 className="font-serif text-lg font-bold text-forest">
                  Product Technical Specifications
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5 max-w-2xl">
                  Configure the technical parameters displayed in the structured technical specification table on the public product page. International buyers use these parameters for customs clearance, quality assurance, and laboratory validation.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-forest/10 text-forest font-semibold text-xs font-mono">
                  {specifications.length} Parameters
                </span>
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest text-white rounded text-xs font-medium hover:bg-forest-700 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-gold" />
                  <span>Add Row</span>
                </button>
              </div>
            </div>

            {/* Presets Toolbar */}
            <div className="p-3 bg-ivory-100/80 rounded border border-charcoal-border/50 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-charcoal-muted font-medium flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-gold" />
                <span>Quick Standard Presets:</span>
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleLoadPreset("dehydrated-onion-flakes")}
                  className="px-2.5 py-1 bg-white hover:bg-ivory border border-charcoal-border rounded text-[11px] text-charcoal font-medium transition-colors"
                >
                  Onion Flakes (18 params)
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadPreset("dehydrated-onion-powder")}
                  className="px-2.5 py-1 bg-white hover:bg-ivory border border-charcoal-border rounded text-[11px] text-charcoal font-medium transition-colors"
                >
                  Onion Powder Preset
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadPreset("dehydrated-tomato-powder")}
                  className="px-2.5 py-1 bg-white hover:bg-ivory border border-charcoal-border rounded text-[11px] text-charcoal font-medium transition-colors"
                >
                  Tomato Powder Preset
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadPreset("dehydrated-ginger-powder")}
                  className="px-2.5 py-1 bg-white hover:bg-ivory border border-charcoal-border rounded text-[11px] text-charcoal font-medium transition-colors"
                >
                  Ginger Powder Preset
                </button>
                <button
                  type="button"
                  onClick={() => setSpecifications([])}
                  className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded text-[11px] text-red-700 font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Specifications Row Editor Table */}
            {specifications.length === 0 ? (
              <div className="p-8 text-center rounded border border-dashed border-charcoal-border bg-ivory-50">
                <TableIcon className="w-8 h-8 text-charcoal-muted mx-auto mb-2 opacity-50" />
                <p className="text-xs text-charcoal font-medium">No specification parameters added yet.</p>
                <p className="text-[11px] text-charcoal-muted mt-1">Click &quot;Add Row&quot; or choose a standard preset above to populate the technical parameters.</p>
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest text-white rounded text-xs font-medium hover:bg-forest-700"
                >
                  <Plus className="w-3.5 h-3.5 text-gold" />
                  <span>Add First Parameter</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="grid grid-cols-12 gap-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-4 sm:col-span-4">Parameter Name</div>
                  <div className="col-span-5 sm:col-span-5">Specification / Export Standard</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                {specifications.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-2 sm:gap-3 items-center p-2.5 bg-ivory-50 hover:bg-ivory-100/70 border border-charcoal-border/70 rounded transition-colors"
                  >
                    <div className="col-span-1 text-center font-mono text-xs text-charcoal-muted font-bold">
                      {idx + 1}
                    </div>

                    <div className="col-span-4">
                      <input
                        type="text"
                        value={row.parameter}
                        onChange={(e) => handleSpecChange(idx, "parameter", e.target.value)}
                        placeholder="e.g. Moisture / Shelf Life"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-charcoal-border rounded text-charcoal font-medium focus:ring-1 focus:ring-forest focus:outline-none"
                      />
                    </div>

                    <div className="col-span-5">
                      <input
                        type="text"
                        value={row.value}
                        onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                        placeholder="e.g. Maximum 6% / 24 Months"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-charcoal-border rounded text-charcoal focus:ring-1 focus:ring-forest focus:outline-none"
                      />
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveSpec(idx, "up")}
                        title="Move Up"
                        className="p-1 rounded bg-white hover:bg-ivory border border-charcoal-border text-charcoal-muted hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === specifications.length - 1}
                        onClick={() => handleMoveSpec(idx, "down")}
                        title="Move Down"
                        className="p-1 rounded bg-white hover:bg-ivory border border-charcoal-border text-charcoal-muted hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(idx)}
                        title="Remove Parameter"
                        className="p-1 rounded bg-white hover:bg-red-50 border border-charcoal-border text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex justify-start">
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-ivory-100 hover:bg-ivory border border-charcoal-border rounded text-xs font-semibold text-forest transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-gold" />
                    <span>Add Another Parameter Row</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Customer-Facing Preview */}
          <div className="bg-white rounded-lg border border-charcoal-border overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 border-b border-charcoal-border/70 bg-stone-50 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold">
                  Live Public Preview
                </span>
                <h4 className="font-serif text-base font-bold text-forest">
                  Product Specifications ({formData.name || "Product Name"})
                </h4>
              </div>
              <span className="text-[11px] text-charcoal-muted">
                How this will appear on /products/{formData.slug || "slug"}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-forest text-ivory uppercase tracking-wider">
                    <th scope="col" className="py-2.5 px-4 font-semibold w-2/5">
                      Parameter
                    </th>
                    <th scope="col" className="py-2.5 px-4 font-semibold w-3/5">
                      Specification
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-border/40">
                  {specifications.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="py-6 text-center text-charcoal-muted">
                        No parameters defined. Add rows above to preview the specification table.
                      </td>
                    </tr>
                  ) : (
                    specifications.map((spec, sIdx) => (
                      <tr
                        key={sIdx}
                        className={
                          sIdx % 2 === 0
                            ? "bg-white hover:bg-ivory-50/70"
                            : "bg-ivory-50/50 hover:bg-ivory-100/60"
                        }
                      >
                        <td className="py-2.5 px-4 font-medium text-forest">
                          {spec.parameter || <span className="text-charcoal-muted italic">Unnamed parameter</span>}
                        </td>
                        <td className="py-2.5 px-4 text-charcoal-light">
                          {spec.value || <span className="text-charcoal-muted italic">Not specified</span>}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Characteristics & Applications */}
      {activeTab === "specs" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Key Characteristics (One per line)
              </label>
              <textarea
                rows={5}
                value={formData.key_characteristics}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    key_characteristics: e.target.value,
                  })
                }
                placeholder="Fine free-flowing dehydrated powder&#10;Characteristic pungent aroma&#10;No artificial fillers or starch"
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Common Applications (One per line)
              </label>
              <textarea
                rows={5}
                value={formData.common_applications}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    common_applications: e.target.value,
                  })
                }
                placeholder="Industrial Food Processing&#10;Spice Blends & Dry Rubs&#10;Snack Seasonings & Extruded Foods"
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Packaging Options (One per line)
              </label>
              <textarea
                rows={3}
                value={formData.packaging_options}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    packaging_options: e.target.value,
                  })
                }
                placeholder="Multi-wall paper bags with PE inner liner&#10;Corrugated cartons with heat-sealed liners"
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Quick Feature Badges (One per line)
              </label>
              <textarea
                rows={3}
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                placeholder="100% Pure Onion Origin&#10;High Dispersibility&#10;Export Grade Packing"
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Specifications & Commercial Details Callout Text
            </label>
            <input
              type="text"
              value={formData.specifications_notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specifications_notes: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
        </div>
      )}

      {/* Tab 4: SEO */}
      {activeTab === "seo" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-5">
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              SEO Title Tag
            </label>
            <input
              type="text"
              value={formData.seo_title}
              onChange={(e) =>
                setFormData({ ...formData, seo_title: e.target.value })
              }
              placeholder="e.g. Dehydrated Onion Powder Exporter India | ATHANG IMPEX"
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              SEO Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.seo_description}
              onChange={(e) =>
                setFormData({ ...formData, seo_description: e.target.value })
              }
              placeholder="Meta description for search engine result snippets..."
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Keywords (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.seo_keywords}
              onChange={(e) =>
                setFormData({ ...formData, seo_keywords: e.target.value })
              }
              placeholder="dehydrated onion powder exporter, indian food ingredients, bulk spices"
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
        </div>
      )}
    </form>
  );
}
