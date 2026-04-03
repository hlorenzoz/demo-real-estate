/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PWAInstaller, BeforeInstallPromptEvent } from "./PWAInstaller";
import { UIOverlayProvider } from "../context/UIOverlayContext";

declare const window: Window & typeof globalThis & { alert: any; localStorage: any };

describe("PWAInstaller", () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(
      <UIOverlayProvider>
        {ui}
      </UIOverlayProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    window.localStorage.clear();
    
    // Default window mocks
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 1000,
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), 
        removeListener: vi.fn(), 
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockPropsEn = { lang: "en" };
  const mockPropsEs = { lang: "es" };

  it("is not visible by default", () => {
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();
  });

  it("shows installer automatically after 7 seconds delay", async () => {
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    expect(screen.getByText(/Access Luxury Living/)).toBeInTheDocument();
    const logo = screen.getByAltText("Luxury Living logo");
    expect(logo).toBeInTheDocument();
  });

  it("shows Spanish installer correctly", async () => {
    renderWithProvider(<PWAInstaller {...mockPropsEs} />);
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    expect(screen.getByText(/Acceso Inmediato/)).toBeInTheDocument();
  });

  it("shows installer when beforeinstallprompt is triggered", async () => {
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    const promptEvent = new Event("beforeinstallprompt") as unknown as BeforeInstallPromptEvent;
    vi.spyOn(promptEvent, 'preventDefault');
    Object.defineProperty(promptEvent, 'prompt', { value: vi.fn().mockResolvedValue(undefined) });
    Object.defineProperty(promptEvent, 'userChoice', { value: Promise.resolve({ outcome: "accepted", platform: "" }) });

    await act(async () => {
      window.dispatchEvent(promptEvent);
    });
    
    expect(screen.getByText(/Access Luxury Living/)).toBeInTheDocument();
    expect(promptEvent.preventDefault).toHaveBeenCalled();
  });

  it("does not show if already in standalone mode", async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(display-mode: standalone)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();
  });

  it("does not reappear after dismissal", async () => {
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    const xBtn = screen.getAllByLabelText("Close installer")[0];
    fireEvent.click(xBtn);
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();

    // Trigger event again
    const promptEvent = new Event("beforeinstallprompt");
    await act(async () => {
      window.dispatchEvent(promptEvent);
    });
    
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();
  });

  it("handles install button click (accepted)", async () => {
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    const promptEvent = new Event("beforeinstallprompt") as unknown as BeforeInstallPromptEvent;
    const userChoicePromise = Promise.resolve({ outcome: "accepted" as const, platform: "" });
    Object.defineProperty(promptEvent, 'prompt', { value: vi.fn().mockResolvedValue(undefined) });
    Object.defineProperty(promptEvent, 'userChoice', { value: userChoicePromise });

    await act(async () => {
      window.dispatchEvent(promptEvent);
    });

    const installBtn = screen.getByText("Install");
    
    await act(async () => {
      fireEvent.click(installBtn);
      await userChoicePromise;
    });
    
    expect(promptEvent.prompt).toHaveBeenCalled();
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();
  });

  it("handles install button click (dismissed)", async () => {
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    const promptEvent = new Event("beforeinstallprompt") as unknown as BeforeInstallPromptEvent;
    const userChoicePromise = Promise.resolve({ outcome: "dismissed" as const, platform: "" });
    Object.defineProperty(promptEvent, 'prompt', { value: vi.fn().mockResolvedValue(undefined) });
    Object.defineProperty(promptEvent, 'userChoice', { value: userChoicePromise });

    await act(async () => {
      window.dispatchEvent(promptEvent);
    });

    const installBtn = screen.getByText("Install");
    
    await act(async () => {
      fireEvent.click(installBtn);
      await userChoicePromise;
    });
    
    expect(promptEvent.prompt).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith("PWA Install dismissed");
    // Should still be in document if dismissed (based on logic)
    expect(screen.getByText(/Access Luxury Living/)).toBeInTheDocument();
  });

  it("handles install button click error", async () => {
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    const promptEvent = new Event("beforeinstallprompt") as unknown as BeforeInstallPromptEvent;
    Object.defineProperty(promptEvent, 'prompt', { value: vi.fn().mockRejectedValue(new Error("Prompt failed")) });

    await act(async () => {
      window.dispatchEvent(promptEvent);
    });

    const installBtn = screen.getByText("Install");
    
    await act(async () => {
      fireEvent.click(installBtn);
    });
    
    expect(console.error).toHaveBeenCalledWith("PWA Install error:", expect.any(Error));
  });

  it("handles manual install alert when prompt is missing (En and Es)", async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    const { rerender } = renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    await act(async () => { vi.advanceTimersByTime(7000); });
    fireEvent.click(screen.getByText("Install"));
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("To install:"));

    rerender(<UIOverlayProvider><PWAInstaller {...mockPropsEs} /></UIOverlayProvider>);
    fireEvent.click(screen.getByText("Instalar"));
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("Para instalar:"));
  });

  it("does not show after delay if app becomes standalone during delay", async () => {
    const matchMediaMock = vi.fn().mockImplementation(query => ({
      matches: false, // Initially false
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    Object.defineProperty(window, 'matchMedia', { writable: true, value: matchMediaMock });

    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    // Change mock to true before timer fires
    matchMediaMock.mockImplementation(query => ({
      matches: query === '(display-mode: standalone)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();
  });

  it("does not show after delay if dismissed during delay", async () => {
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    // Partially wait
    await act(async () => {
      vi.advanceTimersByTime(2000);
      const promptEvent = new Event("beforeinstallprompt");
      window.dispatchEvent(promptEvent);
    });

    // It showed because event fired, now dismiss
    const xBtn = screen.getAllByLabelText("Close installer")[0];
    fireEvent.click(xBtn);
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();

    // Now finish the 7s delay
    await act(async () => {
      vi.advanceTimersByTime(6000);
    });
    
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();
  });

  it("has correct accessible text colors for contrast", async () => {
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    const description = screen.getByText(/Install our premium properties catalog/);
    expect(description).toHaveClass('text-[#374151]');
    expect(description).not.toHaveClass('opacity-80');
  });

  it("sets suppression timestamp in localStorage when dismissed", async () => {
    const setItemSpy = vi.spyOn(window.localStorage, 'setItem');
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    const xBtn = screen.getAllByLabelText("Close installer")[0];
    fireEvent.click(xBtn);
    
    expect(setItemSpy).toHaveBeenCalledWith("pwa-suppressed-until", expect.any(String));
    const savedValue = parseInt(setItemSpy.mock.calls[0][1] as string, 10);
    // Should be roughly 7 days from now
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    expect(savedValue).toBeGreaterThanOrEqual(Date.now() + sevenDaysInMs - 1000);
  });

  it("does not show if suppression is active in localStorage", async () => {
    const futureDate = Date.now() + 100000;
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue(futureDate.toString());
    
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();
  });

  it("shows if suppression in localStorage has expired", async () => {
    const pastDate = Date.now() - 100000;
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue(pastDate.toString());
    
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    expect(screen.getByText(/Access Luxury Living/)).toBeInTheDocument();
  });

  it("updates visibility based on scroll position", async () => {
    // Start at top (0px)
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0 });
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    // Should NOT be in document even after timer because scroll < 900
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();

    // Scroll down to 1000px
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 1000 });
      window.dispatchEvent(new Event('scroll'));
    });

    // Should appear now
    expect(screen.getByText(/Access Luxury Living/)).toBeInTheDocument();
  });

  it("cleans up event listeners on unmount", async () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    
    unmount();
    
    expect(removeSpy).toHaveBeenCalledWith("beforeinstallprompt", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("can be dismissed using the mobile button", async () => {
    // Force mobile view or just specifically click the first one
    renderWithProvider(<PWAInstaller {...mockPropsEn} />);
    await act(async () => { vi.advanceTimersByTime(7000); });
    
    // There are 2 close buttons (sm:hidden and hidden sm:flex)
    const mobileCloseBtn = screen.getAllByLabelText("Close installer")[0];
    const desktopCloseBtn = screen.getAllByLabelText("Close installer")[1];
    
    expect(mobileCloseBtn).toHaveClass('sm:hidden');
    expect(desktopCloseBtn).toHaveClass('hidden sm:flex');

    fireEvent.click(mobileCloseBtn);
    expect(screen.queryByText(/Access Luxury Living/)).not.toBeInTheDocument();
  });
});
