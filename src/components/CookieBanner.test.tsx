import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { CookieBanner } from "./CookieBanner";

const mockDict = {
  cookie_banner: {
    title: "We respect your privacy",
    description: "We use cookies to analyze site traffic and enhance your experience. By clicking \"Accept All\", you consent to our use of cookies.",
    decline: "Decline",
    accept: "Accept All"
  }
};

const mockDictEs = {
  cookie_banner: {
    title: "Respetamos su privacidad",
    description: "Utilizamos cookies para analizar el tráfico del sitio y mejorar su experiencia. Al hacer clic en \"Aceptar todas\", consiente nuestro uso de cookies.",
    decline: "Rechazar",
    accept: "Aceptar todas"
  }
};

describe("CookieBanner", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders with English translations correctly", async () => {
    render(<CookieBanner dict={mockDict} />);
    // Wait for the setTimeout(..., 0) in useEffect
    await waitFor(() => {
      expect(screen.getByText(/We respect your privacy/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Accept All/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Decline/i })).toBeInTheDocument();
  });

  it("renders with Spanish translations correctly", async () => {
    render(<CookieBanner dict={mockDictEs} />);
    await waitFor(() => {
      expect(screen.getByText(/Respetamos su privacidad/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Aceptar todas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Rechazar/i })).toBeInTheDocument();
  });

  it("closes and saves 'accepted' preference when Accept All is clicked", async () => {
    render(<CookieBanner dict={mockDict} />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Accept All/i })).toBeInTheDocument();
    });
    
    const acceptBtn = screen.getByRole('button', { name: /Accept All/i });
    fireEvent.click(acceptBtn);
    
    expect(localStorage.getItem('cookie_consent')).toBe('accepted');
    expect(screen.queryByText(/We respect your privacy/i)).not.toBeInTheDocument();
  });

  it("closes and saves 'declined' preference when Decline is clicked", async () => {
    render(<CookieBanner dict={mockDict} />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Decline/i })).toBeInTheDocument();
    });
    
    const declineBtn = screen.getByRole('button', { name: /Decline/i });
    fireEvent.click(declineBtn);
    
    expect(localStorage.getItem('cookie_consent')).toBe('declined');
    expect(screen.queryByText(/We respect your privacy/i)).not.toBeInTheDocument();
  });

  it("doesn't render if choice already made (accepted)", async () => {
    localStorage.setItem('cookie_consent', 'accepted');
    render(<CookieBanner dict={mockDict} />);
    
    await act(async () => {
      await new Promise(r => setTimeout(r, 10));
    });
    expect(screen.queryByText(/We respect your privacy/i)).not.toBeInTheDocument();
  });

  it("doesn't render if choice already made (declined)", async () => {
    localStorage.setItem('cookie_consent', 'declined');
    render(<CookieBanner dict={mockDict} />);
    
    await act(async () => {
      await new Promise(r => setTimeout(r, 10));
    });
    expect(screen.queryByText(/We respect your privacy/i)).not.toBeInTheDocument();
  });
});
