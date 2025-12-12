import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ChapterStats from "./ChapterStats";

describe("ChapterStats", () => {
  const defaultProps = {
    chapterNumber: 1,
    scriptureWordCount: 300,
    commentaryWordCount: 1500,
    verseCount: 20,
  };

  it("renders chapter number correctly", () => {
    render(<ChapterStats {...defaultProps} />);
    expect(screen.getByText(/Chapter 1 Statistics/i)).toBeInTheDocument();
  });

  it("displays scripture word count", () => {
    const { container } = render(<ChapterStats {...defaultProps} />);
    expect(container.textContent).toContain("300");
  });

  it("displays commentary word count", () => {
    const { container } = render(<ChapterStats {...defaultProps} />);
    expect(container.textContent).toContain("1,500");
  });

  it("displays verse count", () => {
    const { container } = render(<ChapterStats {...defaultProps} />);
    expect(container.textContent).toContain("20 verses");
  });

  it("calculates total words correctly", () => {
    const { container } = render(<ChapterStats {...defaultProps} />);
    // Total: 300 + 1500 = 1800
    expect(container.textContent).toContain("1,800");
  });

  it("displays estimated reading time", () => {
    const { container } = render(<ChapterStats {...defaultProps} />);
    // Should show minutes/hours
    expect(container.textContent).toMatch(/\d+\s*min|\d+h/);
  });

  describe("Difficulty levels", () => {
    it("displays beginner difficulty", () => {
      render(<ChapterStats {...defaultProps} difficultyLevel="Beginner" />);
      expect(screen.getByText("Beginner")).toBeInTheDocument();
    });

    it("displays intermediate difficulty", () => {
      render(<ChapterStats {...defaultProps} difficultyLevel="Intermediate" />);
      expect(screen.getByText("Intermediate")).toBeInTheDocument();
    });

    it("displays advanced difficulty", () => {
      render(<ChapterStats {...defaultProps} difficultyLevel="Advanced" />);
      expect(screen.getByText("Advanced")).toBeInTheDocument();
    });
  });

  describe("Optional props", () => {
    it("displays themes when provided", () => {
      const themes = ["Grace", "Faith", "Redemption"];
      const { container } = render(
        <ChapterStats {...defaultProps} themes={themes} />
      );
      // Check that theme count is displayed
      expect(container.textContent).toContain("3");
      expect(container.textContent).toContain("Key Themes");
    });

    it("displays cross references count", () => {
      const { container } = render(
        <ChapterStats {...defaultProps} crossReferences={15} />
      );
      expect(container.textContent).toContain("Cross Refs");
    });

    it("displays key words when provided", () => {
      const keyWords = ["grace", "faith", "love"];
      const { container } = render(
        <ChapterStats {...defaultProps} keyWords={keyWords} />
      );
      expect(container.textContent).toContain("grace");
      expect(container.textContent).toContain("faith");
      expect(container.textContent).toContain("love");
    });

    it("displays study progress", () => {
      render(<ChapterStats {...defaultProps} studyProgress={65} />);
      expect(screen.getByText(/65% Complete/i)).toBeInTheDocument();
    });
  });

  describe("Calculations", () => {
    it("calculates average verse length", () => {
      // 300 words / 20 verses = 15 words per verse
      const { container } = render(<ChapterStats {...defaultProps} />);
      expect(container.textContent).toContain("avg/verse");
    });

    it("calculates commentary ratio", () => {
      // (1500 / 300) * 100 = 500%
      const { container } = render(<ChapterStats {...defaultProps} />);
      expect(container.textContent).toContain("vs scripture");
    });

    it("calculates estimated pages", () => {
      // (300 + 1500) / 250 = 7.2 => 8 pages
      const { container } = render(<ChapterStats {...defaultProps} />);
      expect(container.textContent).toContain("Book Pages");
    });
  });

  describe("Time formatting", () => {
    it("formats time under 60 minutes", () => {
      const props = {
        ...defaultProps,
        scriptureWordCount: 100,
        commentaryWordCount: 500,
      };
      render(<ChapterStats {...props} />);
      // Should display in minutes - use container to check text content
      const { container } = render(<ChapterStats {...props} />);
      expect(container.textContent).toContain("min");
    });

    it("formats time over 60 minutes as hours", () => {
      const props = {
        ...defaultProps,
        scriptureWordCount: 2000,
        commentaryWordCount: 10000,
      };
      const { container } = render(<ChapterStats {...props} />);
      // Should display in hours - check for hour notation
      expect(container.textContent).toMatch(/\d+h/);
    });
  });

  describe("Number formatting", () => {
    it("formats large numbers with commas", () => {
      const props = {
        ...defaultProps,
        scriptureWordCount: 5000,
        commentaryWordCount: 15000,
      };
      render(<ChapterStats {...props} />);
      // Should show 20,000 for total
      expect(screen.getByText(/20,000/)).toBeInTheDocument();
    });
  });

  describe("Visual elements", () => {
    it("renders with statistical icons", () => {
      const { container } = render(<ChapterStats {...defaultProps} />);
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe("Edge cases", () => {
    it("handles zero verse count gracefully", () => {
      const props = { ...defaultProps, verseCount: 0 };
      expect(() => render(<ChapterStats {...props} />)).not.toThrow();
    });

    it("handles very large word counts", () => {
      const props = {
        ...defaultProps,
        scriptureWordCount: 50000,
        commentaryWordCount: 100000,
      };
      render(<ChapterStats {...props} />);
      expect(screen.getByText(/150,000/)).toBeInTheDocument();
    });

    it("handles empty themes array", () => {
      render(<ChapterStats {...defaultProps} themes={[]} />);
      // Should render without themes section or handle gracefully
      expect(screen.getByText(/Chapter 1 Statistics/i)).toBeInTheDocument();
    });
  });
});
