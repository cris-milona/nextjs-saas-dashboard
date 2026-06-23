"use server";

import { redirect } from "next/navigation";

export async function updateSettings(formData: FormData) {
  const displayName = formData.get("displayName");
  const email = formData.get("email");
  const emailNotifications = formData.get("emailNotifications") === "on";
  const weeklyReport = formData.get("weeklyReport") === "on";
  const alertsOnly = formData.get("alertsOnly") === "on";

  // In a real app you'd save to a database here
  console.log("Settings updated:", {
    displayName,
    email,
    emailNotifications,
    weeklyReport,
    alertsOnly,
  });

  // Redirect back to settings with a success indicator
  redirect("/dashboard/settings?saved=true");
}
