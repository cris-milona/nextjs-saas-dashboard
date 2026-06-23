import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { paths } from "@/lib/paths";

import { NewUserForm } from "./NewUserForm";

const NewUserPage = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="pt-2">
        <Link
          href={paths.users()}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add User</h1>
        <p className="text-gray-500 mt-1">Create a new user account.</p>
      </div>

      <NewUserForm />
    </div>
  );
};

export default NewUserPage;
