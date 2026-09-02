import StatsCard from "@/components/layout/StatsCard";

// const dashboardStats = {
//   totalUsers: 120,
//   activeUsers: 80,
//   totalOrders: 356,
// };

export default function Dashboard() {

  return (
    <div className="dashboard">
      <StatsCard
        label="用户总数"
        value={120}
      />

      <StatsCard
        label="活跃用户"
        value={80}
      />

      <StatsCard
        label="订单数量"
        value={356}
      />
    </div>
  );
}