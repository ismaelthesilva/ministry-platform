import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileView } from "@/components/dashboard/ProfileView";
import prisma from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch complete user data from database
  const userData = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      firstName: true,
      lastName: true,
      email: true,
      image: true,
      country: true,
      phone: true,
      gender: true,
      religion: true,
      age: true,
      favBook: true,
      favVerse: true,
    },
  });

  if (!userData) {
    redirect("/login");
  }

  return <ProfileView user={userData} />;
}
