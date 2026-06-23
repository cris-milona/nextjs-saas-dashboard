"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { paths } from "@/lib/paths";
import { fetchUser, isAdmin } from "@/lib/utils";

export async function updateUserProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const userId = formData.get("userId") as string;
  if (!userId) throw new Error("User ID is required");

  const admin = isAdmin(session.user.role);

  if (!admin) {
    const target = await fetchUser(userId);
    if (!target) throw new Error("User not found");
    if (target.email !== session.user.email) throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = admin ? (formData.get("role") as string) : undefined;
  const status = admin ? (formData.get("status") as string) : undefined;

  console.log("Updating user:", {
    userId,
    name,
    email,
    ...(admin && { role, status }),
  });

  revalidatePath(paths.user(userId));
  revalidatePath(paths.users());
  redirect(paths.user(userId, { saved: true }));
}
