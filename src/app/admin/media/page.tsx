"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Folder,
  FileText,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
  Tag,
} from "lucide-react";

interface LocalAsset {
  id: string;
  name: string;
  category: string;
  path: string;
  description: string;
  size: string;
}

const PRODUCTION_ASSETS: LocalAsset[] = [
  {
    id: "hero-ship",
    name: "hero-container-ship.jpg",
    category: "Homepage Hero",
    path: "/images/hero/hero-container-ship.jpg",
    description: "Maritime container ship at international port terminal for homepage hero background.",
    size: "529 KB (High Resolution)",
  },
  {
    id: "onion-powder",
    name: "dehydrated-onion-powder.jpg",
    category: "Onion Powder",
    path: "/images/products/dehydrated-onion-powder.jpg",
    description: "Finely milled dehydrated onion powder in wooden bowl with fresh onions.",
    size: "1.76 MB (High Resolution)",
  },
  {
    id: "onion-flakes",
    name: "dehydrated-onion-flakes.jpg",
    category: "Onion Flakes",
    path: "/images/products/dehydrated-onion-flakes.jpg",
    description: "Kibbled white dehydrated onion flakes (8-25mm) in rustic ceramic bowl.",
    size: "3.80 MB (High Resolution)",
  },
  {
    id: "tomato-powder",
    name: "dehydrated-tomato-powder.jpg",
    category: "Tomato Powder",
    path: "/images/products/dehydrated-tomato-powder.jpg",
    description: "Deep red dehydrated tomato powder with ripe vine tomatoes.",
    size: "5.26 MB (High Resolution)",
  },
  {
    id: "ginger-powder",
    name: "dehydrated-ginger-powder.jpg",
    category: "Ginger Powder",
    path: "/images/products/dehydrated-ginger-powder.jpg",
    description: "Golden aromatic ginger powder with whole fresh ginger root.",
    size: "2.23 MB (High Resolution)",
  },
  {
    id: "sourcing-agri",
    name: "sourcing-agriculture.jpg",
    category: "About & Sourcing",
    path: "/images/about/sourcing-agriculture.jpg",
    description: "Agricultural harvesting and sound raw ingredient sourcing in India.",
    size: "398 KB (High Resolution)",
  },
  {
    id: "quality-insp",
    name: "quality-inspection.jpg",
    category: "Quality & Inspection",
    path: "/images/about/quality-inspection.jpg",
    description: "Laboratory testing and food safety moisture inspection.",
    size: "637 KB (High Resolution)",
  },
  {
    id: "export-logistics",
    name: "export-logistics.jpg",
    category: "Export & Logistics",
    path: "/images/about/export-logistics.jpg",
    description: "Container terminal loading and maritime export logistics.",
    size: "276 KB (High Resolution)",
  },
];

const CATEGORIES = [
  "All Assets",
  "Homepage Hero",
  "Onion Powder",
  "Onion Flakes",
  "Tomato Powder",
  "Ginger Powder",
  "About & Sourcing",
  "Quality & Inspection",
  "Export & Logistics",
  "Supabase Storage",
];

