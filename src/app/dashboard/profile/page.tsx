import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileView } from "@/components/dashboard/ProfileView";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <ProfileView user={session.user} />;
}
