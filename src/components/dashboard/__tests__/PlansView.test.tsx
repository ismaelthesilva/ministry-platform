import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PlansView } from "@/components/dashboard/PlansView";
import { useRouter } from "next/navigation";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

// Mock server actions
vi.mock("@/app/dashboard/actions", () => ({
  selectPlan: vi.fn(() => Promise.resolve({ success: true })),
}));

const mockPlans = [
  {
    id: "1",
    slug: "bible-only",
    title: "Bible Only - PT",
    description: "Leitura diária da Bíblia",
    language: "pt",
  },
  {
    id: "2",
    slug: "bible-only",
    title: "Bible Only - EN",
    description: "Daily Bible reading",
    language: "en",
  },
  {
    id: "3",
    slug: "prophetic",
    title: "Prophetic - PT",
    description: "Leitura profética",
    language: "pt",
  },
];

describe("PlansView", () => {
  const mockRefresh = vi.fn();
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      refresh: mockRefresh,
      push: mockPush,
    });
  });

  it("renders plans page title", () => {
    render(<PlansView plans={mockPlans} userId="test-user" />);
    expect(screen.getByText("Reading Plans")).toBeInTheDocument();
  });

  it("displays all unique plans", () => {
    render(<PlansView plans={mockPlans} userId="test-user" />);
    expect(screen.getByText("Bible Only")).toBeInTheDocument();
    expect(screen.getByText("Prophetic Reading")).toBeInTheDocument();
  });

  it("shows language badges for each plan", () => {
    render(<PlansView plans={mockPlans} userId="test-user" />);
    expect(screen.getByText("🇧🇷 PT")).toBeInTheDocument();
    expect(screen.getByText("🇺🇸 EN")).toBeInTheDocument();
  });

  it("highlights current active plan", () => {
    render(
      <PlansView plans={mockPlans} userId="test-user" currentPlanId="1" />,
    );
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Current Plan")).toBeInTheDocument();
  });

  it("handles plan selection", async () => {
    const { selectPlan } = await import("@/app/dashboard/actions");

    render(<PlansView plans={mockPlans} userId="test-user" />);

    const selectButtons = screen.getAllByText(/Select/);
    fireEvent.click(selectButtons[0]);

    expect(selectPlan).toHaveBeenCalled();
  });

  it("displays plan information", () => {
    render(<PlansView plans={mockPlans} userId="test-user" />);
    expect(screen.getByText(/366 days/)).toBeInTheDocument();
  });

  it("shows how it works section", () => {
    render(<PlansView plans={mockPlans} userId="test-user" />);
    expect(screen.getByText("How it works")).toBeInTheDocument();
  });
});
