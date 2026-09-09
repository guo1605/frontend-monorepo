import type { StatsData, Users } from "@/types/types";

export const stats: StatsData[] = [
  {
    label: '总用户数',
    value: '12,450',
    trend: '+12.5%',
  },
  {
    label: '活跃用户',
    value: '8,320',
    trend: '+8.2%',
  },
  {
    label: '新增用户',
    value: '128',
    trend: '+16.4%',
  },
  {
    label: '用户增长率',
    value: '12.5%',
    trend: '+2.1%',
  },
];

export const recentUsers: Users[] = [
  {
    id: '1',
    name: 'Tom',
    email: 'tom@example.com',
    status: 'active',
    createdAt: '2026-08-29',
  },
];

export const mockDashboardData = { stats, recentUsers }