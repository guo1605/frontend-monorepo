import type { User } from "./user";
export interface DashboardStats {
  totalUsers: number;
  activeUser: number;
  newUsers: number;
  growthRate: number;
}

export interface StatsData {
  label: string;
  value: string;
  trend: string;
}

export type RecentUsers = User[];
export interface DashboardData {
  stats: StatsData[];
  recentUsers: RecentUsers;
}

// 统一错误类型（后端通常返回 { code, message }）
export interface ApiError {
  code: number;
  message: string;
}