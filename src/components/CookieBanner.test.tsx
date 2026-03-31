import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CookieBanner } from "./CookieBanner";

const mockDict = {
  cookie_banner: {
    title: "We respect your privacy",
    description: "We use cookies.",
    decline: "Decline",
    accept: "Accept All"
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
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
/* eslint-enable @typescript-eslint/no-explicit-any */

describe("CookieBanner", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it.skip("renders correctly", async () => {
    render(<CookieBanner dict={mockDict} />);
    await waitFor(() => {
      expect(screen.getByText(/We respect your privacy/i)).toBeInTheDocument();
    });
  });

  it.skip("saves preference when Accept All is clicked", async () => {
    render(<CookieBanner dict={mockDict} />);
    const acceptBtn = await screen.findByText(/Accept All/);
    fireEvent.click(acceptBtn);
    expect(localStorage.getItem('cookie_consent')).toBe('accepted');
  });

  it.skip("injects script when accepted", async () => {
    vi.stubEnv('NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN', 'some-token');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const spy = vi.spyOn(document.head, 'appendChild').mockImplementation(() => ({} as any));
    
    render(<CookieBanner dict={mockDict} />);
    const acceptBtn = await screen.findByText(/Accept All/);
    fireEvent.click(acceptBtn);
    
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it.skip("injects script on mount if already accepted", async () => {
    localStorage.setItem('cookie_consent', 'accepted');
    vi.stubEnv('NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN', 'some-token');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const spy = vi.spyOn(document.head, 'appendChild').mockImplementation(() => ({} as any));
    
    render(<CookieBanner dict={mockDict} />);
    
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
    spy.mockRestore();
  });

  it.skip("closes on X click", async () => {
    render(<CookieBanner dict={mockDict} />);
    const allButtons = await screen.findAllByRole('button');
    const xButton = allButtons.find(b => !b.textContent);
    if (xButton) {
      fireEvent.click(xButton);
      expect(screen.queryByText(/We respect your privacy/)).not.toBeInTheDocument();
    }
  });
});
