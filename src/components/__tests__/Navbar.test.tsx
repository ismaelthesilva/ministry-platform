import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "../Navbar";
import { LanguageProvider } from "../../context/LanguageContext";

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
