import React from "react";
import Link from "next/link";
import {
  FileEdit,
  Home,
  Info,
  ShieldCheck,
  Globe2,
  ArrowRight,
  Eye,
} from "lucide-react";

export default function AdminContentOverviewPage() {
  const pages = [
    {
      title: "Homepage Sections",
      description:
        "Manage Hero headline, company introduction, value propositions, industry applications, and business banners.",
      href: "/admin/content/homepage",
      publicRoute: "/",
      icon: Home,
      sections: [
        "Hero Banner",
        "Company Introduction",
        "Featured Products",
        "Why Choose ATHANG",
        "Industries",
        "Export Capabilities CTA",
        "Business Banner",
        "Chatbot Promo",
        "Final CTA",
      ],
    },
    {
      title: "About Us Page",
      description:
        "Manage company story, merchant exporter philosophy, Vision, Mission, and core business commitments.",
      href: "/admin/content/about",
      publicRoute: "/about",
      icon: Info,
      sections: ["Who We Are", "Vision & Mission", "Commitment & Principles"],
    },
    {
      title: "Quality & Sourcing Page",
      description:
        "Manage sourcing integrity workflow, specification alignment criteria, packaging coordination, and verified compliance policies.",
      href: "/admin/content/quality",
      publicRoute: "/quality-and-sourcing",
      icon: ShieldCheck,
      sections: ["Responsible Sourcing", "6-Step Verification Workflow", "Compliance Policies"],
    },
    {
      title: "Export Capabilities Page",
      description:
        "Manage international shipping overview, sea & air freight options, export packaging types, and trade enquiry prompts.",
      href: "/admin/content/export",
      publicRoute: "/export-capabilities",
      icon: Globe2,
      sections: ["Global Gateway", "Freight Options", "Capabilities Breakdown"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-charcoal-border/60 pb-5">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
          Content Management System
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
          Website Content CMS
        </h1>
        <p className="text-xs text-charcoal-muted mt-0.5">
          Edit text copy, hero headlines, and value propositions across public pages without modifying code
        </p>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="bg-white p-6 rounded-lg border border-charcoal-border hover:border-gold/80 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded bg-forest-50 text-forest flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <Link
                    href={p.publicRoute}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-charcoal-muted hover:text-forest"
                  >
                    <span>View Live</span>
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <h3 className="font-serif text-xl font-bold text-forest">
                  {p.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {p.description}
                </p>

                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-light">
                    Editable Sections:
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {p.sections.map((s, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-ivory-100 text-charcoal-muted px-2 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={p.href}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <FileEdit className="w-3.5 h-3.5 text-gold" />
                  <span>Edit Page Content</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
