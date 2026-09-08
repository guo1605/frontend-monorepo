import { stats, recentUsers } from "@/data/dashboard.mock";
import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import RecenrUsers from "./components/RecenrUsers";

export default function Dashboard() {

  return (
    <div className="dashboard">

      <DashboardHeader />

      {/* 展示数据 */}
      <DashboardStats statsDatas={stats} />

      {/* 新增用户 */}
      <RecenrUsers users={recentUsers} />

    </div>
  );
}