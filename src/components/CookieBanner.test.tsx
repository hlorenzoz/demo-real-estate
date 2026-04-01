/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CookieBanner } from "./CookieBanner";

const mockDict = {
  cookie_banner: {
    title: "We respect your privacy",
    description: "We use cookies.",
    decline: "Decline",
    accept: "Accept All"
  },
  navbar: {
    close_menu: "Close"
  }
};

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => true,
}));

import { UIOverlayProvider } from "../context/UIOverlayContext";

describe("CookieBanner", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(
      <UIOverlayProvider>
        {ui}
      </UIOverlayProvider>
    );
  };

  it("renders correctly", async () => {
    renderWithProvider(<CookieBanner dict={mockDict as any} />);
    await waitFor(() => {
      expect(screen.getByText(/We respect your privacy/i)).toBeInTheDocument();
    });
  });

  it("saves preference when Accept All is clicked", async () => {
    renderWithProvider(<CookieBanner dict={mockDict as any} />);
    const acceptBtn = await screen.findByText(/Accept All/);
    fireEvent.click(acceptBtn);
    expect(localStorage.getItem('cookie_consent')).toBe('accepted');
  });

  it("injects script when accepted", async () => {
    vi.stubEnv('NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN', 'some-token');
    const spy = vi.spyOn(document.body, 'appendChild');
    
    renderWithProvider(<CookieBanner dict={mockDict as any} />);
    const acceptBtn = await screen.findByText(/Accept All/);
    fireEvent.click(acceptBtn);
    
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("injects script on mount if already accepted", async () => {
    localStorage.setItem('cookie_consent', 'accepted');
    vi.stubEnv('NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN', 'some-token');
    const spy = vi.spyOn(document.body, 'appendChild');
    
    renderWithProvider(<CookieBanner dict={mockDict as any} />);
    
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
    spy.mockRestore();
  });

  it("closes on X click", async () => {
    renderWithProvider(<CookieBanner dict={mockDict as any} />);
    const allButtons = await screen.findAllByRole('button');
    const xButton = allButtons.find(b => !b.textContent);
    if (xButton) {
      fireEvent.click(xButton);
      expect(screen.queryByText(/We respect your privacy/)).not.toBeInTheDocument();
    }
  });
});
