"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [showInstaller, setShowInstaller] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const pwaEvent = e as BeforeInstallPromptEvent;
      // Prevent the mini-infobar from appearing on mobile
      pwaEvent.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(pwaEvent);
      // Update UI notify the user they can install the PWA
      setShowInstaller(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowInstaller(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {showInstaller && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-[60] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 max-w-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="text-sm font-bold text-primary mb-1">Install App</h4>
              <p className="text-xs text-text-muted font-medium mb-3">Install our app for a faster and better experience.</p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstall}
                  className="bg-primary hover:bg-primary-accent transition-colors text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  <Download size={14} className="inline mr-1" />
                  Install
                </button>
                <button
                  onClick={() => setShowInstaller(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Later
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowInstaller(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
