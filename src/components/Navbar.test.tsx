import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Navbar from "./Navbar";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/en/listings"),
}));

const mockDict = {
  listings: "Listings",
  rentals: "Rentals",
  vender: "Sell",
  blog: "Blog",
  faq: "FAQ",
  contactar: "Contact",
  about_us: "About Us"
};

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset requestAnimationFrame mock for each test
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
  });

  it("renders correctly in English", async () => {
    await act(async () => {
      render(<Navbar lang="en" dict={mockDict} />);
    });
    
    expect(screen.getByText(/Listings/)).toBeInTheDocument();
    expect(screen.getByText(/Rentals/)).toBeInTheDocument();
    expect(screen.getByText(/Sell/)).toBeInTheDocument();
    expect(screen.getByText(/Contact/)).toBeInTheDocument();
  });

  it("handles mobile menu toggle", async () => {
    await act(async () => {
      render(<Navbar lang="en" dict={mockDict} />);
    });
    
    const menuBtn = screen.getByLabelText(/Open menu/i);
    fireEvent.click(menuBtn);
    
    expect(screen.getByLabelText(/Close menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Language/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText(/Close menu/i));
    expect(screen.queryByText(/Language/i)).not.toBeInTheDocument();
  });

  it("calculates redirected path correctly for simple routes", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/en/blog");
    
    await act(async () => {
      render(<Navbar lang="en" dict={mockDict} />);
    });
    
    const esLinks = screen.getAllByText(/ES/);
    expect(esLinks[0]).toHaveAttribute('href', '/es/blog');
  });

  it("calculates redirected path correctly for mapped routes", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/en/properties");
    
    await act(async () => {
      render(<Navbar lang="en" dict={mockDict} />);
    });
    
    const esLinks = screen.getAllByText(/ES/);
    // 'properties' is the English slug for the internal 'propiedades'
    // in Spanish it should stay 'propiedades' (or whatever is in reverseMappings)
    expect(esLinks[0]).toHaveAttribute('href', '/es/propiedades');
  });

  it("falls back gracefully when pathname is empty", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue(null as unknown as string);
    
    await act(async () => {
      render(<Navbar lang="en" dict={mockDict} />);
    });
    
    const esLinks = screen.getAllByText(/ES/);
    expect(esLinks[0]).toHaveAttribute('href', '/es');
  });

  it("calculates redirected path correctly for root language path", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/en");
    
    await act(async () => {
      render(<Navbar lang="en" dict={mockDict} />);
    });
    
    const esLinks = screen.getAllByText(/ES/);
    expect(esLinks[0]).toHaveAttribute('href', '/es');
  });
});
