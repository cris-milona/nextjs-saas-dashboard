import Link from "next/link";

import { UserFilters } from "@/components/ui/UserFilters";
import { UserSearchInput } from "@/components/ui/UserSearchInput";
import { mockUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import { deleteUser } from "./actions";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    role?: string;
    status?: string;
    search?: string;
  }>;
}

async function getUsers(
  page: number,
  role?: string,
  status?: string,
  search?: string
) {
  const params = new URLSearchParams({ page: String(page), limit: "5" });
  if (role) params.set("role", role);
  if (status) params.set("status", status);
  if (search) params.set("search", search);

  // Call our own API route — works in both dev and prod
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/users?${params}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { page, role, status, search } = await searchParams;
  const currentPage = parseInt(page ?? "1");

  const { data: users, meta } = await getUsers(
    currentPage,
    role ?? undefined,
    status ?? undefined,
    search ?? undefined
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">{meta.total} total users</p>
        </div>
        <Link
          href="/dashboard/users/new"
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add User
        </Link>
      </div>

      {/* Search */}
      <UserSearchInput
        defaultValue={search}
        suggestions={mockUsers.map((u) => u.name)}
      />

      {/* Filters */}
      <UserFilters role={role} status={status} search={search} />

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th scope="col" className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(
              (user: {
                id: string;
                avatar: string;
                name: string;
                email: string;
                role: string;
                status: string;
                joinedAt: string;
              }) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold shrink-0">
                        {user.avatar}
                      </div>
                      <div>
                        <Link
                          href={`/dashboard/users/${user.id}`}
                          className="font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                        >
                          {user.name}
                        </Link>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-md text-xs font-medium capitalize",
                        user.role === "admin"
                          ? "bg-purple-50 text-purple-700"
                          : user.role === "user"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                      )}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-medium w-fit",
                        user.status === "active"
                          ? "text-green-600"
                          : "text-gray-400"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          user.status === "active"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        )}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.joinedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  {/* Delete via Server Action */}
                  <td className="px-6 py-4 text-right">
                    <form action={deleteUser}>
                      <input type="hidden" name="userId" value={user.id} />
                      <button
                        type="submit"
                        aria-label={`Remove ${user.name}`}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </form>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * meta.limit + 1}–
            {Math.min(currentPage * meta.limit, meta.total)} of {meta.total}{" "}
            users
          </p>
          <div className="flex gap-2">
            {currentPage <= 1 ? (
              <span aria-disabled="true" className="px-3 py-1.5 text-sm rounded-lg border text-gray-300 border-gray-100">
                Previous
              </span>
            ) : (
              <a
                href={`?page=${currentPage - 1}${role ? `&role=${role}` : ""}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
                className="px-3 py-1.5 text-sm rounded-lg border text-gray-600 border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Previous
              </a>
            )}
            {currentPage >= meta.totalPages ? (
              <span aria-disabled="true" className="px-3 py-1.5 text-sm rounded-lg border text-gray-300 border-gray-100">
                Next
              </span>
            ) : (
              <a
                href={`?page=${currentPage + 1}${role ? `&role=${role}` : ""}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
                className="px-3 py-1.5 text-sm rounded-lg border text-gray-600 border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Next
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
