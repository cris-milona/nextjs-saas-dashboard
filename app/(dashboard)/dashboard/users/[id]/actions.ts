"use server";

import { revalidatePath } from "next/cache";

export async function updateUserProfile(formData: FormData) {
  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const status = formData.get("status") as string;

  if (!userId) throw new Error("User ID is required");

  // In a real app you'd update the database here
  console.log("Updating user:", { userId, name, email, role, status });

  revalidatePath(`/dashboard/users/${userId}`);
  revalidatePath("/dashboard/users");
}
