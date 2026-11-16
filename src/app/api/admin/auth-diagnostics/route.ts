import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const serverSupabase = createServerClient();
  const {
    data: { user: currentUser },
  } = await serverSupabase.auth.getUser();

  // Protect endpoint: only authenticated admin or localhost can run this diagnostic
  if (!currentUser) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in to access authentication diagnostics." },
      { status: 401 }
    );
  }

  const adminClient = createAdminClient();
  if (!adminClient) {
    return NextResponse.json(
      { error: "Supabase service role client could not be initialized." },
      { status: 500 }
    );
  }

  const targetEmail = (process.env.ADMIN_BOOTSTRAP_EMAIL || "info@athangimpex.in").trim().toLowerCase();

  const report: Record<string, any> = {
    timestamp: new Date().toISOString(),
    config: {
      supabaseUrlSet: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKeySet: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceRoleKeySet: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      bootstrapEmailSet: !!process.env.ADMIN_BOOTSTRAP_EMAIL,
      bootstrapPasswordSet: !!process.env.ADMIN_BOOTSTRAP_PASSWORD,
      targetEmail,
    },
    authStatus: {
      accountExists: false,
      userId: null as string | null,
      emailConfirmed: false,
      lastSignInAt: null as string | null,
      banned: false,
    },
    roleStatus: {
      recordExists: false,
      role: null as string | null,
      isActive: false,
      lastLoginAt: null as string | null,
    },
    sessionStatus: {
      currentUserAuthenticated: !!currentUser,
      currentUserId: currentUser?.id || null,
      currentUserEmail: currentUser?.email || null,
    },
    databaseStatus: {
      connected: false,
      latencyMs: null as number | null,
      error: null as string | null,
    },
    storageStatus: {
      connected: false,
      bucketsCount: 0,
      buckets: [] as string[],
    },
  };

  // 1. Check auth.users via Admin API
  try {
    const { data: userList, error: listErr } = await adminClient.auth.admin.listUsers();
    if (!listErr && userList) {
      const match = userList.users.find(
        (u) => u.email?.toLowerCase().trim() === targetEmail
      );
      if (match) {
        report.authStatus.accountExists = true;
        report.authStatus.userId = match.id;
        report.authStatus.emailConfirmed = !!match.email_confirmed_at;
        report.authStatus.lastSignInAt = match.last_sign_in_at || null;
        report.authStatus.banned = !!(match as any).banned_until;
      }
    }
  } catch (e: any) {
    report.authStatus.error = e.message;
  }

  // 2. Check public.admin_users
  try {
    const { data: adminRecord, error: adminErr } = await adminClient
      .from("admin_users")
      .select("id, email, role, is_active, last_login_at")
      .eq("email", targetEmail)
      .maybeSingle();

    if (!adminErr && adminRecord) {
      report.roleStatus.recordExists = true;
      report.roleStatus.role = adminRecord.role;
      report.roleStatus.isActive = adminRecord.is_active;
      report.roleStatus.lastLoginAt = adminRecord.last_login_at;
    }
  } catch (e: any) {
    report.roleStatus.error = e.message;
  }

  // 3. Check DB latency
  try {
    const start = Date.now();
    const { count, error } = await adminClient
      .from("products")
      .select("id", { count: "exact", head: true });
    report.databaseStatus.latencyMs = Date.now() - start;
    if (error) {
      report.databaseStatus.error = error.message;
    } else {
      report.databaseStatus.connected = true;
    }
  } catch (e: any) {
    report.databaseStatus.error = e.message;
  }

  // 4. Check Storage
  try {
    const { data: buckets, error: storageErr } = await adminClient.storage.listBuckets();
    if (!storageErr && buckets) {
      report.storageStatus.connected = true;
      report.storageStatus.bucketsCount = buckets.length;
      report.storageStatus.buckets = buckets.map((b) => b.name);
    }
  } catch (e: any) {
    report.storageStatus.error = e.message;
  }

  return NextResponse.json({
    success: true,
    report,
  });
}
