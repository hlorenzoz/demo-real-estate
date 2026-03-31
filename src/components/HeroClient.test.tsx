import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HeroClient from "./HeroClient";

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
  }
];

describe("HeroClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.skip("renders correctly", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as any} />);
    expect(screen.getByText(/Find Your/)).toBeInTheDocument();
  });

  it.skip("updates search query and shows dropdown", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as any} />);
    const input = screen.getByPlaceholderText(/Search location.../);
    fireEvent.change(input, { target: { value: 'Mar' } });
    fireEvent.focus(input);
    expect(await screen.findByText(/Marbella/)).toBeInTheDocument();
  });

  it.skip("selects a location from the dropdown", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as any} />);
    const locationInput = screen.getByPlaceholderText(/Where\?/);
    fireEvent.focus(locationInput);
    const option = await screen.findByText(/Marbella/);
    fireEvent.click(option);
    expect(locationInput).toHaveValue("Marbella");
  });

  it.skip("handles search button click", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties as any} />);
    const searchBtn = screen.getByText(/Search Now/);
    fireEvent.click(searchBtn);
    expect(pushMock).toHaveBeenCalled();
  });
});
