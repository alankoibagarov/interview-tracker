import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

declare global {
  interface Window {
    matchMedia: typeof matchMedia;
  }
}

const raf =
  globalThis.requestAnimationFrame ??
  ((cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 0));

globalThis.requestAnimationFrame = raf;
globalThis.cancelAnimationFrame =
  globalThis.cancelAnimationFrame ?? ((id: number) => clearTimeout(id));

if (!window.matchMedia) {
  window.matchMedia = () =>
    ({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      media: "",
      onchange: null,
    }) as MediaQueryList;
}

if (typeof window.HTMLDialogElement !== "undefined") {
  window.HTMLDialogElement.prototype.showModal =
    window.HTMLDialogElement.prototype.showModal ??
    function showModal() {
      this.setAttribute("open", "");
    };

  window.HTMLDialogElement.prototype.close =
    window.HTMLDialogElement.prototype.close ??
    function close() {
      this.removeAttribute("open");
    };
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
});

