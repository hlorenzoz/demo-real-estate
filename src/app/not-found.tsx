"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RootNotFound() {
  useEffect(() => {
    // Redirect absolute root 404s to English as the primary hub
    redirect("/en/not-found");
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-slate-700 border-t-white rounded-full animate-spin" />
    </div>
  );
}
