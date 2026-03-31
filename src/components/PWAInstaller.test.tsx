import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PWAInstaller, BeforeInstallPromptEvent } from "./PWAInstaller";

describe("PWAInstaller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("is not visible by default", () => {
    render(<PWAInstaller />);
    expect(screen.queryByText(/Install App/)).not.toBeInTheDocument();
  });

  it("shows installer when beforeinstallprompt is triggered", async () => {
    render(<PWAInstaller />);
    
    // Create a mock BeforeInstallPromptEvent
    const promptEvent = new Event("beforeinstallprompt") as unknown as BeforeInstallPromptEvent;
    vi.spyOn(promptEvent, 'preventDefault');
    Object.defineProperty(promptEvent, 'prompt', { value: vi.fn().mockResolvedValue(undefined) });
    Object.defineProperty(promptEvent, 'userChoice', { value: Promise.resolve({ outcome: "accepted", platform: "" }) });

    await act(async () => {
      window.dispatchEvent(promptEvent);
    });
    
    expect(screen.getByText(/Install App/)).toBeInTheDocument();
    expect(promptEvent.preventDefault).toHaveBeenCalled();
  });

  it("handles install button click", async () => {
    render(<PWAInstaller />);
    
    const promptEvent = new Event("beforeinstallprompt") as unknown as BeforeInstallPromptEvent;
    const userChoicePromise = Promise.resolve({ outcome: "accepted" as const, platform: "" });
    vi.spyOn(promptEvent, 'preventDefault');
    Object.defineProperty(promptEvent, 'prompt', { value: vi.fn().mockResolvedValue(undefined) });
    Object.defineProperty(promptEvent, 'userChoice', { value: userChoicePromise });

    await act(async () => {
      window.dispatchEvent(promptEvent);
    });

    const installBtn = screen.getByRole("button", { name: /Install/i });
    
    await act(async () => {
      fireEvent.click(installBtn);
    });
    
    expect(promptEvent.prompt).toHaveBeenCalled();
    await act(async () => {
        await userChoicePromise;
    });
    
    expect(screen.queryByText(/Install App/)).not.toBeInTheDocument();
  });

  it("handles dismiss click", async () => {
    render(<PWAInstaller />);
    
    const promptEvent = new Event("beforeinstallprompt");
    vi.spyOn(promptEvent, "preventDefault");
    
    await act(async () => {
      window.dispatchEvent(promptEvent);
    });

    const dismissBtn = screen.getByRole("button", { name: /Later/i });
    fireEvent.click(dismissBtn);
    
    expect(screen.queryByText(/Install App/)).not.toBeInTheDocument();
  });
});
