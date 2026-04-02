import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { 
  UIOverlayProvider, 
  useUIOverlay, 
  getCookieOffset, 
  getPWAOffset, 
  getWhatsAppOffset 
} from "./UIOverlayContext";

const TestComponent = () => {
    const { 
        cookieBannerVisible, 
        setCookieBannerVisible,
        pwaInstallerVisible,
        setPwaInstallerVisible
    } = useUIOverlay();

    return (
        <div>
            <div data-testid="cookie-visible">{cookieBannerVisible.toString()}</div>
            <div data-testid="pwa-visible">{pwaInstallerVisible.toString()}</div>
            <button onClick={() => setCookieBannerVisible(true)}>Show Cookie</button>
            <button onClick={() => setPwaInstallerVisible(true)}>Show PWA</button>
        </div>
    );
};

describe("UIOverlayContext", () => {
    it("provides the initial state", () => {
        render(
            <UIOverlayProvider>
                <TestComponent />
            </UIOverlayProvider>
        );

        expect(screen.getByTestId("cookie-visible")).toHaveTextContent("false");
        expect(screen.getByTestId("pwa-visible")).toHaveTextContent("false");
    });

    it("updates the state - cookie banner", async () => {
        render(
            <UIOverlayProvider>
                <TestComponent />
            </UIOverlayProvider>
        );

        const btn = screen.getByText("Show Cookie");
        fireEvent.click(btn);

        expect(screen.getByTestId("cookie-visible")).toHaveTextContent("true");
    });

    it("updates the state - pwa installer", async () => {
        render(
            <UIOverlayProvider>
                <TestComponent />
            </UIOverlayProvider>
        );

        const btn = screen.getByText("Show PWA");
        fireEvent.click(btn);

        expect(screen.getByTestId("pwa-visible")).toHaveTextContent("true");
    });

    it("throws error when used outside provider", () => {
        const t = () => render(<TestComponent />);
        expect(t).toThrow("useUIOverlay must be used within a UIOverlayProvider");
    });

    describe("Utility Offset Functions", () => {
        it("getCookieOffset returns static 16", () => {
            expect(getCookieOffset()).toBe(16);
        });

        it("getPWAOffset returns correct heights", () => {
            expect(getPWAOffset(false)).toBe(16);
            expect(getPWAOffset(true)).toBe(16 + 200 + 12);
        });

        it("getWhatsAppOffset returns correct heights for all cases", () => {
            expect(getWhatsAppOffset(false, false)).toBe(20);
            expect(getWhatsAppOffset(true, false)).toBe(20 + 200 + 12);
            expect(getWhatsAppOffset(false, true)).toBe(20 + 180 + 12);
            expect(getWhatsAppOffset(true, true)).toBe(20 + 200 + 12 + 180 + 12);
        });
    });
});