export default function AdminMediaPage() {
  const [activeCategory, setActiveCategory] = useState("All Assets");
  const [currentBucket, setCurrentBucket] = useState("products");
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const buckets = [
    { id: "products", name: "Products" },
    { id: "website-assets", name: "Website Assets" },
    { id: "categories", name: "Categories" },
    { id: "documents", name: "Documents (Private)" },
  ];

  const fetchFiles = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from(currentBucket)
        .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

      if (error) throw error;
      setFiles(data || []);
    } catch (err: any) {
      console.warn("Storage list error:", err.message);
      setErrorMsg(
        `Bucket [${currentBucket}] could not be listed. Ensure migrations in /supabase/sql/009_storage_buckets.sql have been run.`
      );
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory === "Supabase Storage") {
      fetchFiles();
    }
  }, [currentBucket, activeCategory]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const cleanName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const { error } = await supabase.storage
          .from(currentBucket)
          .upload(cleanName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw error;
      }
      fetchFiles();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload file(s).");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const filteredLocalAssets = PRODUCTION_ASSETS.filter((item) => {
    const matchesCategory =
      activeCategory === "All Assets" || item.category === activeCategory;
    const matchesQuery =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border/60 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold-50 px-2.5 py-1 rounded border border-gold/30">
            Digital Asset Management
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1.5">
            Media Library & Assets
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Genuine high-resolution product photography, maritime logistics imagery, and cloud storage
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-forest hover:bg-forest-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-gold" />
            <span>{uploading ? "Uploading..." : "Upload New File"}</span>
            <input
              type="file"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-amber-50 text-amber-800 text-xs rounded border border-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Category Pills & Search */}
      <div className="bg-white p-4 rounded-lg border border-charcoal-border space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
              Category Filter:
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-charcoal-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets by name or tag..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-ivory-50 border border-charcoal-border rounded text-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-charcoal-border/50">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-forest text-white font-bold"
                  : "bg-ivory-100 text-charcoal hover:bg-ivory-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Local Production Real Photography Grid */}
      {activeCategory !== "Supabase Storage" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-border/50 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Website Production Photography ({filteredLocalAssets.length})
              </h3>
              <p className="text-xs text-charcoal-muted">
                Licensed, genuine photography deployed on public pages. Click &quot;Copy Path&quot; to insert into CMS or Product fields.
              </p>
            </div>
          </div>

          {filteredLocalAssets.length === 0 ? (
            <div className="py-12 text-center text-xs text-charcoal-muted">
              No assets found matching your search filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredLocalAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="group bg-ivory-50 border border-charcoal-border/70 rounded-lg overflow-hidden flex flex-col justify-between hover:border-gold transition-all shadow-xs"
                >
                  <div className="relative aspect-[4/3] w-full bg-forest-900 overflow-hidden">
                    <Image
                      src={asset.path}
                      alt={asset.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-forest/80 backdrop-blur-xs text-gold text-[10px] font-bold uppercase tracking-wider">
                      {asset.category}
                    </span>
                  </div>

                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-mono text-xs font-bold text-forest truncate" title={asset.name}>
                        {asset.name}
                      </p>
                      <p className="text-[11px] text-charcoal-muted mt-1 leading-snug">
                        {asset.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-charcoal-border/50 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-charcoal-muted font-mono">{asset.size}</span>
                      <button
                        onClick={() => copyPath(asset.path)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-ivory border border-charcoal-border rounded text-[11px] font-medium text-forest transition-colors"
                      >
                        {copiedPath === asset.path ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-gold" />
                            <span>Copy Path</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Remote Supabase Storage Section */}
      {activeCategory === "Supabase Storage" && (
        <div className="bg-white p-6 rounded-lg border border-charcoal-border space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-border/50 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Supabase Cloud Storage Buckets
              </h3>
              <p className="text-xs text-charcoal-muted">
                Dynamic user-uploaded assets stored in cloud object storage
              </p>
            </div>

            <div className="flex items-center gap-2">
              {buckets.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setCurrentBucket(b.id)}
                  className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                    currentBucket === b.id
                      ? "bg-forest text-white"
                      : "bg-ivory-100 text-charcoal hover:bg-ivory-200"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-xs text-charcoal-muted">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
              <span>Listing cloud assets in bucket [{currentBucket}]...</span>
            </div>
          ) : files.length === 0 ? (
            <div className="py-16 text-center text-xs text-charcoal-muted space-y-3">
              <ImageIcon className="w-10 h-10 text-charcoal-muted/50 mx-auto" />
              <p className="font-semibold text-sm text-forest">No files found in bucket [{currentBucket}]</p>
              <p className="max-w-xs mx-auto">
                Use &quot;Upload New File&quot; above to add images or documents to this bucket.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {files.map((f) => (
                <div
                  key={f.name}
                  className="bg-ivory-50 border border-charcoal-border rounded p-3 text-xs space-y-2"
                >
                  <p className="font-medium truncate text-forest">{f.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
