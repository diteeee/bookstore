import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartIcon from "@/components/shared/CartIcon";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("CartIcon", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    pushMock.mockClear();
  });

  it("renders ShoppingCartIcon svg", () => {
    render(<CartIcon itemCount={0} />);
    // The ShoppingCartIcon is an svg with role 'img' or can query by test id or svg tag
    const svg = screen.getByTestId("ShoppingCartIcon") || screen.getByRole("img");
    expect(svg).toBeInTheDocument();
  });

  it("does not show item count badge if itemCount is 0", () => {
    render(<CartIcon itemCount={0} />);
    // There should be no badge with text "0"
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("shows item count badge when itemCount > 0", () => {
    render(<CartIcon itemCount={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls router.push('/cart') when clicked", () => {
    render(<CartIcon itemCount={1} />);
    // Your clickable div has a unique className: fixed bottom-10 right-6 ...
    // Let's find it by its class or use container.firstChild

    // The outer div is the first child of the container
    const clickableDiv = screen.container ? screen.container.firstChild : null;

    // But screen.container isn't exposed; so get by role won't work.
    // Alternative: query by class name or text - class name is cumbersome, so better to use querySelector

    const { container } = render(<CartIcon itemCount={1} />);
    const clickable = container.querySelector("div.fixed");

    if (!clickable) throw new Error("Clickable div not found");

    fireEvent.click(clickable);
    expect(pushMock).toHaveBeenCalledWith("/cart");
  });
});
