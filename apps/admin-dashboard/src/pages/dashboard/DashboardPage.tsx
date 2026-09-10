import { useNavigate } from "react-router-dom";
import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import RecenrUsers from "./components/RecenrUsers";
import { useDashboardQuery } from "@/hooks/queries/useDashboardQuery";

export default function Dashboard() {

  const navigate = useNavigate();
  const { data, isPending, isError } = useDashboardQuery();

  const onAllUsers = () => {
    navigate('/users');
  };

  if (isPending) {
    return (
      <div>
        加载中...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div>加载失败</div>
    );
  }

  return (
    <div className="dashboard admin-content-main">

      <DashboardHeader />

      {/* 展示数据 */}
      <DashboardStats statsDatas={data.stats} />

      {/* 新增用户 */}
      <RecenrUsers users={data.recentUsers} onAllUsers={onAllUsers} />

    </div>
  );
}