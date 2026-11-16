"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { DbChatbotKnowledge } from "@/types/database";
import { ArrowLeft, Save, CheckCircle2, AlertCircle } from "lucide-react";

interface FormProps {
  initialArticle?: DbChatbotKnowledge | null;
  isEditing?: boolean;
}

const CATEGORIES = [
  "Company Information",
  "About ATHANG IMPEX",
  "Dehydrated Onion Powder",
  "Dehydrated Onion Flakes",
  "Dehydrated Tomato Powder",
  "Dehydrated Ginger Powder",
  "Product Applications",
  "Sourcing",
  "Packaging",
  "Export Capabilities",
  "Frequently Asked Questions",
];

export default function ChatbotArticleForm({
  initialArticle,
  isEditing = false,
}: FormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialArticle?.title || "",
    slug: initialArticle?.slug || "",
    category: initialArticle?.category || "Company Information",
    summary: initialArticle?.summary || "",
    content: initialArticle?.content || "",
    tags: initialArticle?.tags?.join(", ") || "",
    display_order: initialArticle?.display_order || 0,
    is_published: initialArticle ? initialArticle.is_published : true,
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const updated = { ...prev, title: val };
      if (!isEditing && !prev.slug) {
        updated.slug = val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim() || !formData.content.trim()) {
      setErrorMsg("Title, slug, and content are required.");
      return;
    }

    setSaving(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim().toLowerCase(),
        category: formData.category,
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        display_order: Number(formData.display_order) || 0,
        is_published: formData.is_published,
        updated_at: new Date().toISOString(),
      };

      if (isEditing && initialArticle) {
        const { error } = await supabase
          .from("chatbot_knowledge")
          .update(payload)
          .eq("id", initialArticle.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("chatbot_knowledge").insert(payload);
        if (error) throw error;
      }

      router.push("/admin/chatbot");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save article.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/chatbot"
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Knowledge Base Editor
            </span>
            <h1 className="font-serif text-2xl font-bold text-forest">
              {formData.title || "Untitled Article"}
            </h1>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider"
        >
          <Save className="w-3.5 h-3.5 text-gold" />
          <span>{saving ? "Saving..." : "Save Knowledge Article"}</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Dehydrated Onion Powder Information"
              className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal text-sm"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="dehydrated-onion-powder-info"
              className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) =>
                setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
              }
              className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal font-mono"
            />
          </div>

          <div className="pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) =>
                  setFormData({ ...formData, is_published: e.target.checked })
                }
                className="rounded text-forest"
              />
              <span className="font-semibold text-forest">
                Active for Chatbot Retrieval
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block font-semibold uppercase tracking-wider mb-1">
            Short Summary / Key Takeaway
          </label>
          <input
            type="text"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="1-sentence summary of the article..."
            className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
          />
        </div>

        <div>
          <label className="block font-semibold uppercase tracking-wider mb-1">
            Knowledge Content Body <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={8}
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Detailed factual text that the AI assistant can reference when answering visitor inquiries..."
            className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal leading-relaxed font-sans text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold uppercase tracking-wider mb-1">
            Search Tags (Comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="onion, spices, packaging, certificates"
            className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
          />
        </div>
      </div>
    </form>
  );
}
