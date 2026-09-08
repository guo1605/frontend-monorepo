import type { Users } from "@/types/types";

export default function RecenrUsers({ users }: { users: Users[] }) {

  return (
    <div className="recenr-users">
      <header className="recenr-users-head">
        <p>最近新增用户</p>
        <button>查看全部</button>
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
              <td>{item.name}</td>
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