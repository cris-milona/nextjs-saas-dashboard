import { NextResponse } from "next/server";

import { mockChartData, mockStats } from "@/lib/mock-data";

// GET /api/stats
// Returns dashboard KPI metrics and chart data
export async function GET() {
  // Simulate DB latency
  await new Promise((r) => setTimeout(r, 100));

  return NextResponse.json({
    stats: mockStats,
    chartData: mockChartData,
  });
}
