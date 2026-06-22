import { Activity, DollarSign, TrendingUp, Users } from "lucide-react";

import { RevenueChart } from "@/components/charts/RevenueChart";
import { UsersChart } from "@/components/charts/UsersChart";
import { StatCard } from "@/components/ui/StatCard";
import { mockChartData, mockStats } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

// This is a Server Component — data is fetched on the server, no loading spinner needed
const DashboardPage = async () => {
  // Simulate a DB fetch delay
  await new Promise((r) => setTimeout(r, 300));

  const stats = mockStats;
  const chartData = mockChartData;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.revenueChange}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Total Users"
          value={formatNumber(stats.totalUsers)}
          change={stats.usersChange}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          title="Active Users"
          value={formatNumber(stats.activeUsers)}
          change={stats.activeUsersChange}
          icon={<Activity className="w-5 h-5" />}
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          change={stats.conversionChange}
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={chartData} />
        <UsersChart data={chartData} />
      </div>
    </div>
  );
};

export default DashboardPage;
