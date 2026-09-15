import type { RecentUser } from "@/types/dashboard";
import { Link } from "react-router-dom";

export default function RecenrUsers({ users, onAllUsers }: { users: RecentUser[], onAllUsers: () => void }) {

  return (
    <div className="recenr-users">
      <header className="recenr-users-head">
        <p>最近新增用户</p>
        <button onClick={onAllUsers}>查看全部</button>
      </header>

      <table style={{ "width": "100%" }}>
        <thead>
          <tr>
            <th>用户</th>
            <th>Email</th>
            <th>状态</th>
            <th>时间</th>
          </tr>
        </thead>

        <tbody>
          {users.map(item => {
            return <tr key={item.id}>
              <td>
                <Link to={`/users/${item.id}`} className="link-btn">
                  {item.name}
                </Link>
              </td>

              <td>{item.email}</td>
              <td>{item.status}</td>
              <td>{item.createdAt}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}