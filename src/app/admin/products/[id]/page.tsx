"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ProductForm from "@/components/admin/ProductForm";
import { DbProduct } from "@/types/database";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<DbProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          throw new Error(error?.message || "Product not found.");
        }
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center text-xs text-charcoal-muted">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
        <span>Loading product details...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{error || "Product could not be found."}</span>
      </div>
    );
  }

  return <ProductForm initialProduct={product} isEditing={true} />;
}
