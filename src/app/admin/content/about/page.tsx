"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Eye, CheckCircle2, AlertCircle } from "lucide-react";

export default function AboutUsCMSEditor() {
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [content, setContent] = useState({
    pageHeading: "About ATHANG IMPEX",
    tagline: "ATHANG IMPEX is an India-based merchant export company focused on connecting quality food ingredients with businesses around the world.",
    storyParagraph1: "Our business approach is built around product sourcing, understanding buyer requirements, professional communication, and developing long-term relationships.",
    storyParagraph2: "With a focus on dehydrated food ingredients, we aim to make sourcing from India a professional and straightforward experience for international buyers.",
    vision: "To establish ATHANG IMPEX as a trusted name in international food ingredient trading.",
    mission: "To connect businesses with quality food ingredients through responsible sourcing, professional communication, and customer-focused business relationships.",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("website_content")
          .select("content")
          .eq("section_key", "about_data")
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
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { error } = await supabase.from("website_content").upsert(
        {
          section_key: "about_data",
          page_name: "about",
          title: "About Us Content",
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
              About Us Page Content
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/about"
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
          <span>About Us content saved successfully!</span>
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
            Positioning Tagline
          </label>
          <input
            type="text"
            value={content.tagline}
            onChange={(e) => setContent({ ...content, tagline: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
            Story Paragraph 1
          </label>
          <textarea
            rows={3}
            value={content.storyParagraph1}
            onChange={(e) => setContent({ ...content, storyParagraph1: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
            Story Paragraph 2
          </label>
          <textarea
            rows={3}
            value={content.storyParagraph2}
            onChange={(e) => setContent({ ...content, storyParagraph2: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
              Vision Statement
            </label>
            <textarea
              rows={3}
              value={content.vision}
              onChange={(e) => setContent({ ...content, vision: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
              Mission Statement
            </label>
            <textarea
              rows={3}
              value={content.mission}
              onChange={(e) => setContent({ ...content, mission: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
