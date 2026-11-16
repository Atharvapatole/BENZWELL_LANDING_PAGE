"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { DbEnquiry, EnquiryStatus } from "@/types/database";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe2,
  Building,
  Calendar,
  Save,
  Trash2,
  CheckCircle2,
  UserPlus,
  RefreshCw,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

export default function EnquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [enquiry, setEnquiry] = useState<DbEnquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<EnquiryStatus>("new");
  const [internalNotes, setInternalNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadEnquiry() {
      if (!id) return;
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("enquiries")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) throw new Error("Enquiry not found.");
        setEnquiry(data);
        setStatus(data.status);
        setInternalNotes(data.internal_notes || "");
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to load lead details.");
      } finally {
        setLoading(false);
      }
    }
    loadEnquiry();
  }, [id]);

  const handleUpdate = async () => {
    if (!enquiry) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("enquiries")
        .update({
          status,
          internal_notes: internalNotes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", enquiry.id);

      if (error) throw error;
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err: any) {
      alert("Error saving notes: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleConvertToCustomer = async () => {
    if (!enquiry) return;
    try {
      const supabase = createClient();
      const { data: customer, error } = await supabase
        .from("customers")
        .insert({
          customer_name: enquiry.full_name,
          company: enquiry.company_name,
          country: enquiry.country,
          email: enquiry.email,
          phone: enquiry.phone_number,
          notes: `Converted from enquiry ID ${enquiry.id}. Interested in: ${enquiry.product_interest}`,
        })
        .select()
        .single();

      if (error) throw error;

      // Link customer to enquiry
      await supabase
        .from("enquiries")
        .update({ customer_id: customer.id, status: "converted" })
        .eq("id", enquiry.id);

      setStatus("converted");
      alert(`Successfully converted ${enquiry.full_name} into Customer Directory!`);
    } catch (err: any) {
      alert("Error converting customer: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this enquiry?")) {
      return;
    }
    try {
      const supabase = createClient();
      await supabase.from("enquiries").delete().eq("id", id);
      router.push("/admin/enquiries");
    } catch (err: any) {
      alert("Delete error: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xs text-charcoal-muted">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
        <span>Loading lead details...</span>
      </div>
    );
  }

  if (errorMsg || !enquiry) {
    return (
      <div className="p-6 bg-red-50 text-red-700 text-xs rounded border border-red-200">
        {errorMsg || "Lead could not be found."}
      </div>
    );
  }

  const mailtoLink = `mailto:${enquiry.email}?subject=${encodeURIComponent(
    `ATHANG IMPEX: Follow-up regarding ${enquiry.product_interest}`
  )}&body=${encodeURIComponent(
    `Dear ${enquiry.full_name},\n\nThank you for reaching out to ATHANG IMPEX regarding your interest in ${enquiry.product_interest}.\n\n`
  )}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Lead Record #{enquiry.id.slice(0, 8)}
            </span>
            <h1 className="font-serif text-2xl font-bold text-forest">
              {enquiry.full_name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleConvertToCustomer}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-xs font-semibold text-charcoal"
          >
            <UserPlus className="w-3.5 h-3.5 text-forest" />
            <span>Convert to Customer</span>
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 border border-red-200 rounded"
            title="Delete enquiry"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Inquiry Message (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Details Card */}
          <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
            <h3 className="font-serif text-lg font-bold text-forest">
              Contact & Business Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2.5 p-3 bg-ivory-50 rounded border border-charcoal-border/60">
                <Building className="w-4 h-4 text-gold flex-shrink-0" />
                <div>
                  <span className="text-charcoal-muted uppercase text-[10px] font-bold">
                    Company
                  </span>
                  <p className="font-semibold text-charcoal">
                    {enquiry.company_name || "Independent Importer"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 bg-ivory-50 rounded border border-charcoal-border/60">
                <Globe2 className="w-4 h-4 text-gold flex-shrink-0" />
                <div>
                  <span className="text-charcoal-muted uppercase text-[10px] font-bold">
                    Country
                  </span>
                  <p className="font-semibold text-charcoal">{enquiry.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 bg-ivory-50 rounded border border-charcoal-border/60">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <div className="truncate">
                  <span className="text-charcoal-muted uppercase text-[10px] font-bold">
                    Email
                  </span>
                  <p className="font-semibold text-charcoal truncate">
                    {enquiry.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 bg-ivory-50 rounded border border-charcoal-border/60">
                <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                <div>
                  <span className="text-charcoal-muted uppercase text-[10px] font-bold">
                    Received Date
                  </span>
                  <p className="font-semibold text-charcoal font-mono">
                    {new Date(enquiry.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Email Response CTA */}
            <div className="pt-2">
              <a
                href={mailtoLink}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span>Compose Follow-up Email ({enquiry.email})</span>
              </a>
            </div>
          </div>

          {/* Product Requirement Message */}
          <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold-50 px-2 py-0.5 rounded border border-gold/30">
              Product Inquired: {enquiry.product_interest}
            </span>
            <h3 className="font-serif text-lg font-bold text-forest">
              Requirements & Message
            </h3>
            <div className="p-4 bg-ivory-50 rounded-md border border-charcoal-border/60 text-xs text-charcoal leading-relaxed whitespace-pre-wrap font-sans">
              {enquiry.message}
            </div>
            <p className="text-[11px] text-charcoal-muted">
              Source Attribution: <strong>{enquiry.source}</strong>
            </p>
          </div>
        </div>

        {/* Right: Pipeline Status & Internal Notes (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
            <h3 className="font-serif text-lg font-bold text-forest">
              Pipeline Stage & Notes
            </h3>

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Enquiry Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded font-bold uppercase tracking-wider text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              >
                <option value="new">New Inquiry</option>
                <option value="contacted">Contacted</option>
                <option value="interested">Interested / Sampling</option>
                <option value="negotiation">Under Negotiation</option>
                <option value="converted">Converted / Won</option>
                <option value="closed">Closed / Inactive</option>
                <option value="spam">Spam / Junk</option>
              </select>
            </div>

            {/* Internal Notes */}
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Internal Commercial Notes
              </label>
              <textarea
                rows={6}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Record discussions, quoted FOB/CIF rates, packaging requirements, or follow-up action items..."
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest leading-relaxed"
              />
            </div>

            <button
              onClick={handleUpdate}
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5 text-gold" />
              <span>{saving ? "Saving..." : "Save Pipeline Status & Notes"}</span>
            </button>

            {saveSuccess && (
              <p className="text-xs text-emerald-600 font-semibold text-center flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Notes successfully saved!</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
