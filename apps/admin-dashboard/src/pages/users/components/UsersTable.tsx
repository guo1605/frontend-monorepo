import type { User } from "@/types/user";

export default function UserTable({ users }: { users: User[] }) {

  return (
    <div className="users-table">

      <table style={{ "width": "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户</th>
            <th>Email</th>
            <th>状态</th>
            <th>创建时间</th>
          </tr>
        </thead>

        <tbody>
          {users.map(item => {
            return <tr key={item.id}>
              <td>{item.id}</td>
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