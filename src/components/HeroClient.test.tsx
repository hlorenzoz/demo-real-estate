import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HeroClient from "./HeroClient";
import { Property } from "../types/property";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => "/",
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(""),
  }),
}));

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
  },
  {
    id: "2",
    location: "Costa Blanca",
    city: "Alicante",
    type: "Apartment",
    price: 500000,
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    image: "/house2.jpg",
    contractType: "rent" as const
  }
];

describe("HeroClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as Property[]} />);
    expect(screen.getByText(/Find Your/)).toBeInTheDocument();
  });

  it("updates search query and shows dropdown", async () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as Property[]} />);
    const input = screen.getByPlaceholderText(/Search location.../);
    fireEvent.change(input, { target: { value: 'Mar' } });
    fireEvent.focus(input);
    expect(await screen.findByText(/Marbella/)).toBeInTheDocument();
  });

  it("selects a location from the dropdown", async () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as Property[]} />);
    const locationInput = screen.getByPlaceholderText(/Where\?/);
    fireEvent.change(locationInput, { target: { value: 'Mar' } });
    fireEvent.focus(locationInput);
    const option = await screen.findByText(/Marbella/);
    fireEvent.click(option);
    expect(locationInput).toHaveValue("Marbella");
  });

  it("handles search button click", async () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as Property[]} />);
    const searchBtn = screen.getByText(/Search Now/);
    fireEvent.click(searchBtn);
    expect(pushMock).toHaveBeenCalled();
  });

  it("clears search query when X is clicked", () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as Property[]} />);
    const input = screen.getByPlaceholderText(/Search location.../);
    fireEvent.change(input, { target: { value: 'Mar' } });
    
    // Lucide X is an icon button, let's find it by container
    const container = screen.getByTestId("search-container");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const button = (container as any).querySelector("button");
    if (button) fireEvent.click(button);
    expect(input).toHaveValue("");
  });

  it("shows location dropdown on click", () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as Property[]} />);
    const container = screen.getByTestId("location-container");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clickableArea = (container as any).firstChild as HTMLElement;
    fireEvent.click(clickableArea);
    // Since we don't have locationQuery >= 2, the dropdown won't render, but it sets the state.
    // Let's add locationQuery and then check for dropdown.
    const input = screen.getByPlaceholderText(/Where\?/);
    fireEvent.change(input, { target: { value: 'Mar' } });
    expect(screen.getByTestId("location-dropdown")).toBeInTheDocument();
  });

  it("closes dropdowns on click outside", () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as Property[]} />);
    const input = screen.getByPlaceholderText(/Search location.../);
    fireEvent.change(input, { target: { value: 'Mar' } });
    expect(screen.getByTestId("search-dropdown")).toBeInTheDocument();
    
    // Fire click outside
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fireEvent.mouseDown((globalThis as any).document.body);
    expect(screen.queryByTestId("search-dropdown")).not.toBeInTheDocument();
  });
});
