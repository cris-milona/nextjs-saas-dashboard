import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  change,
  icon,
}: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between flex-wrap gap-x-2 gap-y-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium shrink-0",
            isPositive ? "text-green-600" : "text-red-500"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-1">vs last month</p>
    </div>
  );
}
