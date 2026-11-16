"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ChatbotArticleForm from "@/components/admin/ChatbotArticleForm";
import { DbChatbotKnowledge } from "@/types/database";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function EditChatbotArticlePage() {
  const params = useParams();
  const id = params?.id as string;

  const [article, setArticle] = useState<DbChatbotKnowledge | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("chatbot_knowledge")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) throw new Error("Knowledge article not found.");
        setArticle(data);
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to load article.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center text-xs text-charcoal-muted">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-forest mb-2" />
        <span>Loading knowledge article...</span>
      </div>
    );
  }

  if (errorMsg || !article) {
    return (
      <div className="p-6 bg-red-50 text-red-700 text-xs rounded border border-red-200">
        {errorMsg || "Article could not be found."}
      </div>
    );
  }

  return <ChatbotArticleForm initialArticle={article} isEditing={true} />;
}
