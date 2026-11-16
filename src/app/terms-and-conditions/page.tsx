import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Terms & Conditions | ATHANG IMPEX",
  description:
    "Terms and Conditions governing the use of ATHANG IMPEX website (athangimpex.in) and international commercial trade inquiries.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/terms-and-conditions`,
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-ivory py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

        <div className="mt-8 bg-white p-8 sm:p-12 rounded-xl border border-charcoal-border shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
              Commercial Terms
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-3">
              Terms & Conditions
            </h1>
            <p className="text-xs text-charcoal-muted mt-2">
              Last updated: November 2026 • Website: {SITE_CONFIG.domain}
            </p>
          </div>

          <div className="prose prose-sm text-charcoal-light leading-relaxed space-y-6">
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using this website ({SITE_CONFIG.baseUrl}), you agree to be bound by these Terms and Conditions and all applicable laws and regulations governing international merchant exporting from India.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                2. Nature of Information & Non-Binding Inquiries
              </h2>
              <p>
                The information provided on this website is for general informational and marketing purposes concerning the dehydrated food ingredient portfolio of ATHANG IMPEX.
              </p>
              <p>
                Product descriptions, characteristics, and application examples do not constitute a formal binding offer to sell. Legally binding commitments, product specifications, unit pricing, minimum order quantities (MOQ), and delivery terms (e.g. Incoterms FOB, CIF) are established exclusively through formal Proforma Invoices, Sales Contracts, and written agreements signed by authorized representatives of ATHANG IMPEX.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                3. Distinction of Communication Channels
              </h2>
              <p>
                ATHANG IMPEX operates two distinct WhatsApp contact channels:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-charcoal-muted">
                <li>
                  <strong>Sales Desk (+91 9923407176):</strong> Authorized for commercial discussions, price quotations, and official export negotiations.
                </li>
                <li>
                  <strong>AI Assistant (+1 7111647464):</strong> An automated exploratory assistant providing general product and company information. The AI assistant possesses no authority to offer binding quotations, confirm orders, or negotiate commercial terms.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                4. Intellectual Property
              </h2>
              <p>
                All content, trademarks, logos, texts, illustrations, and design elements featured on this website are the intellectual property of ATHANG IMPEX and are protected under copyright and intellectual property laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                5. Governing Law & Jurisdiction
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of website usage or preliminary commercial correspondence shall be subject to the exclusive jurisdiction of the competent courts in India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
