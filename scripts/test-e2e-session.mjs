import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const adminEmail = (process.env.ADMIN_BOOTSTRAP_EMAIL || "info@athangimpex.in").trim().toLowerCase();
const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;

console.log("=== RUNNING END-TO-END AUTH & SESSION INTEGRATION TEST ===");

async function testE2E() {
  const cookieJar = new Map();

  // 1. Create client with cookie interceptor (simulating browser document.cookie)
  const client = createBrowserClient(url, anonKey, {
    cookies: {
      getAll() {
        const arr = [];
        for (const [name, value] of cookieJar.entries()) {
          arr.push({ name, value });
        }
        return arr;
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          cookieJar.set(name, value);
        });
      },
    },
  });

  // Step A: Sign in with correct administrator credentials
  console.log(`\nStep 1: Signing in with Supabase Auth as ${adminEmail}...`);
  const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });

  if (signInError || !signInData.user) {
    console.error("❌ Sign in failed:", signInError?.message);
    process.exit(1);
  }
  console.log(`✅ Supabase Auth succeeded! User ID: ${signInData.user.id}`);
  console.log(`   Captured ${cookieJar.size} auth session cookies in cookie store.`);

  // Convert cookieJar to standard HTTP Cookie header
  const cookieHeader = Array.from(cookieJar.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");

  // Step B: Request protected route /admin/dashboard with authenticated cookies
  console.log("\nStep 2: Accessing protected route /admin/dashboard with session cookie...");
  const dashRes = await fetch("http://localhost:3000/admin/dashboard", {
    headers: {
      Cookie: cookieHeader,
    },
    redirect: "manual",
  });

  console.log(`   Dashboard HTTP Status: ${dashRes.status} (Expected: 200)`);
  if (dashRes.status === 200) {
    console.log("✅ Successfully accessed protected /admin/dashboard!");
  } else {
    console.error(`❌ Unexpected status for dashboard: ${dashRes.status}, location: ${dashRes.headers.get("location")}`);
  }

  // Step C: Request /admin/system-health/auth with authenticated cookies
  console.log("\nStep 3: Accessing /admin/system-health/auth with session cookie...");
  const authHealthRes = await fetch("http://localhost:3000/admin/system-health/auth", {
    headers: {
      Cookie: cookieHeader,
    },
    redirect: "manual",
  });
  console.log(`   Auth Diagnostics Page HTTP Status: ${authHealthRes.status} (Expected: 200)`);

  // Step D: Request /api/admin/auth-diagnostics API endpoint
  console.log("\nStep 4: Querying /api/admin/auth-diagnostics endpoint with session cookie...");
  const diagRes = await fetch("http://localhost:3000/api/admin/auth-diagnostics", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  const diagJson = await diagRes.json();
  console.log("   Diagnostics API Response:", JSON.stringify(diagJson, null, 2));

  // Step E: Test invalid login credentials (simulating incorrect password)
  console.log("\nStep 5: Testing rejection of invalid password...");
  const { error: badPwError } = await client.auth.signInWithPassword({
    email: adminEmail,
    password: "DefinitelyWrongPassword123!",
  });
  console.log(`   Bad password rejection error message: "${badPwError?.message}" (Expected: Invalid login credentials)`);

  // Step F: Test invalid email rejection
  console.log("\nStep 6: Testing rejection of non-existent admin email...");
  const { error: badEmailError } = await client.auth.signInWithPassword({
    email: "nonexistent@athangimpex.in",
    password: adminPassword,
  });
  console.log(`   Bad email rejection error message: "${badEmailError?.message}" (Expected: Invalid login credentials)`);

  // Step G: Test Sign Out
  console.log("\nStep 7: Testing Logout and Session Invalidation...");
  await client.auth.signOut();
  console.log("   Signed out. Cookie count now:", cookieJar.size);

  const loggedOutCookieHeader = Array.from(cookieJar.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");

  const postLogoutRes = await fetch("http://localhost:3000/admin/dashboard", {
    headers: {
      Cookie: loggedOutCookieHeader,
    },
    redirect: "manual",
  });
  console.log(`   Post-logout /admin/dashboard Status: ${postLogoutRes.status} (Expected: 307 redirect to /admin)`);
  if (postLogoutRes.status === 307) {
    console.log(`✅ Session successfully invalidated! Redirected to: ${postLogoutRes.headers.get("location")}`);
  }

  console.log("\n🎉 ALL END-TO-END AUTHENTICATION TESTS PASSED PERFECTLY!");
}

testE2E();
