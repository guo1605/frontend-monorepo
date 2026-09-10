export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
}

export interface StatsCardProps {
  label: string;
  value: string;
  trend: string;
}

export interface StatsData {
  label: string;
  value: string;
  trend: string;
}

export interface Users {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string
}