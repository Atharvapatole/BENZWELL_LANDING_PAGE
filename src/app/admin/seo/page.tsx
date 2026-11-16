"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  SearchCheck,
  Save,
  CheckCircle2,
  ExternalLink,
  Globe,
  Share2,
  FileCode,
  AlertCircle,
} from "lucide-react";

export default function AdminSEOPage() {
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "ATHANG IMPEX | Indian Dehydrated Food Ingredients Exporter",
    siteDescription:
      "Explore ATHANG IMPEX, an Indian merchant exporter of dehydrated onion powder, onion flakes, tomato powder, and ginger powder for international food manufacturers and importers.",
    keywords:
      "Dehydrated onion powder exporter India, Dehydrated onion flakes supplier India, Dehydrated tomato powder exporter, Dehydrated ginger powder exporter, Indian food ingredients exporter",
    ogImage: "/images/hero/hero-ingredients.svg",
    robotsIndex: true,
  });

  useEffect(() => {
    async function loadSEO() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("website_settings")
          .select("value")
          .eq("key", "seo")
          .single();
        if (data && data.value) {
          setSeoSettings((prev) => ({ ...prev, ...data.value }));
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadSEO();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const supabase = createClient();
      await supabase.from("website_settings").upsert(
        {
          key: "seo",
          category: "seo",
          value: seoSettings,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" }
      );
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
            Search Visibility
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
            SEO & Social Metadata Manager
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Manage global search indexability, title tags, canonical URLs, and social sharing previews
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
        >
          <Save className="w-3.5 h-3.5 text-gold" />
          <span>{saving ? "Saving..." : "Save SEO Settings"}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>SEO settings updated successfully!</span>
        </div>
      )}

      {/* Crawl Infrastructure Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-charcoal-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-forest-50 text-forest flex items-center justify-center">
              <FileCode className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="font-bold text-xs text-forest">Dynamic XML Sitemap</p>
              <p className="text-[11px] text-charcoal-muted font-mono">/sitemap.xml</p>
            </div>
          </div>
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="p-1.5 text-xs text-forest hover:text-gold flex items-center gap-1 font-semibold"
          >
            <span>Inspect</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white p-4 rounded-lg border border-charcoal-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-forest-50 text-forest flex items-center justify-center">
              <Globe className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="font-bold text-xs text-forest">Search Engine Crawler Rules</p>
              <p className="text-[11px] text-charcoal-muted font-mono">/robots.txt</p>
            </div>
          </div>
          <Link
            href="/robots.txt"
            target="_blank"
            className="p-1.5 text-xs text-forest hover:text-gold flex items-center gap-1 font-semibold"
          >
            <span>Inspect</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Global Meta Fields */}
      <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4 text-xs">
        <h3 className="font-serif text-lg font-bold text-forest border-b border-charcoal-border/50 pb-2">
          Global Default Metadata
        </h3>

        <div>
          <label className="block font-semibold uppercase tracking-wider mb-1">
            Site Default Title Tag
          </label>
          <input
            type="text"
            value={seoSettings.siteTitle}
            onChange={(e) =>
              setSeoSettings({ ...seoSettings, siteTitle: e.target.value })
            }
            className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal text-sm"
          />
          <p className="text-[11px] text-charcoal-muted mt-1">
            Character length: {seoSettings.siteTitle.length} (Recommended: 50-60 characters)
          </p>
        </div>

        <div>
          <label className="block font-semibold uppercase tracking-wider mb-1">
            Meta Description
          </label>
          <textarea
            rows={3}
            value={seoSettings.siteDescription}
            onChange={(e) =>
              setSeoSettings({
                ...seoSettings,
                siteDescription: e.target.value,
              })
            }
            className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal leading-relaxed"
          />
          <p className="text-[11px] text-charcoal-muted mt-1">
            Character length: {seoSettings.siteDescription.length} (Recommended: 140-160 characters)
          </p>
        </div>

        <div>
          <label className="block font-semibold uppercase tracking-wider mb-1">
            Target Search Keywords
          </label>
          <input
            type="text"
            value={seoSettings.keywords}
            onChange={(e) =>
              setSeoSettings({ ...seoSettings, keywords: e.target.value })
            }
            className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
          />
        </div>

        <div>
          <label className="block font-semibold uppercase tracking-wider mb-1">
            Default Social Sharing / Open Graph Image URL
          </label>
          <input
            type="text"
            value={seoSettings.ogImage}
            onChange={(e) =>
              setSeoSettings({ ...seoSettings, ogImage: e.target.value })
            }
            className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal font-mono"
          />
        </div>
      </div>

      {/* Social Search Snippet Simulator */}
      <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
        <h3 className="font-serif text-lg font-bold text-forest flex items-center gap-2">
          <Share2 className="w-4 h-4 text-gold" />
          <span>Google Search SERP Preview</span>
        </h3>

        <div className="p-4 bg-ivory-50 rounded-lg border border-charcoal-border/70 max-w-xl space-y-1">
          <p className="text-[11px] text-emerald-800 font-mono">
            https://athangimpex.in
          </p>
          <h4 className="text-base text-blue-900 font-medium hover:underline cursor-pointer">
            {seoSettings.siteTitle}
          </h4>
          <p className="text-xs text-charcoal-light leading-relaxed">
            {seoSettings.siteDescription}
          </p>
        </div>
      </div>
    </form>
  );
}
