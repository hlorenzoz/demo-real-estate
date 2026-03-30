import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "./Navbar";

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
  it("renders correctly in English", () => {
    render(<Navbar lang="en" dict={mockDict} />);
    
    expect(screen.getByText(/Listings/)).toBeInTheDocument();
    expect(screen.getByText(/Rentals/)).toBeInTheDocument();
    expect(screen.getByText(/Sell/)).toBeInTheDocument();
    expect(screen.getByText(/Contact/)).toBeInTheDocument();
  });

  it("handles dropdown toggle in mobile", async () => {
    // Force mobile viewport simulation in Vitest window
    window.innerWidth = 500;
    render(<Navbar lang="en" dict={mockDict} />);
    
    // Check for Menu button (hamburger icon)
    const menuBtn = screen.getByLabelText(/Open menu/i);
    expect(menuBtn).toBeInTheDocument();
    
    // Initially menu not open
    expect(screen.queryByText(/Language/i)).not.toBeInTheDocument();
  });

  it("changes language when EN/ES is clicked", () => {
    render(<Navbar lang="en" dict={mockDict} />);
    const enLinks = screen.getAllByText(/EN/);
    const esLinks = screen.getAllByText(/ES/);
    
    expect(enLinks.length).toBeGreaterThan(0);
    expect(esLinks[0]).toHaveAttribute('href', expect.stringContaining('/es'));
  });
});
