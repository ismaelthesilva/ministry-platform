import { getUserBibleTrackerData } from "../actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReadingsView } from "@/components/dashboard/ReadingsView";

export default async function ReadingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const data = await getUserBibleTrackerData(userId);

  // If no plan selected, redirect to plans page
  if (!data.user || !data.user.selectedPlanId || !data.plan) {
    redirect("/dashboard/plans");
  }

  return <ReadingsView data={data} userId={userId} />;
}
