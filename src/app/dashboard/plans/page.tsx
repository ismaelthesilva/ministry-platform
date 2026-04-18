import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PlansView } from "@/components/dashboard/PlansView";

export default async function PlansPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <PlansView />;
}
