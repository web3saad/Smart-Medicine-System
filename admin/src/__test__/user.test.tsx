import { render, screen } from "@testing-library/react";
import User from "../pages/Product/Product";

describe("User()", () => {
  it("Should Render Correctly", () => {
    render(<User />);
    const element = screen.getByText("Hello");
    expect(element).toBeInTheDocument();
  });
});
