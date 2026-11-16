import React from "react";
import Logo from "@/components/Logo";
import { Wrench, Phone, Mail, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export const metadata = {
  title: "Under Scheduled Maintenance | ATHANG IMPEX",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  const salesMsg = encodeURIComponent(
    "Hello ATHANG IMPEX,\n\nI am reaching out regarding export inquiries while your website is under scheduled maintenance."
  );
  const salesLink = `https://wa.me/${SITE_CONFIG.salesWhatsApp.cleanNumber}?text=${salesMsg}`;

  return (
    <div className="min-h-screen bg-forest-900 text-ivory flex flex-col justify-between p-6 sm:p-12">
      <div className="max-w-4xl mx-auto w-full pt-8">
        <Logo variant="dark" />
      </div>

      <div className="max-w-xl mx-auto w-full text-center py-12 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-forest-800 border border-gold/40 flex items-center justify-center mx-auto text-gold shadow-lg">
          <Wrench className="w-8 h-8 text-gold animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-gold">
            System Upgrade in Progress
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Scheduled Platform Maintenance
          </h1>
        </div>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          We are currently updating the ATHANG IMPEX export catalogue and platform infrastructure to serve you better. We will be back online shortly.
        </p>

        <div className="p-4 rounded-xl bg-forest-800/80 border border-forest-700 max-w-md mx-auto text-xs text-stone-300 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
          <span>Direct export sales desk remains fully active during maintenance.</span>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={salesLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-600 text-forest-900 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Export Sales Desk</span>
          </a>

          <a
            href={`mailto:${SITE_CONFIG.contactEmail}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-forest-800 hover:bg-forest-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg border border-forest-600 transition-all"
          >
            <Mail className="w-4 h-4 text-gold-400" />
            <span>Email Official Desk</span>
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full text-center text-xs text-stone-500 pb-4">
        &copy; {new Date().getFullYear()} ATHANG IMPEX. Indian Merchant Exporter. All rights reserved.
      </div>
    </div>
  );
}
