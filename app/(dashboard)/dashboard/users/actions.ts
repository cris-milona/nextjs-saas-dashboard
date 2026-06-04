"use server"

import { revalidatePath } from "next/cache"

export async function deleteUser(formData: FormData) {
  const userId = formData.get("userId") as string

  if (!userId) throw new Error("User ID is required")

  // In a real app you'd delete from the database here
  // e.g. await db.users.delete({ where: { id: userId } })
  console.log(`Deleting user with id: ${userId}`)

  // Tell Next.js to re-fetch the users page data
  revalidatePath("/dashboard/users")
}
