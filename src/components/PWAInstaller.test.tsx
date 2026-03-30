import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { PWAInstaller } from "./PWAInstaller";

describe("PWAInstaller", () => {
  it("does not show initially", () => {
    render(<PWAInstaller />);
    expect(screen.queryByText(/Install App/i)).not.toBeInTheDocument();
  });

  it("shows when beforeinstallprompt event is fired", async () => {
    render(<PWAInstaller />);
    
    // Create and dispatch event
    const event = new Event("beforeinstallprompt") as Event & { prompt: () => void; userChoice: Promise<{outcome: string}> };
    event.preventDefault = vi.fn();
    event.prompt = vi.fn();
    event.userChoice = Promise.resolve({ outcome: "accepted" });
    
    act(() => {
      window.dispatchEvent(event);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Install App/i)).toBeInTheDocument();
    });
  });

  it("handles install button click", async () => {
    render(<PWAInstaller />);
    
    const promptSpy = vi.fn();
    const event = new Event("beforeinstallprompt") as Event & { prompt: () => void; userChoice: Promise<{outcome: string}> };
    event.preventDefault = vi.fn();
    event.prompt = promptSpy;
    event.userChoice = Promise.resolve({ outcome: "accepted" });
    
    act(() => {
      window.dispatchEvent(event);
    });
    
    await waitFor(() => screen.getByRole("button", { name: /Install/i }));
    
    const installBtn = screen.getByRole("button", { name: /Install/i });
    fireEvent.click(installBtn);
    
    expect(promptSpy).toHaveBeenCalled();
  });
});
