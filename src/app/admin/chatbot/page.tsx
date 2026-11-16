"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { DbChatbotKnowledge } from "@/types/database";
import {
  Bot,
  Plus,
  Search,
  FileEdit,
  Trash2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Phone,
} from "lucide-react";

export default function AdminChatbotPage() {
  const [articles, setArticles] = useState<DbChatbotKnowledge[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
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

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("chatbot_knowledge")
        .select("*")
        .order("display_order", { ascending: true });

      if (data) setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const togglePublish = async (article: DbChatbotKnowledge) => {
    try {
      const supabase = createClient();
      const updated = !article.is_published;
      await supabase
        .from("chatbot_knowledge")
        .update({ is_published: updated, updated_at: new Date().toISOString() })
        .eq("id", article.id);

      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, is_published: updated } : a))
      );
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDelete = async (article: DbChatbotKnowledge) => {
    if (!confirm(`Delete knowledge article "${article.title}"?`)) return;
    try {
      const supabase = createClient();
      await supabase.from("chatbot_knowledge").delete().eq("id", article.id);
      setArticles((prev) => prev.filter((a) => a.id !== article.id));
    } catch (err: any) {
      alert("Delete article error: " + err.message);
    }
  };

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || a.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
            AI Assistant Knowledge Base (+1 7111647464)
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
            Chatbot Knowledge Manager
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Curate factual information, product specs, and business FAQs used by the ATHANG IMPEX WhatsApp AI Assistant
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchArticles}
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal text-xs"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/chatbot/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-gold" />
            <span>Add Knowledge Article</span>
          </Link>
        </div>
      </div>

      {/* Mandatory Business Rule Alert Card */}
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-300 text-xs text-amber-900 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <span>Strict AI Chatbot Governance Rules</span>
        </div>
        <p className="leading-relaxed">
          The WhatsApp Chatbot (+1 7111647464) is strictly an <strong>information and exploration assistant</strong>. It must NEVER quote prices, promise MOQs, negotiate payment terms, or guarantee delivery dates. For all commercial discussions, it is programmed to direct visitors to the Sales WhatsApp (+91 9923407176).
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-charcoal-border space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-charcoal-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search knowledge articles by title, category, or content..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Knowledge Articles Table */}
      <div className="bg-white rounded-lg border border-charcoal-border overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-charcoal-muted">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
            <span>Loading knowledge articles...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-muted space-y-3">
            <Bot className="w-10 h-10 text-charcoal-muted/50 mx-auto" />
            <p className="font-semibold text-sm text-forest">No knowledge articles found</p>
            <Link
              href="/admin/chatbot/new"
              className="text-xs font-semibold text-forest underline hover:text-gold"
            >
              Create the first knowledge article
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal">
              <thead className="bg-ivory-100 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider border-b border-charcoal-border">
                <tr>
                  <th className="py-3 px-4">Article Title & Category</th>
                  <th className="py-3 px-3">Summary / Preview</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-border/50">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-ivory-50 transition-colors">
                    <td className="py-3 px-4 max-w-xs">
                      <Link
                        href={`/admin/chatbot/${item.id}`}
                        className="font-bold text-forest hover:text-gold text-sm block"
                      >
                        {item.title}
                      </Link>
                      <span className="text-[10px] font-semibold text-gold-dark bg-gold-50 px-2 py-0.5 rounded border border-gold/30 inline-block mt-1">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 max-w-md text-charcoal-muted">
                      <p className="line-clamp-2 leading-relaxed">
                        {item.summary || item.content}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => togglePublish(item)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.is_published
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {item.is_published ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-gray-500" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/chatbot/${item.id}`}
                        className="p-1.5 text-charcoal-muted hover:text-forest inline-block"
                        title="Edit Article"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-1.5 text-charcoal-muted hover:text-red-600 inline-block"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
