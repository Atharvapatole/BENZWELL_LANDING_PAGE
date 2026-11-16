import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify user is authenticated admin
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Admin session required to revalidate cache." },
        { status: 401 }
      );
    }

    const { data: adminRecord } = await supabase
      .from("admin_users")
      .select("role, is_active")
      .eq("id", user.id)
      .maybeSingle();

    if (!adminRecord || !adminRecord.is_active) {
      return NextResponse.json(
        { error: "Forbidden. Administrative privileges required." },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const targetPath = body.path || "/";

    // 2. Perform cache revalidation
    revalidatePath(targetPath);
    if (targetPath === "/") {
      revalidatePath("/products");
      revalidatePath("/about");
    }

    return NextResponse.json({
      success: true,
      revalidated: targetPath,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to revalidate path" },
      { status: 500 }
    );
  }
}
