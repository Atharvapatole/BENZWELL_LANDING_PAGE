import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy | ATHANG IMPEX",
  description:
    "Privacy Policy for ATHANG IMPEX (athangimpex.in) detailing how we collect, use, and protect commercial inquiry information.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="mt-8 bg-white p-8 sm:p-12 rounded-xl border border-charcoal-border shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-3 py-1 rounded border border-gold/30">
              Legal & Compliance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-3">
              Privacy Policy
            </h1>
            <p className="text-xs text-charcoal-muted mt-2">
              Last updated: November 2026 • Website: {SITE_CONFIG.domain}
            </p>
          </div>

          <div className="prose prose-sm text-charcoal-light leading-relaxed space-y-6">
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                1. Introduction
              </h2>
              <p>
                ATHANG IMPEX ("we", "our", or "us") operates the international business website{" "}
                <a href={SITE_CONFIG.baseUrl} className="text-forest underline">
                  {SITE_CONFIG.baseUrl}
                </a>
                . We respect the privacy of our website visitors and prospective international trade partners. This Privacy Policy outlines our practices regarding the collection, use, and safeguarding of information provided through our website and communication channels.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                2. Information We Collect
              </h2>
              <p>
                As a B2B merchant export website, we collect information necessary to facilitate international trade inquiries and commercial quotations:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-charcoal-muted">
                <li>Contact details: Name, company designation, corporate email address, phone/WhatsApp number.</li>
                <li>Company details: Business entity name, country of operation, target destination port.</li>
                <li>Product inquiries: Specific products of interest (e.g. onion powder, flakes, tomato powder, ginger powder), estimated volume, and packaging preferences.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                3. Purpose of Processing
              </h2>
              <p>
                The information collected is used solely for legitimate B2B business purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-charcoal-muted">
                <li>Evaluating buyer requirements and preparing commercial quotations.</li>
                <li>Coordinating product specifications, packaging options, and shipping arrangements.</li>
                <li>Facilitating responsive communication via email or official WhatsApp channels.</li>
              </ul>
              <p>
                We do not sell, rent, or monetize business inquiry data to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                4. Third-Party Messaging Platforms (WhatsApp)
              </h2>
              <p>
                Our website integrates direct links to WhatsApp (+91 9923407176 for Sales and +1 7111647464 for AI Assistant). When you initiate a chat through WhatsApp, your communications are governed by WhatsApp's terms and privacy policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                5. Data Security & Retention
              </h2>
              <p>
                We employ standard security protocols to safeguard commercial inquiries. Data is retained only as long as necessary to conduct business discussions or fulfill regulatory trade records under applicable Indian export regulations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest">
                6. Contact Information
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to modify any previously submitted business inquiry details, please contact us at:
              </p>
              <p className="font-mono text-xs text-forest">
                ATHANG IMPEX • Website: {SITE_CONFIG.domain} • Sales WhatsApp: {SITE_CONFIG.salesWhatsApp.number}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
