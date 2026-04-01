/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallerProps {
  lang: string;
}

export function PWAInstaller({ lang }: PWAInstallerProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [showInstaller, setShowInstaller] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (typeof (globalThis as any).window !== "undefined" && (globalThis as any).window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handler = (e: Event) => {
      const pwaEvent = e as BeforeInstallPromptEvent;
      pwaEvent.preventDefault();
      setDeferredPrompt(pwaEvent);
      // If we haven't dismissed it, show it when the prompt is ready
      if (!hasDismissed) {
        setShowInstaller(true);
      }
    };

    if (typeof (globalThis as any).window !== "undefined") {
      (globalThis as any).window.addEventListener("beforeinstallprompt", handler);
    }

    // Force show after a delay (7 seconds) to fulfill user request
    const timer = setTimeout(() => {
      if (typeof (globalThis as any).window !== "undefined" && !hasDismissed && !(globalThis as any).window.matchMedia('(display-mode: standalone)').matches) {
        setShowInstaller(true);
      }
    }, 7000);

    return () => {
      if (typeof (globalThis as any).window !== "undefined") {
        (globalThis as any).window.removeEventListener("beforeinstallprompt", handler);
      }
      clearTimeout(timer);
    };
  }, [hasDismissed]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Fallback or instructions if prompted manually before event
    if (typeof (globalThis as any).window !== "undefined") {
      (globalThis as any).window.alert(lang === 'es' 
        ? "Para instalar: abre el menú del navegador y selecciona 'Añadir a pantalla de inicio'." 
        : "To install: open your browser menu and select 'Install app' or 'Add to home screen'.");
    }
      return;
    }
    
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === "accepted") {
        setShowInstaller(false);
        setDeferredPrompt(null);
      } else {
        // If dismissed, we keep the prompt reference if possible, 
        // though most browsers consume it. We'll at least cover the branch.
        console.log("PWA Install dismissed");
      }
    } catch (err) {
      console.error("PWA Install error:", err);
    }
  };

  const handleDismiss = () => {
    setShowInstaller(false);
    setHasDismissed(true);
  };

  return (
    <AnimatePresence>
      {showInstaller && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="fixed bottom-10 left-6 right-6 lg:left-auto lg:right-10 lg:w-[480px] z-[9999] bg-[#EEF1F0] rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] p-6 lg:p-7 border border-white/20 select-none"
        >
          <div className="flex items-center gap-6">
            {/* App Icon */}
            <div className="shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg group border border-[#001D19]/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00473E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image 
                src="/favicon.svg" 
                alt="Luxury Living logo" 
                width={48}
                height={48}
                className="w-12 h-12 object-contain relative z-10"
              />
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <p className="text-[#001D19] text-lg font-bold leading-tight mb-1 truncate tracking-tight">
                {lang === 'es' ? 'Añadir a Inicio' : 'Add to Home Screen'}
              </p>
              <p className="text-[#374151] text-sm font-medium leading-tight decoration-0">
                {lang === 'es' 
                  ? 'Accede a Luxury Living al instante, incluso offline' 
                  : 'Access Luxury Living instantly, even offline'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleInstall}
                className="bg-[#FACC15] hover:bg-[#EAB308] text-[#001D19] px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-extrabold shadow-[0_10px_20px_-5px_rgba(250,204,21,0.3)] hover:shadow-[0_15px_30px_-10px_rgba(250,204,21,0.5)] active:scale-95 transition-all outline-none border-none whitespace-nowrap"
              >
                <Download size={14} strokeWidth={3} />
                {lang === 'es' ? 'Instalar' : 'Install'}
              </button>
              
              <button
                onClick={handleDismiss}
                className="text-[#4B5563] hover:text-[#001D19] hover:bg-[#001D19]/5 p-2 rounded-full transition-colors outline-none cursor-pointer"
                aria-label={lang === 'es' ? 'Cerrar instalador' : 'Close installer'}
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
