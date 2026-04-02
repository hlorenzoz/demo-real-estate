/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useUIOverlay, getPWAOffset } from "../context/UIOverlayContext";

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
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const { cookieBannerVisible, setPwaInstallerVisible } = useUIOverlay();

  const isVisible = showInstaller && isScrolledPastHero;

  useEffect(() => {
    setPwaInstallerVisible(isVisible);
  }, [isVisible, setPwaInstallerVisible]);

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

  useEffect(() => {
    if (typeof (globalThis as any).window === "undefined") return;

    const handleScroll = () => {
      // Show after scrolling 600px which is generally past the hero/search area
      setIsScrolledPastHero((globalThis as any).window.scrollY > 600);
    };

    (globalThis as any).window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => (globalThis as any).window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          style={{ 
            bottom: getPWAOffset(cookieBannerVisible) 
          }}
          className="fixed left-6 right-6 lg:left-auto lg:right-10 lg:w-[480px] z-[140] bg-[#EEF1F0] rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] p-6 lg:p-7 border border-white/20 select-none transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 w-full relative">
            <div className="flex items-center gap-4 sm:gap-6 flex-1 w-full min-w-0 pr-8 sm:pr-0">
              {/* App Icon */}
              <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg group border border-[#001D19]/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00473E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image 
                  src="/favicon.svg" 
                  alt="Luxury Living logo" 
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain relative z-10"
                />
              </div>

              {/* Content Area */}
              <div className="flex-1 min-w-0 py-1">
                <p className="text-[#001D19] text-base sm:text-lg font-bold leading-tight mb-0.5 truncate tracking-tight">
                  {lang === 'es' ? 'Acceso Inmediato' : 'Access Luxury Living'}
                </p>
                <p className="text-[#374151] text-xs sm:text-sm font-medium leading-snug lg:leading-tight decoration-0">
                  {lang === 'es' 
                    ? 'Instala nuestro catálogo premium para navegar sin conexión.' 
                    : 'Install our premium properties catalog for offline browsing.'}
                </p>
              </div>

              {/* Close Button on Mobile (absolute for better fit) */}
              <button
                onClick={handleDismiss}
                className="sm:hidden absolute top-0 right-0 text-[#4B5563] hover:text-[#001D19] p-1 rounded-full transition-colors outline-none cursor-pointer"
                aria-label={lang === 'es' ? 'Cerrar instalador' : 'Close installer'}
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleInstall}
                data-testid="pwa-install-btn"
                className="w-full sm:w-auto bg-[#FACC15] hover:bg-[#EAB308] text-[#001D19] px-6 py-2.5 rounded-full flex items-center justify-center gap-2 text-sm font-extrabold shadow-[0_10px_20px_-5px_rgba(250,204,21,0.3)] hover:shadow-[0_15px_30px_-10px_rgba(250,204,21,0.5)] active:scale-95 transition-all outline-none border-none whitespace-nowrap"
              >
                <Download size={14} strokeWidth={3} />
                {lang === 'es' ? 'Instalar' : 'Install'}
              </button>
              
              <button
                onClick={handleDismiss}
                className="hidden sm:flex text-[#4B5563] hover:text-[#001D19] hover:bg-[#001D19]/5 p-2 rounded-full transition-colors outline-none cursor-pointer"
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
