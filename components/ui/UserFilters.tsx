"use client";

import { useRouter } from "next/navigation";

interface UserFiltersProps {
  role?: string;
  status?: string;
  search?: string;
}

export const UserFilters = ({ role, status, search }: UserFiltersProps) => {
  const router = useRouter();
  const hasFilters = !!role || !!status;

  const navigate = (next: { role?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (next.role) params.set("role", next.role);
    if (next.status) params.set("status", next.status);
    if (search) params.set("search", search);
    router.push(`/dashboard/users?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="role-filter" className="sr-only">
        Filter by role
      </label>
      <select
        id="role-filter"
        value={role ?? ""}
        onChange={(e) => navigate({ role: e.target.value, status })}
        className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="viewer">Viewer</option>
      </select>

      <label htmlFor="status-filter" className="sr-only">
        Filter by status
      </label>
      <select
        id="status-filter"
        value={status ?? ""}
        onChange={(e) => navigate({ role, status: e.target.value })}
        className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={() =>
            router.push(
              `/dashboard/users${search ? `?search=${search}` : ""}`
            )
          }
          className="px-3 py-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Reset filters
        </button>
      )}
    </div>
  );
};
