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

vi.mock("quill", () => {
  class MockQuill {
    root: HTMLDivElement;
    clipboard = {
      dangerouslyPasteHTML: vi.fn(),
    };
    on = vi.fn();
    off = vi.fn();
    setText = vi.fn();
    enable = vi.fn();
    getSelection = vi.fn(() => null);
    setSelection = vi.fn();

    constructor(container: HTMLElement | null, opts?: Record<string, unknown>) {
      const target = container ?? document.createElement("div");
      this.root = target as HTMLDivElement;
      this.root.innerHTML = "";
      if (opts?.placeholder) {
        this.root.setAttribute("data-placeholder", String(opts.placeholder));
      }
    }
  }
  return { default: MockQuill };
});

if (!process.env.VITE_API_LINK) {
  process.env.VITE_API_LINK = "http://localhost:3000";
}

const fetchMock = vi.fn(
  async () =>
    ({
      status: 200,
      json: async () => ({}),
    }) as Response
);

globalThis.fetch = fetchMock as typeof globalThis.fetch;

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
    function showModal(this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };

  window.HTMLDialogElement.prototype.close =
    window.HTMLDialogElement.prototype.close ??
    function close(this: HTMLDialogElement) {
      this.removeAttribute("open");
    };
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
});

