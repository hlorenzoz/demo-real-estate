import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { CookieBanner } from "./CookieBanner";

describe("CookieBanner", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders when no choice has been made", async () => {
    render(<CookieBanner />);
    // Wait for the setTimeout(..., 0) in useEffect
    await waitFor(() => {
      expect(screen.getByText(/We respect your privacy/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Accept All/i })).toBeInTheDocument();
  });

  it("closes and saves preference when Accept All is clicked", async () => {
    render(<CookieBanner />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Accept All/i })).toBeInTheDocument();
    });
    
    const acceptBtn = screen.getByRole('button', { name: /Accept All/i });
    fireEvent.click(acceptBtn);
    
    expect(localStorage.getItem('cookie_consent')).toBe('accepted');
  });

  it("doesn't render if choice already made", async () => {
    localStorage.setItem('cookie_consent', 'accepted');
    render(<CookieBanner />);
    
    // Wait a bit to ensure it doesn't show up
    await act(async () => {
      await new Promise(r => setTimeout(r, 10));
    });
    expect(screen.queryByText(/We respect your privacy/i)).not.toBeInTheDocument();
  });
});
