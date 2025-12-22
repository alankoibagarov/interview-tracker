import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SettingsModal from "../SettingsModal";
import { useUserStore } from "../../store/userStore";
import { UserRole } from "../../services/authApi";
import { vi } from "vitest";

// Mock user store
vi.mock("../../store/userStore", () => ({
  useUserStore: vi.fn(),
}));

describe("SettingsModal", () => {
  const mockOnClose = vi.fn();
  const mockUser = {
    username: "testuser",
    email: "test@example.com",
    themeDarkMode: false,
    role: UserRole.USER,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useUserStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ user: mockUser })
    );
  });

  it("should not render when isOpen is false", () => {
    render(<SettingsModal isOpen={false} onClose={mockOnClose} />);
    const modal = screen.queryByText("Settings");
    expect(modal).not.toBeInTheDocument();
  });

  it("should render when isOpen is true", async () => {
    render(<SettingsModal isOpen={true} onClose={mockOnClose} />);
    
    // Wait for animation mount
    expect(await screen.findByRole("heading", { name: /Settings/i })).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", async () => {
    render(<SettingsModal isOpen={true} onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText("Close settings");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
