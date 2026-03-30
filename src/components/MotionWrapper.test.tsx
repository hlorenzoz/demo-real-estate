import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import MotionWrapper from "./MotionWrapper";

describe("MotionWrapper", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <MotionWrapper>
        <div>Test Content</div>
      </MotionWrapper>
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
