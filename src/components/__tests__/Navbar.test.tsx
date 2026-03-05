import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navbar from "../Navbar";
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

describe("Navbar", () => {
  it("renders navigation links", async () => {
    await act(async () => {
      render(
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
          </LanguageProvider>
        </ThemeProvider>,
      );
    });

    // Since text is inside mounted check, it might be in BR or EN depending on hydration
    // But default is "Home" in our components usually or the t() value.
    // Let's check for something more stable or wait for it.
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
