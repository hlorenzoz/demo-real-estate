import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HeroClient from "./HeroClient";

const pushMock = vi.fn();
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
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it("clears search query when X is clicked", async () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties} />);
    
    const input = screen.getByPlaceholderText(/Search location.../);
    fireEvent.change(input, { target: { value: "Costa" } });
    
    const clearBtn = screen.getByRole('button', { name: "" }); // The small X button
    fireEvent.click(clearBtn);
    
    expect(input).toHaveValue("");
  });

  it("updates location query and shows location dropdown", async () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties} />);
    
    const locationInput = screen.getByPlaceholderText(/Where\?/);
    fireEvent.change(locationInput, { target: { value: "Mar" } });
    
    await waitFor(() => {
      expect(screen.getByText(/Marbella/)).toBeInTheDocument();
    });
  });

  it("selects a location from the dropdown", async () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties} />);
    
    const locationInput = screen.getByPlaceholderText(/Where\?/);
    fireEvent.change(locationInput, { target: { value: "Mar" } });
    
    await waitFor(() => {
      const option = screen.getByText(/Marbella/);
      fireEvent.click(option);
    });
    
    expect(locationInput).toHaveValue("Marbella");
  });

  it("handles search button click with parameters", () => {
    render(<HeroClient dict={mockDict} lang="en" properties={mockProperties} />);
    
    const input = screen.getByPlaceholderText(/Search location.../);
    fireEvent.change(input, { target: { value: "Costa" } });
    
    const locationInput = screen.getByPlaceholderText(/Where\?/);
    fireEvent.change(locationInput, { target: { value: "Marbella" } });
    
    const searchBtn = screen.getByText(/Search Now/);
    fireEvent.click(searchBtn);
    
    expect(pushMock).toHaveBeenCalledWith(expect.stringContaining("q=Costa"));
    expect(pushMock).toHaveBeenCalledWith(expect.stringContaining("location=Marbella"));
  });

  it("closes dropdowns when clicking outside", async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <HeroClient dict={mockDict} lang="en" properties={mockProperties} />
      </div>
    );
    
    const input = screen.getByPlaceholderText(/Search location.../);
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Mar" } });
    
    await waitFor(() => {
      expect(screen.getByText(/Marbella/)).toBeInTheDocument();
    });
    
    fireEvent.mouseDown(screen.getByTestId("outside"));
    
    await waitFor(() => {
      expect(screen.queryByText(/Marbella/)).not.toBeInTheDocument();
    });
  });
});
