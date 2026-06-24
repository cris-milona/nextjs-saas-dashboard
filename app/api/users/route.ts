import { NextRequest, NextResponse } from "next/server";

import { mockUsers } from "@/lib/mock-data";

// GET /api/users?page=1&limit=5&role=admin&status=active
// Returns paginated + filtered users
export async function GET(request: NextRequest) {
  try {
    await new Promise((r) => setTimeout(r, 100));

    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "5");
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase();

    // Filter
    let filtered = mockUsers;
    if (search)
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
      );
    if (role) filtered = filtered.filter((u) => u.role === role);
    if (status) filtered = filtered.filter((u) => u.status === status);

    // Paginate
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return NextResponse.json({
      data,
      meta: { page, limit, total, totalPages },
    });
  } catch (error) {
    console.error("[GET /api/users]", error);
    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 }
    );
  }
}
