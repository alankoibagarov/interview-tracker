import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from "../Navigation";
import { NavigationType } from "../../const";
import {
  renderWithRouter,
  resetUserStore,
  seedUserStore,
} from "../../test/testUtils";
import { useUserStore } from "../../store/userStore";

const mockSetTheme = vi.hoisted(() =>
  vi.fn().mockResolvedValue({ statusCode: 200 })
);

vi.mock("../../services/authApi", () => ({
  authService: {
    setTheme: mockSetTheme,
  },
}));

describe("Navigation", () => {
  beforeEach(() => {
    resetUserStore();
    mockSetTheme.mockClear();
  });

  it("renders login cta for anonymous users", () => {
    renderWithRouter(<Navigation type={NavigationType.HOME} />, {
      routerProps: { initialEntries: ["/"] },
    });

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toHaveAttribute("href", "/interviews");
  });

  it("toggles theme for authenticated users", async () => {
    seedUserStore({ username: "jane", email: "jane@test.com", themeDarkMode: false });

    renderWithRouter(<Navigation type={NavigationType.DASHBOARD} />, {
      routerProps: { initialEntries: ["/interviews"] },
    });

    const toggle = screen.getByTitle("Switch to Dark Mode");
    await userEvent.click(toggle);

    await waitFor(() =>
      expect(mockSetTheme).toHaveBeenCalledWith("jane", true)
    );

    expect(useUserStore.getState().user?.themeDarkMode).toBe(true);
  });
});

