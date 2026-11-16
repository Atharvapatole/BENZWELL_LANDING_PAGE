import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // PROTECT AGAINST UNAUTHORIZED EXECUTION:
    // Only allow execution if the caller presents the valid private bootstrap secret
    const bootstrapSecret = process.env.ADMIN_BOOTSTRAP_PASSWORD;
    const authHeader = req.headers.get("x-bootstrap-secret");

    if (!bootstrapSecret || authHeader !== bootstrapSecret) {
      return NextResponse.json(
        { error: "Endpoint not found or unauthorized." },
        { status: 404 }
      );
    }

    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        {
          error:
            "Supabase credentials (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are not configured.",
        },
        { status: 500 }
      );
    }

    const email = (process.env.ADMIN_BOOTSTRAP_EMAIL || "info@athangimpex.in").trim().toLowerCase();
    const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

    if (!password) {
      return NextResponse.json(
        { error: "ADMIN_BOOTSTRAP_PASSWORD is not set in environment." },
        { status: 400 }
      );
    }

    // Check if user already exists in auth.users
    const { data: userList, error: listError } = await adminClient.auth.admin.listUsers();

    if (listError) {
      return NextResponse.json(
        { error: `Auth listing error: ${listError.message}` },
        { status: 500 }
      );
    }

    let user = userList.users.find(
      (u) => u.email?.toLowerCase().trim() === email
    );

    if (!user) {
      // Create user via Admin Auth API
      const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: "Super Administrator",
          role: "super_admin",
        },
      });

      if (createError || !newUser.user) {
        return NextResponse.json(
          { error: `Failed to create admin user: ${createError?.message}` },
          { status: 500 }
        );
      }
      user = newUser.user;
    } else {
      // Update password to match configured ADMIN_BOOTSTRAP_PASSWORD
      await adminClient.auth.admin.updateUserById(user.id, {
        password,
        email_confirm: true,
        user_metadata: {
          ...user.user_metadata,
          full_name: user.user_metadata?.full_name || "Super Administrator",
          role: "super_admin",
        },
      });
    }

    // Upsert into public.admin_users
    const { error: dbError } = await adminClient.from("admin_users").upsert({
      id: user.id,
      email: user.email!,
      full_name: "Super Administrator",
      role: "super_admin",
      is_active: true,
      updated_at: new Date().toISOString(),
    });

    if (dbError) {
      return NextResponse.json(
        { error: `Failed to assign admin permissions: ${dbError.message}` },
        { status: 500 }
      );
    }

    // Log the bootstrap event
    try {
      await adminClient.from("activity_logs").insert({
        user_id: user.id,
        user_email: user.email!,
        action: "ADMIN_BOOTSTRAP",
        resource_type: "auth",
        details: { message: "Initial Super Administrator provisioned and synchronized." },
      });
    } catch {
      // ignore
    }

    return NextResponse.json({
      success: true,
      message: "Administrator account provisioned and synchronized successfully.",
      user: {
        id: user.id,
        email: user.email,
        role: "super_admin",
        confirmed: true,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Bootstrap error" }, { status: 500 });
  }
}
