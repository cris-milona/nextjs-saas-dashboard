"use server";

import { redirect } from "next/navigation";

export async function addUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  if (!name || !email) throw new Error("Name and email are required");

  // In a real app you'd insert into the database here
  console.log("Adding user:", { name, email, role });

  redirect("/dashboard/users");
}
