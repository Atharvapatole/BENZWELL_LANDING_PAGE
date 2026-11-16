"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminUser, AdminRole } from "@/types/database";
import {
  ShieldAlert,
  UserCheck,
  UserX,
  RefreshCw,
  AlertCircle,
  KeyRound,
  Shield,
  Clock,
} from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<AdminRole | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: myProfile } = await supabase
          .from("admin_users")
          .select("role")
          .eq("id", user.id)
          .single();
        if (myProfile) setCurrentUserRole(myProfile.role);
      }

      const { data } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: true });

      if (data) setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: AdminRole) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("admin_users")
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq("id", userId);

      if (error) throw error;
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err: any) {
      alert("Role update error: " + err.message);
    }
  };

  const toggleUserActive = async (user: AdminUser) => {
    try {
      const supabase = createClient();
      const updated = !user.is_active;
      const { error } = await supabase
        .from("admin_users")
        .update({ is_active: updated, updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (error) throw error;
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, is_active: updated } : u))
      );
    } catch (err: any) {
      alert("Status update error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
            Access Control
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
            Admin User Management & Roles
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Manage authorized staff members, role tiers (Super Admin, Editor, Sales), and account security
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal text-xs flex items-center gap-1.5"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Role Tier Hierarchy Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-charcoal-border space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-xs text-forest">
            <Shield className="w-4 h-4 text-gold" />
            <span>SUPER ADMIN</span>
          </div>
          <p className="text-[11px] text-charcoal-muted leading-relaxed">
            Unrestricted access: manage administrator roles, website settings, delete records, and manage database functions.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-charcoal-border space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-xs text-forest">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>EDITOR</span>
          </div>
          <p className="text-[11px] text-charcoal-muted leading-relaxed">
            Content access: create and update products, categories, homepage CMS copy, and upload images.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-charcoal-border space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-xs text-forest">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>SALES</span>
          </div>
          <p className="text-[11px] text-charcoal-muted leading-relaxed">
            CRM access: view inquiries, manage leads, update pipeline statuses, and record customer notes.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-charcoal-border overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-charcoal-muted">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
            <span>Loading admin accounts...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-muted space-y-2">
            <ShieldAlert className="w-8 h-8 text-charcoal-muted mx-auto" />
            <p className="font-semibold text-sm text-forest">No administrator records found</p>
            <p className="max-w-md mx-auto">
              Run the initial administrator bootstrap script at <code>POST /api/admin/bootstrap</code> to provision the primary account.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal">
              <thead className="bg-ivory-100 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider border-b border-charcoal-border">
                <tr>
                  <th className="py-3 px-4">Admin Name & Email</th>
                  <th className="py-3 px-3">Role Tier</th>
                  <th className="py-3 px-3">Account Status</th>
                  <th className="py-3 px-3">Last Active</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-border/50">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-ivory-50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-forest text-sm">
                        {u.full_name || "Administrator"}
                      </p>
                      <p className="text-[11px] text-charcoal-muted font-mono">
                        {u.email}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={u.role}
                        onChange={(e) =>
                          handleRoleChange(u.id, e.target.value as AdminRole)
                        }
                        className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 bg-ivory-50 border border-charcoal-border rounded text-forest"
                      >
                        <option value="super_admin">Super Admin</option>
                        <option value="editor">Editor</option>
                        <option value="sales">Sales</option>
                      </select>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          u.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {u.is_active ? "Active" : "Deactivated"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-charcoal-muted font-mono">
                      {u.last_login_at
                        ? new Date(u.last_login_at).toLocaleString()
                        : "Never logged in"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleUserActive(u)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold border ${
                          u.is_active
                            ? "border-red-200 text-red-600 hover:bg-red-50"
                            : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {u.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
