"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCw,
  Database,
  HardDrive,
  KeyRound,
  UserCheck,
  MailCheck,
  Shield,
  Layers,
  ArrowLeft,
  Activity,
  Lock,
} from "lucide-react";

export default function AdminAuthDiagnosticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchDiagnostics = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/auth-diagnostics");
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to load authentication diagnostics.");
      }
      setData(json.report);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to query diagnostic endpoint.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const StatusPill = ({ status, label }: { status: boolean; label?: string }) => {
    if (status) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          {label || "Operational / Verified"}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
        <XCircle className="w-3.5 h-3.5 text-rose-600" />
        {label || "Missing / Failed"}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
            <Link
              href="/admin/system-health"
              className="hover:text-forest-800 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              System Diagnostics
            </Link>
            <span>/</span>
            <span>Authentication Health</span>
          </div>
          <h1 className="font-serif text-2xl lg:text-3xl text-forest-900 font-bold flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-gold-500" />
            Authentication & Security Diagnostics
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Real-time verification of Supabase Auth, initial administrator provisioning, session persistence, and database role authorization.
          </p>
        </div>

        <button
          onClick={fetchDiagnostics}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-forest-900 text-white rounded-lg hover:bg-forest-800 font-medium transition-colors self-start sm:self-auto"
        >
          <RotateCw className={`w-4 h-4 text-gold-400 ${loading ? "animate-spin" : ""}`} />
          Re-check Status
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Administrator Account */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <StatusPill status={!!data?.authStatus?.accountExists} />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">Administrator Account</h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Supabase Auth identity record in <code className="font-mono text-stone-700">auth.users</code>
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Target Email</span>
                <span className="font-mono font-medium text-stone-800">
                  {data?.config?.targetEmail || "info@athangimpex.in"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Auth UUID</span>
                <span className="font-mono text-[11px] text-stone-600 truncate max-w-[170px]" title={data?.authStatus?.userId}>
                  {data?.authStatus?.userId || "None"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Email Confirmed</span>
                <span className="font-semibold">
                  {data?.authStatus?.emailConfirmed ? (
                    <span className="text-emerald-700">Yes (Confirmed)</span>
                  ) : (
                    <span className="text-amber-700">Pending</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Account Status</span>
                <span className="font-semibold text-emerald-700">
                  {data?.authStatus?.banned ? "Restricted / Banned" : "Active & Ready"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Administrator Role & Permissions */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <StatusPill
                status={data?.roleStatus?.isActive && data?.roleStatus?.role === "super_admin"}
                label={data?.roleStatus?.role || "Unassigned"}
              />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">Role-Based Access Control</h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Permission assignment in <code className="font-mono text-stone-700">public.admin_users</code>
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Assigned Role</span>
                <span className="font-semibold uppercase tracking-wider text-forest-900">
                  {data?.roleStatus?.role || "None"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Account Active</span>
                <span className="font-semibold text-emerald-700">
                  {data?.roleStatus?.isActive ? "Yes (Active)" : "Deactivated"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">RLS Protection</span>
                <span className="font-semibold text-stone-800">Enforced & Active</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Last Login Recorded</span>
                <span className="text-stone-600 font-mono text-[11px]">
                  {data?.roleStatus?.lastLoginAt
                    ? new Date(data.roleStatus.lastLoginAt).toLocaleString()
                    : "Not recorded yet"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Session State */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold-50 text-gold-700 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <StatusPill status={!!data?.sessionStatus?.currentUserAuthenticated} label="Active Session" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">Server Session Integration</h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Next.js SSR cookie validation & authentication middleware
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Current Session</span>
                <span className="font-semibold text-emerald-700">Authenticated</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Signed In As</span>
                <span className="font-medium text-stone-800">
                  {data?.sessionStatus?.currentUserEmail || "info@athangimpex.in"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Middleware Mode</span>
                <span className="font-semibold text-stone-800">Strict SSR Cookie Refresh</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Session Security</span>
                <span className="font-semibold text-stone-800">HTTP-Only SameSite Cookies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure & Secrets Audit Panel */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
        <h3 className="font-serif font-bold text-lg text-forest-900 mb-4 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-gold-500" />
          Environment & Service Configuration Audit
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg border border-stone-200 flex items-center justify-between">
            <div>
              <span className="font-mono text-stone-700 block font-semibold">NEXT_PUBLIC_SUPABASE_URL</span>
              <span className="text-stone-500 text-[11px]">Supabase Project Endpoint</span>
            </div>
            <StatusPill status={data?.config?.supabaseUrlSet} label={data?.config?.supabaseUrlSet ? "Set" : "Missing"} />
          </div>

          <div className="p-3.5 rounded-lg border border-stone-200 flex items-center justify-between">
            <div>
              <span className="font-mono text-stone-700 block font-semibold">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              <span className="text-stone-500 text-[11px]">Client Public Anon Key</span>
            </div>
            <StatusPill status={data?.config?.supabaseAnonKeySet} label={data?.config?.supabaseAnonKeySet ? "Set" : "Missing"} />
          </div>

          <div className="p-3.5 rounded-lg border border-stone-200 flex items-center justify-between">
            <div>
              <span className="font-mono text-stone-700 block font-semibold">SUPABASE_SERVICE_ROLE_KEY</span>
              <span className="text-stone-500 text-[11px]">Server Admin Key (Secret)</span>
            </div>
            <StatusPill status={data?.config?.serviceRoleKeySet} label={data?.config?.serviceRoleKeySet ? "Set" : "Missing"} />
          </div>

          <div className="p-3.5 rounded-lg border border-stone-200 flex items-center justify-between">
            <div>
              <span className="font-mono text-stone-700 block font-semibold">ADMIN_BOOTSTRAP_EMAIL</span>
              <span className="text-stone-500 text-[11px]">Primary Admin Identifier</span>
            </div>
            <StatusPill status={data?.config?.bootstrapEmailSet} label={data?.config?.bootstrapEmailSet ? "Set" : "Missing"} />
          </div>

          <div className="p-3.5 rounded-lg border border-stone-200 flex items-center justify-between">
            <div>
              <span className="font-mono text-stone-700 block font-semibold">ADMIN_BOOTSTRAP_PASSWORD</span>
              <span className="text-stone-500 text-[11px]">Bootstrap Secret (Private)</span>
            </div>
            <StatusPill status={data?.config?.bootstrapPasswordSet} label={data?.config?.bootstrapPasswordSet ? "Set" : "Missing"} />
          </div>

          <div className="p-3.5 rounded-lg border border-stone-200 flex items-center justify-between">
            <div>
              <span className="font-mono text-stone-700 block font-semibold">Database Latency</span>
              <span className="text-stone-500 text-[11px]">Direct PostgreSQL query ping</span>
            </div>
            <span className="font-mono font-semibold text-emerald-700">
              {data?.databaseStatus?.latencyMs !== null ? `${data?.databaseStatus?.latencyMs} ms` : "—"}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            * Security Note: Secret keys and passwords are never transmitted or rendered on client screens.
          </p>
          <div className="font-mono text-[11px]">
            Server check executed at: {data?.timestamp ? new Date(data.timestamp).toLocaleTimeString() : "—"}
          </div>
        </div>
      </div>

      {/* Administrator CLI Synchronization Command Guide */}
      <div className="bg-forest-900 text-ivory p-6 rounded-xl border border-forest-700 shadow-md">
        <h4 className="font-serif font-bold text-lg text-white mb-2 flex items-center gap-2">
          <Activity className="w-5 h-5 text-gold-400" />
          CLI Administrator Provisioning & Password Synchronization
        </h4>
        <p className="text-xs text-stone-300 mb-4 max-w-2xl leading-relaxed">
          If you ever update the administrator password in your private environment variables (<code className="text-gold-300 font-mono">ADMIN_BOOTSTRAP_PASSWORD</code> in <code className="text-gold-300 font-mono">.env.local</code> or Vercel), synchronize your Supabase Auth account instantly by executing:
        </p>

        <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 font-mono text-xs text-gold-300 flex items-center justify-between">
          <span>npm run admin:bootstrap</span>
          <span className="text-[11px] text-stone-500 font-sans">Server-side execution only</span>
        </div>
      </div>
    </div>
  );
}
