import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { 
  UIOverlayProvider, 
  useUIOverlay, 
  getCookieOffset, 
  getPWAOffset, 
  getWhatsAppOffset 
} from "./UIOverlayContext";

describe("UIOverlayContext", () => {
  it("provides default values", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UIOverlayProvider>{children}</UIOverlayProvider>
    );

    const { result } = renderHook(() => useUIOverlay(), { wrapper });

    expect(result.current.cookieBannerVisible).toBe(false);
    expect(result.current.pwaInstallerVisible).toBe(false);
  });

  it("updates values correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UIOverlayProvider>{children}</UIOverlayProvider>
    );

    const { result } = renderHook(() => useUIOverlay(), { wrapper });

    act(() => {
      result.current.setCookieBannerVisible(true);
      result.current.setPwaInstallerVisible(true);
    });

    expect(result.current.cookieBannerVisible).toBe(true);
    expect(result.current.pwaInstallerVisible).toBe(true);
  });

  it("throws error when used outside provider", () => {
    // Suppress console error for expected error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => renderHook(() => useUIOverlay())).toThrow("useUIOverlay must be used within a UIOverlayProvider");
    
    consoleSpy.mockRestore();
  });

  it("calculates offsets correctly", () => {
    expect(getCookieOffset()).toBe(16);
    
    // getPWAOffset
    expect(getPWAOffset(false)).toBe(16);
    expect(getPWAOffset(true)).toBe(16 + 200 + 12);
    
    // getWhatsAppOffset
    expect(getWhatsAppOffset(false, false)).toBe(20);
    expect(getWhatsAppOffset(true, false)).toBe(20 + 200 + 12);
    expect(getWhatsAppOffset(false, true)).toBe(20 + 180 + 12);
    expect(getWhatsAppOffset(true, true)).toBe(20 + 200 + 12 + 180 + 12);
  });
});
