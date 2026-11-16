import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json({ success: true, message: "Fallback mode" });
    }

    // Call rpc increment_product_view or update views_count
    const { data: prod } = await supabase
      .from("products")
      .select("id, views_count")
      .eq("slug", slug)
      .maybeSingle();

    if (prod) {
      await supabase
        .from("products")
        .update({ views_count: (prod.views_count || 0) + 1 })
        .eq("id", prod.id);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
