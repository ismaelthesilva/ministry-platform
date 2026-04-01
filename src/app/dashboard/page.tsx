import { getUserBibleTrackerData, getAllPlans } from "./actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardHome } from "@/components/dashboard/DashboardHome";

export default async function DashboardPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const plans = await getAllPlans();
  const data = await getUserBibleTrackerData(userId);

  // Show loading state if no plans
  if (plans.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No plans available</h1>
          <p className="text-gray-600">npm run db:seed:bilingual</p>
        </div>
      </div>
    );
  }

  // If user hasn't selected a plan, redirect to plans page
  if (!data.user || !data.user.selectedPlanId) {
    redirect("/dashboard/plans");
  }

  // Show dashboard home with overview
  return <DashboardHome data={data} userId={userId} />;
}
