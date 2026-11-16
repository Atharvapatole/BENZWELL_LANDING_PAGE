import { createClient } from "@supabase/supabase-js";

// Secure Admin Provisioning & Synchronization Script
// Uses Supabase Auth Admin API with SUPABASE_SERVICE_ROLE_KEY
// Never exposes password or secrets to logs.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const adminEmail = (process.env.ADMIN_BOOTSTRAP_EMAIL || "info@athangimpex.in").trim().toLowerCase();
const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;

console.log("=== ATHANG IMPEX - SECURE ADMIN PROVISIONING & SYNC ===");

if (!url || !serviceKey) {
  console.error("❌ ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  process.exit(1);
}

if (!adminPassword) {
  console.error("❌ ERROR: Missing ADMIN_BOOTSTRAP_PASSWORD in environment.");
  process.exit(1);
}

const adminClient = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function provisionAdmin() {
  try {
    console.log(`🔍 Checking if account exists in Supabase Auth for: ${adminEmail}`);

    // 1. List users from Supabase Auth
    const { data: userListData, error: listError } = await adminClient.auth.admin.listUsers();
    if (listError) {
      throw new Error(`Failed to query auth.users: ${listError.message}`);
    }

    let authUser = userListData.users.find(
      (u) => u.email?.toLowerCase().trim() === adminEmail
    );

    if (!authUser) {
      console.log("➕ Account not found in Supabase Auth. Creating new administrator account via Auth Admin API...");
      const { data: createData, error: createError } = await adminClient.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: {
          full_name: "Super Administrator",
          role: "super_admin",
        },
      });

      if (createError || !createData.user) {
        throw new Error(`Failed to create admin in auth.users: ${createError?.message}`);
      }

      authUser = createData.user;
      console.log(`✅ Administrator account created in auth.users (UUID: ${authUser.id}) with email confirmed.`);
    } else {
      console.log(`🔄 Account found in auth.users (UUID: ${authUser.id}). Synchronizing password and ensuring email confirmation...`);
      const { data: updateData, error: updateError } = await adminClient.auth.admin.updateUserById(
        authUser.id,
        {
          password: adminPassword,
          email_confirm: true,
          user_metadata: {
            ...authUser.user_metadata,
            full_name: authUser.user_metadata?.full_name || "Super Administrator",
            role: "super_admin",
          },
        }
      );

      if (updateError || !updateData.user) {
        throw new Error(`Failed to synchronize admin credentials: ${updateError?.message}`);
      }

      authUser = updateData.user;
      console.log("✅ Administrator password synchronized and email confirmation verified.");
    }

    // 2. Ensure admin_users record exists with super_admin role
    console.log(`🔍 Ensuring record exists in public.admin_users for UUID: ${authUser.id}...`);

    const { data: existingAdmin, error: queryError } = await adminClient
      .from("admin_users")
      .select("id, email, role, is_active")
      .eq("id", authUser.id)
      .maybeSingle();

    if (queryError) {
      console.warn(`⚠️ Warning querying admin_users: ${queryError.message}`);
    }

    if (!existingAdmin) {
      console.log("➕ Inserting record into public.admin_users with role: super_admin...");
      const { error: insertError } = await adminClient.from("admin_users").insert({
        id: authUser.id,
        email: adminEmail,
        full_name: "Super Administrator",
        role: "super_admin",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (insertError) {
        throw new Error(`Failed to insert into public.admin_users: ${insertError.message}`);
      }
      console.log("✅ Super Admin record successfully inserted into public.admin_users.");
    } else {
      console.log("🔄 Updating public.admin_users to ensure active super_admin status...");
      const { error: updateDbError } = await adminClient
        .from("admin_users")
        .update({
          email: adminEmail,
          role: "super_admin",
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", authUser.id);

      if (updateDbError) {
        throw new Error(`Failed to update public.admin_users: ${updateDbError.message}`);
      }
      console.log("✅ Super Admin permissions verified and active.");
    }

    // 3. Log audit event in activity_logs
    try {
      await adminClient.from("activity_logs").insert({
        user_id: authUser.id,
        user_email: adminEmail,
        action: "ADMIN_PROVISION_SYNC",
        resource_type: "auth",
        resource_id: authUser.id,
        details: { message: "Initial Super Administrator provisioned and synchronized via Auth Admin API." },
        created_at: new Date().toISOString(),
      });
    } catch (e) {
      // ignore
    }

    // 4. Test actual authentication via anon client (simulating admin login form)
    console.log("\n🧪 Testing login via Supabase Auth signInWithPassword()...");
    const anonClient = createClient(url, anonKey);
    const { data: signInData, error: signInError } = await anonClient.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    if (signInError || !signInData.user) {
      throw new Error(`Test login failed: ${signInError?.message}`);
    }

    console.log(`🎉 TEST LOGIN SUCCESSFUL! Authenticated as: ${signInData.user.email} (UUID: ${signInData.user.id})`);
    console.log("=== PROVISIONING & CREDENTIAL VERIFICATION COMPLETE ===");
  } catch (err) {
    console.error("❌ Bootstrap failed:", err.message);
    process.exit(1);
  }
}

provisionAdmin();
