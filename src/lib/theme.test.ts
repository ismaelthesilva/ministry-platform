import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getSystemTheme,
  getStoredTheme,
  setStoredTheme,
  getEffectiveTheme,
  applyTheme,
  initializeTheme,
  toggleTheme,
  THEME_KEY,
} from "./theme";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Mock matchMedia
const createMatchMediaMock = (matches: boolean) => {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

describe("theme utilities", () => {
  beforeEach(() => {
    localStorageMock.clear();
    // Mock document
    Object.defineProperty(global, "document", {
      value: {
        documentElement: {
          classList: {
            add: vi.fn(),
            remove: vi.fn(),
          },
        },
      },
      writable: true,
    });
  });

  describe("getSystemTheme", () => {
    it("returns 'dark' when system prefers dark mode", () => {
      Object.defineProperty(global, "window", {
        value: {
          matchMedia: createMatchMediaMock(true),
        },
        writable: true,
      });

      expect(getSystemTheme()).toBe("dark");
    });

    it("returns 'light' when system prefers light mode", () => {
      Object.defineProperty(global, "window", {
        value: {
          matchMedia: createMatchMediaMock(false),
        },
        writable: true,
      });

      expect(getSystemTheme()).toBe("light");
    });

    it("returns 'light' when window is undefined", () => {
      const originalWindow = global.window;
      // @ts-ignore - testing undefined window
      global.window = undefined;

      expect(getSystemTheme()).toBe("light");

      global.window = originalWindow;
    });
  });

  describe("getStoredTheme", () => {
    it("returns stored theme from localStorage", () => {
      localStorageMock.setItem(THEME_KEY, "dark");
      expect(getStoredTheme()).toBe("dark");
    });

    it("returns 'system' when no theme is stored", () => {
      expect(getStoredTheme()).toBe("system");
    });

    it("returns 'system' when localStorage is not available", () => {
      const originalWindow = global.window;
      // @ts-ignore - testing undefined window
      global.window = undefined;

      expect(getStoredTheme()).toBe("system");

      global.window = originalWindow;
    });
  });

  describe("setStoredTheme", () => {
    it("stores theme in localStorage", () => {
      setStoredTheme("dark");
      expect(localStorageMock.getItem(THEME_KEY)).toBe("dark");
    });

    it("handles localStorage errors gracefully", () => {
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = vi.fn(() => {
        throw new Error("Storage full");
      });

      expect(() => setStoredTheme("dark")).not.toThrow();

      localStorageMock.setItem = originalSetItem;
    });

    it("does nothing when window is undefined", () => {
      const originalWindow = global.window;
      // @ts-ignore - testing undefined window
      global.window = undefined;

      expect(() => setStoredTheme("dark")).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe("getEffectiveTheme", () => {
    it("returns system theme when theme is 'system'", () => {
      Object.defineProperty(global, "window", {
        value: {
          matchMedia: createMatchMediaMock(true),
        },
        writable: true,
      });

      expect(getEffectiveTheme("system")).toBe("dark");
    });

    it("returns theme directly when not 'system'", () => {
      expect(getEffectiveTheme("dark")).toBe("dark");
      expect(getEffectiveTheme("light")).toBe("light");
    });
  });

  describe("applyTheme", () => {
    it("adds 'dark' class when theme is dark", () => {
      const mockAdd = vi.fn();
      const mockRemove = vi.fn();

      Object.defineProperty(global, "document", {
        value: {
          documentElement: {
            classList: {
              add: mockAdd,
              remove: mockRemove,
            },
          },
        },
        writable: true,
      });

      applyTheme("dark");

      expect(mockAdd).toHaveBeenCalledWith("dark");
      expect(mockRemove).not.toHaveBeenCalled();
    });

    it("removes 'dark' class when theme is light", () => {
      const mockAdd = vi.fn();
      const mockRemove = vi.fn();

      Object.defineProperty(global, "document", {
        value: {
          documentElement: {
            classList: {
              add: mockAdd,
              remove: mockRemove,
            },
          },
        },
        writable: true,
      });

      applyTheme("light");

      expect(mockRemove).toHaveBeenCalledWith("dark");
      expect(mockAdd).not.toHaveBeenCalled();
    });

    it("does nothing when document is undefined", () => {
      const originalDocument = global.document;
      // @ts-ignore - testing undefined document
      global.document = undefined;

      expect(() => applyTheme("dark")).not.toThrow();

      global.document = originalDocument;
    });
  });

  describe("initializeTheme", () => {
    it("applies stored theme and returns it", () => {
      const mockAdd = vi.fn();
      Object.defineProperty(global, "document", {
        value: {
          documentElement: {
            classList: {
              add: mockAdd,
              remove: vi.fn(),
            },
          },
        },
        writable: true,
      });

      localStorageMock.setItem(THEME_KEY, "dark");

      const result = initializeTheme();

      expect(result).toBe("dark");
      expect(mockAdd).toHaveBeenCalledWith("dark");
    });

    it("uses system theme when no stored theme", () => {
      Object.defineProperty(global, "window", {
        value: {
          matchMedia: createMatchMediaMock(false),
        },
        writable: true,
      });

      const result = initializeTheme();

      expect(result).toBe("light");
    });
  });

  describe("toggleTheme", () => {
    it("toggles from light to dark", () => {
      const mockAdd = vi.fn();
      const mockRemove = vi.fn();

      Object.defineProperty(global, "document", {
        value: {
          documentElement: {
            classList: {
              add: mockAdd,
              remove: mockRemove,
            },
          },
        },
        writable: true,
      });

      localStorageMock.setItem(THEME_KEY, "light");

      const result = toggleTheme();

      expect(result).toBe("dark");
      expect(localStorageMock.getItem(THEME_KEY)).toBe("dark");
      expect(mockAdd).toHaveBeenCalledWith("dark");
    });

    it("toggles from dark to light", () => {
      const mockAdd = vi.fn();
      const mockRemove = vi.fn();

      Object.defineProperty(global, "document", {
        value: {
          documentElement: {
            classList: {
              add: mockAdd,
              remove: mockRemove,
            },
          },
        },
        writable: true,
      });

      localStorageMock.setItem(THEME_KEY, "dark");

      const result = toggleTheme();

      expect(result).toBe("light");
      expect(localStorageMock.getItem(THEME_KEY)).toBe("light");
      expect(mockRemove).toHaveBeenCalledWith("dark");
    });

    it("toggles system theme based on current effective theme", () => {
      Object.defineProperty(global, "window", {
        value: {
          matchMedia: createMatchMediaMock(true), // System is dark
        },
        writable: true,
      });

      // No stored theme, so it should use system (dark)
      const result = toggleTheme();

      expect(result).toBe("light");
    });
  });
});
