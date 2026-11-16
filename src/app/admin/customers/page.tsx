"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { DbCustomer } from "@/types/database";
import {
  Users,
  Plus,
  Search,
  Download,
  FileEdit,
  Trash2,
  RefreshCw,
  ExternalLink,
  Globe2,
  Building,
  Mail,
  Phone,
  Save,
  X,
  AlertCircle,
} from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<DbCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<DbCustomer | null>(null);

  const [formData, setFormData] = useState({
    customer_name: "",
    company: "",
    country: "",
    email: "",
    phone: "",
    website: "",
    notes: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openCreateModal = () => {
    setEditingCustomer(null);
    setFormData({
      customer_name: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      website: "",
      notes: "",
    });
    setErrorMsg("");
    setModalOpen(true);
  };

  const openEditModal = (c: DbCustomer) => {
    setEditingCustomer(c);
    setFormData({
      customer_name: c.customer_name,
      company: c.company || "",
      country: c.country || "",
      email: c.email || "",
      phone: c.phone || "",
      website: c.website || "",
      notes: c.notes || "",
    });
    setErrorMsg("");
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_name.trim()) {
      setErrorMsg("Customer name is required.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      const payload = {
        customer_name: formData.customer_name.trim(),
        company: formData.company.trim(),
        country: formData.country.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim() || null,
        website: formData.website.trim() || null,
        notes: formData.notes.trim(),
        updated_at: new Date().toISOString(),
      };

      if (editingCustomer) {
        const { error } = await supabase
          .from("customers")
          .update(payload)
          .eq("id", editingCustomer.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("customers").insert(payload);
        if (error) throw error;
      }

      setModalOpen(false);
      fetchCustomers();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save customer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (c: DbCustomer) => {
    if (!confirm(`Are you sure you want to delete customer record for "${c.customer_name}"?`)) {
      return;
    }
    try {
      const supabase = createClient();
      await supabase.from("customers").delete().eq("id", c.id);
      setCustomers((prev) => prev.filter((item) => item.id !== c.id));
    } catch (err: any) {
      alert("Delete customer error: " + err.message);
    }
  };

  const exportCSV = () => {
    if (filteredCustomers.length === 0) return;
    const headers = ["ID", "Name", "Company", "Country", "Email", "Phone", "Website", "Notes", "Created At"];
    const rows = filteredCustomers.map((c) => [
      c.id,
      `"${c.customer_name.replace(/"/g, '""')}"`,
      `"${c.company.replace(/"/g, '""')}"`,
      `"${c.country.replace(/"/g, '""')}"`,
      c.email || "",
      c.phone || "",
      c.website || "",
      `"${(c.notes || "").replace(/"/g, '""')}"`,
      c.created_at,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `athang_impex_customers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
            Account Directory
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
            Customer Directory
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Manage corporate client accounts, importers, and historical relationships
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchCustomers}
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal text-xs"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={exportCSV}
            disabled={filteredCustomers.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-xs font-semibold text-charcoal uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-forest" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-gold" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg border border-charcoal-border">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-charcoal-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by name, company, country, or email..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg border border-charcoal-border overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-charcoal-muted">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
            <span>Loading customer accounts...</span>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-muted space-y-3">
            <Users className="w-10 h-10 text-charcoal-muted/50 mx-auto" />
            <p className="font-semibold text-sm text-forest">No customers recorded</p>
            <button
              onClick={openCreateModal}
              className="text-xs font-semibold text-forest underline hover:text-gold"
            >
              Add the first customer account
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal">
              <thead className="bg-ivory-100 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider border-b border-charcoal-border">
                <tr>
                  <th className="py-3 px-4">Customer Name & Company</th>
                  <th className="py-3 px-3">Country</th>
                  <th className="py-3 px-3">Contact Email & Phone</th>
                  <th className="py-3 px-3">Notes Preview</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-border/50">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-ivory-50 transition-colors">
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="font-bold text-forest hover:text-gold text-sm block"
                      >
                        {c.customer_name}
                      </Link>
                      <p className="text-[11px] text-charcoal-muted">
                        {c.company || "Independent"}
                      </p>
                    </td>
                    <td className="py-3 px-3 font-medium">{c.country || "—"}</td>
                    <td className="py-3 px-3 text-[11px]">
                      {c.email && <div className="font-mono">{c.email}</div>}
                      {c.phone && <div className="text-charcoal-muted">{c.phone}</div>}
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate text-[11px] text-charcoal-muted">
                      {c.notes || "—"}
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="p-1.5 text-charcoal-muted hover:text-forest inline-block"
                        title="View Customer Profile"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => openEditModal(c)}
                        className="p-1.5 text-charcoal-muted hover:text-forest inline-block"
                        title="Edit Customer"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c)}
                        className="p-1.5 text-charcoal-muted hover:text-red-600 inline-block"
                        title="Delete Customer"
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

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4 shadow-xl border border-charcoal-border">
            <div className="flex items-center justify-between border-b border-charcoal-border/60 pb-3">
              <h3 className="font-serif text-lg font-bold text-forest">
                {editingCustomer ? "Edit Customer Profile" : "Add New Customer"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-charcoal-muted hover:text-charcoal p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_name: e.target.value })
                    }
                    placeholder="e.g. Johnathan Miller"
                    className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="e.g. Global Seasonings Ltd."
                    className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="e.g. United Kingdom"
                    className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="buyer@globalfoods.com"
                    className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+44 20 7946 0991"
                    className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    Website URL
                  </label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    placeholder="https://globalfoods.com"
                    className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">
                  Internal Commercial Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Payment preferences, target purchase cycle, preferred packaging..."
                  className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
                />
              </div>

              <div className="pt-3 border-t border-charcoal-border/60 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-charcoal-border text-charcoal rounded text-xs font-semibold hover:bg-ivory-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider"
                >
                  <Save className="w-3.5 h-3.5 text-gold" />
                  <span>{submitting ? "Saving..." : "Save Record"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
