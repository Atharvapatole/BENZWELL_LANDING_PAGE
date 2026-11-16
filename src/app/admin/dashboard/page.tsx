"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Package,
  Inbox,
  Users,
  FolderTree,
  Eye,
  CheckCircle2,
  FileEdit,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Clock,
  TrendingUp,
  Globe2,
  Phone,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { DbProduct, DbEnquiry, DbActivityLog } from "@/types/database";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    publishedProducts: 0,
    draftProducts: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    contactSubmissions: 0,
    totalCategories: 0,
    totalViews: 0,
  });

  const [recentEnquiries, setRecentEnquiries] = useState<DbEnquiry[]>([]);
  const [recentProducts, setRecentProducts] = useState<DbProduct[]>([]);
  const [recentLogs, setRecentLogs] = useState<DbActivityLog[]>([]);
  const [sourceBreakdown, setSourceBreakdown] = useState<Record<string, number>>({});

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      // 1. Products stats
      const { data: products } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (products) {
        setRecentProducts(products.slice(0, 5));
        const pub = products.filter((p) => p.is_published).length;
        const totalV = products.reduce((acc, p) => acc + (Number(p.views_count) || 0), 0);
        setStats((prev) => ({
          ...prev,
          totalProducts: products.length,
          publishedProducts: pub,
          draftProducts: products.length - pub,
          totalViews: totalV,
        }));
      }

      // 2. Categories count
      const { count: catCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true });
      if (typeof catCount === "number") {
        setStats((prev) => ({ ...prev, totalCategories: catCount }));
      }

      // 3. Enquiries stats
      const { data: enquiries } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (enquiries) {
        setRecentEnquiries(enquiries.slice(0, 5));
        const newCount = enquiries.filter((e) => e.status === "new").length;
        const sources: Record<string, number> = {};
        enquiries.forEach((e) => {
          const s = e.source || "Website Form";
          sources[s] = (sources[s] || 0) + 1;
        });
        setSourceBreakdown(sources);

        setStats((prev) => ({
          ...prev,
          totalEnquiries: enquiries.length,
          newEnquiries: newCount,
          contactSubmissions: enquiries.length,
        }));
      }

      // 4. Activity Logs
      const { data: logs } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      if (logs) {
        setRecentLogs(logs);
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
            Executive Control
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
            Admin Dashboard
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Real-time operations, product catalog metrics, and export inquiries
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-ivory-100 border border-charcoal-border text-charcoal rounded text-xs font-medium transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-gold" />
            <span>New Product</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards (8 key metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Products */}
        <div className="bg-white p-5 rounded-lg border border-charcoal-border shadow-2xs">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Products
            </span>
            <div className="w-8 h-8 rounded bg-forest-50 text-forest flex items-center justify-center">
              <Package className="w-4 h-4 text-gold" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-forest">{stats.totalProducts}</span>
            <span className="text-xs text-charcoal-muted">in portfolio</span>
          </div>
          <div className="mt-3 pt-3 border-t border-charcoal-border/50 text-[11px] text-charcoal-muted flex justify-between">
            <span>Published: <strong>{stats.publishedProducts}</strong></span>
            <span>Drafts: <strong>{stats.draftProducts}</strong></span>
          </div>
        </div>

        {/* Card 2: Enquiries (CRM) */}
        <div className="bg-white p-5 rounded-lg border border-charcoal-border shadow-2xs">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Export Enquiries
            </span>
            <div className="w-8 h-8 rounded bg-amber-50 text-amber-700 flex items-center justify-center">
              <Inbox className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-forest">{stats.totalEnquiries}</span>
            {stats.newEnquiries > 0 ? (
              <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                {stats.newEnquiries} new
              </span>
            ) : (
              <span className="text-xs text-charcoal-muted">all reviewed</span>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-charcoal-border/50 text-[11px] text-charcoal-muted">
            <Link href="/admin/enquiries" className="text-forest hover:text-gold font-medium">
              View all inquiries &rarr;
            </Link>
          </div>
        </div>

        {/* Card 3: Categories */}
        <div className="bg-white p-5 rounded-lg border border-charcoal-border shadow-2xs">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Product Categories
            </span>
            <div className="w-8 h-8 rounded bg-blue-50 text-blue-700 flex items-center justify-center">
              <FolderTree className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-forest">{stats.totalCategories}</span>
            <span className="text-xs text-charcoal-muted">active</span>
          </div>
          <div className="mt-3 pt-3 border-t border-charcoal-border/50 text-[11px] text-charcoal-muted">
            <Link href="/admin/categories" className="text-forest hover:text-gold font-medium">
              Manage categories &rarr;
            </Link>
          </div>
        </div>

        {/* Card 4: Product Page Views */}
        <div className="bg-white p-5 rounded-lg border border-charcoal-border shadow-2xs">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Product Catalog Views
            </span>
            <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Eye className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-forest">{stats.totalViews}</span>
            <span className="text-xs text-charcoal-muted">recorded visits</span>
          </div>
          <div className="mt-3 pt-3 border-t border-charcoal-border/50 text-[11px] text-charcoal-muted">
            <span>Genuine privacy-conscious views</span>
          </div>
        </div>
      </div>

      {/* Quick Action Center */}
      <div className="bg-white p-6 rounded-lg border border-charcoal-border">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gold mb-3">
          Quick Action Center
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/products/new"
            className="flex flex-col items-center justify-center p-3.5 bg-ivory-50 hover:bg-forest hover:text-white rounded-md border border-charcoal-border/80 transition-all text-center group"
          >
            <Plus className="w-5 h-5 text-forest group-hover:text-gold mb-1.5" />
            <span className="text-xs font-semibold">Add Product</span>
          </Link>

          <Link
            href="/admin/categories"
            className="flex flex-col items-center justify-center p-3.5 bg-ivory-50 hover:bg-forest hover:text-white rounded-md border border-charcoal-border/80 transition-all text-center group"
          >
            <FolderTree className="w-5 h-5 text-forest group-hover:text-gold mb-1.5" />
            <span className="text-xs font-semibold">Categories</span>
          </Link>

          <Link
            href="/admin/media"
            className="flex flex-col items-center justify-center p-3.5 bg-ivory-50 hover:bg-forest hover:text-white rounded-md border border-charcoal-border/80 transition-all text-center group"
          >
            <Package className="w-5 h-5 text-forest group-hover:text-gold mb-1.5" />
            <span className="text-xs font-semibold">Upload Image</span>
          </Link>

          <Link
            href="/admin/enquiries"
            className="flex flex-col items-center justify-center p-3.5 bg-ivory-50 hover:bg-forest hover:text-white rounded-md border border-charcoal-border/80 transition-all text-center group"
          >
            <Inbox className="w-5 h-5 text-forest group-hover:text-gold mb-1.5" />
            <span className="text-xs font-semibold">New Enquiries</span>
          </Link>

          <Link
            href="/admin/chatbot"
            className="flex flex-col items-center justify-center p-3.5 bg-ivory-50 hover:bg-forest hover:text-white rounded-md border border-charcoal-border/80 transition-all text-center group"
          >
            <TrendingUp className="w-5 h-5 text-forest group-hover:text-gold mb-1.5" />
            <span className="text-xs font-semibold">Chatbot KB</span>
          </Link>

          <Link
            href="/admin/content/homepage"
            className="flex flex-col items-center justify-center p-3.5 bg-ivory-50 hover:bg-forest hover:text-white rounded-md border border-charcoal-border/80 transition-all text-center group"
          >
            <FileEdit className="w-5 h-5 text-forest group-hover:text-gold mb-1.5" />
            <span className="text-xs font-semibold">Edit Homepage</span>
          </Link>
        </div>
      </div>

      {/* Grid: Recent Enquiries (Left 7 cols) & Live Portfolio (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Enquiries Table (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Recent Enquiries & Commercial Leads
              </h3>
              <p className="text-xs text-charcoal-muted">
                Latest submissions from importers & manufacturers
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-forest hover:text-gold uppercase tracking-wider"
            >
              View All &rarr;
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-charcoal-muted bg-ivory-50 rounded-md border border-dashed border-charcoal-border">
              <Inbox className="w-8 h-8 text-charcoal-muted/50 mx-auto mb-2" />
              <p className="font-medium">No export inquiries recorded yet.</p>
              <p className="text-[11px] text-charcoal-muted/70 mt-1">
                Submissions from the website enquiry form will populate here in real time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-charcoal">
                <thead className="bg-ivory-100 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Lead / Company</th>
                    <th className="py-2.5 px-3">Product</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-border/50">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-ivory-50 transition-colors">
                      <td className="py-3 px-3">
                        <Link
                          href={`/admin/enquiries/${enq.id}`}
                          className="font-semibold text-forest hover:text-gold"
                        >
                          {enq.full_name}
                        </Link>
                        <p className="text-[10px] text-charcoal-muted">
                          {enq.company_name} ({enq.country})
                        </p>
                      </td>
                      <td className="py-3 px-3 line-clamp-1">{enq.product_interest}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            enq.status === "new"
                              ? "bg-amber-100 text-amber-800"
                              : enq.status === "converted"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[11px] text-charcoal-muted font-mono">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Products Status & Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Product Catalog
              </h3>
              <p className="text-xs text-charcoal-muted">
                Active dehydrated ingredients & publication status
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-forest hover:text-gold uppercase tracking-wider"
            >
              Manage &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-3 bg-ivory-50 rounded-md border border-charcoal-border/70 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-semibold text-forest">
                    {prod.name}
                  </h4>
                  <p className="text-[10px] text-charcoal-muted">
                    Slug: /{prod.slug} • Views: {prod.views_count}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      prod.is_published
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {prod.is_published ? "Published" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/products/${prod.id}`}
                    className="p-1 text-charcoal-muted hover:text-forest"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/products/new"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-ivory-100 hover:bg-ivory-200 text-forest border border-charcoal-border rounded text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-gold" />
              <span>Add Another Product</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Audit Logs */}
      <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-3">
        <div className="flex items-center justify-between border-b border-charcoal-border/60 pb-3">
          <h3 className="font-serif text-lg font-bold text-forest flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            <span>Recent System & Content Activity</span>
          </h3>
          <Link
            href="/admin/activity"
            className="text-xs font-semibold text-forest hover:text-gold uppercase tracking-wider"
          >
            All Logs &rarr;
          </Link>
        </div>

        {recentLogs.length === 0 ? (
          <p className="text-xs text-charcoal-muted py-4">
            No activity logs recorded yet. Changes to products, settings, and enquiries will be audited here.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-ivory-50 rounded border border-charcoal-border/60 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold text-forest">
                  <span>{log.action.replace("_", " ")}</span>
                  <span className="text-[10px] text-charcoal-muted font-normal font-mono">
                    {new Date(log.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-muted">
                  By: {log.user_email || "System"} • {log.resource_type}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
