"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useUIOverlay, getWhatsAppOffset } from "../context/UIOverlayContext";

interface WhatsAppButtonProps {
  prompt: string;
}

export function WhatsAppButton({ prompt }: WhatsAppButtonProps) {
  const { cookieBannerVisible, pwaInstallerVisible } = useUIOverlay();

  const bottomOffset = getWhatsAppOffset(cookieBannerVisible, pwaInstallerVisible);

  return (
    <Link 
      href="https://wa.me/34988461585" 
      className="fixed right-6 sm:right-12 z-[150] bg-[#25D366] text-white p-5 rounded-3xl shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-500 group"
      style={{ bottom: bottomOffset }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white text-primary px-6 py-3 rounded-2xl text-sm font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none border border-black/5 uppercase tracking-widest">
        {prompt}
      </span>
    </Link>
  );
}
