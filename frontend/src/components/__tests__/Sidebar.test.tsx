import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "../Sidebar";
import { renderWithRouter } from "../../test/testUtils";

describe("Sidebar", () => {
  it("renders overlay when open", () => {
    const { container } = renderWithRouter(
      <Sidebar isOpen onClose={vi.fn()} />,
      { routerProps: { initialEntries: ["/interviews"] } }
    );

    expect(container.querySelector('[class*="bg-opacity-50"]')).toBeTruthy();
  });

  it("invokes onClose when a navigation item is clicked", async () => {
    const handleClose = vi.fn();
    renderWithRouter(<Sidebar isOpen onClose={handleClose} />, {
      routerProps: { initialEntries: ["/interviews"] },
    });

    await userEvent.click(screen.getByText("Interviews"));
    expect(handleClose).toHaveBeenCalled();
  });
});

