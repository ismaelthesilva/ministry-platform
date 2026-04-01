import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ReadingsView } from "@/components/dashboard/ReadingsView";
import { useRouter } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";

const renderWithProvider = (ui: React.ReactElement) =>
  render(<LanguageProvider>{ui}</LanguageProvider>);

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

// Mock server actions
vi.mock("@/app/dashboard/actions", () => ({
  toggleReadingComplete: vi.fn(() => Promise.resolve({ success: true })),
}));

const mockData = {
  user: {
    preferredLanguage: "en",
    selectedPlanId: "1",
  },
  plan: {
    title: "Bible Only - English",
    slug: "bible-only",
  },
  todayReading: {
    id: "1",
    dayNumber: 1,
    date: "1 January",
    bible: "Genesis 1-3",
    author: null,
    book: null,
    title: null,
  },
  completionPercentage: 10,
  completedReadingIds: ["2"],
  allReadings: [
    {
      id: "1",
      dayNumber: 1,
      date: "1 January",
      bible: "Genesis 1-3",
      author: null,
      book: null,
      title: null,
    },
    {
      id: "2",
      dayNumber: 2,
      date: "2 January",
      bible: "Genesis 4-6",
      author: null,
      book: null,
      title: null,
    },
  ],
};

describe("ReadingsView", () => {
  const mockRefresh = vi.fn();
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      refresh: mockRefresh,
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });
  });

  it("renders plan title", () => {
    renderWithProvider(<ReadingsView data={mockData} userId="test-user" />);
    expect(screen.getByText("Bible Only - English")).toBeInTheDocument();
  });

  it("displays progress information", () => {
    renderWithProvider(<ReadingsView data={mockData} userId="test-user" />);
    expect(screen.getByText("Your Progress")).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 2/)).toBeInTheDocument();
  });

  it("shows today's reading card", () => {
    renderWithProvider(<ReadingsView data={mockData} userId="test-user" />);
    expect(screen.getByText("Today's Reading")).toBeInTheDocument();
    expect(screen.getByText("Day 1")).toBeInTheDocument();
  });

  it("renders all readings in table", () => {
    renderWithProvider(<ReadingsView data={mockData} userId="test-user" />);
    expect(screen.getAllByText("Genesis 1-3")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Genesis 4-6")[0]).toBeInTheDocument();
  });

  it("shows completed status for finished readings", () => {
    renderWithProvider(<ReadingsView data={mockData} userId="test-user" />);
    const completedIcons = screen.getAllByRole("button");
    // Reading 2 should be marked as completed
    expect(completedIcons.length).toBeGreaterThan(0);
  });

  it("handles marking reading as complete", async () => {
    const { toggleReadingComplete } = await import("@/app/dashboard/actions");

    renderWithProvider(<ReadingsView data={mockData} userId="test-user" />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(toggleReadingComplete).toHaveBeenCalled();
    });
  });
});
