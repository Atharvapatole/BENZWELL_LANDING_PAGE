import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  const checks: Record<string, any> = {
    env: {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      bootstrapEmail: !!process.env.ADMIN_BOOTSTRAP_EMAIL,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
    database: {
      status: "unknown",
      latencyMs: null,
      error: null,
    },
    storage: {
      status: "unknown",
      buckets: [] as string[],
    },
    version: {
      node: process.version,
      next: "14.2.35",
      env: process.env.NODE_ENV || "development",
    },
  };

  const supabase = createAdminClient();

  if (!supabase) {
    checks.database.status = "not_configured";
    checks.database.error = "Supabase service role client could not be initialized (missing keys).";
    checks.storage.status = "not_configured";
    return NextResponse.json({
      healthy: false,
      timestamp: new Date().toISOString(),
      responseTimeMs: Date.now() - startTime,
      checks,
    });
  }

  // 1. Test database query
  try {
    const dbStart = Date.now();
    const { count, error } = await supabase
      .from("products")
      .select("id", { count: "exact", head: true });

    checks.database.latencyMs = Date.now() - dbStart;
    if (error) {
      checks.database.status = "error";
      checks.database.error = error.message;
    } else {
      checks.database.status = "healthy";
      checks.database.productsCount = count ?? 0;
    }
  } catch (err: any) {
    checks.database.status = "error";
    checks.database.error = err.message || "Failed to query database";
  }

  // 2. Test storage buckets
  try {
    const { data: buckets, error: storageErr } = await supabase.storage.listBuckets();
    if (storageErr) {
      checks.storage.status = "error";
      checks.storage.error = storageErr.message;
    } else {
      checks.storage.status = "healthy";
      checks.storage.buckets = (buckets || []).map((b) => b.name);
    }
  } catch (err: any) {
    checks.storage.status = "error";
    checks.storage.error = err.message || "Failed to query storage buckets";
  }

  const isHealthy = checks.database.status === "healthy" && checks.storage.status === "healthy";

  return NextResponse.json({
    healthy: isHealthy,
    timestamp: new Date().toISOString(),
    responseTimeMs: Date.now() - startTime,
    checks,
  });
}
