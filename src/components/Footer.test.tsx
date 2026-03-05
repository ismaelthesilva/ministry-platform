import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DeveloperFooter } from "./Footer";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    target,
    rel,
    "aria-label": ariaLabel,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    target?: string;
    rel?: string;
    "aria-label"?: string;
  }) => (
    <a href={href} target={target} rel={rel} aria-label={ariaLabel} {...rest}>
      {children}
    </a>
  ),
}));

describe("Footer", () => {
  it("renders footer component", () => {
    render(<DeveloperFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("displays developer attribution", () => {
    render(<DeveloperFooter />);
    expect(screen.getByText("Developed by")).toBeInTheDocument();
  });

  it("displays developer name", () => {
    render(<DeveloperFooter />);
    expect(screen.getByText("Ismael Silva")).toBeInTheDocument();
  });

  it("displays professional title", () => {
    render(<DeveloperFooter />);
    expect(screen.getByText("Full Stack Product Engineer")).toBeInTheDocument();
  });

  describe("Social Links", () => {
    it("renders connect prompt", () => {
      render(<DeveloperFooter />);
      expect(
        screen.getByText("Would you like to connect?"),
      ).toBeInTheDocument();
    });

    it("has Website link with correct aria-label", () => {
      render(<DeveloperFooter />);
      const webLink = screen.getByRole("link", { name: /Website/i });
      expect(webLink).toBeInTheDocument();
      expect(webLink).toHaveAttribute("href", "https://ismaelsilva.org");
    });

    it("has Instagram link with correct aria-label", () => {
      render(<DeveloperFooter />);
      const igLink = screen.getByRole("link", { name: /Instagram/i });
      expect(igLink).toBeInTheDocument();
    });
  });
});
