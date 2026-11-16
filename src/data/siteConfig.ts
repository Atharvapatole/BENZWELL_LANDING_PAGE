export const SITE_CONFIG = {
  name: "ATHANG IMPEX",
  tagline: "Your Trusted Partner for Quality Food Ingredients.",
  legalName: "ATHANG IMPEX",
  businessType: "Indian Merchant Exporter",
  primaryIndustry: "Food Ingredients and Dehydrated Food Products",
  mainBusiness: "Exporting dehydrated food ingredients to international markets.",
  domain: "athangimpex.in",
  baseUrl: "https://athangimpex.in",
  
  // CRITICAL: Distinct WhatsApp Numbers
  salesWhatsApp: {
    number: "+91 9923407176",
    cleanNumber: "919923407176",
    label: "Owner / Sales WhatsApp",
    purpose: "Direct business enquiries, importer enquiries, product quotations, bulk purchasing, and commercial terms.",
    link: "https://wa.me/919923407176",
    defaultMessage: "Hello ATHANG IMPEX,\n\nI visited your website and would like to discuss your dehydrated food products.\n\nPlease share further information about your products and business.",
  },
  
  chatbotWhatsApp: {
    number: "+1 7111647464",
    cleanNumber: "17111647464",
    label: "ATHANG IMPEX AI Assistant",
    purpose: "Explore company information, understand available products, and general company-related questions (Non-commercial).",
    link: "https://wa.me/17111647464",
    defaultMessage: "Hello ATHANG IMPEX AI Assistant. I would like to learn more about your company and products.",
  },

  // Contact & Inquiries
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@athangimpex.in",
  country: "India",
  locationDisplay: "India",

  // SEO
  seoTitle: "ATHANG IMPEX | Indian Dehydrated Food Ingredients Exporter",
  seoDescription:
    "Explore ATHANG IMPEX, an Indian merchant exporter of dehydrated onion powder, onion flakes, tomato powder, and ginger powder for international food manufacturers and importers.",
};
