"use server";

import { redirect } from "next/navigation";

import { paths } from "@/lib/paths";

export type AddUserState = {
  errors?: { name?: string; email?: string };
} | null;

export async function addUser(
  _prevState: AddUserState,
  formData: FormData
): Promise<AddUserState> {
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const role = formData.get("role") as string;

  const errors: NonNullable<AddUserState>["errors"] = {};

  if (!name) errors.name = "Name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  console.log("Adding user:", { name, email, role });

  redirect(paths.users({ saved: true }));
}
