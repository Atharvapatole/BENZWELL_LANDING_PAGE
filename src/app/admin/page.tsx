"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Server,
  RefreshCw,
} from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin/dashboard";
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("info@athangimpex.in");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);

  useEffect(() => {
    // Check if Supabase environment variables are provided
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) {
      setSupabaseConfigured(false);
    }

    if (urlError === "unauthorized") {
      setErrorMsg(
        "Access Denied: Your account does not have administrative privileges."
      );
    }
  }, [urlError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      // Sign in with Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

      if (authError || !authData.user) {
        const rawMsg = (authError?.message || "").toLowerCase();
        if (
          rawMsg.includes("invalid login credentials") ||
          rawMsg.includes("invalid credentials") ||
          rawMsg.includes("invalid_grant")
        ) {
          throw new Error("Incorrect email or password. Please try again.");
        }
        if (rawMsg.includes("email not confirmed")) {
          throw new Error("Account email address has not been confirmed yet.");
        }
        if (
          rawMsg.includes("fetch failed") ||
          rawMsg.includes("network") ||
          rawMsg.includes("connection")
        ) {
          throw new Error(
            "Unable to connect to the authentication service. Please check your network and try again."
          );
        }
        throw new Error(
          authError?.message || "Incorrect email or password. Please try again."
        );
      }

      // Verify admin authorization from admin_users table using the user's UUID
      const { data: adminRecord, error: adminQueryError } = await supabase
        .from("admin_users")
        .select("id, role, is_active, full_name")
        .eq("id", authData.user.id)
        .maybeSingle();

      if (adminQueryError || !adminRecord) {
        // Sign out user immediately if not in admin_users
        await supabase.auth.signOut();
        throw new Error(
          "Your account is authenticated but does not have administrator permissions. Contact the system administrator."
        );
      }

      if (!adminRecord.is_active) {
        await supabase.auth.signOut();
        throw new Error(
          "This administrator account has been deactivated. Please contact the system administrator."
        );
      }

      // Update last_login_at
      await supabase
        .from("admin_users")
        .update({ last_login_at: new Date().toISOString() })
        .eq("id", authData.user.id);

      // Log login event in audit logs
      try {
        await supabase.from("activity_logs").insert({
          user_id: authData.user.id,
          user_email: authData.user.email,
          action: "ADMIN_LOGIN",
          resource_type: "auth",
          details: { role: adminRecord.role },
        });
      } catch {
        // Continue even if logging fails
      }

      // Redirect to target admin route
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(
        err.message || "Authentication failed. Please verify credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-subtle-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-700/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-forest-900 border border-gold/40 shadow-lg mb-3">
            <Logo variant="dark" showSubtitle={false} />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Administrative Control Center
          </h1>
          <p className="text-xs text-gray-300 mt-1 uppercase tracking-widest">
            ATHANG IMPEX • Global Food Ingredients
          </p>
        </div>

        {/* Setup Notification if Supabase credentials are empty */}
        {!supabaseConfigured && (
          <div className="mb-6 p-4 rounded-lg bg-amber-950/80 border border-amber-500/60 text-amber-200 text-xs space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Server className="w-4 h-4" />
              <span>Supabase Configuration Notice</span>
            </div>
            <p>
              Supabase environment variables are not detected in <code className="bg-black/40 px-1 py-0.5 rounded text-amber-100 font-mono">.env.local</code>.
            </p>
            <p className="text-[11px] text-amber-300/80">
              To activate database authentication, add your project credentials to <code className="font-mono">.env.local</code> and run the migrations inside <code className="font-mono">/supabase/sql/</code>.
            </p>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-2xl border border-charcoal-border/80 p-6 sm:p-8">
          <div className="border-b border-charcoal-border/60 pb-4 mb-6">
            <h2 className="font-serif text-xl font-bold text-forest">
              Administrator Login
            </h2>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Secure access for authorized ATHANG IMPEX personnel
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-muted">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@athangimpex.in"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-9 pr-10 py-2.5 text-sm bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal-muted hover:text-charcoal focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Session */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-forest focus:ring-forest border-charcoal-border"
                />
                <span className="text-xs text-charcoal-light font-medium">
                  Keep me signed in
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-gold" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-4 border-t border-charcoal-border/70 flex items-center justify-center gap-2 text-[11px] text-charcoal-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Protected by Supabase Auth & Role-Based Permissions</span>
          </div>
        </div>

        {/* Back to Public Website Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-gray-300 hover:text-gold transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr; Back to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
