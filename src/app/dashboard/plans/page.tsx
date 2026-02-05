import { getAllPlans, getUserBibleTrackerData } from "../actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PlansView } from "@/components/dashboard/PlansView";

export default async function PlansPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const plans = await getAllPlans();
  const userData = await getUserBibleTrackerData(userId);

  return (
    <PlansView
      plans={plans}
      userId={userId}
      currentPlanId={userData.user?.selectedPlanId}
    />
  );
}
