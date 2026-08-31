export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
}

export interface StatsCardProps {
  label: string;
  value: number;
}