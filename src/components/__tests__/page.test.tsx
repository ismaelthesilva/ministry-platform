import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page from "../../app/page";
import { LanguageProvider } from "../../context/LanguageContext";

describe("Homepage", () => {
  it("renders navbar", () => {
    render(
      <LanguageProvider>
        <Page />
      </LanguageProvider>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders hero section", () => {
    render(
      <LanguageProvider>
        <Page />
      </LanguageProvider>
    );
    expect(screen.getByText("The Way to Happiness")).toBeInTheDocument();
  });

  it("renders messages section", () => {
    render(
      <LanguageProvider>
        <Page />
      </LanguageProvider>
    );
    expect(screen.getByText("Messages")).toBeInTheDocument();
  });
});
