import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatTimeAgo, formatDate } from "../date";

describe("date helpers", () => {
  describe("formatTimeAgo", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it("returns 'Just now' for < 1 hour", () => {
      const now = new Date("2025-01-01T12:00:00");
      vi.setSystemTime(now);
      expect(formatTimeAgo("2025-01-01T11:30:00")).toBe("Just now");
    });

    it("returns hours ago for < 24 hours", () => {
      const now = new Date("2025-01-01T15:00:00");
      vi.setSystemTime(now);
      expect(formatTimeAgo("2025-01-01T10:00:00")).toBe("5 hours ago");
    });

    it("returns '1 day ago' for 24-48 hours", () => {
      const now = new Date("2025-01-02T12:00:00");
      vi.setSystemTime(now);
      expect(formatTimeAgo("2025-01-01T10:00:00")).toBe("1 day ago");
    });

    it("returns days ago for > 48 hours", () => {
      const now = new Date("2025-01-05T12:00:00");
      vi.setSystemTime(now);
      expect(formatTimeAgo("2025-01-01T10:00:00")).toBe("4 days ago");
    });
  });

  describe("formatDate", () => {
    it("formats date correctly", () => {
      // Note: exact string depends on locale, which might be tricky in CI.
      // But usually 'en-US' (default in helper) is consistent enough.
      const dateStr = "2025-01-01T10:30:00";
      // Expected: Jan 1, 2025, 10:30:00
      // Adjust expectation based on helper implementation which uses hour12: false
      expect(formatDate(dateStr)).toMatch(/Jan 1, 2025, 10:30:00/);
    });
  });
});
