"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { DbCategory } from "@/types/database";
import {
  FolderTree,
  Plus,
  FileEdit,
  Trash2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertCircle,
  X,
  Save,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<DbCategory | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    display_order: 1,
    is_active: true,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });

      if (data) setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: "",
      display_order: categories.length + 1,
      is_active: true,
    });
    setErrorMsg("");
    setModalOpen(true);
  };

  const openEditModal = (cat: DbCategory) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      image: cat.image || "",
      display_order: cat.display_order,
      is_active: cat.is_active,
    });
    setErrorMsg("");
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setFormData((prev) => {
      const updated = { ...prev, name: val };
      if (!editingCategory && !prev.slug) {
        updated.slug = val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.slug.trim()) {
      setErrorMsg("Category name and slug are required.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      const payload = {
        name: formData.name.trim(),
        slug: formData.slug.trim().toLowerCase(),
        description: formData.description.trim(),
        image: formData.image.trim(),
        display_order: Number(formData.display_order) || 1,
        is_active: formData.is_active,
        updated_at: new Date().toISOString(),
      };

      if (editingCategory) {
        const { error } = await supabase
          .from("categories")
          .update(payload)
          .eq("id", editingCategory.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("categories").insert(payload);
        if (error) throw error;
      }

      setModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save category.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cat: DbCategory) => {
    if (
      !confirm(
        `Are you sure you want to delete category "${cat.name}"? Products linked to it will remain safe with null category.`
      )
    ) {
      return;
    }

    try {
      const supabase = createClient();
      await supabase.from("categories").delete().eq("id", cat.id);
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    } catch (err) {
      console.error("Delete category error:", err);
    }
  };

  const toggleActive = async (cat: DbCategory) => {
    try {
      const supabase = createClient();
      const updated = !cat.is_active;
      await supabase
        .from("categories")
        .update({ is_active: updated })
        .eq("id", cat.id);
      setCategories((prev) =>
        prev.map((c) => (c.id === cat.id ? { ...c, is_active: updated } : c))
      );
    } catch (err) {
      console.error("Toggle active error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
            Taxonomy
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
            Category Management
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Organize products into commercial classifications for the public catalog
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchCategories}
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal text-xs"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-gold" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg border border-charcoal-border overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-charcoal-muted">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
            <span>Loading categories...</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-muted space-y-3">
            <FolderTree className="w-10 h-10 text-charcoal-muted/50 mx-auto" />
            <p className="font-semibold text-sm text-forest">No categories created</p>
            <button
              onClick={openCreateModal}
              className="text-xs font-semibold text-forest underline hover:text-gold"
            >
              Create the first category
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal">
              <thead className="bg-ivory-100 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider border-b border-charcoal-border">
                <tr>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Name & Slug</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-border/50">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-ivory-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-forest">
                      #{cat.display_order}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-forest text-sm">
                        {cat.name}
                      </span>
                      <p className="text-[11px] text-charcoal-muted font-mono">
                        /{cat.slug}
                      </p>
                    </td>
                    <td className="py-3 px-4 max-w-sm text-charcoal-muted line-clamp-2">
                      {cat.description || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleActive(cat)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          cat.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {cat.is_active ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-gray-500" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-charcoal-muted hover:text-forest rounded hover:bg-ivory-100"
                        title="Edit Category"
                      >
                        <FileEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
                        className="p-1.5 text-charcoal-muted hover:text-red-600 rounded hover:bg-red-50"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4 shadow-xl border border-charcoal-border">
            <div className="flex items-center justify-between border-b border-charcoal-border/60 pb-3">
              <h3 className="font-serif text-lg font-bold text-forest">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-charcoal-muted hover:text-charcoal p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Dehydrated Products"
                  className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="dehydrated-products"
                  className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Category commercial summary..."
                  className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center pt-1">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 bg-ivory-50 border border-charcoal-border rounded text-charcoal font-mono"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_active: e.target.checked,
                        })
                      }
                      className="rounded text-forest"
                    />
                    <span className="font-semibold text-forest">
                      Active on Website
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-charcoal-border/60 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-charcoal-border text-charcoal rounded text-xs font-semibold hover:bg-ivory-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider"
                >
                  <Save className="w-3.5 h-3.5 text-gold" />
                  <span>{submitting ? "Saving..." : "Save Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
