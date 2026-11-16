"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { DbCustomer, DbEnquiry } from "@/types/database";
import {
  ArrowLeft,
  Building,
  Globe2,
  Mail,
  Phone,
  Calendar,
  Save,
  Trash2,
  ExternalLink,
  RefreshCw,
  Inbox,
  AlertCircle,
} from "lucide-react";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [customer, setCustomer] = useState<DbCustomer | null>(null);
  const [enquiries, setEnquiries] = useState<DbEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const supabase = createClient();
        const { data: custData, error: custError } = await supabase
          .from("customers")
          .select("*")
          .eq("id", id)
          .single();

        if (custError || !custData) throw new Error("Customer record not found.");
        setCustomer(custData);
        setNotes(custData.notes || "");

        // Fetch linked or matching enquiries
        const { data: enqData } = await supabase
          .from("enquiries")
          .select("*")
          .or(`customer_id.eq.${id},email.eq.${custData.email || "none"}`)
          .order("created_at", { ascending: false });

        if (enqData) setEnquiries(enqData);
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to load customer profile.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleSaveNotes = async () => {
    if (!customer) return;
    setSaving(true);
    try {
      const supabase = createClient();
      await supabase
        .from("customers")
        .update({ notes, updated_at: new Date().toISOString() })
        .eq("id", customer.id);
      alert("Notes saved successfully!");
    } catch (err: any) {
      alert("Error saving notes: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this customer record?")) return;
    try {
      const supabase = createClient();
      await supabase.from("customers").delete().eq("id", id);
      router.push("/admin/customers");
    } catch (err: any) {
      alert("Error deleting customer: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xs text-charcoal-muted">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
        <span>Loading customer account...</span>
      </div>
    );
  }

  if (errorMsg || !customer) {
    return (
      <div className="p-6 bg-red-50 text-red-700 text-xs rounded border border-red-200">
        {errorMsg || "Customer could not be found."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/customers"
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Customer Account Profile
            </span>
            <h1 className="font-serif text-2xl font-bold text-forest">
              {customer.customer_name}
            </h1>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="p-2 text-red-600 hover:bg-red-50 border border-red-200 rounded"
          title="Delete Customer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customer Info & Notes (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
            <h3 className="font-serif text-lg font-bold text-forest">
              Account Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-ivory-50 rounded border border-charcoal-border/60">
                <span className="text-[10px] text-charcoal-muted uppercase font-bold">
                  Company
                </span>
                <p className="font-semibold text-charcoal mt-0.5">
                  {customer.company || "Independent"}
                </p>
              </div>

              <div className="p-3 bg-ivory-50 rounded border border-charcoal-border/60">
                <span className="text-[10px] text-charcoal-muted uppercase font-bold">
                  Country
                </span>
                <p className="font-semibold text-charcoal mt-0.5">
                  {customer.country || "—"}
                </p>
              </div>

              <div className="p-3 bg-ivory-50 rounded border border-charcoal-border/60">
                <span className="text-[10px] text-charcoal-muted uppercase font-bold">
                  Email
                </span>
                <p className="font-semibold text-charcoal mt-0.5 font-mono truncate">
                  {customer.email || "—"}
                </p>
              </div>

              <div className="p-3 bg-ivory-50 rounded border border-charcoal-border/60">
                <span className="text-[10px] text-charcoal-muted uppercase font-bold">
                  Phone / WhatsApp
                </span>
                <p className="font-semibold text-charcoal mt-0.5">
                  {customer.phone || "—"}
                </p>
              </div>
            </div>

            {/* Notes Section */}
            <div className="pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                Account Commercial Notes
              </label>
              <textarea
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Buyer purchasing cycle, container specifications, credit terms..."
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal leading-relaxed"
              />
              <button
                onClick={handleSaveNotes}
                disabled={saving}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider"
              >
                <Save className="w-3.5 h-3.5 text-gold" />
                <span>{saving ? "Saving..." : "Save Notes"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Associated Inquiries (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-border/60 pb-3">
            <h3 className="font-serif text-lg font-bold text-forest">
              Inquiry History
            </h3>
            <span className="text-xs text-charcoal-muted">
              {enquiries.length} record(s)
            </span>
          </div>

          {enquiries.length === 0 ? (
            <p className="text-xs text-charcoal-muted py-6 text-center">
              No historical enquiries linked to this account yet.
            </p>
          ) : (
            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-3 bg-ivory-50 rounded border border-charcoal-border/60 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest">
                      {enq.product_interest}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-charcoal-muted text-[11px] line-clamp-2">
                    {enq.message}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[10px] text-charcoal-muted">
                    <span>{new Date(enq.created_at).toLocaleDateString()}</span>
                    <Link
                      href={`/admin/enquiries/${enq.id}`}
                      className="text-forest hover:text-gold font-semibold"
                    >
                      View &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
