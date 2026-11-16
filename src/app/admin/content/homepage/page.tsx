"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Save,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Home,
  Layers,
  Sparkles,
  ShieldCheck,
  Send,
  MessageCircle,
  Package,
  Globe2,
  FileText,
  RotateCcw,
} from "lucide-react";

interface HomepageContent {
  // Hero
  heroHeading: string;
  heroSubtitle: string;
  heroTrustLabel: string;
  heroPrimaryCtaText: string;
  heroPrimaryCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  heroImage: string;

  // Intro
  introBadge: string;
  introHeading: string;
  introBody: string;

  // Featured Products
  productsBadge: string;
  productsHeading: string;
  productsSubtitle: string;

  // Why Choose Us
  whyChooseBadge: string;
  whyChooseHeading: string;
  whyChooseSubtitle: string;

  // Applications
  appsBadge: string;
  appsHeading: string;
  appsSubtitle: string;

  // Export Capabilities
  exportBadge: string;
  exportHeading: string;
  exportSubtitle: string;

  // B2B Sales Banner
  bannerHeading: string;
  bannerBody: string;

  // AI Chatbot Promo
  chatbotHeading: string;
  chatbotBody: string;

  // Final CTA
  finalCtaHeading: string;
  finalCtaBody: string;
}

const DEFAULT_CONTENT: HomepageContent = {
  heroHeading: "Quality Food Ingredients.\nConnecting India to the World.",
  heroSubtitle:
    "ATHANG IMPEX is an Indian merchant export company focused on sourcing and supplying quality dehydrated food ingredients for international buyers and businesses.",
  heroTrustLabel: "INDIAN FOOD INGREDIENTS EXPORTER",
  heroPrimaryCtaText: "Explore Our Products",
  heroPrimaryCtaLink: "/products",
  heroSecondaryCtaText: "Discuss Your Requirements",
  heroSecondaryCtaLink: "/contact",
  heroImage: "/images/hero/hero-container-ship.jpg",

  introBadge: "Who We Are",
  introHeading: "Your Partner in Food Ingredient Exports",
  introBody:
    "At ATHANG IMPEX, we connect global businesses with quality Indian food ingredients. Our focus is on sourcing, product consistency, professional communication, and building long-term international business relationships.",

  productsBadge: "Product Portfolio",
  productsHeading: "Our Product Range",
  productsSubtitle: "Explore our selection of dehydrated food ingredients.",

  whyChooseBadge: "Core Principles",
  whyChooseHeading: "Built Around Quality. Driven by Trust.",
  whyChooseSubtitle:
    "We operate as a committed merchant exporter focused on transparency, diligence, and long-term trading relationships.",

  appsBadge: "Versatile Uses",
  appsHeading: "Ingredients for Multiple Industries",
  appsSubtitle:
    "Dehydrated onion, tomato, and ginger powders and flakes are essential across modern industrial and culinary formulations.",

  exportBadge: "Global Trade Coordination",
  exportHeading: "Connecting Quality Products with Global Markets",
  exportSubtitle:
    "ATHANG IMPEX works with international buyers seeking dependable sourcing of Indian dehydrated food ingredients. We focus on understanding product specifications, packaging requirements, and export-related business needs.",

  bannerHeading: "Looking for a Reliable Food Ingredient Export Partner?",
  bannerBody:
    "Tell us about your product requirements and our team will connect with you.",

  chatbotHeading: "Want to Know More About ATHANG IMPEX?",
  chatbotBody:
    "Meet our AI-powered company assistant. Explore our company, understand our products, and discover our business capabilities through a simple WhatsApp conversation.",

  finalCtaHeading: "Let's Build a Stronger Business Connection.",
  finalCtaBody:
    "Connect with ATHANG IMPEX to discuss your food ingredient sourcing requirements.",
};

