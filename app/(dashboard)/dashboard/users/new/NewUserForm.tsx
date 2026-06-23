"use client";

import { useActionState } from "react";

import Link from "next/link";

import { paths } from "@/lib/paths";
import { cn } from "@/lib/utils";

import { addUser, type AddUserState } from "./actions";

export const NewUserForm = () => {
  const [state, formAction, pending] = useActionState<AddUserState, FormData>(
    addUser,
    null
  );

  return (
    <form
      action={formAction}
      className="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
    >
      <h2 className="text-sm font-semibold text-gray-900">Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Display Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            className={cn(
              "w-full px-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-2",
              state?.errors?.name
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-200 focus:ring-indigo-500"
            )}
          />
          {state?.errors?.name && (
            <p className="mt-1 text-xs text-red-500">{state.errors.name}</p>
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
            placeholder="jane@example.com"
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
        <div className="max-w-xs">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            defaultValue="user"
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
        <Link
          href={paths.users()}
          className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Adding..." : "Add User"}
        </button>
      </div>
    </form>
  );
};
