import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const FALLBACK_ARTICLES = [
  {
    id: "kb-01",
    slug: "company-overview",
    title: "About ATHANG IMPEX",
    category: "company",
    summary: "Overview of ATHANG IMPEX as an Indian merchant export company.",
    content:
      "ATHANG IMPEX is an Indian merchant export company focused on sourcing and supplying quality dehydrated food ingredients for international buyers, food processors, and spice blenders.",
    tags: ["about", "company", "exporter", "india"],
    display_order: 1,
  },
  {
    id: "kb-02",
    slug: "products-overview",
    title: "Available Food Ingredients Range",
    category: "products",
    summary: "Summary of dehydrated ingredients exported by ATHANG IMPEX.",
    content:
      "ATHANG IMPEX supplies Dehydrated Onion Powder, Dehydrated Onion Flakes, Dehydrated Tomato Powder, and Dehydrated Ginger Powder. Sourced from agricultural growing regions in India and processed under controlled dehydration parameters.",
    tags: ["products", "onion", "tomato", "ginger", "ingredients"],
    display_order: 2,
  },
  {
    id: "kb-03",
    slug: "commercial-quotes-redirection",
    title: "Quotations, Pricing, and Commercial Terms",
    category: "policy",
    summary: "Protocol for commercial inquiries, price quotes, and MOQ.",
    content:
      "For commercial quotations, MOQ commitments, current pricing, and contract negotiations, buyers must contact the official Sales Desk on WhatsApp at +91 9923407176 or via info@athangimpex.in.",
    tags: ["pricing", "moq", "quote", "sales"],
    display_order: 3,
  },
];

export async function GET() {
  const systemPolicy = {
    botNumber: "+1 7111647464",
    botPurpose:
      "Informational and exploration assistant for ATHANG IMPEX company profile, dehydrated ingredients, and export overview.",
    mandatoryRestrictions: [
      "Do NOT provide direct price quotations or calculate shipping totals.",
      "Do NOT commit to specific Minimum Order Quantities (MOQ).",
      "Do NOT negotiate commercial terms or payment terms.",
      "Do NOT guarantee inventory availability.",
      "Direct all commercial discussions to the official Sales WhatsApp: +91 9923407176 (https://wa.me/919923407176).",
    ],
    salesWhatsApp: "+91 9923407176",
    salesUrl: "https://wa.me/919923407176",
  };

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      return NextResponse.json({
        success: true,
        policy: systemPolicy,
        knowledgeCount: FALLBACK_ARTICLES.length,
        articles: FALLBACK_ARTICLES,
        source: "seed_fallback",
      });
    }

    const supabase = createClient();
    const { data: articles, error } = await supabase
      .from("chatbot_knowledge")
      .select("id, slug, title, category, summary, content, tags, display_order")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !articles || articles.length === 0) {
      return NextResponse.json({
        success: true,
        policy: systemPolicy,
        knowledgeCount: FALLBACK_ARTICLES.length,
        articles: FALLBACK_ARTICLES,
        source: "seed_fallback",
      });
    }

    return NextResponse.json({
      success: true,
      policy: systemPolicy,
      knowledgeCount: articles.length,
      articles: articles,
      source: "database",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      policy: systemPolicy,
      knowledgeCount: FALLBACK_ARTICLES.length,
      articles: FALLBACK_ARTICLES,
      source: "seed_fallback",
    });
  }
}
