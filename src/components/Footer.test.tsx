import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

const mockDict: any = {
  excellence: "Excellence",
  agency_desc: "Luxury property search",
  contact: "Contact",
  phone: "+1 234 567 890",
  address: "123 Main St",
  email: "test@example.com",
  follow: "Follow Us",
  rights: "All rights reserved",
  links: {
    listings: "Listings",
    vender: "Sell",
    nosotros: "About Us",
    privacy: "Privacy",
    legal: "Legal",
    faq: "FAQ",
    gdpr: "GDPR"
  }
};

describe("Footer", () => {
  it("renders correctly in English", () => {
    render(<Footer lang="en" dict={mockDict} />);
    
    expect(screen.getByText(/Luxury property search/)).toBeInTheDocument();
    expect(screen.getAllByText(/Contact/)[0]).toBeInTheDocument();
    expect(screen.getByText(/About Us/)).toBeInTheDocument();
  });
});
