import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { SavedBanner } from "@/components/ui/SavedBanner";
import { auth } from "@/lib/auth";
import { fetchUser, isAdmin } from "@/lib/utils";

import { deleteUser } from "../actions";

import { updateUserProfile } from "./actions";

const UserProfilePage = async (props: PageProps<"/dashboard/users/[id]">) => {
  const [{ id }, { saved }, session] = await Promise.all([
    props.params,
    props.searchParams,
    auth(),
  ]);
  const user = await fetchUser(id);

  if (!user) notFound();

  const adminUser = isAdmin(session?.user?.role);
  const isOwnProfile = session?.user?.email === user.email;
  const canEdit = adminUser || isOwnProfile;
  const canDelete = adminUser;

  return (
    <div className="space-y-6 max-w-2xl">
      <SavedBanner show={saved === "true"} message="Profile updated successfully." />
      <div className="pt-2">
        <Link
          href="/dashboard/users"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg font-semibold">
            {user.avatar}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 mt-0.5">User ID: {user.id}</p>
          </div>
        </div>
      </div>

      <form
        id="update-profile"
        action={updateUserProfile}
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
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
            />
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
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
            />
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
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
