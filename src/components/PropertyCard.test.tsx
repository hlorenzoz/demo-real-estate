import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
  it("renders property details correctly in English", () => {
    render(<PropertyCard property={mockProperty} lang="en" dict={mockDict} />);
    
    expect(screen.getByText(/Costa del Sol/)).toBeInTheDocument();
    // Use a regex to match the price with potentially different formatting characters
    expect(screen.getByText(/500.000|500,000/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByText(/beds/)).toBeInTheDocument();
    expect(screen.getByText(/View Property/)).toBeInTheDocument();
  });

  it("renders property details correctly in Spanish", () => {
    const esDict = { 
      ...mockDict, 
      beds: "Hab", 
      baths: "Baños", 
      view_property: "Ver Propiedad",
      for_sale: "En Venta"
    };
    render(<PropertyCard property={mockProperty} lang="es" dict={esDict} />);
    
    expect(screen.getByText(/Ver Propiedad/)).toBeInTheDocument();
    expect(screen.getByText(/Hab/)).toBeInTheDocument();
    expect(screen.getByText(/En Venta/)).toBeInTheDocument();
  });
});
