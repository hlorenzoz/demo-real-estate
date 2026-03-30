import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import FAQSchema from "./FAQSchema";

describe("FAQSchema", () => {
  it("renders schema correctly", () => {
    const { container } = render(
      <FAQSchema items={[{ q: "question", a: "answer" }]} />
    );
    const script = container.querySelector("script");
    expect(script).toBeInTheDocument();
    expect(script?.innerHTML).toContain("question");
    expect(script?.innerHTML).toContain("answer");
  });
});
