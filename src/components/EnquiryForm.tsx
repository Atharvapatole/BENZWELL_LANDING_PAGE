"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { PRODUCTS } from "@/data/products";
import { CheckCircle2, AlertCircle, Phone, Send, Mail, ArrowRight } from "lucide-react";

interface EnquiryFormProps {
  defaultProduct?: string;
  sourcePage?: string;
}

export default function EnquiryForm({
  defaultProduct = "",
  sourcePage = "General Enquiry",
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    businessEmail: "",
    country: "",
    productInterest: defaultProduct || "Dehydrated Onion Powder",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.companyName.trim()) errs.companyName = "Company name is required.";
    if (!formData.businessEmail.trim()) {
      errs.businessEmail = "Business email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      errs.businessEmail = "Please enter a valid business email address.";
    }
    if (!formData.country.trim()) errs.country = "Country of operation is required.";
    if (!formData.message.trim()) errs.message = "Please share your requirements or questions.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          company_name: formData.companyName,
          email: formData.businessEmail,
          country: formData.country,
          product_name: formData.productInterest,
          message: formData.message,
          source_page: sourcePage,
        }),
      });
    } catch (e) {
      console.warn("Could not submit enquiry to API, proceeding to WhatsApp handoff", e);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  // Generate pre-filled Sales WhatsApp message
  const generateWhatsAppMessage = () => {
    const text =
      `Hello ATHANG IMPEX Sales Team,\n\n` +
      `I am submitting an export inquiry via your website.\n\n` +
      `• Name: ${formData.fullName}\n` +
      `• Company: ${formData.companyName}\n` +
      `• Country: ${formData.country}\n` +
      `• Business Email: ${formData.businessEmail}\n` +
      `• Product of Interest: ${formData.productInterest}\n\n` +
      `Requirements / Message:\n${formData.message}\n\n` +
      `Source: ${sourcePage}`;

    return `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  // Generate mailto link
  const generateMailtoLink = () => {
    const subject = encodeURIComponent(
      `Export Inquiry: ${formData.productInterest} - ${formData.companyName} (${formData.country})`
    );
    const body = encodeURIComponent(
      `Dear ATHANG IMPEX Team,\n\n` +
      `Name: ${formData.fullName}\n` +
      `Company: ${formData.companyName}\n` +
      `Country: ${formData.country}\n` +
      `Email: ${formData.businessEmail}\n` +
      `Product: ${formData.productInterest}\n\n` +
      `Message:\n${formData.message}`
    );
    return `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-lg border border-gold/40 shadow-sm text-center">
        <div className="w-14 h-14 bg-forest-50 text-forest rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
          <CheckCircle2 className="w-8 h-8 text-gold" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-forest">
          Enquiry Prepared Successfully
        </h3>

        <p className="mt-2 text-sm text-charcoal-muted max-w-md mx-auto">
          Thank you, <strong>{formData.fullName}</strong>. To receive immediate assistance with product specifications, MOQ, and quotations, dispatch your inquiry directly to our sales desk.
        </p>

        {/* Primary Action: Direct WhatsApp to Sales Desk */}
        <div className="mt-6 space-y-3 max-w-md mx-auto">
          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-forest hover:bg-forest-700 text-white rounded text-sm font-semibold tracking-wide shadow-md transition-all"
          >
            <Phone className="w-4 h-4 text-gold" />
            <span>Send to Sales WhatsApp ({SITE_CONFIG.salesWhatsApp.number})</span>
          </a>

          <a
            href={generateMailtoLink()}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-ivory-100 hover:bg-ivory-200 text-charcoal border border-charcoal-border rounded text-xs font-semibold tracking-wide transition-all"
          >
            <Mail className="w-4 h-4 text-forest" />
            <span>Send via Email Client ({SITE_CONFIG.contactEmail})</span>
          </a>
        </div>

        <p className="mt-5 text-xs text-charcoal-muted">
          Backend notice: In production, direct webhook/email automation can be connected via environment variables. WhatsApp handoff is active and functional right now.
        </p>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              fullName: "",
              companyName: "",
              businessEmail: "",
              country: "",
              productInterest: defaultProduct || "Dehydrated Onion Powder",
              message: "",
            });
          }}
          className="mt-4 text-xs font-semibold text-forest underline hover:text-gold"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 bg-white p-6 sm:p-8 rounded-lg border border-charcoal-border shadow-xs">
      <div className="border-b border-charcoal-border/60 pb-4">
        <h3 className="font-serif text-2xl font-bold text-forest">
          Export Requirement Enquiry
        </h3>
        <p className="text-xs text-charcoal-muted mt-1">
          Connect directly with ATHANG IMPEX regarding product specifications, packaging, and commercial terms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Johnathan Miller"
            className={`w-full px-3.5 py-2.5 text-sm bg-ivory-50 border rounded text-charcoal placeholder:text-charcoal-muted/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest ${
              errors.fullName ? "border-red-500 ring-1 ring-red-500" : "border-charcoal-border"
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
            Company Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Global Foods Ltd."
            className={`w-full px-3.5 py-2.5 text-sm bg-ivory-50 border rounded text-charcoal placeholder:text-charcoal-muted/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest ${
              errors.companyName ? "border-red-500 ring-1 ring-red-500" : "border-charcoal-border"
            }`}
          />
          {errors.companyName && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.companyName}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Business Email */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
            Business Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            value={formData.businessEmail}
            onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
            placeholder="e.g. procurement@globalfoods.com"
            className={`w-full px-3.5 py-2.5 text-sm bg-ivory-50 border rounded text-charcoal placeholder:text-charcoal-muted/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest ${
              errors.businessEmail ? "border-red-500 ring-1 ring-red-500" : "border-charcoal-border"
            }`}
          />
          {errors.businessEmail && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.businessEmail}</span>
            </p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
            Country of Destination <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            placeholder="e.g. United Kingdom, Germany, UAE"
            className={`w-full px-3.5 py-2.5 text-sm bg-ivory-50 border rounded text-charcoal placeholder:text-charcoal-muted/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest ${
              errors.country ? "border-red-500 ring-1 ring-red-500" : "border-charcoal-border"
            }`}
          />
          {errors.country && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.country}</span>
            </p>
          )}
        </div>
      </div>

      {/* Product of Interest */}
      <div>
        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
          Product of Interest
        </label>
        <select
          value={formData.productInterest}
          onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
          className="w-full px-3.5 py-2.5 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest"
        >
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
          <option value="Multiple Products / Complete Dehydrated Portfolio">
            Multiple Products / Complete Portfolio
          </option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
          Requirement Details & Estimated Volume <span className="text-red-600">*</span>
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please share details such as desired packaging format, application, estimated volume or target destination port..."
          className={`w-full px-3.5 py-2.5 text-sm bg-ivory-50 border rounded text-charcoal placeholder:text-charcoal-muted/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest ${
            errors.message ? "border-red-500 ring-1 ring-red-500" : "border-charcoal-border"
          }`}
        />
        {errors.message && (
          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Notice about direct WhatsApp sales connection */}
      <div className="p-3 bg-forest-50 border border-gold/30 rounded text-xs text-charcoal-light flex items-start gap-2.5">
        <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-forest">Direct Commercial Channel:</p>
          <p className="text-[11px] text-charcoal-muted mt-0.5">
            Enquiries are routed directly to the Owner / Sales desk ({SITE_CONFIG.salesWhatsApp.number}) for quotation and commercial terms.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-forest hover:bg-forest-700 text-white rounded text-sm font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer"
      >
        <Send className="w-4 h-4 text-gold" />
        <span>{isSubmitting ? "Validating Requirement..." : "Submit Export Enquiry"}</span>
      </button>
    </form>
  );
}
