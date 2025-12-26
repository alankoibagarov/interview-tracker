import { describe, it, expect, vi, beforeEach } from "vitest";
import { request, requestBlob } from "../api";
import { useUserStore } from "../../store/userStore";
import { UserRole } from "../authApi";

// Mock global fetch
global.fetch = vi.fn();

// Mock window.location
const mockReplace = vi.fn();
Object.defineProperty(window, "location", {
  value: {
    replace: mockReplace,
    pathname: "/interviews",
  },
  writable: true,
});

describe("api service", () => {
  beforeEach(() => {
    vi.mocked(global.fetch).mockClear();
    mockReplace.mockClear();
    localStorage.clear();
    useUserStore.getState().setUser({ email: "test@test.com", username: "test", themeDarkMode: false, role: UserRole.USER });
  });

  it("request adds authorization header", async () => {
    localStorage.setItem("access_token", "fake-token");
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: "ok" }),
    } as Response);

    await request("/test");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/test"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer fake-token",
        }),
      })
    );
  });

  it("request handles 401 by logging out and redirecting", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({}),
    } as Response);

    await request("/test");

    expect(useUserStore.getState().user).toBeNull();
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("requestBlob adds authorization header", async () => {
    localStorage.setItem("access_token", "fake-token");
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      blob: async () => new Blob(["data"]),
    } as Response);

    const blob = await requestBlob("/export");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/export"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer fake-token",
        }),
      })
    );
    expect(blob).toBeInstanceOf(Blob);
  });
});
