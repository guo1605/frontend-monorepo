import { useParams, Link } from "react-router-dom";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import UserDetailCard from "./components/UserDetailCard";

export default function UserDetailPage() {
  const { id } = useParams();

  const { data, isPending, isError } = useUserQuery(id!);

  if (!id) {
    return <div>用户 ID 无效</div>
  }

  if (isPending) {
    return <div>加载中...</div>
  }

  if (isError && !data) {
    return <div>加载失败</div>
  }

  return (
    <div className="user-detail">
      <Link to="/users" className="link-btn">返回用户列表</Link>
      <p>用户详情</p>
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