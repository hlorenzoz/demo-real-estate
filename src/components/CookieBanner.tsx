"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check local storage for consent.
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    } else if (consent === "accepted") {
      injectCloudflareAnalytics();
    }
  }, []);

  const injectCloudflareAnalytics = () => {
    // Only inject if token is available
    const token = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;
    if (token && typeof window !== "undefined") {
      // Avoid injecting multiple times
      if (!document.getElementById("cf-analytics-script")) {
        const script = document.createElement("script");
        script.id = "cf-analytics-script";
        script.src = "https://static.cloudflareinsights.com/beacon.min.js";
        script.setAttribute("data-cf-beacon", JSON.stringify({ token }));
        script.defer = true;
        document.body.appendChild(script);
      }
    }
  };

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
    injectCloudflareAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-4 sm:p-6"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4 flex-1">
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-primary/5 text-primary items-center justify-center shrink-0">
                <Cookie size={20} />
              </div>
              <div className="text-sm">
                <p className="font-bold text-primary mb-1">We respect your privacy</p>
                <p className="text-text-muted">
                  We use cookies to analyze site traffic and enhance your experience. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>
            
            <div className="flex w-full sm:w-auto gap-3 shrink-0">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-accent transition-colors"
              >
                Accept All
              </button>
            </div>
            
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 sm:hidden text-slate-400"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
