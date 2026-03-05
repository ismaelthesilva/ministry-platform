import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardHome } from "@/components/dashboard/DashboardHome";

const mockData = {
  user: {
    preferredLanguage: "en",
    selectedPlanId: "1",
  },
  plan: {
    title: "Bible Only - English",
  },
  todayReading: {
    id: "1",
    dayNumber: 36,
    date: "February 5",
    bible: "Genesis 1-3",
    author: null,
    book: null,
    title: null,
  },
  completionPercentage: 10,
  completedReadingIds: ["1", "2", "3"],
  allReadings: Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 1}`,
    dayNumber: i + 1,
    date: `Day ${i + 1}`,
    bible: `Reading ${i + 1}`,
    author: null,
    book: null,
    title: null,
  })),
};

describe("DashboardHome", () => {
  it("renders dashboard title", () => {
    render(<DashboardHome data={mockData} userId="test-user" />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("displays completion percentage", () => {
    render(<DashboardHome data={mockData} userId="test-user" />);
    const matches = screen.getAllByText("10%");
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("shows today's reading", () => {
    render(<DashboardHome data={mockData} userId="test-user" />);
    expect(screen.getByText("Today's Reading")).toBeInTheDocument();
    expect(screen.getByText("Day 36")).toBeInTheDocument();
  });

  it("displays current plan title", () => {
    render(<DashboardHome data={mockData} userId="test-user" />);
    expect(screen.getByText("Bible Only - English")).toBeInTheDocument();
  });

  it("shows completed readings count", () => {
    render(<DashboardHome data={mockData} userId="test-user" />);
    expect(screen.getByText(/3 of 30 completed/)).toBeInTheDocument();
  });
});
