import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/shared/Button";

describe("Button component", () => {
  it("renders button with text", () => {
    render(<Button text="Click me" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    
    const button = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the correct variant and size classes", () => {
    const { rerender } = render(
      <Button text="Primary" onClick={() => {}} variant="primary" size="default" />
    );
    const btn = screen.getByRole("button", { name: "Primary" });
    expect(btn).toHaveClass("bg-emerald-700");
    expect(btn).toHaveClass("px-6");

    rerender(<Button text="Small Danger" onClick={() => {}} variant="danger" size="small" />);
    const btn2 = screen.getByRole("button", { name: "Small Danger" });
    expect(btn2).toHaveClass("bg-rose-600");
    expect(btn2).toHaveClass("px-3");
  });

  it("sets the correct button type attribute", () => {
    render(<Button text="Submit" onClick={() => {}} type="submit" />);
    const btn = screen.getByRole("button", { name: "Submit" });
    expect(btn).toHaveAttribute("type", "submit");
  });
});