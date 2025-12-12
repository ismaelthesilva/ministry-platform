import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RevelationChapterUnderResearch from "./RevelationChapterUnderResearch";
import { LanguageProvider } from "../context/LanguageContext";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
}));

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<LanguageProvider>{component}</LanguageProvider>);
};

describe("RevelationChapterUnderResearch", () => {
  it("renders with chapter number", () => {
    renderWithProvider(<RevelationChapterUnderResearch chapterNumber={5} />);
    expect(screen.getByText(/Revelation 5/i)).toBeInTheDocument();
  });

  it("displays 'Under Research' badge", () => {
    renderWithProvider(<RevelationChapterUnderResearch chapterNumber={3} />);
    expect(screen.getByText(/Under Research/i)).toBeInTheDocument();
  });

  it("renders back to index button", () => {
    renderWithProvider(<RevelationChapterUnderResearch chapterNumber={7} />);
    const backButton = screen.getByText(/Back to Revelation Index/i);
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest("a")).toHaveAttribute("href", "/Revelation");
  });

  it("displays study in progress title", () => {
    renderWithProvider(<RevelationChapterUnderResearch chapterNumber={10} />);
    expect(screen.getByText(/Study in Progress/i)).toBeInTheDocument();
  });

  it("shows comprehensive analysis message", () => {
    renderWithProvider(<RevelationChapterUnderResearch chapterNumber={2} />);
    expect(
      screen.getByText(/currently under deep theological research/i)
    ).toBeInTheDocument();
  });

  it("lists research features", () => {
    renderWithProvider(<RevelationChapterUnderResearch chapterNumber={4} />);
    expect(screen.getByText(/Verse-by-verse exposition/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Original Greek text analysis/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Historical and cultural context/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Practical applications for today/i)
    ).toBeInTheDocument();
  });

  it("displays Bible verse reference", () => {
    renderWithProvider(<RevelationChapterUnderResearch chapterNumber={6} />);
    expect(screen.getByText(/2 Timothy 3:16/i)).toBeInTheDocument();
  });

  describe("Navigation buttons", () => {
    it("shows previous chapter button for chapter > 1", () => {
      renderWithProvider(<RevelationChapterUnderResearch chapterNumber={5} />);
      expect(screen.getByText(/Chapter 4/i)).toBeInTheDocument();
    });

    it("shows next chapter button for chapter < 22", () => {
      renderWithProvider(<RevelationChapterUnderResearch chapterNumber={5} />);
      expect(screen.getByText(/Chapter 6/i)).toBeInTheDocument();
    });

    it("disables next chapter button for chapter 22", () => {
      renderWithProvider(<RevelationChapterUnderResearch chapterNumber={22} />);
      const buttons = screen.getAllByText(/Index/i);
      const nextButton = buttons[buttons.length - 1].closest("button");
      expect(nextButton).toBeDisabled();
    });
  });

  describe("Chapter number variations", () => {
    it("renders chapter 1 correctly", () => {
      renderWithProvider(<RevelationChapterUnderResearch chapterNumber={1} />);
      expect(screen.getByText(/Revelation 1/i)).toBeInTheDocument();
    });

    it("renders chapter 22 correctly", () => {
      renderWithProvider(<RevelationChapterUnderResearch chapterNumber={22} />);
      expect(screen.getByText(/Revelation 22/i)).toBeInTheDocument();
    });

    it("renders middle chapter correctly", () => {
      renderWithProvider(<RevelationChapterUnderResearch chapterNumber={12} />);
      expect(screen.getByText(/Revelation 12/i)).toBeInTheDocument();
    });
  });

  describe("Multilingual support", () => {
    it("displays content in English by default", () => {
      renderWithProvider(<RevelationChapterUnderResearch chapterNumber={8} />);
      expect(screen.getByText(/Back to Revelation Index/i)).toBeInTheDocument();
    });
  });

  describe("Visual elements", () => {
    it("renders construction icon", () => {
      const { container } = renderWithProvider(
        <RevelationChapterUnderResearch chapterNumber={9} />
      );
      // Check for lucide-react icon classes or SVG elements
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe("Card sections", () => {
    it("renders research notice card", () => {
      renderWithProvider(<RevelationChapterUnderResearch chapterNumber={11} />);
      expect(screen.getByText(/Study in Progress/i)).toBeInTheDocument();
    });

    it("renders chapter info section", () => {
      renderWithProvider(<RevelationChapterUnderResearch chapterNumber={13} />);
      expect(screen.getByText(/Chapter 13 Information/i)).toBeInTheDocument();
    });
  });
});
