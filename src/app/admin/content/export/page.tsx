"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Eye, CheckCircle2 } from "lucide-react";

export default function ExportCMSEditor() {
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [content, setContent] = useState({
    pageHeading: "Your Gateway to Indian Food Ingredients",
    pageSubtitle: "ATHANG IMPEX works with international buyers seeking dependable sourcing of Indian dehydrated food ingredients. We focus on understanding product specifications, packaging requirements, and export-related business needs.",
    seaFreightNote: "Full container load (FCL) & consolidated shipments from major Indian ports.",
    airFreightNote: "Expedited air cargo coordination for urgent production schedules and sampling.",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("website_content")
          .select("content")
          .eq("section_key", "export_data")
          .single();
        if (data && data.content) {
          setContent((prev) => ({ ...prev, ...data.content }));
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("website_content").upsert(
        {
          section_key: "export_data",
          page_name: "export",
          title: "Export Capabilities Content",
          content,
          is_published: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section_key" }
      );
      if (error) throw error;
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/content"
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              CMS Editor
            </span>
            <h1 className="font-serif text-2xl font-bold text-forest">
              Export Capabilities Content
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/export-capabilities"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-xs font-medium text-charcoal"
          >
            <Eye className="w-3.5 h-3.5 text-forest" />
            <span>View Live</span>
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider"
          >
            <Save className="w-3.5 h-3.5 text-gold" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Export capabilities content saved successfully!</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
            Page Heading
          </label>
          <input
            type="text"
            value={content.pageHeading}
            onChange={(e) => setContent({ ...content, pageHeading: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal font-serif text-base"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
            Page Subtitle
          </label>
          <textarea
            rows={3}
            value={content.pageSubtitle}
            onChange={(e) => setContent({ ...content, pageSubtitle: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
              Sea Freight Note
            </label>
            <input
              type="text"
              value={content.seaFreightNote}
              onChange={(e) => setContent({ ...content, seaFreightNote: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
              Air Freight Note
            </label>
            <input
              type="text"
              value={content.airFreightNote}
              onChange={(e) => setContent({ ...content, airFreightNote: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
