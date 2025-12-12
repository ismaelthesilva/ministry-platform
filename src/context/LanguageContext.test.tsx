import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import React from "react";

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

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("LanguageContext", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe("LanguageProvider", () => {
    it("provides default language as 'en'", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      expect(result.current.language).toBe("en");
    });

    it("loads language from localStorage", async () => {
      localStorageMock.setItem("language", "br");

      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      await waitFor(() => {
        expect(result.current.language).toBe("br");
      });
    });

    it("saves language to localStorage when changed", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      act(() => {
        result.current.setLanguage("br");
      });

      expect(localStorageMock.getItem("language")).toBe("br");
      expect(result.current.language).toBe("br");
    });
  });

  describe("translation functions", () => {
    it("t() returns translation for existing key", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      const translation = result.current.t("home.title", "Default");
      expect(translation).toBeDefined();
      expect(typeof translation).toBe("string");
    });

    it("t() returns fallback for non-existing key", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      const translation = result.current.t("non.existing.key", "Fallback Text");
      expect(translation).toBe("Fallback Text");
    });

    it("t() returns key when no fallback provided", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      const translation = result.current.t("non.existing.key");
      expect(translation).toBe("non.existing.key");
    });

    it("tr() returns revelation translation", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      const translation = result.current.tr("revelation.title", "Default");
      expect(translation).toBeDefined();
      expect(typeof translation).toBe("string");
    });

    it("tr() returns fallback for non-existing key", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      const translation = result.current.tr(
        "non.existing.key",
        "Fallback Text"
      );
      expect(translation).toBe("Fallback Text");
    });

    it("trObj() returns object for existing key", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      const translation = result.current.trObj("revelation.chapters.1");
      expect(translation).toBeDefined();
    });

    it("trObj() returns fallback for non-existing key", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      const fallback = { test: "value" };
      const translation = result.current.trObj("non.existing.key", fallback);
      expect(translation).toEqual(fallback);
    });
  });

  describe("useLanguage hook", () => {
    it("throws error when used outside provider", () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        renderHook(() => useLanguage());
      }).toThrow("useLanguage must be used within a LanguageProvider");

      console.error = originalError;
    });
  });

  describe("language switching", () => {
    it("switches between en and br", () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider>{children}</LanguageProvider>
        ),
      });

      expect(result.current.language).toBe("en");

      act(() => {
        result.current.setLanguage("br");
      });

      expect(result.current.language).toBe("br");

      act(() => {
        result.current.setLanguage("en");
      });

      expect(result.current.language).toBe("en");
    });
  });
});
