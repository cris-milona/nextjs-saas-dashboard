"use server";

export type SettingsState = {
  success?: boolean;
  errors?: { displayName?: string; email?: string };
} | null;

export async function updateSettings(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const displayName = (formData.get("displayName") as string).trim();
  const email = (formData.get("email") as string).trim();
  const emailNotifications = formData.get("emailNotifications") === "on";
  const weeklyReport = formData.get("weeklyReport") === "on";
  const alertsOnly = formData.get("alertsOnly") === "on";

  const errors: NonNullable<SettingsState>["errors"] = {};

  if (!displayName) errors.displayName = "Display name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  console.log("Settings updated:", {
    displayName,
    email,
    emailNotifications,
    weeklyReport,
    alertsOnly,
  });

  return { success: true };
}
