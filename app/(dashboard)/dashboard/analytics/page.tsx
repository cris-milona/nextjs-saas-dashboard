import RevenueChart from "@/components/charts/RevenueChart"
import UsersChart from "@/components/charts/UsersChart"
import { mockChartData } from "@/lib/mock-data"

export default async function AnalyticsPage() {
  await new Promise((r) => setTimeout(r, 300))
  const data = mockChartData

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0)
  const totalUsers = data.reduce((sum, d) => sum + d.users, 0)
  const avgRevenue = Math.round(totalRevenue / data.length)
  const peakMonth = data.reduce((a, b) => (a.revenue > b.revenue ? a : b))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Detailed breakdown of your metrics.</p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Annual Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}k` },
          { label: "Total Users", value: totalUsers.toLocaleString() },
          { label: "Avg Monthly Revenue", value: `$${(avgRevenue / 1000).toFixed(0)}k` },
          { label: "Peak Month", value: peakMonth.month },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <RevenueChart data={data} />
        <UsersChart data={data} />
      </div>
    </div>
  )
}
