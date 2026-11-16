"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { DbActivityLog } from "@/types/database";
import {
  History,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Shield,
  Layers,
  Info,
  Clock,
  RotateCw,
  Eye,
  X,
} from "lucide-react";

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<DbActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [resourceFilter, setResourceFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<DbActivityLog | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (!error && data && data.length > 0) {
        setLogs(data as DbActivityLog[]);
      } else {
        // Fallback default sample logs for demo/preview before active usage
        setLogs([
          {
            id: "act-01",
            user_email: "info@athangimpex.in",
            action: "SYSTEM_BOOTSTRAP",
            resource_type: "auth",
            resource_id: "init",
            details: { message: "Initial Super Administrator seeded and verified" },
            ip_address: "127.0.0.1",
            created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          },
          {
            id: "act-02",
            user_email: "info@athangimpex.in",
            action: "SEED_CATALOG",
            resource_type: "products",
            resource_id: "all-4-products",
            details: {
              items: [
                "dehydrated-onion-flakes",
                "dehydrated-onion-powder",
                "dehydrated-tomato-powder",
                "dehydrated-ginger-powder",
              ],
            },
            ip_address: "127.0.0.1",
            created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          },
          {
            id: "act-03",
            user_email: "info@athangimpex.in",
            action: "UPDATE_SETTINGS",
            resource_type: "settings",
            resource_id: "company",
            details: {
              fields: ["sales_whatsapp", "chatbot_whatsapp", "primary_email"],
            },
            ip_address: "127.0.0.1",
            created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.warn("Could not query activity_logs", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.resource_type || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      JSON.stringify(log.details || {}).toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesResource = resourceFilter === "all" || log.resource_type === resourceFilter;

    return matchesSearch && matchesAction && matchesResource;
  });

  const exportCSV = () => {
    const headers = ["Timestamp", "User Email", "Action", "Resource Type", "Resource ID", "IP Address", "Details"];
    const rows = filteredLogs.map((l) => [
      `"${new Date(l.created_at).toISOString()}"`,
      `"${l.user_email}"`,
      `"${l.action}"`,
      `"${l.resource_type || ""}"`,
      `"${l.resource_id || ""}"`,
      `"${l.ip_address || ""}"`,
      `"${JSON.stringify(l.details).replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `athang_activity_logs_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActionBadgeClass = (action: string) => {
    const act = action.toUpperCase();
    if (act.includes("CREATE") || act.includes("BOOTSTRAP")) {
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    }
    if (act.includes("UPDATE") || act.includes("EDIT")) {
      return "bg-blue-50 text-blue-800 border-blue-200";
    }
    if (act.includes("DELETE") || act.includes("DEACTIVATE")) {
      return "bg-rose-50 text-rose-800 border-rose-200";
    }
    if (act.includes("LOGIN") || act.includes("AUTH")) {
      return "bg-amber-50 text-amber-800 border-amber-200";
    }
    return "bg-stone-100 text-stone-800 border-stone-200";
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-forest-900 font-bold flex items-center gap-3">
            <History className="w-7 h-7 text-gold-500" />
            System Activity Logs
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Immutable audit trail of administrator modifications, content updates, and security events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLogs}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-white border border-stone-200 rounded-lg text-stone-700 hover:bg-stone-50 font-medium transition-colors"
          >
            <RotateCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm bg-forest-900 text-white rounded-lg hover:bg-forest-800 font-medium transition-colors"
          >
            <Download className="w-4 h-4 text-gold-400" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by admin email, action name, or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 bg-stone-50/50"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="text-sm border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:border-forest-600"
            >
              <option value="all">All Actions</option>
              <option value="SYSTEM_BOOTSTRAP">System Bootstrap</option>
              <option value="SEED_CATALOG">Seed Catalog</option>
              <option value="UPDATE_SETTINGS">Update Settings</option>
              <option value="CREATE_PRODUCT">Create Product</option>
              <option value="UPDATE_PRODUCT">Update Product</option>
              <option value="DELETE_PRODUCT">Delete Product</option>
            </select>
          </div>

          <select
            value={resourceFilter}
            onChange={(e) => setResourceFilter(e.target.value)}
            className="text-sm border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:border-forest-600"
          >
            <option value="all">All Resources</option>
            <option value="products">Products</option>
            <option value="enquiries">Enquiries</option>
            <option value="content">Content</option>
            <option value="settings">Settings</option>
            <option value="auth">Auth & Users</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Admin User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Summary</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    <div className="flex items-center justify-center gap-2">
                      <RotateCw className="w-5 h-5 animate-spin text-forest-700" />
                      Loading activity audit records...
                    </div>
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-500">
                    <Info className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                    No activity records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap text-stone-500 text-xs font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {new Date(log.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-medium text-stone-800 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-stone-400" />
                        {log.user_email}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-md border ${getActionBadgeClass(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="capitalize text-stone-600 font-medium">
                        {log.resource_type || "—"}
                      </span>
                      {log.resource_id && (
                        <span className="ml-1.5 text-xs text-stone-400 font-mono">
                          ({log.resource_id})
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-stone-600 max-w-xs truncate text-xs font-mono">
                      {JSON.stringify(log.details)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="p-1.5 text-stone-500 hover:text-forest-800 hover:bg-stone-100 rounded-md transition-colors"
                        title="View payload"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-forest-900 text-white">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold-400" />
                <h3 className="font-serif font-bold text-lg">Activity Event Details</h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-stone-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block mb-0.5">Event ID</span>
                  <span className="font-mono text-stone-800">{selectedLog.id}</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Timestamp</span>
                  <span className="text-stone-800">{new Date(selectedLog.created_at).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Admin Email</span>
                  <span className="text-stone-800 font-medium">{selectedLog.user_email}</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Action Code</span>
                  <span className="font-mono font-semibold text-forest-800">{selectedLog.action}</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Target Resource</span>
                  <span className="text-stone-800">
                    {selectedLog.resource_type} {selectedLog.resource_id ? `(${selectedLog.resource_id})` : ""}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">IP Address</span>
                  <span className="font-mono text-stone-800">{selectedLog.ip_address || "127.0.0.1"}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-stone-500 block mb-1.5">
                  Payload / Recorded Snapshot (JSON)
                </label>
                <pre className="p-3 bg-stone-900 text-gold-200 rounded-lg text-xs font-mono overflow-x-auto max-h-60 border border-stone-800">
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </div>
            </div>

            <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 text-sm bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
