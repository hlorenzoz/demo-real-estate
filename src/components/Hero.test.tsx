import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { Property } from "../types/property";

/* eslint-disable @typescript-eslint/no-explicit-any */
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock('./HeroSearchClient', () => ({
  default: () => <div data-testid="search-client-stub" />
}));
/* eslint-enable @typescript-eslint/no-explicit-any */

const mockDict = {
  badge: "Trusted Real Estate in your City",
  title: "Where every home tells a",
  title_accent: "unique story",
  subtitle: "Real estate management",
  cta: "Explore Properties",
  search_placeholder: "What are you looking for?",
  location_label: "Location",
  search_button: "Search",
  search_aria: "Search query field",
  location_aria: "Location query field"
};

const mockProperties: Property[] = [];

describe("Hero Component", () => {
  it("renders the badge with the correct text and styles", () => {
    const { container } = render(
      <Hero dict={mockDict} lang="en" properties={mockProperties} />
    );

    // 1. Check Text
    const badge = screen.getByText(/trusted real estate/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Trusted Real Estate in your City");

    // 2. Check Classes (bg-primary-accent, text-black)
    expect(badge).toHaveClass("bg-primary-accent");
    expect(badge).toHaveClass("text-black");
    
    // 3. Check Section Context (Hero should be the bg-primary section)
    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-primary");
  });

  it("renders the main title with accent", () => {
    render(<Hero dict={mockDict} lang="en" properties={mockProperties} />);
    expect(screen.getByText(/Where every home tells a/)).toBeInTheDocument();
    expect(screen.getByText(/unique story/)).toBeInTheDocument();
  });
});
