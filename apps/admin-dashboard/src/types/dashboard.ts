export interface DashboardStats {
  totalUsers: number;
  activeUser: number;
  newUsers: number;
  growthRate: number;
}

export interface RecentUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface UserGrowthData {
  date: string;
  value: number;
}

export interface UserStatusData {
  status: string;
  value: number;
}

export interface StatsData {
  label: string;
  value: string;
  trend: string;
}

export interface DashboardData {
  stats: StatsData[];
  recentUsers: RecentUser[];
  userGrowth: UserGrowthData[];
  userStatus: UserStatusData[];
}

// 统一错误类型（后端通常返回 { code, message }）
export interface ApiError {
  code: number;
  message: string;
}