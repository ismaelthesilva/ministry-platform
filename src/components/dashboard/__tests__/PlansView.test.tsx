import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PlansView } from "@/components/dashboard/PlansView";
import { LanguageProvider } from "@/context/LanguageContext";
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
    slug: "bible",
    title: "Bible Only - PT",
    description: "Leitura diária da Bíblia",
    language: "br",
  },
  {
    id: "2",
    slug: "bible",
    title: "Bible Only - EN",
    description: "Daily Bible reading",
    language: "en",
  },
  {
    id: "3",
    slug: "prophetic",
    title: "Prophetic - PT",
    description: "Leitura profética",
    language: "br",
  },
];

const renderWithProvider = (ui: React.ReactElement) =>
  render(<LanguageProvider>{ui}</LanguageProvider>);

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
    renderWithProvider(<PlansView plans={mockPlans} userId="test-user" />);
    expect(screen.getByText("Reading Plans")).toBeInTheDocument();
  });

  it("displays all unique plans", () => {
    renderWithProvider(<PlansView plans={mockPlans} userId="test-user" />);
    expect(screen.getByText("Bible Only")).toBeInTheDocument();
    expect(screen.getByText("Prophetic Reading")).toBeInTheDocument();
  });

  it("shows language badges for each plan", () => {
    renderWithProvider(<PlansView plans={mockPlans} userId="test-user" />);
    expect(screen.getAllByText("🇧🇷 PT")[0]).toBeInTheDocument();
    expect(screen.getByText("🇺🇸 EN")).toBeInTheDocument();
  });

  it("highlights current active plan", () => {
    renderWithProvider(
      <PlansView plans={mockPlans} userId="test-user" currentPlanId="1" />,
    );
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Current Plan")).toBeInTheDocument();
  });

  it("handles plan selection", async () => {
    const { selectPlan } = await import("@/app/dashboard/actions");

    renderWithProvider(<PlansView plans={mockPlans} userId="test-user" />);

    const selectButtons = screen.getAllByText(/Select/);
    fireEvent.click(selectButtons[0]);

    expect(selectPlan).toHaveBeenCalled();
  });

  it("displays plan information", () => {
    renderWithProvider(<PlansView plans={mockPlans} userId="test-user" />);
    const matches = screen.getAllByText(/366 days/);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("shows how it works section", () => {
    renderWithProvider(<PlansView plans={mockPlans} userId="test-user" />);
    expect(screen.getByText("How it works")).toBeInTheDocument();
  });
});
