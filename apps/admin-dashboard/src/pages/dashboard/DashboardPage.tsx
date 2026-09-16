import { useNavigate } from "react-router-dom";
import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import RecenrUsers from "./components/RecenrUsers";
import { useDashboardQuery } from "@/hooks/queries/useDashboardQuery";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

export default function Dashboard() {

  const navigate = useNavigate();
  const { data, isPending, isError } = useDashboardQuery();

  const onAllUsers = () => {
    navigate('/users');
  };

  if (isPending) {
    return (<LoadingState />);
  }

  if (isError || !data) {
    return <ErrorState />;
  }

  return (
    <div className="dashboard admin-content-main">

      <DashboardHeader />

      {/* 展示数据 */}
      <DashboardStats statsDatas={data.stats} />

      {/* 新增用户 */}
      {data.recentUsers.length === 0 ?
        <EmptyState message="暂无新增用户" />
        :
        <RecenrUsers users={data.recentUsers} onAllUsers={onAllUsers} />
      }


    </div>
  );
}