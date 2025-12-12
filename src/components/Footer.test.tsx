import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./Footer";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("Footer", () => {
  it("renders footer component", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("displays current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(currentYear.toString()))
    ).toBeInTheDocument();
  });

  it("displays brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Dr. Jackie")).toBeInTheDocument();
  });

  it("displays company description", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        /Professional fitness coaching and personalized nutrition/i
      )
    ).toBeInTheDocument();
  });

  describe("Quick Links", () => {
    it("renders all quick links", () => {
      render(<Footer />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Fitness Coaching")).toBeInTheDocument();
      expect(screen.getByText("Nutrition Guidance")).toBeInTheDocument();
      expect(screen.getByText("Online Coaching")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("has correct href attributes", () => {
      render(<Footer />);
      const homeLink = screen.getByText("Home").closest("a");
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });

  describe("Locations", () => {
    it("displays all locations", () => {
      render(<Footer />);
      expect(screen.getByText("Brazil")).toBeInTheDocument();
      expect(screen.getByText("São Paulo")).toBeInTheDocument();
      expect(screen.getByText("USA")).toBeInTheDocument();
      expect(screen.getByText("New York")).toBeInTheDocument();
      expect(screen.getByText("New Zealand")).toBeInTheDocument();
      expect(screen.getByText("Auckland")).toBeInTheDocument();
    });

    it("displays location flags", () => {
      render(<Footer />);
      expect(screen.getByText("🇧🇷")).toBeInTheDocument();
      expect(screen.getByText("🇺🇸")).toBeInTheDocument();
      expect(screen.getByText("🇳🇿")).toBeInTheDocument();
    });
  });

  describe("Contact Information", () => {
    it("displays email address", () => {
      render(<Footer />);
      const emailLink = screen.getByText("contact@drjackie.com");
      expect(emailLink).toBeInTheDocument();
      expect(emailLink.closest("a")).toHaveAttribute(
        "href",
        "mailto:contact@drjackie.com"
      );
    });

    it("displays phone number", () => {
      render(<Footer />);
      expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument();
    });

    it("displays online coaching availability", () => {
      render(<Footer />);
      expect(
        screen.getByText("Available Worldwide - Online Coaching")
      ).toBeInTheDocument();
    });
  });

  describe("Badges", () => {
    it("displays happy clients badge", () => {
      render(<Footer />);
      expect(screen.getByText("500+ Happy Clients")).toBeInTheDocument();
    });

    it("displays countries badge", () => {
      render(<Footer />);
      expect(screen.getByText("3 Countries")).toBeInTheDocument();
    });
  });

  describe("Social Links", () => {
    it("renders social media section", () => {
      render(<Footer />);
      expect(screen.getByText("Follow Us")).toBeInTheDocument();
    });

    it("has correct aria-labels for social links", () => {
      render(<Footer />);
      expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
      expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
      expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
      expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    });
  });

  describe("Footer Bottom Links", () => {
    it("displays privacy policy link", () => {
      render(<Footer />);
      const privacyLink = screen.getByText("Privacy Policy");
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink.closest("a")).toHaveAttribute(
        "href",
        "/privacy-policy"
      );
    });

    it("displays terms of service link", () => {
      render(<Footer />);
      const termsLink = screen.getByText("Terms of Service");
      expect(termsLink).toBeInTheDocument();
      expect(termsLink.closest("a")).toHaveAttribute(
        "href",
        "/terms-of-service"
      );
    });

    it("displays cookie policy link", () => {
      render(<Footer />);
      const cookieLink = screen.getByText("Cookie Policy");
      expect(cookieLink).toBeInTheDocument();
      expect(cookieLink.closest("a")).toHaveAttribute("href", "/cookie-policy");
    });

    it("displays sitemap link", () => {
      render(<Footer />);
      expect(screen.getByText("Sitemap")).toBeInTheDocument();
    });
  });

  describe("Copyright", () => {
    it("displays copyright text", () => {
      render(<Footer />);
      expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    });

    it("displays made with love message", () => {
      render(<Footer />);
      expect(screen.getByText(/for your health journey/i)).toBeInTheDocument();
    });
  });
});
