import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-ivory">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-forest/20 border-t-gold rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-widest text-forest">
          ATHANG IMPEX
        </p>
      </div>
    </div>
  );
}
