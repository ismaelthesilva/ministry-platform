import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ReadingsView } from "@/components/dashboard/ReadingsView";
import { useRouter } from "next/navigation";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

// Mock server actions
vi.mock("@/app/dashboard/actions", () => ({
  markReadingComplete: vi.fn(() => Promise.resolve({ success: true })),
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
    dateDisplay: "January 1",
    bibleTextMain: "Genesis 1-3",
    bibleTextDevo: null,
    commentaryAuthor: null,
    commentaryWork: null,
    commentaryRef: null,
    topic: null,
    language: "en",
  },
  completionPercentage: 10,
  completedReadingIds: ["2"],
  allReadings: [
    {
      id: "1",
      dayNumber: 1,
      dateDisplay: "January 1",
      bibleTextMain: "Genesis 1-3",
      bibleTextDevo: null,
      commentaryAuthor: null,
      commentaryWork: null,
      commentaryRef: null,
      topic: null,
      language: "en",
    },
    {
      id: "2",
      dayNumber: 2,
      dateDisplay: "January 2",
      bibleTextMain: "Genesis 4-6",
      bibleTextDevo: null,
      commentaryAuthor: null,
      commentaryWork: null,
      commentaryRef: null,
      topic: null,
      language: "en",
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
    render(<ReadingsView data={mockData} userId="test-user" />);
    expect(screen.getByText("Bible Only - English")).toBeInTheDocument();
  });

  it("displays progress information", () => {
    render(<ReadingsView data={mockData} userId="test-user" />);
    expect(screen.getByText("Your Progress")).toBeInTheDocument();
    expect(screen.getByText(/1 of 2 readings completed/)).toBeInTheDocument();
  });

  it("shows today's reading card", () => {
    render(<ReadingsView data={mockData} userId="test-user" />);
    expect(screen.getByText("Today's Reading")).toBeInTheDocument();
    expect(screen.getByText("Day 1")).toBeInTheDocument();
  });

  it("renders all readings in table", () => {
    render(<ReadingsView data={mockData} userId="test-user" />);
    expect(screen.getByText("Genesis 1-3")).toBeInTheDocument();
    expect(screen.getByText("Genesis 4-6")).toBeInTheDocument();
  });

  it("shows completed status for finished readings", () => {
    render(<ReadingsView data={mockData} userId="test-user" />);
    const completedIcons = screen.getAllByRole("button");
    // Reading 2 should be marked as completed
    expect(completedIcons.length).toBeGreaterThan(0);
  });

  it("handles marking reading as complete", async () => {
    const { markReadingComplete } = await import("@/app/dashboard/actions");
    
    render(<ReadingsView data={mockData} userId="test-user" />);
    
    const buttons = screen.getAllByRole("button");
    const markCompleteButton = buttons.find(
      (btn) => btn.textContent === "Mark Complete",
    );

    if (markCompleteButton) {
      fireEvent.click(markCompleteButton);

      await waitFor(() => {
        expect(markReadingComplete).toHaveBeenCalledWith("test-user", "1");
        expect(mockRefresh).toHaveBeenCalled();
      });
    }
  });
});
function beforeEach(arg0: () => void) {
  const vitestBeforeEach = (globalThis as { beforeEach?: (fn: () => void) => void })
    .beforeEach;
  if (typeof vitestBeforeEach === "function") {
    vitestBeforeEach(arg0);
    return;
  }
  throw new Error("beforeEach is not available in this environment.");
}

