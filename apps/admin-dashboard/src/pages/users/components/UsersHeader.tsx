import { Link } from "react-router-dom";

export default function UsersHeader() {
  return (
    <div className="users-header">
      <div>
        <p>用户管理</p>
        <p>管理系统中的所有用户</p>
      </div>

      <Link to="/users/new" className="link-btn">新增用户</Link>
    </div>
  );
}