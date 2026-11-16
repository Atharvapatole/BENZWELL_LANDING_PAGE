"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { DbEnquiry, EnquiryStatus } from "@/types/database";
import {
  Inbox,
  Search,
  Filter,
  Download,
  Trash2,
  Phone,
  Mail,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";

const STATUS_COLORS: Record<EnquiryStatus, string> = {
  new: "bg-amber-100 text-amber-800 border-amber-300",
  contacted: "bg-blue-100 text-blue-800 border-blue-300",
  interested: "bg-purple-100 text-purple-800 border-purple-300",
  negotiation: "bg-indigo-100 text-indigo-800 border-indigo-300",
  converted: "bg-emerald-100 text-emerald-800 border-emerald-300",
  closed: "bg-gray-100 text-gray-800 border-gray-300",
  spam: "bg-red-100 text-red-800 border-red-300",
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<DbEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [productFilter, setProductFilter] = useState<string>("all");

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setEnquiries(data);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || e.status === statusFilter;

    const matchesProduct =
      productFilter === "all" ||
      e.product_interest.toLowerCase().includes(productFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesProduct;
  });

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("enquiries")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (!error) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const exportCSV = () => {
    if (filteredEnquiries.length === 0) return;
    const headers = [
      "ID",
      "Full Name",
      "Company",
      "Email",
      "Country",
      "Product Interest",
      "Status",
      "Source",
      "Date",
      "Message",
    ];

    const rows = filteredEnquiries.map((e) => [
      e.id,
      `"${e.full_name.replace(/"/g, '""')}"`,
      `"${e.company_name.replace(/"/g, '""')}"`,
      e.email,
      `"${e.country.replace(/"/g, '""')}"`,
      `"${e.product_interest.replace(/"/g, '""')}"`,
      e.status,
      `"${e.source}"`,
      new Date(e.created_at).toISOString(),
      `"${e.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `athang_impex_enquiries_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
            Export CRM
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
            Business Enquiries & Commercial Leads
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Track inquiries, update sales pipeline stages, and manage buyer relationships
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchEnquiries}
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal text-xs"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={exportCSV}
            disabled={filteredEnquiries.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-xs font-semibold text-charcoal uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-forest" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-charcoal-border space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-charcoal-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, company, email, country, or message..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="interested">Interested</option>
              <option value="negotiation">Negotiation</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
              <option value="spam">Spam</option>
            </select>
          </div>

          {/* Product Filter */}
          <div className="sm:col-span-3">
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            >
              <option value="all">All Products</option>
              <option value="Onion Powder">Onion Powder</option>
              <option value="Onion Flakes">Onion Flakes</option>
              <option value="Tomato Powder">Tomato Powder</option>
              <option value="Ginger Powder">Ginger Powder</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-lg border border-charcoal-border overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-charcoal-muted">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
            <span>Loading inquiries...</span>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-muted space-y-3">
            <Inbox className="w-10 h-10 text-charcoal-muted/50 mx-auto" />
            <p className="font-semibold text-sm text-forest">No enquiries match filter</p>
            <p className="max-w-xs mx-auto">
              Inquiries submitted through the public website will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal">
              <thead className="bg-ivory-100 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider border-b border-charcoal-border">
                <tr>
                  <th className="py-3 px-4">Lead / Company</th>
                  <th className="py-3 px-3">Product of Interest</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Source</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-border/50">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-ivory-50 transition-colors">
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/enquiries/${enq.id}`}
                        className="font-bold text-forest hover:text-gold text-sm block"
                      >
                        {enq.full_name}
                      </Link>
                      <p className="text-charcoal-muted text-[11px]">
                        {enq.company_name} • <span className="font-semibold text-charcoal">{enq.country}</span>
                      </p>
                      <p className="text-[10px] text-charcoal-muted font-mono">
                        {enq.email}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-forest block">
                        {enq.product_interest}
                      </span>
                      <p className="text-[11px] text-charcoal-muted line-clamp-1 max-w-xs">
                        {enq.message}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          handleStatusChange(enq.id, e.target.value as EnquiryStatus)
                        }
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                          STATUS_COLORS[enq.status] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="interested">Interested</option>
                        <option value="negotiation">Negotiation</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                        <option value="spam">Spam</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-charcoal-muted">
                      {enq.source}
                    </td>
                    <td className="py-3 px-3 text-[11px] text-charcoal-muted font-mono">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/enquiries/${enq.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-gold px-2 py-1 bg-ivory-100 rounded"
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
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
