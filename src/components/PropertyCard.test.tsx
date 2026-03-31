import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import PropertyCard from "./PropertyCard";
import { Property } from "../types/property";

const mockDict = {
  property_title: "Featured Properties",
  property_subtitle: "Exclusive listings",
  cta_catalog: "View Catalog",
  cta_rentals: "View Rentals",
  cta_details: "View Details",
  cta_banner: "Sell your home",
  cta_banner_accent: "Exclusive Deal",
  cta_banner_desc: "We help you sell faster",
  whatsapp_prompt: "Chat with us",
  years_exp: "Years of Experience",
  success_rate: "Success Rate",
  about_title: "About Us",
  about_desc: "We are leaders in the market.",
  about_transparency: "Transparency",
  rooms: "rooms",
  baths: "baths",
  sqft: "sqft",
  view_property: "View Property",
  beds: "beds",
  for_rent: "For Rent",
  for_sale: "For Sale",
  property_types: {
    Villa: "Villa",
    Apartment: "Apartment"
  }
};

const mockProperty: Property = {
  id: "1",
  type: "Villa",
  price: 500000,
  location: "Costa del Sol",
  city: "Marbella",
  bedrooms: 3,
  bathrooms: 2,
  area: 250,
  image: "https://example.com/image.jpg",
  contractType: "sale",
  featured: true
};

describe("PropertyCard", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
  });

  it("renders property details correctly in English", async () => {
    await act(async () => {
      render(<PropertyCard property={mockProperty} lang="en" dict={mockDict} />);
    });
    
    expect(screen.getByText(/Costa del Sol/)).toBeInTheDocument();
    expect(screen.getByText(/500,000/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByText(/beds/)).toBeInTheDocument();
    expect(screen.getByText(/View Property/)).toBeInTheDocument();
  });

  it("handles like/unlike correctly and persists to localStorage", async () => {
    await act(async () => {
      render(<PropertyCard property={mockProperty} lang="en" dict={mockDict} />);
    });
    
    const likeBtn = screen.getByLabelText(/Save property/i);
    fireEvent.click(likeBtn);
    
    expect(localStorage.getItem(`property-liked-${mockProperty.id}`)).toBe("true");
    expect(likeBtn).toHaveClass('text-red-500');
    
    fireEvent.click(likeBtn);
    expect(localStorage.getItem(`property-liked-${mockProperty.id}`)).toBe("false");
  });

  it("loads like state from localStorage on mount", async () => {
    localStorage.setItem(`property-liked-${mockProperty.id}`, "true");
    
    await act(async () => {
      render(<PropertyCard property={mockProperty} lang="en" dict={mockDict} />);
    });
    
    const likeBtn = screen.getByLabelText(/Save property/i);
    expect(likeBtn).toHaveClass('text-red-500');
  });

  it("renders 'For Rent' and 'For Sale' badges based on property type", async () => {
    const { rerender } = render(<PropertyCard property={mockProperty} lang="en" dict={mockDict} />);
    expect(screen.getByText(/For Sale/)).toBeInTheDocument();
    
    const rentProperty = { ...mockProperty, contractType: "rent" as const };
    await act(async () => {
      rerender(<PropertyCard property={rentProperty} lang="en" dict={mockDict} />);
    });
    expect(screen.getByText(/For Rent/)).toBeInTheDocument();
  });

  it("formats price correctly for Spanish locale", async () => {
    await act(async () => {
      render(<PropertyCard property={mockProperty} lang="es" dict={mockDict} />);
    });
    
    // In Spanish locale for EUR, it often uses dot for thousands
    expect(screen.getByText(/500.000/)).toBeInTheDocument();
  });
});
