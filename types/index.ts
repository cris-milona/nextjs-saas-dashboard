export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
  status: "active" | "inactive";
  joinedAt: string;
  avatar: string;
}

export interface Stats {
  totalRevenue: number;
  totalUsers: number;
  activeUsers: number;
  conversionRate: number;
  revenueChange: number;
  usersChange: number;
  activeUsersChange: number;
  conversionChange: number;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  users: number;
}
