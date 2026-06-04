import { mockUsers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default async function UsersPage() {
  await new Promise((r) => setTimeout(r, 300))
  const users = mockUsers

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">{users.length} total users</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          + Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                {/* Avatar + name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold shrink-0">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                  </div>
                </td>
                {/* Role */}
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded-md text-xs font-medium capitalize",
                    user.role === "admin" ? "bg-purple-50 text-purple-700" :
                    user.role === "user" ? "bg-blue-50 text-blue-700" :
                    "bg-gray-100 text-gray-600"
                  )}>
                    {user.role}
                  </span>
                </td>
                {/* Status */}
                <td className="px-6 py-4">
                  <span className={cn(
                    "flex items-center gap-1.5 text-xs font-medium w-fit",
                    user.status === "active" ? "text-green-600" : "text-gray-400"
                  )}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", user.status === "active" ? "bg-green-500" : "bg-gray-300")} />
                    {user.status}
                  </span>
                </td>
                {/* Joined */}
                <td className="px-6 py-4 text-gray-500">
                  {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <button className="text-xs text-gray-400 hover:text-red-500 transition-colors">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
