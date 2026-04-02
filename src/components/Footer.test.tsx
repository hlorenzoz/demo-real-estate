import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

const mockDict = {
  excellence: "Excellence",
  agency_desc: "Luxury property search",
  contact: "Contact",
  phone: "+1 234 567 890",
  address: "123 Main St",
  email: "test@example.com",
  follow: "Follow Us",
  rights: "All rights reserved",
  about_us: "About Us",
  team: "Meet The Team",
  contact_nav: "Contact",
  tos: "Terms of Service",
  privacy: "Privacy Policy",
  cookie_policy: "Cookie Policy",
  gdpr: "GDPR",
  rentals: "Rentals",
  citations_title: "Market Intelligence",
  citations: []
};

describe("Footer", () => {
  it("renders correctly in English", () => {
    render(<Footer lang="en" dict={mockDict} />);
    
    expect(screen.getByText(/Luxury property search/)).toBeInTheDocument();
    expect(screen.getAllByText(/Contact/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/About Us/)[0]).toBeInTheDocument();
  });
});
