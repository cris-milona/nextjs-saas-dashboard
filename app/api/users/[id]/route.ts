import { NextResponse } from "next/server";

import { mockUsers } from "@/lib/mock-data";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/users/[id]">
) {
  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
