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

  it("closes an open answer when clicked again", () => {
    render(<FAQSection lang="en" dict={mockDict} />);
    
    // First item is open by default: const [openIndex, setOpenIndex] = useState<number | null>(0);
    expect(screen.getByText(/A lot/)).toBeInTheDocument();
    
    const firstQuestion = screen.getByText(/How much\?/);
    fireEvent.click(firstQuestion); // Should set it to null
    
    // The text might still be in document but hidden (max-h-0), 
    // let's check for the class that hides it or just queries that it's no longer visible
    // Actually FAQSection.tsx has opacity-0 and max-h-0.
    const answerContainer = screen.getByText(/A lot/).parentElement?.parentElement;
    expect(answerContainer).toHaveClass('opacity-0');
  });

  it("limits the number of items and shows 'View All' link when limit is passed", () => {
    render(<FAQSection lang="en" dict={mockDict} limit={1} />);
    
    expect(screen.getByText(/How much\?/)).toBeInTheDocument();
    expect(screen.queryByText(/When\?/)).not.toBeInTheDocument();
    expect(screen.getByText(/View All/)).toBeInTheDocument();
  });
});
