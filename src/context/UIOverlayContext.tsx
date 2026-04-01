"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UIOverlayContextType {
  cookieBannerVisible: boolean;
  setCookieBannerVisible: (visible: boolean) => void;
  pwaInstallerVisible: boolean;
  setPwaInstallerVisible: (visible: boolean) => void;
}

const UIOverlayContext = createContext<UIOverlayContextType | undefined>(undefined);

export function getCookieOffset() {
  return 16;
}

export function getPWAOffset(isCookieVisible: boolean) {
  if (!isCookieVisible) return 16;
  return 16 + 200 + 12; // 200 is better for banner height
}

export function getWhatsAppOffset(isCookieVisible: boolean, isPWAVisible: boolean) {
  let offset = 20;
  if (isCookieVisible) offset += 200 + 12;
  if (isPWAVisible) offset += 180 + 12; // 180 is better for PWA height
  return offset;
}

export function UIOverlayProvider({ children }: { children: ReactNode }) {
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  const [pwaInstallerVisible, setPwaInstallerVisible] = useState(false);

  return (
    <UIOverlayContext.Provider
      value={{
        cookieBannerVisible,
        setCookieBannerVisible,
        pwaInstallerVisible,
        setPwaInstallerVisible,
      }}
    >
      {children}
    </UIOverlayContext.Provider>
  );
}

export function useUIOverlay() {
  const context = useContext(UIOverlayContext);
  if (context === undefined) {
    throw new Error("useUIOverlay must be used within a UIOverlayProvider");
  }
  return context;
}
