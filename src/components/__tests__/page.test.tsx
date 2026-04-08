import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Page from "../../app/page";
import { LanguageProvider } from "../../context/LanguageContext";
import { ThemeProvider } from "../../context/ThemeContext";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe("Homepage", () => {
  it("renders navbar", async () => {
    await act(async () => {
      render(
        <ThemeProvider>
          <LanguageProvider>
            <Page />
          </LanguageProvider>
        </ThemeProvider>
      );
    });
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders hero section", async () => {
    await act(async () => {
      render(
        <ThemeProvider>
          <LanguageProvider>
            <Page />
          </LanguageProvider>
        </ThemeProvider>
      );
    });
    expect(screen.getByText(/The Preacher/i)).toBeInTheDocument();
  });

  it("renders messages section", async () => {
    await act(async () => {
      render(
        <ThemeProvider>
          <LanguageProvider>
            <Page />
          </LanguageProvider>
        </ThemeProvider>
      );
    });
    // Section title is h2 or similar, check for text. Use getAllByText and check the heading or use getByRole
    const headings = screen.getAllByText(/MESSAGES|MENSAGENS/i);
    expect(headings.length).toBeGreaterThan(0);
  });
});