export default function HomepageCMSEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<
    "hero" | "intro" | "products" | "principles" | "logistics" | "ctas" | "preview"
  >("hero");

  const [content, setContent] = useState<HomepageContent>(DEFAULT_CONTENT);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    async function loadContent() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("website_content")
          .select("content, draft_content, updated_at")
          .eq("section_key", "homepage_data")
          .maybeSingle();

        if (data) {
          if (data.draft_content && Object.keys(data.draft_content).length > 0) {
            setContent({ ...DEFAULT_CONTENT, ...data.draft_content });
            setHasDraft(true);
          } else if (data.content && Object.keys(data.content).length > 0) {
            setContent({ ...DEFAULT_CONTENT, ...data.content });
          }
        }
      } catch (err) {
        console.error("Error loading homepage CMS:", err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  const handlePublish = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSaveSuccess(null);
    setErrorMsg("");

    try {
      const supabase = createClient();

      // 1. Upsert live content
      const { error } = await supabase.from("website_content").upsert(
        {
          section_key: "homepage_data",
          page_name: "homepage",
          title: "Homepage Primary Content",
          content,
          draft_content: null,
          is_published: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section_key" }
      );

      if (error) throw error;

      // 2. Log activity
      await supabase.from("activity_logs").insert({
        action: "CONTENT_UPDATED",
        resource_type: "content",
        resource_id: "homepage_data",
        details: { page: "homepage", status: "published" },
      });

      // 3. Revalidate App Router Cache
      try {
        const res = await fetch("/api/admin/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: "/" }),
        });
        const json = await res.json();
        if (json.success) {
          setSaveSuccess("Changes published live! The public homepage cache has been refreshed.");
        } else {
          setSaveSuccess("Changes saved and published in database.");
        }
      } catch {
        setSaveSuccess("Changes published in database.");
      }

      setHasDraft(false);
      setTimeout(() => setSaveSuccess(null), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to publish content.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setSavingDraft(true);
    setSaveSuccess(null);
    setErrorMsg("");

    try {
      const supabase = createClient();

      const { error } = await supabase.from("website_content").upsert(
        {
          section_key: "homepage_data",
          page_name: "homepage",
          title: "Homepage Primary Content",
          draft_content: content,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section_key" }
      );

      if (error) throw error;

      setHasDraft(true);
      setSaveSuccess("Draft saved successfully. Your edits are preserved privately until published.");
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save draft.");
    } finally {
      setSavingDraft(false);
    }
  };

  const handleResetToPublished = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data } = await supabase
        .from("website_content")
        .select("content")
        .eq("section_key", "homepage_data")
        .maybeSingle();

      if (data?.content) {
        setContent({ ...DEFAULT_CONTENT, ...data.content });
        setHasDraft(false);
        setSaveSuccess("Reset to live published version.");
        setTimeout(() => setSaveSuccess(null), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <RefreshCw className="w-6 h-6 animate-spin text-forest mx-auto mb-2" />
        <p className="text-xs text-charcoal-muted">Loading Homepage CMS Content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/content"
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Content Management System
              </span>
              {hasDraft && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Unpublished Draft
                </span>
              )}
            </div>
            <h1 className="font-serif text-2xl font-bold text-forest">
              Homepage Content Editor
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {hasDraft && (
            <button
              type="button"
              onClick={handleResetToPublished}
              className="inline-flex items-center gap-1 px-3 py-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-xs font-medium text-charcoal-muted hover:text-charcoal transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard Draft</span>
            </button>
          )}

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-xs font-medium text-charcoal transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-forest" />
            <span>View Public Site</span>
          </Link>

          <button
            type="button"
            disabled={savingDraft || saving}
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ivory-100 hover:bg-ivory-200 border border-charcoal-border rounded text-xs font-semibold uppercase tracking-wider text-forest transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-forest" />
            <span>{savingDraft ? "Saving..." : "Save Draft"}</span>
          </button>

          <button
            type="button"
            disabled={saving || savingDraft}
            onClick={() => handlePublish()}
            className="inline-flex items-center gap-2 px-5 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-gold" />
            <span>{saving ? "Publishing..." : "Publish Live Changes"}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-medium">{saveSuccess}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-charcoal-border/70 space-x-2 text-xs font-semibold overflow-x-auto pb-px">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap ${
            activeTab === "hero"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          1. Hero Section
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("intro")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap ${
            activeTab === "intro"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          2. Company Intro
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap ${
            activeTab === "products"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          3. Products Teaser
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("principles")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap ${
            activeTab === "principles"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          4. Why Choose Us
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("logistics")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap ${
            activeTab === "logistics"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          5. Logistics & Apps
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("ctas")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap ${
            activeTab === "ctas"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          6. Sales & Chatbot CTAs
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "preview"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-gold" />
          <span>Live Public Preview</span>
        </button>
      </div>

      {/* TAB 1: HERO */}
      {activeTab === "hero" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Section A</span>
            <h3 className="font-serif text-lg font-bold text-forest">Hero Section Configuration</h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              The primary landing banner communicating international merchant exporting authority and product focus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Trust Badge Label
              </label>
              <input
                type="text"
                value={content.heroTrustLabel}
                onChange={(e) => setContent({ ...content, heroTrustLabel: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Hero Background Image URL (Container Ship / Maritime Logistics)
              </label>
              <input
                type="text"
                value={content.heroImage}
                onChange={(e) => setContent({ ...content, heroImage: e.target.value })}
                placeholder="/images/hero/hero-container-ship.jpg"
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Hero Main Heading (Use new line for editorial break)
            </label>
            <textarea
              rows={2}
              value={content.heroHeading}
              onChange={(e) => setContent({ ...content, heroHeading: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal font-serif font-bold leading-relaxed focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Hero Supporting Subtitle
            </label>
            <textarea
              rows={3}
              value={content.heroSubtitle}
              onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal leading-relaxed focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Primary CTA Button Label
              </label>
              <input
                type="text"
                value={content.heroPrimaryCtaText}
                onChange={(e) => setContent({ ...content, heroPrimaryCtaText: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Secondary CTA Button Label
              </label>
              <input
                type="text"
                value={content.heroSecondaryCtaText}
                onChange={(e) => setContent({ ...content, heroSecondaryCtaText: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTRO */}
      {activeTab === "intro" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Section B</span>
            <h3 className="font-serif text-lg font-bold text-forest">Company Introduction</h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Narrative introducing ATHANG IMPEX&apos;s role as an Indian merchant exporter connecting global markets.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Section Tag / Badge
            </label>
            <input
              type="text"
              value={content.introBadge}
              onChange={(e) => setContent({ ...content, introBadge: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Introduction Heading
            </label>
            <input
              type="text"
              value={content.introHeading}
              onChange={(e) => setContent({ ...content, introHeading: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal font-serif font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Introduction Body Paragraph
            </label>
            <textarea
              rows={4}
              value={content.introBody}
              onChange={(e) => setContent({ ...content, introBody: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal leading-relaxed focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCTS TEASER */}
      {activeTab === "products" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Section C</span>
            <h3 className="font-serif text-lg font-bold text-forest">Product Catalogue Teaser</h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Header introducing the 4 core export products (Dehydrated Onion Powder, Flakes, Tomato Powder, Ginger Powder).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Section Badge
              </label>
              <input
                type="text"
                value={content.productsBadge}
                onChange={(e) => setContent({ ...content, productsBadge: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Section Heading
              </label>
              <input
                type="text"
                value={content.productsHeading}
                onChange={(e) => setContent({ ...content, productsHeading: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal font-serif font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Section Supporting Subtitle
            </label>
            <input
              type="text"
              value={content.productsSubtitle}
              onChange={(e) => setContent({ ...content, productsSubtitle: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
        </div>
      )}

      {/* TAB 4: PRINCIPLES */}
      {activeTab === "principles" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Section D</span>
            <h3 className="font-serif text-lg font-bold text-forest">Why Choose Us (Principles & Trust)</h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              The four foundational pillars of ATHANG IMPEX: Quality Sourcing, Product Expertise, International Approach, and Customer Communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Section Badge
              </label>
              <input
                type="text"
                value={content.whyChooseBadge}
                onChange={(e) => setContent({ ...content, whyChooseBadge: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Section Heading
              </label>
              <input
                type="text"
                value={content.whyChooseHeading}
                onChange={(e) => setContent({ ...content, whyChooseHeading: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal font-serif font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Section Supporting Subtitle
            </label>
            <input
              type="text"
              value={content.whyChooseSubtitle}
              onChange={(e) => setContent({ ...content, whyChooseSubtitle: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
        </div>
      )}

      {/* TAB 5: LOGISTICS & APPLICATIONS */}
      {activeTab === "logistics" && (
        <div className="space-y-6">
          {/* Applications */}
          <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Section E</span>
            <h3 className="font-serif text-lg font-bold text-forest">Food Industry Applications</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  Badge
                </label>
                <input
                  type="text"
                  value={content.appsBadge}
                  onChange={(e) => setContent({ ...content, appsBadge: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  Heading
                </label>
                <input
                  type="text"
                  value={content.appsHeading}
                  onChange={(e) => setContent({ ...content, appsHeading: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal font-serif font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Subtitle
              </label>
              <textarea
                rows={2}
                value={content.appsSubtitle}
                onChange={(e) => setContent({ ...content, appsSubtitle: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>

          {/* Export Capabilities */}
          <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Section F</span>
            <h3 className="font-serif text-lg font-bold text-forest">Export Capabilities & Maritime Trade</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  Badge
                </label>
                <input
                  type="text"
                  value={content.exportBadge}
                  onChange={(e) => setContent({ ...content, exportBadge: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  Heading
                </label>
                <input
                  type="text"
                  value={content.exportHeading}
                  onChange={(e) => setContent({ ...content, exportHeading: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal font-serif font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Subtitle / Narrative
              </label>
              <textarea
                rows={3}
                value={content.exportSubtitle}
                onChange={(e) => setContent({ ...content, exportSubtitle: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CTAS & CHATBOT */}
      {activeTab === "ctas" && (
        <div className="space-y-6">
          {/* Sales Banner */}
          <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-forest" />
              <h3 className="font-serif text-base font-bold text-forest">
                Direct Sales Commercial Banner (+91 9923407176)
              </h3>
            </div>
            <p className="text-xs text-charcoal-muted">
              Reserved strictly for importer inquiries, pricing requests, bulk quotations, and commercial terms.
            </p>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Banner Heading
              </label>
              <input
                type="text"
                value={content.bannerHeading}
                onChange={(e) => setContent({ ...content, bannerHeading: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Banner Description
              </label>
              <textarea
                rows={2}
                value={content.bannerBody}
                onChange={(e) => setContent({ ...content, bannerBody: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>

          {/* Chatbot Promo */}
          <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-gold" />
              <h3 className="font-serif text-base font-bold text-forest">
                ATHANG IMPEX AI Chatbot Card (+1 7111647464)
              </h3>
            </div>
            <p className="text-xs text-charcoal-muted">
              Introduces company overview and product information. Never commits to MOQ or prices.
            </p>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Chatbot Card Heading
              </label>
              <input
                type="text"
                value={content.chatbotHeading}
                onChange={(e) => setContent({ ...content, chatbotHeading: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Chatbot Card Description
              </label>
              <textarea
                rows={2}
                value={content.chatbotBody}
                onChange={(e) => setContent({ ...content, chatbotBody: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
            <h3 className="font-serif text-base font-bold text-forest">
              Bottom Closing Call To Action
            </h3>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Final Heading
              </label>
              <input
                type="text"
                value={content.finalCtaHeading}
                onChange={(e) => setContent({ ...content, finalCtaHeading: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Final Subtitle
              </label>
              <textarea
                rows={2}
                value={content.finalCtaBody}
                onChange={(e) => setContent({ ...content, finalCtaBody: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: LIVE SIMULATED PREVIEW */}
      {activeTab === "preview" && (
        <div className="space-y-6">
          <div className="bg-forest-900 text-ivory p-4 rounded-lg flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-gold uppercase tracking-wider">Live Customer View</span>
              <p className="text-gray-300 mt-0.5">Below is a responsive real-time representation of how your edits will render on the public website.</p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 bg-gold text-forest font-semibold rounded hover:bg-gold-light transition-colors"
            >
              Open Site in New Tab
            </Link>
          </div>

          {/* Simulated Hero */}
          <div className="relative bg-forest text-ivory rounded-xl overflow-hidden p-8 sm:p-12 border border-charcoal-border">
            <div className="absolute inset-0 z-0 opacity-20">
              <Image
                src={content.heroImage || "/images/hero/hero-container-ship.jpg"}
                alt="Hero Background"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 border border-gold/40 text-gold text-[10px] font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>{content.heroTrustLabel}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white whitespace-pre-line leading-tight">
                {content.heroHeading}
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {content.heroSubtitle}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gold text-forest font-semibold text-xs rounded uppercase tracking-wider">
                  {content.heroPrimaryCtaText}
                </span>
                <span className="px-4 py-2 bg-forest-800 text-white border border-ivory/20 font-semibold text-xs rounded uppercase tracking-wider">
                  {content.heroSecondaryCtaText}
                </span>
              </div>
            </div>
          </div>

          {/* Simulated Intro */}
          <div className="bg-ivory p-6 sm:p-8 rounded-xl border border-charcoal-border grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold-50 px-2 py-0.5 rounded border border-gold/30">
                {content.introBadge}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest">
                {content.introHeading}
              </h3>
              <p className="text-xs text-charcoal-light leading-relaxed">
                {content.introBody}
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-charcoal-border bg-forest">
              <Image
                src="/images/about/sourcing-agriculture.jpg"
                alt="Intro Sourcing"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Simulated CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-forest text-white p-5 rounded-lg border border-gold/30 space-y-2">
              <span className="text-[10px] font-bold uppercase text-gold">Commercial Sales WhatsApp</span>
              <h4 className="font-serif text-base font-bold text-white">{content.bannerHeading}</h4>
              <p className="text-xs text-gray-300">{content.bannerBody}</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-charcoal-border space-y-2">
              <span className="text-[10px] font-bold uppercase text-forest">AI Company Assistant</span>
              <h4 className="font-serif text-base font-bold text-forest">{content.chatbotHeading}</h4>
              <p className="text-xs text-charcoal-muted">{content.chatbotBody}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
