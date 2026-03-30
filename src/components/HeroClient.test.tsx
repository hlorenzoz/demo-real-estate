import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HeroClient from "./HeroClient";

export const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => "/",
}));

const mockDict = {
  badge: "Premium Real Estate",
  title: "Find Your",
  title_accent: "Dream Home",
  subtitle: "Luxury living",
  cta: "See properties",
  search_placeholder: "Search location...",
  location_label: "Where?",
  search_button: "Search Now"
};

const mockProperties = [
  {
    id: "1",
    location: "Costa del Sol",
    city: "Marbella",
    type: "Villa",
    price: 1000000,
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    image: "/house1.jpg",
    contractType: "sale" as const
  }
];

describe("HeroClient", () => {
  it("renders correctly", () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties} />);
    
    expect(screen.getByText(/Find Your/)).toBeInTheDocument();
    expect(screen.getByText(/Dream Home/)).toBeInTheDocument();
  });

  it("updates search query and shows dropdown", async () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties} />);
    
    const input = screen.getByPlaceholderText(/Search location.../);
    fireEvent.change(input, { target: { value: "Mar" } });
    
    await waitFor(() => {
      expect(screen.getByText(/Marbella/)).toBeInTheDocument();
    });
  });

  it("handles search button click", () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties} />);
    
    const searchBtn = screen.getByText(/Search Now/);
    fireEvent.click(searchBtn);
    
    // Should navigate to listings
    // Note: mock might need to be set before render
  });
});
