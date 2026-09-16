import { useParams, Link } from "react-router-dom";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import UserDetailCard from "./components/UserDetailCard";
import PageHeader from "@/components/common/PageHeader";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

export default function UserDetailPage() {
  const { id } = useParams();

  const { data, isPending, isError } = useUserQuery(id!);

  if (!id) {
    return <div>用户 ID 无效</div>
  }

  if (isPending) {
    return (<LoadingState />);
  }

  if (isError) {
    return <ErrorState />;
  }

  // 未查询到用户数据
  if (!data) {
    return <EmptyState message="查无此用户  " />;
  }

  return (
    <div className="user-detail">
      <PageHeader
        route={`/users`}
        backText="返回用户列表"
        title="用户详情"
      />

      <div className="user-detail-content">
        <UserDetailCard label="ID" value={data.id} />
        <UserDetailCard label="用户名" value={data.name} />
        <UserDetailCard label="Email" value={data.email} />
        <UserDetailCard label="状态" value={data.status} />
        <UserDetailCard label="创建时间" value={data.createdAt} />
      </div>

      <div className="edit-btn">
        <Link to={`/users/${id}/edit`} className="link-btn">编辑用户</Link>
      </div>
    </div>
  );
}