"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { DbProduct, DbCategory } from "@/types/database";
import {
  Package,
  Plus,
  Search,
  Filter,
  FileEdit,
  Trash2,
  Copy,
  Eye,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ArrowUpDown,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<DbProduct | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: catData } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });
      if (catData) setCategories(catData);

      const { data: prodData, error } = await supabase
        .from("products")
        .select("*")
        .order("display_order", { ascending: true });

      if (prodData) {
        setProducts(prodData);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.short_description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      p.category_id === selectedCategory ||
      p.category_name?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && p.is_published) ||
      (statusFilter === "draft" && !p.is_published) ||
      (statusFilter === "featured" && p.is_featured);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Toggle single selection
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  // Quick toggle published status
  const togglePublish = async (product: DbProduct) => {
    try {
      const supabase = createClient();
      const updatedStatus = !product.is_published;
      const { error } = await supabase
        .from("products")
        .update({ is_published: updatedStatus })
        .eq("id", product.id);

      if (!error) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, is_published: updatedStatus } : p
          )
        );
      }
    } catch (err) {
      console.error("Error updating publish status:", err);
    }
  };

  // Bulk actions
  const handleBulkPublish = async (publish: boolean) => {
    if (selectedIds.length === 0) return;
    try {
      const supabase = createClient();
      await supabase
        .from("products")
        .update({ is_published: publish })
        .in("id", selectedIds);

      setProducts((prev) =>
        prev.map((p) =>
          selectedIds.includes(p.id) ? { ...p, is_published: publish } : p
        )
      );
      setSelectedIds([]);
    } catch (err) {
      console.error("Bulk publish error:", err);
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (
      !confirm(
        `Are you sure you want to delete ${selectedIds.length} selected products? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const supabase = createClient();
      await supabase.from("products").delete().in("id", selectedIds);
      setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    } catch (err) {
      console.error("Bulk delete error:", err);
    }
  };

  // Delete single product
  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const supabase = createClient();
      await supabase.from("products").delete().eq("id", productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  // Duplicate product
  const duplicateProduct = async (product: DbProduct) => {
    try {
      const supabase = createClient();
      const newSlug = `${product.slug}-copy-${Date.now().toString().slice(-4)}`;
      const { data, error } = await supabase
        .from("products")
        .insert({
          ...product,
          id: undefined,
          slug: newSlug,
          name: `${product.name} (Copy)`,
          is_published: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (data) {
        setProducts((prev) => [data, ...prev]);
      }
    } catch (err) {
      console.error("Duplicate product error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
            Catalog CMS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
            Products Management
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Create, edit, duplicate, publish, and order dehydrated food ingredients
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchProducts}
            className="p-2 bg-white hover:bg-ivory-100 border border-charcoal-border rounded text-charcoal text-xs"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-gold" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-charcoal-border space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Field */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-charcoal-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, slug, or description..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published Only</option>
              <option value="draft">Drafts Only</option>
              <option value="featured">Featured Only</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="pt-3 border-t border-charcoal-border/60 flex items-center justify-between text-xs bg-ivory-50 p-2.5 rounded">
            <span className="font-semibold text-forest">
              {selectedIds.length} item(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkPublish(true)}
                className="px-2.5 py-1 bg-white border border-charcoal-border rounded text-forest font-semibold hover:bg-forest-50"
              >
                Publish Selected
              </button>
              <button
                onClick={() => handleBulkPublish(false)}
                className="px-2.5 py-1 bg-white border border-charcoal-border rounded text-charcoal font-semibold hover:bg-ivory-100"
              >
                Draft Selected
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-2.5 py-1 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-charcoal-border overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-charcoal-muted">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
            <span>Loading product inventory...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-muted space-y-3">
            <Package className="w-10 h-10 text-charcoal-muted/50 mx-auto" />
            <p className="font-semibold text-sm text-forest">No products found</p>
            <p className="max-w-xs mx-auto">
              No products match your current search and filter settings.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal">
              <thead className="bg-ivory-100 text-charcoal-muted uppercase text-[10px] font-bold tracking-wider border-b border-charcoal-border">
                <tr>
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="rounded text-forest"
                    />
                  </th>
                  <th className="py-3 px-3">Product Name & Slug</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Views</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-border/50">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-ivory-50 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(prod.id)}
                        onChange={() => toggleSelect(prod.id)}
                        className="rounded text-forest"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded border border-charcoal-border overflow-hidden bg-ivory-100 flex-shrink-0">
                          <Image
                            src={prod.image || "/images/logo.svg"}
                            alt={prod.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/admin/products/${prod.id}`}
                            className="font-bold text-forest hover:text-gold text-sm"
                          >
                            {prod.name}
                          </Link>
                          <p className="text-[11px] text-charcoal-muted font-mono">
                            /{prod.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium">
                      {prod.category_name || "Dehydrated Products"}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => togglePublish(prod)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          prod.is_published
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        title="Click to toggle status"
                      >
                        {prod.is_published ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-gray-500" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-3 font-mono font-medium">
                      {prod.views_count || 0}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Public Route */}
                        <Link
                          href={`/products/${prod.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-charcoal-muted hover:text-forest rounded hover:bg-ivory-100"
                          title="View on Public Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/admin/products/${prod.id}`}
                          className="p-1.5 text-charcoal-muted hover:text-forest rounded hover:bg-ivory-100"
                          title="Edit Product"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                        </Link>

                        {/* Duplicate */}
                        <button
                          onClick={() => duplicateProduct(prod)}
                          className="p-1.5 text-charcoal-muted hover:text-forest rounded hover:bg-ivory-100"
                          title="Duplicate Product"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            setProductToDelete(prod);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 text-charcoal-muted hover:text-red-600 rounded hover:bg-red-50"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Delete */}
      {deleteModalOpen && productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4 shadow-xl border border-charcoal-border">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-serif text-lg font-bold">
                Confirm Product Deletion
              </h3>
            </div>
            <p className="text-xs text-charcoal-light leading-relaxed">
              Are you sure you want to delete <strong>{productToDelete.name}</strong> (/{productToDelete.slug})? This will permanently remove the product from the catalog.
            </p>
            <div className="pt-3 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-charcoal-border text-charcoal rounded text-xs font-semibold hover:bg-ivory-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
