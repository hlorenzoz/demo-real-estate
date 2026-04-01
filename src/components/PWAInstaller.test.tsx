import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PWAInstaller, BeforeInstallPromptEvent } from "./PWAInstaller";

describe("PWAInstaller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    
    // Default matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockProps = {
    lang: "en"
  };

  it("is not visible by default", () => {
    render(<PWAInstaller {...mockProps} />);
    expect(screen.queryByText(/Add to Home Screen/)).not.toBeInTheDocument();
  });

  it("shows installer automatically after 7 seconds delay", async () => {
    render(<PWAInstaller {...mockProps} />);
    
    expect(screen.queryByText(/Add to Home Screen/)).not.toBeInTheDocument();
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    expect(screen.getByText(/Add to Home Screen/)).toBeInTheDocument();
    const logo = screen.getByAltText("Luxury Living logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/favicon.svg");
  });

  it("shows installer when beforeinstallprompt is triggered", async () => {
    render(<PWAInstaller {...mockProps} />);
    
    const promptEvent = new Event("beforeinstallprompt") as unknown as BeforeInstallPromptEvent;
    vi.spyOn(promptEvent, 'preventDefault');
    Object.defineProperty(promptEvent, 'prompt', { value: vi.fn().mockResolvedValue(undefined) });
    Object.defineProperty(promptEvent, 'userChoice', { value: Promise.resolve({ outcome: "accepted", platform: "" }) });

    await act(async () => {
      window.dispatchEvent(promptEvent);
    });
    
    expect(screen.getByText(/Add to Home Screen/)).toBeInTheDocument();
    expect(screen.getByAltText("Luxury Living logo")).toBeInTheDocument();
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

    render(<PWAInstaller {...mockProps} />);
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    expect(screen.queryByText(/Add to Home Screen/)).not.toBeInTheDocument();
  });

  it("does not reappear after dismissal", async () => {
    render(<PWAInstaller {...mockProps} />);
    
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });
    
    const xBtn = screen.getByLabelText("Close installer");
    fireEvent.click(xBtn);
    expect(screen.queryByText(/Add to Home Screen/)).not.toBeInTheDocument();

    // Trigger event again
    const promptEvent = new Event("beforeinstallprompt");
    await act(async () => {
      window.dispatchEvent(promptEvent);
    });
    
    expect(screen.queryByText(/Add to Home Screen/)).not.toBeInTheDocument();
  });

  it("handles install button click", async () => {
    render(<PWAInstaller {...mockProps} />);
    
    // Trigger the prompt event
    const promptEvent = new Event("beforeinstallprompt") as unknown as BeforeInstallPromptEvent;
    const userChoicePromise = Promise.resolve({ outcome: "accepted" as const, platform: "" });
    vi.spyOn(promptEvent, 'preventDefault');
    Object.defineProperty(promptEvent, 'prompt', { value: vi.fn().mockResolvedValue(undefined) });
    Object.defineProperty(promptEvent, 'userChoice', { value: userChoicePromise });

    await act(async () => {
      window.dispatchEvent(promptEvent);
    });

    // Button should be there
    const installBtn = screen.getByText("Install").closest("button") as HTMLElement;
    
    await act(async () => {
      fireEvent.click(installBtn);
    });
    
    expect(promptEvent.prompt).toHaveBeenCalled();
    
    // Wait for the promise and component update
    await act(async () => {
        await userChoicePromise;
    });
    
    expect(screen.queryByText(/Add to Home Screen/)).not.toBeInTheDocument();
  });

  it("handles manual install alert when prompt is missing", async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<PWAInstaller {...mockProps} />);
    
    // Jump forward to show it
    await act(async () => {
      vi.advanceTimersByTime(7000);
    });

    const installBtn = screen.getByText("Install").closest("button") as HTMLElement;
    
    await act(async () => {
      fireEvent.click(installBtn);
    });
    
    expect(window.alert).toHaveBeenCalled();
  });
});
