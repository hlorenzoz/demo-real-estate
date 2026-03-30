import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FAQSection from "./FAQSection";

const mockDict = {
  title: "Frequently Asked Questions",
  subtitle: "Get help",
  cta_all: "View All",
  items: [
    { q: "How much?", a: "A lot" },
    { q: "When?", a: "Now" }
  ]
};

describe("FAQSection", () => {
  it("renders correctly with questions", () => {
    render(<FAQSection lang="en" dict={mockDict} />);
    
    expect(screen.getByText(/Frequently Asked Questions/)).toBeInTheDocument();
    expect(screen.getByText(/How much\?/)).toBeInTheDocument();
  });

  it("toggles answers when clicked", () => {
    render(<FAQSection lang="en" dict={mockDict} />);
    
    const question = screen.getByText(/How much\?/);
    fireEvent.click(question);
    
    expect(screen.getByText(/A lot/)).toBeInTheDocument();
  });
});
