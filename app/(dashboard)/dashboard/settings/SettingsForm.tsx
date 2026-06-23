"use client";

import { useActionState } from "react";

import { cn } from "@/lib/utils";

import { updateSettings, type SettingsState } from "./actions";

const NOTIFICATIONS = [
  { name: "emailNotifications", label: "Email notifications", defaultChecked: true },
  { name: "weeklyReport", label: "Weekly summary report", defaultChecked: true },
  { name: "alertsOnly", label: "Critical alerts only", defaultChecked: false },
] as const;

export const SettingsForm = () => {
  const [state, formAction, pending] = useActionState<SettingsState, FormData>(
    updateSettings,
    null
  );

  return (
    <>
      {state?.success && (
        <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          Settings saved successfully.
        </div>
      )}

      <form
        action={formAction}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
      >
        <h2 className="text-sm font-semibold text-gray-900">Profile</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Display Name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              defaultValue="Christina"
              className={cn(
                "w-full px-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-2",
                state?.errors?.displayName
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-200 focus:ring-indigo-500"
              )}
            />
            {state?.errors?.displayName && (
              <p className="mt-1 text-xs text-red-500">
                {state.errors.displayName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue="xr.milona@gmail.com"
              className={cn(
                "w-full px-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-2",
                state?.errors?.email
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-200 focus:ring-indigo-500"
              )}
            />
            {state?.errors?.email && (
              <p className="mt-1 text-xs text-red-500">{state.errors.email}</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Notifications
          </h2>
          <div className="space-y-3">
            {NOTIFICATIONS.map(({ name, label, defaultChecked }) => (
              <label key={name} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name={name}
                  defaultChecked={defaultChecked}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={pending}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
};
