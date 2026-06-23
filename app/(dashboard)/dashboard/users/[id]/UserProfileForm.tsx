"use client";

import { useActionState } from "react";

import { cn } from "@/lib/utils";
import type { User } from "@/types";

import { deleteUser } from "../actions";

import { updateUserProfile, type UpdateProfileState } from "./actions";

interface UserProfileFormProps {
  user: User;
  adminUser: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export const UserProfileForm = ({
  user,
  adminUser,
  canEdit,
  canDelete,
}: UserProfileFormProps) => {
  const [state, formAction, pending] = useActionState<
    UpdateProfileState,
    FormData
  >(updateUserProfile, null);

  return (
    <>
      <form
        id="update-profile"
        action={formAction}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
      >
        <input type="hidden" name="userId" value={user.id} />

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
              defaultValue={user.name}
              disabled={!canEdit}
              className={cn(
                "w-full px-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
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
              defaultValue={user.email}
              disabled={!canEdit}
              className={cn(
                "w-full px-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
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

        <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              defaultValue={user.role}
              disabled={!adminUser}
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={user.status}
              disabled={!adminUser}
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500">
            Member since{" "}
            {new Date(user.joinedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </form>

      <div className="flex items-center justify-between">
        {canDelete ? (
          <form action={deleteUser}>
            <input type="hidden" name="userId" value={user.id} />
            <button
              type="submit"
              aria-label={`Remove ${user.name}`}
              className="px-5 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Remove User
            </button>
          </form>
        ) : (
          <div />
        )}
        {canEdit && (
          <button
            type="submit"
            form="update-profile"
            disabled={pending}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </>
  );
};
