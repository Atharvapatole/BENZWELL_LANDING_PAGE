"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  Phone,
  Building,
  Globe,
  Palette,
  ShieldAlert,
  Megaphone,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "company" | "whatsapp" | "general" | "branding"
  >("company");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [companySettings, setCompanySettings] = useState({
    name: "ATHANG IMPEX",
    legal_name: "ATHANG IMPEX",
    tagline: "Your Trusted Partner for Quality Food Ingredients.",
    business_type: "Indian Merchant Exporter",
    primary_industry: "Food Ingredients and Dehydrated Food Products",
    domain: "athangimpex.in",
    email: "info@athangimpex.in",
    country: "India",
  });

  const [whatsappSettings, setWhatsappSettings] = useState({
    sales_number: "+91 9923407176",
    chatbot_number: "+1 7111647464",
    sales_prefill:
      "Hello ATHANG IMPEX,\n\nI visited your website and would like to discuss your dehydrated food products.\n\nPlease share further information about your products and business.",
    chatbot_prefill:
      "Hello ATHANG IMPEX AI Assistant. I would like to learn more about your company and products.",
    show_widget: true,
  });

  const [generalSettings, setGeneralSettings] = useState({
    maintenance_mode: false,
    announcement_bar: {
      enabled: false,
      message: "Now accepting international export orders for new harvest season.",
      link: "/products",
    },
  });

  const [brandingSettings, setBrandingSettings] = useState({
    primary_color: "#123D2A",
    secondary_color: "#1B5138",
    accent_color: "#C6A15B",
    background_color: "#F8F7F2",
    logo_url: "/images/logo.svg",
    favicon_url: "/icon.svg",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("website_settings").select("*");
        if (data) {
          data.forEach((row) => {
            if (row.key === "company") setCompanySettings((prev) => ({ ...prev, ...row.value }));
            if (row.key === "whatsapp") setWhatsappSettings((prev) => ({ ...prev, ...row.value }));
            if (row.key === "general") setGeneralSettings((prev) => ({ ...prev, ...row.value }));
            if (row.key === "branding") setBrandingSettings((prev) => ({ ...prev, ...row.value }));
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setErrorMsg("");

    try {
      const supabase = createClient();

      const updates = [
        { key: "company", category: "general", value: companySettings },
        { key: "whatsapp", category: "communication", value: whatsappSettings },
        { key: "general", category: "system", value: generalSettings },
        { key: "branding", category: "design", value: brandingSettings },
      ];

      for (const item of updates) {
        const { error } = await supabase.from("website_settings").upsert(
          {
            key: item.key,
            category: item.category,
            value: item.value,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "key" }
        );
        if (error) throw error;
      }

      // Log settings change
      await supabase.from("activity_logs").insert({
        action: "SETTINGS_UPDATED",
        resource_type: "settings",
        details: { category: activeTab },
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
            System Configuration
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
            Website & Business Settings
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Manage company profile, communication numbers, maintenance mode, and announcement banner
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
        >
          <Save className="w-3.5 h-3.5 text-gold" />
          <span>{saving ? "Saving..." : "Save All Settings"}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully! Public site will reflect updates immediately.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-charcoal-border/70 space-x-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("company")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px ${
            activeTab === "company"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          Company Information
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("whatsapp")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px ${
            activeTab === "whatsapp"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          WhatsApp & Communications
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px ${
            activeTab === "general"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          Announcement & Maintenance
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("branding")}
          className={`py-2.5 px-4 rounded-t-md transition-colors border-b-2 -mb-px ${
            activeTab === "branding"
              ? "border-forest text-forest bg-white font-bold"
              : "border-transparent text-charcoal-muted hover:text-charcoal"
          }`}
        >
          Branding & Identity
        </button>
      </div>

      {/* Tab 1: Company */}
      {activeTab === "company" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={companySettings.name}
                onChange={(e) =>
                  setCompanySettings({ ...companySettings, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">
                Legal Name
              </label>
              <input
                type="text"
                value={companySettings.legal_name}
                onChange={(e) =>
                  setCompanySettings({
                    ...companySettings,
                    legal_name: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1">
              Positioning Statement / Tagline
            </label>
            <input
              type="text"
              value={companySettings.tagline}
              onChange={(e) =>
                setCompanySettings({ ...companySettings, tagline: e.target.value })
              }
              className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">
                Business Type
              </label>
              <input
                type="text"
                value={companySettings.business_type}
                onChange={(e) =>
                  setCompanySettings({
                    ...companySettings,
                    business_type: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">
                Website Domain
              </label>
              <input
                type="text"
                value={companySettings.domain}
                onChange={(e) =>
                  setCompanySettings({
                    ...companySettings,
                    domain: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">
                Official Business Email
              </label>
              <input
                type="email"
                value={companySettings.email}
                onChange={(e) =>
                  setCompanySettings({
                    ...companySettings,
                    email: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: WhatsApp */}
      {activeTab === "whatsapp" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-5 text-xs">
          <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 leading-relaxed">
            <strong>Important Number Separation:</strong> Never interchange these numbers.
            Sales (+91 9923407176) manages quotations, contracts, and pricing. Chatbot (+1 7111647464) is strictly for general company exploration.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Sales WhatsApp */}
            <div className="p-4 bg-forest-50/50 rounded-lg border border-forest/20 space-y-3">
              <span className="font-bold text-forest uppercase tracking-wider block">
                Sales & Commercial WhatsApp
              </span>
              <div>
                <label className="block font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={whatsappSettings.sales_number}
                  onChange={(e) =>
                    setWhatsappSettings({
                      ...whatsappSettings,
                      sales_number: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-charcoal-border rounded font-mono font-bold text-forest"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Default Pre-filled Message
                </label>
                <textarea
                  rows={4}
                  value={whatsappSettings.sales_prefill}
                  onChange={(e) =>
                    setWhatsappSettings({
                      ...whatsappSettings,
                      sales_prefill: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-charcoal-border rounded text-charcoal leading-relaxed"
                />
              </div>
            </div>

            {/* Chatbot WhatsApp */}
            <div className="p-4 bg-ivory-50 rounded-lg border border-charcoal-border space-y-3">
              <span className="font-bold text-charcoal uppercase tracking-wider block">
                AI Assistant WhatsApp
              </span>
              <div>
                <label className="block font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={whatsappSettings.chatbot_number}
                  onChange={(e) =>
                    setWhatsappSettings({
                      ...whatsappSettings,
                      chatbot_number: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-charcoal-border rounded font-mono font-bold text-charcoal"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Default Pre-filled Message
                </label>
                <textarea
                  rows={4}
                  value={whatsappSettings.chatbot_prefill}
                  onChange={(e) =>
                    setWhatsappSettings({
                      ...whatsappSettings,
                      chatbot_prefill: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-charcoal-border rounded text-charcoal leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappSettings.show_widget}
                onChange={(e) =>
                  setWhatsappSettings({
                    ...whatsappSettings,
                    show_widget: e.target.checked,
                  })
                }
                className="rounded text-forest"
              />
              <span className="font-semibold text-forest text-xs">
                Display Floating Dual-Channel WhatsApp Widget on Public Website
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Tab 3: Announcement & Maintenance */}
      {activeTab === "general" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-6 text-xs">
          {/* Announcement Bar */}
          <div className="space-y-3 pb-5 border-b border-charcoal-border/60">
            <h3 className="font-serif text-base font-bold text-forest flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-gold" />
              <span>Top Announcement Bar</span>
            </h3>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={generalSettings.announcement_bar.enabled}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    announcement_bar: {
                      ...generalSettings.announcement_bar,
                      enabled: e.target.checked,
                    },
                  })
                }
                className="rounded text-forest"
              />
              <span className="font-semibold text-charcoal">
                Enable Announcement Bar across public website header
              </span>
            </label>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">
                Announcement Message
              </label>
              <input
                type="text"
                value={generalSettings.announcement_bar.message}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    announcement_bar: {
                      ...generalSettings.announcement_bar,
                      message: e.target.value,
                    },
                  })
                }
                placeholder="e.g. New crop harvest bookings now open for export shipments."
                className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">
                Link URL (Optional)
              </label>
              <input
                type="text"
                value={generalSettings.announcement_bar.link}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    announcement_bar: {
                      ...generalSettings.announcement_bar,
                      link: e.target.value,
                    },
                  })
                }
                placeholder="/products"
                className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal font-mono"
              />
            </div>
          </div>

          {/* Maintenance Mode */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-forest flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Maintenance Mode</span>
            </h3>
            <p className="text-charcoal-muted leading-relaxed">
              When Maintenance Mode is active, public visitors will see a clean branded maintenance message. Authorized administrators can still log in at <code>/admin</code> and view the site.
            </p>
            <label className="flex items-center gap-2 cursor-pointer p-3 bg-ivory-50 rounded border border-charcoal-border/70">
              <input
                type="checkbox"
                checked={generalSettings.maintenance_mode}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    maintenance_mode: e.target.checked,
                  })
                }
                className="rounded text-red-600 focus:ring-red-500"
              />
              <span className="font-bold text-charcoal">
                Activate Maintenance Mode
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Tab 4: Branding */}
      {activeTab === "branding" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">
                Primary Brand Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brandingSettings.primary_color}
                  onChange={(e) =>
                    setBrandingSettings({
                      ...brandingSettings,
                      primary_color: e.target.value,
                    })
                  }
                  className="w-8 h-8 rounded border p-0.5 cursor-pointer"
                />
                <input
                  type="text"
                  value={brandingSettings.primary_color}
                  onChange={(e) =>
                    setBrandingSettings({
                      ...brandingSettings,
                      primary_color: e.target.value,
                    })
                  }
                  className="w-full px-3 py-1.5 bg-ivory-50 border border-charcoal-border rounded font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">
                Accent Gold Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brandingSettings.accent_color}
                  onChange={(e) =>
                    setBrandingSettings({
                      ...brandingSettings,
                      accent_color: e.target.value,
                    })
                  }
                  className="w-8 h-8 rounded border p-0.5 cursor-pointer"
                />
                <input
                  type="text"
                  value={brandingSettings.accent_color}
                  onChange={(e) =>
                    setBrandingSettings({
                      ...brandingSettings,
                      accent_color: e.target.value,
                    })
                  }
                  className="w-full px-3 py-1.5 bg-ivory-50 border border-charcoal-border rounded font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1">
                Logo Asset URL
              </label>
              <input
                type="text"
                value={brandingSettings.logo_url}
                onChange={(e) =>
                  setBrandingSettings({
                    ...brandingSettings,
                    logo_url: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
