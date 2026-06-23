import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { SavedBanner } from "@/components/ui/SavedBanner";
import { auth } from "@/lib/auth";
import { paths } from "@/lib/paths";
import { fetchUser, isAdmin } from "@/lib/utils";

import { UserProfileForm } from "./UserProfileForm";

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
          href={paths.users()}
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

      <UserProfileForm
        user={user}
        adminUser={adminUser}
        canEdit={canEdit}
        canDelete={canDelete}
      />
    </div>
  );
};

export default UserProfilePage;
